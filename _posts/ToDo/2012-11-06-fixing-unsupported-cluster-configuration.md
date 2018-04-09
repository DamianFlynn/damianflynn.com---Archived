---
author: Damian.Flynn
comments: true
date: 2012-11-06 23:33:00+00:00
layout: post
slug: fixing-unsupported-cluster-configuration
title: SCVMM Unsupported Cluster Configuration
wordpress_id: 683
categories:
- Blog
tags:
- SCVMM
- WS/SC
---

This has got to be favourite message which VMM kindly offers to share with me, just when I think everything is smelling of rose's. It's fair to say that 99% of the time this is related to the logical networks in VMM missing a definition for a network which the virtual machine appears to be using, but the odd time this can just be a proper pain.[![110612_1247_FixingUnsup1](/assets/posts/2014/02/110612_1247_FixingUnsup1_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup1.png)

Taking a closer look at the Virtual Machines exhibiting this issue, we can normally pin point them to a single host in the host group or cluster, and the error message will be just cryptic enough to be nothing more than a road sign to confirm you are heading in the correct direction.

[![110612_1247_FixingUnsup2](/assets/posts/2014/02/110612_1247_FixingUnsup2_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup2.png)

Of course there is no point trying to ignore or fix the issue by right clicking the Virtual Machine in VMM, as that really does nothing in this scenario, so where do we start?

## The Hyper-V host

Checking the properties of the Hyper-V host, for its Virtual Switch is a perfect launch point, but can be very disappointing when everything looks perfectly correct, with the correct Switch name matching the rest of the nodes in the cluster, and all the relevant logical networks are attached…

[![110612_1247_FixingUnsup3](/assets/posts/2014/02/110612_1247_FixingUnsup3_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup3.png)

So where to next?

## Cluster Properties

Up one level of course to the cluster properties, just to ensure that the virtual switch is available across the cluster. This time we do have a problem, as the Cluster is not offering any virtual switch. Now I would normally fix that with a click of Create/Edit or Delete, but the kind soul that is VMM, has decided to revoke that option for me today.

[![110612_1247_FixingUnsup4](/assets/posts/2014/02/110612_1247_FixingUnsup4_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup4.png)

So, for sanity sake, I will just check the properties of another cluster in the same host group, which I am not having any issues on, just to confirm that I am not going stir crazy

[![110612_1247_FixingUnsup5](/assets/posts/2014/02/110612_1247_FixingUnsup5_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup5.png)

And there you have it, the Difference between good and evil.

So how do we fix this?

Well I hate to say it, but this is time for a Microsoft Support case, or a Mechanics job.

Since I detest holding on the phone for hours on end, it's time to put on the gloves and go under the hood.

## SQL Database

**Warning – **From here forward you are entering unsupported grounds** – Warning   
**

Crank open the database hood, and locate the table called **tbl_AHDC_Host**, so that we can list all the records available. This table lists off all the hosts which VMM is currently managing, and lets us see the _FQDN computer_ name, along with the _GUID_ which VMM is using under the hood as the _HOSTID_ for each machine.

Take a note of the _HOSTID _for each of the computers in the affected cluster.

[![110612_1247_FixingUnsup6](/assets/posts/2014/02/110612_1247_FixingUnsup6_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup6.png)

Next table we are going to look at will be **tbl_ADHC_VirtualNetwork**. This table will list all our hosts, now defined with that GUID we just kept a note of, with a row per Virtual Switch detected on the host.

The Virtual Switch name can be observed in the column called _SwitchName_. Adjacent to this we can see a curious column called_ IsHighlyAvailable_ which in a cluster I would expect to see set to the value of 1 – _suggesting the Boolean value of TRUE_; but from some reason that is not the case for ANY of my hosts in this cluster, which are using the virtual switch.

[![110612_1247_FixingUnsup7](/assets/posts/2014/02/110612_1247_FixingUnsup7_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup7.png)

## Fix it

So, make a backup of the database, make a donation to the gods and let's start tweaking the engine J

Right Click again on the table called **tbl_ADHC_VirtualNetwork**, this time opening it in Edit Mode

[![110612_1247_FixingUnsup8](/assets/posts/2014/02/110612_1247_FixingUnsup8_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup8.png)

Now in the grid, adjust the columns to fit your screen, and locate the _HostID _associated with each of the members of your cluster, and set the flag _IsHighlyAvailable_ from _False_ to _True_. As you move from row to row the change is automatically committed to the database, so no need to click save when you are done J

## Validation

Now, restart the VMM service, so that it is forced to reload the database changes. Let the refreshers do their work, and after some of the jobs have completed, if all has gone to plan you should see nice green icons again

[![110612_1247_FixingUnsup9](/assets/posts/2014/02/110612_1247_FixingUnsup9_thumb.png)](/assets/posts/2014/02/110612_1247_FixingUnsup9.png)

Happy Days!
