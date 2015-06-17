---
author: Damian.Flynn
comments: true
publishDate: 2011-01-12 23:08:00+00:00
template: post.hbt
slug: exchange-health
title: Exchange Health
wordpress_id: 29
categories:
- Blog
tags:
- Exchange
- PowerShell
- WS/SC
---

Part of the daily tasks on keeping the Core systems up and humming, is to keep a close on on the exchange environment. 2 of the metrics which I use as an early warning indicator is the length of the mail queues, and on the Exchange 2010 Servers is the Copy status of the DAG stores.

To simplify this process I have created a simple PS function called **Get-ExchangeHealth**, with these 2 simply commands

   

This is just added to my profile of commands, so that its available when required.
