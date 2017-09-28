---
author: Damian.Flynn
comments: true
date: 2011-02-28 23:35:00+00:00
layout: post
slug: scvmm-templates-and-kms
title: SCVMM, Templates and KMS
wordpress_id: 81
categories:
- Blog
tags:
- General
- OSD
- SCVMM
- WS/SC
---

If you have the pleasure to run into a deployment scenario where you plan to have all your VMs use a KMS to activate the product, then you will have been greeted with the teaser on how do you define a good Software Profile for this Template. _(If you have been following the LAB guide then we also encountered this issue)_

One option is to skip the Product key and leave it blank, but I am pretty sure that if your like me, you will have tried that out, only to find that this has a bad effect of causing the new VM not to actually deploy correctly.

So, how do we deal with this? Simple really, go back and read the KMS documents!!  

Ok, so time is money – then take this link [http://technet.microsoft.com/en-us/library/cc303280.aspx#_KMS_Client_Setup](http://technet.microsoft.com/en-us/library/cc303280.aspx#_KMS_Client_Setup) and you will quickly learn that there are some Magic Product keys that can be used in the Software profile which will allow your deployment to progress successfully.

Windows Vista and 2008 Keys

<table cellpadding="0" width="589" border="0" cellspacing="0" > <tbody > <tr height="20" >
<td width="334" height="20" >Windows Vista Business
</td>
<td width="255" >YFKBB-PQJJV-G996G-VWGXY-2V3X8
</td></tr> <tr height="20" >
<td height="20" >Windows Vista Business N
</td>
<td >HMBQG-8H2RH-C77VX-27R82-VMQBT
</td></tr> <tr height="20" >
<td height="20" >Windows Vista Enterprise
</td>
<td >VKK3X-68KWM-X2YGT-QR4M6-4BWMV
</td></tr> <tr height="20" >
<td height="20" >Windows Vista Enterprise N
</td>
<td >VTC42-BM838-43QHV-84HX6-XJXKV
</td></tr> <tr height="20" >
<td height="20" >Windows Web Server 2008
</td>
<td >WYR28-R7TFJ-3X2YQ-YCY4H-M249D
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 Standard
</td>
<td >TM24T-X9RMF-VWXK6-X8JC9-BFGM2
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 Standard without Hyper-V
</td>
<td >W7VD6-7JFBR-RX26B-YKQ3Y-6FFFJ
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 Enterprise
</td>
<td >YQGMW-MPWTJ-34KDK-48M3W-X4Q6V
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 Enterprise without Hyper-V
</td>
<td >39BXF-X8Q23-P2WWT-38T2F-G3FPG
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 HPC
</td>
<td >RCTX3-KWVHP-BR6TB-RB6DM-6X7HP
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 Datacenter
</td>
<td >7M67G-PC374-GR742-YH8V4-TCBY3
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 Datacenter without Hyper-V
</td>
<td >22XQ2-VRXRG-P8D42-K34TD-G3QQC
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 for Itanium-Based Systems
</td>
<td >4DWFP-JF3DJ-B7DTH-78FJB-PDRHK
</td></tr></tbody></table>

**_Update (4th Aug 2011):_**

Windows 2008 R2 Keys are here: [http://technet.microsoft.com/en-us/library/ff793421.aspx](http://technet.microsoft.com/en-us/library/ff793421.aspx)

<table cellpadding="0" width="589" border="0" cellspacing="0" > <tbody > <tr height="20" >
<td width="334" height="20" >Windows 7 Professional
</td>
<td width="255" >FJ82H-XT6CR-J8D7P-XQJJ2-GPDD4
</td></tr> <tr height="20" >
<td height="20" >Windows 7 Professional N
</td>
<td >MRPKT-YTG23-K7D7T-X2JMM-QY7MG
</td></tr> <tr height="20" >
<td height="20" >Windows 7 Professional E
</td>
<td >W82YF-2Q76Y-63HXB-FGJG9-GF7QX
</td></tr> <tr height="20" >
<td height="20" >Windows 7 Enterprise
</td>
<td >33PXH-7Y6KF-2VJC9-XBBR8-HVTHH
</td></tr> <tr height="20" >
<td height="20" >Windows 7 Enterprise N
</td>
<td >YDRBP-3D83W-TY26F-D46B2-XCKRJ
</td></tr> <tr height="20" >
<td height="20" >Windows 7 Enterprise E
</td>
<td >C29WB-22CC8-VJ326-GHFJW-H9DH4
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 R2 Web
</td>
<td >6TPJF-RBVHG-WBW2R-86QPH-6RTM4
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 R2 HPC edition
</td>
<td >TT8MH-CG224-D3D7Q-498W2-9QCTX
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 R2 Standard
</td>
<td >YC6KT-GKW9T-YTKYR-T4X34-R7VHC
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 R2 Enterprise
</td>
<td >489J6-VHDMP-X63PK-3K798-CPX3Y
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 R2 Datacenter
</td>
<td >74YFP-3QFB3-KQT8W-PMXWJ-7M648
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2008 R2 for Itanium
</td>
<td >GT63C-RJFQ3-4GMB6-BRFB9-CB83V
</td></tr></tbody></table>

[](http://technet.microsoft.com/en-us/library/ff793421.aspx)**_Update (30th Aug 2012):_**

Windows 2012 Keys are as follows:

<table cellpadding="0" width="589" border="0" cellspacing="0" > <tbody > <tr height="20" >
<td width="334" height="20" >Windows 8 Professional
</td>
<td width="255" >NG4HW-VH26C-733KW-K6F98-J8CK4
</td></tr> <tr height="20" >
<td height="20" >Windows 8 Professional N
</td>
<td >XCVCF-2NXM9-723PB-MHCB7-2RYQQ
</td></tr> <tr height="20" >
<td height="20" >Windows 8 Enterprise
</td>
<td >32JNW-9KQ84-P47T8-D8GGY-CWCK7
</td></tr> <tr height="20" >
<td height="20" >Windows 8 Enterprise N
</td>
<td >JMNMF-RHW7P-DMY6X-RF3DR-X2BQT
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 Core
</td>
<td >BN3D2-R7TKB-3YPBD-8DRP2-27GG4
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 Core N
</td>
<td >8N2M2-HWPGY-7PGT9-HGDD8-GVGGY
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 Core Single Language
</td>
<td >2WN2H-YGCQR-KFX6K-CD6TF-84YXQ
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 Core Country Specific
</td>
<td >4K36P-JN4VD-GDC6V-KDT89-DYFKP
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 Standard (Full and Core)
</td>
<td >XC9B7-NBPP2-83J2H-RHMBY-92BT4
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 MultiPoint Standard
</td>
<td >HM7DN-YVMH3-46JC3-XYTG7-CYQJJ
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 MultiPoint Premium
</td>
<td >XNH6W-2V9GX-RGJ4K-Y8X6F-QGJ2G
</td></tr> <tr height="20" >
<td height="20" >Windows Server 2012 Datacenter (Full and Core)
</td>
<td >48HP8-DN98B-MYWDG-T2DCC-8W83P
</td></tr></tbody></table>

Cheers
