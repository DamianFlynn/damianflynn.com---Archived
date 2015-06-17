---
author: Damian.Flynn
comments: true
publishDate: 2011-02-12 23:20:00+00:00
template: post.hbt
slug: ddlabcluster-the-vm-hosts
title: DDLAB–Cluster The VM Hosts
wordpress_id: 59
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

12And now we start to get into the fun stuff. As we progress tough this post we are going to ensure that both of the VM hosts actually have Hyper-V installed; after all this is an important component of the Dynamic Data Centre.

After we have installed and validated that we have indeed a good Hyper-V base, we are going to proceed and bring online our cluster and mount up our CSV Volume.

So there you have it, a lot of really cool stuff to sort out today. Time to get busy.

# Hyper-V

We need to get the Hyper-V Role installed on this server if it to be of any value in the lab; so lets do that first so we can be sure there are no hardware issues we need to panic over, and not waste time getting all the other parts together.
    
    Import-Module ServerManager
    
    Add-WindowsFeature Hyper-V
    
    Shutdown /r




After the server has rebooted, we should see the Hyper-V role listed in ServerManger and from the PowerShell we can confirm that all the service have indeed started up correctly
    
    Get-Service –DisplayName *Hyper*




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb33.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image37.png)




## Networking




Now before we progress into actually installing the cluster, we are going to take another look at the networks on these physical hosts. It is important that we understand how we plan to cable this up, as we will be assigning these interfaces over the course of this post.




Each of my nodes has 3 * 1Gb NIC’s; from this we have already been using the first NIC for both our normal ‘Management’ usage and also all our iSCSI Traffic, I Labelled this NIC as _‘Management and iSCSI’_ so that it is easy identify.




The remaining two interfaces will be used for the services






  * Cluster Heartbeat 


    * This will be a private link between both nodes; Running at a minimum of 1Gb as this interface will double up for the Migration of VMs from Node to Node 


  * Hyper-V VM Switch 


    * Connected back to our network switch, we will use this for the communications link from all our virtual machines. In a full deployment this might be a team of NIC, or even 10Gb interfaces; quite likely configured to use LACP so that we can pass tags of our VLAN trough to the Switch from the VM. 



Referring to the Physical Nodes table again, you will see that I only issued IP addresses for both the “Management and iSCSI” and “Cluster Heartbeat” interfaces.





<table cellpadding="0" border="1" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; border-left: #a3a3a3 1pt solid" cellspacing="0" >
<tbody >
<tr >

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

</td></tr>
<tr >

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

</td></tr></tbody></table>




But the “Hyper-V VM Switch” I assigned no information for, as this will be used to ‘Pass Trough’ network traffic from the VMs to the Switch, so I will unbind the host operating system form using this interface for IP traffic.




## Configure Hyper-V Switch




Now before we progress into actually installing the cluster, we are going to take another look at the networks on these physical hosts. It is important that we understand what we plan to cable this us, as we will be assigning these interfaces over the course of this post.




Each of my nodes has 3 * 1Gb NIC’s; from this we have already been using the first NIC for both our normal ‘Management’ usage and also all our iSCSI Traffic, I Labelled this NIC as _‘Management and iSCSI’_ so that it is easy identify.




The remaining two interfaces will be used for the services






  * Cluster Heartbeat 


    * This will be a private link between both nodes; Running at a minimum of 1Gb as this interface will double up for the Migration of VMs from Node to Node 


  * Hyper-V VM Switch 


    * Connected back to our network switch, we will use this for the communications link from all our virtual machines. In a full deployment this might be a team of NIC, or even 10Gb interfaces; quite likely configured to use LACP so that we can pass tags of our VLAN trough to the Switch from the VM. 



Referring to the Physical Nodes table again, you will see that I only issued IP addresses for both the “Management and iSCSI” and “Cluster Heartbeat” interfaces.





<table cellpadding="0" border="1" style="border-top: #a3a3a3 1pt solid; border-right: #a3a3a3 1pt solid; border-collapse: collapse; border-bottom: #a3a3a3 1pt solid; direction: ltr; border-left: #a3a3a3 1pt solid" cellspacing="0" >
<tbody >
<tr >

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

</td></tr>
<tr >

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

</td></tr></tbody></table>




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb75.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image91.png)




But the “Hyper-V VM Switch” I assigned no information for, as this will be used to ‘Pass Trough’ network traffic from the VMs to the Switch, so I will unbind the host operating system form using this interface for IP traffic.




## Configure Hyper-V Switch




Launch the Hyper-V manager, and from the console on the **Actions **menu we will click on the option **Virtual Network Manager…**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb76.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image92.png)




This will popup the **Virtual Network Manager. **On the right hand pane we have **Create virtual network **section, in the option list **What type of virtual network do you want to create?** we will highlight the option **External** and click on the button **Add.**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb77.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image93.png)




The interface will update on the right hand pane we now see **New Virtual Network **section






  * Name field we will type **VM Switch** 

  * Connection Type 


    * Select the External Adapter and chose the Network Interface which is to be used for the Hyper-V VM’s. We can identify the correct Interface by viewing adapter in **Control Panel Network and Internet Network Connections** 

    * In the **Allow management operating system to share the network adapter **we will clear the check box as we already have management traffic on an interface of its own. 



[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb78.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image94.png)




We can click on **OK** and we will then be presented with a warning that we will lose management access to the node. We will ignore this, since we know that we are not using this interface for management. Click on **Yes** to apply our changes.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb79.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image95.png)




Don’t forget we have 2 nodes, so be sure to repeat the process on the second server.




# Failover Clustering




Fantastic, that's the last of the main requirements in place. Let’s move on and start up with our clustering effort.




## Installing Failover Clustering




The Feature for Failover Clustering is not installed on our servers by default so we will just need to quickly add the feature from our PowerShell interface.
    
    Import-Module ServerManager
    
    Add-WindowsFeature Failover-Clustering




This should take only a few moments, and does not normally require a reboot.




## Create The Cluster




So, as soon as the Feature is in place, as we Find and Launch the “Failover Cluster Manager” Interface, and set about the process of Building the Cluster.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb49.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image58.png)




As this is a new cluster, we do not have a lot to see in the interface to begin with. If we focus on the **Actions** in the Right pane of the window we have an option to select called **Create a Cluster…** which will popup for us a new wizard to work with




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb50.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image59.png)




We can read trough the introduction text, and once you are happy _Click** **_on the **Next** button, which will get is started on the process.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb51.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image61.png)




On the **Select Servers **screen, we are asked to identify which servers we will be adding to create the cluster. So in this case we will simply enter the FQDN of the two VM hosts we are using to build the cluster – as a reminder those are **LAB-VM01-01.damainflynn.demo **and **LAB-VM01-02.damainflynn.demo. **After both have been added we can _Click_ on the **Next** button again




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb52.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image62.png)




The next step in the Wizard, is a Validation Warning, basically telling us that since this is a new configuration we really should run a validation on the two servers we are about to join into the cluster, so that we can be sure that the rest of the process should run pretty smooth.




I will agree with the Wizard, and allow it to Launch the Validation tools for us, as a good health check.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb53.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image63.png)




### Cluster Validation Wizard




The **Create Cluster Wizard** will now launch the **Cluster Validation Wizard** for us, presenting the welcome page so we can get an overview of the checks which will be executed.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb54.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image65.png)




After Clicking on **Next** we are asked if we would like to run all the tests or select some specific ones. I am going to run the full suite as its important that we check everything is good.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb55.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image66.png)




Next, we will be presented with the names of the servers which are going to be checked for us, and a list of the checks which will be carried out for us.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb56.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image67.png)




After clicking on **Next** the wizard will get down to work, the check will take a few minutes to complete, but you can watch it progress trough each one if you like.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb57.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image69.png)




After the work is complete, the wizard will then present the results, if we have any hope of reading this information we will click on the button **View Report**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb58.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image70.png)




Internet Explorer will then Launch and we can read trough the report to see if everything is good. If you have been following along then I don't expect you to have issues, but the report should be pretty clear about any issues it does find and how you might fix them




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb59.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image72.png)




I have a clean bill of health, so I will close the Browser, and the Configuration Wizard should now also be closed, so we can resume back where we left off on the **Create Cluster Wizard**




In the **Create Cluster Wizard** we now get to give the cluster and Name, and an IP address. For the lab we will be using the following






  * Cluster Name: **LAB-VM01** 

  * Cluster IP Address: **172.16.100.99**



** **




Lets add this information into the Wizards interface and we can then continue to the next stage.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb60.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image73.png)




The obligatory confirmation check is then presented so that we be sure we have selected the correct node, cluster name and the IP address.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb61.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image75.png)




Once you click on **Next **the wizard will start its work, creating the cluster for us. This will take a few minutes to complete.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb62.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image76.png)




After the wizard is done processing, we will be presented with the final summary which I expect should be a confirmation that **You have successfully completed the Create Cluster Wizard. **We can now click on **Finish** to return back to the **Failover Cluster Manager.**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb63.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image78.png)




Congratulations, nice work.




## Create the Quorum




Next step is to get the Quorum online. In the GUI we can now see the basic cluster services are online and ready. We will work from here to setup the Quorum first,




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb64.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image79.png)




Right Click on the Cluster Server Name **LAB-VM01.damianflynn.demo** and from the properties menu select **More Actions…** and then **Configure Cluster Quorum Settings…**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb65.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image81.png)




Guess What… Its a new Wizard, take a few moments to ready the introduction and when you are ready click on **Next**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb66.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image82.png)




On the next page we have to select how we would like the Quorum operate. There are a few options presented, but you will see from the Wizard the best solution for us is to select **Node and Disk Majority**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb67.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image83.png)




Now, we need to select the disk which we assigned for use as the Quorum by **Ticking** the Check box. Click **Next** once ready




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb80.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image96.png)




We are presented with a Confirmation view so we can double check everything as as we need. Click on **Next** to set the wizard to work.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb81.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image97.png)




The process should be pretty fast, and before we know we will be looking at the summary page.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb82.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image98.png)




After we click on Finish, the status will update to show we are now configured with **Node and Disk Majority ( using Cluster Disk 1)**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb83.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image99.png)




## 




## Create the Cluster Shared Volume




We are almost complete, the next step is to configure our **Cluster Shared Volumes (CSV).** We right click on the Cluster Server Name **LAB-VM01.damianflynn.demo** and from the properties menu select **Enable Cluster Shared Volumes…**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb84.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image100.png)




As this is our first time enabling Cluster Shared Volumes we will be presented with a notice. After reading this we can click on **I have read the above notice** and then click on **OK**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb85.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image101.png)




The **Failover Cluster Manager** will update and we will now see a new node in the left tree called **Cluster Shared Volumes. **We will Right Click on the node and select the option **Add Storage** from the context menu.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb86.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image102.png)




This will present us with a Dialogue offering the disk we have prepared for use as the CSV storage. We will select the disk by **Ticking** the Check box. Click **OK** once ready




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb87.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image103.png)




After the Dialogue closed, the Cluster Manager will process the Add Storage request




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb88.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image104.png)




After a few moments we will get confirmed that the CSV Volume is now Online, and we can see that the storage is mapped to **C:CusterStorageVolume1** and ready for our Usage.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb89.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image105.png)




Fantastic stuff, we have completed the build of our cluster, and successfully create a Cluster Shared Volume for hosting our Virtual Machines.




# Hyper-V Testing




We have done well today, but if your like me, you are curious to see how this works, I will create a VM on the cluster to validate everything works and prove that we can indeed Live Migrate between the nodes.




## Create a Virtual Machine




To do this, We right click on the **Services and applications** node, from the context menu, select **Virtual Machines… **then select **New Virtual Machine…** and finally we will select either of our two nodes **LAB-VM01-01 **or **LAB-VM01-02**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb90.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image106.png)




This will launch the **New Virtual Machine Wizard** for us, after reading the first page we will click on **Next**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb91.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image107.png)




On the next page we will provide a name for the Virtual Machine, I am going to create one of the next nodes we will be using shortly in the LAB, which will the SCVMM installation. In the Name field we will enter in this case **LAB-SCVMM** and in the location we will be using our Cluster Storage Volume, so I will browse to **C:ClusterStroageVolume1**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb92.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image108.png)




Next we have to assign the RAM we will use on the VM, and click on **Next**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb93.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image109.png)




The Configure Networking page has a drop down, where we can select the **VM Switch** we created earlier in **Hyper-V Manager**, and then click on **Next**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb94.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image110.png)




On the Connect Virtual Hard Disk page we get to define, or used the suggested Virtual Hard Disk information.






  * Name – **LAB-SCVMM.vhd** 

  * Location – **C:ClusterStorageVolume1LAB-SCVMM** 

  * Size – **35 GB**



** **




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb95.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image111.png)




We now get the opportunity to select if we want to install an operating system. I am going to provide the ISO file for Windows 2008 R2 which I will need on my SCVMM Server




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb96.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image112.png)




Finally, we will get a Summary screen to check our choices, and then we can click on **Finish** to create the Virtual Machine.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb97.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image113.png)




The Wizard will now start processing the request




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb98.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image114.png)




And pretty quickly we will see the **Virtual Machine** creation summary




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb99.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image115.png)




After we click on **Finish** we will see the Virtual Machine in the **Services and applications** list.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb100.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image116.png)




## Start the Virtual Machine




We will start up the Virtual Machine and install Windows on the node




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb101.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image117.png)




We will then see the server update, to confirm that it is trying to start and finally go Online.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb102.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image118.png)




If we right click on the Name of the VM, we can select to open the console, and we should now see the Windows Installer loaded from our setup ISO file.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb103.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image119.png)




## Migration




We can now also test that the Live Migration function works. Again highlight the name of the Virtual Machine, and this time select the option **Live migrate virtual machine to another node** and then select the other node in our cluster




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb104.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image120.png)




Assuming we have no problems, we should now set the status change to let us know that the VM is Migrating




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb105.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image121.png)




And a few seconds later we should see the Status return to **Online** but the Current Owner will have changed to the other node in our Cluster




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image_thumb106.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/02/image122.png)




# Wrap Up




Well, you should congratulate yourself if you have made it to this point and everything is working. you have all the main foundations in place to virtualisation. In the next few posts we will deploy some of the Microsoft Management tool suites which make up part of System Centre and permit us to move from a Virtualised Data Centre to a Dynamic Data Centre.
