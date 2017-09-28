---
author: Damian.Flynn
comments: true
date: 2012-08-25 12:51:00+00:00
excerpt: Still running an old WSUS server, hate the idea of needing to approve all
  your updates again; then don't. Using the steps outlined you should be able to export
  the data, and import it into your nice new 2012 WSUS server.
layout: post
slug: upgrade-to-wsus-2012
title: Upgrade to WSUS 2012
wordpress_id: 555
categories:
- Blog
tags:
- WS/SC
- WSUS
---

If you are reading this then you are interested in getting you WSUS server updated from its 2008 based host to the new Windows 2012.

If you attempt to do an in place upgrade you will be in for a disappointment, as this upgrade scenario will not work which is the start of the nightmare, as you are quickly realising that all those fine updates you have downloaded will need to be re-cached again, and worse you start to realise that all the computer groups will need to be recreated; and god no, but we also need to go back and approve or reject all those updates….

Yes, Microsoft was really having a kind steak when they snuck this one out on you. As an early adopter however my colleague today walked directly into this horrid experience, and started to face up to the ugly challenge ahead. However, before getting too deeply involved he did ask if I was aware of some import export options…

Taking a trip a long way back into memory lane I recalled  


# The WSUS API

This pack of code samples was released back in the days before PowerShell, and I had a feeling there was an export sample within this pack. So on my new Windows 8 desktop, loaded up with Visual Studio 2012 I set off to Download the [WSUS API Samples and Tools](http://go.microsoft.com/fwlink/?LinkId=94784) from Microsoft and install it on my desktop  


This created a set of folders on my hard disk at the location **C:Program Files (x64)Update Services 3.0 APISamples and Tools.**  


At the bottom of the list was the nugget I was hoping for **WsusMigrate **which a quick check confirmed has two utilities – one to export the configuration of a WSUS server, and a second for importing this freshly created export.  


## Exporting WSUS Configuration

Wasting no time, from the **WsusMigrationExport **folder, I copied over the executable file **WsusMigrationExport.exe** from my desktop to my production WSUS server running on 2008 R2.  


Now, logged onto the console of the WSUS server  


  * I opened a command prompt and navigated to the folder I dropped the export utility to – for example C:Temp  


  * From that folder I run the utility providing the name of the XML file I wish to export the settings to, for example settings.xml **- wsusmigrationexport.exe settings.xml  
**

  * Now, my setting.xml file after a few moments was created and I have a copy of my approvals and target groups – Cool  


## Importing WSUS Configuration

Now, for the fun part, just as I completed on the process of copying the export tool to my original source server, I set to copy from the** WsusMigrationImport** folder the executable file **WsusMigrationImport.exe** to my new Windows 2012 WSUS server.  


Additionally, I also copied over the **settings.xml** file which I just exported on my source WSUS server to the same folder on the Windows 2012 WSUS server.  


Now, logged onto the console of the Windows 2012 WSUS server  


  * I opened a command prompt and navigated to the folder I dropped the import utility to – for example C:Temp  


  * From that folder I run the utility providing the name of the XML file I wish to import the settings from, for example settings.xml **- wsusmigrationimport.exe settings.xml All Node  
**

  * In addition this tool accepts two additional paramaters as noted in the documention which I need to provide, so indicate that I want everything imported  


    * Settings to Import  


      * _TargetGroups_ - Import target groups only  


      * _Approvals_ – Import target groups and approvals  


      * _All_ - Import target groups and approvals  


    * Unmatched target group handling option  


      * _None_ – Do not delete target groups missing in the imported XML file.  


      * _DeleteUnmatchedTargetGroups_ – Delete target groups not found in the imported XML file.  


  * At this point, fingers crossed that the import will work.  


## Windows 2012 Errors

The import tool on Windows 2012 will kick out a bunch of errors – this is due to the utility expecting the .NET framework 2.0 to be present; we can resolve this by simply installing the .NET 3.5 framework on Windows 2012 as directed in an earlier blog post, as this package includes .NET 2.0 / .NET 3.0 / .NET 3.5  


After resolving this issue, the import will again fail, as the dependant .NET Class extension for WSUS is still incorrect and missing – **microsoft.updatesservices.administration**  


To address this  


  * I copied the required library from the WSUS 2012 server located in the path **C:Program FilesUpdate ServicesApi**** microsoft.updatesservices.administration.dll**  


  * The copy of this file, I placed in the folder of the utility on my desktop **C:Program Files (x64)Update Services 3.0 APISamples **and** ToolsWsusMigrateWsusMigrationImport**  


  * I then opened the Project file in Visual Studio 2012 and allowed it to convert the project to its current format  


    * On the _Properties_ of the project I changed the .NET Framework from 2.0 to 4.5  


    * On the _References_ of the project, I chose to browse to the new _Microsoft.updateservices.administration.dll_ file I added to the project folder and selected it  


    * Next, I compiled the new version of the Application with no additional code changes, to generate a new .NET 4.5 version referencing the latest library  


Now, with this new version of the utility, which I renamed to WsusMigrationImport45.exe, I copied over to my Windows 2012 server and attempted the exercise once again – this time to see the job run!  


To save you some time, I have zipped up the content of the WsusMigrate folder with my changes, and placed the two utilities in its root for you to grab and get on with life. All acknowledgements of the original code creators remain intact. Grab the code from my Skydrive here: [http://sdrv.ms/NkIVIf](http://sdrv.ms/NkIVIf)  


## Conclusion

All you are left to deal with now, is to Configure your server settings (products and classifications, auto-approvals, email alerts, etc) on the new server to match the old server.
