---
author: Damian.Flynn
comments: true
date: 2012-12-18 15:11:00+00:00
layout: post
slug: ad-forest-consolidation-validation
title: AD Forest Consolidation - Validation
wordpress_id: 714
categories:
- Blog
tags:
- AD
- WS/SC
---

In the previous posts of this series, we covered the ground works to get our AD and Exchange environments into shape, getting us to the point where we can run a validation pass. The objective is to successfully migrate a user from the old source domain to our host target environment, along with their exchange mailbox.

  1. Source forest

    1. Create Test Users and Exchange Mailboxes  
    2. Use Virtual Machines (Windows XP / 7 - Office 2007 / Office 2010) as Pseudo Clients for the Test Users 
  2. Target  


    1. Address the issues related to scenarios where the target accounts might already be pre-populated
    2. Prepare a Mapping CSV to link the Source accounts with the Target accounts
    3. Use ADMT to migrate both the _Password_ and SID, for the Test account
    4. Use the Exchange script _Prepare-MoveRequest.ps1_ to link the Source Test Accounts to target Accounts
    5. Migrate the Content of the Mailbox _Move-MailboxRequest_

There is more to cover, but that's for another day… we have lots to do and cover, so head down and dig in.

# Validation Pass Configuration

For this validation pass, I have created the following environment

  * Two test accounts in the source forest called _taccount1_ and _taccount2_, both of which are mailbox enabled  
  * Two virtual machines (Windows 7 as this is still the OS which most organisations are utilizing) configured as desktops with Outlook 2010 in the source forest.  
  * _taccount1_ is using the computer _TestDesktop1_ as its workstation, and _tccount2_ is using the computer _TestDesktop2_ as its workstation  
  * To simulate both account scenarios, I have also created an account in the target forest called _Test.Account2_ which I plan to merge _taccount2_ with.  
  * Three security groups on the source forest configured with the following membership

    * TestGroup1 ß taccount1  
    * TestGroup2 ß taccount2  
    * TestGroup3 ß taccount1,taccount2 

# Account Locations

Before we proceed, there are two migration scenarios which must consider

  1. The user has a unique account in both forests (this can be common situation to enable employees access to target resources while the integration is being organised.)  
  2. The user has a unique account only in the source forest. 

## Account in Both Forests

In this scenario, we need to address the merger of attributes and mailbox resources from the source forest to the destination forest. We also need to play extra consideration in the situation where the user account in the target forest has also being enabled with a mailbox; which is going to complicate matter somewhat more.

### Rule of Thumb

If at all possible, use the following guideline when considering the creation of secondary accounts for users in the target forest while preparing for consolidation, as these will keep things a lot simpler at the time of migration.

  1. Create the accounts in an OU where you can clearly identify they  
  2. Keep the amount of data attributes which are populated to a minimum, as these will need to be considered again at merge time.  
  3. Do not Mailbox enable the accounts!

    1. Really, you do not want to have the accounts mailbox enabled, It complicated communication with the users, and makes a nightmare of the migration by adding extra steps which we can do without.  
    2. You should however, Mail enable the account. And be 100% sure that the email address you define when mail enabling the account is an email address which is listed on the users account in the source forest_ (proxy address list)_. This will ensure that the migration tool can use the mail address as a unique identifier for matching up the source and target accounts when merging. Additionally, the User will now also be included in the Exchange GAL, but pointing back to the source mailbox. 

### Planning Account Merges

In the painful circumstance where the users account has already being pre-created for you in the target forest, you can prepare from some manual work. Initially, you will want to verify if target forest accounts are either Mail or Mailbox enabled.

If the account is Mailbox enabled, find out if there is truly a business requirement, generally the answer is NO, as the user already has a mailbox in the source environment, and this situation is simple complicating the migration, and the user. If at all possible, export the content of the target mailbox to a PST file which you can provide to the user, and remove the mailbox from the target forest.

If the account has not been mail enabled, which is quite likely going to be the case, as the accounts would have being provisioned quickly to address the business requirements of granting access to resources such as Lync and SharePoint, then you must go ahead and Mail enable the account. We will consider what steps we need to take to address this typical scenario next.

## Accounts Only in Source Forest

The will be the normal scenario for the vast bulk of your accounts in a normal situation, (but what is normal anymore?). In this configuration we will have the migration tool create for us the account in the target forest, and therefore not need to be concerned with pre-enabling the accounts for mail, or cleaning up any prior efforts.

# Merging Accounts

This job should not be underestimated, as it is going to be quite manual, and might require the input of additional users to ensure the preparation work is completed correctly prior to applying any additional changes to the accounts.

Essentially, we will require a method of associating or mapping the account in the source forest with the account in the target forest. In the scenario where the account names match in either forest; or even better the target account is Mail User enabled, then these is process is going to be trivial. However, the typical scenario will be that naming conventions are totally different in both environments, and will need some patients to manually create the mapping.

To facility a migration where accounts must be merged, we are going to need some specific information from both forests, which we can then combine to create a single unique record per account to be processed; The details which we will require are as follows:

  * **SourceName** - The objects "SAM Account Name" as defined in the Source Forest  
  * **SourceMail** - The objects "Primary eMail address" as defined in the Source Forest  
  * **TargetSAM** - The objects "SAM Account Name" as defined in the Target Forest  
  * **TargetUPN** - The objects "User Principal Name" as defined in the Target Forest 

## Exporting Data

To export the data from the Source Forest, we can use the Active Directory PowerShell Module. The following command syntax will dump all User Accounts from the source domain, specifically there SAM (SourceName) and Primary Mail address (SourceMail) information
    
    <code>Get-ADUser -Filter * -Properties mail | select @{Expression={$_.samaccountname};Label="SourceName"}, @{Expression={$_.mail};Label="SourceMail"} </code>




  
Similar to the process for exporting from the Source Forest, we can again use the Active Directory PowerShell modules to dump the Target Accounts SAM (TargetSAM) and UPN (TargetUPN) information. If housekeeping is good, we can use the -SearchBase parameter to reference a specific OU which may be hosting the target accounts, in my example I called this OU "ADMT"  

    
    <code>Get-ADUser -SearchBase "OU=ADMT,DC=DigiNerve,DC=net" -Filter * -Properties mail | select @{Expression={$_.samaccountname};Label="TargetName"}, @{Expression={$_.UserPrincipalName};Label="TargetUPN"} </code>







## Sample Exports




As an example let's consider our test accounts, which we created for the validation pass as a typical mapping challenge





<table style="border-collapse: collapse" border="0" >




<tbody valign="top" >
<tr >

<td style="padding-left: 7px; padding-right: 7px" >**SourceName**
</td>

<td style="padding-left: 7px; padding-right: 7px" >**SourceMail**
</td>

<td style="padding-left: 7px; padding-right: 7px" >
</td></tr>
<tr >

<td style="padding-left: 7px; padding-right: 7px" >taccount1
</td>

<td style="padding-left: 7px; padding-right: 7px" >taccount1@decommission.local
</td>

<td style="padding-left: 7px; padding-right: 7px" >
</td></tr>
<tr >

<td style="padding-left: 7px; padding-right: 7px" >taccount2
</td>

<td style="padding-left: 7px; padding-right: 7px" >Taccount2@decommission.local
</td>

<td style="padding-left: 7px; padding-right: 7px" >
</td></tr></tbody></table>








<table style="border-collapse: collapse" border="0" >



<tbody valign="top" >
<tr >

<td style="padding-left: 7px; padding-right: 7px" >**TargetName**
</td>

<td style="padding-left: 7px; padding-right: 7px" >**Target UPN**
</td></tr>
<tr >

<td style="padding-left: 7px; padding-right: 7px" >Test.account2
</td>

<td style="padding-left: 7px; padding-right: 7px" >Test.account2@diginerve.net
</td></tr></tbody></table>







Quickly glancing at the above lists, we can see clearly that there are more accounts in the Source Forest, that those in the target forest. Additionally, we can quickly see that although the naming conventions in both forests are different, we can create a consolidated list, as below for example.





<table style="border-collapse: collapse" border="0" >





<tbody valign="top" >
<tr >

<td style="padding-left: 7px; padding-right: 7px" >**SourceName**
</td>

<td style="padding-left: 7px; padding-right: 7px" >**SourceMail**
</td>

<td style="padding-left: 7px; padding-right: 7px" >**TargetName**
</td>

<td style="padding-left: 7px; padding-right: 7px" >**TargetUPN**
</td></tr>
<tr >

<td style="padding-left: 7px; padding-right: 7px" >taccount1
</td>

<td style="padding-left: 7px; padding-right: 7px" >taccount1@decommission.local
</td>

<td style="padding-left: 7px; padding-right: 7px" >
</td>

<td style="padding-left: 7px; padding-right: 7px" >
</td></tr>
<tr >

<td style="padding-left: 7px; padding-right: 7px" >taccount2
</td>

<td style="padding-left: 7px; padding-right: 7px" >Taccount2@decommission.local
</td>

<td style="padding-left: 7px; padding-right: 7px" >Test.account2
</td>

<td style="padding-left: 7px; padding-right: 7px" >[Test.account2@diginerve.net](mailto:Test.account2@diginerve.net)
</td></tr></tbody></table>







However, creating this list is based on knowledge and some amount of guess work, as we manually build the list based on the associations we can visually see. You can extend the list to include additional data from both forests such as FirstName, Surname and Display Name, which might make this process simpler, and maybe even permit you to write a function or macro in excel to create a mapping for you.




## Pre-Migration CSV Files




Prior to starting the User Account Migration, ensure that you have created the list as above. Then from this list we will create two different CSV files which can then be utilised for the rest of the migration. The following is an example of the CSV files created from the table




**_ADMT-Mapping.csv  
_**
    
    <code>SourceName, TargetName </code>




  

    
    <code>taccount2, Test.account2 </code>







**_MAIL-Mapping.csv  
_**
    
    <code>TargetName, SourceMail </code>




  

    
    <code>Test.account2, Taccount2@decommission.local </code>







## Final Pre-Flight Checks




Prior to commencing any work with the actual migration we must ensure that the accounts in our target environment which we plan to migrate are ready.






  * Accounts which have Mailboxes should really be mailbox disabled and any content exported to a PST. (This can be imported after the migration or just passed to the user)_  
_



Once this work is complete, we can proceed.




# User Account Migration




With the environment now prepared, and our accounts understood, we will begin the operation in batches of accounts. The size of the batches is totally up to you, however initially for validation and piloting these should be keep quite small.




Once you have selected the user's batch to utilize, for example test accounts, we will follow this process






  1. Any Mail Contacts in the target forest should be removed for the accounts about to be processed. 

  2. Using the ADMT tool we will migrate/merge accounts from the source forest to the target forest based on our CSV file 

  3. Mail enable the new accounts in the target forest 

  4. Using the Prepare-MoveRequest.PS1 utility we will prepare the target accounts for mailbox migration. 



## ADMT User Account Migration Wizard




Drum roll time, as we are finally going to take advantage of the preparation work which we have being diligently addressing over the past number of posts. Using the ADMT tool which we deployed in our target forest, along with the password export server which we implemented in the source forest we will now begin process our first batch of accounts.




With the Trust, ADMT and Password tools in place, along with our CSV File for mappings we can now start a migration exercise.




_**Note:** We can also use this CSV for creating the accounts in the target forest, if they do not already exist. The benefit here is that the account name created in the target forest can be formatted in a different convention from that of the source forest, keeping things nice and tidy. As an example this is a sample of my updated ADMT-Mapping.csv file with a new entry for my taccount1, which I would like created for me on the target forest as Test.Account1  
_




**_ADMT-Mapping.csv  
_**
    
    <code><em>SourceName, TargetName </em></code>




  

    
    <code><em>taccount2, Test.account2 </em></code>




  

    
    <code><em>taccount1, Test.account1 </em></code>









  1. From the designated Management Station, logon and launch the ADMT tool. 

  2. 


From the **Action **menu, or by Right clicking the top most node in the tree, select the option **User Account Migration Wizard**




![](/assets/posts/2012/12/122812_2206_ADForestCon1.png)



  3. After a few moments the **User Account Migration Wizard** will be presented, on the welcome screen, after reading the introduction Click Next 

  4. 


The First page we will work on is the **Domain Selection **page, providing details of the source and target domains




    1. In the **Source Domain** Text Field, we can type the fully qualified domain name of the source forest domain 

    2. In the **Source Domain Controller** Text Field, we can type the fully qualified name of the source domain controller we are going to use 

    3. In the **Target Domain** Text Field, we can type the fully qualified domain name of the target forest domain 

    4. In the **Target Domain Controller** Text Field, we can type the fully qualified name of the target domain controller we are going to use 



![](/assets/posts/2012/12/122812_2206_ADForestCon2.png)



  5. 


The next page **User Selection Options **permits us to determine which accounts we plan to process




I am going to select the option to **Read objects from an include file** which essentially is my CSV file




![](/assets/posts/2012/12/122812_2206_ADForestCon3.png)







On the **Include File Selection **page, click on **Browse... **and select the CSV file which contains the mapped accounts that you plan to migrate.




![](/assets/posts/2012/12/122812_2206_ADForestCon4.png)



  6. 


On the **Organizational Unit Selection **page, click the **Browse… **button to select the OU on the Target forest we will create any new objects in. I have pre-created an OU called ADMT for my environment.




![](/assets/posts/2012/12/122812_2206_ADForestCon5.png)



  7. 


The **Password Options **page, offers some choices on how to handle the passwords for accounts in the target domain. If you choose to deploy the Password Migration tool, then you will likely want to use the **Migrate Passwords **option, but alternatively you can use the Generate complex passwords option just as easily.




![](/assets/posts/2012/12/122812_2206_ADForestCon6.png)



  8. 


On the **Account Transition Options **page, we will determine how the accounts should be treated on the source and target forests. Set these to suit your requirements, for example, have the new accounts in the target forest flagged as enabled or disabled based on their current state in the source forest; and set the original source account to expire in 60 days' time (by which time we should be well and truly done).




    1. Sneaking at the bottom of this page is the option to **Migrate user SIDs to target domain**, this one you are going to want to enable, to that you can ensure that the users retain access to the file and print resources in the source forest until you have time to re-assign the Access Control Lists on these servers. 



![](/assets/posts/2012/12/122812_2206_ADForestCon7.png)



  9. 


As this is the first time running the wizard, and selecting the option to **Migrate user SIDs to the target domain**, the wizard will request that It is permitted to enable auditing on the source domain, this must be agreed with by clicking **Yes **if the wizard is to be able to migrate the SID history. Depending on the configuration in the target domain, you may be prompted further to enable auditing there also.




![](/assets/posts/2012/12/122812_2206_ADForestCon8.png)



  10. 


The **User Account **page of the wizard, will then request an account with privileges on the source forest, so that it can read the SID details for migration.




![](/assets/posts/2012/12/122812_2206_ADForestCon9.png)



  11. 


The **User Options **page will allow us to determine the action to take on the associated groups which our test accounts are members of. The options here will depend on the details you need to migrate, for example if you are using roaming profiles these will need to be addressed. Many file shares might be restricted by Groups, so migrating this information to the target forest will migrate extra data which will need to be cleaned up again later.




![](/assets/posts/2012/12/122812_2206_ADForestCon10.png)



  12. 


On the **Object Property Exclusion **page, if there are properties on the source accounts which we do not want migrated, you can select these here, for example this might be important if the account was pre-staged and configured with an office for example which you do not wish to overwrite.




![](/assets/posts/2012/12/122812_2206_ADForestCon11.png)



  13. 


On the **Conflict Management **page, as we have two scenarios to address, I am going to select the option to **Migrate and merge conflicting object. **In addition these target objects were created for a reason, so unless you need to clean up, I will not turn on any of these switches.




![](/assets/posts/2012/12/122812_2206_ADForestCon12.png)



  14. 


And finally the Summary page, review the task description and then when ready click on **Finish** to start the process.




![](/assets/posts/2012/12/122812_2206_ADForestCon13.png)



  15. 


The Migration Process Page will then be displayed, which will present the progress of the migration, along with statistics of the actions taken/completed. Note that there is a **View Log **button which you can click to provide deep insight into what has being happening in the background.




![](/assets/posts/2012/12/122812_2206_ADForestCon14.png)



  16. Finally, we can click on **Close** to complete this part of the exercise. 



## Mail Enable Accounts




At this point, our users account should be copied to the target domain, with both SID history and passwords! However, the accounts we just migrated are still not Mail enabled, therefore we will utilise the second of our CSV files which we prepared a little earlier and use it to batch enable each of the newly migrated accounts. The command to enable an account as a mail user is simply _Enable-MailUser -Identity <target.account> -ExternalEmailAddress email@source.exchange_




Taking both the PowerShell command and the CSV file for the mail-mapping, we can use the pipeline and looping functions in PowerShell to do the job for us
    
    <code>Import-Csv .mail-mapping.csv | foreach { Enable-MailUser –Identity $_.TargetName -ExternalEmailAddress $_.SourceMail } </code>







![](/assets/posts/2012/12/122812_2206_ADForestCon15.png)




Once this script has being completed, we can take a look at one of the accounts which we affected on the target domain to verify everything is as we expect.




![](/assets/posts/2012/12/122812_2206_ADForestCon16.png)![](/assets/posts/2012/12/122812_2206_ADForestCon17.png)![](/assets/posts/2012/12/122812_2206_ADForestCon18.png)




We should be able to observe the New SID on the account, the SID History, and the mail attributes which have being migrated and assigned during the course of the past few exercises.




_**Note: **Similarly to utilizing our AMDT-Mapping.csv file for creating new accounts in the target forest, we can utilize our Mail-Mapping.csv file to ensure that these new accounts are also configured as mail users in our target environment, ensuring that they are prepared for mailbox migration steps. As an example this is a sample of my updated MAIL-Mapping.csv file with a new entry for my Test.account1, which I would like to reference the address in the source forest of TAccount1@decommission.local  
_




**_MAIL-Mapping.csv  
_**
    
    <code><em>TargetName, SourceMail </em></code>




  

    
    <code><em>Test.account2, Taccount2@decommission.local </em></code>




  

    
    <code><em>Test.account1, Taccount1@decommission.local </em></code>







# Mailbox Migration




With our accounts now on both forests, and the glue in place to reference each other, we are quickly approaching the final stages to get the migrations sorted. In this section we are going to cover two stages






  * Prepare the Target account for Mailbox Move 

  * Move the Mailbox from the Source Exchange to the Target Exchange 



## Prepare Mail Moves




Microsoft has helped out, by providing a script to help with the migration of Mailboxes from a remote forest to the target forest. This script is located in the Exchange 2010 Scripts Folder, located at _c:Program FilesMicrosoftExchangeV14Scripts _and is named _Prepare-MoveRequest.ps1_. The following sample syntax defines the command we will issue.
    
    <code> .Prepare-MoveRequest.Ps1 -Identity "EmailAddress" -RemoteForestDomainController "FQDN of Source DC" -RemoteForestCredential $sourceCredentials -LocalForestDomainController "FQDN of Target Forest DC" -LocalForestCredential $targetCredentials –UseLocalObject –OverwriteLocalObject -Verbose </code>




### Using Credential Variables




To facility the migration of our source mailboxes and accounts to the target forest, we will again need to provide some credentials. Instead of repeat typing these, I will use powershell variables to collect and store for use in our commands. To do this, I am going to work from a server in the Target Exchange environment and use an Exchange Shell, so that I will also have access to the necessary exchange commands for the next stages.




Let's start by creating a variable for our target environment, and storing our credentials in this variable. Note, when we are prompted for these credentials provide them as either a UPN or DomainUser format.
    
    <code>$targetCredentials = Get-Credential </code>




  
And again, we will repeat, this time providing credentials with privileges to the source domain. If you followed all the steps so far, then our target administrator credentials should also work as we granted the administrator account full access.  

    
    <code>$sourceCredentials = Get-Credential </code>




### Prepare Mailbox Move




On our target domain, we can launch an Exchange Management shell, and navigate to the host folder of the script
    
    <code>CD 'C:Program FilesMicrosoftExchangeV14Scripts' </code>




  
Utilizing the credential objects which we created in the previous step, we should be able to prepare our recently migrated accounts for mailbox migrations. In the following example, we will use our Mail-Merge.CSV file again to prepare all the recently migrated and mail user enabled accounts.  

    
    <code>Import-Csv c:mail-mapping.csv | foreach { .Prepare-MoveRequest.Ps1 -Identity $_.SourceMail -RemoteForestDomainController "Decom-DC01.decommission.local" -RemoteForestCredential $sourceCredentials -LocalForestDomainController "DC01.diginerve.net" -LocalForestCredential $targetCredentials -TargetMailUserOU "Distinguished name of OU in TargetForest" –UseLocalObject –OverwriteLocalObject –Verbose} </code>







After a successful run, the verbose output of the script should indicate that the target account was matched up and merged.




![](/assets/posts/2012/12/122812_2206_ADForestCon19.png)




## Migrate Mailboxes




And the Final Hurl, to move the actual mailbox.
    
    <code>New-MoveRequest –Identity test.accoun1 –RemoteLegacy –RemoteCredential $SourceCredentials –RemoteGlobalCatalog decom-dc01.decommission.local –TargetDeliveryDomain decommission.local –Verbose </code>







Executing this command in verbose mode, will deliver quite a lot of information, to help us understand how the process is executing, before finally queuing the mailbox for its movement.




![](/assets/posts/2012/12/122812_2206_ADForestCon20.png)




![](/assets/posts/2012/12/122812_2206_ADForestCon21.png)




As with the previous steps, we are likely going to want to move a number of mailboxes from the source to the target forest, so using the same CSV files to manage our batch, we can again get PowerShell to queue up all the moves for us:
    
    <code>Import-Csv c:mail-mapping.csv | foreach { New-MoveRequest –Identity $_.TargetName –RemoteLegacy –RemoteCredential $SourceCredentials –RemoteGlobalCatalog decom-dc01.decommission.local –TargetDeliveryDomain decommission.local –Verbose } </code>







Just as with local move requests, we can query, suspend and resume these from the exchange shell.




![](/assets/posts/2012/12/122812_2206_ADForestCon22.png)




If you are curious, on the Source Forest, the mailbox we migrated will have been removed, just as you would expect with a local move. And the account should not be listed as a Mail User, with its references updated to point at the target forest exchange environment.




## Outlook User Experience




This will not be of any shock, when we check the users outlook experience; the user will be unaware of anything happening while the migration itself is happening, however the moment the migration is complete; if the user was connected to the mailbox using Outlook a banner will be presented




![](/assets/posts/2012/12/122812_2206_ADForestCon23.png)




And just for geek value, we can also look at the connectivity dialog




![](/assets/posts/2012/12/122812_2206_ADForestCon24.png)




Now, being a good end user, we can Close out Outlook, and then re-launch again. Assuming all the changes have completed their replication cycles, Outlook will update its profile, and point to our new mailbox. However the old account will not have access to the new mailbox, so the user will need to use their new account from the target OS.




![](/assets/posts/2012/12/122812_2206_ADForestCon25.png)




After providing the new account, Outlook will complete its connection, and mail will once again flow




![](/assets/posts/2012/12/122812_2206_ADForestCon26.png)




_**Note** – that until the user starts natively logging into the new Target Domain, they will be challenged with the new User name every time they launch outlook._
