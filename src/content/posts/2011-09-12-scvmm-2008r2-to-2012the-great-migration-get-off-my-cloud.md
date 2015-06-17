---
author: Damian.Flynn
comments: true
publishDate: 2011-09-12 16:38:00+00:00
template: post.hbt
slug: scvmm-2008r2-to-2012the-great-migration-get-off-my-cloud
title: 'SCVMM 2008R2 to 2012–The Great Migration: Get off my Cloud'
wordpress_id: 231
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

At this point of the process, we will now check to see if we have Clouds (UserRoles), which are still floating around the environment, but do not have any Virtual Machines running on the fabric. This will help us focus on only the Clouds which are in use to move over, and ignore the other Clouds.

Now, this is of course not clear cut; Its quite possible that a cloud is still needed, but the current workloads have not yet been deployed, or the users are just mid-process of clearing down the existing. Therefore, use the output of this as information, to combine with your knowledge of which clouds might be in these transition states.

The following function will report back all the UserRoles (Clouds) which have an associated VM running which is owned by a member of the UserRole (Cloud)

With this function we will then store the list of Active UserRoles (Clouds) in a variable, so that we can process this in a moment
    
    $ActiveClouds = Get-SCVMRolesInUse | sort name –Unique




We also will store a list of All UserRoles (Clouds) in a second Variable
    
    $AllClouds = Get-VMMUserRole | select name | sort -Unique name




And, now we can compare the lists, dumping out a list of UserRoles which are NOT associated to the Running VMs
    
    PS> ForEach ($Cloud in $PassiveClouds) { If ($Cloud.SideIndicator -eq "<=") {$Cloud.InputObject.Name | Select Name } }
    
    Name
    ----
    MS HIM
    MS WL CRM - DC Operators
    MS WL CRM - SVR Operators
    MS.Win8
    MS SPWebApps WAW
    MS WL CRM - CLI Operators




Form here, we now have a short simple list of UserRoles (Clouds), which appear not to be in use; this can then be used as a guide to determine from your knowledge if the UserRole (Cloud) is indeed not needed. The suggested action in this case would be to prefix the name of the UserRole with a tag, for example [DECOM], of if you are really sure, just delete the role; In either case, this will allow us to ignore this UserRole (Cloud) for the next stages of the process.
