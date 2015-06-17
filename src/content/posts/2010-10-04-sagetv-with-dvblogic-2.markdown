---
author: Damian.Flynn
comments: false
publishDate: 2010-10-04 22:31:00+00:00
template: post.hbt
slug: sagetv-with-dvblogic-2
title: SageTV with DVBLogic
wordpress_id: 3421
categories:
- Blog
tags:
- DVB
- Home Automation
- Media Center
---

<blockquote>Over the past 12 months, much has improved in the world of HTPC. Microsoft has released Windows 7 on us, Frey Technologies have presented their new Version 7 software HTPC, and DVB Logic have completed no less than 2 major released of their DVBLink software.
> 
> </blockquote>

Over the course of the next few posts, I am going to cover a complete rebuild of my HTPC solution, utilizing SageTV, DVBLink, DigiGuide, and some additional utilities to create a stable and scalable IPTV solution.

Before we start on the actual installation and configuration of this solution, we are going to need to get a number of items organised, including the DVB tuner cards which we will utilize for Live TV Reception.  

With this in mind, you can prepare for the steps we are going to cover

  * Start by Installing the DVB Tuner Cards, along with their current drivers 

Once the hardware is all setup and ready, we can proceed to download the software components which will construct this solution

  * DVB Logic, TV Source 3.1  
  * VLC  
  * SageTV Server  
  * DigiGuide (or other suitable XMLTV source for your geographic location)  
  * Stephanes XMLTV importer 

If your satisfied you have gathered all the parts needed to get this project running they we are already on the way.

## DVB Tuner Drivers

The hardware I have elected to use as the IPTV server for my deployment, is a shallow 1u rack mountable system from Dell which has 2 PCI-E ports, a nice low power footprint, and a cool 8Gb of RAM, with 2 1Gb NICs to get good streaming, topped off with a 2Tb SATA disk for storing TV recodings.

[![TBS 6980 DVB-S2 Tuner Card](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/TBS6980-a-300x199.jpg)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/TBS6980-a.jpg)The TV Tuner cards I am using are slim dual head TBS-6980 DVB-S2 cards which are listed on the Harware compatability list of DVBLogics TVSource application.

Installation of these cards in the Dell server is very simple, and withing a few minutes two cards are nice and snug within the chasis of the server.

After restarting Windows 7, the OS quickly detects that the new cards have been installed and simply identifies the cards as a **Multimedia Video Controller**. A quick check on the TBS website [http://www.tbsdtv.com/english/product/6980.html](http://www.tbsdtv.com/english/product/6980.html), and I can see that the current driver available is version 2.0.0.8. Wasting no time, let's download this and extract its content ready for installation.

Once the driverpackage is downloaded and extracted[![](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/TBS-6980-Driver-Install-Completed-300x231.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/TBS-6980-Driver-Install-Completed.png), we can continue with the installation. The Driver for the TBS 6980 is very easy to setup, we simply need to run the installer and it does the work for us, we just need to accept any changes and modules it would like to install, and a few seconds later we should be seeing a completed screen, which we can click Finish on to complete the setup.

## Prepare for DVBlogic

Nice work, at this stage we have our hardware ready, we can hook up any antenna cables required, and relax as the physical labor is now complete.

In the next stage we will install the DVBLogic software, and test that it is indeed working correctly with our new hardware and that we can indeed tune TV Channels.
