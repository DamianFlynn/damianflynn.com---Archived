---
author: Damian.Flynn
comments: true
publishDate: 2012-10-11 13:01:00+00:00
template: post.hbt
slug: fim-sync-server-2010r2-cluster-build
title: FIM – Sync Server 2010R2 Cluster Build
wordpress_id: 628
categories:
- Blog
tags:
- Cluster
- FIM
- PowerShell
- WS/SC
---

Out of the box, the FIM Sync server is not delivered as a cluster aware application, but with a little research, tweaking, and patients we can address this shortfall, and implement this technology in a High Availability solution.

In this guide, I will step though the process of first installing the FIM Sync Service on a single host; then proceed to configure this host as a single node cluster, prior to adding the FIM Sync engine as a resource of the cluster. Once this is completed, we can then easily repeat the exercise and add additional nodes to the cluster creating a highly available FIM Sync solution.


## Install the FIM Sync 2010 R2 Service


Prerequisites for the installation



	
  * .NET Framework 3.5

	
  * 


SQL 2008 Native Client



	
    * _Forgetting this will not present an error, but the install will report it cannot connect to the remote SQL Server each time you attempt_





With the parts in place, we can proceed with the actual installation

	
  1. 


Start the FIM Sync Service installer from the 2010 R2 Installation Media, and you will be greeted with the initial splash screen


	
  2. 


 [![101112_1109_FIMSyncServ1](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ1-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ1.png)


	
  3. 


Legal Mumbo Jumbo then needs to be agreed with, before can continue


[![101112_1109_FIMSyncServ2](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ2-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ2.png)

	
  4. 


Next, we are offered the choices of what to install, this is very simple as its all or nothing!


[![101112_1109_FIMSyncServ3](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ3-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ3.png)

	
  5. 


We next need to define the SQL server which we will utilize; I am utilizing a remote SQL 2008 R2 installation for this service


[![101112_1109_FIMSyncServ4](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ4-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ4.png)

	
  6. 


After we have selected the SQL server and instance, we next need to define the service account


[![101112_1109_FIMSyncServ5](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ5-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ5.png)

	
  7. 


FIM Sync offered a lot of functionality, and these need to be managed by different roles of users, these are defined next in the form of Management Groups, which include Administrator, Operator, Joiners, Connector browse, and WMI Password reset. These can be local or domain groups; and should be pre-created; if you are going with a Domain group, then prefix the group name with the domain name syntax (as per screen shot).


[![101112_1109_FIMSyncServ6](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ6-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ6.png)

	
  8. 


As FIM transfers data in and out over RPC and other ports, the installer offered the ability to open the ports for RPC for us.


[![101112_1109_FIMSyncServ7](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ7-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ7.png)

	
  9. 


And we are ready; now it's time to install.


[![101112_1109_FIMSyncServ8](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ8-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ8.png)

	
  10. 


The installation is pretty simple, and quick. After a few movements we are notified about backing up or encryption keys.


[![101112_1109_FIMSyncServ9](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ9-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ9.png)

	
  11. 


The save as dialogue is then offered to define where and what to call and put the backed up encryption keys.


[![101112_1109_FIMSyncServ10](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ10-300x230.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ10.png)

	
  12. 


And that's it; we are done with the installation of the product.


[![101112_1109_FIMSyncServ11](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ11-300x226.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ11.png)




## First Launch


Before we can successfully launch the Synchronization Server Manager for the first time, we will need to ensure that we have first added our user account to the Role Management Groups which we defined earlier. Otherwise you would be greeted with a nice message such as illustrated in the screen shot.

[![101112_1109_FIMSyncServ12](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ12-300x211.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ12.png)

If your account was not previously a member of these new groups – for example FIMSyncAdmins, then you will need to follow the normal token operations; so I recommend a quick logoff and logon sequence before trying to launch the Synchronisation Server Manager again, after which you should see the UI appear

[![101112_1109_FIMSyncServ13](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ13-300x232.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ13.png)


## Failover Clustering


FIM Sync is not a cluster aware application out of the box, so now it is time for some magic J.

So far we have only one server, with single NIC, and none of the normal Cluster prep work completed, but that's not going to stop us right J. First things first, I am going to add the Failover Clustering feature to our server, PowerShell will help out here to make this quick and easy

Import-Module ServerManager


Add-WindowsFeature Failover-Clustering


[![101112_1109_FIMSyncServ14](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ14-300x98.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ14.png)

I am going to switch back to GUI, to configure our cluster, so pop up the Failover Cluster Manager UI,



	
  1. 


From the context menu we will select to launch the Create a Cluster wizard.


[![101112_1109_FIMSyncServ15](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ15.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ15.png)

	
  2. 


The Wizard will begin with the normal welcome, which we can read and click past. On the Second page, we are asked to selected which servers we wish to include in our cluster. I am just adding my single FIM server (this server), at this point.


[![101112_1109_FIMSyncServ16](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ16-300x200.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ16.png)

	
  3. 


With the server added, we then meet the validation Wizard, which if you want MS Support for your cluster, you will be selecting Yes to this


[![101112_1109_FIMSyncServ17](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ17-300x200.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ17.png)

	
  4. 


The Validation Wizard will then appear, just step through its screens, and let the wizard do its work; it show be pretty quick to be honest; and unless something is odd, I expect there to be no failures. You can then close the wizard.


	
  5. 


Back on the Create Cluster wizard its not time to create a name for our new


[![101112_1109_FIMSyncServ18](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ18-300x200.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ18.png)

	
  6. 


Next step is to verify the settings, before commencing to create the new cluster, which itself will take a matter of seconds to complete.


[![101112_1109_FIMSyncServ19](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ19-300x200.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ19.png)




## High Availability Service


Back in the Failover Cluster Manager UI, we can now highlight the Services and Applications node, in the navigation tree; from where we can begin the process of setting up our FIM service for HA.



	
  1. 


In the actions list select the option Configure a Service or Application, to launch the High Availability wizard. This will then pop up with the normal welcome stuff which we will quickly click passed to get to the main page, Selecting a Service or application


[![101112_1109_FIMSyncServ20](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ20-300x206.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ20.png)

	
  2. Now, as FIM is not cluster aware, we are going to have to this the magic way. The obvious suggestion to select Generic Service is not going to work, as FIM uses an encryption key to speak with the database; therefore if we were to just failover the service from one host to another; we would still be no better off; as the service on the new node would not be trusted by the database and therefore not run for us. As a result we need to tell the database we are switching servers using a utility which is installed with FIM; and thus we need to use a Generic Script.


So what is this Generic Script, it's based on a special template which adheres to the Requirements of Failover Clustering which reports back on two health checks – _IsAlive_ and _LooksAlive_ ([Reference Information](http://msdn.microsoft.com/en-us/library/windows/desktop/aa372846(v=vs.85).aspx))

As an example the LooksAlive function might read as follows (VB Script) for a simple check on the _FIMSynchronizationService_  service running check



Once the Cluster Service determines it needs to bring the service online, it again looks into our script file, this time for a function called _Online**
**_which will be responsible for taking care of the task at hand and letting the cluster know if the job was successful or not.



Checking for FIM health is quite similar, however it is a little more complex as we need to check the health based on whether the agents are working, and when we are ready to go live, we will need to first update the SQL server to let it know we are changing the active server.

While researching this configuration I found a post from 2005 from [Alex which contained a sample script](http://blogs.msdn.com/b/alextch/archive/2005/12/17/miisha.aspx) for checking the _IsAlive_ and _LooksAlive_ as well as other functions for checking and brining the server online including activations. Thanks Alex.

2005 is quite a while ago, so as one would expect there are some changes which I needed to apply to the script to have it function with FIM 2010 R2, these were pretty trivial however, just checking namespaces, service names, and a little reformatting as I reviewed the code. [The updated 2010 R2 Script is attached to this post here](http://sdrv.ms/TAv6Nb).

The updated script, which I called _FIMSync_2010R2_Cluster_Resource_Script.vbs_ in the same folder I placed the encryption key backup file, which was on C:FIM Sync Data, as illustrated in the screen shot.

[![101112_1109_FIMSyncServ21](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ21-300x70.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ21.png)



	
  1. 


Right, back to the Wizard, where we cannot provide the path to our FIM Sync Cluster Resource Script


[![101112_1109_FIMSyncServ22](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ22-300x206.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ22.png)

	
  2. 


Next, we need to provide the Client Access Point for the service, which needs a computer name, and IP address.


[![101112_1109_FIMSyncServ23](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ23-300x206.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ23.png)

	
  3. 


Next step is to assign shared storage, which if you recall, I have not touched so far; so it should be no surprise that the next page has nothing to offer


[![101112_1109_FIMSyncServ24](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ24-300x206.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ24.png)

	
  4. 


Next up again is the confirmation, which again we can review, and once ready complete the wizard to create our new Cluster Resource and group


[![101112_1109_FIMSyncServ25](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ25-300x206.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ25.png)




## Taking us online


Don't fret if the cluster has not come online, we have a little more work to do. First things first, we need to check out where this MIISActivate.exe is located, as it's very important to the complete procedure. A quick browse of the file system reveals the tool is located in the main FIM 2010 R2 binary folder, located at - _C:Program FilesMicrosoft Forefront Identity Manager2010Synchronization ServiceBin_

[![101112_1109_FIMSyncServ26](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ26-300x124.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ26.png)


### Add System Path


Great, now all we need to do is add this path to our system path environment variable, so that it can be quickly and easily located. You can do this in the GUI by using computer properties dialogue, or with a quick PowerShell function. The following one works perfect for the task, which I found on [The Scripting Guys](http://blogs.technet.com/b/heyscriptingguy/archive/2011/07/23/use-powershell-to-modify-your-environmental-path.aspx) blog; you just need to open a PowerShell session with Administrative privileges, and paste this in



Now, we can use this function to add our path, with the command

Add-Path -AddedFolder 'C:Program FilesMicrosoft Forefront Identity Manager2010Synchronization ServiceBin'


Now, we can test this worked by opening a new shell, and running **miisactivate**, and all working to plan, we should be greeted with its splash screen

[![101112_1109_FIMSyncServ27](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ27-300x202.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ27.png)


### Preferred Owner


In the Failover Cluster Manager, you can see the name of the cluster group matches the name we supplied in the wizard, which in my case was a cryptic _BIL-S-AD-FIMSync_.

[![101112_1109_FIMSyncServ28](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ28-300x121.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ28.png)

Right Click on the Service name, and open the properties, here we will see the list of Preferred owners, which will have our single server listed, but not selected. Select it and then click on the Apply button.

[![101112_1109_FIMSyncServ29](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ29-251x300.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ29.png)


### FIM2010R2 Cluster Resource Script


Now, back in our magic script, we have a block of lines which act as the configuration for the script, these we need to edit to match our installation



	
  1. FIMClusterGroup – The group name we just looked at for our cluster, e.g. _BIL-S-AD-FIMSync_

	
  2. FIMServiceAccount – The service account we used for the FIM Sync Service

	
  3. FIMServiceAccount Pwd – The password for our service account – _yep this clear text for now_.

	
  4. FIMEncryptionKeyFile – The path and name of the Backed up Encryption file we created.

	
  5. FIMSyncStartupWaitTime – The number of seconds to wait for  the Activation and Stating of the Sync Service


[![101112_1109_FIMSyncServ30](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ30-300x96.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ30.png)



Ok, that's the ground work done, and time to verify our labour. Start the services, cross the fingers, and wait for the Green Lights

[![101112_1109_FIMSyncServ31](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ31-300x124.png)](http://blogstorage.damianflynn.com/wordpress/2012/10/101112_1109_FIMSyncServ31.png)

Now, all going to plan we should now be online, after about 2 minutes we will see this resource fail. This is expected, as the _IsAlive_ check in our script is programmed to fail if there are no objects in the FIM Metaverse; which should never be the case unless the FIM Sync service has either not being configured, or has encountered a failure.

In our case we have not configured FIM Sync, so the check will fail, as the Metaverse is empty to begin with. If you do not like this approach, the sample earlier for _LooksAlive_  could be substituted into the script, to replace my current _IsAlive_ function, causing the check to fail if the Windows Service fails.


### Debugging


If for some reason the cluster keeps failing, you need to check the logs; this is very easy to do if you open a shell, and issue the command

cluster log /g


As a result of this a _cluster.log_ file will be generated and stored in _%windir%ClusterReports_ directory of all nodes in the cluster (just one in my case so far). The content of this file is detailed, and will help track down any issues with the script.


## Additional Nodes


Now that you have all the hard work done, we can now focus on adding more nodes to this environment. All you need to do for this process is simply add the new nodes to the cluster, and ensure that you copy over the _FIM Sync Data_ folder and its 2 files to each additional node you add, or if you have a shared storage, host those files there, so that each cluster node can reach and access them.

Thanks to Alex for his initial work many years back, and I hope this helps guide you forward; Happy Syncing.

[Download the FIM2010R2 Cluster Script Here](http://sdrv.ms/TAv6Nb)
