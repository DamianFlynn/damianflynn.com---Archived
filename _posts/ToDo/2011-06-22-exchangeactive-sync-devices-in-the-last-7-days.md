---
author: Damian.Flynn
comments: true
date: 2011-06-22 13:59:00+00:00
layout: post
slug: exchangeactive-sync-devices-in-the-last-7-days
title: Exchange–Active Sync Devices in the last 7 Days
wordpress_id: 137
categories:
- Blog
tags:
- Exchange
- PowerShell
- WS/SC
---

Today, I was asked to generate a new report of the mobile devices which are currently syncing with our Exchange environment, which is something that I have done a few times before, but to complete the exercise I used to parse the HTML logs from the frontend web servers, and then run some filters to figure out duplicate connections etc. As you can appreciate the exercise was not the fastest in the world to complete, and still needed a fair amount of massaging after, to generate a nice chart.

This time around, I decided to take a new look at the process and created a new function which would gather the information directly from the exposed detail in the CAS server and utilize the command-let _get-activesyncdevicestatistics_ to speed up the exercise and generate cleaner and more accurate reports.

The function is pretty simple, I first create a variable to define the number of days since the last synchronisation attempt I would like to consider, as many users do not remove their older devices from the association when they upgrade. These would just mess up my report so filtering out any device which has not synced In the past 7 days should be pretty accurate.

The process is just 2 loops, the first to provide a list of mailboxes which Exchange has flagged to having had at some point an ActiveSync partnership; and then the inner loop to list the devices which connected in the past 7 days for each of these mailboxes. Then I just check that there is indeed a device ID present for the connection and if so, report the device in my results.
