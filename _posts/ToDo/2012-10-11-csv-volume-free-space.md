---
author: Damian.Flynn
comments: true
date: 2012-10-11 23:34:00+00:00
layout: post
slug: csv-volume-free-space
title: CSV Volume Free Space
wordpress_id: 564
categories:
- Blog
tags:
- Hyper-V
- PowerShell
- WS/SC
---

Working with Mounted file systems is cool; but there is one real pain, how do you quickly find out your remaining capacity?

WMI of course, but gosh do I really want to, or need to do that… Yes and its really simple with PowerShell, Just look

**Get-WmiObject**   
Win32_Volume | **Select** Name, Capacity, FreeSpace, FileSystem | **FT   
**

This one command will tell us all we need to know, but it's reporting in Bytes, and not very easy read, so with a little formatting on the data we get back, this can look a lot better, and much easier read   


**Get-WmiObject**   
Win32_Volume | **Select** Name, @{Name="Size(GB)"; Expression={"{0:N2}"   
-f ($_.Capacity/1GB)}},@{Name="Freespace(GB)"; Expression={"{0:N2}"   
-f ($_.Freespace/1GB)}},@{Name="% Available)"; Expression={"{0:N1}"   
-f (($_.Freespace/1GB) / ($_.Capacity/1GB)*100)}}   


And, since we are using WMI, you can do this remotely by adding _–ComputerName_ to the command

**Get-WmiObject**   
Win32_Volume   
_-ComputerName_ MyComputerName | **Select** Name, @{Name="Size(GB)"; Expression={"{0:N2}"   
-f ($_.Capacity/1GB)}},@{Name="Freespace(GB)"; Expression={"{0:N2}"   
-f ($_.Freespace/1GB)}},@{Name="% Available)"; Expression={"{0:N1}"   
-f (($_.Freespace/1GB) / ($_.Capacity/1GB)*100)}}   


Easy Right!   


J   

