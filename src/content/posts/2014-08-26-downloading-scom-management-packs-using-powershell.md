---
author: Damian.Flynn
comments: true
publishDate: 2014-08-26 16:34:45+00:00
template: post.hbt
slug: downloading-scom-management-packs-using-powershell
title: Downloading SCOM Management Packs using PowerShell
wordpress_id: 5691
categories:
- Blog
---

One of the most important features of using SCOM, is the vast knowledge which is offered thought the use of the Management Packs. With power always comes challenges, and the key challenge in this case, is locating and downloading all these packs; and also staying up to date.

As you are hopefully aware, my buddy Stan over at the [CloudAdministrator](http://cloudadministrator.wordpress.com/2014/08/26/version-3-0-of-damians-and-my-script-to-download-all-scom-management-packs-with-powershell/) blog has published and maintained a script up on the [Technet Galleries](http://gallery.technet.microsoft.com/scriptcenter/All-Management-Packs-for-37d37902) site designed to assist in allowing us to build this repository for our daily use.

His script parses the SCOM Wiki page which the MS team maintain related to all the new and updated management packs, and from this reaches out, and grabs a nice local copy of the files for us.

Wanting to use this script to do some automation and notifications related to the packs which have been updates, added new, or simply re-downloaded I quickly became blocked due to its monolithic structure. As a bit of a fiend for PowerShell modules, I set to split the script into private functions, change some of the parsing logic, and ultimately create a single PowerShell Commandlet to do the work, while telling me of its progress, and formatting the output as true objects which I can now use to group by MP Status, and so on.

As I also spend a fair amount of time working with the rest of the System Center Suite, I wanted to also change the logging to the normal CMTrace format which I have become familiar with, but not to upset current users of the script, simply added a switch called -CMTrace to the command, to have the new format enabled.

[![CMTrace for Get-SCOM MP](http://blogstorage.damianflynn.com/wordpress/2014/08/Get-SCOM-MP-CMTrace-300x47.png)](http://blogstorage.damianflynn.com/wordpress/2014/08/Get-SCOM-MP-CMTrace.png)

The updated work, with the blessing and overview of Stan is back on the TechNet Gallery, ready for your consumption.

This is not the final destination for this script however, I had a plan which drove me to this middle ground, so in the coming days expect to see yet another "edition" of the script which will be destined for the Gallery also - More later.

Thanks to Stan and the community for the continued sharing, and we look forward to your comments and input.
