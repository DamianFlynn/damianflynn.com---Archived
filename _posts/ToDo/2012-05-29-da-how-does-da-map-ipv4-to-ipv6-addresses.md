---
author: Damian.Flynn
comments: true
date: 2012-05-29 22:56:00+00:00
layout: post
slug: da-how-does-da-map-ipv4-to-ipv6-addresses
title: How does Direct Access map IPv4 to IPv6 addresses?
wordpress_id: 434
categories:
- Blog
tags:
- Direct Access
- WS/SC
---

Good question; if you ever ping a DNS name for a node in your corporate environment which is running IPv4, then the Windows 2012 NAT64 and DNS64 kick into action.

So what happens – well simply really

  * First, the DNS64 server checks if there is an IPv6 address registered in the corporate DNS servers for the requested machine  
  * Assuming no IPv6 address is located within a few milliseconds, a second request is sent to the corporate DNS servers, this time requesting the IPv4 address of the requested machine  
    * This address let’s assume is returned as **10.5.1.191**  
    * The NAT64 service is asked to create an IPv6 mapping for this to offer back to the requester.  
      * First the IPv4 address is converted to Hex as follows **10.5.1.191** becomes **0a.05.01.bf**  
      * This is then reduced to 2 octets and looks as follows **0a05:01bf**  
      * Finally, the new address is pre-fixed to the IPv6 address of the Gateway **fd0a:d291:9d39:7777**  
      * The final address is then** fd0a:d291:9d39:7777::a05:1bf**
    * The client is then offered the IPv6 Address which was just mapped 

## In Reverse

With the knowledge of how DA builds an IPv6 mapping for an IPv4 address, let’s use this knowledge to reverse the IPv6 back to the IPv4

****

The address we get a ping for is - **fd0a:d291:9d39:7777::a05:1bf**

  * We drop the pre-fix which points to the NAT64 gateway, leaving us with just the post fix hex address **a05:1bf**  
  * Reformat the hex address into its 4 octets -> **a.05.1.bf**  
  * And convert this IP address from Hex to Decimal so we can read it **10.5.1.191**

Simple Really
