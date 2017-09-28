---
author: Damian.Flynn
comments: true
date: 2011-02-13 23:21:00+00:00
layout: post
slug: ddlab-deploy-sql-server
title: DDLAB – Deploy SQL Server
wordpress_id: 61
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

We are making some nice progress, next stop on the trip is to organise a SQL Server for the Lab. I did a pretty detailed post a few months back on the process of installing SQL 2008 R2, so forgive me if I don’t retype all the instructions again.

Instead I will setup the prerequisites with you here, and then point you back to the original post.

# Installation

Take a peek back to the original post, and you will see that we have elected to use the **LAB-SVR01** node to host out SQL Installation. Grab the media and log back into the server, and pop open your PowerShell console again and we will get this process rolling.

## Service Accounts

From the PowerShell console we need to import the Active Directory module so that we can organise a service account
    
    Import-Module ActiveDirectory
    
    New-ADUser -Name "!SQL Server" -SamAccountName !svcSQLServer -Description "SQL Server Service Account" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password") -Path "OU=Services,OU=Operations,dc=damianflynn,dc=demo"




## Prerequisite Features




We need to get a few more roles and features installed on our server so that we can Install all the components of SQL Server.
    
    Import-Module ServerManager
    
    Add-WindowsFeature AS-NET-Framework,WAS,Web-Common-Http,Web-Asp-Net,Web-Net-Ext,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Http-Logging,Web-Log-Libraries,Web-Request-Monitor,Web-Http-Tracing,Web-Basic-Auth,Web-Windows-Auth,Web-Digest-Auth,Web-Client-Auth,Web-Filtering,Web-Performance,Web-Mgmt-Console,Web-Scripting-Tools,Web-Metabase,Web-Lgcy-Mgmt-Console




Once complete, we will have the IIS, and Windows Process Activation Services all installed and ready.




## SQL Server 2008 R2




Now, we have all we need to get on with the installation, so head back to this post and follow the installation process [http://www.damianflynn.com/2010/10/06/deploying-sql-2008-r2-in-the-lab/](http://www.damianflynn.com/2010/10/06/deploying-sql-2008-r2-in-the-lab/) from the section entitled “**SQL Server 2008 R2 Deployment**”.
