---
author: Damian.Flynn
comments: true
date: 2011-01-26 22:59:00+00:00
layout: post
slug: remote-apps-with-xp-sp3
title: Remote Apps with XP SP3
wordpress_id: 39
categories:
- Blog
tags:
- Clients
- Remote Desktop
- WS/SC
---

Out of the box Windows XP SP3 systems will encounter some issues when connecting to remote applications as they are offered from the Remote Desktop Web Access interface.

There are 2 items which need to always be checked on the client before we can hope for a successful connection

  * We must use the Remote Desktop Client 6.1 or newer  
  * We must enable the CredSSP functions in XP SP3 

Microsoft have made this really easy for us to address by publishing two KB articles with the required software attached to each article

  * RDP - [http://support.microsoft.com/kb/969084](http://support.microsoft.com/kb/969084)  
  * CresSSP - [http://support.microsoft.com/kb/951608/](http://support.microsoft.com/kb/951608/)

After both of these are applied and the computer is rebooted, you should be ready to dip your feet!
