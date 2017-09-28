---
author: Damian.Flynn
comments: true
date: 2012-05-11 22:16:00+00:00
layout: post
slug: prepping-prod-ad-for-sccm-2012
title: Prepping Prod AD for SCCM 2012
wordpress_id: 348
categories:
- Blog
tags:
- AD
- SCCM
- WS/SC
---

As already presented, I am going to be implementing a Central Administration Site, along with a single primary site in my production environment. This initial build will use two instances from the pre-existing SQL Cluster, and 3 machines, one dedicated to the Central Site and the others for the Primary site. As this is production, the Active Directory and Certificate Services are already in place, however we will need to extend the Schema for Configuration Manager, and create its Container in the System OU. All my servers are created with Windows 2008 R2 Server with SP1 and current Hot Fixes installed, and functioning members of the production domain.

## AD Permissions

As the primary site will be leveraging my Domain controllers which are located in each of the branch offices as the local Distribution Point, all of which will be part of the Primary Site, I need to provide the Primary Site access to these systems.

The best way I could find for doing this was to add the Computer Account of the Primary Site Server, to the Domain Administrators group in my Active Directory. This permission then enables site roles to be deployed as required using the Primary Servers account, secure in the knowledge that this account has the necessary permissions to configure the roles required on the domain controllers automatically, with out any additional manual intervention.

## AD Container

SCCM has the ability to use AD as a database for locating other servers which are part of the SCCM environment, however to enable this functionality, a container needs to be created in the _System _OU**_ _**called _System Management** **_and then delegated permission to the SCCM Servers to update this container.

### Create the Container

Launch the **ADSI Edit **tool (_Start_ –> _Run_ –> _adsiedit.msc_), and Connect to the Default Naming context on your Active Directory Domain; ensure you are using an account with privileges (for example _Domain Administrator_), so that you can create the System Management container.

Expand the _Default Naming Context_ –> _DC=xxx,DC=xxx,DC=xxx_ branch. Locate and right click on the container named _CN=System_, on the context menu select _New_ -> _Object_

[![image_thumb](/assets/posts/2014/02/image_thumb_thumb4.png)](/assets/posts/2014/02/image_thumb15.png)

The _Create Object _dialog will be presented, in the _Select a class_ list, choose the option _Container_ and click _Next_

[![image_thumb1](/assets/posts/2014/02/image_thumb1_thumb4.png)](/assets/posts/2014/02/image_thumb16.png)

On the second page, in the _Value_ text box, enter **_System Management_** and then click on _Next_

[![image_thumb2](/assets/posts/2014/02/image_thumb2_thumb5.png)](/assets/posts/2014/02/image_thumb25.png)

Finally, we just need to click on _Finish_ to complete creating the new container.

[![image_thumb3](/assets/posts/2014/02/image_thumb3_thumb6.png)](/assets/posts/2014/02/image_thumb36.png)

You can now close the **ADSI Edit **tool

### Delegate permission to the container

Launch the **Active Directory Users and Computers **tool (_Start_ –> _Run_ –> _aduc.msc_), ensure you are using an account with privileges (for example _Domain Administrator_), so that you can delegate permission to the System Management container.

Expand the _System_ branch. Locate and right click on the container named _System Management_, on the context menu select _Delegate Control…_

[![image_thumb4](/assets/posts/2014/02/image_thumb4_thumb3.png)](/assets/posts/2014/02/image_thumb43.png)

The Delegation of Control Wizard is presented, click _Next_. On the _User or Groups_ page, click _Add_.

[![image_thumb5](/assets/posts/2014/02/image_thumb5_thumb3.png)](/assets/posts/2014/02/image_thumb54.png)

In the _Browse Dialog_, click the button _Object Types_, select _Computers_ and click _OK_. In the server name field enter the names of the System Centre 2012 servers which will be installed and configured as the Site Servers, then click on _Check Names_, and finally click _OK_. Back on the _User or Group_ page click _Next_

[![image_thumb6](/assets/posts/2014/02/image_thumb6_thumb2.png)](/assets/posts/2014/02/image_thumb62.png)

On the _Tasks to Delegate_ page, Choose _Create a Custom Task to Delegate_, click _Next_

[![image_thumb7](/assets/posts/2014/02/image_thumb7_thumb2.png)](/assets/posts/2014/02/image_thumb72.png)

On the _Active Directory Object Type_ page, select the option _This folder, existing objects in this folder and creation of new objects in this folder_ and click _Next_

[![image_thumb8](/assets/posts/2014/02/image_thumb8_thumb2.png)](/assets/posts/2014/02/image_thumb82.png)

On the _Permissions_ page, enable the check box next to all 3 permission types

  * General,  
  * Property-Specific  
  * Creation-deletion of specific child objects 

In the _permissions_ list box, _enable_ the check box _FULL CONTROL_, then click _Next_

[![image_thumb9](/assets/posts/2014/02/image_thumb9_thumb1.png)](/assets/posts/2014/02/image_thumb92.png)

And Finally, read the summary, and click on _Finish_

[![image_thumb10](/assets/posts/2014/02/image_thumb10_thumb.png)](/assets/posts/2014/02/image_thumb101.png)

That’s that done, now close out of ADUC.

Important reminder – As you add new site servers repeat this task – or just create an AD Group and delegate it the permissions needed, and be sure to keep that group up to date with each new site server change you make 

## AD Schema

Last step in the AD perp work is the Schema. this is very simple, but you must have the correct permissions to do this, and since this is the Schema, if you have procedures in your organisation for applying these type changes, be sure to follow them!

Logon to a Domain Controller (not mandatory, but a good practice) with an account that has privileges to extend the AD schema. Next, Launch a _**Command Shell**_, with administrative privileges (_right click_ on _command_, and select _run as administrator _from the context menu)

Now, Navigate to your SCCM 2012 Media, and into the folder _SMSSetupBinx64. _From here we will run the utility **Extadsch.exe**

Assuming you have the correct permissions, and all runs to plan, you will see similar to the following presented:

_<05-01-2012 04:05:04> Modifying Active Directory Schema - with SMS extensions.   
<05-01-2012 04:05:04> DS Root:CN=Schema,CN=Configuration,DC=corpnet,DC=liox,DC=org   
<05-01-2012 04:05:05> Defined attribute cn=MS-SMS-Site-Code.   
<05-01-2012 04:05:05> Defined attribute cn=mS-SMS-Assignment-Site-Code.   
<05-01-2012 04:05:06> Defined attribute cn=MS-SMS-Site-Boundaries.   
<05-01-2012 04:05:06> Defined attribute cn=MS-SMS-Roaming-Boundaries.   
<05-01-2012 04:05:06> Defined attribute cn=MS-SMS-Default-MP.   
<05-01-2012 04:05:06> Defined attribute cn=mS-SMS-Device-Management-Point.   
<05-01-2012 04:05:06> Defined attribute cn=MS-SMS-MP-Name.   
<05-01-2012 04:05:06> Defined attribute cn=MS-SMS-MP-Address.   
<05-01-2012 04:05:06> Defined attribute cn=mS-SMS-Health-State.   
<05-01-2012 04:05:06> Defined attribute cn=mS-SMS-Source-Forest.   
<05-01-2012 04:05:06> Defined attribute cn=MS-SMS-Ranged-IP-Low.   
<05-01-2012 04:05:07> Defined attribute cn=MS-SMS-Ranged-IP-High.   
<05-01-2012 04:05:07> Defined attribute cn=mS-SMS-Version.   
<05-01-2012 04:05:07> Defined attribute cn=mS-SMS-Capabilities.   
<05-01-2012 04:05:07> Defined class cn=MS-SMS-Management-Point.   
<05-01-2012 04:05:07> Defined class cn=MS-SMS-Server-Locator-Point.   
<05-01-2012 04:05:07> Defined class cn=MS-SMS-Site.   
<05-01-2012 04:05:07> Defined class cn=MS-SMS-Roaming-Boundary-Range.   
<05-01-2012 04:05:08> Successfully extended the Active Directory schema.   
<05-01-2012 04:05:08> Please refer to the ConfigMgr documentation for instructions on the manual   
<05-01-2012 04:05:08> configuration of access rights in active directory which may still   
<05-01-2012 04:05:08> need to be performed. (Although the AD schema has now be extended,   
<05-01-2012 04:05:08> AD must be configured to allow each ConfigMgr Site security rights to   
<05-01-2012 04:05:08> publish in each of their domains.)_

Great, painless.

Now we can focus on getting the servers installed, that's going to take a bit longer
