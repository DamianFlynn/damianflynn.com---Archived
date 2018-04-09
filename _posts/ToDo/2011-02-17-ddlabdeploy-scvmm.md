---
author: Damian.Flynn
comments: true
date: 2011-02-17 23:23:00+00:00
layout: post
slug: ddlabdeploy-scvmm
title: DDLAB–Deploy SCVMM
wordpress_id: 63
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

Great, Hyper-V works, SQL is ready, and we also have a Virtual Machine running which we will utilize for installing System Centre Virtual Machine Manager on.

If you have not already joined the virtual machine to the domain, and of course assigned a static IP address, then there is no time like the present. Lets take a look again at the Server table so we have the relevant data (Highlighted for you)

<table cellpadding="0" width="438" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; border-left: #a3a3a3 1pt solid" border="1" cellspacing="0" > <tbody > <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Node**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAB-SCOM

</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAB-SCVMM**

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAB-SSP

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

**VM**

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

VM

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

**SCVMM**

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

SSPv2

</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Opalis

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Storage**

</td>
<td width="75" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >C: [30Gb] – System
</td>
<td width="87" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >**C: [30Gb] – System**
</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >C: [30Gb] – System
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

**172.16.100.25**

</td>
<td width="84" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

172.16.100.30

</td>
<td width="125" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

172.16.100.40

</td></tr></tbody></table>

After you have confirmed that your Virtual Machine is a happy member of the domain, we will sort out the prerequisites and jump into the installation.

As we done during the installation of SQL, I will refer you to an already published guide on this blog for the detailed install steps.  

# Installation

Now, lets start with the easy stuff, and load up your PowerShell console again and we will get this process rolling.

## Service Accounts

From the PowerShell console we need to import the Active Directory module so that we can organise a service account
    
    Import-Module ActiveDirectory
    
    New-ADUser -Name "!SCVMM Server" -SamAccountName !svcSCVMMServer -Description "SCVMM Server Service Account" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password") -Path "OU=Services,OU=Operations,dc=damianflynn,dc=demo"




  
Next we will add this service account into the Local Administrators Group of this server also, as SCVMM will check for this privillage during installation  

    
    $computerName =   "$env:computername"
    
    $localGroupName = "Administrators"
    
    $servicename="damianflynn.demo!svcSCVMMserver"
    
    ([ADSI]"WinNT://$computerName/$localGroupName,group").Add("WinNT://$ServiceName")




## Prerequisite Features




We need to get a few more roles and features installed on our server so that we can Install all the components of System Centre Virtual Machine Manager Server.
    
    Import-Module ServerManager
    
    Add-WindowsFeature AS-NET-Framework,WAS,Web-Common-Http,Web-Asp-Net,Web-Net-Ext,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Http-Logging,Web-Log-Libraries,Web-Request-Monitor,Web-Http-Tracing,Web-Basic-Auth,Web-Windows-Auth,Web-Digest-Auth,Web-Client-Auth,Web-Filtering,Web-Performance,Web-Dyn-Compression,Web-Mgmt-Console,Web-Scripting-Tools,Web-Mgmt-Service,Web-Metabase,Web-WMI,Web-Lgcy-Mgmt-Console




Once complete, we will have the IIS, and Windows Process Activation Services all installed and ready.




## SCVMM Server 2008 R2




Now, we have all we need to get on with the installation, so head back to this post and follow the installation process [http://www.damianflynn.com/2010/10/06/deploying-scvmm-2007-r2-to-our-lab/](http://www.damianflynn.com/2010/10/06/deploying-scvmm-2007-r2-to-our-lab/) from the section entitled “**SQL Management Tools**”. Remember to refer back to the table here for Server Names, and IP Addresses.




### Launch the Console




Hey, your back, good stuff, Now we can see the fruits of you labour, and we will launch the new Administration Console.




[![image](/assets/posts/2011/02/image_thumb107.png)](/assets/posts/2011/02/image123.png)




The sad news is there there is really not a lot going on here just yet. We need to do a little work to get our environment ‘Managed’; Take a break for now, and when you come back we will configure SCVMM.
