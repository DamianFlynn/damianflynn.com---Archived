---
author: Damian.Flynn
comments: true
publishDate: 2012-12-01 23:32:00+00:00
template: post.hbt
slug: orchestrator-2012-rtm-licence-expired
title: Orchestrator 2012 RTM Licence Expired?
wordpress_id: 687
categories:
- Blog
tags:
- SCORCH
- WS/SC
---

Just a heads up on a little issue which was recently experienced by one of my colleagues with their Orchestrator 2012 Server.

Essentially, the Orchestrator Runbook server forgets that it was indeed a licenced version, and fails back to evaluation mode. Checking the log in Orchestrator a Warning message, is displayed with the message "License Expired" – similar to the sample below.

[![120112_2051_Orchestrato1](http://172.21.10.63:84/wp-content/uploads/2014/02/120112_2051_Orchestrato1_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/120112_2051_Orchestrato1.png)

This is a known issue. When connection to SQL Server is lost and then restored (e.g. SQL Server was restarted) then the Runbook Servers do not fully restore connectivity. One of the connections that may fail is the thread that validates the licensing. Since it cannot retrieve the license from the database, it assumes the product was in evaluation and that the license has expired.

If you experience this issue please make sure you contract Microsoft Product Support by opening a Service Request against this issue; Additional information is available in [KB 2768366 - Orchestrator does not reconnect when the SQL server is restarted](http://support.microsoft.com/kb/2768366/EN-US)
