---
author: Damian.Flynn
comments: true
publishDate: 2011-07-07 14:16:00+00:00
template: post.hbt
slug: failover-clustering-and-scvmm2008r2-vm-missing
title: Failover Clustering and SCVMM2008R2 = VM Missing?
wordpress_id: 153
categories:
- Blog
tags:
- SCVMM
- WS/SC
---

So, some genius on you environment needs to do work on your Hyper-V host, but is oblivious to all the magic which is going on in the back room with SCVMM to keep the private cloud ticking; which is only elaborated with a refresher bug still in 2008 R2 which decides to mark these moved VMs as missing.

This is the typical command we see the guilty use, which will in sequence move all the VMs from one Cluster node to another; and yes this has no error correction for when the node will be fully occupied etc.
    
    #Prepare the PowerShell Environment, and connect to the relevant services
    Import-Module FailoverClusters
    
    
    #Execute the commands to find and move the VMs
    Get-ClusterNode 2K8-HyperV-01 | Get-ClusterGroup | where-object {$_.Name –match “df-*“} | Move-ClusterVirtualMachine 2K8-HyperV-02
    
    




  
So, we better take a look at at how we can do this, and keep the SCVMM environment happy; and also not have any of our Self Service users unable to manage their virtual machines, and generating upset. A second step must also be completed, which is to put the node into maintenance mode once the moves are completed, this is required so that the self service system will not target this host for new VM Creation while maintenance work is been executed on the host. Failing to do this might result in creation jobs been assigned to the node which is currently been worked on, and leaving users felling like there are issues.  

    
    #Prepare the PowerShell Environment, and connect to the relevant services
    Add-PSSnapin Microsoft.SystemCenter.VirtualMachineManager
    Get-VMMServer –ComputerName SCVMM2008R2
    
    
    #Execute the commands to find and move the VMs
    Get-VM –VMHost 2K8-HyperV-01 | Move-VM -VMHost 2K8-HyperV-02
    Set-VMHost  –VMHost 2K8-HyperV-01  –MaintenanceHost $true
    
    




  
Now, one point of importance, is the modules needed for using this last option is to use SCVMM2008R2; You can use PowerShell Remoting to make this far less painful if you use the flowing commands which will redirect your PS session.  

    
    Enter-PSSession –ComputerName SCVMM2008R2
    
    




And don’t forget to exit once you have completed your work. Also be aware that firewall rules apply here, and you might need to supply credentials!




Now, we can live in a happy place again




-d
