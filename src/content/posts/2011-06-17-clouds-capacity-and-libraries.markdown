---
author: Damian.Flynn
comments: true
publishDate: 2011-06-17 15:23:00+00:00
template: post.hbt
slug: clouds-capacity-and-libraries
title: Clouds, Capacity and Libraries
wordpress_id: 118
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

Lately I have been buried in the middle of a restructure of all the library servers which have over time started to appear with each of the different versions of SCVMM we have deployed to support specific scenarios or requirements. The process has been pretty interesting as I learn about some limitations in the tool, but more on that in the next post.

For this post, I want to consider storage, managing what the cloud users have access to and what the gaps… There a few ways that work in combination’s to restrict the usage of storage on a cloud.

First let’s talk about creating a cloud, then capability profiles, and finally assigning the cloud to a user role.



	
  1. When creating a cloud ,based upon your selection of host groups, the capacity that is displayed will include the total storage and memory.  If you want to size the cloud to restrict the amount of capacity a cloud can consume you should size appropriately.  This is especially true if you are creating multiple clouds from the same host groups.

	
  2. Now on top of that, as part of cloud creation, you specify a Capability Profile.  Microsoft include default capability profiles, but you can create custom ones if you like for SCVMM2012.  The Capability profile defines capabilities that are allowed on the cloud. This [technet link](http://technet.microsoft.com/en-us/library/gg610567.aspx) includes how to create cloud and a brief excerpt on capability profiles.[![SCVMM-HostLibraryProperties](http://172.21.10.63:84/wp-content/uploads/2011/06/SCVMM-HostLibraryProperties-300x223.jpg)](http://172.21.10.63:84/wp-content/uploads/2011/06/SCVMM-HostLibraryProperties.jpg)

	
  3. Now that you have created a cloud and assigned a cap profile you can assign it to a user role.  The user role assignment further provides more restrictions on a cloud for a user role.


On the Assign Cloud Wizard there are two types of quotas:

	
  * Role level quotas set overall limits for all members of the user role, defining available capacity within the private cloud.

	
  * Member level quotas set individual limits. By default, no quotas are applied.


The following table describes each type of quota _(reference Technet)_
<table cellpadding="0" border="1" >
<tbody >
<tr >

<td valign="bottom" >**Quota Type **
</td>

<td valign="bottom" >**Description **
</td>
</tr>
<tr >

<td valign="top" >**Virtual CPUs**
</td>

<td valign="top" >Limits the total number of virtual machine CPUs that can be consumed from the private cloud. For example, setting a member level quota of 10 means that any member of the user role cannot use more than 10 virtual CPUs across all the virtual machines that she has deployed in the private cloud. Setting a role level quota of 10 means that all members together can only deploy 10 virtual machines in the private cloud at any one time.
</td>
</tr>
<tr >

<td valign="top" >**Memory (MB)**
</td>

<td valign="top" >Limits the amount of virtual machine memory (in megabytes) that can be consumed from the private cloud. For example, setting a member level quota of 20480 MB means that any member of the user role cannot use more than 20 Gigabytes of memory across all the virtual machines that she has deployed in the private cloud.
</td>
</tr>
<tr >

<td valign="top" >**Storage (GB)**
</td>

<td valign="top" >Limits the amount of virtual machine storage (in Gigabytes) that can be consumed from the private cloud. For dynamic virtual hard disks, quota calculations are based on maximum size.For example, setting a member level quota to 1024 GB means that any member of the user role cannot use more than 1 Terabyte of memory across all the virtual machines that she has deployed in the private cloud.
</td>
</tr>
<tr >

<td valign="top" >**Custom quota (points)**
</td>

<td valign="top" >Sets a quota on virtual machines deployed on the private cloud based on total quota points assigned to the virtual machines via their virtual machine templates. Quota points are an arbitrary value that can be assigned to a virtual machine template based on the anticipated "size" of the virtual machines. Custom quotas are provided for backward compatibility with self-service user roles created in VMM 2008 R2.
</td>
</tr>
<tr >

<td valign="top" >**Virtual machines**
</td>

<td valign="top" >Limits the total number of virtual machines that can be deployed on a private cloud. For example, setting a member level quota of 20 means that any member of the user role cannot have more than 20 virtual machines deployed under his ownership in the private cloud.
</td>
</tr>
</tbody>
</table>
Now, The first point that we need to be clear about is “**Quotas only apply to deployed virtual machines. If a self-service user role has permission to store virtual machines, the quota does not apply to virtual machines that are stored in the library.”******

Now, this is the gap, in essence, we have no way to limit the amount of storage a user is consuming on a library share if they have direct access to it.   So, in my scenario, a user creates configures a VM and then creates a template out of it that he stores to the library; however, there is nothing stopping the user from storing this VM in the library multiple times! thus we have sprawl, and the use gets a free snapshot solution.

This simplest way to control the sprawl is to use NTFS Quotas so to limit how much storage they use for store VM; but this is not clean as it will end up with the user been presented with errors which are storage related but not in context to the action within SCVMM and its environments.

Now, its time to start thinking outside the box….
