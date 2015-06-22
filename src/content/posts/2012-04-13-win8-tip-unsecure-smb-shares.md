---
author: Damian.Flynn
comments: true
publishDate: 2012-04-13 21:57:00+00:00
template: post.hbt
slug: win8-tip-unsecure-smb-shares
title: 'Win8 Tip: Unsecure SMB shares'
wordpress_id: 314
categories:
- Blog
tags:
- MDT
- SCVMM
- WS/SC
---

With all the focus now on SMB2.2 Microsoft have snuck a nasty little change into the builds which now REQUIREs that all SMB connections are secured. This is not a problem as long as your SMB storage offers up a secure connection, however there are many Linux devices, and NAS devices (Including Hitachi HNAS) which will not co-operate, and you will be greeted with a meagre reply stating that your not welcome.

As normal a fix is not to hard, and in this case, its a registry setting on the computer, turning off the requirement for secure connections; at least until your targets all fall into line. Keeping it simple the following PS command from an Elevated shell will do the trick

**Set-ItemProperty -Path "HKLM:SYSTEMCurrentControlSetServicesLanmanWorkstationParameters" -RequireSecureNegotiate -Value 0 –Force**

[![image_thumb2](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb2_thumb4.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb24.png)

No reboot required, it just works 
