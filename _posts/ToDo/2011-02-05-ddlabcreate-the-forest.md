---
author: Damian.Flynn
comments: true
date: 2011-02-05 23:17:00+00:00
layout: post
slug: ddlabcreate-the-forest
title: DDLAB–Create The Forest
wordpress_id: 55
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

Welcome back, at this point we should have 3 servers ready for our lab build which will each have received an installation of Windows 2008R2, had their network connections Patched up, and IP addresses assigned as per our plan.

This time we are going to focus on getting the basic domain services online so that we can begin with the foundation for our lab. The first step in this path will be installing AD on our main server and setting up a DHCP server for our clients

# PowerShell and the CLI

As i have to rebuild the Lab deployment far to often, I am going to do as much as i can from the shell as that will save me some time clicking wizards, and installing services Like Active Directory and DHCP are not really overly challenging for a small setup like ours.

To get started I am going to launch my PowerShell console and Load up the Server Manager module so that we can install the roles and features  
    
    Import-Module ServerManager
    Get-Command –module ServerManager
    Get-WindowsFeatures
    Add-WindowsFeature ADDS-Domain-Controller,DHCP




[![image](/assets/posts/2011/02/image_thumb11.png)](/assets/posts/2011/02/image11.png)




## Active Directory




Setting up Active Directory for the Lab is actually going to be pretty easy since this is going to be new clean forest and we have no worries about other forests of domains to be concerned with.




I am going to set the following settings:






  * Domain Name: **damianflynn.demo** 

  * DNS Name: **damianflynn.demo** 

  * Netbios Name: **DF-DEMO** 

  * Administrator Password: **_Use the current Local Administrator Password_** 

  * Forest Level: **Windows 2008 R2** 

  * Domain Level: **Windows 2008 R2**



Issue the following command, and after a few minutes the servers will reboot for us. After which we will be logging in as the Domain Administrator.
    
    dcpromo /unattend /InstallDns:yes /replicaOrNewDomain:domain /newDomain:forest /newDomainDnsName:damianflynn.demo /DomainNetbiosName:df-demo /databasePath:c:ntdsdata /logPath:c:ntdslogs /sysvolpath:c:windowssysvol /safeModeAdminPassword:D1saster! /domainLevel:4 /forestLevel:4 /rebootOnCompletion:yes




After rebooting, we will have a new Domain Controller, DNS server and a DHCP server ready for configuring.




## DHCP




Let’s configure the DHCP Servers scope so that we are prepared for any clients which might show up on the network needing a non static address, and more importantly we will make use of this a little later when we look at the Microsoft Deployment Toolkit.




in the following script we will complete these steps






  * Configure the DHCP Server Service for Automatic Start up 

  * Start the DHCP Server Running now 

  * Authorize the DHCP in our new Active Directory 

  * Configure the DHCP Server: 


    * Set the Scope for our lab to _172.16.100.0/24_ and call it _DF-Demo-Scope_ 

    * Add a Pool of addresses for _172.16.100.150_ to _172.16.100.199_ 

    * Set the Default Gateway (_Option 003_) to _172.16.100.1_ 

    * Set the DNS Servers (_Option 005_) to _172.16.100.10_ (This Server) 

    * _Activate_ the Scope 
    
    set-service dhcpserver –startuptype automatic –status running
    
    netsh dhcp add server LAB-SVR01 172.16.100.10
    
    netsh dhcp server add scope 172.16.100.0 255.255.255.0 DF-Demo-Scope Demo-Scope
    
    netsh dhcp server scope 172.16.100.0 add iprange 172.16.100.150 172.16.100.199
    netsh dhcp server scope 172.16.100.0 set optionvalue 003 IPADDRESS 172.16.100.1
    
    netsh dhcp server scope 172.16.100.0 set optionvalue 005 IPADDRESS 172.16.100.10
    
    netsh dhcp server LAN-SVR01 scope 172.16.100.0 set state 1




Now, that was quick right.




## Organisational Units




Right, last task for the day, is to create some Organisational Units to host some services, users and computers for the rest of our deployment.
    
    Import-Module ActiveDirectory 
    
    New-ADOrganizationalUnit -Name OU=Operations,dc=damianflynn,dc=demo
    New-ADOrganizationalUnit -Name OU=Users,OU=Operations,dc=damianflynn,dc=demo
    New-ADOrganizationalUnit -Name OU=Services,OU=Operations,dc=damianflynn,dc=demo
    New-ADOrganizationalUnit -Name OU=Computers,OU=Operations,dc=damianflynn,dc=demo
    
    New-ADUser -Name "Damian Flynn" -SamAccountName Damian.Flynn -Description "Damians User Account" -Enabled $true -AccountPassword (Read-Host -AsSecureString "Password") -Path "OU=Users,OU=Operations,dc=damianflynn,dc=demo"
