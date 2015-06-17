---
author: Damian.Flynn
comments: true
publishDate: 2011-12-01 20:51:00+00:00
template: post.hbt
slug: linux-ics-3-2-released-for-hyper-v
title: Linux IC’s 3.2 released for Hyper-V
wordpress_id: 245
categories:
- Blog
tags:
- Hyper-V
- Linux
- SCVMM
- WS/SC
---

Microsoft just unleashed the newest Integration Components for Linux operating systems hosted on Hyper-V today.

Among the changes included in this release, is a fix for the Crash issue we experienced with SCVMM 2008 and SCVMM 2012 Beta which we discussed in the post [WARNING! - New Hyper-V Linux IC's CRASH SCVMM](http://www.damianflynn.com/2011/08/03/warningnew-hyper-v-linux-ics-crash-scvmm/) (KB2586286).

What’s new since 3.1, well this is the short list

  * Synthetic Mouse Support: The virtualised mouse device is no longer bound to the VMConnect window, and can now be used with a RDP Session  
  * Merged Device Drivers: We now present a single device driver for both IDE and SCSI devices _(hv_storvsc)_  
  * Windows 8 Fix: The synthetic network device _(hv_netvsc)_ can now be used with a Windows 8 host, eliminating the hang on boot which was previously seen  
  * Improved Setup Experience: Users now only need to run _install.sh_ (as root) to automatically detect the correct architecture and install the appropriate drivers.  
  * Fastpath Boot Support for Hyper-V: Boot devices now take advantage of the block Virtualization Service Client (VSC) to provide enhanced performance.  
  * Timesync: The clock inside the virtual machine will remain synchronized with the clock on the virtualization server with the help of the pluggable time source device.  
  * Integrated Shutdown: Virtual machines running Linux can be shut down from either Hyper-V Manager or System Center Virtual Machine Manager by using the “Shut Down” command.  
  * Symmetric Multi-Processing (SMP) Support: Supported Linux distributions can use up to 4 virtual processors (VP) per virtual machine.  
  * Heartbeat: Allows the virtualization server to detect whether the virtual machine is running and responsive. 

The IC’s are available as open source if your curious to see what is happening under the hood, Grab the [Hyper-V Linux IC's 3.2](http://207.46.154.156/downloads/en/details.aspx?FamilyID=216de3c4-f598-4dff-8a4e-257d4b7a1c12) here now!

Enjoy!
