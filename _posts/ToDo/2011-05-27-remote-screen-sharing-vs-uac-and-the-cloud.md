---
author: Damian.Flynn
comments: true
date: 2011-05-27 11:00:00+00:00
layout: post
slug: remote-screen-sharing-vs-uac-and-the-cloud
title: Remote Screen Sharing vs UAC and the Cloud
wordpress_id: 112
categories:
- Blog
tags:
- Cloud
- General
- WS/SC
---

As we spend time deploying, developing and delivering new solutions to the end users, the infrastructure behind the scenes continue to evolve and get more complex; which no matter how hard we strive, results in some user some where unable to utilize the environment for some reason or other.

Generally the simplest method to resolve the problems, is to see the issue first hand; and for that Screen Sharing tools are invaluable. As I work for an organisation which has a global deployment of Microsoft Lync, accessing the remote screen with the users was normally pretty easy to got quickly into a shared control session.

But, this has in recent times surfaced problems, as more users are mobile, the device they are connecting from is not Windows, and even then good old UAC kick's in which likes to kick me out of the control session.

So, as you know, an upset user is a bad thing, but having the support tools to assist in resolving there issues fail also, is just like pouring petrol on the fire. But Alas there is of course a solution to all this, And NO; I am not speaking of LogMeIn, GoToAssist or any of these hosted services which require mad subscription options, and do not integrate into a enterprise solution very well.

![](http://www.screenconnect.com/Images/Logo.png)  
If you are not already aware, then let me introduce [ScreenConnect.com](http://www.screenconnect.com). This fantastic solution installs on your own servers, is coded in .NET, and can be integrated into your existing technology solution with very little effort. But; that's all good and well, the real magic here is the software is not expensive, and licensing is simply calculated per concurrent support session you expect to be hosting.

The solution is very simple to install, just needs to be published like any web server, making the go-live process painless. The core is .NET and extensible, and for the clients - its just a matter of visiting the new site and clicking on Join Session. From there the rest is automatic, with support for OSX, Linux and Windows Guests (with full control even on the UAC Screen!), Allows for you to remotely restart the remote machine, and automatically reconnect to the session when the computer comes back up - Sweet. And in the latest version they have added support for Android and IOS devices!!

I have no affiliation with ScreenConnect, just a very satisfied user for the past year, and after a horrible day of support issues, I figured that its time I shared one of my favourite support tools with you, as it has proven itself more then able to grant me control to some unusual environments, ultimately getting happy users at the end of the session.

Do yourself a favour, check out their offering, and leave me a comment on your thoughts, and maybe your favourite tool.

Cheers! It's Firday
