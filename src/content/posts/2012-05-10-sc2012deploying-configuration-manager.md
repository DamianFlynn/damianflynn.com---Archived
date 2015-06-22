---
author: Damian.Flynn
comments: true
publishDate: 2012-05-10 22:15:00+00:00
template: post.hbt
slug: sc2012deploying-configuration-manager
title: Deploying SCCM 2012
wordpress_id: 324
categories:
- Blog
tags:
- WS/SC. SCCM
---

With SC 2012 now released, it is time to deploy this code to the production environment. Over the last number of months I have being conducting tests in my lab environment, and more recently in a distributed pre-production environment to get an better understanding of how things work and how quickly. The excellent blogs of Niall Brady, along with the guidance of fellow Irish MVP Paul Keely (Infront Consulting) and Aidan Finn (Micro Warehouse) have offered some excellent advice and support.

While preparing for the Release of SCCM 2012, I have spent a lot of time referencing different materials and communicating with different people with real world experience, to help determine the correct implementation decisions I should be making (MMS 2012 was a fantasist help for this exercise).

There are many different perspectives depending on who you speak with, and figuring out the best approach can be quite a challenge, as it depends on the structure of your production environment.

So, what is my environment really like? Well, pretty normal really for a medium size enterprise, 45 locations distributed across the globe, and just under 6000 computer systems on the managed network. The Organisation is pretty nicely structured, with a single Corporate IT team overseeing the primary datacentre services and global infrastructure, with dedicated IT Professionals located in each of the field offices, all working together to support the business and evolve our services.

Infrastructure in the field office we try to keep lean, and recently just completed a global refresh of our Domain Controllers; and during that cycle included larger then required Hard Disk’s with the future plan of utilizing these for additional purposes later… Configuration Manager Distribution points.

# Site Types

## Central administration site 

The central administration site coordinates inter-site data replication across the complete Configuration Manager hierarchy utilizing SQL database replication. With this site at the top of the hierarchy, it is suitable for both hierarchy-wide configurations of client agents, discovery, etc. along with all the reporting for the hierarchy.

## Primary site

Primary sites are connected to the Central Administration site, as spokes and each site can sustain up to 100,000 agents.

Additional Primary sites can be implemented under a CAS to support additional clients; or to segregate administration of administration to different teams.

# Assumptions

To get started, I have noted some of the decisions already made, based on various conversations:

  * SQL should be clusters/mirrored and on a dedicated environment – this offers up to 20% performance boost from installing locally  
    * The SCCM DR procedures are harder in this setup, but the assumption are  
      * An enterprise SQL should not be failing! as its business critical for multiple technologies 
      * DR for the Enterprise SQL should be well documented and tested already 
  * I will be using Branch office Domain Controllers as Distribution Points  
    * This is pretty normal where the Domain Controller has available resources, and no other hardware is available on the branch office for the task. 
    * If the AD team and Security Team are part of a different group, they will need to be engaged early in the process to ensure everyone is on-board with the approach. 
    * The Agent account used of communicating between CM Site roles must also be a Domain Admin to enable Propagation and configuration when using Domain Controllers as site servers. 
    * This account will be required for the life time of the deployment, to ensure the roles hosted on the Domain Controllers are keep up to date. 
  * WSUS Server should be a dedicated server for System Center and is critical for deployments  
    * To reduce required storage WSUS might be configured to only download XML definitions until packages are approved (manually or automatically e.g. Virus Definitions)  
    * WSUS will only be managed from the Configuration Manager Console  
    * WSUS can be shared with Virtual Machine Manager. 
  * Central Administration Site should be deployed if there is the even slightest chance that the organisation structure might change  
    * Without CAS a restructure is very likely to be a 100% teardown and restart 
    * CAS is not recommended where the org has no DBA or idea of SQL Replication ! 

# Infrastructure Structure

Using a Hub and Spoke configuration, with 2 Hubs and about 45 spokes/branch offices.

  * CM1 - Single server hosting the Central Administration Site, connected to a dedicated instance on the SQL Cluster 
  * CM2 - Server which be used for hosting the Primary Site (but not a Distribution point or Management Point role) 
  * CM3 - Server with Windows Update Services 3.2, and enabled as the Distribution point and Management Point for the Primary site in the Hub location. 
  * Each of the spokes/branch offices contains a managed Domain Controller with enough available capacity to also double as the Distribution point of the Primary Site in the branch office 

# Implementation

My first stop on this tour will be to deploy the AD Schema updates, along with the new AD Container for Configuration Manager into our production forest, along with prepping the servers for the initial software installation. Our initial business objective for implementing this solution is to replace our existing Anti-Malware environment with System Centre 2012 Endpoint Protection. Once this has being completed, we have a number of other goals already defined, but all that in good time.

Be sure to let me know of any assumptions you might be making as you implement Config Mgr 2012 in the Comments
