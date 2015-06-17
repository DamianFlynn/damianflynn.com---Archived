---
author: Damian.Flynn
comments: true
publishDate: 2011-09-05 16:28:00+00:00
template: post.hbt
slug: scvmm-2008r2-to-2012the-great-migration-validation
title: 'SCVMM 2008R2 to 2012–The Great Migration: Validation'
wordpress_id: 209
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

With the RTM of SCVMM 2012 approaching very quickly, as part of my final tasks in the TAP program, I will begin the exercise of removing all the 2008R2 servers from the environment. Now, there are many ways that this can be addressed, however most of the approach's are not addressing my needs, so I am going to progress with a side load migration type solution.

What do I mean by side load? Well – let’s first outline what is not supported and they we can look at what I am going to be doing. SCVMM 2012 will support the notion of upgrading an existing SCVMM 2008 R2 server to SCVMM 2012 and during the process make some edits and changes to roles, and libraries to work within the boundaries of the new models.

However, SCVMM 2012, does not have any support to export setting from a 2008 R2 environment and Import these directly into 2012. Which is a scenario that I for one would clearly desire, as I am going to utilize this opportunity to consolidate my 2008 R2 deployments into a single 2012 Environment. One approach here of course would be to first upgrade all 2008 R2 installations to 2012, and then export and import settings into a new master server; however this is a lot more work, and I have no idea what the impact will be each time, for any self service users, or other dependants.

So, over the next few weeks I am going to do this process manually, I am going to overview the stages of cleaning up the 2008 environment, exporting some data and then importing this by hook or by crook into the 2012 installation; thus begins the 2008R2 to 2012 Great Migration

## Virtual Machines

There are many assets in out 2008 Environment, and none of them are more important than the Virtual Machines we host on the environment. In preparation to migrate from SCVMM 2008 over to the new 2012 environment, to ensure that we only migrate active projects (Clouds) we will run a number of steps to ensure that the environment metadata is accurate and clean.

One point to keep in mind, The implementation of clouds with SCVMM 2008 is very much based on a Pseudo effort where we are utilizing the SCVMM Role concept as the Could boundary. In the new 2012 product this concept has evolved, and we are now offered a could level in the hierarchy; therefore the metadata we will manage and maintain trough out this exercise will need to be manipulated before we import this data into the new 2012 installation.

As we progress trough this series of exercises, we will rely mainly on the Powershell interface, referencing the UI as we progress for validation.

### VM Owners

The very first step in ensuring that we have a clean migration path, and that every Virtual Machine will be assigned to the correct cloud at the end of this process is to ensure that in the current environment that each Virtual Machine has an owner.

_All of the PowerShell functions we are going to use trough out this process will require either the SCVMM 2008 or SCVMM 2012 modules to be loaded, when additional modules are required I will call this out, but for these initial exercises we are going to focus on the current 2008 environment and as such will be working with the SCVMM 2008 modules._

Our first command will report back to us a sorted list of AD Groups, which are each associated to the User Role in SCVMM 2008, (Our List Of Cloud Groups) along with the number of Virtual Machines currently associated with each of these groups.
    
    PS> get-vm | group Owner | sort name | select Name, count
    
    Name                              Count
    ----                              -----
    DEMO!CLOUD Canon Testing Admins    14
    DEMO!CLOUD Dell Training Admins     1
    DEMO!CLOUD LIOX MTL Web Admins      2
    DEMO!CLOUD LIOX RnD Web Admins     15
    DEMO!CLOUD MS SCOM Admins           1
    DEMO!CLOUD MS SCCM Admins           1
    DEMO!CLOUD MS Win7 Admins           2
    ...
    DEMOAibanez                         2
    DEMOReinfelds                       1
    DEMODedios                          2
    DEMOmilo                            5
    DEMOManzanares                      2
    DEMOSobolewski                      5
    DEMOBlonski                         7
    DEMOYuan                            1
    Unknown                             42




From this report, we are looking to identify, which if any of these Owners is not actually an AD group, this is because every Role in SCVMM which we define should be associated to an Active Directory Group for its 'Cloud' Access. If the results of the query present back users or Unknown as owners of virtual machines, you should go back to SCVMM, and update every VM (you can use the GUI to address these one at a time as you do not want to assign VMs to the wrong owners!) until it has a group as its owner.




Run the command a few times until you are sure that you have all the VMs been correctly owned by a Group; once you are satisfied that this is good we will move on and verify the user roles also.




## User Roles




At this point, before we do any deeper analysis, we should really verify that the above statement is also valid, and that we have not defined any Roles, which are owned by an AD user, and not an AD Group. The process for this is again very simple, we will report on the User roles just focusing on the member list to ensure that what we have configured looks correct.
    
    PS> Get-VMMUserRole | select name, members
    
    Name                    Members
    ----                    -------
    Canon Printers          {DEMO!CLOUD Canon Testing Admins}
    Oracle FR               {DEMO!CLOUD Lab Administrators, DEMO!CLOUD Oracle FR, CO...
    CBS Development         {DEMOoscar, DEMO!CLOUD CBS Development Admins, C...
    Dell Training Lab       {DEMO!CLOUD Dell Training Lab Admins}
    MS SCOM Eval Lab        {DEMO!CLOUD MS SCOM EVAL LAB Admins}
    ...
    




The output of this command, will show us on the Left, the name of the Role (Our Pseudo Cloud Name) and on the right within {} braces, the Groups which have been provided access to this role. We can quickly see that many of our clouds have more then one member, which itself is not a problem, however we really want to check this list to see if the members has at least a single group within the list, and if not we need to check the role closer.




By know, you will also have noticed that I am using a simple naming convention in AD, which I am adding a prefix to each of my groups which are associated with the Cloud, which really assists in ensuring that we can quickly audit the information I have, and at a glance determine if some access delegations might actually be incorrect.




We should spend a little time to ensure that the roles have at least one group in each, before we progress to the next stage. If you feel that renaming or changing groups to get your system into a structured fashion, now is as good a time as any, as you can just add these to the existing role and VM owners, with the confidence that this is a manageable change.




Great, now we have our first tasks clear, we will spend a little time getting this perfect and be ready for the next step.




Until then – be careful 
