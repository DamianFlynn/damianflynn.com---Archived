---
author: Damian.Flynn
comments: true
publishDate: 2011-07-06 14:12:00+00:00
template: post.hbt
slug: scvmm2012-betawindows-2008-r2-sp1-physical-deployment-fails
title: SCVMM2012 Beta–Windows 2008 R2 SP1 Physical Deployment Fails
wordpress_id: 149
categories:
- Blog
tags:
- SCVMM
- WS/SC
---

If you have been playing with the Physical deployment options for new Hyper-V hosts in SCVMM 2012, you might already learned the hard way that the process will run almost to completion, but never reach the final goal.

What you will find is that after the new OS has been deployed, the physical server runs a reboot process, and start’s up again from the new deployed VHD. However after a few minutes you will be presented with a stinker that the process has failed with the Customization process in the Specialization step.

This one, we are attributing to the version of the AIK used on SCVMM been designed for the RTM build of Windows 2008 R2, and not the SP1 version; to address this we need to use the newer AIK, however this is not yet supported by the SCVMM team. Thus; for now we will need to deploy the OS as 2008 R2 and then apply the service pack after.

Cheers
