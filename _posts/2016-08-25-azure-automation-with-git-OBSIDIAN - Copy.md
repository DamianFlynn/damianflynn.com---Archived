---
authors: Damian Flynn
comments: true
date: 2016-09-01 10:30:00
layout: post
description: Git Version control with AzureAutomation
title: "SMA: GIT Version Control Integration"
image: AzureAutomationCI_banner.jpg
categories:
- IT Pro/DevOps
tags:
- Azure Automation
- Service Management Automation
- SMA
- GIT
- Presentation
- Continous Deployment
- DevOps
- Open Source
---

At Tech-Ed 2014, Ryan Andorfer presented a session, and followed up with a series of blog posts on the 'Building Clouds' blog detailing how to implement a continous deployment version control solution for SMA leveraging a TFS Repository.

<!--excerpt.start-->A lot of the work we have been implementing with Service Management Automation (SMA) has been version protected using GIT, as it offers a much lighter experience. In this post I am going to introduce you to Ryan's latest integration work, which is an evolution of the original efforts leveraging GIT and Azure Automation. We have many steps to cover<!--excerpt.end-->, so lets get started.



# GIT Repository

The first step is to ensure you have  [registered an account on GitHub](../2015-11-11-register-a-github-account.md).

We are not going to start from point zero, as that would be simply re-inventing the wheel; instead we are going to make a copy of the great work which Ryan has been working on, an use this as a starting point.

We have two options to choose from in order to get started, which are
1. Forking the Repository
2. Cloning the Repository, to be used as a base for creating a new repository

I will cover both approaches, the Forking option is preferred as it leads to more comunity focus, and allows up to share back any fixes we might add to the solution. However sometimes this is not the focus and the Clone approach may work better.

## Forking ScorchDev

The work we are going to leverage is already published by Ryan in his public GitHub repository which is hosted as [RAndorfer/ScorchDev](https://github.com/randorfer/ScorchDev), or you can also fork from my personal copy as [DamianFlynn/ScorchDev_MMS2016](https://github.com/DamianFlynn/ScorchDev_MMS2016)

We will use one of GitHub's features know as 'Forking' while will crate a copy of the repository in our account. We will take this approach as we will not have write access to Ryan's copy of the repository, and we are going to need to customise the configurations stored in the repository for our environment. If we encounter bugs in the solution, we will also be able to resolve these, and then create a 'Pull' request to have Ryan check the suggested fixes and decide if these should be pulled into the main code.

To Fork the repository, we will follow these steps:
1. Navigate to GitHub.com and Sign In with your account to the service.
2. Next, we will navigate to Ryans repository which is located at [RAndorfer/ScorchDev](https://github.com/randorfer/ScorchDev) or my copy hosted at [DamianFlynn/ScorchDev_MMS2016](https://github.com/DamianFlynn/ScorchDev_MMS2016).
3. With the repository now presented, we will click on the button (currently in the upper left of the screen) labeled as **Fork**
4. GitHub will take you back to your account, where you will now have a copy of the project, and an indicator that this is a fork from the upstream repository.

### Cloning ScorchDev to our Development Station

Now that we have our copy of the ScorchDev repository hosted in our GitHub account, we will need to clone a copy of this locally so we can correctly setup our development workstation.

> Note: Before you proceed you will need to have a copy of Git for Windows installed on your workstation!

1. Create or Navigate to a working folder which we will use as the base for where we are going to clone our repositories to, for example I will use `C:\git` on my system
2. Now, we will clone a copy of the repository and any submodules which it may contain to our workstation using the following command `git clone --recursive https://github.com/damianflynn/ScorchDev`. Of course you will replace my account name 'damianflynn' with your account right!

After a few minutes, we should have a copy of the repository on our machine.

## Clone and Rebase

The alternative approach to forking, is to create a local clone of the repository, and then from there delete the existing ```.git``` file, and initialize a new version of the repository as your new base. 

> Note: Before you proceed you will need to have a copy of Git for Windows installed on your workstation!

### Cloning the repository locally

1. Create or Navigate to a working folder which we will use as the base for where we are going to clone our repositories to, for example I will use `C:\git` on my system
2. Now, we will clone a copy of the repository and any submodules which it may contain to our workstation using the following command `git clone --recursive https://github.com/damianflynn/ScorchDev_MMS2016 ScorchDev`.

After a few minutes, we should have a copy of the repository on our machine.

### Removing the GIT artifacts

With the repository now local, we will proceed to remove all the Git related artifacts from this copy. This will erase all the history and the relationship which this copy has with the hosted version we just cloned from (commonly refered to as the upstream master)

```powershell
cd c:\git\ScorchDev
del -Recurse -Force .\git\
```

### Initialize a new Instance

Next step is to reinitialize the copy, as a new Git repository. Once this is complete, we can also proceed to create a project in our github account, and push the content back up to this project.

```powershell
git init
```

Using the Web Interface, login to your GitHub account and select the option to **Create a new repository**, this will request some simple details from you, including
1. The *Repository name*, for example 'ScorchDev'
2. A *Description*, for example 'Continous Integation for Azure Automation'
3. Wheather the project should be *Public* or *Private*, which is totally up to your requirements
4. If you wish to *Initialize with a README*, and add a *.gitignore* and/or *license* to the repoisitory, in this case none of these are required as they are part of the copy we are about to push up.

Once this is all in place, we simply click the option to **Create Repository**. This will take a few moments, and you should then see some instructions on how to push your content back up. 

In our case, the example will look similar to the following

```powershell
git remote add origin https://github.com/DamianFlynn/ScorchDev.git
git push -u origin master
```


# Updating our PowerShell Profile

With the local copy of the repository now available, we will proceed to update our PowerShell Profile to automatically load the Local Authoring environment support modules which are included in the repoistory. These will save lots of time, as we proceed to create and debug both runbooks and thier associated assets.

Looking around the content of the repoistory, you will find a folder called `Profile` which contains a sample of the information which we should add to our live profile.

The sample is really in 2 parts,
1. A hash table defining the workspaces (repositories) we will be working with. At minumum we will have 1 workspace which is our **ScorchDev** repository
2. A Loop to process the details in the hashtable, updating our PowerShell profile with pointers to the modules hosted in each of the workspaces.

## The configuration hash table

The mimimum hast table will look similar to the following example, which is an extract from the `profile.ps1` file. Here we can see the name of the workspace (or repoistory) which we are defining, along with some details to how the workspace is organised.

First we are calling the Workspace **SCOrchDev**. Within this Workspace we first define where we cloned the repository to under the variable **Workspace**. The remaining Variables, define the folder name within the repository which will be host for our **Runbooks, Modules, Global Settings** and **Local Development** resources.

```PowerShell
$Global:AutomationWorkspace = @{
    'SCOrchDev' = @{
        'Workspace' = 'C:\GIT\SCOrchDev'
        'ModulePath' = 'PowerShellModules'
        'GlobalPath' = 'Globals'
        'LocalPowerShellModulePath' = 'LocalPowerShellModules'
        'RunbookPath' = 'Runbooks'
    }
}
```
The remaining content of the sample `profile.ps1` file, will process this hast table and update our powershell environment with the relevant paths to publish the contained modules

```powershell
Foreach($_AutomationWorkspace in $Global:AutomationWorkspace.Keys)
{

    $PowerShellModulePath = "$($Global:AutomationWorkspace.$_AutomationWorkspace.Workspace)\$($Global:AutomationWorkspace.$_AutomationWorkspace.ModulePath)"
    $LocalPowerShellModulePath = "$($Global:AutomationWorkspace.$_AutomationWorkspace.Workspace)\$($Global:AutomationWorkspace.$_AutomationWorkspace.LocalPowerShellModulePath)"

    if(Test-Path -Path $PowerShellModulePath) { $env:PSModulePath = "$PowerShellModulePath;$env:PSModulePath" }
    if(Test-Path -Path $LocalPowerShellModulePath) { $env:PSModulePath = "$LocalPowerShellModulePath;$env:PSModulePath" }
}

$env:LocalAuthoring = $true
$Global:AutomationDefaultWorkspace = 'SCOrchDev'

# Set up debugging
$VerbosePreference = 'Continue'
$DebugPreference = 'Continue'
```

Now that we understand what we are about to add to our profile, and why, we can ensure that the hash table is correctly defined for our workstation folders, and implement these changes.

If you are using the recommended PowerShell ISE, then all you should need to do is type in the interactive window `psedit $profile` which will open a new pane with your current profile, or a new blank profile if one is not already defined. Here we will add the snippets we just reviewed and edited as appropriate. Once you are finished, save the changes to the profile.

Remember that you will need to shutdown and restart the ISE to have it load up the profile on the next startup cycle.

Before we move on with the work, we will run a quick check to ensure that all the modules are available to us now based on the new profile settings. Back in the interactive window we can query for the list of modules which are now offered to us, which should include a number of modules starting with the name **ScorchDev**. If these are not offered, then most likely you will have a mistake in your hash table paths; which you will need to resolve before we proceed.

```powershell
get-module -name SCOrchDev* -listavailable
```
The results we are expecting would be similar to the following output

```powershell-output

    Directory: C:\GIT\SCOrchDev\LocalPowerShellModules


ModuleType Version    Name                                ExportedCommands
---------- -------    ----                                ----------------
Script     1.0.1      SCOrchDev-Scaffold                  New-Scaffold


    Directory: C:\GIT\SCOrchDev\PowerShellModules


ModuleType Version    Name                                ExportedCommands
---------- -------    ----                                ----------------
Script     3.0.4      SCOrchDev-AzureAutomationIntegra... {Publish-AzureAutomationRunbookChange, Publish-AzureAutomationPowerShellModule, Publish-AzureAut...
Script     2.2.1      SCOrchDev-Exception                 {Write-Exception, New-Exception, Convert-ExceptionToString, Get-ExceptionInfo...}
Script     2.1.0      SCOrchDev-File                      {New-ZipFile, New-TempDirectory, Get-FileEncoding, ConvertTo-UTF8...}
Script     2.2.5      SCOrchDev-GitIntegration            {New-ChangesetTagLine, Get-GlobalFromFile, Update-RepositoryInformationCommitVersion, Get-GitRep...
Script     2.1.1      SCOrchDev-PasswordVault             {Get-PasswordVaultCredential, Set-PasswordVaultCredential, Remove-PasswordVaultCredential}
Script     0.1.1      SCOrchDev-StoredCredential          Get-StoredCredential
Script     2.1.9      SCOrchDev-Utility                   {Format-ObjectDump, ConvertTo-Boolean, Select-FirstValid, Find-DeclaredCommand...}

```

# Preparing for Continuous Deployment

With our development system now ready, we can now focus on updating the variables which the **SCOrchDev Continuous Deployment** solution will leverge to deliver its service. There are a number of predefined variables we need to declare, including:

* Azure subscription details and access
* Automation resource group details
* Git Repository information to link for the CI.

## Defining the continuous deployment configuration Variables

The variables we are going to focus on, are all hosted in a folder of our new solution, called `Globals`, within which we will locate a **JSON** formated file, called `zzGlobal.json`.

To begin, we will open and edit this file with our favourite code editor, for example I will launch Visual Studio Code as follows

```powershell
cd ScorchDev\Globals
code .\zzGlobal.json
```

With the file open, we can begin the process of customisation.

1. Our initial variable, `zzGlobal-RunbookWorkerAccessCredentialName` is used to identify the credential object which will have local administrative privilages to the on premise resources. In the scenarion where we are dealing with domain resources this will be defined in Universal Principal Name Format (UPN), and for Local accounts we will just use the short account name.

```json
"zzGlobal-RunbookWorkerAccessCredentialName":  {
    "isEncrypted":  false,
    "Description":  "The credential name for accessing runbook workers",
    "Value":  "automation@damianflynn.com"
},
```

2. The next variable, `zzGlobal-SubscriptionAccessCredentialName` identifies the credential object which has privilages to your Azure Subscription; which will be leveraged to provision your Azure Automation services.

```json
"zzGlobal-SubscriptionAccessCredentialName":  {
    "isEncrypted":  false,
    "Description":  "Name of the credential to be used for authenticating to the subscription",
    "Value":  "azureadmin@damianflynn.com"
},
```

3. Azure Automation is part of the Microsoft Operations Management Suite (OMS), and requires your Log Analythics workspace ID to enable the solution with access to the Hybrid Workers.

```json
"zzGlobal-WorkspaceID":  {
    "isEncrypted":  false,
    "Description":  "the workspace ID of the Log Analytics account with the automation solution deployed to it",
    "Value":  "01234567-abcd-efab-0123-0123456789ab"
},
```

4. As you may have multiple azure Subscriptions, the variable `zzGlobal-SubscriptionName` enables us to identify which subscription we will deploy the Azure Automation account to.

```json
"zzGlobal-SubscriptionName":  {
    "isEncrypted":  false,
    "Description":  "",
    "Value":  "My MVP Subscription"
},
```

5. Leveraging the variable `zzGlobal-AutomationAccountName` we can provide a name for our new Azure Automation account

```json
"zzGlobal-AutomationAccountName":  {
    "isEncrypted":  false,
    "Description":  "name of the automation account",
    "Value":  "SCOrchDev"
},
```

6. Similarly, the variable `zzGlobal-StorageAccountName` premits us to define the name of the storage account we will associate with the Automation Account

```json
"zzGlobal-StorageAccountName":  {
    "isEncrypted":  false,
    "Description":  "Name of a storage account for storing PSModules during import",
    "Value":  "damianscorchdev"
},
```

7. Workers, connected to the automation account, hosted on premise will be allocated to the hybrid group identifed bu the variable `zzGlobal-HybridWorkerGroup`

```json
"zzGlobal-HybridWorkerGroup":  {
    "isEncrypted":  false,
    "Description":  "name of the hybrid worker group for starting sync job on",
    "Value":  "Hybrid"
},
```

8. All the resources we have defined for our subscription so far, will be associatated with the resource group identified by the variable `zzGlobal-ResourceGroupName`

```json
"zzGlobal-ResourceGroupName":  {
    "isEncrypted":  false,
    "Description":  "resource group that the target automation account is stored in",
    "Value":  "SCOrchDev"
},
```

9. For continous deployment to function, we will use the variable `zzGlobal-GitRepository` to identify the GIT reporitories, which will be syncronised to the automation account. Multiple Git repositories can be defined as key value pairs for this variable.

```json
"zzGlobal-GitRepository":  {
    "isEncrypted":  false,
    "Description":  "a key value pair of repositories and their respective branches to sync into this automation account",
    "Value":  "{\"https://github.com/damianflynn/SCOrchDev_MMS2016\":\"master\"}"
},
```

10. The variable `zzGlobal-GitRepositoryCurrentCommit` is used to track the latest commit which has been syncronised to the automation account. This varaible will initially have a -1 value, which will instruct the runbooks to get the lastest version, after which the runbooks will update and manage this variable automatically.

```json
"zzGlobal-GitRepositoryCurrentCommit":  {
    "isEncrypted":  false,
    "Description":  "a key value pair of repositories and their current commit. -1 for initial",
    "Value":  "{\"SCOrchDev_MMS2016\":\"-1\"}"
},
```

11. Finally, we will define the `zzGlobal-LocalGitRepositoryRoot` variable to identify the local path as to where the 

```json
"zzGlobal-LocalGitRepositoryRoot":  {
    "isEncrypted":  false,
    "Description":  "the local path to map the git repositories to",
    "Value":  "c:\\git"
},
```

Once all the varibales have been defined to match our subscription details, we will save the file edits and commit them to our copy of the repository, with a comment

```powershell
cd \git\ScorchDev
git add -A :/
git commit -m "Updated the Configuration Variables to match the subscriptions"
```


## Credentials

Our next step is to create some credential objects to host the account details which will be used within the solution. There are a total of three which we will define. 

We will store these in two locations, Initially in the local Windows Password Valut, and also as atrifacts in the Azure Automation account.

* RunbookWorkerAccessCredentialName
* SubscriptionAccessCredentialName
* OMS Subscription and Primary Key

### Windows Password Vault

To define and store the credentials in the local password vault, we simply create a credental object, and place the details in the object; then we store that object in the local password vault with a helper function called `Set-PasswordVaultCredential` as follows

```powershell
$cred = get-credential
Set-PasswordVaultCredential $cred
```

The first two we will set, are pretty standard, providing the shortname, or UPN for both the **RunbookWorkerAccessCredentialName** and **SubscriptionAccessCredentialName**.

The third and finaly one we will save is the Log Analythics Subscription ID and its private key. In this case the username will be *Subscription ID*, and the password should be the *Private Key* as we provide the credentials.

Once all of the credentials have being defined, and stored, we can check the vault to ensure that everything is working as expected by using the helper command `Get-PasswordVaultCredential`

# Deploy

At this point we have now completed all the required configuration work in the solution, and can proceed with deploying the framework. 

This will acomplish quite a lot for us, including 

* Building out the Azure Automation account
* Creating a Azure Storage blob to host the PS Modules we may use
* And deploying a runbook which will monitor our Git Repository

To start the process, we will call our deployment script as follows:

>Note: It is **imperitave** that you Change into the directory, and not launch indirectly due to path mappings

```powershell
cd \Git\ScorchDev\ARM\\automation-sourcecontrol
./psDeploy.ps1
```

------------
> Edits and Clippings

## Defining the Runbook Workers Web Endpoints

All of our runbooks will at some point need to communicate with the Automation engine environment which is hosting it, for example just to query or update our global variables. Therefore we need to define what the endpoints for the REST API which the runbooks should communicate with for the hosting environment. These will generally change depending on your environments, for example Staging verus Production.

> Note: Its also possible that you might just want to refer to the environment as "https://localhost" but only if you have the web REST APIs also deployed to each of your runbook servers.
>
* **WebserviceEndpoint** : "https://sma.diginerve.net"
* **WebservicePort** : "9090"

```PowerShell
Set-AutomationVariable -Prefix ContinuousDeployment -Name WebserviceEndpoint -Value "https://sma.diginerve.net" -Description "Local SMA Instance URI"
Set-AutomationVariable -Prefix ContinuousDeployment -Name WebservicePort -Value "9090" -Description "Local SMA Instance Port"
Get-AutomationVariable -Name ContinuousDeployment-WebserviceEndpoint
Get-AutomationVariable -Name ContinuousDeployment-WebservicePort
```

### Defining the Runbook Workers Credentials


* **CredentialName** : "WIN-CHTKSP77JVN\\Administrator"


```PowerShell
Set-AutomationVariable -Prefix ContinuousDeployment -Name CredentialName -Value "WIN-CHTKSP77JVN\\Administrator" -Description "Local SMA Instance URI"
Get-AutomationVariable -Name ContinuousDeployment-WebserviceEndpoint

$credential = Get-Credential -Message "Credentials for Local Development SMA REST Access" -UserName "WIN-CHTKSP77JVN\Administrator"
Set-PasswordVaultCredential -Credential $credential -Resource 'LocalDev'
Get-PasswordVaultCredential
```

### Defining the Integration Runbook Montitor Life Time

The solution is built on the concept of Continous deployment, and thus we need some paramaters to define what this really means. Also based on best practices a runbook should never just run for ever, but instead kill it self, and spwan a new instance to keep everything fresh and clean; and make reviewing logs a ton load easier also!

The following Variables are defined to set the life time settings related to the runbooks existance

* **MonitorLifeSpan** : 300
  * The period in Minutes for which this runbook will run, after which it will attempt to commit suicide and kill it self, but will start a new instance before dieing
* **MonitorCheckpoint** : 5
  * How often should the runbook execute a checkpoint during it life
* **MonitorDelayCycle** : 30
  * The period of time to wait between executions in seconds

```PowerShell
Set-AutomationVariable -Prefix ContinuousDeployment -Name MonitorLifeSpan -Value 300 -Description "Local SMA Instance URI"
Set-AutomationVariable -Prefix ContinuousDeployment -Name MonitorCheckpoint -Value 5 -Description "Local SMA Instance Port"
Set-AutomationVariable -Prefix ContinuousDeployment -Name MonitorDelayCycle -Value 30 -Description "Local SMA Instance Port"
Get-AutomationVariable -Name ContinuousDeployment-MonitorLifeSpan
Get-AutomationVariable -Name ContinuousDeployment-MonitorCheckpoint
Get-AutomationVariable -Name ContinuousDeployment-MonitorDelayCycle
```

### Defining Deployment Repository Information

The last, and probably most important variable we will set, is used to tell the Continous Integration runbook what repoisitories it will be monitoring, the branch of the repository which is applicable to this environment, and where to keep the working copies on the files on the runbook server.

> NOTE: The working copy of the repositories are used for GIT to check out the latest version of the code, and once complete, this code is then imported into service management automation.

The architecture of the integration runbook, is designed to support multiple repositories. To simplify the configuration, we can use the very flexiable hash table functions in powershell again, to define the required paramaters which the integration workflow leverages.

For each repoisitory, we need to define the following settings

* **Path**                   : C:\SMAData\ScorchDev
  * The Location on the Runbook Worker which should be used as the staging area; The runbook will use this path as the clone location for the GIT Repoistory, and then as the source location to import the resources into SMA  
* **GlobalsFolder**          : Globals
  * In the Local Development Environment as we define Global Assets, these are stored in a JSON file; this path indicates the name of the folder within the repository which hosts the JSON File.
* **RunbookFolder**          : Runbooks
  * In the Local Development Environment as we define Runbooks for the repository, we will keep these organised under one main folder; this path indicates the name of the folder within the repository which hosts the runbooks.
* **PowerShellModuleFolder** : PowerShellModules
  * In the Local Development Environment as we define PowerShell Modules for the repository, we will keep these organised under one main folder; this path indicates the name of the folder within the repository which hosts the modules.
* **RepositoryPath**         : https://github.com/damianflynn/ScorchDev.git
  * The URI to the Repoistory which is to feed this workspace
* **Branch**                 : master
  * The Branch of the repository which is to be deployed for this workspace
* **CurrentCommit**          : -1
  * The Current Commit level of the repository which is located on the worker. Initially there is no clone, we will simply set this to '-1' and the runbook will maintain this after the first pull.

The following is an example of just the main continous integration workflow.

> NOTE: The RepositoryPath which is defined below is pointing to a public GIT repository hosted on GitHub. You can easily change this to point at any other GIT repoistory, for example one hosted as part of TFS, or an internal Enterprise GIT Server, Just ensure that the Runbook Worker has access to reach the repository.

> NOTE: In the event the repoistory is Private, you will need to provide credentials to access the repository. In this case we recommend you create a user account with access to the repository which will be used only for the integration pulls. Then encode the username and password as part of the URI, for example 'https://Username:Password@/damianflynn/ScorchDev.git'

```PowerShell
$RepositoryInformation = @{
    'ContinuousDeployment' = @{
        'Path'                   = 'C:\GIT\ContinuousDeployment'
        'RepositoryPath'         = 'https://github.com/damianflynn/ScorchDev.git'
        'RunbookFolder'          = 'Runbooks'
        'PowerShellModuleFolder' = 'PowerShellModules'
        'Branch'                 = 'master'
        'CurrentCommit'          = '-1'
    }
}
```

Now, once we have defined this table, to store the details in a Variable, we will simply convert the table to a nice clean JSON string, and save it to our local configuration environment.

```powershell
ConvertTo-Json -InputObject $RepositoryInformation

Set-AutomationVariable -Prefix ContinuousDeployment -Name RepositoryInformation -Value (ConvertTo-Json -InputObject $RepositoryInformation) -Description "Repository Details for Continuous Deployment"

Get-AutomationVariable -Name ContinuousDeployment-RepositoryInformation
```

### Checking in the updated configuration

With the configuration complete, we can now add the changes we just completed to the active branch, for now this is just 'master' as we have not discussed branches yet. Then commit these changes with a comment, and finally push the changes to our hosted repoisitory.

```
git add -A :/
git commit -m "Updated the Configuration Settings in the Local Development Environment to match the runbook hosts"
git push
```

## Preparing our SMA Server for Continous deployment

Now that we have our copy of the ScorchDev repository hosted in our GitHub account, and updated it to represent the runbook environment configuration, we will need to clone a copy of this locally to just one of the runbook workers in this farm so we can deploy the continus integration services.

> Note: Before you proceed you will need to have a copy of Git for Windows installed on your workstation!

1. Create or Navigate to a working folder which we will use as the base for where we are going to clone our repositories to, for example I will use `C:\git` on my system
2. Now, we will clone a copy of the repository and any submodules which it may contain to our workstation using the following command `git clone --recursive https://github.com/damianflynn/ScorchDev`. Of course you will replace my account name 'damianflynn' with your account right!

After a few minutes, we should have a copy of the repository on our machine.

### Installing the Modules and Runbooks on the Worker

First, lets get the modules added to our PowerShell search path

```powershell
$ContinousModules = "C:\git\ScorchDev\PowerShellModules"
$env:PSModulePath = "$($env:PSModulePath);$ContinousModules"
```

Now lets register the installer in our session so we can begin the implemention
```powershell
cd \git\ScorchDev\Installer
.\Deploy-Integration.ps1
```

### Defining the Runbook Workers Credentials

* **CredentialName** : "WIN-CHTKSP77JVN\\Administrator"

```PowerShell
Set-AutomationVariable -Prefix ContinuousDeployment -Name CredentialName -Value "WIN-CHTKSP77JVN\\Administrator" -Description "Local SMA Instance URI"
Get-AutomationVariable -Name ContinuousDeployment-WebserviceEndpoint

$credential = Get-Credential -Message "Credentials for Local Development SMA REST Access" -UserName "WIN-CHTKSP77JVN\Administrator"
Set-PasswordVaultCredential -Credential $credential -Resource 'LocalDev'
Get-PasswordVaultCredential
```

Add the Credential to the SMA Store also

Using the UI, we can add the following credential object
* **Credential Type** : PowerShell Credential
* **Name** : WIN-CHTKSP77JVN\Administrator
  * Note this Name Must Match the Value in the *ContinuousDeployment-CredentialName* Variablevvv
* **Description** : Credentials with access to the Current Runbook Farm REST API
* **User Name** : The Windows Account which has access to the REST API
* **Password** : The associated password for the Windows Account

### Deploying the Integation

> Note: This MUST be ran from the Installer folder, as the scripts use relative paths to locate thier resources currently.

```powershell
C:\git\ScorchDev\Installer>
Deploy-Integration -currentcommit -1 -repositoryname ContinuousDeployment -Credential $credental
```
Assuming this completed without any issues, we should now see that there are a number of new variable assets in the SMA environment representing the variables we defined earlier, and also we should see the integration runbook.

### Starting the Integration

Now, simply start the Runbook **Monitor-SourceControlChange**, and if you like to montior the progress, then simply watch the job progress. The workflow has verbose output but by default when deployed this logging is turned off, so you may also choose to enable this for the first few days to observe the flow processing.



## Next Steps

Remember, that your new disk will not typically be available to the VM if it reboots unless you write that information to your [fstab](http://en.wikipedia.org/wiki/Fstab) file. If you want, you can add several more disks and [configure RAID](virtual-machines-linux-configure-raid.md).

To learn more about Linux on Azure, see:

- [Linux and Open-Source Computing on Azure](virtual-machines-linux-opensource.md)

- [How to use the Azure Command-Line Interface](../virtual-machines-command-line-tools.md)

- [Deploy a LAMP app using the Azure CustomScript Extension for Linux](virtual-machines-linux-script-lamp.md)

- [The Docker Virtual Machine Extension for Linux on Azure](virtual-machines-docker-vm-extension.md)
