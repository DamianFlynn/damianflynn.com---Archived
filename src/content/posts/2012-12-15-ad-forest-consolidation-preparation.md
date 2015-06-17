---
author: Damian.Flynn
comments: true
publishDate: 2012-12-15 23:29:00+00:00
template: post.hbt
slug: ad-forest-consolidation-preparation
title: AD Forest Consolidation - Preparation
wordpress_id: 707
categories:
- Blog
tags:
- AD
- WS/SC
---

In the previous post, we considered the tasks which must be completed in order to run a successful consolidation of a Source Active Directory and Exchange environment into our target infrastructure. With the pre-perquisites under control of the relevant teams we can now begin to focus on the activities which we must complete as we prepare to execute the migration.

As illustrated in the previous post, I am breaking the job into smaller chunks so that we can take bites from the apple, and measure progress. This post will focus on the preparation of our Active Directory environments.

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


# Promote the new DCs

In my environment I mentioned that I deploy in a hub and spoke configuration, with each field office considered a spoke. My rule of thumb for the deployments is to physically host a domain controller for the target domain in the field office if we have 20 or more users; otherwise the field office will authenticate remotely.

As the final objective in consolidation is to ultimately remove any trace of the original forest and its domains, deploying our target forest domain controllers is a great place to start. This will ensure that the users on these sites have a good login experience, and having a domain controller from the target forest is advised when we need to focus on mailbox migrations, etc. The hardware we will use should meet the minimum specification your organisation has agreed on, and may be an existing server, or a new purchase.

I am not going to cover the process of promoting a server to a domain controller, as if this is not something you are comfortable with then the rest of this project is going to be a real challenge.

# Define the AD Sites in the Target Forest

To ensure the AD replication and login experience is optimal for the systems in our field offices, we should ensure that the AD Sites are defined correctly in the target forest. To accomplish this we just need to know what the production IP subnet will be in each of the field offices, the table should act as a guide. If you are unsure of the network details for your field offices, then you will need to co-ordinate with your network engineers, or the IT Team responsible for the source environment.

<table style="border-collapse: collapse" border="0" > <tbody valign="top" > <tr >
<td style="border-top: 0.5pt solid; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >**Site Name**
</td>
<td style="border-left-style: none; border-top: 0.5pt solid; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >**Site IP Network**
</td></tr> <tr >
<td style="border-top-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >Miami
</td>
<td style="border-top-style: none; border-left-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >10.99.1.0/24
</td></tr> <tr >
<td style="border-top-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >Denver
</td>
<td style="border-top-style: none; border-left-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >10.100.1.0/24
</td></tr></tbody></table>

## Define a new AD Site

In the Active Directory Sites and Services snap-in we will proceed to create an entry for every field office that will be hosting a domain controller for the target forest in the final consolidated configuration.

If you have field offices which will not be hosting a local domain controller, then just complete Step 2 in this process and simply assign the IP subnet for that field office, with a field office which will be hosting a domain controller and that is network close (low latency – good bandwidth), as this will direct the clients in that field office to prefer to use the domain controller in the assigned site.

  1. Right click on the **Sites** node, and from the context menu select the option **New Site… **

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon1.png)

    1. The **New Object – Site** dialog will be presented

      1. In the **Name **text box, supply the name of the new AD Site (Field Office)  
      2. In the **Site Link **list, select the site link you will use (Note, you can change this later, but you must select one now to proceed) 

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon2.png)

    2. After clicking **Ok **you will be presented with a confirmation dialog

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon3.png)

  2. Back on the Active Directory Sites and Services tree, Right click on the **Subnets** node, and from the context menu select the option **New Subnet… **

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon4.png)

    1. The **New Object – Subnet **dialog will be presented

      1. In the **Prefix **text box, supply the network subnet for the new AD Site (Field Office)  
      2. In the **Site Name **list, select the site which this new Subnet will be associated to. 

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon5.png)

      1. Click **OK **to complete the configuration 
  3. Back on the Active Directory Sites and Services tree, Right click on the **IP** node, and from the context menu select the option **New Site-Link… **

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon6.png)

    1. The **New Object – Site Link **dialog will be presented

      1. In the **Name **text box, supply the Name of the Link (Field Office to Hub)  
      2. In the **Sites in the Site Link **list, select the name of the spoke and hub which will be managed in this link. 

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon7.png)

      1. Click **OK **to complete the configuration 
  4. Again on the Active Directory Sites and Services tree, Right click on the newly created site link (eg **Miami and Datacenter) **node, and from the context menu select the option **Properties… **

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon8.png)

    1. The **New Object – Site Link **dialog will be presented

      1. In the **Description **text box, supply a description for this site links purpose, e.g. Replication between Spoke and Hub  
      2. In the **Sites in the Site Link **list, ensure the correct sites are listed for this link, and remove or add as required.  
      3. In the **Cost **field, set a replication cost as per your environments configuration. I am using a flat hub and spoke so the default 100 is fine  
      4. In the **Replicate every **field, set the time in minutes between replications. This will depend on your environment conditions. I am setting this for 15 Minutes 

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon9.png)

      1. Click **OK **to complete the configuration 

You will repeat this process or site definitions and IP subnet associations for all your field offices which will be migrated to the new Target environment.

# Configure DNS Lookups between Source and Target Forest

An essential element of migration and consolidation is ensuring that resources from both the source and target environments are easily resolvable. This will enable users to start accessing services, while also permitting us to progress to the next stage, the establishment of trusts.

The exercise of actually configuring the DNS servers is quite straightforward, but as per the previous example we should first create a little inventory so that we know what domains we will want to define in each of the respective forests.

<table style="border-collapse: collapse" border="0" > <tbody valign="top" > <tr >
<td style="border-top: 0.5pt solid; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >**Forest [Source/Target]**
</td>
<td style="border-left-style: none; border-top: 0.5pt solid; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >**Domain Name**
</td></tr> <tr >
<td style="border-top-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >Target
</td>
<td style="border-top-style: none; border-left-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >DigiNerve.net
</td></tr> <tr >
<td style="border-top-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >Target
</td>
<td style="border-top-style: none; border-left-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >DamianFlynn.com
</td></tr> <tr >
<td style="border-top-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; border-left: 0.5pt solid; padding-right: 7px" >Source
</td>
<td style="border-top-style: none; border-left-style: none; border-right: 0.5pt solid; border-bottom: 0.5pt solid; padding-left: 7px; padding-right: 7px" >Decommission.local
</td></tr></tbody></table>

## Define a new DNS Zone

For each of the domains in our list we will need to repeat the following process. If the domain is listed as being hosted on the target domain, then we will be creating a pointer in the source forest; and vice versa, If the domain is listed on the source forest we will be defining a lookup on the target domain.

Login to a server in the forest you are about to create the point in, using a server which is hosting the DNS services. Typically this will be a Domain Controller, and you will use an Administrative account. To keep processes simple we will make these changes AD integrated, so that all domain controllers, (and thus hopefully indirectly All DNS servers) will be updated with the new pointers. Note that you will need to check the environment to be sure that AD Integrated is enough, and also working!, alternatively you might need to repeat this process on every DNS server in the respective forest.

Start by launching the DNS Server snap in.

  1. Expand the tree, until you can see the **Forward Lookup Zones **branch. Then Right click the node, and select the option **New Zone… **

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon10.png)

    1. The **New Zone Wizard** dialog will be presented, read the welcome, and then click Next  
    2. On the **Zone Type **page, select the option **Stub zone** and also ensure the option **Store the zone in Active Directory **is checked, then click on Next

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon11.png)

    3. On the **Active Directory Zone Replication Scope **page, select the option replicate data **To all DNS servers running on the domain controllers in this forest**, then click Next

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon12.png)

    4. On the **Zone Name **page, in the **Zone name **text field, provide the name of the DNS Zone you are defining the pointer for. In my example I am running the wizard on the Target Forest, and setting up the pointer to my source domain which is called **_decommission.local_   
**

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon13.png)

    5. On the **Master DNS Servers **page, in the **Master Servers** list type the IP address of a DNS server hosting the domain name entered in the previous page. In my example, the domain was called **_decommission.local_** which is hosted on the source domain controller, with an address of **_172.16.1.121_**. You can provide additional hosting DNS server IPs in this list if you desire.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon14.png)

    6. The wizard will then present the summary page, before creating the Stub configuration when you click on Finish  
    7. ![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon15.png)
  2. Expanding the **Forward Lookup Zones **list on the DNS server, we should now see the new Stub with its glue pointing to the source DNS servers.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon16.png)

As outlined at the beginning of this section, we will need to repeat this exercise for each domain name hosted on our respective source and target forests

# Forest Transitive Trust

An essential element of migration and consolidation is ensuring that resources from both the source and target environments are easily resolvable. This will enable users to start accessing services, while also permitting us to progress to the next stage, the establishment of trusts.

Start by launching the **Active Directory Domains and Trusts** snap in.

  1. Expand the tree, until you can see the domain name, e.g. **Diginerve.net **node. Then Right click the node, and select the option **Properties **

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon17.png)

    1. The domain **Properties** dialog will be presented, select the **Trusts** tab, the click on the **New Trust…** button

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon18.png)

    2. The **New Trust Wizard **will then be presented. On the welcome page, just click on Next  
    3. The **Trust Name **page will be presented. In the **Name **field, type the name of the forest you are creating the trust with. In my example I am working on the Target forest (DigiNerve.net) and will be creating the trust with the Source forest (decommission.local).

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon19.png)

    4. On the **Trust Type **we will be creating a **Forest trust.   
**

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon20.png)**   
**

    5. The **Direction of Trust **page is next to be presented, on this page we will be defining that the new trust to be created will be a **Two-Way **trust.**   
**

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon21.png)**   
**

    6. Next, the wizard will show the **Sides of trust **page. This time we will select to create the trust on **Both this domain and the specified domain.   
**

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon22.png)**   
**

    7. On the **User Name and Password **page, we are requested to provide an administrative account detail for the source domain, as the wizard will use these to create and later validate the trust on source side of the configuration also.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon23.png)**   
**

    8. On the **Outgoing Trust Authentication – Local Forest **page, we are going to allow the Target Forest user accounts **Forest-Wide authentication** access to the Source Forest for authentication. This might not be desired or required, so selecting the option Selective authentication will allow you to restrict the accounts which have access on to the source forest.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon24.png)

    9. On the **Outgoing Trust Authentication – Specified Forest **page, we are going to allow the Source Forest user accounts **Forest-Wide authentication** access to the Target Forest for authentication. Again you might not want this, as the final goal is to have the source users utilize their new Target Forest accounts, however depending on the size of the migration this might be useful for delegating access to the current source accounts access to resources on the target forest.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon25.png)

    10. Finally, the **Trust Selections Complete **page will be presented, with a summary of the selections we have made so far. We can take this opportunity to review the choices prior to creating the trusts.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon26.png)

    11. The next page should be **Trust Creation Complete **assuming everything so far has worked to plan. At this stage we will have trusts established in both forests. Nice work!

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon27.png)

    12. Before the wizard completes, we have the option to **Confirm Outgoing Trust **to validate that the trust has being created successfully, this is well worth agreeing to

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon28.png)

    13. Similarly, we are next offered the option to **Confirm Incoming Trust **to validate the reverse direction of the trust has also be created without issue

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon29.png)

    14. After a few moments, the Wizard will run a number of tests on the trusts which were created earlier, to validate that these have being successfully established and working in both directions, to and from the source and target forests.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon30.png)

  2. Back in the Domain **Properties **dialog we will now see that the source domain is listed as trusting and trusted with the target domain.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon31.png)

  3. For sanity, on the Source Forest launching the **Domains and Trusts** Console, we should also see that the wizard created the second side to the trust also, presenting that the target domain is trusting and trusted.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon32.png)

That should have us now configured with inter forest trusting, ready to permit us to delegate permissions to our existing accounts in the target forest, so that we can fully manage the source environment. In addition we did not restrict the accounts allowed to be used over the trust, we can grant access to resources in each respective forest to accounts in the respective forests; this you likely will not want to use, but it is an option if required.

# Assign Target Forest

The last step in this batch is to delegate access to accounts in the Target Forest, permissions in the Source Forest. This permits us to simplify the process of migrating Source accounts into the target environment, along with general management techniques.   


## Grant Administrative Permissions to the Source Forest

Add the Administrator account from the target domain to the Source Forests administrator's security group

Start by launching the **Active Directory Users and Computers** snap in.

  1. Expand the tree, until you can see the organisation units, e.g. **decomission.local **node. Then click the node, to list all the objects within the container**   
**
  2. Locate the **Administrators **group, and right click the object and select the **Properties **option on the context menu.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon33.png)

    1. The **Administrators**   
**Properties** dialog will be presented, which will present the list of accounts and groups which are offered this security access. We will add our Target accounts to this group, therefore granting administrative permissions to the source forest domain. Click on the **Add…** button

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon34.png)

      1. The **Select Users, Contacts, Computers, Service Accounts, or Groups **dialog**   
**will then be presented.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon35.png)

      2. In the **Enter the object name to select **field, type the name of the accounts from the Target Forests domain we will be delegating the access to  
      3. Click on the **Locations… **button, to present the Locations dialog, from which we can select the **Target Forest** (Diginerve.net) and click OK to accept

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon36.png)

      4. On the **Select Users, Contacts, Computers, Service Accounts, or Groups **dialog, click on the button **Check Names **to have the previously typed name validated, and marked with and underscore.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon37.png)

      5. Click on OK to add the new user to members list for the group 
    2. The **Administrators Properties **page will be updated, and the new member will be listed in the dialog. If additional users should be delegated to, then we can repeat this process.  
    3. Once you are happy with the list, click to **Apply** the setting change and click **OK **to dismiss the dialogue.

![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121112_1643_ADForestCon38.png)

# Final Checks

At this point the two forests are not trusting, and users can be granted privileges to resources in each forest. This effectively we will not really focus on communicating to the users, but use it as a foundation to flow objects between the environments as we conduct the migration. Spending a little time to test was you have completed at this state is a good thing, that will help ensure you are comfortable with basic environments.

In the next posting we will take a look at the free Microsoft Active Directory Migration tool and get it installed to the environment.
