---
author: Damian.Flynn
comments: true
publishDate: 2011-03-22 23:44:00+00:00
template: post.hbt
slug: scvmm-2012installation
title: SCVMM 2012–Installation
wordpress_id: 89
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

Virtual Machine Manager 2012 has a new installer, and some really nice enhancements added which will simplify the installation process, and as a bonus integrate the 3 main modules (Server, Console and Portal) into the single setup experience.

As you read in the previous post, our plan for this lab, is to install SCVMM on the Domain Controller, so we do not need to worry about domain join’s but if you are installing on a member node, then check that the node is joint to the domain first.

There are a few prerequisites which need to be addressed before we can complete the installation, which we will address before we start into the real installer.

# Installation

Now, lets start with the easy stuff, and load up your PowerShell console again and we will get this process rolling.

## Service Accounts

From the PowerShell console we need to import the Active Directory module so that we can organise a service account
    
    Import-Module ActiveDirectory
    New-ADUser -Name "!SCVMM Server" -SamAccountName !svcSCVMMServer -Description "SCVMM Server Service Account" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password") -Path "OU=Services,OU=Operations,dc=damianflynn,dc=demo"




Next we will add this service account into the Local Administrators Group of this server also, as SCVMM will check for this privillage during installation
    
    $computerName =   "$env:computername"
    $localGroupName = "Administrators"
    $servicename="damianflynn.demo!svcSCVMMserver"
    ([ADSI]"WinNT://$computerName/$localGroupName,group").Add("WinNT://$ServiceName")




## Prerequisite’s




One of the changes this time round, is that we need to organise a few of the prerequisites manually. In the next few stages we will put all this into place




### Windows Features




The web portal is dependant on IIS7, so first stop on the shopping list is to add these windows features.
    
    Import-Module ServerManager
    Add-WindowsFeature AS-NET-Framework,WAS,Web-Common-Http,Web-Asp-Net,Web-Net-Ext,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Http-Logging,Web-Log-Libraries,Web-Request-Monitor,Web-Http-Tracing,Web-Basic-Auth,Web-Windows-Auth,Web-Digest-Auth,Web-Client-Auth,Web-Filtering,Web-Performance,Web-Dyn-Compression,Web-Mgmt-Console,Web-Scripting-Tools,Web-Mgmt-Service,Web-Metabase,Web-WMI,Web-Lgcy-Mgmt-Console







### Windows Automated Install Kit




Next stop on the route is the Windows Installation Kit. This is not on the distribution media, so you will need to go fetch WAIK 2.0. (Note – that with the release of SP1 for Windows 7 and 2008 R2 Microsoft also released WAIK 2.1, however this version is NOT supported with SCVMM 2012 Beta)




Grab the WAIK from this location –> [http://go.microsoft.com/fwlink/?LinkID=194654](http://go.microsoft.com/fwlink/?LinkID=194654)




#### WAIK Installation




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb18.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image22.png)




On this welcome page, Select **Windows AIK Setup**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb19.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image23.png)




Initial presentation is the License which we need to agree with




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb20.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image24.png)




We then need to define where the kit will be installed. Default is likely fine




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb21.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image26.png)




We are now ready to proceed with the installation




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb22.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image27.png)




Which will take just a few moments to complete…




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb23.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image28.png)




At which point we can Finish the installation process and move on to the next stage of preparation.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb24.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image29.png)




### SQL 2008 R2 Command Line




Nice progress, now we can add support for SQL. For this we will install one of the SQL 2008 R2 features called the Native Client, and also the SQL Command Line Tools. More information on the available features can be located here –> [http://go.microsoft.com/fwlink/?LinkID=210563](http://go.microsoft.com/fwlink/?LinkID=210563)




#### SQL Native Client Installation




From this page we can now install the Native Client, direct link to the software is here –> [http://go.microsoft.com/fwlink/?LinkID=188401&clcid=0x409](http://go.microsoft.com/fwlink/?LinkID=188401&clcid=0x409)




Once we have this downloaded, we can run the simple installer




.[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image55_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image55.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image58_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image58.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image61_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image61.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image64_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image64.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image67_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image67.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image70_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image70.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image73_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image73.png)




#### SQL CLI Tools




Next, after completing the installation of the Native Client, we can now proceed with the installation of the SQL CLI Tools –> [http://go.microsoft.com/fwlink/?LinkID=188430&clcid=0x409](http://go.microsoft.com/fwlink/?LinkID=188430&clcid=0x409)




### [![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image76_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image76.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image79_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image79.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image82_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image82.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image85_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image85.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image88_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image88.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image91_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image91.png)




### Active Directory Container




Now, the last of the steps we need to address, is to create a container in AD to hold our **D**istributed **M**anagement **K**ey. This step is really only necessary if we are creating a cluster for our SCVMM environment.




Launch ADSIMGMT, and expand the base container. I like to put stuff in the **System **container, however the choice is your of course. Once you have selected, we can create a new container for the DKM for SCVMM.




Right Click on the container, and select the option **New Object** which will launch the wizard asking what type of object you are creating. In this case I am selecting a **Container**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image.png)




Give the container a name, been very original I will use **SCVMM**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image1.png)




No additional configuration is required, so just proceed with clicking on **Finish**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb2.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image2.png)




### Active Directory Connection Point




If you are installing into a cluster, you may encounter an issue where your delegation does not have the required permission to create a service connection point during installation which will result in the installer rolling back.




To prevent this, you can use one of the tools provided on the installation media to manually crate the connection point, so that the installation will progress correctly. The utility is located at .amd64SetupConfigureSCPTool.exe. Pass this over you your helpful AD administrator and ask them to execute the command for you to register the point. the only additional information you will need to provide is






  * The FQDN Cluster node name 

  * The Computer Account name for the Cluster Node of SCVMM 


    
    ConfigureSCPTool.exe -install BIL-MON17-SCVMM.corpnet.liox.org CORPNETBIL-MON17-SCVMM$




## SCVMM 2012




And finally, we are ready to begin. I have all my installation media hosted on my file server, but yours maybe in other locations, or different media, Once the setup is launched, we are presented the System Centre Virtual Machine Manager Splash Screen and we are now presented with the installation options.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb3.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image3.png)




We will be installing the 3 components of the product, Server, Console and Self-Service Portal.




### VMM Server




After we click on the **Install **option, the Server Setup will begin, and the first stage in the installation wizard, asks that we read and accept the licence agreement before we get to move forward.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image5_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image5.png)




Next page in the wizard, offered the options on which modules you would like to install. First off the start line will be the **VMM Server**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image13_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image13.png)




SCVMM now also supports deployment on clusters, If the installer detects that we have Failover Clustering installed, we will be offered the option to have the VMM server installed for High Availability. If we do select the option to go HA, then for the first node the rest of the installation will remain the same as if we were installing in normal mode with some very minor exceptions. If the installer detects that we are are installing the second node in a Cluster then many of the questions are skipped the second time around as the installer is intelligent enough to query the first node for the required information.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image10_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image10.png)




Once we have selected all the options we would like to install we can click on Next to progress the installation




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image16_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image16.png)




We then need to provide some information on the registration of the software




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb4.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image4.png)




So far so good, now another easy one, where do we want the SCVMM Server software to be installed?, well honestly the default location works just fine for me.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb5.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image6.png)




The Wizard will next run some checks on the server to ensure that all the modules we require are in place. If at this point we have a problem we will have to address these before we will be able to proceed,




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image25_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image25.png)




In this next step we will connect to our SQL server. This should be pretty simple, first we have the **Server name:** where we will provide the name of our SQL server, in the Lab you will recall this is the server we created previously “**DIGI-SVR01”.**




Next, we should be able to use the drop down and select a **SQL Instance name** where we should see our default instance name appear **_MSSQLSERVER_**




As this is our first installation of SCVMM in our lab, we do not have a previously created database, so we should **Tick **the option **New database** which will then automatically fill in the database name **VirtualManagerDB** in the field




Now, we are done, so we should be able to click on **Next** and progress onwards




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image97_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image97.png)




The next screen to appear will depend on whether we have decided to install Clustering or not. If we are going with the Clustering option, we need to provide some information before we can proceed.




First, the **Name** for the Cluster configuration, and then an IP address for the Cluster,




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb6.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image7.png)




Its important that the Name you provide is part of the same domain, otherwise we will get an error blocking us form progressing further




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image103_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image103.png)




We next move to the Account configuration page, here we will provide the service account we created during the provisioning of our prerequisites. This service account requires to be a member of the **_Local Administrators_** group on this server (We have addressed this already), and will also need to be a member of the **_Local Administrators_** group on any server we will be pushing agents to later, For example our Hyper-V servers.




We also created a container in the System OU for SCVMM to host the Distributed Key Management. We will not provide this container location to the installer so that the the detail can be stored in Active Directory for our installation. This is only mandatory in a Cluster install - **CN=SCVMM,CN=System,DC=corpnet,DC=liox,DC=org**




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image115_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image115.png)




We can not define the IP **Port Configuration** which the Management server will use to communicate on. The default ports are quite likely going to be correct for your deployment. However before we just accept what we are been offered, there is no harm in taking a closer look at exactly what these ports are about.




The table here identifies what SCVMM is using these ports for, which we can now better understand are used to allow SCVMM Server to communicate with the Administrator Console and Self Service port, neither of which we have yet installed. We can also see WinRM and BITS in the list, which are used to communicate with SCVMM Agents that we will later be deploying to the Hyper-V servers, to support the management of the Hyper-V systems, and with BITS the deployment of images, and files on these servers, Finally we have some ports which will be used for communications with Host based deployments.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb7.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image8.png)




Now, equipped with a better understanding of what these ports are, and their use we can fell much more comfortable with accepting the default options offered to us




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb8.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image9.png)




The **Self-Service portal configuration** page in the wizard should be pretty simple to understand by now, but for clarity lets review the settings on this page.




The top section of this page **Virtual Machine Manager Server **is used to setup the communications link between the VMM Self Service portal and VMM Server. All that we need to provide here is the Server name, and the port it will be communicating on, which you should have guessed correctly – is port 8100 (assuming again you did not change this when installing the server)




The lower section of the page covers the **Web Server** which we will be hosting the VMM Self Service portal on. TCP port by default is port 80, which because we have installed the VMM Server and VMM Self Service on the same server is already in use.




We have two options available to us in this case




a) We can run the web site on a different port, which is not already in use on the server




b) We can use port 80, but require the use of **Host headers, **which will allow the server to determine what to do with traffic on this port. If the destination contains a match on the host header, we will process it as a request to view the VMM Self Service portal.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb9.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image11.png)




SCVMM uses a concept called Libraries for hosting different content items which are then used by the tools to support the Virtual Machines. We will be spending more time with this Library concept once we start using the system, so for now I am going to accept the default suggestions which we can extend later.




You will notice that since we installing in a cluster that we do not have the option available to us, as the location is required to the a High Available file share.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb10.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image12.png)




Once we have completed this step, we can review all the options and settings we provided, and safe in the knowledge that we done well, we can now click **Install** and get the server in place.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb11.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image14.png)




This process takes a little time, so you can sneak away and grab that coffee again.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image127_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image127.png)




Once the install is complete, we will should see a line of Green ticks to confirm that everything has worked out so far.




### Wrapping up the web portal.




If you recall while we considered what needed to be completed on the **Web Server Settings **page in the installation we finally made the decision to use **Host Headers** for making the process of accessing the web site simpler.




This decision leads us to one last task, which is to actually register this new alias on our DNS server. The result should be that this Alias corresponds to the same IP address of the server, which from the start of this article we know in this lab is _172.16.1.50_




Therefore we will be adding a DNS A record to resolve _selfservice.diginerve.net_ to the IP address _172.16.1.50 _on our Domains DNS server.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb40.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image40.png)




Once this is done we can do a quick ping test to ensure that the alias is working…




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb41.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image41.png)




Good Work, Now we can move on to the next component in the installation, the Admin Console




# Console Test Drive




Lets take a little detour, and test out the console to ensure that the install worked correctly.




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb12.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image15.png)




Then we wait




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb13.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image17.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb14.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image18.png)




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb15.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image19.png)




After a few moments, the Console should make a communications connection to the SCVMM Server which we installed a little earlier, and assuming there are no issues we should be presented with the Management Console




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb16.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image20.png)




Nice work, all looks good so far. Feel free to snoop about to see what is on offer here. We will be spending some time working with this. Once you are ready we can move on with the final components installation.




# VMM Self Service




Nice, now we have all three modules installed, we just have one more task to complete, so that we can test the new Web Portal.




And, then finally test the portal is working, by launching our web browser and surfing to this new site




[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image_thumb17.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2011/03/image21.png)




# Conclusion




We had a few steps to go trough to get to the end of the process, but nothing over painful on the trip. there is a lot of configuration work needed to make this new tool set work, but that we will cover in more detail in another article, for example pushing agents, assigning user roles, granting access to the SelfService portal, using the Libraries, and lots more…
