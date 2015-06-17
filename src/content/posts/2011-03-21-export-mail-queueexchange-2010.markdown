---
author: Damian.Flynn
comments: true
publishDate: 2011-03-21 23:39:00+00:00
template: post.hbt
slug: export-mail-queueexchange-2010
title: Export Mail Queue–Exchange 2010
wordpress_id: 3501
categories:
- Blog
tags:
- Exchange
- PowerShell
- WS/SC
---

Updated: 22 April 2013

_When referring back to this post, I realized that WordPress is scraping some of the formatting and totally destroying my code. Apologies if you have tried to use this code and failed as a result. While fixing this, I also updated the function with some added feedback so that i could monitor progress better as the queues were processed. Hopefully you will find this useful._

Today, I have been working on some mail routing issues in Exchange 2010 Edge, and encountered a requirement to export all the messages in one of the Queues out to their basic .EML format. In 2007 this was pretty simple, but Exchange 2010 has changed the workings of the export-message command-let, so we now need to to use an assemble message utility also.

As I needed to do this process a few times while the routing was been addressed, I created a function to help save a few precious moments, to drop the exported messages into a folder called **c:export**

Just call the function with the name of the server and the queue you need to address, eg.
    
    Export-MailQueue –Server Mailserver1 –Queue Unreachable







If you need to process these messages again for routing you can drop them in the PickUp folder of an exchange server which is not experiencing the routing issues- eg. **"C:Program FilesMicrosoft Exchange ServerV14Transport RolesPickup"**
