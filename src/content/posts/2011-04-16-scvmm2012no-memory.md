---
author: Damian.Flynn
comments: true
publishDate: 2011-04-16 10:51:00+00:00
template: post.hbt
slug: scvmm2012no-memory
title: SCVMM2012–No Memory?
wordpress_id: 102
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

Have you lost your memory, apparently my Hyper-V Servers have and that leaves my cloud pretty dry…

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/04/image_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/04/image.png)

So what happened? Well, best ask the Doctor what our status is… so the best [![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/04/image_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/04/image1.png)way to do this is to right click on one of the nodes with amnesia and select the option to **View Status** which will open up the properties view for the node on the status page. From here we can see that the node is clearly not feeling well, and WMI is just not getting a good heart beat.

So, when we take a closer look at the message, we are informed that there[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/04/image_thumb2.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/04/image2.png) needed counter’s are not in the WMI Database of the host. If we follow the guided resolution the situation still is not a lot better after the effort, so some more powerful solution is called for. 

## How do we fix this?

The suggested fix is only part correct (and don’t mind the fact that the path is also specified for the last software version), we need to re-register the counters for WMI to provide us the information we need. However in most of my test scenario’s that will not fix the issue as WMI needs 15 minutes of 100% quite time before it will stop and think about the new counters we need added. with all the stuff we have on our networks today, the chance of this ‘Quite Time’ is very unlikely, maybe you have a monitoring script, or SCOM etc.

So. we really need to STOP the WMI service, and then when it restarts it will re-read all the new counters and hey presto, amnesia cured.

I have a few nodes in each cluster, so the numbers of sick children did not take long to grow, so to help in my hour or pain I used the following little script’s to register and stop WMI; and yes all the dependants are safe to also stop (at least no VM complained on the 15+ nodes i had to fix).
    
    unlodctr /m:'C:Program FilesMicrosoft System Center Virtual Machine Manager 2012binscperfprovider.man'
    lodctr /m:'C:Program FilesMicrosoft System Center Virtual Machine Manager 2012binscperfprovider.man'
    net stop vmmagent
    net stop Winmgmt
    net stop vmms
    net stop vhdsvc
    net stop nvspwmi
    net stop iphlpsvc




  
At this point, use the service manager and just check that the _Windows Instrumentation Management_ services have stopped and if not, encourage it to!  

    
    net start Winmgmt
    net start vmms
    net start vhdsvc
    net start nvspwmi
    net start iphlpsvc
    net start Winmgmt
    net start vmmagent




  
Now, pop back to SCVMM2012 and refresh your host and if all has panned out, you can now see the missing memories!
