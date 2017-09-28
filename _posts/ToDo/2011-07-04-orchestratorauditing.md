---
author: Damian.Flynn
comments: true
date: 2011-07-04 14:07:00+00:00
layout: post
slug: orchestratorauditing
title: Orchestrator–Auditing?
wordpress_id: 146
categories:
- Blog
tags:
- Automation
- SCORCH
- WS/SC
---

If you have started using the Orchestrator 2012 product for some of your test and evaluation work, you likely have also been checking out some of the really cool information shared by Robert Herne and Charles Joy.

One of the first things that I like to do is enable the Auditing functions, however with Orchestrator 2012 some of the folders have been re-organised so where do we find this setting?

The new home is _C:Program Files (x86)Microsoft System CenterOrchestrator 2012Opalis Integration ServerManagement Service_

[![image](/assets/posts/2014/02/image_thumb.png)](/assets/posts/2014/02/image.png)

Just open a console session, and navigate to this folder; there we can run the **_atlc.exe_** command with the enable switch to turn on auditing, for example we would run

_atlc.exe /enable_

[![image_thumb1](/assets/posts/2014/02/image_thumb1_thumb.png)](/assets/posts/2014/02/image_thumb1.png)

After we enable this, we can run some policys/runbooks and when we go back to the file system we will now see some new audit logs.

The audit logs will be located at the following location’s:



	
  * _C:Program Files (x86)Microsoft System CenterOrchestrator 2012Opalis Integration ServerManagement ServiceAudit _

	
  * _C:Program Files (x86)Microsoft System CenterOrchestrator 2012Opalis Integration ServerAction ServerAudit_


Opening up the .CSV files in the audit folders will then allow us see the audit information, which on the Management Service includes

	
  * When the Policy was Started

	
  * Name of the Action Server Used

	
  * User whom Started the Policy/Runbook

	
  * and the Name of the Policy/Runbook called


[![image_thumb2](/assets/posts/2014/02/image_thumb2_thumb1.png)](/assets/posts/2014/02/image_thumb21.png)

A new log is created for every 200Mb of data stored.

Have Fun!
