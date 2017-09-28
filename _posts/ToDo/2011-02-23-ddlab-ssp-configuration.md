---
author: Damian.Flynn
comments: true
date: 2011-02-23 23:31:00+00:00
layout: post
slug: ddlab-ssp-configuration
title: DDLAB-SSP Configuration
wordpress_id: 75
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

Now, let’s spend a little time, and Configure Self Service Portal 2.5 for use in the LAB. We already confirmed that the web portal is working correctly, so the next task is for us to logon to the interface with administrator privileges and configure the portal for our lab, and check that the integration with System Center Virtual Machine Manager is working correctly.

As you will recall, during the setup of SSP we added 2 accounts with Administrative access, that was the **Domain Administrator**, and the Special Account we created for the job **!SSPADmin**

So, lets open our Browser, and connect to the portals Web Interface, Logging in with one of these two administrative users.

[![image](/assets/posts/2011/02/image_thumb340.png)](/assets/posts/2011/02/image343.png)

# Delegate SCVMM Access

First thing we need to do is launch SCVMM and add the Service account for the SSP portal as an administrator on the VMM environment.

Using the **Administration** view, we will select the **Users Roles** node. We have not yet applied any changes to the Profile, so this is our first view of this area on the console. Integration with Operations Manager, requires that we add the Action account into the **Administrator **role.

[![image](/assets/posts/2011/02/image70_thumb.png)](/assets/posts/2011/02/image701.png)

Double Click on the **Role** and we will be presented with the dialog for** User Role Properties for Administrator.**

[![image](/assets/posts/2011/02/image73_thumb.png)](/assets/posts/2011/02/image731.png)

Click on the **Members** tab, of the dialog, and from here we will click on the **Add** button

[![image](/assets/posts/2011/02/image_thumb342.png)](/assets/posts/2011/02/image345.png)

This will open the browse dialog where we can locate the Operations Manager Action Account, for the lab this is **!VMMSSP Server**

[![image](/assets/posts/2011/02/image_thumb343.png)](/assets/posts/2011/02/image346.png)

We can then click on **OK** and add the user to the role

[![image](/assets/posts/2011/02/image_thumb344.png)](/assets/posts/2011/02/image347.png)

We can then check the member list, and once ready, we can then click on **OK** to close the dialog

# Settings, lots of settings...

Now, Back to that web browser – we can now start on the work of configuring the portal.

We will start on the Settings page. This page will not be visible to the normal user, so if you Don’t see the **Settings** menu then check that you really have connected with the authorised account to the portal.

Once you have opened the setting page, you will be greeted with a list of different areas where we can apply different setting and configuration changes. Some of these are very important to the function of our portal, while others we will use over time to tweak the environment.

[![image](/assets/posts/2011/02/image_thumb345.png)](/assets/posts/2011/02/image348.png)

## Datacenter Management

This is pretty straight forward to configure. I am only going to address the settings which are necessary for us to get up and running for some initial deployments, but this will give you a good basis for fine tuning and tweaking as you get more accustomed to the toolkit.

[![image](/assets/posts/2011/02/image_thumb346.png)](/assets/posts/2011/02/image349.png)

### Server

The first setting we will provide is the server name. This is very easy, we just enter the Fully Qualified name of the server which we have System Center Virtual Machine Manager 2007 R2 Installed on. For example **LAB-SCVMM.damianflynn.demo**

### Network

The next area we will provide information on is the Network. This section allows us to define friendly names for each of the networks which are supported by our LAB and Hyper-V servers, so that end users do not need to be thinking of VLAN numbers, etc.

Simply Click on the Add Network option to popup a dialogue were we get to define the networks settings. If your environment is anywhere complex, you may find yourself back here often defining new networks to offer to your users

[![image](/assets/posts/2011/02/image_thumb347.png)](/assets/posts/2011/02/image350.png)

After you have defined a few networks, the main page will be updated to display each one for your quick consumption

[![image](/assets/posts/2011/02/image_thumb348.png)](/assets/posts/2011/02/image351.png)

### Active Directory

We are required to provide at least one domain name, where we will be deploying our Virtual Machines to. This does not mandate that machines must join a domain, but for the wizards to function correctly, if a template requires that a machine joins a domain, that choice of offered from here, I am going to add **damianflynn.demo** here

[![image](/assets/posts/2011/02/image_thumb349.png)](/assets/posts/2011/02/image352.png)

### Quota

We can define at this point a Reserve cost, for resources in the environment. These costs come into action when a Business Unit submits an Infrastructure Request for resources.

As an example, if the resources are not in use, they are considered reserved for this project, so charge backs are calculated based on the costs we define here, Multiplied but the number of GB RAM requested for the project PLUS the number of GB Disk storage requested, on a daily basis.

[![image](/assets/posts/2011/02/image_thumb350.png)](/assets/posts/2011/02/image353.png)

So, because the business has not created any virtual machines initially, the only costs applied for the project will be the reserve costs. Lets assume the Infrastructure requested for the project is 10Gb of RAM and 100Gb of Storage, and we are charging a reserve cost of $0.10 per GB or RAM and $0.05 per GB of Disk per Day

<table cellpadding="0" width="400" border="0" cellspacing="0" > <tbody > <tr >
<td width="155" valign="top" >Memory Cost per Day
</td>
<td width="245" valign="top" >**10Gb * $0.10 = $1.00**
</td></tr> <tr >
<td width="155" valign="top" >Disk Cost per Day
</td>
<td width="245" valign="top" >**100Gb * $0.05 = $5.00**
</td></tr> <tr >
<td width="155" valign="top" >**Total Reserve Cost**
</td>
<td width="245" valign="top" >**$6.00 per Day**
</td></tr></tbody></table>

Thus, this $6 per day we charge back to the Business unit, for the infrastructure reservation while we wait for them to spin up their Virtual Machines.

### Environment

I have no idea with the Environment is about, to add names for the environments you will be hosting, simply click on the option Add Environment and enter its Friendly name in the popup window.

[![image](/assets/posts/2011/02/image_thumb351.png)](/assets/posts/2011/02/image354.png)

[![image](/assets/posts/2011/02/image_thumb352.png)](/assets/posts/2011/02/image355.png)

Now, that we have these basic settings provided, we can click on the Save and Close option on the Right pane of the browser page, which will return is back to the main settings page again.

## Virtual Machine Templates

At this point we should now have a connection working between SCVMM and VMMSSP. This part of the settings is going to help us validate that basic connection is working correctly, while also granting us access to the templates you have stored in your SCVMM servers.

Initially, there will be no templates listed here, so we will repeat this next process many times as we use the toolkit to offer templates to our toolkit users

[![image](/assets/posts/2011/02/image_thumb353.png)](/assets/posts/2011/02/image356.png)

### Import Template

Lets start by clicking on the option Add Template on the Right hand task list in the web page. This will open a new page and offer us 3 selection areas, Working from the top Left we will first use the drop down and select the name of a Library server which is configured for use with our SCVMM Server. I am going to select **LAB-SVR01** as the Library server, because this is the library I stored my deployment template in a few posts back.

[![image](/assets/posts/2011/02/image_thumb354.png)](/assets/posts/2011/02/image357.png)

After selecting the Library server, we can not use the drop down and select a Share on this library, There is only one on this server.

[![image](/assets/posts/2011/02/image_thumb355.png)](/assets/posts/2011/02/image358.png)

Then, finally we simply click on Search and wait for the server to return all the available templates on this Library server

[![image](/assets/posts/2011/02/image_thumb356.png)](/assets/posts/2011/02/image359.png)

Then, we just place a Tick in the column for each template we are going to use in the toolkit, and click on the option **Add Selected** from the right hand task list.

This will then drop is back to the template page, where we can now assign a cost for this template based on the RAM it will be using, and the Disk space it may consume. Using the math we had earlier this template is valued at

<table cellpadding="0" width="402" border="0" cellspacing="0" > <tbody > <tr >
<td width="155" valign="top" >Memory Cost per Day
</td>
<td width="245" valign="top" >**1Gb * $0.10 = $0.10**
</td></tr> <tr >
<td width="155" valign="top" >Disk Cost per Day
</td>
<td width="245" valign="top" >**60Gb * $0.05 = $3.00**
</td></tr> <tr >
<td width="155" valign="top" >**Total Reserve Cost**
</td>
<td width="245" valign="top" >**$3.10 per Day**
</td></tr></tbody></table>

However, we can of course adjust this to our own value; for example we might want to add additional cost as this template has been customised and maybe we have additional software added which have associated licence costs to be accounted for.

[![image](/assets/posts/2011/02/image_thumb357.png)](/assets/posts/2011/02/image360.png)

Once you are satisfied that all the templates you require currently are published, we can click on **Save and Close.**

## Global Settings

The last section we will take a look at is the generic settings page

[![image](/assets/posts/2011/02/image_thumb358.png)](/assets/posts/2011/02/image361.png)

We can also configure a Mail Profile which allows us to send notification messages to the portal users with updates on the status of the services which is been hosted or requested.

The key information here is the name of the Database Mail Profile, which I am going to configure as **VMM SSP Mail** and we will look shortly as SQL Server to configure this profile.

[![image](/assets/posts/2011/02/image_thumb359.png)](/assets/posts/2011/02/image362.png)

At this stage we have completed all out Basic Configuration, and we can progress to the final stage of setting up a test BU and working out way thought requesting some Infrastructure

# SQL Mail

Before the Mail notifications will work with SSP, we need to configure our SQL server to support mail notifications.

To do this we need to switch back to our SQL Server (**LAB-SVR01**) and launch the **SQL Server Management Studio**.

[![image](/assets/posts/2011/02/image_thumb360.png)](/assets/posts/2011/02/image363.png)

Expand the Tree, down to **Management** and then select the node **Database Mail**. Next we can then Right click on this node and select the option **Configure Database Mail**

[![image](/assets/posts/2011/02/image_thumb361.png)](/assets/posts/2011/02/image364.png)

This will then launch the **Database Mail Configuration Wizard**, which we can read the introduction to this feature, and once ready, then click on **Next**

[![image](/assets/posts/2011/02/image_thumb362.png)](/assets/posts/2011/02/image365.png)

The next page offers the option to **Select Configuration Tasks** where we will select the first choice is to **Set up Database Mail by performing the following tasks…**

[![image](/assets/posts/2011/02/image_thumb363.png)](/assets/posts/2011/02/image366.png)

As this is the first visit to this feature on our LAB, we are asked if we would like to enable the feature, We need to say **Yes** here to progress with the configuration.

[![image](/assets/posts/2011/02/image_thumb364.png)](/assets/posts/2011/02/image367.png)

On the **New Profile** page, we will set the **Profile name** to match the name we defined in the Self Service Portal **VMM SSP Mail**, we can then provide a simple description for this profile.

[![image](/assets/posts/2011/02/image_thumb365.png)](/assets/posts/2011/02/image368.png)

Now, we need to click on **Add** to define the **_SMTP accounts_** which will be used on the mail servers.

[![image](/assets/posts/2011/02/image_thumb366.png)](/assets/posts/2011/02/image369.png)

Once this Mail Account has been added, we will be returned to the main Wizard, to review the addition, decide if you need additional backup addresses, and once satisfied, progress on.

[![image](/assets/posts/2011/02/image_thumb367.png)](/assets/posts/2011/02/image370.png)

The following page will allow us to determine which database accounts can use this profile, Normally we would lock this down, but for the LAB i will just select the Public Profile access

[![image](/assets/posts/2011/02/image_thumb368.png)](/assets/posts/2011/02/image372.png)

We can not **Configure System Parameters, **the main change I will apply is setting the **Retry** count from 1 to 3

[![image](/assets/posts/2011/02/image_thumb369.png)](/assets/posts/2011/02/image373.png)

After this we get the normal last wizard page, the **Summary** to run our final checks, before we apply the new change.

[![image](/assets/posts/2011/02/image_thumb370.png)](/assets/posts/2011/02/image374.png)

At this point we will then see the task list as the server is configured

[![image](/assets/posts/2011/02/image_thumb371.png)](/assets/posts/2011/02/image375.png)
