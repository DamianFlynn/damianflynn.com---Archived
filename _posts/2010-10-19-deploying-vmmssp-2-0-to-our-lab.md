---
authors: Damian Flynn
comments: true
date: 2010-10-19 22:40:00+00:00
layout: post
description: deploying-vmmssp-2-0-to-our-lab
title: Deploying VMMSSP 2.0 To Our Lab
categories:
- Cloud Strategy
- IT Pro/DevOps
- Virtual Machines
tags:
- Hyper-V 
- System Center
- Virtual Machine Manager
- Dashboards
- Self Service
- Cloud
---


System Centre - Self Service Portal V2

As part of the Solution Accelerator program Microsoft has released an extension to the System Centre Virtual Machine Manager 2007 R2 application, which extends greatly the functions and features of the original Self Service portal which shipped as part of the original application suite.

Currently know as VMMSSP2 (that’s Virtual Machine Manager, Self Service Portal version 2) this toolkit runs along side an existing SCVMM deployment, and by using the power of the SCVMM Command Shell, integrates as a new extension without breaking or destroying your existing investment in SCVMM and any its customisation.![](http://www.damianflynn.com/wp-includes/js/tinymce/plugins/wordpress/img/trans.gif)

# Lab Setup

## Guest Virtual Machines

There will be one new virtual machine being introduced into the same lab I set up for the purpose of learning, which we disused recently as we installed SCVMM and SQL Server. All existing systems in that lab will remain in place as we extend the environment with these new technologies.

We will introduce one new virtual machine, which will be hosted as a 2008 R2 Enterprise (Standard can be used) x64 (x64 required) Member Server’s. This server will contain the VMMSSP 2.0 Installation

## Assumptions

  * You have a domain that contains at least one Server 2003 SP2 Domain Controller (DC) 
  * You have configured the IP settings accordingly for all servers to be on the same subnet. I have provided the IP scheme of my lab below, but this will vary depending on your needs and Virtualization Software configuration. 
  * You have already installed a SQL server to host the VMMSSP Databases. VMMSSP does support local SQL installations, but I rather using a real SQL server so to mimic what I would do in a Production environment. I have posted a guide on how to do this here 

## Computer Details

The Following table outlines the detail

<table cellpadding="0" border="0" style="border-top: #a3a3a3 0pt solid; border-right: #a3a3a3 0pt solid; border-collapse: collapse; border-bottom: #a3a3a3 0pt solid; direction: ltr; border-left: #a3a3a3 0pt solid" cellspacing="0" > <tbody > <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**SCVMM 2007 R2 Server**

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**Name**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

DIGI-SCVMM2-01

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**IPv4**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

172.16.1.50

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**IPv6**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**Processors**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

2

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**RAM**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

1.5Gb

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**Disk**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

1 – 40Gb (OS and Application)

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**OS**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

Windows 2008 R2

</td></tr> <tr >
<td width="92" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**Applications**

</td>
<td width="190" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

MS SCVMM 2007 R2 Server 

MS SCVMM 2007 R2 Console 

MS SCVMM 2007 R2 Portal

</td></tr></tbody></table>

# VMMSSP Preparation

Before we got into the fun stuff, I am going to make an assumption here that you have already a SCVMM 2007 R2 environment already installed and running (and If not, get going!).

The install process will be in 2 stages, First we will install the Pre-Required software and modules, and once complete we will move on to the actual installation of the new VMMSSP2 toolkit. Once all this is done, we will take a look back and start the first use configuration steps.

## Prepare Installation

As always, we are going to prepare some of the build tools before we start the process, The Core OS, just needs some roles and features enabled for SCVMM Server to function away happily.

We can do the following process from Powershell or from the GUI, the call is totally yours on which method you are most comfortable with. Out of habit I generally like to do things once or twice in the GUI just to get a feel for the workflow, but it does not take long for my curiosity to grow about what is actually happening on my servers, and thus I will then try the process again from the shell, and enable verbose outputs just to keep me busy reading while the server works away.

## Roles and Features

The following software needs to be installed on the server so as to complete the base system installation. Using the server manager, or the command shell, lets get the following list of modules installed on the server.

.NET Framework

Message Queuing

  * Message Queuing Services  
    * Message Queuing Server  
    * Directory Services Integration 

IIS Web Server

  * Common Feature  
    * Static Content 
    * Default Document 
    * HTTP Redirection 
  * Application Development  
    * ASP.NET  
    * .NET Extensibility  
    * ISAPI Extensions  
    * ISAPI Filters 
  * Security  
    * Basic Authentication 
    * Windows Authentication  
    * Digest Authentication 
  * Performance  
    * Static Content Compression 
    * Dynamic Content Compression 
  * IIS 6 Management Compatibility  
    * IIS Management Console  
    * Management Services  
    * IIS 6 Management Compatibility  
      * IIS 6 Metabase Compatibility 
      * IIS 6 Management Console 

## SQL Server

You know already that in my lab, we will be using my Shared SQL server - DIGI-SQL02 for the database.

## VMM 2007 R2 Admin Console

Ok, the last of the pre-required software modules needed, is the System Centre Virtual Machine Manager 2007 R2 Administrator Console. Installing this will ensure that the correct Powershell modules are available on the server for the VMMSSPv2 services to communicate with our VMM2007R2 environment.

Once, installed, give the node a quick reboot, just to be sure everything has set in correctly, and we will get started on the installation of the new tool kit.

I’ll not go trough the steps as we have covered that in the posting for installing VMM 2007 R2 earlier.

## Service Accounts

Excellent, that was not to painful right. Next we will organize some service accounts for use with our SQL installation. This should save us a little time later waiting for replication as an example to be completed.

<table cellpadding="0" border="0" style="border-top: #a3a3a3 0pt solid; border-right: #a3a3a3 0pt solid; border-collapse: collapse; border-bottom: #a3a3a3 0pt solid; direction: ltr; border-left: #a3a3a3 0pt solid" cellspacing="0" > <tbody > <tr >
<td width="157" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**Service Name**

</td>
<td width="183" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**AD Account**

</td>
<td width="81" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

**Password**

</td></tr> <tr >
<td width="157" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

VMMSSP2 Service Agent

</td>
<td width="183" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

DigiNerve!Digi.svc.VMMSSP2

</td>
<td width="81" style="border-left-width: 0pt; border-right-width: 0pt; vertical-align: top; border-bottom-width: 0pt; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; padding-right: 4pt; border-top-width: 0pt" >

*******

</td></tr></tbody></table>

# VMM SSP 2.0 Deployment

And finally, we are ready to begin. Just one final stop before we kick off the process, lets take a moment to visualize how this Portal integrates with the rest of the Lab.

## Architecture

Brilliantly simple, the new toolkit utilizes

  * A Web Site to provide its interface for your users, Both Admins and End Users  
  * A Windows Service which builds uses Message Queuing and Windows Workflows, to interface with the SCVMM Command Shell. 
  * And a dedicated SQL repository to retain its information. 

[![clip_image001](/assets/posts/2010/11/clip_image001_thumb.png)](/assets/posts/2010/11/clip_image001.png)

The VMMSSP2 Toolkit for System Centre Setup Wizard installs both of the toolkit components. You can install all of the components at once, or you can choose to install either the Web portal component or the server component. The database component installs automatically when you install the server component of the toolkit. When you install the Web portal component, it connects to that database.

_**Important:** You must have administrator permissions on the computers on which you intend to install the toolkit components. You also must be a member of the local Administrators group on the computer running SQL Server._

Before you run the setup wizard, ensure that you have the following information available for the Web Portal Component installation - as an example:

<table cellpadding="0" border="1" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; margin-left: 0.333in; border-left: #a3a3a3 1pt solid" cellspacing="0" > <tbody > <tr >
<td width="167" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Web site name for URL

</td>
<td width="192" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Selfhost.domain.com

</td></tr> <tr >
<td width="167" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Port Number

</td>
<td width="192" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

80

</td></tr> <tr >
<td width="167" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Application pool name

</td>
<td width="192" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

VMMSSP2

</td></tr> <tr >
<td width="167" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Application pool identity

</td>
<td width="192" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DOMAINVMMSSP2-Service

</td></tr></tbody></table>

For the Server component installation we can use :

<table cellpadding="0" border="1" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; margin-left: 0.333in; border-left: #a3a3a3 1pt solid" cellspacing="0" > <tbody > <tr >
<td width="473" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Windows Configuration Foundation (WCF) - Port number for HTTP endpoint

</td>
<td width="190" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

8080

</td></tr> <tr >
<td width="473" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Windows Configuration Foundation (WCF) - Port number for TCP endpoint

</td>
<td width="190" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

8000

</td></tr> <tr >
<td width="473" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Service Account

</td>
<td width="190" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DOMAINVMMSSP2-Service

</td></tr> <tr >
<td width="473" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

User names of administrators (for the VMMSSP2 Admins role)

</td>
<td width="190" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DOMAINUsername

</td></tr></tbody></table>

Finally for the Database settings:

<table cellpadding="0" border="1" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; margin-left: 0.333in; border-left: #a3a3a3 1pt solid" cellspacing="0" > <tbody > <tr >
<td width="183" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

SQL Server Name

</td>
<td width="144" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Digi-SQL01

</td></tr> <tr >
<td width="183" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

SQL Server instance name

</td>
<td width="144" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DefaultInstance

</td></tr> <tr >
<td width="183" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Database name

</td>
<td width="144" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

VMMSSP

</td></tr> <tr >
<td width="183" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Authentication information

</td>
<td width="144" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DOMAINUsername

</td></tr></tbody></table>

## Installing VMMSSP Toolkit.

Before we start the installation process, we need to Add the service account as a local Admin on the node, for example add **_DOMAINVMMSSP2-Service_** to the Local Administrators group in server manager

Once your ready, we can launch the installation wizard and get going. After a few seconds we will be greeted with the Welcome page, simply Click on Install

[![clip_image002](/assets/posts/2010/11/clip_image002_thumb.png)](/assets/posts/2010/11/clip_image002.png)

Review and accept the license agreement, and then click Next.

[![clip_image003](/assets/posts/2010/11/clip_image003_thumb.png)](/assets/posts/2010/11/clip_image003.png)

Click Toolkit server component, click Toolkit Web portal component, and then click Next.

[![clip_image004](/assets/posts/2010/11/clip_image004_thumb.png)](/assets/posts/2010/11/clip_image004.png)

On the Check Prerequisites page, wait for the wizard to complete the prerequisite checks, and then review the results. If any of the prerequisites are missing, follow the instructions provided. When all of the prerequisites are present, click Next.

[![clip_image005](/assets/posts/2010/11/clip_image005_thumb.png)](/assets/posts/2010/11/clip_image005.png)

Accept or change the file location, and then click Next.

[![clip_image006](/assets/posts/2010/11/clip_image006_thumb.png)](/assets/posts/2010/11/clip_image006.png)

Enter the database configuration information. At the bottom of the page, make sure that Create a new database named is selected (the database name is not editable in the current release of the VMMSSP).

When you finish the database configuration, click Next.

[![clip_image007](/assets/posts/2010/11/clip_image007_thumb.png)](/assets/posts/2010/11/clip_image007.png)

Type the user name, password, and domain of an account for the VMMSSP service to use. Make sure that this account has the Log on as a service right. Click Test account to make sure that this account functions. When finished, click Next.

[![clip_image008](/assets/posts/2010/11/clip_image008_thumb.png)](/assets/posts/2010/11/clip_image008.png)

Enter the settings that the Web portal component uses to communicate with the server component. These settings include the name of the computer that runs the server component, and the port numbers of two Windows Communication Foundation (WCF) endpoints. When finished, click Next.

[![clip_image009](/assets/posts/2010/11/clip_image009_thumb.png)](/assets/posts/2010/11/clip_image009.png)

In the Data Center administrators box, type the user names of the accounts that you want to be able to administer the toolkit. In the Web portal, these users will be members of the DCIT Admins role and will have full administrative permissions to the toolkit.

Type the name of the Data Center that the toolkit will interact with. When finished, click Next.

[![clip_image010](/assets/posts/2010/11/clip_image010_thumb.png)](/assets/posts/2010/11/clip_image010.png)

Enter the IIS configuration information for the Web portal component, and then click Next.

Important Remember to use the toolkit service account as the application pool identity.

[![clip_image011](/assets/posts/2010/11/clip_image011_thumb.png)](/assets/posts/2010/11/clip_image011.png)

On the Install the components page, review the settings that you selected, and then click Install. When the installation finishes, click Close.

[![clip_image012](/assets/posts/2010/11/clip_image012_thumb.png)](/assets/posts/2010/11/clip_image012.png)

Now, the installation will continue as the server is configured for us.

[![clip_image013](/assets/posts/2010/11/clip_image013_thumb.png)](/assets/posts/2010/11/clip_image013.png)

Finally, after a few minutes of work, we will get the final result page. We can Click on Close to finish the process.

[![clip_image014](/assets/posts/2010/11/clip_image014_thumb.png)](/assets/posts/2010/11/clip_image014.png)

Just for sanity, Check the Service account is running, and if not start it.

[![clip_image015](/assets/posts/2010/11/clip_image015_thumb.png)](/assets/posts/2010/11/clip_image015.png)

Next check that the Pool in IIS is also running

[![clip_image016](/assets/posts/2010/11/clip_image016_thumb.png)](/assets/posts/2010/11/clip_image016.png)

Magic - your are all set, now we can test that the installation worked. Open the web browser and type in the server name we just installed on (or use localhost if the browser is opened on same server), after a few seconds we should be greeted with a screen similar to this

[![clip_image017](/assets/posts/2010/11/clip_image017_thumb.png)](/assets/posts/2010/11/clip_image017.png)

If this is what you have the pleasure of viewing, then Congratulations, you have VMMSSP2 installed and ready for configuration.
