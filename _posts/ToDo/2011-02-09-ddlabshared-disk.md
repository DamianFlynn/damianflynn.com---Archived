---
author: Damian.Flynn
comments: true
date: 2011-02-09 23:19:00+00:00
layout: post
slug: ddlabshared-disk
title: DDLAB–Configure Shared Disk
wordpress_id: 57
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

Ok, we have the basic foundation now in place, the next stage for us will be the configuration of the shared disk for the Cluster.

The objective here will be to support a Cluster constructed from 2 nodes LAB-VM01-01 and LAB-VM01-02 with shared disk which we will host from LAB-SVR01.

The Shared storage we will be using will be hosted form LAB-SVR01, as an iSCSI Target, and we will be creating 2 shared disks for use in our cluster, a Quorum, and a CSV Volume for the virtual machines.

The process will take us trough a few steps in the following order

  * Create the iSCSI Storage and Targets  
  * Configure the two nodes to Connect with the Shared Disk as iSCSI Clients 

# iSCSI Target Software

I am going to use the Microsoft iSCSI Software target, this will allow me to keep the number of machines i need down, and is very easy to configure for what we need in the lab. You are welcome to use any others you may have a preference for (StarWind is another popular software target, or if you have more hardware the Free Linux NASFILER is pretty neat).

Lets start with the installation and configuration process. All this work will be carried out on our lab node LAB-SVR01 which we have defined in our plan to be the storage server for the Cluster.

## Install Microsoft iSCSI Software Target

We will get started with the installation, which is very simple and only needing us to follow a few steps trough the installation wizard, and before we know where we are, the software will be installed and ready for configuration.

[![image](/assets/posts/2011/02/image_thumb1.png)](/assets/posts/2011/02/image1.png)

[![image](/assets/posts/2011/02/image_thumb2.png)](/assets/posts/2011/02/image2.png)

[![image](/assets/posts/2011/02/image_thumb3.png)](/assets/posts/2011/02/image3.png)

[![image](/assets/posts/2011/02/image_thumb4.png)](/assets/posts/2011/02/image4.png)

[![image](/assets/posts/2011/02/image_thumb5.png)](/assets/posts/2011/02/image5.png)

[![image](/assets/posts/2011/02/image_thumb6.png)](/assets/posts/2011/02/image6.png)

[![image](/assets/posts/2011/02/image_thumb7.png)](/assets/posts/2011/02/image7.png)

Now, that was not to difficult and we are ready to get into the more interesting stuff. If you take a look at your start menu, you will see a new entry for **Microsoft iSCSI Software Target**.

[![image](/assets/posts/2011/02/image_thumb8.png)](/assets/posts/2011/02/image8.png)

Lets Launch this tool, and we can start on the topic of configuration.

## Configuration

Great, assuming we have not encountered any issues so far you should now see a simple MMC interface with a few branches for us to work with.

[![image](/assets/posts/2011/02/image_thumb9.png)](/assets/posts/2011/02/image9.png)

First off we will add the 2 node in the Target list, which will permit us to configure these as iSCSI Clients a little later, and then we will create the storage area which we will use for this clusters Quorum and first CSV volume.

### iSCSI Targets

Let start with a _Right Click_ on the **iSCSI Targets** node and from the context menu we will select **Create iSCSI Target** from the context menu.

[![image](/assets/posts/2011/02/image68_thumb.png)](/assets/posts/2011/02/image68.png)

This will launch for us a simple Wizard Interface, and can get started by clicking on **Next**

[![image](/assets/posts/2011/02/image64_thumb.png)](/assets/posts/2011/02/image64.png)

iSCSI Targets are a really listener’s we create for each client which will be connecting to the storage over iSCSI. So for our lab deployment we will be repeating this wizard per node requiring to connect with our iSCSI service.

To keep the management of this simple and easy to remember I normally with use the Fully Qualified Domain Name of the client node which will be connected as the iSCSI Target Name, and then provide a simple description to help me identify that client in my mind.

[![image](/assets/posts/2011/02/image51_thumb.png)](/assets/posts/2011/02/image51.png)

The next step is then to define the Identifier which we will be using on the client when connecting to the iSCSI server. there are many standards on how this should be formated, and that indeed is a topic for deeper thought, so for now, I am going to be quite simple and stick with the Fully Qualified Domain Name of the Client again.

[![image](/assets/posts/2011/02/image54_thumb.png)](/assets/posts/2011/02/image54.png)

Now, that we we have these two pages completed we can move on in the wizard to complete the process of adding the client as a target.

[![image](/assets/posts/2011/02/image57_thumb.png)](/assets/posts/2011/02/image57.png)

Repeat the process, and add the second node for our lab, and after you are complete you should be seeing a similar result in your **iSCSI Target** console.

[![image](/assets/posts/2011/02/image60_thumb.png)](/assets/posts/2011/02/image60.png)

### Virtual Disks

The next step is to create a Disk which we will offer to the iSCSI clients to connect to. This process is also pretty simple, and Wizard assisted. As before we will to repeat for each Disk we would like to create for presentation to our targets.

Right, lets get started, _Right Click_ on **Devices** and select the option **Create Virtual Disk**

[![image](/assets/posts/2011/02/image27_thumb.png)](/assets/posts/2011/02/image27.png)

This will pop up another nice wizard for us to get acquainted with, lets click on **Next **to begin.

[![image](/assets/posts/2011/02/image30_thumb.png)](/assets/posts/2011/02/image30.png)

The Wizard is going to create for us some Virtual Disks which we will be presenting to the clients. Since the disks will be Virtual, we just need to defined a path and name for the Virtual Disk. I have created a new volume to host this storage data which I am going to use for these Virtual Disks.

The first disk I am going to create will be the Quorum for the LAB-VM01 Cluster, and I am putting these Virtual Disks in a folder called **iSCSI Storage**

[![image](/assets/posts/2011/02/image33_thumb.png)](/assets/posts/2011/02/image33.png)

Next step is to define a capacity for this disk. As the first one is just for Quorum so 1Gb storage is enough for this one.

[![image](/assets/posts/2011/02/image36_thumb.png)](/assets/posts/2011/02/image36.png)

Again, to keep things organised we will label the disk with a simple description contain the name of the Node/Cluster which will be using the Disk, and its purpose.

[![image](/assets/posts/2011/02/image39_thumb.png)](/assets/posts/2011/02/image39.png)

So now, we get to decide who can access this new disk we just created. This is where we will assign the Targets with permission so simply need to click on the **Add **button

[![image](/assets/posts/2011/02/image42_thumb.png)](/assets/posts/2011/02/image42.png)

This will then popup a **Add Target **dialogue where we get to see the list of **iSCSI Targets** which we have created on the server to select from. Since we are building a cluster we will be allowing both our nodes access to disk

[![image](/assets/posts/2011/02/image71_thumb.png)](/assets/posts/2011/02/image71.png)

The Wizard jumps back with a warning about having multiple nodes access the same disk, however since we are indeed building a cluster we don't need to panic

[![image](/assets/posts/2011/02/image74_thumb.png)](/assets/posts/2011/02/image74.png)

After dismissing the warning message we can then see the Targets listed in the allowed to access list

[![image](/assets/posts/2011/02/image77_thumb.png)](/assets/posts/2011/02/image77.png)

And we can finish off the wizard.

[![image](/assets/posts/2011/02/image80_thumb.png)](/assets/posts/2011/02/image80.png)

As we are going to need to also create at least one CSV volume for the Hyper-V installation, we will need to run trough the wizard again a second time, this time creating a larger volume of 100Gb and calling it _LAB-VM01 CSV1 Storage_

When you are complete you should be seeing the console present information similar to this screen shot.

[![image](/assets/posts/2011/02/image_thumb10.png)](/assets/posts/2011/02/image10.png)

## 

# iSCSI Client

For the clients, I am going to use the Microsoft iSCSI Client software which is part of the Windows Operating System.

I will step trough the process on one of the LAB-VM01-0X nodes, but this does need to be completed on both, just adjusting the names to the correct entries as we progress.

So, if your feeling confident, dig in; and lets see if we can get our shared disks online.

## Setup Client’s

Now, let’s see if we can make our iSCSI server do some work, Click on the **Start** button and type **iSCSI** which should present us with the **iSCSI Initiator**

[![image_thumb14](/assets/posts/2011/02/image_thumb14_thumb.png)](/assets/posts/2011/02/image_thumb141.png)

We just need to click on this to launch the iSCSI Client. As this is the first time we have launched we will be prompted with a short message to ask if we are happy to start the service and also configure the service to auto-start for us. As we are going to be using iSCI for the cluster we will be agreeing and clicking on **Yes **to progress

[![image_thumb1](/assets/posts/2011/02/image_thumb1_thumb.png)](/assets/posts/2011/02/image_thumb110.png)

After a few moments the iSCSI Client interface will be presented to us. On initial launch we can see there is very little information to be seen. So we will need to carry on and do some configuration work.

[![image_thumb143](/assets/posts/2011/02/image_thumb143_thumb.png)](/assets/posts/2011/02/image_thumb143.png)

Click on the **Configuration** tab, here we can see the **Initiator Name** which is by default in IQN format (for example _iqn.1991-05.com.microsoft:lab-vm01-01.damianflynn.demo_), which if you recall when we setup the iSCSI Server we discarded and went with just a simple DNS name

[![image_thumb145](/assets/posts/2011/02/image_thumb145_thumb.png)](/assets/posts/2011/02/image_thumb145.png)

So, we need to set this to match the names our iSCSI Server is expecting. Click on **Change** and we can edit the name to the node name, which is as you recall what we defined in the server, for the first server we will use **lab-vm01-01.damianflynn.demo**.

[![image_thumb147](/assets/posts/2011/02/image_thumb147_thumb.png)](/assets/posts/2011/02/image_thumb147.png)

Ok, now we click on the **Discovery** tab, here we will click on **Discover Portal** which will popup the **Discover Target Portal**

[![image_thumb148](/assets/posts/2011/02/image_thumb148_thumb.png)](/assets/posts/2011/02/image_thumb148.png)

Here we will just provide the the IP address of the iSCSI Server, which should be **172.16.100.10** or even the server name **LAB-SRV01.DAMIANFLYNN.DEMO**. Now, Click on **OK** to close the dialogue.

[![image_thumb149](/assets/posts/2011/02/image_thumb149_thumb.png)](/assets/posts/2011/02/image_thumb149.png)

This will update the **Target Portals**, with our server now listed. Next Click on **Targets **Tab.

[![image_thumb150](/assets/posts/2011/02/image_thumb150_thumb.png)](/assets/posts/2011/02/image_thumb150.png)

Now, we can click on **Refresh** and we will should now see the IQN of our iSCSI Server in the list. The status will be listed as **Inactive** so we just need to click on **Connect**.

[![image_thumb152](/assets/posts/2011/02/image_thumb152_thumb.png)](/assets/posts/2011/02/image_thumb152.png)

This will popup the **Connect To Target** dialog, the default settings are perfect for our lab so just click on **OK** to dismiss the dialog and allow the iSCSI Client to logon to the iSCSI Server.

[![image_thumb153](/assets/posts/2011/02/image_thumb153_thumb.png)](/assets/posts/2011/02/image_thumb153.png)

All gone to plan, the status should now be update to **Connected** and our iSCSI Client should now be connected to the iSCSI Server.

[![image_thumb154](/assets/posts/2011/02/image_thumb154_thumb.png)](/assets/posts/2011/02/image_thumb154.png)

Almost complete, we just need to click on **Volumes and Devices** tab, and then click on **Auto Configure** button which should ensure that the **Volume List** is not empty. If everything has worked there will be 2 disks listed, as from memory, we did create 2 disks on the iSCSI Server just for this.

[![image_thumb155](/assets/posts/2011/02/image_thumb155_thumb.png)](/assets/posts/2011/02/image_thumb155.png)

Fantastic, Now all we need to do is click on **OK** to close the iSCSI Client.

## Server Disk Manager

Let’s launch the Disk Management module, so that we can check if the two new disks have made their way to the Disk Manager. We are expecting to see a

  * 1Gb disk which we created for the Quorum, and a  
  * 100Gb disk for the CSV Volume. 

[![image_thumb156](/assets/posts/2011/02/image_thumb156_thumb.png)](/assets/posts/2011/02/image_thumb156.png)

Before we close off, we will bring online the disks. We only need to do this exercise on one of the nodes, because this is a Shared Disk right!.

Lets start with a Right click on the Disk Label, and select **Online** from the context Menu.

[![image](/assets/posts/2011/02/image_thumb44.png)](/assets/posts/2011/02/image50.png)

This disk will now change to _Not Initialized_ status.

[![image](/assets/posts/2011/02/image_thumb45.png)](/assets/posts/2011/02/image52.png)

Lets Right click again on the Disk Label, and this time select the option **Initialize Disk** from the context Menu.

[![image](/assets/posts/2011/02/image_thumb46.png)](/assets/posts/2011/02/image53.png)

This will popup the **Initialize Disk **dialogue, where we can select the **GTP (GUID Partition Table)** as the partition type for the selected disk. We can then click on **OK **to apply.

[![image](/assets/posts/2011/02/image_thumb47.png)](/assets/posts/2011/02/image55.png)

At this point the disk will now progress to the status of **Online** as we can see in the label

[![image](/assets/posts/2011/02/image_thumb48.png)](/assets/posts/2011/02/image56.png)

Now we can create a **New Simple Volume** by right clicking on the **Unallocated** space and selecting the option on the context menu

[![image](/assets/posts/2011/02/image_thumb68.png)](/assets/posts/2011/02/image84.png)

This will open a new wizard for us.

[![image](/assets/posts/2011/02/image_thumb69.png)](/assets/posts/2011/02/image85.png)

After pressing **Next, **We will accept the full space available for the Volume

[![image](/assets/posts/2011/02/image_thumb70.png)](/assets/posts/2011/02/image86.png)

On the next page we will assign a Drive Letter for this volume, I am going to use **Q **for the **Quorum** (Note for the CSV Volume I am going to select the option **Do not assign a drive letter or drive path**)

[![image](/assets/posts/2011/02/image_thumb71.png)](/assets/posts/2011/02/image87.png)

We will then format the volume as NTFS and set the label.

[![image](/assets/posts/2011/02/image_thumb72.png)](/assets/posts/2011/02/image88.png)

And finally we can **Finish **the wizard to create and format the partition

[![image](/assets/posts/2011/02/image_thumb73.png)](/assets/posts/2011/02/image89.png)

Great, that was not hard, just repeat this for the second disk and we should be ready for the Cluster work.

The prepared disks should resemble the following Image

[![image](/assets/posts/2011/02/image_thumb74.png)](/assets/posts/2011/02/image90.png)

## Completed

Nice work, now remember that you have 2 VM nodes in the lab, so you have to setup the iSCSI Client on the second node before you move onto the next stage.

We are now in a really good place. We thave all the basic services now working, the next step in the process is to spin up the cluster and enable the CSV volumes. Lets take a little break and check back later, as we start the next mission.
