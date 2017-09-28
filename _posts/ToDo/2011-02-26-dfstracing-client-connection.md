---
author: Damian.Flynn
comments: true
date: 2011-02-26 23:32:00+00:00
layout: post
slug: dfstracing-client-connection
title: DFS–Tracing Client Connection
wordpress_id: 77
categories:
- Blog
tags:
- AD
- Clients
- DFS
- WS/SC
---

Way off topic, but I just had a really odd issue from some of my VDI and RDA users, which were unable to connect to some shares from our DFS environment.

So, what is so odd? Well of course when I connect to the same VDI or Remote App server I can not reproduce the issue. So, my user shares his screen to show me the proof and unfortunately he is not kidding.

So, my RDA and VDI servers are hosted in a secured network segment, with a select set of ports allowed to specific servers. Since DFS is a session based technology, and balanced over all the domain controllers my first though was the client session was attempting to make a connection to a Domain Controller blocked by a firewall (I know that blocking Domain Controllers is a bad idea, but some situations arise…).  

So, to validate this, we both run the **DFSUtil.exe** which was part of Windows 2003 Support tools, but still works well with 2008 R2 SP1. Running this utility in packet info mode, we can see what the client is trying to connect to – and, my initial theory was good, but not with connecting to a domain controller, it is actually with the DFS Referral Servers!.

[![image](/assets/posts/2011/02/image_thumb32.png)](/assets/posts/2011/02/image35.png)

In a nutshell, my connection was working as I was communicating with a referral server which was not blocked by a firewall, and my end user was not so lucky, and was actually using a referral server which he was not able to communicate with due to the magic firewall.

Final validation of the theory, simply completed buy disabling the Namespace server which is offering the referral service that we could not connect with due to the firewall in the DFS Manager, and low and behold instantly the issue was resolved.

[![clip_image004](/assets/posts/2011/02/clip_image004_thumb.jpg)](/assets/posts/2011/02/clip_image004.jpg)

So – The fix is pretty simple, Update the firewall to let the users in the secure network segment trough the firewall to the referral servers and use the following ports for the communications

**Application protocol - Protocol Port **

  * NetBIOS Datagram Service - UDP 138  
  * NetBIOS Session Service - TCP 139  
  * LDAP Server - TCP 389  
  * LDAP Server - UDP 389  
  * SMB - TCP 445  
  * RPC - TCP 135  
  * Randomly allocated high TCP ports - TCP RANDOM  
  * NetBIOS Datagram Service - UDP 138 

Just another Fun Day as Administering!
