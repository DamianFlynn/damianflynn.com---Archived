---
author: Damian.Flynn
comments: true
publishDate: 2012-05-14 22:25:00+00:00
template: post.hbt
slug: sccm-2012-building-the-servers
title: SCCM 2012 Building the Servers
wordpress_id: 350
categories:
- Blog
tags:
- SCCM
- WS/SC
---

In this post I am going to cut back on screen shoots, and just focus on the main points, if you need deep dives, use the comments and ill try to help, and of course I can strongly recommend the top class guides by fellow [MVP Niall Brady](http://myitforum.com/cs2/blogs/nbrady/default.aspx) which are very technical with tons of great hints and tips. We will hit the bullets that offer the road map to what I am installing on the servers, and why. At the end of this post we should have the basics all in place across the globe to start getting some work done and focusing on the objective.

# Server Prep

Before I get on the the Configuration Manager installations, this is a little house keeping which needs to be taken care of first, nothing to technical. This should be installed on the 3 servers, just for kicks, and to save us some headaches later!

Also, lets just make sure we are all on the same page. We have already a working Active Directory, this we prepared in the last post. This Forest also has a working Enterprise Certificate Authority which is issuing both computer and user certificates to the domain automatically.

This is the hit list _(Note – if you install .NET 4.0 after IIS you will need to register and enable it!)_:

  * Valid Certificates from the Enterprise CA  
  * .NET 3.5  
  * .NET 4.0  
  * Background Intelligent Transfer Services (BITS)  
  * Remote Differential Compression  
  * IIS  
    * Common HTTP Features  
      * Static Content  
      * Default Document  
      * Directory Browsing  
      * HTTP Errors  
      * HTTP Redirection 
    * Application Development  
      * ASP.NET  
      * .NET Extensibility  
      * ASP  
      * ISAPI Extensions  
      * ISAPI Filters 
    * Health and Diagnostics  
      * HTTP Logging  
      * Logging Tools  
      * Request Monitor  
      * Tracing 
    * Security  
      * Basic Authentication  
      * Windows Authentication  
      * URL Authorization  
      * Request Filtering  
      * IP and Domain Restrictions 
    * Performance  
      * Static Content Compression 
    * Management Tools  
      * IIS Management Console  
      * IIS Management Scripts and Tools  
      * Management Services  
      * IIS 6 Management Compatibility  
        * IIS 6 Metabase Compatibility  
        * IIS 6 WMI Compatibility  
        * IIS 6 Scripting  
        * IIS Management Console 

## SQL

Notice that I do not have SQL listed above, that's because i have this already in place in my Enterprise.

However, we need to make sure some stuff is up to specification here also, as all good Microsoft installations have there expectations.

  * Valid Certificate from the Enterprise CA  
  * SQL is installing in a Highly Available configuration, for example a Cluster  
  * We have at least 2 instances on this SQL Environment  
  * SQL Instances are Configured to use STATIC TCP ports (multiple instances default to Dynamic so be sure not to get stuck here!)  
  * SQL is running SQL 2008 R2 SP1 with CU 6  
  * SQL Collation is set to “SQL_Latin1_General_CP1_CI_AS” on both Instances  
  * Add the Computer account of the Servers we will be deploying the Central Site, and Primary site systems on (SVR-SC-CM01, SVC-SC-CM02) to the computers Local Administrative group. 

In addition, I have another SQL Server which is hosting the SQL Reporting Services; we will configure this a little later.

  * Valid Certificates from the Enterprise CA  
  * SQL Reporting Services Default Configuration  
  * SQL 2008 R2 SP1 with CU 6  
  * Add the Computer account of the Servers we will be deploying the Central Site, and Primary site systems on (SVR-SC-CM01, SVC-SC-CM02) to the computers Local Administrative group. 

Now, last point of action

That should be it…

# Central Site

The Central Command and Control site, and to be honest a pretty unchallenging installation. This installation is carried out on my first purpose server.

The main installation highlights included

  * On the **Updated prerequisite Components **page, choosing the option **Download and use the latest updated**  
    * Provide a path on the network, so that we can use these components again for the next server, and prevent the requirement to download again. 
  * On the **Server Language Selection **choose the languages you wish to use  
    * I just opted to plain old English Only, as a policy we try to keep the global deployments in a single language which all the respective support team understand. 
  * On the **Client Language Selection **page, again choose the languages of choice  
    * Keeping it simple, English again is the choice here. 
  * On the **Site and Installation Settings** page, we need to offer a little details  
    * For the Site code I used **CM0** which i will consider as _Configuration Management – Site 0_  
    * The site name was easy **Production SCCM Central Site**  
    * The **Installation Folder** I opted to keep the default  
    * And keep the option **enabled **for **Install the Configuration Manager Console**
  * On the **Database Information** page, I now point to the second SQL Instance which will be used for this site  
    * In the **Server Name** text field, I entered the cluster node name of the SQL Instance, e.g. **SQL1NODE0.domain.com**  
    * In the **Instance Name** text field, I then supplied the instance name for this cluster node e.g., **SQL1NODE0INSTANCE**  
    * In the **Database Name** text field, I set the name to **SCCM_CM0** to help identify the purpose and site this database refers to.  
    * In the **SSB Port**, I made no changes. 
  * On the **SMS Provide Settings** page  
    * In the** FQDN of the server where the SMS Provider is to be installed** text field, I made no changes, and accepted this server as suggest by the wizard 
  * On the **CEIP** page, being a good tester, i opted in.  
  * On the **Settings Summary **page I ran a quick check to see if all looked correct, and let it rip 

Ok, cool; that is it, let it work and we can start looking at next server.

# Primary Site

Now for the heart of the environment, This server will host the main (and only) Primary site which I will be implementing into the production environment. I will of course be adding many more site servers to this site as we get the system working, but one step at a time. This installation is ready to go on the second purpose server we prepared, and will report up the central site.

Before you kick off here, we have one more pre-requisite to install, and that's the Admin Console for WSUS. Windows Roles and Features is a pain here as it does not offer the option to install just the Administrative console, so you need to go out and grab the WSUS 3.2 installer from the Microsoft Site; this one offers you the option for Console only or the full install. Encase you forgot already, you want the Console only!!

The main installation highlights included (but don't start this until the central site install is done!)

  * On the **Updated prerequisite Components **page, choosing the option **Use previously downloaded updates from the following location**  
    * Provide the network path we used in the Central Server, as i have no plan to download the same stuff again. 
  * On the **Server Language Selection **choose the languages you wish to use  
    * I just opted to plain old English Only, as a policy we try to keep the global deployments in a single language which all the respective support team understand. 
  * On the **Client Language Selection **page, again choose the languages of choice  
    * Keeping it simple, English again is the choice here. 
  * On the **Site and Installation Settings** page, we need to offer a little details  
    * For the Site code I used **CM1** which i will consider as _Configuration Management – Site 1_  
    * The site name was easy **Production SCCM Primary Site**  
    * The **Installation Folder** I opted to keep the default  
    * And keep the option **enabled **for **Install the Configuration Manager Console**
  * On the **Primary Site Installation** page, I now choose **Join the primary site to and existing hierarchy**  
    * In the **Central Administration site server (FQDN)** text field, I entered the computer name of the Central Site Server e.g., **SVR-SC-CM01.domain.com**
  * On the **Database Information** page, I now point to the second SQL Instance which will be used for this site  
    * In the **Server Name** text field, I entered the cluster node name of the SQL Instance, e.g. **SQL1NODE1.domain.com**  
    * In the **Instance Name** text field, I then supplied the instance name for this cluster node e.g., **SQL1NODE1INSTANCE**  
    * In the **Database Name** text field, I set the name to **SCCM_CM1** to help identify the purpose and site this database refers to.  
    * In the **SSB Port**, I made no changes. 
  * On the **SMS Provide Settings** page  
    * In the** FQDN of the server where the SMS Provider is to be installed** text field, I made no changes, and accepted this server as suggest by the wizard 
  * On the** Client Computer Communications Settings** page  
    * I took the safe route and choose to use **Configure the communication method on each site system role**  
    * I ensured to **clear** **the check box** on **Clients will use HTTPS when they have a valid PKI Certificate and HTTPS-Enabled site roles are available**  
      * Although I am pretty confident my PKI environment is working well, as this SCCM stuff is still new to me, I will come back later to change these settings 
  * On the **Site System Roles** page i set the following options  
    * I **Enabled** the option **Install a management point** and in the **FQDN **text box, accepted the default FQDN provided for this server.  
      * I also plan to make the last purposed server I have standing by as a second management point for resiliency – we will get there later 
    * I also **Enabled **the option **Install a distribution point** and again in the **FQDN** text box, accepted the default FQDN for this server.  
      * I will add a LOT more distribution points as we get the environment up, as i already suggested all my Domain Controllers will get this role also.  
      * The reason for enabling on this server, as it will also service all the systems which are hosted in my Datacentre, where this server is located. 
  * On the **CEIP** page, being a good tester, i opted in.  
  * On the **Settings Summary **page I ran a quick check to see if all looked correct, and let it rip 

After a break for a nice cuppa; the installation was complete.

If you want to see what is or had been going on behind the scenes locate the _CMTRACE.EXE_ tool on the installation media, launch it and then locate the install log which will be at _C:ConfigMgrSetup.log_. This is a good idea, because you are going to need to get familiar with all these logs if you ever plan to figure out what makes this juggernaut tick.

# Second Site Server

Magic, we are now almost there, the next task we have to complete is to get the second server for this site online and helping out to service to organisation.

I am going to do all the work from the Console connected to the Central site, this is the point I plan to do most of the work from, unless forced otherwise. To begin pop the console up with your administrative account. The plan is to enable this server with the role of Management point to get us started, later we will give this node some more work to do.

  * In the **Configuration Manager Console**, switch to the **Administrative View**, and select **Site Configuration –> Server and Site System Roles**  
  * In the View Pane, right client and from the context menu select Add New Site Server  
  * The **Create Site System Server Wizard** will then appear.  
  * On the **General** page, we will provide the name of the server and site to which we will add it  
    * In the **Name** text box enter the FQDN name of the Second Site Server **SVR-SC-CM03.domain.com**  
    * In the **Site code** drop down, I selected **CM1 – Production SCCM Primary Site** (This will be the same for almost all of the upcoming roles, with few exceptions)  
    * In the **Site Server Installation Account** section, I am keeping the default **Use the site servers' computer account to install this site system**  
      * This works because we already added this computer account of the Primary Site Server to the Domain Admins group  
      * This was required since most of my servers will be Domain Controllers. 
  * On the **System Role Selection** page, we are going to select the roles to deploy from the **Available roles** list box  
    * Enable the Check box for the **Management Point** Role  
    * On the **Management Point** page we will define the settings  
      * For the **Client Connections,** I am using **HTTP**  
      * And i have **Enabled** the option **Generate alert when the Management point is not healthy**
    * On the **Management point database** page we need to help define where the role will communicate with  
      * I have chosen the option **Use the site database** for the setting **Specify a database to use with this management point**  
      * For the **Management Point Connection Account**, the default **Use the computer account of the management point** works well, as long as i keep this listed in the local admin group on my SQL server. 
  * On the **Summary** page, We can then review the options selected, and then kick it off  
  * On the **Completion** page we should see nice green ticks to show all the tasks have started 

# Distribution Points

And now for my Domain Controllers, this one will take a little time as we need to enable each of the Domain Controllers with their new roles; It is all very repetitive, so I will just walk trough the process on one of the systems, and then just repeat until all have being done. Of course the option of PowerShell exists to deal with this clicking syndrome which will quickly sink in.

  * In the **Configuration Manager Console**, switch to the **Administrative View**, and select **Site Configuration –> Server and Site System Roles**  
  * In the View Pane, right client and from the context menu select Add New Site Server  
  * The **Create Site System Server Wizard** will then appear.  
  * On the **General** page, we will provide the name of the server and site to which we will add it  
    * In the **Name** text box enter the FQDN name of the Second Site Server **SVR-SC-CM03.domain.com**  
    * In the **Site code** drop down, I selected **CM1 – Production SCCM Primary Site** (This will be the same for almost all of the upcoming roles, with few exceptions)  
    * In the **Site Server Installation Account** section, I am keeping the default **Use the site servers' computer account to install this site system**  
      * This works because we already added this computer account of the Primary Site Server to the Domain Admins group  
      * This was required since most of my servers will be Domain Controllers. 
  * On the **System Role Selection** page, we are going to select the roles to deploy from the **Available roles** list box  
    * Enable the Check box for the **Distribution Point** Role  
    * On the **Distribution point** page we need to help define the initial settings of the Distribution Point  
      * **Enable** the check box **Install and configure IIS if required by Configuration Manager**  
      * Then select the option **HTTP** to **Specify how client computers communicate with this distribution point**  
      * In the **Create a self-signed certificate or import a PKI client certificate**, I select the option **Create Self-Signed Certificate** and **Set the expiration data** to sometime in the year **2020**!  
        * I will come back again to the PKI stuff once i know i have everything working well, deadlines to be addressed for now. 
      * I have **cleared the check box** to **Enable this distribution point for prestaged content**, as I plan to manage this centrally and use the WAN to distribute the content 
    * On the **Drive Settings** page  
      * Given that I am mainly using Domain Controllers, which i would like to stay working, I am setting the **Drive space reserve (MB)** to **2000**  
      * The domain controllers i am using only have one Drive letter, so there is not a lot of point in altering the rest of the settings on this page 
    * On the **PXE Settings** page, i am **not enabling** this feature YET!, objective 1 is Anti-Virus, but I will be back for this one!  
    * On the **Multicast** page, again i am **not enabling** just yet, we will be back later, do not fear.  
    * On the **Content Validation** page, I am turning this on  
      * **Enable** the check box **Validate Content on a Schedule**  
      * The default setting of Weekly on a Saturday evening at 7pm is perfect  
      * And since the offices are empty at this time, I am setting the **Content Validation Priority** to **Medium**
    * On the **Boundary Groups** page  
      * I don’t have these defined yet, we we will come back very shortly.  
      * I am however **enabling** the option **Allow fallback source location for content**, as my WAN is fully meshed and if the clients have a problem on their home site, we can always shop elsewhere 
  * On the **Summary** page, We can then review the options selected, and then kick it off  
  * On the **Completion** page we should see nice green ticks to show all the tasks have started 

Now, easy right, then get on with it and repeat this one 30 or 40 more times… 

See you soon…
