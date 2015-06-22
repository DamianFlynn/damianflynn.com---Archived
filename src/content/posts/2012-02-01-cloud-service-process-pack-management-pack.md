---
author: Damian.Flynn
comments: true
publishDate: 2012-02-01 21:17:00+00:00
template: post.hbt
slug: cloud-service-process-pack-management-pack
title: Cloud Service Process Pack Management Pack
wordpress_id: 262
categories:
- Blog
tags:
- Cloud
- CSPP
- Portal
- SCSM
- SCVMM
- WS/SC
---

How To Figure out the Service Manager Dependencies

While testing out the Cloud Service process pack, I encountered a dependency issue during the installation of the pack on my Service Manager 2012 server, with a nice message telling me that the VMM Discovery Management Pack in Service Manager was missing.

[![image_thumb](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb_thumb2.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb10.png)

The fix for this is pretty simple, load the missing Management pack!

But, that's easier said than done, as this pack appears to have a lot of dependencies (14 on my count), and these must be installed in a specific order. We also need to go to SCOM or Pinpoint to grab a few of these also!

The Source for these Management Packs is also interesting

<table cellpadding="2" width="590" border="0" cellspacing="0" > <tbody > <tr >
<td width="81" valign="top" >**Source**
</td>
<td width="341" valign="top" >**Folder**
</td>
<td width="166" valign="top" >**Location**
</td></tr> <tr >
<td width="81" valign="top" >SM 2012
</td>
<td width="341" valign="top" >C:Program FilesMicrosoft System Center 2012Service ManagerOperations Manager 2012 Management Packs
</td>
<td width="166" valign="top" >Service Manager
</td></tr> <tr >
<td width="81" valign="top" >OM 2012
</td>
<td width="341" valign="top" >Microsoft Pinpoint or Operations Manager Management Pack Down Load Tool
</td>
<td width="166" valign="top" >Operations Manager
</td></tr> <tr >
<td width="81" valign="top" >VMM 2012
</td>
<td width="341" valign="top" >C:Program FilesMicrosoft System Center 2012Virtual Machine Manager
</td>
<td width="166" valign="top" >Virtual Machine Manager
</td></tr></tbody></table>

I hope this helps cut some time from the installation

_PS – Thanks to @hvredevoort for the direction_

__

Therefore, before you can complete the installation the following table will help you get the correct Management Packs and sequence for installation for Service Manager. And Yes, these are the same management packs you install into Operations Manager!

<table width="523" align="left" class="auto-style1" > <tbody > <tr >
<td width="207" class="auto-style2" >**MP Name**
</td>
<td width="314" class="auto-style4" >**File Name**
</td>
<td class="auto-style4" >**Source**
</td>
<td class="auto-style4" >**Ver**
</td></tr> <tr >
<td width="207" class="auto-style3" >Data Warehouse Library
</td>
<td width="314" class="auto-style3" >Microsoft.SystemCenter.DataWarehouse.Library.mp
</td>
<td class="auto-style3" >SM 2012
</td>
<td class="auto-style3" >6.0.5000.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Windows Internet Information Services Library
</td>
<td width="314" class="auto-style3" >Microsoft.Windows.InternetInformationServices.CommonLibrary.mp
</td>
<td class="auto-style3" >OM 2012
</td>
<td class="auto-style3" >6.0.5000.0
</td></tr> <tr >
<td width="207" style="height: 16px" class="auto-style3" >Microsoft Generic Report Library
</td>
<td width="314" style="height: 16px" class="auto-style3" >Microsoft.SystemCenter.DataWarehouse.Report.Library.mp
</td>
<td style="height: 16px" class="auto-style3" >SM 2012
</td>
<td style="height: 16px" class="auto-style3" >6.0.5000.0
</td></tr> <tr >
<td width="207" style="height: 38px" class="auto-style3" >Windows Server Internet Information Services 2003
</td>
<td width="314" style="height: 38px" class="auto-style3" >Microsoft.Windows.InternetInformationServices.2003.mp
</td>
<td style="height: 38px" class="auto-style3" >OM 2012
</td>
<td style="height: 38px" class="auto-style3" >6.0.5000.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Windows Server Operating System Library
</td>
<td width="314" class="auto-style3" >Microsoft.Windows.Server.Library.mp
</td>
<td class="auto-style3" >OM 2012
</td>
<td class="auto-style3" >6.0.6958.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Windows Server 2008 Operating System (Discovery)
</td>
<td width="314" class="auto-style3" >Microsoft.Windows.Server.2008.Discovery.mp
</td>
<td class="auto-style3" >OM 2012
</td>
<td class="auto-style3" >6.0.6958.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Windows Server 2008 Internet Information Services 7
</td>
<td width="314" class="auto-style3" >Microsoft.Windows.InternetInformationServices.2008.mp
</td>
<td class="auto-style3" >OM 2012
</td>
<td class="auto-style3" >6.0.6539.0
</td></tr> <tr >
<td width="207" class="auto-style3" >SQL Server Core Library
</td>
<td width="314" class="auto-style3" >Microsoft.SQLServer.Library.mp
</td>
<td class="auto-style3" >OM 2012
</td>
<td class="auto-style3" >6.0.5000.0
</td></tr> <tr >
<td width="207" class="auto-style3" >System Virtualisation Library
</td>
<td width="314" class="auto-style3" >System.Virtualization.Library.mp
</td>
<td class="auto-style3" >SM 2012
</td>
<td class="auto-style3" >6.0.5000.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Virtual Machine Manager Library
</td>
<td width="314" class="auto-style3" >Microsoft.SystemCenter.VirtualMachineManager.Library.mp
</td>
<td class="auto-style3" >VMM 2012
</td>
<td class="auto-style3" >3.0.6005.0
</td></tr> <tr >
<td width="207" class="auto-style3" >System Center Virtual Machine Manager 2008 R2 PRO Library
</td>
<td width="314" class="auto-style3" >Microsoft.SystemCenter.VirtualMachineManager.PRO.2008.Library.mp
</td>
<td class="auto-style3" >VMM 2012
</td>
<td class="auto-style3" >3.0.6005.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Virtual Machine Manager PRO Library
</td>
<td width="314" class="auto-style3" >Microsoft.SystemCenter.VirtualMachineManager.PRO.Library.mp
</td>
<td class="auto-style3" >VMM 2012
</td>
<td class="auto-style3" >3.0.6005.0
</td></tr> <tr >
<td width="207" class="auto-style3" >Virtual Machine Manager PRO V2 Library
</td>
<td width="314" class="auto-style3" >Microsoft.SystemCenter.VirtualMachineManager.PRO.V2.Library.mp
</td>
<td class="auto-style3" >VMM 2012
</td>
<td class="auto-style3" >3.0.6005.0
</td></tr> <tr >
<td width="207" class="auto-style3" >**System Center 2012 Virtual Machine Manager Discovery**
</td>
<td width="314" class="auto-style3" >Microsoft.SystemCenter.VirtualMachineManager.2012.Discovery.mp
</td>
<td class="auto-style3" >VMM 2012
</td>
<td class="auto-style3" >3.0.6005.0
</td></tr></tbody></table>
