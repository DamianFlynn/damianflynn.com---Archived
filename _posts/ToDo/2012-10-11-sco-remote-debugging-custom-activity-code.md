---
author: Damian.Flynn
comments: true
date: 2012-10-11 23:33:00+00:00
layout: post
slug: sco-remote-debugging-custom-activity-code
title: Remote Debugging Orchestrator IP
wordpress_id: 662
categories:
- Blog
tags:
- Development
- SCORCH
- WS/SC
---

A little which ago Robert Hearn (now sadly Ex-Microsoft) posted a really useful guide on how to use the Visual Studio debugger to verity your IP Code while it's running. If you are spending anytime working in Visual Studio then I urge you to [read Roberts post here](http://blogs.technet.com/b/orchestrator/archive/2012/04/23/stepping-through-custom-activity-code-using-the-debugger.aspx) as this is the basis of what I am going to add today.

In the post Robert has shared, both his Development and Test is on the same box, which not always will be the case, and with the IPs we need to have some context for the debugging to work; therefore I normally will have a test box located remotely which has access to the resources which will finally be managed in the release version. Debugging in this configuration is what we will cover today –

# Remote Debugging Orchestrator Integration Packs.

First, we need to get our test Orchestrator server ready, so a quick trip to the MS Download Centre where we can grab a copy of the Visual Studio Remote tools - [Visual Studio Download Page](http://www.microsoft.com/visualstudio/eng/downloads). Now it's worth commenting on the fact that Orchestrator is still 32-Bit, but when it comes to these tools, you MUST match your OS architecture, so for me this is Windows 2012, thus 64-Bit.

  1. Once you have the tools install downloaded (its about 40Mb); launch it, and you will be greeted with its splash and the normal legal mumbo jumbo.

[![101112_1620_SCORemoteDe1](/assets/posts/2014/02/101112_1620_SCORemoteDe1_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe1.png)

  2. Hit install, and the wizard gets to work

[![101112_1620_SCORemoteDe2](/assets/posts/2014/02/101112_1620_SCORemoteDe2_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe2.png)

  3. And before you can wink, it is all done

[![101112_1620_SCORemoteDe3](/assets/posts/2014/02/101112_1620_SCORemoteDe3_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe3.png)

  4. Wasting no time, Launch your newly installed utility, and be greeted with the message that the agent is standing by awaiting further actions

[![101112_1620_SCORemoteDe4](/assets/posts/2014/02/101112_1620_SCORemoteDe4_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe4.png)

  5. Before you move on, you need to setup the security around which users can connect to the debugger. I am actually working across domains with no trust, and thus to keep my life simple – I am going to turn off security for my session. Make sure you follow the correct process for your scenario. From the **Tools** menu, select **Options** and then set the options for **No Authentication** and **Allow any user to debug**

[![101112_1620_SCORemoteDe5](/assets/posts/2014/02/101112_1620_SCORemoteDe5_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe5.png)

  6. After clicking Ok, the log will update with the changes, and a warning that this is not a safe configuration! 

# Setting the Scene

In order to determine you have an issue, you will have already a test Runbook configured, and your .NET activity connected up. For my sample, I simply copy over the associated DLL files along with the PDB files from my Development systems Debug folder to this remote server. The folder looks a little like below:

[![101112_1620_SCORemoteDe6](/assets/posts/2014/02/101112_1620_SCORemoteDe6_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe6.png)

  1. From the Tools Menu, I have a configuration stored for my BitLocker IP which I plan to test

[![101112_1620_SCORemoteDe7](/assets/posts/2014/02/101112_1620_SCORemoteDe7_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe7.png)

  2. The configuration is very simple, just pointing to my DLL, selecting the connection class, and providing some details for the connection, nothing odd here

[![101112_1620_SCORemoteDe8](/assets/posts/2014/02/101112_1620_SCORemoteDe8_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe8.png)

  3. My Runbook for testing with is also dead simple; with just a Initialize, .NET and Notification set of activities

[![101112_1620_SCORemoteDe9](/assets/posts/2014/02/101112_1620_SCORemoteDe9_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe9.png)

  4. The interesting one here is the .NET activity, which again is just pointing to my DLL, and the Class I need to debug, along with the connection configuration we just looked at

[![101112_1620_SCORemoteDe10](/assets/posts/2014/02/101112_1620_SCORemoteDe10_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe10.png)

  5. With the only Property, being the name of the computer I wish to query for BitLocker Keys for

[![101112_1620_SCORemoteDe11](/assets/posts/2014/02/101112_1620_SCORemoteDe11_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe11.png)

# Test Cycle

In the Runbook tester, we can give the pack a test to see if it behaves as expected; In my case I am looking to see the BitLocker Information returned to the data bus, as in the screen shot below

[![101112_1620_SCORemoteDe12](/assets/posts/2014/02/101112_1620_SCORemoteDe12_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe12.png)

# Remote Debug Cycle

  1. Start the Runbook tester again, and provide any parameters prompted for, in my case the Computer name

  2. Now, with the Visual Studio Remote Debugging Monitor running, we can monitor its log as we try to connect from our Development machine

  3. From the Debug Menu in Visual Studio, select Attach to Process

[![101112_1620_SCORemoteDe13](/assets/posts/2014/02/101112_1620_SCORemoteDe13_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe13.png)

  4. In the Attach to Process dialog

    1. Change the **Transport** to read **Remote (No Authentication)**  
    2. In the **Qualifier** enter the FQDN or IP address of the remote server  
    3. Click on the **Refresh** button to connect and return a list of running processes  
    4. In the **Attach to:** field you MUST change the **Managed (v3.5, v3.0, v2.0) code**

Now look through the process list and select **PolicyModule.exe**. If you don't see it, make sure the checkbox for "Show processes in all sessions" is checked

[![101112_1620_SCORemoteDe14](/assets/posts/2014/02/101112_1620_SCORemoteDe14_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe14.png)

  5. With a connection made, and our host process located, click **Attach**. Visual Studio will then load up its symbols, and we should be ready for action. Of course make sure you now have a breakpoint set, for example in the Execute method

[![101112_1620_SCORemoteDe15](/assets/posts/2014/02/101112_1620_SCORemoteDe15_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe15.png)

  6. Back on the Runbook tester; step into out DLL Activity which we are about to Debug. As soon as you step into this activity, Visual studio will start to load its symbols in the background, and within a moment the debugger will be live, and you will see for example your Locals, now presented

[![101112_1620_SCORemoteDe16](/assets/posts/2014/02/101112_1620_SCORemoteDe16_thumb.png)](/assets/posts/2014/02/101112_1620_SCORemoteDe16.png)

# Wrap Up

That's all there is to it. Now I am not ashamed to admit that I was stuck with the step "_In the **Attach to:** field you MUST change the **Managed (v3.5, v3.0, v2.0) code**_" for a day or so, as I trusted Visual Studio knew what it was doing, but no such luck. I want to Thank Ryan Andorfer, for pointing out that this setting needs to be explicitly defined.

Enjoy, and we will be back again soon.
