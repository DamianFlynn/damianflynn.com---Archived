---
author: Damian.Flynn
comments: true
date: 2011-03-23 23:52:00+00:00
layout: post
slug: scvmm-2012add-ha-library
title: SCVMM 2012–Add HA Library
wordpress_id: 3511
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

As we just learned, SCVMM 2012 when installed in HA mode, will not automatically create the VMM Library for us, we need to do this part of the job manually.

Already MS are recommending that we do not install the Self Service portal on the HA cluster for SCVMM, as they have not addressed the steps required to make the IIS Site HA, given that Concero will be the primary Web based interface for SCVMM.

Well, they same really stand’s true for the configuration of the File Share which will be utilized for the Library storage, no extra steps have been added to the installer to have it also deploy for us the File Server role as HA, and then allow us select it as our VMM Library.

We also know that using a NAS for the File server library is not a supported configuration, so that really leaves us with 2 options

  * Use an existing File server, or File Server Cluster as the Library (but be sure that you do not have SCVMM agents for pre-2012 installed)  
  * Or, Create our own dedicated File Cluster (On the SCVMM Server of Course!) 

So, why not, lets go with the second option…

# Create the File Server

Right, enough time wasted, we have a file cluster to get online. Log back into our SCVMM server, and open up the Failover Cluster Manager, so that we can get about adding a File Server Service.
    
    Import-Module ServerManager
    Add-WindowsFeature FS-FileServer




I have already assigned the Disk to the server via iSCSI which we will be using for the library, If you need help on that process, then refer back to this post for some guidance on the process [http://www.damianflynn.com/2011/02/09/ddlabshared-disk/](http://www.damianflynn.com/2011/02/09/ddlabshared-disk/)




[![image](/assets/posts/2011/03/image_thumb25.png)](/assets/posts/2011/03/image30.png)




Now, Right Click on the **Services and applications **to select the option **Configure a Service or Application…** which will launch the **High Availability Wizard **for us to get started.




[![image](/assets/posts/2011/03/image_thumb26.png)](/assets/posts/2011/03/image31.png)




Now, we get to select the File Server service




[![image](/assets/posts/2011/03/image_thumb27.png)](/assets/posts/2011/03/image32.png)




Next, we need to give this new Virtual server and Name and IP Address




[![image](/assets/posts/2011/03/image_thumb28.png)](/assets/posts/2011/03/image33.png)




Then we need to select the Disk which we will add to this File server




[![image](/assets/posts/2011/03/image_thumb29.png)](/assets/posts/2011/03/image34.png)




Now, we get to see a quick confirmation to validate if the information we are looking at is correct.




[![image](/assets/posts/2011/03/image_thumb30.png)](/assets/posts/2011/03/image35.png)




Knowing that we got all the details right, we can now let the Wizard do the job and configure the new File Server




[![image](/assets/posts/2011/03/image_thumb31.png)](/assets/posts/2011/03/image36.png)




After a few moments this process should end, and we will be presented with the final summary view.




[![image](/assets/posts/2011/03/image_thumb32.png)](/assets/posts/2011/03/image37.png)




Now, lets Finish the Wizard, Loop back to the Failover Clustering Console, and check that our File Server is now online




[![image](/assets/posts/2011/03/image_thumb33.png)](/assets/posts/2011/03/image38.png)




# Add Our Library Server




Smashing, Now we can get into the core of the task, and get our new HA Library server online. Lets get back to our SCVMM 2012 console, and change our task View to **Library **mode




[![image](/assets/posts/2011/03/image_thumb34.png)](/assets/posts/2011/03/image39.png)




The Ribbon will then update to the new mode, and we will get new icon’s to match our new view context. From here we will select the option to **Add Library Server**




[![image](/assets/posts/2011/03/image_thumb35.png)](/assets/posts/2011/03/image40.png)




This will next Launch the **Add Library Server** wizard, The initial question will be to Identify who we are




[![image](/assets/posts/2011/03/image_thumb36.png)](/assets/posts/2011/03/image41.png)




Now, we get to select the name of our new HA FileServer we just created, so that the Wizard can enumerate and allow us to add. So, In the **Computer Name** we will type the name of the new FS Cluster, and then click on **Add**




[![image](/assets/posts/2011/03/image_thumb37.png)](/assets/posts/2011/03/image42.png)




After a few moments the Wizard will complete the search and we should see our new Cluster File Server detected and ready for us to select.




[![image](/assets/posts/2011/03/image_thumb38.png)](/assets/posts/2011/03/image43.png)




Now, we are presented with a list of shares which exist on our clustered File server, an from this interface we identify which of these shares will be utilized for the Library




[![image](/assets/posts/2011/03/image_thumb39.png)](/assets/posts/2011/03/image44.png)




That was pretty easy, we now have the option to review the selection, and even peek at the Powershell which will make this magic happen.




[![image](/assets/posts/2011/03/image_thumb40.png)](/assets/posts/2011/03/image45.png)




If you feel like a peek, this is what the sample looks like:
    
    $Credential = get-credential
    Add-SCLibraryServer –VMMServer demo-svr.demo.lab -ComputerName "demo-svr-01.demo.lab" -Description "" -Credential $Credential -JobGroup 89099479-2ad8-4e63-b39e-8e50389dd505 -RunAsynchronously
    Add-SCLibraryServer -VMMServer demo-svr.demo.lab -ComputerName "demo-svr-02.demo.lab" -Description "" -Credential $Credential -JobGroup 5926e90a-70a7-46d3-95d4-4b9ade870789 –RunAsynchronously
    Add-SCLibraryServer -VMMServer demo-svr.demo.lab -ComputerName "demo-svr.demo.lab-FS.corpnet.liox.org" -Description "" -Credential $Credential -JobGroup 7107af9f-4364-4607-83bd-eb36dd07f2f6 –RunAsynchronously
    
    Add-SCLibraryShare -VMMServer demo-svr.demo.lab -SharePath "demo-svr.demo.labMedia" -Description "" -JobGroup 7107af9f-4364-4607-83bd-eb36dd07f2f6 -RunAsynchronously




Now, the job can be started, and the new Library added to our environment, ready for use.




[![image](/assets/posts/2011/03/image_thumb41.png)](/assets/posts/2011/03/image46.png)




That was not difficult, We can now see that our new Library server is registered and ready for our usage




[![image](/assets/posts/2011/03/image_thumb42.png)](/assets/posts/2011/03/image47.png)




# Conclusion




Nice work, Our Highly Available SCVMM 2012 Beta, is now co-hosting a Highly Available File Server role, and ready for use as our Library.
