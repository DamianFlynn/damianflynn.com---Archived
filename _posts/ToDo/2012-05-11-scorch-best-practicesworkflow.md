---
author: Damian.Flynn
comments: true
date: 2012-05-11 23:01:00+00:00
layout: post
slug: scorch-best-practicesworkflow
title: SCORCH Best Practices–Workflow
wordpress_id: 444
categories:
- Blog
tags:
- SCORCH
- WS/SC
---

Continuing on the Best Practice band wagon for Orchestrator, this time we will take a peek at the ever sensitive workflows which glue the Runbook’s together.

These are all pretty sensible, but none the less, darn right important to get documented, as getting everyone on the same page at the start is always good thing, and far better than having to come back later and sort out what might be an ugly mess.

# Workflow

So what is workflow - simply the process of getting stuff moving; passing data from one place to another, and making sure its all safe. Obvious really, right? We’ll lets consider some of these…

## Embedded Credentials

One pretty neat option offered in almost all the activities is the ability to deliver some credentials to execute a process under. There are of course situations where this is just part of life we need simply deal with it, but it is clearly not optimal.

Illustrating the reasons is trivial – consider the Developer of the initial Runbook finding that they required some special credentials to access a resource; Ingenuity kicks in and before you know it, we just provided the credentials of a service account or worse our own, but hey presto the Runbook works now…. we have all done it, so no frowns! You know what happens next… Dude leaves, Password expires, Stuff stops working…

[![image_thumb11](/assets/posts/2014/02/image_thumb11_thumb.png)](/assets/posts/2014/02/image_thumb111.png)

So, in plain english - the default is a default for a reason; and recommend that we keep it that way.

IF, and only IF, you do need to provide some reason a credential, then do NOT type it in directly to the dialog. Encrypted Variables are available in the RTM version of SCO 2012; so use these! Alternative options are a bit more complex, but also worth considering, these include using the PowerShell Integration from Microsoft which permits credentials also to be stored securely.

Another approach which I have seen is to pass in the credentials as part of the Runbook parameters; this is a bad plan, as this will be clear text for sure, and if you are really lucky this information will be peppered in the logs for everyone to digest.

# Parameter Size

Parameters should be keep small, Orchestrator has different points on the data bus / pipeline where the data is consumed and returned; and unfortunately not every activity is built the same; which results in different ‘capacity’ levels. Therefore it is quite possible to see a large parameter be consumed by an activity, only to be truncated when the results are posted back to the bus. Where possible always post references to these data blobs and let the associated activity do the work natively, a simple example of this would be the SQL Activity; allowing it to process the data trough queries and only return the small amount of data relevant.

The total size of data allowed on the pipe line depends on a number of factors, so just stay safe and keep it to a minimum; you should be quite safe up to 500Mb (it can manage higher – but if you really need that much you might be doing something pretty wrong!), under 1Mb is far more normal even in complex Runbook’s.

# Logging

## Runbook Logging

[![image_thumb12](/assets/posts/2014/02/image_thumb12_thumb.png)](/assets/posts/2014/02/image_thumb121.png)

On the properties of the Runbook, be sure you pay attention to the **Logging **tab, and its contained options of **Store Activity-specific Published Data** and **Store Common Published Data**.

The general rule of thumb here is pretty simple

  * Development –> Store** Activity-specific **and **Common**  
  * Pre-Production –> Store **Common**  
  * Production –> Store None! 

You should also be aware, that enabled, these will generate a lot of data, so don't forget the housekeeping

## Event Notifications

We will cover how to structure Runbook’s in another post, but for now the “Top Level” or Master Runbook’s which you create for each of your automations should also have the **Event Notifications** tab configured, so that **Report if the Runbook fails to run **option is enabled.

[![image_thumb13](/assets/posts/2014/02/image_thumb13_thumb.png)](/assets/posts/2014/02/image_thumb131.png)

## Logging to a Database

Its pretty important that you keep a track of how your Runbook’s are functioning, and event though we just recommended that you disable much of the logging above for the production server, we really do need to put this status information somewhere. The recommended action here is to assign a dedicated database table and use it.

This will enable you to keep a pretty long history of how your Runbook’s are preforming, and offer the ability to do some data mining on how well the environment is running in general.

At a minimum, the recommendation is to ensure you include at least the following information in the log

  * Runbook ID  
  * Runbook Execution Time (used for performance monitoring)  
  * Runbook completion status (Failed, Completed, etc.) 

## Error Handling

Like any well behaved application, Runbook’s should also be designed to notify of any critical failures. Using the database above for logging is a good approach, however any of the other out-of-band options are also good, including email or creating a Service Manager ticket (if you have the IP and environment) but be sure to include the Runbook ID, so you know where the alert came from.
