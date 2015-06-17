---
author: Damian.Flynn
comments: true
publishDate: 2013-03-06 23:23:00+00:00
template: post.hbt
slug: vmm-stop-the-refreshers-to-remove-locked-systems
title: VMM – Stop the Refreshers to remove locked systems
wordpress_id: 731
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

_[alert type="danger" close="no"] The following post, is "At your own risk", and only to be used when you can find no other option….[/alert]
_

In the odd scenario, when VMM just keeps getting in its own way, and simple jobs keep failing, due to jobs you cannot see, trapping you, sometimes need to call in the heavy guns and stop VMM from hurting itself. The Refresher model has being around since Day 1, and if you have used VMM for any amount of time, it will be nothing new to you, so when jobs need to just stop, you need to flick the switch, and turn them off for a little time, while you get some time to fix the root problems.


## How? 



Start with the registry and on your VMM server, navigate to the following location

**HKLM\Software\Microsoft\Microsoft System Center\Virtual Machine Manager\Server\Settings
**

Under this location, you may or may not see the following Keys – these all affect the Refreshers in VMM, which you are going to turn off J. Note if you have these already defined, note the current values; as one you fix this problem, you do need to turn back on the refreshers, otherwise VMM will have no idea what is happening on the hosts – no a thing you would really want…



	
  * 


**VMUpdateInterval
**



	
    * VM Refresher, Defaults to 30 Minutes





	
  * **VMPerformanceUpdateInterval
**

	
  * 


**VMPropertiesUpdateInterval
**



	
    * VM light refresher (subset of properties from the VM Refreshers), Defaults to 2 Minutes





	
  * **SQMUpdateInterval
**

	
  * 


**HostUpdateInterval
**



	
    * Host and User Role Refresher, Defaults to 30 Minutes






If you set the value to any one of these to **0**, this has the effect of switching off the refresher. Now, once you have these all turned off, you are going to need to restart the VMM Service, so that it reads its new rules, and effectively stands down.

At this time you should be able to move forward with no more locking jobs active.

Remember, to go back and remove these Keys again, or reset them to their original values once you are done, and then restart the VMM services to re-activate the service.

Good Luck, and remember that this is MVP Sharing, and not CSS supporting ;)

Damian
