---
author: Damian.Flynn
comments: true
date: 2011-02-04 23:16:00+00:00
layout: post
slug: ddlab-prepare-the-physical-servers
title: DDLAB – Prepare the Physical Servers
wordpress_id: 3471
categories:
- Blog
tags:
- AD
- Cloud
- Guides
- Portal
- SCOM
- SCVMM
- SQL
- WS/SC
---

It’s time to start on our quest to building a Dynamic Data Centre in a small lab.

In some cases I will not be adhering to best practices due to the restrictions in the physical structure of of my lab, as an example I will be running the iSCSI service over the same network interfaces as my normal network traffic.

## OS Installation

On each of the 3 nodes, we can start off by installing Windows 2008R2 Enterprise as our basic operating system. If do not have the media, all the products and the operating system are available to download from Microsoft with 180 day evaluation versions. Perfect for the short life of the LAB environment.

Using the first table as a reference, we should have enough data to get the basic operating systems sorted.

<table cellpadding="0" border="1" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; border-left: #a3a3a3 1pt solid" cellspacing="0" > <tbody > <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Node**

</td>
<td width="123" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAB-SVR01**

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAB-VM01-01**

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAB-VM01-02**

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Type**

</td>
<td width="123" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DELL PE840

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DELL PE860

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

DELL PE860

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Role**

</td>
<td width="123" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

_AD_

_DHCP_

File

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Hyper-V

RDV

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

Hyper-V

RDV

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**Storage**

</td>
<td width="123" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

C: [80Gb] - System

S: [150Gb] - Storage

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

C: [80Gb] - System

</td>
<td width="98" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

C: [80Gb] - System

</td></tr> <tr >
<td width="65" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

**LAN**

</td>
<td width="123" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAN: 172.16.100.10

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAN: 172.16.100.100

HB: 192.168.10.100

</td>
<td width="105" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; vertical-align: top; border-bottom: #a3a3a3 1pt solid; padding-bottom: 4pt; padding-top: 4pt; padding-left: 4pt; border-left: #a3a3a3 1pt solid; padding-right: 4pt" >

LAN: 172.16.100.101

HB: 192.168.10.101

</td></tr></tbody></table>Once the Operating System is installed, from the table we can assign the Server Name, IP address, apply any windows updates which are available, etc.

For the purpose of the LAB, I am going disable Windows Firewall, and also enable Remote Desktop services to connect to the server’s, making the installation process a little easier.

## Cabling

The cabling for the servers is going to pretty simple, my two DELL PE860’s have dual 1GB NIC’s, and the DELL PE840 has a single 1Gb NIC.

I am going to patch the one each of the 1Gb NICs from each of the 3 servers into my 4 port LAB Switch; and use a crossover cable between the 2nd Gb NIC on each of the PE860’s as the heartbeat network.

## Validation

Run a number of tests to ensure communications is working as normal, and once you are satisfied that everything looks good, we can start with building our AD forest for the Lab.

See you then!
