---
author: Damian.Flynn
comments: true
publishDate: 2012-07-17 23:05:00+00:00
template: post.hbt
slug: hyper-v-virtual-f5-load-balancer
title: Hyper-V - Virtual F5 Load Balancer
wordpress_id: 516
categories:
- Blog
tags:
- F5
- Hyper-V
- WS/SC
---

As the scenarios of what I need to test before moving solutions into production get more complex, I often find that not having my Lab match the production environment can result in undesirable results; most of which are always associated with either firewall rules or a load balancer configuration.

So, today I am going to address this by taking advantage of the F5 BigIP virtual load balancer which works quite nicely with Hyper-V (including 2012!). In this post I will cover the main steps required to install and get the virtual device online ready for some real work.

Now, it is important to know that before you start you will need an account on DevCentral which is the F5 community area, so that you can access and download the appliance; and also you will need to contact F5 to get an evaluation key; they are quite helpful guys so you will not have a problem here.

There are a few steps to this exercise, so why wait

  * Download the Virtual Edition of the F5 Big-IP 
  * Configure Hyper-V to host the new appliance 
  * Configure the new Appliance with a IP address to get it online 
  * Activate your F5 Big-IP virtual Appliance.

## Download the Virtual Edition F5  


Surf over to the F5 Download site.

  * If you have an account, proceed to Login, otherwise you will need to register a free account first.   

  * After Logging in you will be presented with the **Downloads Overview **page, click on **Find a Download**  


[![071712_2125_HyperVVirtu114](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu114_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu114.png)

  * On the **Select a Product Line **page, select the option **BIG-IP v11.x / Virtual Edition **C  


[![071712_2125_HyperVVirtu214](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu214_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu214.png)

  * On the **Select a Production Version and Container for _BIP-IP v11.x / Virtual Edition _**page, select **Virtual-Edition **from the list  


[![071712_2125_HyperVVirtu38](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu38_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu38.png)

  * On the **Software Terms and Conditions** page, review the license and once ready click **I Agree**  


[![071712_2125_HyperVVirtu43](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu43_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu43.png)

  * Finally, the **Select a Download **page will be presented, on the page select the option **BIGIP-11.2.0.2446.0.vhd.zip** from the list  


[![071712_2125_HyperVVirtu53](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu53_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu53.png)

  * And now, you finally get to download the Virtual Hard disk, by choosing the download method which is most suitable for you.  


[![071712_2125_HyperVVirtu63](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu63_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu63.png)

  * After downloading the file, you can Unzip its contents and place the VHD ready for the Virtual Machine we will create  


## Configure Hyper-V to Host the Appliance  


With the VHD at hand, we can now create the Virtual Machine for our appliance. I am going to use Windows 2012 as my Hyper-V host for the Appliance.

We will be adding 3 Network interfaces to our Virtual Machine, which will be utilized as follows:

  1. **Management Network** a management network in your environment, for example your management network maybe referred to as **Core** or **Management**.  


  2. **Internal Network** a non-management network, examples include names like **Private**.  


  3. **External Network** the external network in your environment, which may be referred to as **Public**.  


Launch the Hyper-V manager and select the option **New Virtual Machine **wizard

  * On the **Before You Begin **page just click on **Next**  


[![071712_2125_HyperVVirtu73](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu73_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu73.png)

  * On the **Specify Name and Location **page, provide the Virtual Machine **Name **in the text box enter F5BIGIP01 as the VM Name, for example. Then click **Next**  


[![071712_2125_HyperVVirtu83](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu83_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu83.png)

  * On the **Assign Memory **page, enter **4096** in the **Startup memory **text box, then click **Next**  


[![071712_2125_HyperVVirtu93](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu93_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu93.png)

  * On the **Configure Netwotking **page, leave the **Connection** and **Not Connected **and then click on **Next**. We will add 3 Network interfaces after completing the wizard.  


[![071712_2125_HyperVVirtu103](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu103_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu103.png)

  * On the **Connect Virtual Hard Disk **page, select the radio option **User and existing virtual hard disk **and then click on **Browse… **to select the **VHD **which we downloaded from F5 in the previous step. Then click on **Next**  


[![071712_2125_HyperVVirtu115](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu115_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu115.png)

  * Finally on the **Completing the New Virtual Machine Wizard **page, review the summary and Click on **Finish **to create the Virtual Machine

  * [![071712_2125_HyperVVirtu123](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu123_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu123.png)   


Back on Hyper-V Manager Console, right click on the newly created Virtual Machine and select **Properties **from the context menu.

  * On the **Settings for F5BIGIP01 **virtual machine, select the **Add Hardware **item from the List box.   

  * The **Add Hardware** page will be presented, in the **Select the device you want to add **list box, select the option **Legacy Network Adapter **and click **Add**  


[![071712_2125_HyperVVirtu133](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu133_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu133.png)

  * The **Legacy Network Adapter **page will be presented, on this page select the **Virtual switch **from the drop down, and if necessary enable any VLAN ID you may be passing through. The VLAN or Switch you select on this page should represent one of the 3 networks which you are currently defining this interface for. – In my example this is my First interface, which is for Device Management, and I am placing it in VLAN50 which is my Management devices network. Click **Apply** once configured  


[![071712_2125_HyperVVirtu143](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu143_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu143.png)

  * Repeat this process for at least 2 additional Legacy Network adapters, which your F5 will utilize.   


## Configure the Appliance first run  


Now we have configured the Virtual Machine, it's time to start the Appliance and configure it.

In the Hyper-V console, select our F5 BIG-IP Virtual Machine

  * On the Actions list for the **F5 BigIP **virtual machine, click on **Connect…**  


[![071712_2125_HyperVVirtu153](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu153_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu153.png)

  * Start the Virtual Appliance, and the initial Splash screen will be offered. You can hit Enter, or wait a few seconds for the OS to begin loading  


[![071712_2125_HyperVVirtu163](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu163_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu163.png)

  * After a few moments, you will be permitted to login.  

  * Use the default accounts as this is the first startup  


    * **Username**: root 
    * **Password**: default  

  * Once logged in, we will run **Config** to define the management IP of the device  


[![071712_2125_HyperVVirtu173](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu173_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu173.png)

  * The **Configuration Utility **welcome page will be presented, Hit Enter to proceed  


[![071712_2125_HyperVVirtu183](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu183_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu183.png)

  * The Current IP details will be presented, to set these as static addresses just Hit Enter to select the default option of No  


[![071712_2125_HyperVVirtu193](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu193_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu193.png)

  * Provide the IP address you wish to use and hit Enter  


[![071712_2125_HyperVVirtu203](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu203_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu203.png)

  * Next, provide the Mask you will be assigning  


[![071712_2125_HyperVVirtu215](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu215_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu215.png)

  * You are now asked if you would like to set a default gateway for the Management Network. Select Yes with the arrow keys and hit Enter  


[![071712_2125_HyperVVirtu223](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu223_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu223.png)

  * Assign the IP address of the gateway   


[![071712_2125_HyperVVirtu233](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu233_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu233.png)

  * Finally you are offered the opportunity to confirm the settings are correct, highlight Yes and hit Enter  


[![071712_2125_HyperVVirtu243](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu243_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu243.png)

  * The new address will be enabled and the device should be ready for managing.  


## Activate the Appliance  


At this point you should be able to connect to the https interface of the BIG-IP to license and configure the device. The web interface is SSL protected, so be sure to use **https://** to connect.

  * Pop open the browser, and in the address bar, you need to provide HTTPS:// along with the IP address of the management interface we configured earlier. In my case this is [HTTPS://172.16.172.21](HTTPS://172.16.172.21)  

  * On the form you need to provide the default credentials, as this is the first time we are connecting  


    * Username: **admin**
    * Password: **admin**  
[![071712_2125_HyperVVirtu253](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu253_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu253.png)

  * Login to the System  


    * After logging in you will be presented with the **Setup** wizard, where you simple click **Next**  


[![071712_2125_HyperVVirtu263](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu263_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu263.png)

  * The Setup Utility will offer the **License **Page**. **  


    * On the **General Properties **page, we are offered the option to License our new virtual appliance, click on **Activate**  


[![071712_2125_HyperVVirtu273](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu273_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu273.png)

    * The **General Properties **page will be presented. In the **Base**  
**Registration** text field enter your license key, and then click **Next**  


[![071712_2125_HyperVVirtu283](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu283_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu283.png)

    * The **General Properties **page will update  


      * **_Step 1: Dossier _**will be generated for you which needs to be provided to the F5 Licensing server.  

      * On **_Step 2: Licensing Server_  
**Click the link _"Click here to access F5 Licensing Server" _to be presented with a new page for the F5 Licensing Server  

      * On the **Activate F5 Product** page  


        * Paste your _Step 1: Dossier_ into the text box labeled **_Enter your dossier _**and click **Next**  
[![071712_2125_HyperVVirtu293](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu293_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu293.png)

        * Step 2 of the activation is then presented, where you just need to enable the **Check Box** associated with** "Ihave read and agree to the terms of this license"**  

        * Then click **Next**  
[![071712_2125_HyperVVirtu303](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu303_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu303.png)

        * Our new Licence manifest will be presented, which we can select and copy, to paste back on the F5 page   
[![071712_2125_HyperVVirtu313](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu313_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu313.png)

      * In the text box for **Step 3: License **paste the new manifest, then click on **Next**

      * **[![071712_2125_HyperVVirtu323](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu323_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu323.png)**  


    * The Appliance will then begin updating, and after a few moments will confirm the changes have being applied. You can then click on **Continue**  


[![071712_2125_HyperVVirtu333](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu333_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu333.png)

    * The **Resource Provisioning **page is offered where we can review the modules licensed and change activations. Click on **Next**  


[![071712_2125_HyperVVirtu343](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu343_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu343.png)

    * On the **Platform **page you can assign an IP Address, a Fully Qualified domain name, Time Zone and also reset the passwords on the **User Administration **section of the appliance  


[![071712_2125_HyperVVirtu353](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu353_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/071712_2125_HyperVVirtu353.png)

The device will now log you off, for the new password to take effect.

You are now ready to start configuring the device for some real work.
