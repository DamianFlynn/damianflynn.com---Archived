---
author: Damian.Flynn
comments: true
date: 2011-05-18 10:55:00+00:00
layout: post
slug: linux-vm-configuration-from-powershell
title: Linux VM Configuration from PowerShell
wordpress_id: 108
categories:
- Blog
tags:
- Cloud
- Linux
- SCVMM
- WS/SC
---

Working on VM’s daily there are some things which you just wish could be automated, and Linux nodes are no exception to this.

However today, one of my favourite Linux VM bloggers for Hyper-V has answered a lot of prayers in a tiny package.

[Yusuf Ozturk](http://www.yusufozturk.info) has just created a magical PowerShell Module for setting up Linux VM, called simply **[Set-LinuxVM](http://www.yusufozturk.info/virtual-machine-manager/unattended-linux-vm-configuration-tool-for-hyper-v.html).**

If you use Linux VMs with Hyper-V (or SCVMM) then you need to check this out, As per his own words, some of the features include:

**1)** Unattended IP, Hostname and DNS configuration for Linux VMs.   
**2)** Automatic Linux integration components installation.   
**3)** Multi Distro Support: Debian, Ubuntu, Centos, Fedora, Redhat and Suse!   
**4)** Automatic CPanel installation for Redhat and Centos   
**5)** Linux VM Template support (Use Skip for EnableLIC switch)   
**6)** Hyper-V support! You don’t need SCVMM to use this script.   
**7)** Multiple Hyper-V and SCVMM host support.   
**8)** Automatic Emulated NIC to Synthetic NIC support.   
**9)** No need to internet connection (SSH access etc.) or additional changes on VM.   
**10)** Custom Answer File support! You can execute your own scripts.

Super Cool.
