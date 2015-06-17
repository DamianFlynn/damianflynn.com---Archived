---
author: Damian.Flynn
comments: true
publishDate: 2012-05-16 22:27:00+00:00
template: post.hbt
slug: cspp-2012-rtm-deployment
title: CSPP 2012 RTM Deployment
wordpress_id: 430
categories:
- Blog
tags:
- Cloud
- CSPP
- SCSM
- SCVMM
- WS/SC
---

Deploying the Private Cloud process pack requires a number of pre-requisites to be in place and fully working.

In this LONG post I will cover all the key points, but I will assume that you have already deployed working services for Operations Manager, Virtual Machine Manager, Orchestrator and Service Manager; if so, then grab the download for the RTM of the Cloud Services Process pack, and follow along as we get this deployed

The steps we will covered are:

  * VMM and SCOM Pro Integration  
  * Service Manager Management Packs  
  * Service Manager Connectors  
  * Cloud Services Runbooks for Orchestrator  
  * Cloud Service Process Pack installation 

Sounds simple right… let’s see if you can keep up 

# Virtual Machine Manager Connectors

VMM and SCOM support a rich integration environment, which permits what is know as PRO Tips to be activated. In order to enable these services a number of tasks need to be first completed

  * Install Operations Manager Console on Virtual Machine Manager Server (or Servers, if you have a VMM farm)  
  * Accounts  
    * Member of the SCOM Administrators Role  
    * Member of the VMM Administrator Role 
  * Operations Manager Management Packs  
    * SQL Server Core Library  
    * Windows Server Internet Information Services Library  
    * Windows Server Internet Information Services 2003  
    * Windows Server 2008 Internet Information Services 7 

Additionally, we will make the Assumptions that you have already a fully working SCVMM and SCOM environment with agents deployed to the respective server.

At a minimum you must have a working SCOM agent deployed to each of your active SCVMM servers.

## PRO Integration Account and Group

Before we start off with configuring the integration, I am going to assume we will use the SCVMM Service account for the Integration. SCOM really prefers we use Groups rather then User accounts for its role membership so we will create a Security Group for the Integration, and add this service account as its member

  * In **Active Directory Users and Computers**, Create a **New Group**  
  * In the **New Object – Group** Dialog provide the following details  
    * **_Group Name_** – SCVMM PRO Integration  
    * **_Group Scope _**– Universal  
    * **_Group Type_** – Security 
  * Click **OK** to create the group  
  * Double Click the new group **SCVMM PRO Integration** to open its properties page  
    * Click on the **Members **tab  
    * Click on the **Add** button, to display the **Select Users, Contacts, Computers, Service Accounts or Groups** Dialog  
      * Type the name of the Integration account which in our scenario will be the SCVMM Service Account, in the **Enter the object names to select** text box as **svc SCVMM **and then click **OK**
    * The account should now be listed in the members list, click **OK** to close the properties window 

## Installing the Operations Manager Console

On the VMM system we will first install the Operations Manager Console

  * Launch the Installation Wizard for Operations Manager 2012, and select **Install**  
  * The **Operations Manager Setup** wizard will appear  
  * On the **Select Features to Install** page, select the option **Operations Console** and click on **Next**  
  * On the **Select Installation Location**, the default should be fine, just click on **Next**  
  * If there are any missing dependencies, these should be resolved before progressing  
  * You are offered to participate in the feedback program, i generally opt in on these  
  * On the **Summary** page, you can review the options and click **Next**  
  * The setup will then complete we can click on **Close** to complete the installation.  
  * By Default the Operations manager console will then try to launch, and you can select you Operations Manager server to verify the connections work. 

## Operations Manager Management Packs

For the integration to work, we also must import a number of Management Packs into the environment

  * Launch the **Operations Manager console**, in the **Administration View**, select **Management Packs**  
  * On the **Tasks** pane, select **Import Management Packs...**  
  * The **Import Management Packs** wizard appears  
  * To Import a management pack click on **Add**, and select **Add from catalog…**  
  * The connecting dialog will appear for a moment while it connects to Microsoft  
  * The **Select Management Packs from Catalog** dialog will appear  
    * We will Search for the _SQL Server Core Library Management_ Pack  
      * In the **Find** text box, enter** SQL Server Core Library**, and click **Search**  
      * The Management packs in the catalog list box should populate with matching packs  
      * Expand the results and locate the relevant pack, in this case select **Microsoft Corporation –> SQL Server –> SQL Server 2008 –> SQL Server Core Library**  
      * Click on the** Add** button to add the management pack to the **Selected management packs** list 
    * We will Search for the _Windows Server Internet Information Services_ Pack  
      * In the **Find** text box, enter** Windows Server Internet Information Services**, and click **Search**  
      * The Management packs in the catalog list box should populate with matching packs  
      * Expand the results and locate the relevant pack, in this case select **Microsoft Corporation –> Windows Server –> IIS 2003 –> Windows Server Internet Information Services 2003** and click on **Add**  
      * Repeat, and locate the second pack, in this case select **Microsoft Corporation –> Windows Server –> IIS 2003 –> Windows Server Internet Information Services Library** and click on **Add**
    * We will Search for the _Windows Server 2008 Internet Information Services_ Pack  
      * In the **Find** text box, enter** Windows Server 2008 Internet Information Services**, and click **Search**  
      * The Management packs in the catalog list box should populate with matching packs  
      * Expand the results and locate the relevant pack, in this case select **Microsoft Corporation –> Windows Server –> IIS 2008 –> Windows Server 20008 Internet Information Services 7** and click on **Add**  
      * Click on the** Add** button to add the management pack to the **Selected management packs** list 
    * [![image_thumb14](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb14_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb141.png)  
    * Click on **OK** to return to the Import Management Packs page 
  * The import list will now display the selected Management Packs we plan to install  
  * If the wizard detects issues these will be presented, with a link to Resolve in the status column  
  * [![image_thumb15](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb15_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb151.png)  
  * Clicking on** Resolve**, Presents the **Dependency Warning** dialog  
    * The missing packs will be listed in the Dialog.  
    * [![image_thumb16](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb16_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb161.png)  
    * Click on **Resolve** to have the missing packs added to the Import list and clearing the problem 
  * With all the required packs listed in the Import List, click in the **Install** button  
  * The packs will be now downloaded from the Microsoft Catalog, queued up, and finally Imported.  
  * Once complete click on **Close**  

## PRO Integration Account for Operations Manager

Starting in Operations Manager, we will add the new Security group we will use for PRO integration as a SCOM administrator

  * Launch the **Operations Manager console**, in the **Administration View**, select **Security –> User Roles**  
  * In the **User Roles** list, expand the **Profile: Administrator** and select **Operations Manager Administrators**  
  * On the **Tasks** pane, select **Properties...**  
  * On the **Operations Manager Administrators – User Role Properties**, in the **User role members** list, click on** Add..** to display the **Select Group** Dialog  
    * In the **Enter the object name to select** text box, enter the group we created earlier **SCVMM PRO Integration**, and then click **OK**
  * The User Role Members list will update with the new member presented, click on **OK** to save the change  
  * [![image_thumb17](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb17_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb17.png)  

## PRO Integration Account for Virtual Machine Manager

We don't have to do anything else here, as we have already chosen to use the SCVMM Administrator account for the integration, we can see that this account already Administrator Role access in SCVMM by default.

If you are curious

  * Launch the **Virtual Machine Manager console**, in the **Administration View**, select **Security –> User Roles**  
  * In the **User Roles** list, double click the **Administrator** role to present its properties  
  * On the **Members** page, the **Members** list will present the current accounts with privileges  
  * [![image_thumb18](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb18_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb18.png)

## Enable SCVMM PRO Integration

We now should have all the main pre-requisites in place to allow us to enable the Pro Integration. At this stage lets proceed and configure this service in SCVMM

  * Launch the **Virtual Machine Manager console**, in the **Administration View**, select **System Centre Settings –> Operations Manager Server**  
  * In the **Add Operations Manager** wizard, review the **Introduction** page and click **Next** when ready  
  * On the **Configure connection for VMM to Operations Manager** page we can now configure the integration  
    * In the **Server Name** text box enter the name of your SCOM server, e.g. **SCOM2012.diginerve.net**  
    * Then check that we have **enabled** the option **Use the VMM server service account**  
    * Also** Enable** the option **Enable Performance and Resource Optimization**  
    * And **Enable** the option **Enable maintenance mode integration with Operations Manager**
  * [![image_thumb19](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb19_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb19.png)  
  * On the **Configure connection from Operations Manager to VMM** page we will create the return connection  
    * In the **User name** text box, enter the SCVMM Service account name which we decided to use, e.g. **diginervesvcSCVMM**  
    * In the **Password** text box, you know what to do! 
  * [![image_thumb20](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb20_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb20.png)  
  * On the **Confirm the settings** page, you can review the options and then click **Finish**  
  * If you select the Virtual Machine Manger Jobs View, you can monitor the progress of the new connection being created 

## Verify SCVMM PRO Integration

Finally, lets check that the integration is now configured and working correctly.

  * Launch the **Virtual Machine Manager console**, in the **Administration View**, select **System Centre Settings –> Operations Manager Server**  
  * The **Operations Manager Setting** dialog is then presented, on the **Details** page, we can see the current **Connection Status** which should be **OK**
  * [![image_thumb21](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb21_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb211.png)
  * On the Management Packs page we s hould also be offered the list which is currently imported into VMM  
  * [![image_thumb22](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb22_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb221.png)  
  * To test the integration is working correctly, you can click the option **Test PRO**, using the Jobs view we can verify the integration is functioning correctly. 

# Service Manager Management Packs

On of the requirements of the Cloud Service Process pack is that the CMDB in SCCM has support for Cloud resources, this is accomplished by adding the correct classes to the CMDB. the process for this is very simple, we just need to import the Management packs which have the definitions for the the relevant classes. These are exactly the same Management Packs we import into SCOM, just that Service Manager uses them for slightly different purposes. The Management packs we are interested in are supplied now with the Cloud Service Process pack, so we just have to manually import them

  * In the **Service Manager Console**, under the **Administrator** View, Select the** Management Packs** branch.  
  * In the **Tasks** menu, select the option **Import**  
  * The **Select Management Pack to Import **dialog will be offered, Navigate to the **Cloud Services Process Pack **installation media, and open the folder **ManagementPacks**, and select the filter to **MP Files (*.mp)**  
    * In sequence you need to repeat this process for each Management Pack, until you have all 13 imported  
      * _Microsoft.SystemCenter.DataWarehouse.Library.mp_  
      * _Microsoft.Windows.InternetInformationServices.CommonLibrary.mp_  
      * _Microsoft.SystemCenter.DataWarehouse.Report.Library.mp_  
      * _Microsoft.Windows.InternetInformationServices.2003_  
      * _Microsoft.Windows.Server.Library.mp_  
      * _Microsoft.Windows.Server.2008.Discovery.mp_  
      * _Microsoft.Windows.InternetInformationServices.2008.mp_  
      * _Microsoft.SQLServer.Library.mp_  
      * _System.Virtualization.Library.mp_  
      * _Microsoft.SystemCenter.VirtualMachineManager.Library.mp_  
      * _Microsoft.SystemCenter.VirtualMachineManager.PRO.2008.Library.mp_  
      * _Microsoft.SystemCenter.VirtualMachineManager.PRO.Library.mp_  
      * _Microsoft.SystemCenter.VirtualMachineManager.PRO.V2.Library.mp_  
      * _Microsoft.SystemCenter.VirtualMachineManager.2012.Discovery.mp_
    * Select the Management pack and click **Open**  
    * The **Import Management Packs** Dialog will now appear, with your selected Management pack listed in the Management Pack List.  
    * Click on **Import,** and after a few moments the management pack details will update to confirm the management pack was imported  
    * Highlight the current Management Pack in the Management Pack List, and click **Remove**  
    * Next Click on **Add **to be returned to the Select Management Pack to Import Dialog again – Select the next MP in the sequence and repeat until all MPs have being imported 

# Service Manager Connectors

In the SCSM console, we will create the necessary connectors to get the Process pack installed and working, this will take a little time, and of course we need to already have the systems we plan to connect with already deployed and running the RTM version for the System Canter 2012 suite.

[![image_thumb23](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb23_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb231.png)

## Orchestrator

The first, connector I will create is to Orchestrator, this connector will be used to retrieve the list of checked in Runbook’s which are on the server and available for use to our SCSM environment. For the Cloud Services Process Pack, we will be deploying some new Runbook’s specifically for the job at hand as part of the installation. For now, we will focus on getting the connector up and running, and later we will deploy those new Runbook’s, and ensure that they are ready for use.

  * In the **Service Manager Console**, under the **Administrator** View, Select the** Connectors** branch.  
  * In the **Tasks** menu, select the option **Create Connector** and from the pop out menu choose **Orchestrator Connector **
  * The **Orchestrator Connector Wizard** will be presented, we can ready the** Before You Begin** page and click **Next**  
    * On the **General Page** we will provide a quick overview  
      * In the **Name** text box, enter **Orchestrator Connector**  
      * In the **Description** text box, enter **Connector from SCSM to SCO using the ODATA interface of SCO 2012 **
      * **Enable** to the check box **Enable this connector**  
      * [![image_thumb24](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb24_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb241.png)
    * On the** Connection** page we will provide details for the ODATA service  
      * In the **Orchestrator Web Service URL** text box enter the URL, e.g. [**http://scorch2012:81/orchestrator2012/Orchestrator.svc/**](http://scorch2012:81/orchestrator2012/Orchestrator.svc/)  
      * For the **Run As Account**, I will create a new one that has permissions to the web service, Click on the **New…** button to launch the Run As Account Dialog  
        * In the **Display Name** text box enter **SC Orchestrator Integration Access**  
        * In the Description text box enter Account** with permissions to Orchestrator Runbook for SM integration**  
        * The **Management pack** can not be changed  
        * In the **Account** Drop down, the default **Windows Account** is perfect  
        * In the **User name** text box enter the name of the account which has access, e.g. _svcSCOrch2012_  
        * in the **Password** text box enter the password for the account  
        * In the **Domain** drop down select the relevant domain  
        * [![image_thumb25](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb25_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb251.png)
      * In the **Run As Account** drop down, our new account should be listed **SC Orchestrator Integration Access**  
      * Click on the **Test Connection **button, to have SCSM try to access the SCO interface, you should get a popup confirming the connection.  
      * [![image_thumb26](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb26_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb26.png)
    * On the **Sync Folder** Page  
      * On the **Select Sync Folder** tree, the **Root branch** is selected, as I am not sure where the new Runbook’s will appear, I just accept the default for now, we can come back at another time and scope this differently.  
      * [![image_thumb27](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb27_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb27.png)
    * On the **Web Console** Page  
      * In the **URL** text box, enter the address of the web console, for example **http:\scorch2012**  
      * [![image_thumb28](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb28_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb28.png)
    * On the **Summary** page  
      * Review that all looks as expected  
      * Finish up the wizard to have the new connector online  
      * [![image_thumb29](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb29_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb29.png)

## Virtual Machine Manager

Next connector is the VMM Connection, this will allow us to sync the Clouds, Networks and other VMM resources into the Service Manager CMDB.

  * In the **Service Manager Console**, under the **Administrator** View, Select the** Connectors** branch.  
  * In the **Tasks** menu, select the option **Create Connector** and from the pop out menu choose **Virtual Machine Manager Connector **
  * The **Virtual Machine Manager Connector Wizard** will be presented, we can ready the** Before You Begin** page and click **Next**  
    * On the **General Page** we will provide a quick overview  
      * In the **Name** text box, enter **Virtual Machine Manager Connector**  
      * In the **Description** text box, enter **Connector from SCSM to VMM 2012 **
      * **Enable** to the check box **Enable this connector**  
      * [![image_thumb30](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb30_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb30.png)
    * On the** Connection** page we will provide details for the VMM service  
      * In the **Server Name** text box enter the name of the VMM service, e.g. **scvmm2012.diginerve.net**  
      * For the **Run As Account**, I will create a new one that has permissions to the web service, Click on the **New…** button to launch the Run As Account Dialog  
        * In the **Display Name** text box enter **SC Virtual Machine Manager Integration Access**  
        * In the Description text box enter **Account with permissions to Virtual Machine Manager for SM integration**  
        * The **Management pack** can not be changed  
        * In the **Account** Drop down, the default **Windows Account** is perfect  
        * In the **User name** text box enter the name of the account which has access, e.g. _svcSCVMM_  
        * in the **Password** text box enter the password for the account  
        * In the **Domain** drop down select the relevant domain  
        * [![image_thumb31](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb31_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb311.png)
      * In the **Run As Account** drop down, our new account should be listed **SC Virtual Machine Manager Integration Access**  
      * Click on the **Test Connection **button, to have SCSM try to access the SCVMM interface, you should get a popup confirming the connection.  
      * [![image_thumb32](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb32_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb321.png)
    * On the **Summary** page  
      * Review that all looks as expected  
      * Finish up the wizard to have the new connector online  
      * [![image_thumb33](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb33_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb331.png)

## Operations Machine Manager

Next connector is the Operations Manager Connection, this will allow us to sync the Virtual Machines, and Distributed Applications resources into the Service Manager CMDB.

  * In the **Service Manager Console**, under the **Administrator** View, Select the** Connectors** branch.  
  * In the **Tasks** menu, select the option **Create Connector** and from the pop out menu choose **Operations Manager Connector **
  * The **Operations Manager CI Connector Wizard** will be presented, we can ready the** Before You Begin** page and click **Next**  
    * On the **General Page** we will provide a quick overview  
      * In the **Name** text box, enter **Operations Manager Manager CI Connector**  
      * In the **Description** text box, enter **Connector from SCSM to SCOM 2012 for Configuration Items**  
      * **Enable** to the check box **Enable this connector**  
      * [![image_thumb34](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb34_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb341.png)
    * On the** Connection** page we will provide details for the VMM service  
      * In the **Server Name** text box enter the name of the VMM service, e.g. **scom2012.diginerve.net**  
      * For the **Run As Account**, I will create a new one that has permissions to the web service, Click on the **New…** button to launch the Run As Account Dialog  
        * In the **Display Name** text box enter **SC Operations Manager Integration Access**  
        * In the Description text box enter **Account with permissions to Operations Manager for SM integration**  
        * The **Management pack** can not be changed  
        * In the **Account** Drop down, the default **Windows Account** is perfect  
        * In the **User name** text box enter the name of the account which has access, e.g. the account we created for PRO integration a little earlier _svcSCVMMpro_  
        * in the **Password** text box enter the password for the account  
        * In the **Domain** drop down select the relevant domain  
        * [![image_thumb35](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb35_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb351.png)
      * In the **Run As Account** drop down, our new account should be listed **SC Virtual Machine Manager Integration Access**  
      * Click on the **Test Connection **button, to have SCSM try to access the SCVMM interface, you should get a popup confirming the connection.  
      * [![image_thumb36](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb36_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb361.png)
    * On the **Management Packs** page,  
      * **Enable** the Check box Select **ALL**.  
      * Ensure that in this list you can see the management pack **Microsoft.SystemCenter.VirtualMachineManager.2012.Discovery**, this will only be presented if you have it imported into both SCOM and SCSM; which if you have being following the steps will be the case  
      * [![image_thumb37](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb37_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb37.png)
    * On the **Schedule** page  
      * Set a **Synchronize** time which is suitable for your installation, for example I am selecting **5am**  
      * [![image_thumb38](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb38_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb38.png)
    * On the **Summary** page  
      * Review that all looks as expected  
      * Finish up the wizard to have the new connector online  
      * [![image_thumb39](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb39_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb39.png)

# Cloud Service Runbook’s

We can now proceed to import the Cloud Service Runbooks, I normally run this part of the setup on the Orchestrator Server.

**Before you start** – Be 100% sure that you have already installed the SERVICE MANAGER 2010 Integration pack _(and no that is not a Typo, even though we are working with Service Manager 2012, this pack is still using the older 2010 Integrations!! The installation will work, but the activities will not if you do not have this pack installed.)_

  * From the installation media, launch the **Setup.exe** tool, which will offer the options splash screen, Choose **Cloud Services Runbooks**  
  * [![image_thumb40](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb40_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb40.png)  
  * On the **Product Registration** page, provide the normal details and **Accept the agreement**  
  * [![image_thumb41](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb41_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb411.png)  
  * On the **System Check Results** page, we are expecting everything to be good  
  * [![image_thumb42](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb42_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb421.png)  
  * On the **Configuration System Center Orchestrator account and Database** Page  
    * Supply the Orchestrator Account which has privileges to create Runbook’s and then use the Test Credentials button to validate it works  
    * Identify the Orchestrator Database server, its instance and Database name 
  * [![image_thumb43](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb43_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb431.png)
  * On the **Co nfigure the System Center Orchestrator Connections** page  
    * We need to provide the name of the **SCSM connection name** we created to Orchestrator earlier, for example **Orchestrator Connector**
  * [![image_thumb44](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb44_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb44.png)  
  * The **Installation Summary** page will then be presented, Review the settings, and then Click **Install**  
  * [![image_thumb45](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb45_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb45.png)  
  * After a few moments, the **Setup Completed successfully** page should be presented, and we can click **Close** to finish the process  
  * [![image_thumb46](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb46_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb46.png)

If you are curious, you can now run the Orchestrator Runbook Designer, and once connected, you should see the new Runbooks which were just created.

[![image_thumb47](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb47_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb47.png)

# Cloud Service Process Pack

Finally, lets install the pack, as we should have all the base requirements now in place, lets add the features to Service Manager 2012

  * From the installation media, launch the **Setup.exe** tool, which will offer the options splash screen, Choose **Cloud Services Process Pack**  
  * [![image_thumb48](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb48_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb48.png)  
  * The** System Check Results** page should be all green assuming we have done all the work correctly  
  * [![image_thumb49](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb49_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb49.png)  
  * As there are no additional configurations required, review the **Installation Summary** page, and click **Install**  
  * [![image_thumb50](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb50_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb50.png)  
  * And, after a few minutes, the **Setup completed successfully** page should be offered up. Click **Close** to finish up  
  * [![image_thumb51](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb51_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb511.png)

And now, lets see did it work

Launch a fresh copy of the Service Manager 2012 Console, and all going to plan, we should now have a new Node in the Administration View for Cloud Services

[![image_thumb52](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb52_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb521.png)

Enjoy
