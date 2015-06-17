---
author: Damian.Flynn
comments: true
publishDate: 2012-02-09 21:22:00+00:00
template: post.hbt
slug: first-look-at-the-rc-system-center-2012-ip-for-orchestrator
title: First look at the RC System Center 2012 IP for Orchestrator
wordpress_id: 280
categories:
- Blog
tags:
- SCORCH
- WS/SC
---

After [downloading the new IP pack](http://www.microsoft.com/download/en/details.aspx?displaylang=en&id=28725) from the MS download center, the file is simply a compressed archive containing the 7 new Integration packs which we need to extract.

Once extracted, a quick spin of the System Center Orchestrator Deployment Manager allows us to register these new IPs, which will take a few moments as each has its own EULA which needs to be accepted first.

[![image_thumb1](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb1_thumb2.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb12.png)

Next, job is to deploy these newly registered IPs to the servers and runbook editing workstations again using the deployment manager

[![image_thumb2](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb2_thumb3.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb23.png)

And now we are ready to investigate.

This first thing to notice is that even though both the 2007 and 2012 versions of the packs my offer many of the same actions, the icons have being revised on the newer 2012 versions. as an example here are some simple Virtual Machine actions

[![image_thumb3](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb3_thumb4.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb34.png)

There is clearly a lot to investigate here, so for now this is a peek at all the Actins which we have just being blessed with for the System Center 2012 suite, and we still await the Configuration Manager pack to join this party.

[![image_thumb4](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb4_thumb2.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb42.png)

[![image_thumb5](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb5_thumb2.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb53.png)

[![image_thumb6](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb6_thumb1.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb61.png)

[![image_thumb7](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb7_thumb1.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb71.png)
