---
author: Damian.Flynn
comments: true
date: 2011-01-14 22:50:00+00:00
layout: post
slug: ps-server-manager
title: 'PS: Server Manager'
wordpress_id: 31
categories:
- Blog
tags:
- Automation
- PowerShell
- WS/SC
---

As you spend more time deploying servers, Physical or Virtual you will sometimes find that using deployment tools are not the simplest solution to get the job complete in different circumstances. In these scenarios we can fall back to the very powerful PowerShell interface. Server Manager is no exception with its own module packaged as part of Windows 2008 R2.

# Start PowerShell

First open a PowerShell prompt on the node, and once in the shell we need to add the module for **ServerManager** using the following command:
    
    Import-Module ServerManager


![](/assets/posts/2011/01/011411_2144_ServerManag14.png)




# Get the Feature and Role List




After we have done this, we just need to know what commands we can actually use to manage the server; the first command we will get to meet is **Get-WindowsFeature**, This command is going to be kind enough to give us a pretty picture of all the features and roles which we can install on our server. Note that this list will change depending on the OS version, SKU, etc.




![](/assets/posts/2011/01/011411_2144_ServerManag24.png)




So, you will quickly see that this list is not very short!. To make life a little simpler, I have put this list into the table below for you to digest easier
    
    Display Name Name
    ------------ ----
    [ ] Active Directory Certificate Services AD-Certificate
    [ ] Certification Authority ADCS-Cert-Authority
    [ ] Certification Authority Web Enrollment ADCS-Web-Enrollment
    [ ] Online Responder ADCS-Online-Cert
    [ ] Network Device Enrollment Service ADCS-Device-Enrollment




On the Left column, we have the name of the Role/Feature which we would normally install, along with a Square Bracket system which will contain a [X] if the option is installed already. While on the right column, is the role/feature short name which is what we need to use to add a role to the server.




# Add and Remove a Feature or Role




Now, we have enough information to use the shell to install any role or feature. To do this we will use the **Add-WindowsFeature** command. As you can guess this is going to be really simple to do, just listing the name of the roles/features which we would like to install on the server




![](/assets/posts/2011/01/011411_2144_ServerManag3.png)




In the example above, we installed the Telnet-Client feature; we could have shortened this by using **Add-WindowsFeature Telnet-Client** as I really do not need to see the Verbose install process, and the command assumes the default parameter we will be supplying in the role/feature name.




We can only install 1 option per command execution, but we could for example also install all sub roles/features of an option by using the switch **–IncludeAllSubFeature**. This would make installation of IIS for example really simple with a command such as
    
    Add-WindowsFeature Web-WebServer –IncludeAllSubFeature –verbose




And, then assuming we found that there was a feature listed below this group which we would rather not have installed we can then use the command **Remove-WindowsFeature** to take that option back off.




# Example Real Deployment




Great, so that was easy right. Now let's put this together to install the Telnet Client, .NET Framework and IIS without FTP Services on our server
    
    Add-WindowsFeature Telnet-Client –verbose
    Add-WindowsFeature NET-Framework –IncludeAllSubFeature –verbose
    Add-WindowsFeature Web-WebServer –IncludeAllSubFeature –verbose
    Add-WindowsFeature Web-Mgmt-Tools –IncludeAllSubFeature –verbose




![](/assets/posts/2011/01/011411_2144_ServerManag4.png)













And we can check that we have been successful with our options by running a quick **Get-WindowsFeature** to see what is now installed
    
    Get-WindowsFeature




![](/assets/posts/2011/01/011411_2144_ServerManag5.png)













Not to hard now was it?




Happy Installing.
