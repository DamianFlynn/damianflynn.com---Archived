---
author: Damian.Flynn
comments: true
publishDate: 2011-07-08 14:17:00+00:00
template: post.hbt
slug: scvmm2012-betadynamic-optimization-questions
title: SCVMM2012 Beta–Dynamic Optimization Questions?
wordpress_id: 163
categories:
- Blog
tags:
- SCVMM
- WS/SC
---

So, I have been teasing with the plan of enabling the newly integrated Dynamic Optimization functions in SCVMM which as I evaluated, led me to want some answer’s.

On of the first things you will notice is that the Dynamic Optimization options are no longer in the properties of your VM Cluster! Really, this setting pair has now moved back to the parent level, the Host Group only; so if you have been scratching your head as to where to find this stuff, now you know; go check the properties of the Host Group while in Fabric View.

So, I asked the SCVMM team why this is the case, and they honestly replied citing time as the enemy! but its on the radar to be reintroduced on the cluster level at a later time.

[![image_thumb3](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb3_thumb1.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb31.png)

So, this lead to another question, If i have my cluster’s all grouped under a single host group, and then enable the optimization on the host group, what is the potential that the SCVMM server will now try to optimize across clusters; it would be cool for sure, but that would also result in the VM being unavailable to the end users during the process which is not so cool. Again, the SCVMM team, and some testing have confirmed that this is not a worry, and optimization is per cluster still .[![wlEmoticon-smile](http://172.21.10.63:84/wp-content/uploads/2014/02/wlEmoticonsmile_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/wlEmoticonsmile.png)

[![image4](http://172.21.10.63:84/wp-content/uploads/2014/02/image4_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image4.png)

Finally, what happened to the nice Pro tips? Well the new UI has decided to swallow these and spit out a new experience. Do i like it? Well, suffice to say I am not in love with it yet! So, let’s assume we just want to ‘See’ what optimizations SCVMM would like to implement for us, then as you can see in the Screen Shot I do not enable the option **Automatically migrate virtual machines to balance load**, and instead I can use the Fabric View where in the Folder tab I can select the option to **Optimize Hosts** which will present a dialogue to allow us to see the actions which SCVMM is currently recommending; or we can use the PowerShell Interface and use the WhatIf option on the following commandlet

**_start-scdynamicoptimization –whatif[![image5](http://172.21.10.63:84/wp-content/uploads/2014/02/image5_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image5.png) _**

Once we know everything is as it should be we will see the result, telling us there is not further optimization to be applied.
