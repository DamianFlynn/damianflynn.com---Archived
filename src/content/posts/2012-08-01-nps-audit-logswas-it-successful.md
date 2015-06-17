---
author: Damian.Flynn
comments: true
publishDate: 2012-08-01 12:15:00+00:00
template: post.hbt
slug: nps-audit-logswas-it-successful
title: NPS Audit Logs–Was it successful?
wordpress_id: 518
categories:
- Blog
tags:
- NPS
- SQL
- WS/SC
---

While working on some WiFi access issues today, I was trying to determine which systems were authenticated along with the systems which were being declined; however all I was able to locate was failure after failure.

Then, in a light bulb moment, I recalled from the early days of working with Windows 2008 server that the auditing policy for NPS requests defaults to failures only. A quick trip to the command prompt confirmed my theory

_C:Windowssystem32> auditpol /get /subcategory:"Network Policy Server"   
System audit policy   
Category/Subcategory Setting   
Logon/Logoff   
Network Policy Server Failure_

So, this is really not going to help with the task at hand, I really need to get a view of the successful connections also, thus the following command should sort out the problem

_C:Windowssystem32> auditpol /set /subcategory:"Network Policy Server" /success:enable /failure:enable   
The command was successfully executed._

And of course the mandatory sanity check, to ensure this worked

_C:Windowssystem32> auditpol /get /subcategory:"Network Policy Server"   
System audit policy   
Category/Subcategory Setting   
Logon/Logoff   
Network Policy Server Success and Failure_

Now, I can get back to my logs, or the Event Viewer crimson channel at **Custom Views **> **Server Roles **> **Network Policy and Access Services**.
