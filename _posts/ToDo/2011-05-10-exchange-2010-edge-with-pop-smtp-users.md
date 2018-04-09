---
author: Damian.Flynn
comments: true
date: 2011-05-10 10:54:00+00:00
layout: post
slug: exchange-2010-edge-with-pop-smtp-users
title: 'Exchange 2010: Edge with POP / SMTP Users'
wordpress_id: 106
categories:
- Blog
tags:
- Exchange
- PowerShell
- WS/SC
---

A little while back I completed the deployment of our new Exchange 2010 Edge environment, which was shortly after promoted to full production level as I progressed to remove the final Exchange 2007 nodes from the environment. One of the considerations which needed to be taken at the time was for a very tiny number of users who are still requiring access to their mailbox via the POP3 connectors.

Not that this is a real issue, as we could easily create a NAT on the firewalls back to the proxy/balancer and from there connect to the POP3 services on our CAS servers, however in order for these uses to be able to send mails I also needed to present a secure SMTP server on the internet for them also. This was going to be a little trickier, as we outsource messaging hygiene services to a 3rd party, and they act as out primary SMTP connection, Which for this scenario would not work.

So, on our new Exchange 2010 Edge environment, I progressed to implement a new SMTP listener which would be ultimately be presented on the internet via the normal perimeter protection mechanisms. The connector would be configured only to allow authenticated users to send, so as the keep the environment as secure as possible. All of this been quite simple to implement within the Exchange Management Console.

However, when the users attempt to connect with the server, their experience was not as smooth, the POP3 services worked perfectly and they quickly had a downloaded copy of all their mail messages, but when they attempted to send a message the mail client repeatedly failed to complete the process, and would always return with a very ominous SMTP 550 Error, with the code 5.7.1 Client does not have permission to send as this sender

So, this was not really what I was expecting, and a quick reference back to the Microsoft Technet site, to read more on the topic [Understanding Transport Permissions Architecture: Exchange 2010 Help](http://technet.microsoft.com/en-us/library/aa997170(v=exchg.140).aspx) I was able to find a perfect match to my issue; which read as

_The sender specified in the MAIL FROM field of the SMTP protocol conversation is an address in an authoritative domain. However, the session doesn't have the ms-Exch-SMTP-Accept-Authoritative-Domain-Sender permission. This might occur if a message was submitted from the Internet to an Edge Transport server from a sender address for which the Exchange organization is authoritative._

__

__

So, now knowing that this was my root issue, I figured out that this was affecting everyone using the SMTP connector. Permissions on the connector are just like any other ACL and need to be associated to a user or group, so i quickly scoped this to all _Authenticated Users_ which then allowed me to format the Powershell needed to resolve the problem
    
    Get-ReceiveConnector <SendConnectorName> | Add-ADPermission -User "NT AUTHORITYAuthenticated Users" -ExtendedRights "ms-Exch-SMTP-Accept-Authoritative-Domain-Sender"




After this was applied to the SMTP Connector on each of the Edge servers been used by the POP users, everything returned to normal, and once more we had a happy ever after.
