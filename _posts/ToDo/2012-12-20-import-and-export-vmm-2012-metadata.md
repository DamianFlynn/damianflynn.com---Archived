---
author: Damian.Flynn
comments: true
date: 2012-12-20 23:28:00+00:00
layout: post
slug: import-and-export-vmm-2012-metadata
title: Import and Export VMM 2012 Metadata
wordpress_id: 716
categories:
- Blog
tags:
- SCVMM
- WS/SC
---

A number of years back, in the era of VMM 2008, a smart cookie from Microsoft called "Michael Michael" (or M2) , published an article on exporting and importing VM data ([http://blogs.technet.com/b/m2/archive/2010/04/16/saving-and-re-applying-the-virtual-machine-metadata-in-vmm.aspx](http://blogs.technet.com/b/m2/archive/2010/04/16/saving-and-re-applying-the-virtual-machine-metadata-in-vmm.aspx)) in the event you needed a hammer and sledge option for resolving unnamed issues.

The concept of article still stands very true in VMM 2012 and 2012 SP1, however there are some additional export features now embedded in the product also which one could leverage. However, as things happen I recently had a requirement of backing out a cluster of nodes from my VMM server with all the VMs intact, to address an issue, before reading the cluster and all its VMs back under VMMs management scope again.

The price of such a move was that I would no longer have any metadata on these VMs once SCVMM re-enrolled them the environment including roles, quotas, clouds, etc. This as you can imagine in a private cloud is not going to cut any mustard, and I was under a very small outage window.

Hence, I took the opportunity to rev the code from "Michael Michael", and make it VMM 2012 aware.

Now before you start spamming that this code is not sexy PowerShell, I remind you that I was under the gun, and did not have time to refactor into functions etc, and figured that sharing this would save you some time in the case of an emergency also. It might not be pretty, but it works.

# Export Metadata

Right, enough waffle, lets dump the data to an XML File, which I am placing in the current folder and calling _exportedproperties.xml_. In addition I am filtering the hosts which I am exporting from, as I have a LOT of them, and really only need to care about the nodes which need attention. You can remove this filter or update to match your environment by editing the match clause in this section of the command "? {$_.HostName -like "hyperv*"}", Replacing _hyperv*_ with your own wildcard string

#Code to export the metadata of the Virtual Machines on the cluster 

get-vm | ? {$_.HostName -like   
"hyperv*"} | **select** hostname, name, vmID, ID, @{Name='Custom1';Expression={$_.CustomProperties[0]}}, @{Name='Custom2';Expression={$_.CustomProperties[1]}},@{Name='Custom3';Expression={$_.CustomProperties[2]}},@{Name='Custom4';Expression={$_.CustomProperties[3]}},@{Name='Custom5';Expression={$_.CustomProperties[4]}},@{Name='Custom6';Expression={$_.CustomProperties[5]}},@{Name='Custom7';Expression={$_.CustomProperties[6]}},@{Name='Custom8';Expression={$_.CustomProperties[7]}},@{Name='Custom9';Expression={$_.CustomProperties[8]}},@{Name='Custom10';Expression={$_.CustomProperties[9]}}, OwnerSid, Tag, CostCenter, SelfServiceUserRole, OperatingSystem, QuotaPoint, UserRole, UserRoleID, Owner, Description, cloud| **export-clixml**   
"exportedproperties.xml"   


# Import the Metadata

After you have removed and reimported the nodes back into VMM, we need to look at the restore code, you can paste as is, or place it in a file for example _RestoreMetadata.PS1_. Again, the data file is in my current folder and called _exportedproperties.xml_

Hope this saves you a little time (and hair)
