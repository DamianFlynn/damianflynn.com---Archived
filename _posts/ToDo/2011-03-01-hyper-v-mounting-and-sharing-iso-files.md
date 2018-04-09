---
author: Damian.Flynn
comments: true
date: 2011-03-01 23:37:00+00:00
layout: post
slug: hyper-v-mounting-and-sharing-iso-files
title: Hyper-V Mounting and Sharing ISO Files
wordpress_id: 83
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

As we spent time on the Self Service portal for Virtual Machine Manager, we will continue to exercise the ability to use some ISOs for booting the VMs directly, and I often publish these resources to their console. However it was not long before they reported a horrible message which needed a little reading to figure out

_**Error (12700)   
**VMM cannot complete the Hyper-V operation on the HYPER-V.host server because of the error: 'MY-VM' failed to add device 'Microsoft Virtual CD/DVD Disk'. (Virtual machine ID 2A82C375-BBC3-429D-8568-F41453538AC5)_

_'MY-VM': User account does not have permission required to open attachment 'FileServer.HostISOsNIXCentOS5.4CentOS-5.4-x86_64-bin-DVD.iso'. Error: 'General access denied error' (0x80070005). (Virtual machine ID 2A82C375-BBC3-429D-8568-F41453538AC5)   
(Unknown error (0x8001)) _

_Recommended Action   
Resolve the issue in Hyper-V and then try the operation again._

If any of you have ever tried to mount a ISO on Hyper-V Host A while using the console from Hyper-V Host B, you will recognise this message in a different form. 

# The Solution

So, the fix is not to difficult, some additional steps are required for each Hyper-V Host deployed, and the Library Servers

## **Library Server**

The server which will host the ISO files been shared for use by the Hyper-V nodes is generally considered as the Library server (this is also the term used in SCVMM). The following step Must be repeated for each new Hyper-V Server added to the environment, AND for each Library server which will be utilized by the Hyper-V Server.

On each server with the shared ISO folder (Library Servers):

  1. Set the NTFS permissions to Full for the Hyper-V computer Account.  
  2. Set the Share permissions to FULL for the Hyper-V computer Account. 

### **Active Directory Delegation**

Once each Hyper-V server on has been set up, the following series of steps need to happen before the Hyper-V server will be allowed to mount a network share. If these steps are not done, Hyper-V will throw a “General access denied error” whenever an attempt is made to mount a network located ISO in a VM.

This delegation will be using Constrained Delegation to remotely manage a server running Hyper-V that uses CIFS/SMB file shares. 

On a domain DC:

  1. Open **Active Directory Users and Computers**  
  2. Find the **Hyper-V server** computer object and double click on it.  
  3. **Click** the **Delegation** tab.  
  4. **Click **on **Trust this computer for delegation to the specified services only** radio button.  
  5. **Click** the **Use any authentication protocol** radio button.  
  6. **Click** the **Add** button.  
  7. **Click** the **Users or Computers…** button.  
  8. In the _Add Services_ dialog box, click **Users or Computers**, _enter the name of each library server_ that stores ISO image files, and then click **OK**.  
  9. Click on the **cifs** Service Type and click the **OK** button.  
  10. Click the **Apply** and **OK** buttons. 

[![clip_image001](http://lh3.ggpht.com/_SncQAdkhWiY/TH1vhSOYzII/AAAAAAAAAJc/T3U9QfvwSEo/clip_image001_thumb%5B1%5D.jpg?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/TH1vghVQrMI/AAAAAAAAAJY/JPIkKEBKUX8/s1600-h/clip_image001%5B4%5D.jpg)

Once the above two procedures have been accomplished, allow replication to complete. Reboot the Hyper-V box if it still gives the General Access Denied error. Once complete the ISO should mount in the VM via the Hyper-V Manager with no problems.
