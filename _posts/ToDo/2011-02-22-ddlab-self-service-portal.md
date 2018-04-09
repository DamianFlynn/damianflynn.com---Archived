---
author: Damian.Flynn
comments: true
date: 2011-02-22 23:28:00+00:00
layout: post
slug: ddlab-self-service-portal
title: DDLab-Self Service Portal
wordpress_id: 3491
categories:
- Blog
tags:
- AD
- Cloud
- Guides
- Portal
- SCOM
- SCVMM
- SQL
- WS/SC
---

Now that we have a Dynamic Data Center infrastructure, we can now progress to the new level, and add the additional framework for implementing a Private Cloud. Using the infrastructure we have now implemented, I am going to take advantage of this framework and use Operations manager to deploy the new Virtual Machine which we will use for the Self Service Portal 2.5 code.

As with the previous deployments, we can refer to the table we created at the start of the project, which will have the reference details needed to complete the customisation of the node for our new role. Using SCVMM we will deploy the new node to the LAB

[![image](/assets/posts/2011/02/image_thumb322.png)](/assets/posts/2011/02/image325.png)

And once deployed, we can ensure that the correct static IP is assigned.

<table cellpadding="0" width="438" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; border-left: #a3a3a3 1pt solid" border="1" cellspacing="0" > <tbody > <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Node**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAB-SCOM

</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAB-SCVMM

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAB-SSP**

</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAB-OPALIS

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Type**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

VM

</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

VM

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**VM**

</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

VM

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Role**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

SCOM

</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

SCVMM

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**SSPv2**

</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Opalis

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Storage**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >C: [30Gb] – System
</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >C: [30Gb] – System
</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >**C: [30Gb] – System**
</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >C: [30Gb] – System
</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAN**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

172.16.100.20

</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

172.16.100.25

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**172.16.100.30**

</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

172.16.100.40

</td></tr></tbody></table>

After you have confirmed that your Virtual Machine is a happy member of the domain, we will sort out the prerequisites and jump into the installation.

Ok, so now that we have the new node ready for configuration, we will get on with the work. 

# Installation

We have been here before with the previous nodes, so lets start with loading up your PowerShell console again and we will get this process rolling.

## Service Accounts

From the PowerShell console we need to import the Active Directory module so that we can organise a service account
    
    Import-Module ActiveDirectory
    New-ADUser -Name "!VMMSSP Server" -SamAccountName !svcVMMSSPServer -Description "VMM Self Service Portal Service Account" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password") -Path "OU=Services,OU=Operations,dc=damianflynn,dc=demo"
    New-ADUser -Name "!SSP Administrator" -SamAccountName !SSPAdmin -Description "VMM Self Service Portal Administrator" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password") -Path "OU=Services,OU=Operations,dc=damianflynn,dc=demo"




Next we will add this service account into the Local Administrators Group of this server also, as SCVMM will check for this privillage during installation



    
    $computerName =   "$env:computername"
    $localGroupName = "Administrators"
    $servicename="damianflynn.demo!svcVMMSSPserver"
    ([ADSI]"WinNT://$computerName/$localGroupName,group").Add("WinNT://$ServiceName")




## Prerequisite Features




We need to get a few more roles and features installed on our server so that we can Install all the components of System Centre Virtual Machine Manager Server.
    
    Import-Module ServerManager
    Add-WindowsFeature AS-NET-Framework,WAS,Web-Common-Http,Web-Asp-Net,Web-Net-Ext,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Http-Logging,Web-Log-Libraries,Web-Request-Monitor,Web-Http-Tracing,Web-Basic-Auth,Web-Windows-Auth,Web-Digest-Auth,Web-Client-Auth,Web-Filtering,Web-Performance,Web-Dyn-Compression,Web-Mgmt-Console,Web-Scripting-Tools,Web-Mgmt-Service,Web-Metabase,Web-WMI,Web-Lgcy-Mgmt-Console,MSMQ-Services,MSMQ-Directory




Once complete, we will have the IIS, and Windows Process Activation Services all installed and ready.




## VMM 2007 R2 Admin Console




Ok, the last of the pre-required software modules needed, is the System Centre Virtual Machine Manager 2007 R2 Administrator Console. Installing this will ensure that the correct PowerShell modules are available on the server for the VMMSSPv2 services to communicate with our VMM2007R2 environment.




Once, installed, give the node a quick reboot, just to be sure everything has set in correctly, and we will get started on the installation of the new tool kit.




I will skip the how to for installing this console, as we have completed this process a few times recently.I’ll not go trough the steps as we have covered that in the posting for installing VMM 2007 R2 earlier.




[![image](/assets/posts/2011/02/image_thumb323.png)](/assets/posts/2011/02/image326.png)




## VMM SSP 2.0




Once your ready, we can launch the installation wizard and get going. After a few seconds we will be greeted with the Welcome page, simply Click on Install




[![image](/assets/posts/2011/02/image_thumb324.png)](/assets/posts/2011/02/image327.png)




Review and accept the license agreement, and then click Next.




[![image](/assets/posts/2011/02/image_thumb325.png)](/assets/posts/2011/02/image328.png)




Click Toolkit server component, click Toolkit Web portal component, and then click Next.




[![image](/assets/posts/2011/02/image_thumb326.png)](/assets/posts/2011/02/image329.png)




On the Check Prerequisites page, wait for the wizard to complete the prerequisite checks, and then review the results. If any of the prerequisites are missing, follow the instructions provided. When all of the prerequisites are present, click Next.




[![image](/assets/posts/2011/02/image_thumb327.png)](/assets/posts/2011/02/image330.png)




Accept or change the file location, and then click Next.




[![image](/assets/posts/2011/02/image_thumb328.png)](/assets/posts/2011/02/image331.png)




Enter the database configuration information. Our SQL server as we know is **LAB-SVR01**, we can then click on **Get Instances** which should return just one **Default**. We will use the **Credentials** for **Windows Authentication**. And at the bottom of the page, make sure that **Create a new database** named is selected (the database name is not editable in the current release).




When you finish the database configuration, click Next.




[![image](/assets/posts/2011/02/image_thumb329.png)](/assets/posts/2011/02/image332.png)




Type the user name, password, and domain of an account for the VMMSSP service to use. Make sure that this account has the Log on as a service right. Click Test account to make sure that this account functions. When finished, click Next.




[![image](/assets/posts/2011/02/image_thumb330.png)](/assets/posts/2011/02/image333.png)




Enter the settings that the Web portal component uses to communicate with the server component. These settings include the name of the computer that runs the server component, and the port numbers of the Windows Communication Foundation (WCF) endpoint. When finished, click Next.




[![image](/assets/posts/2011/02/image_thumb331.png)](/assets/posts/2011/02/image334.png)




In the Data Center administrators box, type the user names of the accounts that you want to be able to administer the toolkit. In the Web portal, these users will be members of the Administrator role and will have full administrative permissions to the toolkit.




Type the name of the Data Center that the toolkit will interact with. When finished, click Next. at the start we created an Account called **!SSPAdmin** for this task, and I also add the **Domain Administrator** to the role




[![image](/assets/posts/2011/02/image_thumb332.png)](/assets/posts/2011/02/image335.png)




Enter the IIS configuration information for the Web portal component, and then click Next.




Important Remember to use the toolkit service account as the application pool identity.




[![image](/assets/posts/2011/02/image_thumb333.png)](/assets/posts/2011/02/image336.png)




On the Install the components page, review the settings that you selected, and then click Install. When the installation finishes, click Close.




[![image](/assets/posts/2011/02/image_thumb334.png)](/assets/posts/2011/02/image337.png)




Now, the installation will continue as the server is configured for us.




[![image](/assets/posts/2011/02/image_thumb335.png)](/assets/posts/2011/02/image338.png)




Finally, after a few minutes of work, we will get the final result page. We can Click on Close to finish the process.




[![image](/assets/posts/2011/02/image_thumb336.png)](/assets/posts/2011/02/image339.png)




Just for sanity, Check the Service account is running, and if not start it.




[![image](/assets/posts/2011/02/image_thumb337.png)](/assets/posts/2011/02/image340.png)




Next check that the Pool in IIS is also running




[![image](/assets/posts/2011/02/image_thumb338.png)](/assets/posts/2011/02/image341.png)




Magic – your are all set, now we can test that the installation worked. Open the web browser and type in the server name we just installed on (or use localhost if the browser is opened on same server), after a few seconds we should be greeted with a screen similar to this




[![image](/assets/posts/2011/02/image_thumb339.png)](/assets/posts/2011/02/image342.png)




If this is what you have the pleasure of viewing, then Congratulations, you have VMMSSP2 installed and ready for configuration.
