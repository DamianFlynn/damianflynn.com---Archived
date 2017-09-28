---
author: Damian.Flynn
comments: true
date: 2011-02-21 23:26:00+00:00
layout: post
slug: ddlabconfigure-pro
title: DDLAB–Configure PRO
wordpress_id: 69
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

Time now to practice some magic. We have completed the process of deploying and Configuring both SCVMM and SCOM in our lab, which are the building blocks of creating a Dynamic Data Center. The next milestone on this journey is integrating these two amazing products so that they can share intelligence and help convert us from a “Managed Data Center” into a “Dynamic Data Center”

In the course of this stage we are going to install the management console of each of these two products on each of the relevant nodes to permit these tools to integrate with each other.

Let’s begin our work on the System Center Operations manager node **LAB-SCOM** and then we can move our focus over to the System Center Virtual Machine Manager Node **LAB-SCVMM**.

# Operations Manager

Back on the Operations Manager node, we are going to begin by installing the System Center Virtual Machine Manager Console on the Operations Manager node. With the source files already copied locally on our LAB-SCVMM node, I will connect to the installation and run the setup program which will launch up the now familiar SCVMM Splash screen

[![image](/assets/posts/2011/02/image37_thumb.png)](/assets/posts/2011/02/image371.png)

From here, we are going to select the option **Configure Operations Manager** which will after a few moments launch the installer for the **Virtual Machine Manager Administrator Console Setup,** we will agree with the terms and click on **Next**

[![image](/assets/posts/2011/02/image43_thumb.png)](/assets/posts/2011/02/image431.png)

Next we get to review the **Customer experience Improvement Program **details

[![image](/assets/posts/2011/02/image46_thumb.png)](/assets/posts/2011/02/image461.png)

The Installer will next check that we have all the requirements in place, which this time will include the need for Operations Manager to be present, which is pretty logical since we will be integrating this time.

[![image](/assets/posts/2011/02/image49_thumb.png)](/assets/posts/2011/02/image491.png)

The next step is again to determine where we are installing the console

[![image](/assets/posts/2011/02/image52_thumb.png)](/assets/posts/2011/02/image521.png)

We need to now define the **Port Assignment** which will connect the console to our SCVMM server. This time we need to provide the name of the **VMM Server** but in the format of DomainComputer – so for this lab it will be **DF-DEMOLAB-SCVMM. **then the next step is the **VMM server port** we will be using, which by default is **8100**

[![image](/assets/posts/2011/02/image55_thumb.png)](/assets/posts/2011/02/image551.png)

We now get to review the **Summary** which we can then click on **Next** to progress

[![image](/assets/posts/2011/02/image58_thumb.png)](/assets/posts/2011/02/image581.png)

At this point the server can begin its installation process. During this phase the installer will also import for us some new Management packs into SCOM which will permit Operations Manager to monitor our SCVMM installation.

[![image](/assets/posts/2011/02/image61_thumb.png)](/assets/posts/2011/02/image611.png)

Which will take a little time to complete

[![image](/assets/posts/2011/02/image64_thumb1.png)](/assets/posts/2011/02/image641.png)

Nice, now we can change focus to the second server

# Virtual Machine Manager

Now, back on our SCVMM server **LAB-SCVMM** we will now install the Operations Manager console on the server. As before we have the installation media for Operations Manager on our **LAB-SCOM **server, which we can again map to and launch the setup program. This will present the splash screen.

# [![image](/assets/posts/2011/02/image85_thumb.png)](/assets/posts/2011/02/image851.png)

Similar to the process we ran on the Operations Manager node, we will select the option **Install Operations Manager 2007 R2** which will start up the installation wizard.

<table cellpadding="0" width="400" border="0" cellspacing="0" > <tbody > <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image911_thumb.png)](/assets/posts/2011/02/image911.png)
</td>
<td width="200" valign="top" >Agree to the Agreement and progress to the next stage
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image94_thumb.png)](/assets/posts/2011/02/image941.png)
</td>
<td width="200" valign="top" >The provide the Registration Information
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image97_thumb.png)](/assets/posts/2011/02/image971.png)
</td>
<td width="200" valign="top" >As we are only interested in the Management tools, I will deselect all the other options
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image100_thumb.png)](/assets/posts/2011/02/image1001.png)
</td>
<td width="200" valign="top" >The environment is then checked, but due to my lack of spare RAM, I get a warning about this
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image103_thumb.png)](/assets/posts/2011/02/image1031.png)
</td>
<td width="200" valign="top" >Decide if you will join the feed back program
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image106_thumb.png)](/assets/posts/2011/02/image1061.png)
</td>
<td width="200" valign="top" >And allow the install to begin
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image109_thumb.png)](/assets/posts/2011/02/image1091.png)
</td>
<td width="200" valign="top" >
</td></tr> <tr >
<td width="200" valign="top" >[![image](/assets/posts/2011/02/image112_thumb.png)](/assets/posts/2011/02/image1121.png)
</td>
<td width="200" valign="top" >After a few minutes the software should be installed, and we can select to let the console open after installation.
</td></tr></tbody></table>

After the installer is complete, the console will start to launch, and as this is the first time on this node, we will need to provide the name of our Operations Manager server **LAB-SCOM.damianflynn.demo**

[![image](/assets/posts/2011/02/image115_thumb.png)](/assets/posts/2011/02/image1151.png)

Then after a few moments, we will then be presented with the Operations Manager Splash Screen

[![image](/assets/posts/2011/02/image118_thumb.png)](/assets/posts/2011/02/image1181.png)

## Cumulative Update 4 

As before we need to install the new update also on this server also, The process is much simpler this time, as we only need the install the update on the server and not need to worry about the management packs, etc. this time.

Launch the Update again, and we will follow the same steps we executed when updating the Operations Manager server

[![image](/assets/posts/2011/02/image_thumb287.png)](/assets/posts/2011/02/image289.png)

The Installer will then present us with some details about the material connected with this update. I can not stress the importance of reading this information enough

[![image](/assets/posts/2011/02/image_thumb288.png)](/assets/posts/2011/02/image290.png)

The following step requests confirmation on where the installer should place the Update, the default location is normally a good option

[![image](/assets/posts/2011/02/image_thumb289.png)](/assets/posts/2011/02/image291.png)

And now we can begin the installation of the update.

[![image](/assets/posts/2011/02/image117_thumb.png)](/assets/posts/2011/02/image1171.png)

As we mentioned already this is a large update, so the installation will take a few minutes to be processed.

[![image](/assets/posts/2011/02/image120_thumb.png)](/assets/posts/2011/02/image1201.png)

Before finally returning to us with the **Installation Complete** message

[![image](/assets/posts/2011/02/image126_thumb.png)](/assets/posts/2011/02/image1261.png)

After **Closing** to installation Wizard, we should see a new Splash screen, which we must use to install the new updates

### Apply the Update

At this point we are now ready to Apply the Update we can select the option **Run Server Update**

[![image](/assets/posts/2011/02/image123_thumb.png)](/assets/posts/2011/02/image1231.png)

After clicking on the option, we will see the following installer start for us. We will need to click on **Next** after the installer loads to actually allow the installation of the update to run.

[![image](/assets/posts/2011/02/image132_thumb.png)](/assets/posts/2011/02/image1321.png)

Once the update has completed, the installer will close automatically, however after a few moments we will see the installer start again. This will happen a total of 3 times, as there are 3 different updates which need to be applied in sequence.

Once the installer has completed the 3 passes of applying the different updates we should reboot the server.

## Delegation Permission

Using the **Administration** view, we will select the **Users Roles** node. We have not yet applied any changes to the Profile, so this is our first view of this area on the console. Integration with Operations Manager, requires that we add the Action account into the **Administrator **role.

[![image](/assets/posts/2011/02/image70_thumb.png)](/assets/posts/2011/02/image701.png)

Double Click on the **Role** and we will be presented with the dialog for** User Role Properties for Administrator.**

[![image](/assets/posts/2011/02/image73_thumb.png)](/assets/posts/2011/02/image731.png)

Click on the **Members** tab, of the dialog, and from here we will click on the **Add** button

[![image](/assets/posts/2011/02/image67_thumb.png)](/assets/posts/2011/02/image671.png)

This will open the browse dialog where we can locate the Operations Manager Action Account, for the lab this is **!svcSCOMAction**

[![image](/assets/posts/2011/02/image76_thumb.png)](/assets/posts/2011/02/image761.png)

We can then click on **OK** and add the user to the role

[![image](/assets/posts/2011/02/image79_thumb.png)](/assets/posts/2011/02/image791.png)

We can then check the member list, and once ready, we can then click on **OK** to close the dialog

## Integrate Operations Manager

Now, for the last step, Staying in the **Administration** view, we will select the **System Center** node. This time we should see two integration points. The critical one here is **Operations Manager Server**.

Double click on the entry, and we should see the **Operations Manager Server** dialog presented. In the we will need to enter the Fully Qualified name of the Operations Manager server, **LAB-SCOM.damianflynn.demo**

[![image](/assets/posts/2011/02/image82_thumb.png)](/assets/posts/2011/02/image821.png)

Then click on **OK** and the server will then start the process of integration, which will take a few moments to complete, and once done the dialog will be closed and we will be back looking at the console.

[![image](/assets/posts/2011/02/image_thumb318.png)](/assets/posts/2011/02/image320.png)

# Activate PRO

We are now ready to start the process of activating the PRO tips. Launch the SCVMM Console, and from the **Hosts** view we can select a host group, VM Cluster, or even the All Hosts group to enable the PRO tips on.

For demonstration, I am going to enable the **Lab** host group, by selecting and right clicking on the group, and from the context menu selecting **Properties**

[![image](/assets/posts/2011/02/image3_thumb.png)](/assets/posts/2011/02/image321.png)

From here, we are shown the **Host Group Properties **dialog, we will select the **PRO** tab.

[![image](/assets/posts/2011/02/image6_thumb.png)](/assets/posts/2011/02/image610.png)

From here, we will

  * Unselect the option **Inherit PRO settings from the parent Host Group**  
  * Then select **Enable PRO on this Host Group**  
  * Close the Severity level that suites you, I am going with **Warning and Critical**  
  * Also for the lab, i am going to **Automatically implement PRO tips on the Host Group**  
  * I am going to allow automatic implementation on **Critical Only** issues 

[![image](/assets/posts/2011/02/image9_thumb.png)](/assets/posts/2011/02/image910.png)

# Operations Manager

We can also check Operations Manager to view the results of the integration. On the **Monitoring** view we can see there should now be two new groups

[![image](/assets/posts/2011/02/image_thumb319.png)](/assets/posts/2011/02/image322.png)

The groups we should see will include **Virtual Machine Manager 2008 R2 **and **Virtual Machine Manager 2008 R2 Views**

[![image](/assets/posts/2011/02/image_thumb320.png)](/assets/posts/2011/02/image323.png)

We can see the results of the view which has been created, if we click on **Diagram View for LAB2DSCVMM**

[![image](/assets/posts/2011/02/image_thumb321.png)](/assets/posts/2011/02/image324.png)

Now, we can wait for Operations Manger to deploy the new packs, and start gathering information so that it can begin preparing to issue us some PRO Tips

# Conclusion

Well, we have arrived at a major milestone on our journey. With the deployment of SCVMM and SCOM, along with there Integration we now have the foundation of our Dynamic Data Center.

Of course there is a lot more we can do, for example SCOM currently only has basic monitoring installed, we should go further and implement support for monitoring as much as possible, including network and storage, so that as much relevant information can be gathered, permitting the PRO tips to be extremely effective.
