---
author: Damian.Flynn
comments: true
publishDate: 2011-02-19 23:24:00+00:00
template: post.hbt
slug: ddlabconfigure-scvmm
title: DDLAB–Configure SCVMM
wordpress_id: 3481
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

We are finally ready to start some work with the System Center tools, and the first one we have now completed the installation of is the Virtual Machine Manager. You will have completed the installation process in the previous post, and upon launching the interface there was nothing to see.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb108.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image124.png)

We are going to spend the next hour or so configuring SCVMM to manage our new Infrastructure.  

# Host Groups

Let’s begin with Host Groups, these you can easily consider as groupings of how to gather your Virtual Host infrastructure. Common examples are names of physical locations, logical segregation of hosts strictly defined for special purposes, hosts managed by different administration team’s, etc.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb109.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image125.png)

To Add a new Host Group, just _Right Click_ on **All Hosts** and from the context menu we can select the option **New host group**. I am going to call my group **Lab** as its a good match for my purpose.

# Add Host

Next, we will add our VM host to the new group. Using the **Actions** pane we will select the option **Add Host.**

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb111.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image126.png)

This will launch the **Add Hosts** wizard. The first section of the dialogue requires us to select our VM host type, and wheatear the Host is part of our Active Directory, or in a perimeter network. As you can figure, our hosts are on the Active Directory domain, so that is the option i am selecting.

Next, we need to provide details on how to connect administratively to the host, as we will need to query them and later push an agent out. In the lab I am going to just use the _administrator_ account. Once you are satisfied that we the details are correct, we can click on **Next** to progress

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb112.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image127.png)

On the next page, we are requested to **Select Host Server**. Here we can add a number of servers to the list, and once ready we can click on the Next button. For the Lab, I am going to enter the name of the first node in our VM Cluster, this is **LAB-VM-01** and then click on **Add**

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb113.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image128.png)

Virtual Machine Manager then starts a search for the host, Since our host is clustered, After a few second’s the system returns back telling us that it has detected the cluster and asks if it is ok for use to add all the nodes of the cluster. (Interesting you will also see, that if the Hyper-V function is not installed on the hosts, SCVMM will also install this for us, and restart the nodes, We completed this manually, but this does offer some automation if getting more hosts online in an automated manner). I am going to select **Yes** and let SCVMM add all the nodes in our cluster

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb114.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image129.png)

A few moments later, we will see the wizard update, and present us the name of our cluster, and also all the nodes which are members of the clu0ster. Pretty neat stuff, We are ready to move on, so click **Next**

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb115.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image130.png)

On the **Configuration Settings** page, we can select the name of the Host Group which we would be placing the Virtual Machine Hosts into. I created a group a little earlier called **Lab** which I will select for these hosts. Since this is a clean environment I don't need to re-associate the Virtual Machines hosts with this manager, as they would not have been associated with any other manager before this. I am ready, so clicking **Next** again

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb116.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image131.png)

On the **Host Properties** page, we are asked where we will be storing all the virtual machines. We already prepared a Cluster Shared Volume (CSV) for this storage purpose, so I am going to type my Volume path **C:ClusterStorageVolume1** and then click on **Add **to see this listed in the **default virtual machine paths**. If we had additional CVS paths we can also add these now, and once ready click on **Next** to progress

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb117.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image132.png)

The final page in the Wizard is the **Summary** page, assuming everything is ok, we can now click on **Add Hosts** to begin the process.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb118.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image133.png)

After a few seconds the Wizard is closed, and we presented back on the main console, with a **Jobs** window also open, where we can monitor the progress of our Virtual Machine Hosts been added to Virtual Machine Manager

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb119.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image134.png)

The Job will take a few minutes to complete and once ready we should see these maker as completed, and in the main window, the status of the hosts should be listed as **OK**. We can close out the **Jobs** window.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb120.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image135.png)

When we take a new look at our **Hosts** pane, we can now see our cluster and the two nodes which are members listed as part of the tree.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb121.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image136.png)

# Virtual Machines

Now, that we have the agents deployed, and SCVMM is now managing our hosts, we can switch views to see what virtual machines have been detected on our cluster. If you have been following along then we are really only expecting to see one Virtual Machine, which of course is **LAB-SCVMM**. In the Left pane, click the selector and chose the option **Virtual Machines** which will update the display to present us with all the detected VM’s,

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb122.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image137.png)

So, what can we do from here? Well quite a lot actually, for starters everything we were able to do in Failover Clustering for example, is available when we right click on the Virtual Machines, Some options are greyed out depending on the status and health of the virtual machine, while others are available for use to work with.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb123.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image138.png)

Let’s try a simple test drive, I am going to chose the option to **Migrate** from the context menu. This will pop us the Wizard and we will get to see a little of the magic of SCVMM. In the view we will quickly see the Star ratings for each host, and also the most effective method to transfer the virtual machine.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb124.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image139.png)

We do not have to many to nodes to chose from, the first available target is highlighted for us, (the only one in our lab), so we can progress by clicking on **Next**

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb125.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image140.png)

On the summary screen, we can check our selection, and also get to see what PowerShell is automatically generated, in case we might be interested in doing this process from the command line. This is an example of the generated job code.
    
    # ------------------------------------------------------------------------------
    # Migrate Virtual Machine Wizard Script
    # ------------------------------------------------------------------------------
    # Script generated on 19 February 2011 00:52:35 by Virtual Machine Manager
    #
    # For additional help on cmdlet usage, type get-help <cmdlet name>
    # ------------------------------------------------------------------------------
    
    $VM = Get-VM -VMMServer localhost -Name "LAB-SCVMM" | where {$_.VMHost.Name -eq "LAB-VM01-02.damianflynn.demo"}
    $VMHost = Get-VMHost -VMMServer localhost | where {$_.Name -eq "LAB-VM01-01.damianflynn.demo"}
    
    Move-VM -VM $VM -VMHost $VMHost -RunAsynchronously -JobGroup 0323a854-8c22-4bec-a8bf-8235c12eb404







We can now click on **Move** and and the wizard will close, opening up the **Job** window for us, so we can view the progress on this task.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb126.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image141.png)




Nice, we seem to be working well; Ok time to do a little more configuration work.




# Virtual Network’s




One of the other key player in making all this stuff work is the Virtual Networks. Back when we configured the Hyper-V server we did setup a network interface specially for the Virtual Machines network traffic, and even let Hyper-V remove all other protocol bindings from that interface so that it would not be used by the host system.




Later we installed out first Virtual Machine, and tested that it was indeed able to connect to the real network, and even after some failover tests everything still worked perfectly. if it did not we would not be at this point, and we clearly would not have SCVMM working to this stage.




So, What we need to check now, is how SCVMM is understanding these Virtual Networks. This is actually very important, SCVMM needs to have a very clear understanding of this so that it can be confident that placing a virtual machine on a specific host will not result on the virtual machine been unable to communicate with the network, that would be a disaster.




## Configuration SCVMM Networks




In our lab, we added just one cluster, which has 2 hosts, so lets begin here. We will repeat this check for each of the hosts in the cluster to ensure they are all configured the same.




In either _Hosts_ View, or _Virtual Machines_ view, we will right click on the host name, and from the context menu we will select the **Properties** option, and once the dialogue appears we will select the **Hardware** tab




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb127.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image142.png)




On the Hardware tab, we can see all the hardware information of the Host machine, including CPU, RAM, etc. We are interest in the Network currently, so I will select each of the network interfaces listed on the Left pane, checking to see if I can find the **Connection Name **in the **Adapter details** which matches the name of the network adapter we defined when we were preparing our cluster and setting up Hyper-V. I was lucky, and the first Adapter in the list matched.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb128.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image143.png)




As no **Network location **is set for me, I am going to **Override discovered network location** and provide my own, which I will call my **Demo Lab**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb129.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image144.png)




As there is no Apply button, I will click on **OK** to apply the settings, but this will close my dialogue, so I will need to right click again on the node name, and select the **properties** option from the context menu, then time selecting the **Networking** tab on the dialogue




On the network tab, we can see one **Virtual Network** displayed in the list of networks, and this is of course the **VM Switch** which we configured during the setup of Hyper-V. So it looks fine right?, Well let’s click on this network and see what other detail it shows us about the network’s settings.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb130.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image145.png)




Hmm, there is a fair amount of Stuff here, but what does this really mean? Some of it resembles what we completed in Hyper-V right, but then there is a **Network Tag**? Well first lets start with the virtual Network Details




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb131.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image146.png)




Here, I am going to leave the name just as we set it, however you can of course change this if you desire, just be sure to keep it standard on all the nodes in the cluster (you can of course ignore this, but you will need to understand that this will affect how SCVMM determines which networks to connect virtual machines with).




For a virtual network to be considered standard by SCVMM and available to highly available virtual machines on a host cluster, each virtual network in the host cluster must be configured with






  * The virtual network name must be identical on each host in the cluster. Virtual network names are case-sensitive, so the cases of all characters must match. 

  * The host network adapters to which the virtual network is attached on each host in the cluster must have the same location. 

  * The virtual network must have the same tag on each host in the cluster. 






As my lab is pretty simple, I will set the **Network Tag** to be simply **Virtual Switch** as i will not be using lots of different complex configuration options, and finally we can provide any Description which helps with understanding the purpose of the virtual network




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb132.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image147.png)




Once you are happy, we can click on OK and close off the dialogue. Now lets move to node 2 in our cluster and check its network properties. This time on the **Network Properties** page we will see that the **Network Tag** we set on the first node, is now in the drop down options, and we can select this also as the tag for the second node. Type in your description and then we can click on OK




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb133.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image148.png)




At this point we have created a new **Network Tag** which SCVMM can now use to select the correct Hyper-V Network/Switch for our Virtual Machines to use when looking for network communications. This tag can now be utilized when we can templates for example to allow SCVMM select the correct Hyper-V network, without SCVMM needing to be worried about the technical stuff that is done on the Host to make the network work, for example Teams. LACP Groups, etc.




Last task, After we have completed with the update of the virtual network configurations on all our nodes, we need to refresh the cluster to ensure that each virtual network is detected. Then check the Networks tab in the host cluster properties to verify that the networks have been added to it.




# Library




During the installation of SCVMM one of the questions we were asked, is where would we like to create the initial Library. The Library we can consider as a storage location for resources which can range from scripts, settings, VHD’s and ISO’s. This Library is then shared out during installation so that the resources contained here can be accessed by the VM Hosts as we work on deploying or storing virtual machines.




To access the library, we can use its UNC path, and thus view the content of the Library. As one of our next goals will be to deploy Virtual Machines using SCVMM, I am going to create a new folder in the Library called ISO’s, and copy in the ISO Image for Windows 2008 R2.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb134.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image149.png)




We can do this within SCVMM, or from the file system, as SCVMM will rescan the Library periodically, and detect any new content we add here for use. As you can imagine you have the ability to sort and structure the content of the library as suites your requirements.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb135.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image150.png)




As you explore your library, you will also notice that SCVMM provides you with two Blank VHDs, which you may find useful for creating your own Virtual Machines from. You can of course create your very own Blank VHD’s to match your requirements.




## Templates




As we prepare SCVMM for creating a new Virtual Machine, we will take a closer look at Templates. These Templates allow us to assign both the **Hardware Profile**, and the **Software Profile**’s of our target machine, in a manner which will assist us in always creating an equal base machine.




Let’s walk the process of creating a New Template, and while we do this, we will also create and store our first Hardware Profile and Software Profile, as we prepare to have SCVMM deploy our new Virtual Machine.




### Create Template and Profiles




From the _Actions_ pane, under the heading _Library Actions_, lets select the option **New template.** this should launch a new Wizard for us to assist in the process.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb136.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image151.png)




We are initially offered the option of creating this template for an **existing template of virtual hard disk stored in the library** or from an **existing virtual machine that is deployed on a host**. Honestly at this stage we could go either way, but as we are building a new environment let’s take the opportunity to have a clean start for any new systems. As you get more accustomed to templates and how they work, you will see the advantages of using a pre-configured virtual machine, as this will permit you to pre-Bake in Anti-Virus or other utilities which you deploy as standard on your virtual machines.




I am going to select the option **Use an existing template or virtual hard disk stored in the library** as my start ground, and click on the **Browse **button to select the **Blank Disk - ****Large** from the library. _I checked the properties of these earlier, and learned the small disk is set to 16Gb, and large disk is set to 60Gb, which is a better fit for my needs._




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb137.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image152.png)




After selecting the **Blank Disk – Large** and and clicking on **OK**, I then clicked on **Next** to progress to the next stage of the wizard. On the following page of the Wizard **Template Identity **we get to provide a name for the template and a description on the purpose of this template also. After you have entered the details, we can progress again




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb138.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image153.png)




The next page **Configure Hardware** allows us to select previously created hardware profiles, or create a new one for use in this template. The view should be familiar to you as we have observed a similar image in previous configuration step we have already completed.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb139.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image154.png)




I will spend a few moments here and set some of the hardware choices to suite my production needs


<table cellpadding="0" width="400" border="0" cellspacing="0" >
<tbody >
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb140.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image155.png)
</td>

<td width="200" valign="top" >Let’s start with adding a suitable CPU to the server, if you desire you can also add up to 4 processors to the hardware profile
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb142.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image156.png)
</td>

<td width="200" valign="top" >Next in line is RAM, I am going to just use a standard 1Gb for the nodes in my LAB. Its a bit skimpy, but it is a demo lab!
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb144.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image157.png)
</td>

<td width="200" valign="top" >Networks next, I assume you know what you are doing here, we have already spent time setting up the location and tag earlier, so now we get to use this configuration and setup the template to use our Network. _Note: I removed the Emulated Network adapter and replaced it with the Synthetic adapter_
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb146.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image158.png)
</td>

<td width="200" valign="top" >The last setting I am going to enable is **Make this VM highly available** as we will be deploying to a cluster. SCVMM will use this setting to determine if the template is better suited to hosts which are no clustered.
</td></tr></tbody></table>


Ok, now we have setup the hardware, let’s save this information as a Hardware Profile, so that we do not have to work this set of changes every time we create a new template. Click on the menu bar in the Dialogue, and select the option **Save as…** which will pop up the **New Hardware Profile **Dialogue for us. On the **General **tab, we can give this profile a name which will help us identify it easily as our library grows – in my example I am going to use **Prod – 1CPU, 1Gb RAM, HA** and then some more information in the **Description** field. You can click on the **Hardware Settings** tab before you click on **OK** just to check that the hardware match’s what you just configured.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb151.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image159.png)




When you click on **OK** you are returned to the **New Template** wizard, and this time if you click on the drop down, beside the **Hardware Profile** you will see the new profile you just created in the list. Let’s select this so that the Template will be using this profile, and then click on **Next **to process to the next step




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb157.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image160.png)




The next step of the wizard is the **Guest Operating System** where we get to define the _Software Profile** **_for the template. e




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb158.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image161.png)




As we did on the hardware page, we will spend a few moments here and set some of the software options to suite my production needs


<table cellpadding="0" width="400" border="0" cellspacing="0" >
<tbody >
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb159.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image162.png)
</td>

<td width="200" valign="top" >I am going to leave the computer name as *****, this will be defined later when we actually deploy a virtual machine from the template.

I also then provide a Name, and Organisation name for the OS.

</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb160.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image163.png)
</td>

<td width="200" valign="top" >I am not going to set a Password for the local Administrator within this template.
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb161.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image164.png)
</td>

<td width="200" valign="top" >The product key you will enter here depends on your version of the OS you are deploying. If you are deploying a Volume Licence version for activation via KMS there are special keys for this listed on technet [http://technet.microsoft.com/en-us/library/cc303280.aspx](http://technet.microsoft.com/en-us/library/cc303280.aspx)
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb162.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image165.png)
</td>

<td width="200" valign="top" >From the list of operating systems, I am going to chose the option **Windows 2008 R2 Enterprise 64-Bit** as this matches my requirements and the ISO file I added to the library earlier.
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb163.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image166.png)
</td>

<td width="200" valign="top" >Finally for this profile, I am going to select to have the OS joined to our domain. _Normally I would create a domain account for the purpose of joining machines to the domain, but for the Lab, I am going to use the Administrator Account._
</td></tr></tbody></table>


Good, now lets again click on **Save as…** which as will guessed, will display the dialogue for **New Guest OS Profile**, as before I will provide a name while help us identify this profile in our library and its purpose, which for this Lab example i am calling **Win2008R2VL on DF-DEMO**, and also providing a short description for further clarification. Again prior to clicking on **OK** we can check the **Guest OS** tab to verify the settings we defined.




After clicking on **OK** we are returned back to the **New Template Wizard** where we can now use the dropdown for **Guest operating system profile** and select our new profile, so as to again ensure it is associated to this template. _Note – if we are deploying a non-windows OS, or have very special requirements we can also chose the option “Customisation not required”_




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb164.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image167.png)




Finally, we are presented with the **Summary** page on the wizard, where we can then click on **Create** to have SCVMM build the new **Template** for us and add it to our library.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb165.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image168.png)




### View Templates and Profiles




Now that the template has been created we can check SCVMM to see what additional templates are in the library by clicking on **VMs and Templates** to see a list of what we have stored presented to us




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb166.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image169.png)




We can also view the profiles by selecting the **Profiles** from the resources tree in the Library.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb167.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image170.png)




### DVD Template




Now that we have created our production template, We need to create a template which we will not be configuring the **Guest Operating System** so that we can deploy a Virtual Machine from a DVD Image.


<table cellpadding="0" width="400" border="0" cellspacing="0" >
<tbody >
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb168.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image171.png)
</td>

<td width="200" valign="top" >We are going to do this from scratch, so again, we will be creating the virtual machine based on the **Blank – Large Disk**
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb169.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image172.png)
</td>

<td width="200" valign="top" >I am going to call this template **ISO – Windows 2008 R2 Ent** as this template will be dependant on the ISO and will not be configuring the VHD
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb170.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image173.png)
</td>

<td width="200" valign="top" >We have done all the Hardware work already, so now we gain the benefit, and select the profile in the Drop Down Menu
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb171.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image174.png)
</td>

<td width="200" valign="top" >As we are deploying to a new blank VHD, we will not be able to do any OS customisations, therefore for this template We will be selecting **Customization not required**
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb172.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image175.png)
</td>

<td width="200" valign="top" >Take a quick Double check of the settings, and then lets **Create**
</td></tr></tbody></table>


# Create a Virtual Machine




Now we can pull all the work we have completed together and see if SCVMM has everything it requires to assist us in creating a new Virtual Machine.




## Create a VM from a DVD ISO




From the **Actions** menu I am now going to select the option **New virtual machine**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb173.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image176.png)




As expected, we get yet another Wizard to help us on our quest. I am going to use the work we just completed and select to create the new virtual machine based on a pre-configured template.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb174.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image177.png)




Clicking on the **Browse **button, I now get to see our newly created Template’s listed, I am going to select to utilize **ISO – Windows 2008 R2 Ent**. Then after clicking on **OK **to close the dialogue, I will click on **Next** to progress the Wizard.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb175.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image178.png)




On the next screen, we are going to provide the **Virtual Machine Identity**, here I am going to provide the name of the next VM i need in the lab, which will be **LAB-SCOM** for System Centre Operations Manager. After providing a description i can click on **Next** to progress.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb176.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image179.png)




The next page presents the hardware definition for the virtual machine, If we take a close look, we will see that this is as we defined earlier as the hardware profile for the template.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb177.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image180.png)




Before we can deploy a Virtual Machine, we need to add an ISO to the hardware profile to install the operating system from. We could have done this when we defined the Hardware Profile, but since I did not do it at that point, I will click on **Browse** and select the ISO file for Windows 2008 R2 which we copied to the Library earlier.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb178.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image181.png)




After adding this, we can then click on **Next** to progress to the next stage as everything else in the hardware profile should be good.




On the **Guest Operating System** tab, we will just need to add the **Identity Information** which really is just what computer name we would like to set on this machine. If you recall we left this one as ***** when we created the Software Profile. When ready you can click on **Next**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb179.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image182.png)




On the **Select Destination** page, we get to choose the option **Place the virtual machine on a host.**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb180.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image183.png)




We now get to decide which host to place our Virtual Machine. This is quite similar to the view we got to observe when we tested moving virtual machines earlier. Following the intelligence SCVMM has gathered, the star rating is used determine the most suitable host for the Virtual Machine. I am going to access the recommendation and click on **Next**.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb181.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image184.png)




We are now asked to confirm the path where we will be storing the Virtual Machines. I am keeping with the recommendation, which is the path to our CSV Volume




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb182.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image185.png)




Getting close, we now need to **Select Network** for the virtual machine. If all the work we have done so far on networks has worked, we should see that SCVMM has automatically selected the correct virtual network for us.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb183.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image186.png)




We are now asked if there is any **additional properties** which we would like to define for the Virtual Machine. I am not fussy here, so the defaults will do just fine




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb184.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image187.png)




Finally, we are presented with the confirmation S**ummary**. Everything looks good, so I am going to click on **Create** and allow the process to begin.




At this point the **Jobs** window will popup to let us know how the task is progressing, and we get to wait for SCVMM to do its magic.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb185.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image188.png)




We can keep an eye on the job also if we click on the Virtual Machine in the VM list and look at the progress of the tab for Latest Job




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb186.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image189.png)




After a few minutes the Virtual machine will be ready, and we can connect to its console to see the Windows Installation Started and waiting for us.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb187.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image190.png)




I am not going to guide you trough the steps of installing windows here, after you have the windows installation done we will check back in again to see the result.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb188.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image191.png)




Now that we have the Operating System installed on the virtual machine, and applied any customisation work, such as disabling firewalls, enabled Remote Desktop etc, we are now ready to progress.




## Create a Template form our VM




We can now shutdown the Virtual Machine, and right click on the machine to view its context menu. From here I am going to select to create a Template from this customised Virtual machine




From the **Actions** menu I am now going to select the option **New virtual machine**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb189.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image192.png)




After selecting this option, SCVMM responds with an important message, asking if i am really sure i want to proceed as this will destroy the source Virtual Machine I am about to convert to a template. If you want cloning is an option for you.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb190.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image193.png)




Of course we know what we are doing, so lets click on **Yes** and we can get the wizard up and we can provide the guidance


<table cellpadding="0" width="400" border="0" cellspacing="0" >
<tbody >
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb191.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image194.png)
</td>

<td width="200" valign="top" >By now we are getting accustomed to this wizard, I am going to call this template **Deploy – Windows 2008 R2 Ent**
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb192.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image195.png)
</td>

<td width="200" valign="top" >We don’t need to make any modifications to the Hardware profile
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb193.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image196.png)
</td>

<td width="200" valign="top" >And we can also accept the Software profile that's suggested
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb194.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image197.png)
</td>

<td width="200" valign="top" >Now, this one is new, We are asked which Library Server we would like to use. So far we have been accessing resources from the Library, now we are going to store this new ‘Template Virtual Machine’ in the library for use anytime later
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb195.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image198.png)
</td>

<td width="200" valign="top" >We need to tell the wizard where we are storing our machine in the library. It is important also that you have enough storage space in the library to store this new template, otherwise we will be presented with an error later in the process
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb196.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image199.png)
</td>

<td width="200" valign="top" >And finally we can review the summary, before we click on **Create** to start the job
</td></tr></tbody></table>





At the end of the Wizard, we again get to see the **Jobs** window appear as the Virtual Machine is prepared and after running a Sysprep the Virtual Machine is then stored in the library




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb197.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image200.png)




## Deploy VM Using the Template




And now we are ready, We have a Virtual Machine which has been customised, and converted into a template and ready for deployment. This we can now consider as our Gold Master.


<table cellpadding="0" width="400" border="0" cellspacing="0" >
<tbody >
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb198.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image201.png)
</td>

<td width="200" valign="top" >So, Once again back in the **New Virtual Machine **Wizard, we are going to be selecting the template we just created from our reference virtual machine
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb199.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image202.png)
</td>

<td width="200" valign="top" >The new Virtual Machine will need a Name, I am going to create our System Centre Operations Manager Node, which we will need in the LAB, so I am calling this Virtual Machine **LAB-SCOM**
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb200.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image203.png)
</td>

<td width="200" valign="top" >You can now check that the hardware has all the correct details for our new machine, the defaults will still be our standard configuration information
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb201.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image204.png)
</td>

<td width="200" valign="top" >In the **Guest Operation System** page, I will now replicate the **Computer Name** with the new name for this node – **LAB-SCOM**
</td></tr>
<tr >

<td width="200" valign="top" >[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb202.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image205.png)
</td>

<td width="200" valign="top" >And the the rest of the wizard is the same as before, selecting the Host which will be used, confirming the network, and starting off the process.
</td></tr></tbody></table>


Again, we will be presented with the **Jobs** window so we can watch the process as the Template is copied from the Library, and deployed to the Host Machine, then started up for customisation, the whole process will take about 15 minutes.




Once the Job has completed we will see each of the stages in the process have completed and we are then able to see the Virtual Machine in the list of Available VMs.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb248.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image250.png)




If you did not select **Start the Virtual Machine** during the wizards last steps, we can do that now, and our new node should boot up, and be registered as a member on our domain, based on the information we stored in the **Guest Operating System** profile




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb249.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image251.png)




# Congratulations




This process was fairly long, but if you followed trough you now have a working SCVMM environment which we can use as a basis for all the rest of the processes.




The next stage I will present will be the installation of System Centre Operations Manager, so take a well deserved break and check back again soon
