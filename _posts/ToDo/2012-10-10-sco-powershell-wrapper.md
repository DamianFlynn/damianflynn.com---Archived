---
author: Damian.Flynn
comments: true
date: 2012-10-10 12:57:00+00:00
layout: post
slug: sco-powershell-wrapper
title: SCO – PowerShell Wrapper
wordpress_id: 562
categories:
- Blog
tags:
- PowerShell
- SCORCH
- WS/SC
---

Many times when I set out to create a Runbook, I will need to revert to using PowerShell until I get the opportunity to compile an Integration Pack for the task. Over the months this has become more of a habit and I ended up creating a template which I now utilize for almost all my .NET Script activates.

I don't always load onto my Runbook servers all the PowerShell modules under the moon, and instead prefer to have a server which acts as my management box; to which I can utilize the Web PowerShell UI, or simple PS Remote to, knowing that all the relevant modules are present. Thus, this is the server which I will generally point my Runbook activates to also.

The following snip is what I use as my template – which if you look inside the code block, will in this example import the SC VMM module, connect to the server, and return some details about My Cloud

$password = convertTo-secureString -string "PASSWORD" -asPlainText -force;  


$credential = new-object System.Management.automation.Pscredential ("DOMAINUsername" , $password);  


$session = New-PSSession -computername "VMMServer" -credential $credential -port 5985 -Authentication Default;  


$test = Invoke-Command -session $session -scriptblock {

Import-Module virtualmachinemanager; Get-SCVMMServer -ComputerName "scvmm2012"; Get-SCCloud -Name "My Cloud" | select Description;

}  


remove-pssession -session $session;  


In Context of the .NET Script Activity with the parameters passed from the pipeline, it looks like this

[![101012_1338_SCOPowerShe1](/assets/posts/2014/02/101012_1338_SCOPowerShe1_thumb.png)](/assets/posts/2014/02/101012_1338_SCOPowerShe1.png)

One of the other benefits here, is that due to doing PS remoting, I can provide alternative credentials – but don't forget the CredSSP and double hop J
