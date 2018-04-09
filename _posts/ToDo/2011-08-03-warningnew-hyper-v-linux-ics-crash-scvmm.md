---
author: Damian.Flynn
comments: true
date: 2011-08-03 14:29:00+00:00
layout: post
slug: warningnew-hyper-v-linux-ics-crash-scvmm
title: WARNING!–New Hyper-V Linux IC’s CRASH SCVMM
wordpress_id: 171
categories:
- Blog
tags:
- Hyper-V
- Linux
- SCVMM
- WS/SC
---

After enjoying the fantastic on hold music for a CSS case with an unstable SCVMM installation, I had the pleasure of working with a sharp Support Engineer (DeWitt) where we quickly determined the VM what was causing the pain.

Initially, the node in the cluster was determined, we figured it had unlucky 13 VMs; so we joked about moving a VM to or from the cluster node to fix the issue…. After a little checking, we found the name of the problem VM, which happened to be a CentOS 6.0 node, running the new Linux 3.1 IC’s.

_These IC’s expose an unhandled exception in SCVMM Code, which crashes the service; so if you are running these IC’s and SCVMM 2008 or SCVMM 2012, then STOP NOW, and read carefully. _

These IC’s are publishing data which SCVMM is unable to parse, this issue results in CRASHING the SCVMM Services; As all the IC’s, there are a number of different modules involved (Daemons in Linux Speak) and just one of these is responsible for publishing the data. Stopping and disabling this Daemon will permit SCVMM to continue, while not breaking many of the other fixes.

We can disable to problem Daemon with:

**/sbin/chkconfig –level 35 hv_kvp_daemon off**

And, since its Linux, lets not reboot – lets just stop the daemon:

**/etc/init.d/hv_kvp_daemon stop**

[![image_thumb](/assets/posts/2014/02/image_thumb_thumb.png)](/assets/posts/2014/02/image_thumb5.png)

Microsoft have also posted a Fast Article on this here [http://support.microsoft.com/default.aspx?scid=kb;EN-US;2586286](http://support.microsoft.com/default.aspx?scid=kb;EN-US;2586286)
