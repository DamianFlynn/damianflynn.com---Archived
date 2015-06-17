---
author: Damian.Flynn
comments: true
publishDate: 2012-12-10 23:31:00+00:00
template: post.hbt
slug: ad-forest-consolidation-overview
title: AD Forest Consolidation Overview
wordpress_id: 695
categories:
- Blog
tags:
- AD
- WS/SC
---

As companies continue to evolve, one of the most common tasks we face in IT, is to consolidate infrastructure environments; and many times with very tight windows and little to no budget to accomplish the defacto goals, that are of course

  * Decommission non-required systems and hardware  
  * Migrate all users to the main Active Directory and Exchange Environments  
  * Be sure not to cause issues for the users  
  * Clean up the artefacts left over, once Integrated 

As it has been a number of years since I have needed to execute this process, I am going to take the opportunity to get my notes in order, and reflect the environments which are currently in fashion, which in most of my recent experience are typically Windows 2008 servers with Exchange 2010. With a little tuning the process will adopt to addressing both newer and older environments, but until I have the pleasure of needing to go back to the archives, I am going to keep them closed as they should be for now.

My target environment is a Mixed mode Windows 2008R2 / Windows 2012 setup, with the messaging system currently Exchange 2010. I am running a Hub/Spoke setup, so all my attention in the target environment will be on the Hub, as we make adjustments so that we can consolidate and migrate the new source in.

We have a lot to consider, so I am going to break the process into blocks, some of which will need to be completed by my colleagues in different areas; mainly the Networking team responsible to integrating the environment, along with the IT Support representatives who maintain the source environment. The high level list below will serve as a guide to the steps we will address during the course of this exercise.

**Setup and Test Cycle**   
  
**Prerequisites**   


  1. Router tunnels up to the Site with the exchange server   

  2. Clients Minimum requirement   


    1. Windows XP SP3 
    2. Office 2007 SP2   

  3. Physically Deploy new Target Domain Controller (DC) to the new Location Field Offices (Site's)   

  4. List of Users/Computers/Software.   


**Prepare**   


  1. Promote the new DCs into the Target Domain   

  2. Define the Field Offices as Site in the Target AD   

  3. Configure DNS on the Target and Source AD environments to self-resolve   

  4. Update Source DHCP scopes with Target environment DNS suffix search lists   

  5. Optional - Define any special DNS Records in Source Domain   


    1. KMS SVR Records   

  6. Establish the Forest Transitive Trust between Source and Target environments   


    1. Repeat Per Source Forest   

  7. Assign Target Forest Admins, as Administrators to the Source Forest   


    1. Repeat Per Source Forest   


**Active Directory Migration Framework**   


  1. Target Forest   


    1. Install the Free Microsoft Active Directory Migration Tools (ADMT) to a Management Station   

  2. Source Forest   


    1. Optional - Install the ADMT Password Export utility   


**Exchange Migration Framework**   


  1. Source Forest   


    1. Enable the Exchange Server Mail Replication Service Proxy   

  2. Cross Certify Exchange in each forest (Only necessary when using Self Signed Certs)   

  3. Target Forest   


    1. Add Source Domains to Authorised Domain List 
    2. Configure Relay to Source Domain (For Mailboxes not hosted on Target)   


**Validation**   


  1. Source forest

    1. Create Test Users and Exchange Mailboxes  
    2. Use Virtual Machines (Windows XP / 7 - Office 2007 / Office 2010) as Pseudo Clients for the Test Users 
  2. Target   


    1. Use the Exchange script _Prepare-MoveRequest.ps1_ to move Source Test Accounts to target 
    2. Use ADMT to migrate both the _Password_ and SID, for the Test account, optionally Enable account 
    3. _(Pending 2.A) Clear User Must Change Password at next logon setting_
    4. Migrate the Content of the Mailbox _Move-MailboxRequest_   

  3. Source (VM)   


    1. Set PRI login scripts for Profile migrations _(PRI indicated this might not be required)_
    2. _Outlook Profile Path - Manual / Automatic_   

  4. Source (Physical with Dummy Accounts)   


    1. Set PRI login scripts for Profile migrations _(PRI indicated this might not be required)_
    2. _Outlook Profile Path - Manual / Automatic_   


Before we commence with the preparation for our task ahead, we will work with the respective teams to ensure that they have all the pre-requisites addresses, or an action plan in place so that our job will run as smooth as possible.

In the next post, we will being with our preparation work
