---
author: Damian Flynn
comments: true
date: 2015-09-24 15:25:00
layout: post
title: "BitLocker: Automation of Recovery Keys"
categories:
categories:
- Identity & Access Management
- IT Pro/DevOps
- Security
- Supportability
tags:
- Powershell
- Active Directory
- Bitlocker
- Delegation
- RBAC
- Azure Auotmation
- Orchestrator
- Service Management Automation
- Service Manager
- ITIL
- Self Service
- Windows Server 2012
---

Bitlocker is a protected service in Active Directory, the keys to the encryption when stored in Active Driectory are by default hosted in an Attribute which is not accessiable to users, and therefore the option of self service recovery of your keys is not possible.
To assist in this challange we could proceed to delegate a group with global access to these keys but that itself is also a security issue. Therefore we need a more controlled approach to solving this riddle.

Using tools like PowerShell we can add functions for auditing and access control which would allow us to delegate the end user access to keys, but ensure that the keys requested are keys for computers which the user is responsible for. We can make this determination based on information in our Configuration Database, and even form another AD attribute - Primary User.
In this post we will look at the process around how to use powershell with the support of the great Service Management Automation engine to return the keys in a controled and secure manner. Later we will look at using service manager to offer this as an self service function for normal users, and present the results in a nice clean table.

# Delegate Access To BitLocker
In order to delegate access to BitLocker Recovery Information objects in Active Directory to users that are not a member of the Domain Administrators group, we have to offer Full Control or the computer objects.

We can implement this using either the GUI or PowerShell. But the person executing the following procedure must be a member of the Domain Administrators group.

## Active Directory Users and Computers UX
Use the following procedure to enable access to BitLocker Recovery Information on the Domain level to a group named *"!Delegation grp BitLocker Admins"* in Active Directory:

* Launch *Active Directory Users and Computers*, and then **Right Click** the domain name in the left domain navigation tree pane, from the context menu select **Delegate Control…**
* The **Delegation of Control Wizard**, will be offered, click **Next**
* On the **Users or Groups** page, add the group we will delegate the permission to (ie. *"!Delegation grp BitLocker Admins"*) to the list and click **Next**
* On the **Tasks to Delegate** page, select **Create a custom task to delegate** and click **Next**
* Now, on the **Active Directory Object Type** page, select **Only** the following objects, once complete click **Next**:
  * msFVE-RecoveryInformation objects
* On the **Permissions** page, select **Full Control** under *Permissions* and click **Next**
* Finally, on the **Summary** page we can click **Finish**

Now members of the *"!Delegation grp BitLocker Admins"* group can read BitLocker Recovery Information in Active Directory.

## Powershell Workflow
Now, we will use the following PowerShell workflow to accept the short name of the computer in the domain we wish to return the Bitlocker information for.
The heart of this workflow is the following command from the Active Directory PowerShell module. Its task is to return the protected property **msfve-recoverypassword**, and to help deliver on this, we are providing credentials to the command. The credentials in question is a normal domain user, but this account is also a member of our newly created delegation group  *"!Delegation grp BitLocker Admins"* as this provides the rights necessary to read this property.

```powershell
$msfveRecoveryPassword = get-ADObject -ldapfilter "(msFVE-Recoverypassword=*)" -Searchbase $compObj.distinguishedname -properties canonicalname,msfve-recoverypassword -Credential $MSOPCreds
```

Now, with this understanding, we can see see how the rest of the flow works. The results of the process I am then returning in JSON format, as this allows me to safely consume the data either from a command line execution, a SharePoint triggered flow, or even a self service system like service manager.

<code data-gist-id="322050495c32d9d6eac2" data-gist-file="Resize-VMPartition.ps1"></code>

The results of calling this function will hand back a simple JSON object, for example
```json
{
    "distinguishedname":  "CN=TESTPC01,OU=Computers,OU=!Offices,DC=diginerve,DC=org",
    "Keys":  [
                 {
                     "Date":  "2011-10-07T19:00:27-00:00",
                     "PasswordID":  "1296273E-9578-4270-83E1-8EE0ECD9F492",
                     "RecoveryPassword":  "359612-188265-349613-035805-620840-183678-559251-433235"
                 },
                 {
                     "Date":  "2011-01-31T17:55:51-00:00",
                     "PasswordID":  "83F48728-D5C5-437B-AF74-C0E961F1FE8A",
                     "RecoveryPassword":  "103774-233376-031141-392139-277002-103873-031086-150953"
                 },
                 {
                     "Date":  "2010-02-04T14:15:24-00:00",
                     "PasswordID":  "17025B19-8DB0-4084-8E7B-EDD750160E67",
                     "RecoveryPassword":  "321596-696630-367400-169224-536580-039468-027170-286132"
                 }
             ],
    "Name":  "TESTPC01"
}
```

Consuming the result is also very simple, and will be a topic for another post as we explore how we can leverage this work.
