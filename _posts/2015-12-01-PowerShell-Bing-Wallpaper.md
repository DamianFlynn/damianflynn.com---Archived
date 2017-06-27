---
author: Damian Flynn
comments: true
date: 2015-12-01 22:40:00
layout: post
title: "Utility: Bing Wallpaper Downloader"
categories:
- Identity & Access Management
- IT Pro/DevOps
- Security
tags:
- PowerShell
- Wallpaper
---


One of the more challenging issues with building a big proof of concept environment with lots of different ADFS instances, is to make each distinguishable. The simplest way to accomplish this is to provide a nice graphic, however my artistic abilities leave much to be desired.

This lack of skill, requires a good Plan B: Grab the images which the nice people from Microsoft publish every day.

```powershell
workflow Download-BingWallpaper {
	$BingImageData="http://www.bing.com/HPImageArchive.aspx?format=js&mbl=1&idx=0&n=1&cc=us"
	$ImageUrl = "http://www.bing.com" + ((Invoke-WebRequest -Uri $BingImageData | ConvertFrom-Json).images.url)
    $BingImagePayload = Invoke-WebRequest -Uri $ImageUrl  
    Start-BitsTransfer -source $ImageUrl -Destination c:\temp\wallpaper.jpg
}
```
Now, to use this function we simply need to Download the graphic, and then take a look at the results.  

```powershell
Download-BingWallpaper
c:\temp\wallpaper.jpg
```

Two points to note:
1. I have hardcoded the download path and file name
2. The Script is formatted as a workflow

Why? this is a subset of a task which I will share in another post, to automatically download the graphic and update my ADFS servers theme.
