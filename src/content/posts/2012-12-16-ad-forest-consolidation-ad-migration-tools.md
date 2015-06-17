---
author: Damian.Flynn
comments: true
publishDate: 2012-12-16 23:27:00+00:00
template: post.hbt
slug: ad-forest-consolidation-ad-migration-tools
title: AD Forest Consolidation - AD Migration Tools
wordpress_id: 709
categories:
- Blog
tags:
- AD
- WS/SC
---

In our previous post, we worked through the process of configuring the source and target forests, to enable name resolution, before establishing a security trust between the environments, and delegating our access administrative access from the target to the source forest.

In the post we will walk through the steps required to deploy the free Active Directory Migration Toolkit 3.2 which we will utilize for a bulk of the physical work in consolidating the forests. I have assigned a dedicated machine joined to the target forest for the task at hand, so that any colleagues whom wish to assist in the exercise can do so.

As a recap this is the plan for today



	
  1. 


Target Forest




	
    1. Install the Free Microsoft Active Directory Migration Tools (ADMT) to a Management Station





	
  2. 


Source Forest




	
    1. Optional - Install the ADMT Password Export utility








# Active Directory Migration Toolkit


Prior to actually installing the toolkit on our designated server, we must first download a copy of the utility to our server from the Microsoft Download Centre. At the time of writing version 3.2 is the current release and can be obtained from the location - [http://www.microsoft.com/en-us/download/details.aspx?id=8377](http://www.microsoft.com/en-us/download/details.aspx?id=8377)

With the tools installer now available, we can begin the exercise. The installation of the ADMT is straight forward



	
  1. 


Double click the installation file for the ADMT tool, and after a few moments we should be presented with its splash screen


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon1.png)

	
  2. After reviewing the information, click on **Next**.

	
  3. 


The **Licence Agreement **will be next, sell your soul and select **I Agree** then click on **Next** again


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon2.png)

	
  4. 


Next up is the **Community Experience Improvement Program **agreement, we are offered the choice to **Join the Customer Experience Improvement Program**


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon3.png)

	
  5. 


Next the **Database Selection **page is presented, where we have the option to name a remote SQL Server, SQL instance, or use a local SQL installation. In a lab test I would run with a SQL Server Express installation, but in production I am going to use a SQL Standard or Enterprise server for the database.


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon4.png)

	
  6. After selecting the Database, the wizard will proceed with checking the Database selection is valid

	
  7. 


Assuming now additional issues, the **Configuring Components **page will be presented and the installation will progress


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon5.png)

	
  8. 


After a few moments the installer will complete, and the wizard will present a summary of the changes just applied.


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon6.png)

	
  9. Clicking **Finish **will terminate the wizard


Once the installation is complete, we can launch the tool from the start menu. The Action menu will offer a list of different migration exercises which we can execute, we will investigate these in due course.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon7.png)


# Password Export Server


The next step in the preparation is pretty much optional. The Password Export Server, gets deploy to a system in the Source Forest, and permits us to securely transfer over the current user passwords with their accounts. This can be of a great benefit in making the transition for users quite pain free, however it becomes less important if there are Password Policy mismatches between the environments, or if for some other business reason, some of the employees in the source forest already have an account in the target forest to gain access to resources, prior to us getting this whole process online.

In a company merger this last statement can be quite often true for some senior executives, whom require secure access to services on the target forest well before the migration kicks into action. I will address some of these style accounts as we proceed, as this happens to be the case in my scenario also.

Prior to starting with installing the export server on the source forest, we will first create a token on the target forest, which we will use to sign/trust the passwords which the export server will send over to use, just to prevent any potential unwanted smart guys messing us up.


## Export Key File


Launch a shell on our ADMT machine and enter the following command, replacing the <SoruceDomain> with the FQDN name of the domain you are exporting from and <KeyFilePath> with the name of the file we will create.

    
    <code>admt key /option:create /sourcedomain:<SourceDomain> /keyfile:<KeyFilePath> </code>


This is what the command looks like in my environment and its output

    
    <code>PS> admt key /option:create /sourcedomain:decommission.local /keyfile:passwordexport.key </code>




    
    <code>The password export server encryption key for domain 'decomission.local' was successfully created and saved to 'C:Usersdpfadminpasswordexport.key.pes' </code>


With this token now created, Transfer it to the designated server in the source forest which will be utilized for installing the Password Exporter.


## Install the Password Exporter


On a node in the source forest, we will first download a copy of the Password Exporter from the Microsoft Download Centre. At the time of writing version 3.1 is the current release and can be obtained from the location - [http://www.microsoft.com/en-us/download/details.aspx?id=1838](http://www.microsoft.com/en-us/download/details.aspx?id=1838)

With the installer on the server, we can start the installation



	
  1. 


Double click the installation file for the Password Migration setup, and after a few moments we should be presented with its splash screen


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon8.png)

	
  2. 


The **Licence Agreement **is next up, again donate your soul and click Next


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon9.png)

	
  3. 


The **Encryption File **page is next to been displayed. On this page use the Browse button to locate the token file we transferred in the last exercise, so that the installer recognises the file will be used to protect the communications with the Migration tool.


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon10.png)

	
  4. 


The **Start Installation **page, verifies we are now ready to install the function


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon11.png)

	
  5. 


Installation will begin, and the **Updating System **page, will present the progress of the operation


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon12.png)

	
  6. 


After a few moments, a new dialog will be presented, asking for a service account for the Password Migration utility service. In my environment I am hosting this tool on a Domain Controller in the Source forest, and the default **Local System account **should be suitable for the service, alternatively we can provide a set of credentials.


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon13.png)

	
  7. 


And we are done!


![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121312_1042_ADForestCon14.png)

	
  8. 


The installer will ask for a reboot after clicking Finish. Be sure that you plan the reboot at a suitable time, but before you plan to use this feature







# Summary


And that takes us one more step closer to ready. At this stage we now have the AD migration tools in place, and can now prepare to focus on the steps needed to get the Exchange systems ready.

In the next posting Exchange will be the focus of our endeavor for consolidation.
