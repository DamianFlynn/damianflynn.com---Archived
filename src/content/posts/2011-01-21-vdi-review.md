---
author: Damian.Flynn
comments: true
publishDate: 2011-01-21 22:55:00+00:00
template: post.hbt
slug: vdi-review
title: 'VDI: Review'
wordpress_id: 35
categories:
- Blog
tags:
- Remote Desktop
- WS/SC
---

There are many posts over the internet on how to setup and deploy a Remote Desktop Virtualisation Host, and configure for Personal Desktops or Pools, so I am going to skip the wizards for now, we might come back at another time to walk the process and drill into what is really going on in the plumbing, but for now I would like to take a look at the communication flow which is happening between all the moving parts to make the VDI services function as a whole.

First – lets recap on the services or nodes which all work together to make this technology solution function:

  * A Remote Desktop Virtualization Host (RD Virtualization Host)  
  * A Remote Desktop Connection Broker (RD Connection Broker)  
  * A Remote Desktop Session Host (RD Session Host) in redirection mode  
  * A Remote Desktop Web Access (RD Web Access)  
  * A virtual machine prepared for use in VDI 

After all the above have been prepared, the net result should be that after the user selects the VDI from the RD Web interface lots of messages get passed between each of the services to orchestrate the different stages to deliver the final result.

If we are every going to be able to debug this implementation, we are going to need to get acquainted with what this orchestration is doing. So, lets just take a moment to consider what is happening from the point the user Clicks in the RD Web Access Interface, to the point the Remote Desktop connection is finally presented back.

  * First, The request is sent to the RD Session Host server running in redirection mode.  
  * The RD Session Host server running in redirection mode forwards the request to the RD Connection Broker server.  
  * The RD Connection Broker needs to make a decision  
    * The User Clicked a VDI Personal Desktop Icon: Then the Connection Broker server queries Active Directory Domain Services and retrieves the name of the virtual machine that is assigned to the requesting user account.  
    * The User Clicked a VDI Pool Icon: The the Connection Broker server queries its WMI database to determine which node in the pool is available and returns the name of the virtual machine 
  * The RD Connection Broker server sends a request to the RD Virtualization Host server to start the virtual machine.  
  * The RD Connection Broker server sends a request to the RD Virtualization Host server to query if the Remote Desktop session on the VM is idle and ready for a connection.  
  * The RD Virtualization Host server returns the IP address of the fully qualified domain name to the RD Connection Broker server.  
  * The RD Connection Broker server then sends this information to the RD Session Host server running in redirection mode.  
  * The RD Session Host server running in redirection mode redirects the request to the client computer that initiated the connection.  
  * The client computer connects to the virtual desktop. 

Let’s come back to this again a little later, when we dive even deeper and look at the communications that occurs between each of these components.
