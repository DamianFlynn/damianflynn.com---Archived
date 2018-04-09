---
author: Damian.Flynn
comments: true
date: 2012-03-01 21:35:00+00:00
layout: post
slug: cautionservice-templates-in-vmm
title: Caution–Service Templates in VMM
wordpress_id: 288
categories:
- Blog
tags:
- SCVMM
- WS/SC
---

As you are all aware we have a new Services Model in VMM, which is being pushed as the global replacement for VM Templates. This new Model which richly embedded in the framework for VMM 2012 has a number of problems which you should be cautious about.

In this post, I will illustrate a scenario, which should help educate you on what the possible issues are, and the concepts you need to be aware of.

## Scenario – Team adopt a new software solution

As an example, assume the Development teams have being utilizing different version control and bug tracking technologies, a business decision is then made to standardise on a single product and for the sake of description this maybe TFS. Some members of this team will then proceed to request a private cloud and deploy a test environment for all to evaluate against.

After some time, the decision is made to adopt this new TFS solution, and must now be requested trough the IT team for production hosting. The approach will be in the typical fashion of requested 2 or 3 VMs, and working with an IT Contact to deploy the new software ready for production.

The guidance is to deploy these new VMs using the new Service Template in preference to using VM Templates as these are much richer, even which deploying single node servers. Remember the IT team has not being involved in working on a Service Diagram for this new solution, and instead will proceed following the recommendations and deploy a few VMs using the Single Node Service Templates; which of course works quite well for placing the VMs. In this approach we are not utilizing unattended installs, scripts, App-V or any other feature to take advantage of the functions offered with service templates – We now have 2 problems

  * There is no way to flag this to an admin – who might try to service these and destroy the server as a result; or Scaling might be enabled which will create Blank Nodes in the Service  
  * This approach has now created at least 2 Services in VMM 

With the fantastic integration in the SC2012 Suite, where VMM integrates with Operations Manager, which in turn is connected with Service Manager. This is indeed very cool, but now we also have some additional problems

  * We are now SPAMMING Operations Manager with new Distributed Applications – which are not in effect an Application, but just single VMs which participate in Service Offering  
  * Service Manager Connectors enabled will in a Syncing environment will also SPAM the Service Manager with new Business Services. 

These issues will only become a problem after a little time, or while you are in a connected suite configuration; so for now, please treat this as a caution, and be aware of what could occur.

I have some suggestions which will help to address these issues which i have shared with the Product Group for consideration

  * Enable VM Templates as First Class Citizens for implementing VMs – Supporting the Features applicable from the Service Template including the associations, variables, etc.  
  * Enable to ability to create a Service in the service designer by referencing VMs already deployed and running - regardless of original creation being outside VMM, or inside VMM and created from VM or Service Templates  
  * This new Service should have the option to supersede and replace the single standalone Services which may have being utilized for the initial deployment  
  * Enable the ability to flag a Service as suitable for migrating over to OM as a Distributed Application 

Enjoy the power of VMM 2012, we have lots to learn.

Cheers
