---
author: Damian.Flynn
comments: true
publishDate: 2011-11-28 20:40:00+00:00
template: post.hbt
slug: orchestrator-2012-rc-web-services-error-console-not-working
title: Orchestrator 2012 RC Web Services Error
wordpress_id: 243
categories:
- Blog
tags:
- SCORCH
- WS/SC
---

Installing some new Orchestrator 2012 RC servers, 2 of these started to exhibit a new error when attempting to access the Web Services URL. This of course has the knock on affect of rendering the Operator Console useless, as it relies on web services.

Digging deeper, while I try to open the Web Service URL, the message returned is “Request Error”, with the string “The server encountered an error processing the request”; Illustrated in the Image below.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/12/image_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/12/image.png)

The resolution for this is actually pretty simple, for some bazar reason the application pool which the installer associated with the web site is the “DefaultAppPool” rather than the newly created “System Center 2012 Orchestrator Web Features” which is designed for the job.

The fix, just launch Internet Information Services (IIS) Manager, expand the Sites branch and highlight the “Microsoft System Center 2012 Orchestrator Web Service Home” site. In the Actions list, click on “Basic Settings…” to present the “Edit Site” dialogue.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/12/image_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/12/image1.png)

As you can see in the Image, we just need to click on “Select…” and change the Application Pool to “System Center 2012 Orchestrator Web Features”. Then from the Actions list under Manage Web Site, click on “Restart” to put the changes into effect.

We should be set, and the Orchestrator Console will come to life.

Now, time to focus on bringing your orchestrations to life…
