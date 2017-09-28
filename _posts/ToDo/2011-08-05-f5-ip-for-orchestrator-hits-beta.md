---
author: Damian.Flynn
comments: true
date: 2011-08-05 14:31:00+00:00
layout: post
slug: f5-ip-for-orchestrator-hits-beta
title: F5 IP for Orchestrator hits Beta
wordpress_id: 173
categories:
- Blog
tags:
- Automation
- F5
- SCORCH
- WS/SC
---

This evening I have the pleasure of updating CodePlex with the latest code for my Integration Pack for the F5 Load Balancer. This drop gets us all the way to Beta status, with no issues reported against my own testing, or the users whom have already downloaded the Alpha code posted just 2 weeks ago.

This IP has now double the number of objects exposed from the initial build, and a lot more logic for testing and checking; including verifying that the credentials used to connect with the F5 has role privileges. Testing was conducted on the Virtual Appliance version 10.1 and then validation carried out on our F5 Production Cluster.

In this build the following functions are exposed for gathering information:

**Virtual Servers**

  * Get Local LB Virtual Servers  
  * Get Local LB Virtual Server Pool Status 

**Pools**

  * Get Local LB Pools  
  * Get Local LB Pool Members  
  * Get Local LB Pool Member Status 

_for setting members_

  * Set Local LB Pool Member Status 

_and member manipulation_

  * Add Local LB Pool Member  
  * Remove Local LB Pool Member 

Grab a copy of the IP, give it a shot and let me know how you get on, Ill post some sample run book's I have created with the IP.

Link here - [http://orchestratorf5.codeplex.com/](http://orchestratorf5.codeplex.com/)
