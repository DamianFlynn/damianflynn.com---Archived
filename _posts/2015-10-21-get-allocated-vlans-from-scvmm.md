---
author: Damian Flynn
comments: true
date: 2015-10-21 22:32:00
layout: post
title: "SCVMM: Report the Currently Allocated VLANs"
categories: 
categories:
- IT Pro/DevOps
- Monitoring & Management
- Networking
- Supportability
- Virtual Machines
tags:
- PowerShell
- Virtual Machines / IaaS
- Networking
- Software Defined Networking
- System Center
- Virtual Machine Manager
- Cloud
- Windows Azure Pack
---

As we place existing Hyper-V Clusters under the management scope of Virtual Machine Manager, one of the first real tasks we need to undertake is the establishment of a good logical network implementation.

Before we can get to deeply involved in that process, we first need to audit what we have in place and in use currently.

This following function will recurse trough the nodes and VMs on the cluster, and provide back a unique list of VLANs which are currently occupied by the clusters resources.

```powershell
Function Get-ClusterVLANList {
[CmdletBinding()]
	param (
		[String] $Cluster
	)

	Begin {
    #Create an arrary for the VLAN list
    $vlanid = @()
    Write-Output "Cluster: $($ClusterName)"
    foreach ($node in (Get-VMHostCluster -Name $ClusterName).nodes) {
      # Get a list of VMs hosted on the active Host
      Write-Output "Hostname: $($node.ComputerName)"

      foreach ($VM in (Get-SCVirtualMachine -VMHost $node.ComputerName)) {
        # Get a list of VLANs hosted on the active VM
        Write-Output "  VMname: $($vm.Name)"
        $vlanid += (Get-SCVirtualMachine -Name $vm.name).VirtualNetworkAdapters.vlanid
      }
    }

  return ($vlandid | sort-object -unique)
  }
}
```

Just call this function with the name of the cluster, and let it do its work for you

```powershell
$VLANList = Get-ClusterVLANList -Cluster <MyCluster>
```

The results will be placed in the variable ```$VLANList``` which we can use to help us on this journey.
