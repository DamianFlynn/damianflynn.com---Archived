---
author: Damian.Flynn
comments: true
publishDate: 2012-12-17 23:26:00+00:00
template: post.hbt
slug: ad-forest-consolidation-exchange-preparation
title: AD Forest Consolidation – Exchange Preparation
wordpress_id: 712
categories:
- Blog
tags:
- AD
- Exchange
- WS/SC
---

With the AD stud organised for now, we will move our focus over to the exchange side of the environment. To ensure a minimal disruption to the services there are a few steps which we need to consider and address as we prepare the environment to flow mails correctly before, during and after the migrations.

The topics we are going to cover are as follows

  1. Source Forest   


    1. Enable the Exchange Server Mail Replication Service Proxy   

  2. Cross Certify Exchange in each forest (Only necessary when using Self Signed Certs)   

  3. Target Forest   


    1. Add Source Domains to Authorised Domain List 
    2. Configure Relay to Source Domain (For Mailboxes not hosted on Target) 
    3. Configure Address Book Synchronisation Services 

# Exchange Server Mail Replication Service Proxy (MRSProxy)

On every Exchange 2010 CAS server this MRSProxy is installed, which is utilized to facilitate cross forest mailbox move requests, which are initiated from the exchange server in the trusted environment, generally the target forest. However, by default the feature is disabled, so we need to change that default and enable it on each exchange server hosting the CAS role in the source forest.

## Exchange 2010 SP2 and Newer

This task is quite easy to accomplish when run from the Exchange Management Shell , on one of the exchange servers in the source forest. Assuming the EWS web site is installed with default names, the following command will apply the change needed.
    
    <code>PS> Get-WebServicesVirtualDirectory –Identity "EWS (Default Site)" | Set-WebServicesVirtualDirectory –MRSProxyEnabled $True </code>







## Exchange 2010 Pre - SP2




We don't have the luxury of PowerShell if we are pre-SP2, in which case, we will be changing the setting in the configuration file. The setting in question is located in the following file _C:Program FilesMicrosoftExchangeV14ClientAccessexchwebewsweb.config_.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon1.png)




Open the file for exiting, for example Notepad, and search the file for the string **<MRSProxyConfiguration** which you should locate very close to the bottom




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon2.png)




Change the **IsEnabled **field from _"false"_ to _"true"_




You are going to have to repeat this on each CAS server manually.




## Latency and Timeouts




Before, we wrap up this configuration change, there is one additional consideration which we should take into account, the network infrastructure between the source and target exchange servers. Transferring mailboxes over an internet connection will introduce latency into the path, and we need to take this into consideration. The default Timeout value used by the MRSProxy is 1 minute, which is likely not going to be enough, certainly as I am moving data from a slow field office exchange environment to a centralised Datacenter infrastructure.




In this case, we should consider changing the timeout to a larger value, for example 15 Minutes. Again, this needs to be changed on each CAS server in the source environment, and unfortunately we need to do this one the old fashioned way. The setting in question is going to be located in the following file _C:Program FilesMicrosoftExchangeV14ClientAccessexchwebewsweb.config_.




Search the file, and locate the entry **<MRSProxyConfiguration** and change the **DataImportTimeout** from its default value of _"00:01:00"_ (1 minute) to our larger value (15 minutes) _"00:15:00"_. Then save the file.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon3.png)




For either or both of these changes to take effect, on each CAS server you now will need to restart the Web Server
    
    <code>IISReset </code>




# Add Source Domains to Authorised Domain List




Mail flow is a very important part of a migration effort, as we need to ensure that the messages continue to be delivered for our users in the source environment, during the life of the process.




Prior to conducting any work on the consolidation, the mail flow between environments will be typical out via the public internet scenario, with users in each environment effectively having mails addressed to their respective domains. This configuration will not work once we start integrating as users from the source domain will be migrated to the target exchange environment, and if we do not address mail flow, these users will be unable to receive mails for their original source domain address.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon4.png)




To deal with this scenario, we need to apply a change to the mail flow; in such a way that all inbound email for both the source and target domains are delivered now to the target exchange environment. We also need to ensure that the target exchange environment accepts the new domain as permitted (authorised), while also forwarding mails for addresses in the source domain to the source exchange server assuming that the user addressed in the email message is not already located in the target exchange environment.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon5.png)




The changes which need to be applied can be implemented in a reverse configuration,






  * Starting with creating a traffic flow from the target exchange environment to the source exchange environment. 

  * Authorizing the source domain addresses on the target exchange server 

  * Testing the target exchange server will deliver emails to the source address without issues 

  * Assigning an alias to a user on the target exchange environment with a source address, and testing exchange delivers to this alias also 



# Address Book Synchronisation Services




One final consideration in this setup is address books; in large migrations and consolidations, it is quite normal for the integration of the mail environments to be active for a long period of time. When this is the case we would normally want to extend the Exchange Address books on each environment with the list of users from the respective members list. To accomplish this, we would generally create contact objects in the respective environments for each user and using yet another tool keep these in synchronisation.




Synchronisation is important, as users in the source environment will over time be migrated out, and there address for deliver will change, but not in the normal sense. Although these users will continue to have their original SMTP address associated to them in the target environment, they will assume a new X.400 address. This address will be the cause of many support requests, as it is still the default address which Outlook will utilize when routing mails to exchange, and is also the preferred address for outlook to store in its cache.




Therefore, if [Damian.flynn@source.com](mailto:Damian.flynn@source.com) is moved to the target exchange environment, users on the internet will have no issues delivering mails, however other colleagues of Damian.Flynn from the source.com environment will likely see bounced mail messages in outlook, as it will try and now fail to deliver messages using the systems X.400 address.




There are 2 ways to address this






  * Make the users aware of the issue, and have them delete the cached address from their colleague, then resent the message after typing the full SMTP address out again (preferably the new target.com address, but not required), which outlook will then cache and use in the future. 

  * Use an Address book Synchronisation Service, which will address this issue each day by updating any address changes and distributing this back to exchange, and thus the clients 



In my scenario, I am going to migrate around 150 users and aim to complete within a week, so the effort involved in setting up the Address Book Synchronisation service is not sustainable for such a small and short project; and therefore I am going to skip this process. However, if you are working on a larger / longer project, you will want to take a look at Microsoft FIM, and its Exchange GAL functions to address this objective.




If I have a requirement in the future, I will document the steps involved also.




# Configure Relay to Source Domain




The first configuration we will look at establishing is the Send Connector between the target and source environments. This can be completed in PowerShell or from the User Interface on the target exchange. For illustrative purposes I will use the UI to create the link to our source exchange environment (_decommission.local_).




Working on the Exchange Management console, from the Target forest, expand the navigation tree to **Microsoft Exchange à Microsoft Exchange On-Premises à Organization Configuration àHub Transport**. Select the **Send Connectors **tab in the view pane






  * 


From the Actions list under Hub Transport, located and click **New Send Connector…   
**




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon6.png)**   
**



  * 


The **New Send Connector **wizard should now appear**   
**




    * In the **Name **field provide a name for the connector we are about to create, for example _Decommision.Local Send Connector_. **  
**

    * In the drop down list to **Select the intended use for this Send connector **we can stick with the default option _Custom_**   
**


  * 


On the **Address Space **page of the wizard, we will click on the **Add… **button to present the **SMTP Address Space **Dialog




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon7.png)**   
**




    * In the **Address space **text box, provide the name of the Source SMTP email domain we will be routing traffic for, eg _decommission.local_ 

    * If the email domain is split into subdomains, you might want to enable to check item **Include all subdomains** 

    * The default **Cost** will ensure that this connector is 1st choice for the mail flow. 


  * After adding all SMTP domains hosted on the source exchange environment to the list, we can click on **Next   
**

  * 


On the** Network Settings **page of the wizard, we will click on the **Add… **button to present the **Add smart host **dialog




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon8.png)




    * Selecting either the **IP Address** or **Fully qualified domain name** radio options, we can supply either the IP address of FQDN of the Source Exchange environment Hub, or Edge transport services. This will be the new hand-off point for transferring emails from the sending environment to the source (destination) environment 


  * Repeating the previous step for each additional host you wish to add for the source, once complete, click on Next 

  * 


The **Configure smart host authentication settings **will next be offered, I am going to keep this set to **None.** I am choosing this option, as mail I transfer from the Target Environment will be presented at the Source Environment to the same drop point which normal internet email is currently delivered to, which is also not authenticated. This keeps everything simple and clean for our migration effort




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon9.png) environment



  * 


The next page in the wizard is the **Source Server** in our target environment which will be delivering email on to the source domain over this connector. Essentially this page lists all the servers in the target environment which are enabled with Hub or Edge services, and capable of transferring email over the connector, we simply scope this list back to define the servers we wish to permit to use the connector.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon10.png)



  * 


Finally, the wizard will present the summary of our selections, before finally proceeding to create the new connector




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon11.png)



  * 


Once the wizard is complete, it will confirm its changes were successfully applied, and show us the PowerShell command which was created based on our selections.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon12.png)




## Testing Outlook/OWA mail flow




Before we proceed to the next step, we should complete some test mail flows to ensure that the connector is working, by sending emails to users with the source SMTP domains which we enabled in this connector, and verifying that these are delivered correctly. We should also check that these mails have indeed traversed the connector, by either using message tracking, or simply checking the email header of the received email message.




If there is a backlog, with mails traversing this connector we can use the Queue Viewer, or the PowerShell command Get-Queue referencing the sending target environment exchange server, to see if there are many messages queued, or if there is a problem handing over the messages to the source environment destination servers.




## Testing SMTP mail flow




With successful test results from the mail clients, passing messages between the two environments using the connector, we should take a look at how the Hub Transport behaves. This is the module of exchange which is responsible for handling email from other systems, and the internet.




We can use the shell to test this functionality out. From the shell, launch telnet command "
    
    <code>telnet <server> <port>"</code>




  
providing the address of the SMTP gateway for the Target Domain, along with the SMTP listener port number with by default is 25   

    
    <code>Telnet 172.16.1.31 25 </code>




  
_The server will then acknowledge the connection by offering its banner   
_  

    
    <code><em>220 smtp.diginerve.com Microsoft ESMTP MAIL Service ready at Fri, 14 Dec 2012 10:51:36 -0000 </em></code>




Next, we will introduce ourselves with a Hello message, and the name of the domain we represent, as you can see, I just make this up J
    
    <code><strong>helo mytestsession.telnet </strong></code>




_The server should then greet us back   
_
    
    <code><em>250 exchange2010.diginerve.net Hello [172.16.1.181] </em></code>




Now, we tell the server that we are sending a mail from our address; again I am making it up as I expect no one will reply to me J
    
    <code><strong>mail from: damian@telnet.cmd </strong></code>




_The server now checks to see if my address is ok, since the server is not doing any spam type checks, it is happy to let me proceed   
_
    
    <code><em>250 2.1.0 Sender OK </em></code>




Next, we will provide the email address I am sending to, the recipient
    
    <code><strong>rcpt to: damian@decommission.local </strong></code>




_Now, the server will check this address, and due to the fact that the domain is not known to it, refuse to let me go any further!   
_
    
    <code><em>550 5.7.1 Unable to relay </em></code>




Ok, not sure we were expecting that? Or were we? Well, to be honest we were.




The process we completed earlier to ensure that the connector has being established works fine, due to the fact that email created within our exchange system were ultimately sourced from the CAS module of exchange, which manages the MAPIRPC connections from Outlook and OWA, etc.




The connector is SMTP based, and is hosted by the Hub Transport, but simply tells the server that if somehow emails destined for the source domain appear in the transfer queue, use this connection.




The test we just tried, however asks the transport server to accept the mail into the queue for us, so that it can be processed for delivery or routing. This failed as Exchange rightly thinks that we are trying to Relay mails, which is a NO NO, and kindly tells us get lost.




# Authorised Domains




With the connector validated, and mail flow working, we can move our focus up one more step in the chain, this time adding the source domains SMTP addresses as authorised addresses on our target environment. Doing this will permit us to keep the original email aliases for the source domain on the users we migrate over to our target environment, and if we set it up correctly, ensure that if the alias is not located on the target environment, that exchange will take the message and forward it over our new connector to the source environment, without creating any Non-Delivery notifications.




The second objective is to fix the test we just failed on, and allow the Hub transport to accept the message for the source domain, so to place it into the queues for processing. Let's get started.




Working on the Exchange Management console, from the Target forest, expand the navigation tree to **Microsoft Exchange à Microsoft Exchange On-Premises à Organization Configuration àHub Transport**. Select the **Accepted Domains **tab in the view pane






  * 


From the Actions list under Hub Transport, located and click **New Accepted Domain …**




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon13.png)



  * 


The **New Accepted Domain **wizard should now appear**   
**




    * In the **Name **field provide a name for the SMTP domain which we are about to create, for example _Decommision.Local_. **  
**

    * In the **Accepted Domain **text filed, we will enter the qualified SMTP domain we are accepting, e.g. _decommission._local.**   
**

    * The Radio options we are going to select the choice **Internal Relay Domain. E-mail is delivered to recipients in this Exchange Organisation or relayed to an email server outside this Exchange organization. User this setting if the domain is shared by this Exchange organization and another messaging system   
**


  * 


That's all there is to it, the wizard will complete its process, and as before show us the PowerShell command which was created based on our selections.




![](http://blogstorage.damianflynn.com/wp-content/uploads/2012/12/121412_1813_ADForestCon14.png)




From an outside looking in, nothing really will have appeared to have changed after this exercise, but behind the scenes some real cool stuff has occurred. As the transport layer is generally not of concern to the end users the magic of this setting can only be appreciated when we start to actually test the Hub services. In the previous section, we verified from outlook that we had no issues sending mails to the users in the source environment, but as mail flow administrators this is only part of the story, as the last section basically created a new bridge to throw messages off from, which were destined to the source environment, just as if they were been transferred in from the internet.




However - this section has permitted us to connect directly to the Hub SMTP servers, and send emails to users with addresses in the Source environments SMTP domain, without risk of relay, or bounce back. In addition since we choose to go with the option _Internal Relay_ when we created the configuration, exchange will first check to see if a user in this exchange organisation matches the SMTP alias just mailed to, and if no match is found, then instead of sending back a Non-Delivery Report, instead relays the mail on to the original Source Exchange environment, for it to process as if it was the only system to ever see the email.




Therefore, since we made no changes in the source exchange environment, if the address is not matched there, that exchange environment will go ahead and generate its NDR messages! COOL!




## Testing the Exchange Configuration




You can make the test as elaborate as you can imagine, however to prove the concept, we will try a simpler test pass






  * Append a new @sourcedomain alias to an existing account in the target exchange environment 

  * Select an existing mail enabled account from the source domain 

  * 


Using Telnet, connect to the SMTP server on the Target domain




    * Craft and send a mail addressed to the @sourcedomain aliased account on the target domain 

    * Craft and send a mail addressed to the selected account on the source domain 



Using SMTP, just as we tried earlier, we are expecting a much better experience
    
    <code>Telnet 172.16.1.31 25 </code>




  
_The server will then acknowledge the connection by offering its banner   
_  

    
    <code><em>220 smtp.diginerve.com Microsoft ESMTP MAIL Service ready at Fri, 14 Dec 2012 10:51:36 -0000 </em></code>




  

    
    <code><strong>helo mytestsession.telnet </strong></code>




  

    
    <code><em>250 exchange2010.diginerve.net Hello [172.16.1.181] </em></code>




  

    
    <code><strong>mail from: damian@telnet.cmd </strong></code>




  

    
    <code><em>250 2.1.0 Sender OK </em></code>




  

    
    <code><strong>rcpt to: damian@decommission.local </strong></code>




_Again, the server will check this address, however exchange will now accept the message as we have added the domain decommission.local as authorised   
_
    
    <code><em>550 2.1.5 Recipient OK </em></code>




Great, exchange is happy, now enter data mode so we can compose a message to send
    
    <code><strong>data </strong></code>




_Exchange Acknowledges with instructions   
_
    
    <code><em>354 Start mail input; end with <CRLF>.<CRLF> </em></code>




OK, let's craft a message and end it with "Enter" "." "Enter" as suggested by the instructions
    
    <code><strong>Hi this is my super cool first test message </strong></code>




  

    
    <code><strong>. </strong></code>




_And, then Exchange Acknowledges with the message ID and that it has being placed in the queue   
_
    
    <code><em>250 2.6.0 <131be144-98e3-46ba-b005-71ad12cfbfcc@exchange2010.diginerve.net> [InternalId=9438736] Queued mail for delivery </em></code>







Success… Well almost, all you now need to do is check that the mail was delivered to the tested alias, and if you can see your new message, you are ready to repeat for all the other test scenarios you have though out.




# Comments




So, we now have a working understanding of how mail will flow, and the challenges which we might encounter, but the basics are in place for us to progress to the next stage of configuration, which is Validation end to end!




As I noted in the context of this post, we are not covering address book sync, which might be a problem for example when we move users from the source to the target domain, and a person from the source domain uses a cached address, or if the users reply to an existing thread, where one or more of the recipients are no longer hosted on the source exchange environment.




Make sure you test the configuration well before starting on the next post, and see you soon!!!
