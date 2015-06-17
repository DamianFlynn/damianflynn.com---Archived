---
author: Damian.Flynn
comments: true
publishDate: 2011-08-23 15:40:00+00:00
template: post.hbt
slug: ad-delegating-control-in-powershell
title: AD Delegation Control using PowerShell
wordpress_id: 203
categories:
- Blog
tags:
- AD
- PowerShell
- WS/SC
---

One of the most annoying thing’s which I have witnessed over the years of running our AD environment is that over a long duration of time, lots of difference Administrators will come and go. Despite the fact that one might have documented standards, and clear processes on how to implement a solution, every one had a better option, yet when they find that this exercise needs to be repeated multiple times over the course of their work, more and more short cuts appear to be taken, which results in solutions been implemented in a non-standard fashion.

## OU Delegations

One of these scenario's which I have recently had a little time to consider and address is around the delegation of permission's to different owners for some normal decentralised management and maintenance of Computers, Users and Groups.

As I stated out, I did have a pretty good idea of what I was expecting to see, after all I do have a policy document outlining how these delegations should be implemented, and what permissions to offer, however what I started to see what not very nice. After a few minutes of clicking around in the ADUC GUI, checking Advanced Security on each OU, this got very annoying, and so I created a simple helper function

The purpose of the function **Get-ADObjectAcl** is to accept an LDAP path to an object, in my case an OU, and pipe back the ACL information So that I can filter and sort the information much faster to see just how bad the implementation is.

## Delegate Functions

Well, now that my worst fears are realised, I really need to address this, and what better method to address this problem, than to implement some PowerShell functions. My initial plan was to use the AD PowerShell module, but that was quickly changed when i realised that it really has no good support for ACL’s which is what we are all about here. This progressively got worse the more I looked, to find that the only solution was to rely on the .NET Framework, and the **System.DirectoryServices** name space to achieve the goals. I started off with some simple plans, but again found that this subject just likes to be complex by nature and to identify any function which I need to implement I am going to have to use GUID’s to make this work.

Then, its a really good job that i created the **Get-ADObjectAcl** function so, because the details which it is exposing just happens to be the same details which i need to implement in the new functions.

In the code window below, I have created a number of PowerShell functions to address the main permissions which i will be permitting on each of the OUs in my environment, the table lists the Function and a quick reference as to what we use the function for:

<table cellpadding="0" width="719" border="0" cellspacing="0" > <tbody > <tr >
<td width="301" valign="top" >**Set-ADPermissionModifyGroupMembership**
</td>
<td width="416" valign="top" >Modify Group Membership
</td></tr> <tr >
<td width="301" valign="top" >**Set-ADPremissionManageGroups**
</td>
<td width="416" valign="top" >Create/Delete Group Objects
</td></tr> <tr >
<td width="301" valign="top" >**Set-ADPremissionResetUserPassword**
</td>
<td width="416" valign="top" >Reset Passwords
</td></tr> <tr >
<td width="301" valign="top" >**Set-ADPremissionManageComputers**
</td>
<td width="416" valign="top" >Create/Delete Computer Objects
</td></tr> <tr >
<td width="301" valign="top" >**Set-ADPremissionManageUserSettings**
</td>
<td width="416" valign="top" >Unlock Accounts, Personal Information, Disable + Enable Accounts
</td></tr> <tr >
<td width="301" valign="top" >**Set-ADPremissionGroupManager**
</td>
<td width="416" valign="top" >Assign a User/Group Manager permission on a Group
</td></tr></tbody></table>

Let’s take a look at what this code actaully looks like, from here, you will see in the comments that I am creating Access Control Entries, based on the output I captured from my original Function to **Get-ADObjectAcl**, which makes this process pretty simple.

If you are not sure what permissions you need, then use the UI, delegate the permissions to the OU or Object, then Get the ACL with the **Get-ADObjectAcl** function, and use its output to create a new Function to Delegate the permission. You can see this in real effect if you pay attention to the function **Set-ADPremissionManageUserSettings**.

Cool, that’s is the hard work out of the way.

## Using the Functions

So, At the start of this exercise I mentioned that we had a standard right? Well, not to make things to complex, lets take a quick look at what this might look like:
    
    # Delegation Rights 
    # Site IT 
    # Computers OU Branch 
    # Workstations: Create/Delete Computer Objects 
    # Disabled: Create/Delete Computer Objects 
    # Servers: Create/Delete Computer Objects 
    # Mobile: Create/Delete Computer Objects 
    # Groups OU Branch 
    # Local: Create/Delete Group Objects, Modify Group Membership 
    # Standard: Modify Group Membership 
    # Users OU Branch 
    # Employees: Reset Passwords, Unlock Accounts, Personal Information, Disable Accounts, Enable Accounts 
    # Contacts: No permissions 
    # Disabled: No permissions 
    # Service Acts: Reset Passwords, Unlock Accounts, Personal Information, Disable Accounts, Enable Accounts 




Now, you can see how these permissions map to the table we looked at a little earlier…




Well, to implement this, the following code could be used, _– Note that this is example code only…._





And, that is all there is to it, A modification of this sample code, will let us create a function for example which will create any new OU’s in the future and Apply the ACLs correctly, every time….




I hope this proves useful; Let me know…
