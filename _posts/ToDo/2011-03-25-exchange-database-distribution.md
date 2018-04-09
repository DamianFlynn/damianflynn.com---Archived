---
author: Damian.Flynn
comments: true
date: 2011-03-25 23:53:00+00:00
layout: post
slug: exchange-database-distribution
title: Exchange Database Distribution
wordpress_id: 93
categories:
- Blog
tags:
- Exchange
- PowerShell
- WS/SC
---

Exchange 2010 DAG’s we all love by now, moving databases between nodes is very easy and provides an amount of flexibility which we have not experienced before.

We do need to acknowledge however that it is pretty easy to get carried away with moving databases about, and before long lose track of where the database was actually planned to be hosted. Only yesterday did I have the pleasure of realised this on our Exchange environment so figured it was time to get a function together to report on distribution, but also help put everything back to their preferred locations

 

  
You can call to just get the current configuration and mounts  

    
    Report-MailboxDatabaseMountPreference




  
Or, even have the function put the databases back to the preferred host with  

    
    Report-MailboxDatabaseMountPreference –Fix $True




  
Feedback welcome, Enjoy.
