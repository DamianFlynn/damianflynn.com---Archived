---
author: Damian.Flynn
comments: true
publishDate: 2013-03-05 23:24:00+00:00
template: post.hbt
slug: cisco-nexus-1000v-overview
title: Cisco Nexus 1000v Overview
wordpress_id: 729
categories:
- Blog
tags:
- Cloud
- Hyper-V
- SCVMM
- WS/SC
---

The Cisco Nexus 1000V is a Layer 2 distributed virtual switch, originally developed and implemented in 2009 for VMware vSphere 4.0. The Nexus 1000v is crafted from the same operating system which Cisco utilizes for their physical Nexus switches, Cisco NX-OS. Additionally, the Nexus 1000v is fully standards compliant, ensuring that you do not require to have physical Nexus switches to bridge the physical and virtual worlds, permitting you to utilize your current infrastructure. Environment which are already Nexus enabled will benefit from a single unified experience spanning both the physical and virtual ecosystems, with the Nexus 1000v seamless integrating into your current network management solutions, from Cisco and 3rd Parties, e.g. SolarWinds.


## Structure


The Nexus 1000v is composed of two components, mapping from the modular physical enterprise world, to the Virtual world.



	
  * 


**Virtual Supervisor Module (VSM)
**



	
    * The VSM are essentially implemented as a Virtual Machine running on your chose Hypervisor (Hyper-V of course), or a physical appliance such as the Nexus 1100

	
    * The VSM is analogous to the Supervisor which you find in normal enterprise class modular switches.

	
    * VSMs are normally deployed in pairs, similar to their physical counterparts and are responsible for all the switch's logic actions – the CPU of the environment in an Active/Passive configuration, hosting the NX-OS environment.




	
  * 


**Virtual Ethernet Module (VEM)
**



	
    * The VEM is essentially an Extensible Switch Filter deployed to the extensible switch on each Hyper-V host

	
    * The VEM is analogues to the Line cards found in the modular switch, which host the Ethernet ports to which we connect our systems, in this case Virtual Network Interfaces of the VM.

	
    * A VSM supports up to 64 VEMs in a distributed logical switch model, with each VEM represented in NX-OS of the VSM as line cards (with the port description automatically representing the VM Name)







[![030613_1421_CiscoNexus11](http://blogstorage.damianflynn.com/wordpress/2014/08/030613_1421_CiscoNexus11.png)](http://blogstorage.damianflynn.com/wordpress/2014/08/030613_1421_CiscoNexus11.png)






## Deployment


Deploying the Nexus 1000v is completed tough to use of a simple installation wizard, which generates 2 Virtual Machines and attaches an installation ISO to deploy the Supervisor operating systems (NX-OS) and their heartbeat for High availability. The Extensible switch modules are then deployed to the relevant hosts, and create a tunnel back to the VSM for configuration; these modules can be manually deployed, or through the use of SCVMM 2012 SP1 can be automatically distributed and enabled.

Connecting the Nexus 1000V virtual network with the physical upstream network, is achieved by utilizing the host network adaptors connected to the extensible switch. These can be bonded to create large trunks of 6 active ports, and 6 passive ports per host. These ports can also be distributed across multiple physical switches for high availability.

The Nexus 1000v is an enterprise class, proof of concept ready solution, which strategically redefines the network for cloud.


## Can you afford to miss out…


Regardless of your environments side, you need to consider the Nexus 1000v as core network component for Virtualization/Cloud project. Its proven enterprise history, Cisco's dedication to NX-OS with over 2000 active engineers, and its unbeatable production costs.

The Nexus 1000v will be available in 2 Editions, the following table illustrates the cost and feature comparison


[![030613_1421_CiscoNexus12](http://blogstorage.damianflynn.com/wordpress/2014/08/030613_1421_CiscoNexus12.png)](http://blogstorage.damianflynn.com/wordpress/2014/08/030613_1421_CiscoNexus12.png)



Investigate this platform now, learn about vPath and the Cisco virtual services vision; treat your Hypervisor, treat your business.

Learn more - [https://communities.cisco.com/community/technology/datacenter/nexus1000v](https://communities.cisco.com/community/technology/datacenter/nexus1000v)

Happy Networking

Damian
