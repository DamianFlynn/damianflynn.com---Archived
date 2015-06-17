---
author: Damian.Flynn
comments: true
publishDate: 2011-11-01 20:35:00+00:00
template: post.hbt
slug: f5-ip-for-orchestrator-updated-for-rc
title: F5 IP for Orchestrator updated for RC
wordpress_id: 237
categories:
- Blog
tags:
- F5
- SCORCH
- WS/SC
---

The latest build of the F5 IP is now up on Codeplex. This build has even more objects presented, and I have leveraged the excellent experience from Ryan (Thank You) to create the images library, so that we can get some Icons exposed to Orchestrator for each of the runbook objects.

This build now supports both pools and virtual servers, with the ability to now add and remove members, assuming your connection to the F5 has the required permissions. In addition I have added code to detect if the connected Balancer is part of a cluster, and if you are connected to the standby node, then will disconnect you insisting that you work from the active node, otherwise there is no point in adding, removing or changing nodes!

Grab the pack and give it whirl, but test before you hit the production network ![Smile](http://172.16.1.29/wp-content/uploads/2011/11/wlEmoticon-smile.png)
