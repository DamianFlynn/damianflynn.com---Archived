---
author: Damian.Flynn
comments: true
publishDate: 2013-04-25 23:21:00+00:00
template: post.hbt
slug: powershell-deployment-toolkit
title: PowerShell Deployment Toolkit
wordpress_id: 737
categories:
- Blog
tags:
- Cloud
- SCCM
- SCOM
- SCORCH
- SCSM
- SCVMM
- WAP
- WS/SC
---

Over the last 8 or so weeks, if you have been following the [Microsoft Blog "Building Clouds",](http://blogs.technet.com/b/privatecloud/archive/tags/deployment+track/) you would have being introduced to the genius that is "Rob Willis".

Rob has created a Powershell 3.0 workflow enabled script, which replaces the *Junk* System Center Unified Installer which was delivered as part of the 2012 suite. Now, I normally don't take pleasure in basing the work for the great engineers within Microsoft, but in the case of the Unified Installer, there will have to be an exception.

If you have any requirement to deliver a lab for working in System Center, the only real option was to grab a coffee, and lock away a couple of hours to click trough the installers, figure out what will go where, and finally get some connectors into place, before you could finally say "Bingo". At which point the Snapshot feature of Hyper-V becomes your very best mate.

The [PowerShell Deployment Toolkit (PDT)](http://blogs.technet.com/b/privatecloud/archive/2013/03/25/deployment-pdt-2-4-is-now-available-on-the-technet-gallery.aspx) changes this forever (or at least I hope it will), Rob has leveraged the power of [PowerShell workflows](http://blogs.technet.com/b/heyscriptingguy/archive/2012/12/26/powershell-workflows-the-basics.aspx) (and if you have no idea what I'm speaking about – start researching and mark my words this is going to play a big part of our future). And leveraging just 2 XML files has a complete unattended solution for installing SC2012SP1.

These files will go out, download EVERYTHING you will need, and then with a little help, create all the VMs for the Lab, before finally getting to grips with the payload and deploying System Center. Rob covers this process in detail on the Building Clouds blog – so go read that, and check out his MMS 2013 presentation if you need to see this work (and you do)!

What I want to cover here, is just a simple trick – the 2 XML files I mentioned are pretty cool, but only one of these is really where we will spend our time, this is called **Variable.xml **and the other has all the logic for checking dependencies for the components, unpacking, installing, integrating, etc.; it's a thought read, but if you like a challenge – then crack open **Workflow.xml**


# Configuration Roles


One of the beauties of this solution is that I can use the PDT to customise how my lab should be deployed, all with a few simple lines of XML, and I do mean simple – this is an example extract from my current file

<!-- Management Console -->


<Role
Name="System Center 2012 SP1 Virtual Machine Manager Console"
Server="PDC-Console.diginerve.lab" ></Role>


<Role
Name="System Center 2012 SP1 Orchestrator Runbook Designer"
Server="PDC-Console.diginerve.lab" ></Role>


<Role
Name="System Center 2012 SP1 Operations Manager Console"
Server="PDC-Console.diginerve.lab" ></Role>


<Role
Name="System Center 2012 SP1 Service Manager Console"
Server="PDC-Console.diginerve.lab" ></Role>


<Role
Name="SQL Server 2012 Management Tools"
Server="PDC-Console.diginerve.lab" ></Role>


<Role
Name="System Center 2012 SP1 Configuration Manager Console"
Server="PDC-Console.diginerve.lab" ></Role>


<!-- Virtual Machine Manager -->


<Role
Name="System Center 2012 SP1 Virtual Machine Manager Database Server"
Server="PDC-SQL2012.diginerve.lab"
Instance="SCVMM"></Role>


<Role
Name="System Center 2012 SP1 Virtual Machine Manager Management Server"
Server="PDC-SC-VMM.diginerve.lab" ></Role>


Here, you can see that I am going to deploy 2 computers to my lab, one of which will be a Management console, onto which I will deploy all the different suite consoles, including the SQL management tools; and to the second server I will deploy SCVMM, but its database will be hosted on a shared SQL server with a dedicated Instance for SCVMM.

One of my first challenges was to figure out what roles I can actually deploy with PDT, and the answer to that is locked in the XML of **Workflow.xml **so for this post, I want, to show you a simple trick to gather out this list of options, so that you can also get started on creating an awesome **Variables.xml **for your personal labs.

PS> $workflowxml = [XML] (Get-Content .Workflow.xml)


PS> $workflowxml.Installer.Roles.Role | Select Component, Name


This will then pump out to screen in the Name column all the Roles which you can define for your configuration

![](http://blogstorage.damianflynn.com/wordpress/2013/04/042513_1133_PowerShellD1.png)

Now go play…
