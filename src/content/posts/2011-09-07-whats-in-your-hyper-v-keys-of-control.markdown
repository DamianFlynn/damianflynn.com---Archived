---
author: Damian.Flynn
comments: true
publishDate: 2011-09-07 16:35:00+00:00
template: post.hbt
slug: whats-in-your-hyper-v-keys-of-control
title: What’s In your Hyper-V? Keys of Control?
wordpress_id: 227
categories:
- Blog
tags:
- Development
- Hyper-V
- PowerShell
- WS/SC
---

If the next twelve months are going to be busy building clouds, then if the feedback is accurate we are going to be pretty busy, but then is that new?

The real question here, is how are we going to manage these clouds? Will we need to learn new tooling, do we have to invest in software, and how much new infrastructure will need to put in place? We already know that 99% of all the Hyper-V environments are still managed by Microsoft’s own tool’s, with 60% already running Virtual Machine Manager or Essentials; though I am not so sure that Essentials will get us where we need to be.[![image_thumb3](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb3_thumb3.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb33.png)

But control is not restricted to just Hyper-V, Failover Clustering Manager, Essentials or even Virtual Machine Manager; there are many more products in the Microsoft Suite, and looking at the feedback we have received, Operations Manager, Configuration Manager and Data Protection Manager are already starting to show a significant presence in deployed infrastructure.

Not to any major surprise both Service Manager and Opalis (Orchestrator) have not yet started to put out an impression, but this is clearly an area which I am quite sure will make some impressive gains over the next 12 months. Why? simple really.

Once the basic foundations for private clouds are laid, and working well, there are two areas which will naturally gain your attention, the First will be Automation; adding more bell’s and whistles to your solutions, automating implementation of additional services which SCVMM for example can not address, for example maybe a eMail notification, of some File Storage Provisioning. I have already begun sharing some posts on Orchestrator, but these have not yet been focused on private cloud; but these are coming…

Now, why Service Manager? Well this one is not exactly the most obvious until you consider one key point – your users! How do you plan to advertise your cloud, offer its service, and even change the size or features of you clouds. Yes, to all – Service Manager can certainly help out here. We will take a much closer look at the scenarios which this will address, but not today. – However, this is of course not mandatory, you can of course leverage Orchestrator or other options to provide these services, if at all!

## Boundaries…

We must of course have some boundaries for our cloud / self service users; which of 55% of you already have! but to my amazement **less than 10% of these actually use Quota’s** to enforce limits; which again confirms that we have a lot of work to do, to convert from Highly Virtualised to Private Cloud implementations.

From an Infrastructure perspective, those of you with both Operations Manager and Virtual Machine Manager deployed, **51% have PRO Integration enabled, **But I have to be honest, I am very curious to why the other 49% have not?** **Now, if 51% of you have PRO enabled, will you be surprised to learn that over 65% only use the in-box Management Packs? No 3rd Party server or other infrastructure monitoring!

But what has to be the most interesting numbers for all this, is really how much you actually trust the system to manage your environment

[![image_thumb5](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb5_thumb1.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb52.png)

56% of you just rely on PRO for guidance and do the work manually

But **Only 2% of you have FULL PRO Management enabled!**

****

****

****

****

The numbers keep coming….
