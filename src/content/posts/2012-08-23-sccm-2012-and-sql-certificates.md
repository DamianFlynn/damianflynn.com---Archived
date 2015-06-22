---
author: Damian.Flynn
comments: true
publishDate: 2012-08-23 12:30:00+00:00
template: post.hbt
slug: sccm-2012-and-sql-certificates
title: SCCM 2012 and SQL Certificates
wordpress_id: 539
categories:
- Blog
tags:
- SCCM
- SQL
- WS/SC
---

As the journey proceeds to move the databases off my shared SQL to local copies, I had the pleasure of yet another fantastic SQL related issue; this time really out to drive me nuts.

Once more, My SCCM environment has chosen not to start, so back in my trusted _SMSEXEC.LOG_ I have another fun message
    
    Starting SMS_EXECUTIVE...
    Microsoft System Center 2012 Configuration Manager v5.00 (Build 7711)
    Copyright (C) 2011 Microsoft Corp.    SMS_EXECUTIVE    8/20/2012 4:12:09 AM    2544 (0x09F0)
    Running as a Win32 service.     Process ID: 2320     Worker thread ID: 2544     
    Certificate (0x398530) is Exportable     
    Initialize COM Security.     
    InitializeCOMSecurity: RegOpenKeyEx for appid key Succeeded.     
    InitializeCOMSecurity: RegQueryInfoKey for appid key Succeeded.
    InitializeCOMSecurity: RegQueryValueEx for AccessPermission Succeeded.
    InitializeCOMSecurity: IsValidSecurityDescriptor() Succeeded.
    InitializeCOMSecurity: MakeAbsoluteSD() Succeeded.     
    InitializeCOMSecurity: CoInitializeEx() Succeeded.     
    InitializeCOMSecurity() Succeeded.     
    Installation directory: C:Program FilesMicrosoft Configuration Manager     
    This server: XXX-SC-CM01     Site server: XXX-SC-CM01.corpnet.org     Site code: CM0     Site type: 8     
    CSMSExecService::RegisterDBConnection: Register a DB connection...     
    Initializing the status message reporting system...         
    The path to the "Status Manager" inbox is "C:Program FilesMicrosoft Configuration Managerinboxesstatmgr.boxstatmsgs".
    *** [08001][-2146893019][Microsoft][SQL Server Native Client 10.0]SSL Provider: The certificate chain was issued by an authority that is not trusted.
    *** [08001][-2146893019][Microsoft][SQL Server Native Client 10.0]Client unable to establish connection
    *** Failed to connect to the SQL Server.
    CSiteControlEx::GetCurrentSiteInfo: Failed to get SQL connection
    CSiteControlEx::GetMasterSCF:Failed to read site information from database, retry in 5 seconds ...
    




Now what? SSL - what SSL? And what SQL Server? Great this helps me no end.




My guess is that this is the SQL server related to the instance which this site connects to, but how do I confirm? Pop open a shell window and enter _netstat –A_**  
**and let's see what we get, With any luck in the long list returned I should see some connection attempts to my SQL server – in this scenario BIL-SQLC1-N2 listening on TCP port 1144.




[![082212_1444_SCCM2012and1](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012and1_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012and1.png)




## Check SQL Instance Certificate using the GUI  





Ok, so that confirms the SQL server, but what about this untrusted certificate? Let's check the SQL Servers configuration to determine the certificate in question




On the SQL Server






  * Launch the **SQL Server Configuration Manager** 

  * Expand the _SQL Server Network Configuration _node, and from here open the properties for the SQL Instance we are targeting. 

  * [![082212_1444_SCCM2012and2](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012and2_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012and2.png) 

  * On the **Protocols for ServerName** dialog, select the _Certificates_ tab to reveal the certificate which SQL is utilizing



If you are lucky like me, this will of course be blank? WHAT? Right, that's messed up.




## Check the SQL Instance Certificate the Real Admins Way J  





Grab your can opener, also known as Regedit; and navigate to the SQL repository store at **HKLMSoftwareMicrosoftMicrosoft SQL Server[Instance Name]MSSQLServerSuperSocketNetLib** as you can see in the screen shot below.




[![082212_1444_SCCM2012and3](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012and3_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012and3.png)




Now, if a certificate is really being used – you will see its thumbprint listed in the _Certificate_ key. Bingo.




Now, open up the Certificate store of the computer (MMC – Add Certificates Snap In, Select Local Computer) and navigate to the Personal Certificates of the computer. Here you sould see a certificate which has being issued to the instance name, by itself!




Double click to open the certificate, and navigate to the _Details_ tab, scrolling down, to present the thumbprint, which should match the registry entry. If it does not – you selected the wrong cert – try again J




## Export the SQL Certificate for our SCCM Server  





Now – SCCM keeps saying that this cert is not trusted – and that makes sense, as it's issued by a nobody, and SCCM has no idea about it.




We will use the **Copy to File** button on the Details tab of the certificates properties to make an export which we can import on the SCCM server.






  * On the Welcome page of the wizard which appears, click Next 

  * On the Export Private Key page, select to export the Private Key, click Next 

  * 


On the Export File Format page, then click Next  





    * Select Personal Information Exchange, 

    * Select Include All Certificates in the chain 

    * Select Export all Extended properties


  * On the Password page, set a simple password to protect this file – for example "Genius!" 

  * On the File to Export Page, provide a path and name – for example "c:mySQLInstanceCert.pfx" 

  * On the completion page click Finish.  




## Import the SQL Certificate to our SCCM Server  





Back on the SCCM Server, we now will open the Computers Certificates store and import this certificate into the trusted roots.






  * Launch MMC and add the Certificates Snap In, select the focus as Local Computer 

  * Navigate to the Trusted Root Certificate Authorities, Certificates store 

  * Right click, and select All Tasks, Import… 

  * The Import page of the wizard will appear with its normal welcome, click Next 

  * 


On the file to import page, click Browse  





    * Set the File type to PFX 

    * Navigate to the server location you saved the export a moment ago – for example \[sqlserverc$mySQLInstanceCert.pfx](file://\sqlserverc$mySQLInstanceCert.pfx) 

    * Click Ok to select the certificate


  * On the password page, enter the password you used for the export, and click Next 

  * On the Certificate Store, the currently selected store will be offered, which should be "Trusted Root Certificate Authorities" 

  * 


Click Next to complete and finish out the wizard




## Verify the import worked  





After a few moments, we should see the fruits of our pain turn good, as the SMSEXEC.LOG file should now proceed to show that the connection with SQL completed, and the rest of the startup can now progress as normal
    
    *** Failed to connect to the SQL Server.    
    CSiteControlEx::GetCurrentSiteInfo: Failed to get SQL connection    
    CSiteControlEx::GetMasterSCF:Failed to read site information from database, retry in 5 seconds ...    
        SMS_STATUS_MANAGER is not running as part of this process, the SMS_EXECUTIVE to SMS_STATUS_MANAGER in-memory status message queue will not be used.
    Registered this process as a source of "SMS Server" events.    
    Registered this process as a source of "SMS Client" events.    
    Registered this process as a source of "SMS Provider" events.    
    Status message reporting system initialized successfully.    
    STATMSG: ID=500 SEV=I LEV=M SOURCE="SMS Server" COMP="SMS_EXECUTIVE" SYS=BIL-SC-CM02.corpnet.liox.org SITE=CM1 PID=4804 TID=5172 GMTDATE=Wed Aug 22 09:16:19.253 2012 ISTR0="" ISTR1="" ISTR2="" ISTR3="" ISTR4="" ISTR5="" ISTR6="" ISTR7="" ISTR8="" ISTR9="" NUMATTRS=0    
    Certificate maintenance interval is every 1800 seconds
    SMS_AD_SECURITY_GROUP_DISCOVERY_AGENT initialized, DLL = "binx64adsgdis.dll", startup type = "Scheduled", current state = "Stopped", requested operation = "None", next start time = "Wed Aug 22 05:20:00 2012 Eastern Daylight Time".    
    




Have Fun
