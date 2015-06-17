---
author: Damian.Flynn
comments: true
publishDate: 2015-03-04 17:22:16+00:00
template: post.hbt
slug: adfs-publishing-via-azure-traffic-manager
title: ADFS Publishing via Azure Traffic Manager
wordpress_id: 6261
categories:
- Blog
---

Start with a connection from your workstation to the Traffic Manager, this may require that you use a settings file if you are not configured for federated identity, which assuming this is your first Federation Service to publish publically, might well be the case.


## Azure Using a Microsoft Accounts


If you are using a Microsoft Account for your authentication, then we will need to get our Azure Publishing Settings file, and place it on your workstation. To locate this file, you can use the following command which will open your browser.

Once the browser is open, you will need to authenticate with your account details, after which you will be provided with a link to download the setting file


    Get-AzurePublishSettingsFile


Continue to download the Settings XML file, to your machine, then back on the PowerShell prompt so that we can register this account information on our workstation


    dir .\Downloads

        Directory: C:\Users\Damain\Downloads

    Mode                LastWriteTime     Length Name
    ----                -------------     ------ ----
    -a---         2/17/2015   8:55 AM       7443 2-17-2015-credentials.publishsettings


    Import-AzurePublishSettingsFile '.\ 2-17-2015-credentials.publishsettings' –verbose

    VERBOSE: Setting: Microsoft.Azure.Common.Extensions.Models.AzureSubscription as the default and current subscription.
    To view other subscriptions use Get-AzureSubscription


    Id          : d1d475c9-5a29-4a54-a36c-aa257705612f
    Name        : My Sandbox
    Environment : AzureCloud
    Account     : Cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4
    Properties  : {[SupportedModes, AzureServiceManagement], [Default, True]}

    Id          : 3719257d-381a-45ca-a7aa-ea741ab966e1
    Name        : My Production
    Environment : AzureCloud
    Account     : 3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4
    Properties  : {[SupportedModes, AzureServiceManagement]}



Assuming there are no issues with the XML file, we should see any subscriptions which are associated with the account presented back to us, after the file has being imported, as you can see in the above example.

Next, let's check what accounts were imported as part of this process


    Get-AzureAccount

    Id                                       Type        Subscriptions                          Tenants
    --                                       ----        -------------                          -------
    Cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4 Certificate d1d475c9-xxxx-xxxx-xxxx-xxxxxxxx612f
    3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4 Certificate 3719257d-xxxx-xxxx-xxxx-xxxxxxxx66e1





## Azure Traffic Manager

Setting up the Azure Traffic Manager is quite trivial, all we need to know is the FQDN which we will publish the service as, note that this is going to terminate with the mandatory trafficmanager.net suffix, and we will alias this with our corporate DNS later.


### Geo-Awareness
As azure is distributed, we have the ability to take into account geo-balancing with our implementation, educating Azure of where or services are hosted, in relation to the Azure points of presence over the globe. To determine the current locations of Azure we can use the following PowerShell commands


    get-azurelocation | select Name

    Name
    ----
    West Europe
    North Europe
    East US 2
    Central US
    South Central US
    West US
    North Central US
    East US
    Southeast Asia
    East Asia
    Japan West
    Japan East
    Brazil South





### Selecting the Subscription to work with


We will begin by selecting the Azure Subscription we will be adding this service to; this is of course redundant if you only have a single subscription, as it will be selected by default; but when you have multiple subscriptions, none of these will be selected automatically.

To select your subscription which you are going to work with, we can start with the simple PowerShell command


    Select-AzureSubscription -SubscriptionName "My Production"


### Add a new Traffic Manager Service


We will continue to manage the Traffic Manager from PowerShell, as the current Web UI will not permit us to manage services when we wish to use external endpoints; the portal will offer the ability to monitor the services however.

While creating a new Traffic Manager Service, we begin with a Profile which we will name with a friendly label to help identify the profile, in addition we will then define what the service will be published as (the domain name), the Load Balancing Method to use, a TTL for the service, and how to validate the keep alive on the endpoints of the service.


    $profile = New-AzureTrafficManagerProfile -Name "Production ADFS" -DomainName "mysts.trafficmanager.net" -LoadBalancingMethod "Performance" -Ttl 30 -MonitorProtocol "Http" -MonitorPort 80 -MonitorRelativePath "/adfs/probe"


In the example above the following options have being selected to support ADFS as a service

  * Name: Production ADFS
  * Domain Name: mysts.trafficmanager.net
  * Load Balancing Method: Performance
  * TTL: 30 seconds

Monitoring

  * Protocol: HTTP
  * TCP Port: 80
  * Relative Path: /adfs/probe


 >This path is published only from WAP Service on HTTP, and requires at least the August 2014 Windows 2012 R2 roll up to be deployed.

We can check the new profile has been added, using the following command


    Get-AzureTrafficManagerProfile

    Name                  DomainName                          Status
    ----                  ----------                          ------
    Production ADFS       mysts.trafficmanager.net            Enabled



To get specific details, we can just look at the values which have been returned to our handling variable, which was called $profile


    $profile

    TimeToLiveInSeconds : 300
    MonitorRelativePath : /
    MonitorPort         : 80
    MonitorProtocol     : Http
    LoadBalancingMethod : Performance
    Endpoints           : {}
    MonitorStatus       : Inactive
    Name                : Production ADFS
    DomainName          : mysts.trafficmanager.net
    Status              : Enabled





### Adding an endpoint to the new Service


With the service now registered, we can begin with the process of adding the endpoints of the services we are about to balance. As you add the endpoints, you will notice that you are not adding these with specific protocols, or ports; this is not currently configurable in the current version of Traffic Manager.

Adding external endpoints is possible only from PowerShell. The following command will allow us to add an endpoint to the profile, set its status as enabled, define the domain name of the service which we are adding, for example 'adfs-node1.diginerve.net', indicating the location of where we are hosting this service relative to the Azure locations.


    Add-AzureTrafficManagerEndpoint -TrafficManagerProfile $Profile -Status "Enabled" -Type "Any" -DomainName "adfs-node1.diginerve.net" -Location "East US"

    TimeToLiveInSeconds : 300
    MonitorRelativePath : /adfs/probe
    MonitorPort         : 80
    MonitorProtocol     : Http
    LoadBalancingMethod : Performance
    Endpoints           : {adfs-node1.diginerve.net}
    MonitorStatus       : Inactive
    Name                : Production ADFS
    DomainName          : mysts.trafficmanager.net
    Status              : Enabled



It is important to note that this change is not actually deployed to Azure Traffic Manager yet, but instead staged on your PowerShell session. This allows us to add multiple endpoints, and check the configuration is correct, by inspecting the variable's values, for example the following allows us to look closer at the Endpoints.


    $Profile.Endpoints

    DomainName        : adfs-node1.diginerve.net
    Location          : East US
    Type              : Any
    Status            : Enabled
    MonitorStatus     : Online
    Weight            : 1
    MinChildEndpoints :





### Publish the new Profile Settings


When we are ready to proceed with the publishing of the new settings, all we need to do is pass this details to the Set Azure Traffic Manager Profile command, as illustrated below


    $Profile | Set-AzureTrafficManagerProfile -verbose

    TimeToLiveInSeconds : 300
    MonitorRelativePath : /adfs/probe
    MonitorPort         : 80
    MonitorProtocol     : Http
    LoadBalancingMethod : Performance
    Endpoints           : {adfs-node1.diginerve.net}
    MonitorStatus       : CheckingEndpoints
    Name                : Production ADFS
    DomainName          : mysts.trafficmanager.net
    Status              : Enabled


### Query Azure Traffic Manager for its Current Configuration


Finally, we will loop back to Azure, and ask our PowerShell session to go back to Azure and query the current state of the traffic manager configuration.


    $Profile = Get-AzureTrafficManagerProfile -Name “Production ADFS”


And as before we can now inspect the values in the variable as returned from Azures Traffic Manager


    $Profile

    TimeToLiveInSeconds : 300
    MonitorRelativePath : /adfs/probe
    MonitorPort         : 80
    MonitorProtocol     : Http
    LoadBalancingMethod : Performance
    Endpoints           : {adfs-node1.diginerve.net}
    MonitorStatus       : Online
    Name                : Production ADFS
    DomainName          : mysts.trafficmanager.net
    Status              : Enabled



Now, that was pretty easy right!
