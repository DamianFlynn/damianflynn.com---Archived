The important part of our source are the two files – the template and the parameters files, nothing else is used for our continuous deployment process.

## Setup VSTS Build

In this instance, the term Build is a bit of a misnomer.  We don’t have any source code to build, but we do have some source and we want to produce an output.  The output will be a zip file known as an artifact, that can be published to the release manager for deployment to our environments.  So our build process is going to be very simple.

In the web browser still, click on the 'Build & Release' menu.  The 'Build' tab will be selected for us initially, presenting the 'Build Definitions'. The view will be focused on 'Mine', which initially will be empty, as this is our first time trough the process.

### Create a Build definition

The first task is to create an empty build definition that knows where to look for the source files:

!(VSTS Build Definations)[/media/posts/VSTS_Pipeline/VSTS Build New Defination 001.PNG]

1. Click on the button '+ New definition' to create a new build definition
2. Select *Empty* for the template type, click **Next**
!(VSTS Build Defination Type Empty)[/media/posts/VSTS_Pipeline/VSTS Build New Defination 002.PNG]
3. On the 'Settings' page, 
   * Set the *Repository source* as the **Team Project**
   * Set the *Repository* to the correct one for the project, as we created earlier.
   * Set the *Branch* to the branch you wish to build from, eg **master**
   * **Enable** the checkbox for *Continuous integration* to build whenever this branch is updated
   * Leave the *Default agent queue* set to **Hosted** to have the build carried out by Visual Studio Team System in the cloud.
   * Finally, the *Select folder* will be set to the project **/** root folder.
4. Click **Create**

### Add build steps

Next we need to add a build step to publish the template files into an artifact, so they are visible to the release manager:

!(VSTS Build Steps)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 001.PNG]

1. Click the button**Add build step…**
!(VSTS Build Step Types)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 002.PNG]
2. Click on **Utility** type in the left hand menu, then select the option *Publish Build Artifacts*, and click on **Add**.
3. We do not need any more steps for this process, so we can click **Close**.

#### Configure the Publish Artifact settings

Now we will define the parts of the Artifact which we need to publish
!(VSTS Build Artifact Template Folder)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 003.PNG]
1. On the *Path to Publish* setting, **Click** the *…* and then navigate to select the **Templates** subfolder in the project. Click **Close** to store the choice.
!(VSTS Build Artifact Template Settings)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 004.PNG]
2. Give the *Artifact name* field,  for example *ARM Template*
3. In the *Artifact type* from the choice of 'File Share' or 'Server', select the option **Server**
!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 005.PNG]
4. Click the Save button, which will prompt you for a name for the Build definition – complete the name, click OK.

##### Add granular filtering to the build trigger

It’s a good idea to ensure only changes to the template part of our source control tree trigger a build –
you can control this in the **Triggers** menu, 
!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 006.PNG]

From this view, we can customise the trigger settings, and in this case add an additional path filter.

!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 007.PNG]
1. Add a Path Filer to Include to the templates subfolder in your project, in my case that’s '$/LumaAdvantage/Admin Resource Template/Templates'
!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 007.PNG]
2. Save the new filter, providing some 

#### Validate the Build Steps
Now we’re ready and able to carry out a *build* to ensure our artifact is published.  Although we’ve setup a CI type build which will be triggered by changes in the source tree, you can also trigger a build manually by clicking on the **Queue build…** button.
!(VSTS Build Artifact Queue Build)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 009.PNG]
1. Leave all the parameters as defaults, and click the **Ok** button.

The view will update, and you will be able to watch as the system waits for a build host to become available. Once the host is ready, we will be connected to it, and we sould see the build of the artifact complete sucessfully for us
!(VSTS Build Artifact Queue Build Result)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 010.PNG]

Congratulations, you have completed your first automated build in the cloud!

## Setup VSTS Connection with your Azure Subscription

Before we start creating our release defination, we will first establish a connection, and enable this connection with the role premissions to allow it to manage the resources within the selected subscription

### Add Service Endpoint
Navigate to the *Settings* areas, and presented with the *Services* page, with our focus set to *Endpoints*. As this is our first time, we are not going to see a whole lot listed here.

!(VSTS Service Endpoints)[/media/posts/VSTS_Pipeline/VSTS Service Endpoints 001.PNG]

1. Click the button **New Service Endpoint** and from the drop down list, select the option **Azure Resource Manager**
!(VSTS Service Endpoints adding Azure Resource Manager Subscription)[/media/posts/VSTS_Pipeline/VSTS Service Endpoints 002.PNG]
2. In the *Connection Name* field, provide an name for the target subscription, eg "My Azure Subscription"
3. In the *Subscription* dropdown, select the relevant subscription which is associated with your currently logged in account. This process will add A new Azure Service Principal and assign it with "Contributor" role, provisioning access to all the resources in the selected subscription.
4. Click on the **Ok** button to apply the configuration, and add the Service Endpoint
5.The screen should refresh, and the new endpoint should be presented, offering you the ability to apply actions, including *disconnecting* again
!(VSTS Service Endpoints adding Azure Resource Manager Subscription)[/media/posts/VSTS_Pipeline/VSTS Service Endpoints 002.PNG]

## Setup VSTS Release

In the web browser still, click on the 'Build & Release' menu.  This time select the **Release** tab to present the 'Release Management' landing pageas with the option for adding a *New definition*.

### Create a Release definition

The first task is to create an release definition

!(VSTS Build Definations)[/media/posts/VSTS_Pipeline/VSTS Release New Definition 001.PNG]

1. Click on the button '+ New definition' to create a new build definition
2. Select *Empty* for the template type, click **Next**
!(VSTS Build Defination Type Empty)[/media/posts/VSTS_Pipeline/VSTS Release New Definition 002.PNG]
3. On the 'Artifacts' page, 
   * Set the *Artifact source* as the **Build**
   * Set the *Project* to the correct one for the project, as we created earlier.
   * Set the *Source Build* to the build you wish to deply from, eg **ARM Publis**
   * **Enable** the checkbox for *Continuous integration* to release whenever this build completes successfully
   * Leave the *Agent queue* set to **Hosted** to have the release carried out by Visual Studio Team System in the cloud.
4. Click **Create**

### Add Release Tasks

Next we need to add a release task to publish the artifact into our environments:

!(VSTS Release Environments)[/media/posts/VSTS_Pipeline/VSTS Release Environment 001.PNG]

1. Click the button**Add task step…**
!(VSTS Release Environment Task)[/media/posts/VSTS_Pipeline/VSTS Release Environment 002.PNG]
2. Click on **Deploy** type in the left hand menu, then select the option *Azure Resource Group Deployment*, and click on **Add**.
!(VSTS Release Environment Task)[/media/posts/VSTS_Pipeline/VSTS Release Environment 003.PNG]
3. We do not need any more steps for this process, so we can click **Close**.



#### Configure the Azure Deployment: Create or Update Resource Group settings

Now we will define the target for the deployment, and the template we will be using. There are a number of settings here to address as we complete this configuration.

!(VSTS Release Environment Resource Group Settings)[/media/posts/VSTS_Pipeline/VSTS Release Environment 004.PNG]
1. The *Azure Connection Type* determines the version of Azure we will target, the original *Classic* or current **Azure Resource Manager**. As we are deploying an *Azure Resource Manager Template*, this choice should be pretty obvious!
2. For the *Azure RM Subection* we will to create a reference to the subscription which we will be deploying to. If you have completed the process earlier of adding the Service Endpoint for your target subscription, then it will be listed in the dropdown for you to select now. However if you missed that step, you will need to instead *click* the button labeled **Manage** to setup the endpoint, and when complete, restart creating your *Release Defination* process again.
3. In the *Action* dropdown you can select the appropiate option, which for us will be **Create or Update Resource Group**
4. For the *Resource Group* you can use the dropdown to select an existing resource group in your subscription, or provide the name here.
   If this will be the first release to the resource group, it will be created for us, for subsequent releases it will apply updates based on the changes in the template. 
   For the purpose of the sample I am going to call the resource group *Dev-AdminEnvironment*
5. The *Location* will identity the Azure Location which we wish the resource group to be deployed to, for example *West Europe*
6. For the *Template* we will use the button **...** which will open the Select File dialog for us
!(VSTS Release Environment Resource Group Template Selection)[/media/posts/VSTS_Pipeline/VSTS Release Environment 005.PNG]
   1. Expand the *Build Atrifact* and select the ARM Template, for example **azuredeploy.json** which we will use for the deployment
   2. Click on **Ok** to save the selection 
7. For the *Template Parameters* we will repeat the same steps as we just did for the *Template*, this time selecting the paramaters file **azuredeploy.parameters.json** for the deployment
8. We can use the *Override Template Parameters* settings to override any of the settings defined as 'parameters' in your template. For now, we will skip this.
9. In the **Output** section we can define a variable which will be updated at the end of the task, for this configuration we do not need this feature currently 
10. In the **Control Options** section
   1. For this task to take effect we must ensure that the opition *Enabled* is checked
   2. If we wish to proceed after an error, we can set the option *Continue on errro*
   3. To force this step to run, even if there is no changes in the referenced template we can set the option *Always Run*
   4. To abort the process, if it is taking to long, we can set a *Timeout*, or leave it as **0** to disable this setting
11. Click **Save** to store the Task configuration
!(VSTS Release Environment Resource Group Task Save)[/media/posts/VSTS_Pipeline/VSTS Release Environment 006.PNG]


#### Validate the Environments Release Tasks
Now we’re ready and able to carry out a *release* to ensure our artifact is published.  Although we’ve setup a CI type release which will be triggered by changes after a sucessful build, you can also trigger a release manually.

Next to the title for the release definition, you should see a vertical bar and then a link to **Releases**, Click this to swap back to the view of Releases from the edit view.

!(VSTS Release Environment Releses)[/media/posts/VSTS_Pipeline/VSTS Release Environment 007.PNG]


1. Click the button **Releases** to create a new Release, and select **Create Release** from the dropdown menu.
!(VSTS Release Environment Release Settings)[/media/posts/VSTS_Pipeline/VSTS Release Environment 008.PNG]
2. Start by providing a *Release Description*, for example **Initial Release Test Validation**
3. For *Artifacts*, you should see your artifact name *ARM Publish* listed under the heading *Source Name*, and adjacent to it a dropdown under the heading *version* with a list of all the successful build numbers which have been created for that artifact.  Select the latest (highest number), which in my case is simply **1**
4. For the *Automate Deployments*, you should see the name of the chosen environment we are testing listed under the column heading *Envrionment*, which as we have not changed this will be called **Environment 1**. In the dropdown list for this environment under the heading *Deployment Trigger* ensure the option *Automated deployment: After release creation*.
5. Finally, we can click **Create**


The view will update, and you will be able to watch as the system begins to execute the steps of the release process. waits for a build host to become available. Once the host is ready, we will be connected to it, and we sould see the build of the artifact complete sucessfully for us
!(VSTS Build Artifact Queue Build Result)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 010.PNG]

Congratulations, you have completed your first automated build in the cloud!


-------------




Rename the Default Environment to “Dev” (by clicking on the name and typing). 

-----


Install the Node.JS extensions for VS2015
Launch VS, and connect to our VSTS Team
Open the Solution

## Adding the Admin Web Application to the Solution

* Right Click on the *Solution Name* and from the context menu, select **New** and then from the pop-out select **Project**
* The **Add a new Project** dialog will be presented.
!(VS Adding a Node Project)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 001.PNG]
  * In the navigation tree, on the left pane, expand the node *Javascript* and then *Node.JS* to be presented with a list of available templates
  * From the list of templates, select the option **Blank Node.js Web Application**
  * In the *Name* field, set the appropiate name for the project, for example **Webapp.Admin**
  * Finally click on **Ok** to create the new project in the solution

The new project will be presented in the *Solution Explorer*, with the default *server.js* file open in the editor, read for coding.

As this a Javascript project, the solution explorer will prompt to enable *typings* to our project for us.
!(VS Node Project, Initial View)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 002.PNG]

### Commiting the new Project to Source Control

Using the Team explorer, commit the new project changes to the solution

!(VS Node Project, adding to Source Control)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 003.PNG]


## Setup VSTS Build

This time we do have source code to build, based on *Node.JS*. To acomplish this, we are going to need to execute 2 steps in the process
* On the Build Server install all the node package dependencies our application will require
* Leverage an build automation tool, in this example **Gulp** to help compile the applciation for us.

In the web browser still, click on the 'Build & Release' menu.  The 'Build' tab will be selected for us initially, presenting the 'Build Definitions'. The view will be focused on 'Mine', which initially will be empty, as this is our first time trough the process.

### Create a Build definition

The first task is to create an empty build definition that knows where to look for the source files:

!(VSTS Build Definations)[/media/posts/VSTS_Pipeline/VSTS Build New Defination 001.PNG]

1. Click on the button '+ New definition' to create a new build definition
2. Select *Empty* for the template type, click **Next**
!(VSTS Build Defination Type Empty)[/media/posts/VSTS_Pipeline/VSTS Build New Defination 002.PNG]
3. On the 'Settings' page, 
   * Set the *Repository source* as the **Team Project**
   * Set the *Repository* to the correct one for the project, as we created earlier.
   * Set the *Branch* to the branch you wish to build from, eg **master**
   * **Enable** the checkbox for *Continuous integration* to build whenever this branch is updated
   * Leave the *Default agent queue* set to **Hosted** to have the build carried out by Visual Studio Team System in the cloud.
   * Finally, the *Select folder* will be set to the project **/** root folder.
4. Click **Create**

### Add build steps

Next we need to add a build step to publish the template files into an artifact, so they are visible to the release manager:

!(VSTS Build Steps)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 001.PNG]

1. Click the button**Add build step…**
!(VSTS Build NPM Types)[/media/posts/VSTS_Pipeline/VSTS Build Node Admin Build 001.PNG]
2. Click on **Package** type in the left hand menu, then select the option *npm*, and click on **Add**.
3. We do not need any more steps for this process, so we can click **Close**.

#### Configure the npm install settings

Now we will define the parts of the Artifact which we need to publish
!(VSTS Build Artifact Template Folder)[/media/posts/VSTS_Pipeline/VSTS Build Node Admin Build 002.PNG]
1. On the *command* setting, we simply provide the npm command paramater we wish to execute, as in this exmaple we will keep the default **install** command
2. Any additional npm *Arguments* can be provided in the associted field
3. In the *Advanced* section, expand to expose the *Working Folder* and using set the folder to match the root of the project which hosts the `package.json` and other node files, for example **LumaAdvantage\LumaAdvantage.Admin**
4. Click the Save button, which will prompt you for a name for the Build definition – complete the name, click OK.

##### Add granular filtering to the build trigger

We will enable continous integration, and control this build to only occur when changes in the project files are detected.

Navigate to the **Triggers** page, where initally we will see that there is nothting initially enabled. 

!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Node Admin Build 003.PNG]

1. **Enable** the checkbox for *Continuous integration* 
2. Add a Path Filer to Include to the admin project subfolder in our solution, in my case that’s '$/LumaAdvantage/LumaAdvantage.Admin'
!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Node Admin Build 004.PNG]
2. Save the new filter, providing some 


### Customise the projects packages and build
The basic sample node application has no node package dependencies, so at this point we can begin to configure out the application based on a Microsoft Proof Of Concept ToDo application.

We will begin by adding in some dependencies to the project. These will be inserted into the 'package.json' file

'''json
  "dependencies": {
    "express": "^4.13.3",
    "async": "^0.9.0",
    "body-parser": "~1.10.2",
    "cookie-parser": "~1.3.3",
    "documentdb": "^0.9.3",
    "jade": "~1.9.1"
  }
'''

!(VSTS Build Artifact Template Save Settings)[/media/posts/VSTS_Pipeline/VSTS Build Node Admin Build 005.PNG]

Save the file, which will cause the *Solution Explorer* to list the detected pagkages as *missing*. Right click on the *npm* node, and select from the context menu the option *Install missing npm packages* which will trigger the NPM process to fetch and install the packages ready for use.

Assuming you had no issues, we should also commit the changes using the *Team Explorer*, which will then trigger a build, which should also execute the build step of `npm install` downloading the modules to our build machine.

Looking at the build steps, we 


---
Add the Node to Document DB Sample code
---
Add Gulp deplendencies to the package
```json
"devDependencies": {
    "gulp": "^3.9.0",
    "gulp-zip": "^3.0.2"
```
Add gulp.js to the project
! Add Gulp File [VSTS Build Node Admin Build 007.PNG]

Add gulp step to the build process
! Add Gulp Build step [VSTS Build Node Admin Build 008.PNG]

Settings
Set the gulp file path
Set the working directory

! Gulp Settings [VSTS Build Node Admin Build 009.PNG]

Save the changes

Add the build step for deployment

## AzureRM Web Application Deployment
! AzureRM Web App Deployment Step [VSTS Build Node Admin Build 010.PNG]

add settings
Subscription : LumaAdvantage Azure Subscription
Web App Name (From the ARM Portal) poclumaadmin002web
Package: $(Build.StagingDirectory)/package.zip

! AzureRM Web App Deployment Step [VSTS Build Node Admin Build 011.PNG]

Save


#### Validate the Build Steps
Now we’re ready and able to carry out a *build* to ensure our artifact is published.  Although we’ve setup a CI type build which will be triggered by changes in the source tree, you can also trigger a build manually by clicking on the **Queue build…** button.
!(VSTS Build Artifact Queue Build)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 009.PNG]
1. Leave all the parameters as defaults, and click the **Ok** button.

The view will update, and you will be able to watch as the system waits for a build host to become available. Once the host is ready, we will be connected to it, and we sould see the build of the artifact complete sucessfully for us
!(VSTS Build Artifact Queue Build Result)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 010.PNG]

Congratulations, you have completed your first automated build in the cloud!

## Setup VSTS Connection with your Azure Subscription

Before we start creating our release defination, we will first establish a connection, and enable this connection with the role premissions to allow it to manage the resources within the selected subscription

### Add Service Endpoint
Navigate to the *Settings* areas, and presented with the *Services* page, with our focus set to *Endpoints*. As this is our first time, we are not going to see a whole lot listed here.

!(VSTS Service Endpoints)[/media/posts/VSTS_Pipeline/VSTS Service Endpoints 001.PNG]

1. Click the button **New Service Endpoint** and from the drop down list, select the option **Azure Resource Manager**
!(VSTS Service Endpoints adding Azure Resource Manager Subscription)[/media/posts/VSTS_Pipeline/VSTS Service Endpoints 002.PNG]
2. In the *Connection Name* field, provide an name for the target subscription, eg "My Azure Subscription"
3. In the *Subscription* dropdown, select the relevant subscription which is associated with your currently logged in account. This process will add A new Azure Service Principal and assign it with "Contributor" role, provisioning access to all the resources in the selected subscription.
4. Click on the **Ok** button to apply the configuration, and add the Service Endpoint
5.The screen should refresh, and the new endpoint should be presented, offering you the ability to apply actions, including *disconnecting* again
!(VSTS Service Endpoints adding Azure Resource Manager Subscription)[/media/posts/VSTS_Pipeline/VSTS Service Endpoints 002.PNG]

## Setup VSTS Release

In the web browser still, click on the 'Build & Release' menu.  This time select the **Release** tab to present the 'Release Management' landing pageas with the option for adding a *New definition*.

### Create a Release definition

The first task is to create an release definition

!(VSTS Build Definations)[/media/posts/VSTS_Pipeline/VSTS Release New Definition 001.PNG]

1. Click on the button '+ New definition' to create a new build definition
2. Select *Empty* for the template type, click **Next**
!(VSTS Build Defination Type Empty)[/media/posts/VSTS_Pipeline/VSTS Release New Definition 002.PNG]
3. On the 'Artifacts' page, 
   * Set the *Artifact source* as the **Build**
   * Set the *Project* to the correct one for the project, as we created earlier.
   * Set the *Source Build* to the build you wish to deply from, eg **ARM Publis**
   * **Enable** the checkbox for *Continuous integration* to release whenever this build completes successfully
   * Leave the *Agent queue* set to **Hosted** to have the release carried out by Visual Studio Team System in the cloud.
4. Click **Create**

### Add Release Tasks

Next we need to add a release task to publish the artifact into our environments:

!(VSTS Release Environments)[/media/posts/VSTS_Pipeline/VSTS Release Environment 001.PNG]

1. Click the button**Add task step…**
!(VSTS Release Environment Task)[/media/posts/VSTS_Pipeline/VSTS Release Environment 002.PNG]
2. Click on **Deploy** type in the left hand menu, then select the option *Azure Resource Group Deployment*, and click on **Add**.
!(VSTS Release Environment Task)[/media/posts/VSTS_Pipeline/VSTS Release Environment 003.PNG]
3. We do not need any more steps for this process, so we can click **Close**.



#### Configure the Azure Deployment: Create or Update Resource Group settings

Now we will define the target for the deployment, and the template we will be using. There are a number of settings here to address as we complete this configuration.

!(VSTS Release Environment Resource Group Settings)[/media/posts/VSTS_Pipeline/VSTS Release Environment 004.PNG]
1. The *Azure Connection Type* determines the version of Azure we will target, the original *Classic* or current **Azure Resource Manager**. As we are deploying an *Azure Resource Manager Template*, this choice should be pretty obvious!
2. For the *Azure RM Subection* we will to create a reference to the subscription which we will be deploying to. If you have completed the process earlier of adding the Service Endpoint for your target subscription, then it will be listed in the dropdown for you to select now. However if you missed that step, you will need to instead *click* the button labeled **Manage** to setup the endpoint, and when complete, restart creating your *Release Defination* process again.
3. In the *Action* dropdown you can select the appropiate option, which for us will be **Create or Update Resource Group**
4. For the *Resource Group* you can use the dropdown to select an existing resource group in your subscription, or provide the name here.
   If this will be the first release to the resource group, it will be created for us, for subsequent releases it will apply updates based on the changes in the template. 
   For the purpose of the sample I am going to call the resource group *Dev-AdminEnvironment*
5. The *Location* will identity the Azure Location which we wish the resource group to be deployed to, for example *West Europe*
6. For the *Template* we will use the button **...** which will open the Select File dialog for us
!(VSTS Release Environment Resource Group Template Selection)[/media/posts/VSTS_Pipeline/VSTS Release Environment 005.PNG]
   1. Expand the *Build Atrifact* and select the ARM Template, for example **azuredeploy.json** which we will use for the deployment
   2. Click on **Ok** to save the selection 
7. For the *Template Parameters* we will repeat the same steps as we just did for the *Template*, this time selecting the paramaters file **azuredeploy.parameters.json** for the deployment
8. We can use the *Override Template Parameters* settings to override any of the settings defined as 'parameters' in your template. For now, we will skip this.
9. In the **Output** section we can define a variable which will be updated at the end of the task, for this configuration we do not need this feature currently 
10. In the **Control Options** section
   1. For this task to take effect we must ensure that the opition *Enabled* is checked
   2. If we wish to proceed after an error, we can set the option *Continue on errro*
   3. To force this step to run, even if there is no changes in the referenced template we can set the option *Always Run*
   4. To abort the process, if it is taking to long, we can set a *Timeout*, or leave it as **0** to disable this setting
11. Click **Save** to store the Task configuration
!(VSTS Release Environment Resource Group Task Save)[/media/posts/VSTS_Pipeline/VSTS Release Environment 006.PNG]


#### Validate the Environments Release Tasks
Now we’re ready and able to carry out a *release* to ensure our artifact is published.  Although we’ve setup a CI type release which will be triggered by changes after a sucessful build, you can also trigger a release manually.

Next to the title for the release definition, you should see a vertical bar and then a link to **Releases**, Click this to swap back to the view of Releases from the edit view.

!(VSTS Release Environment Releses)[/media/posts/VSTS_Pipeline/VSTS Release Environment 007.PNG]


1. Click the button **Releases** to create a new Release, and select **Create Release** from the dropdown menu.
!(VSTS Release Environment Release Settings)[/media/posts/VSTS_Pipeline/VSTS Release Environment 008.PNG]
2. Start by providing a *Release Description*, for example **Initial Release Test Validation**
3. For *Artifacts*, you should see your artifact name *ARM Publish* listed under the heading *Source Name*, and adjacent to it a dropdown under the heading *version* with a list of all the successful build numbers which have been created for that artifact.  Select the latest (highest number), which in my case is simply **1**
4. For the *Automate Deployments*, you should see the name of the chosen environment we are testing listed under the column heading *Envrionment*, which as we have not changed this will be called **Environment 1**. In the dropdown list for this environment under the heading *Deployment Trigger* ensure the option *Automated deployment: After release creation*.
5. Finally, we can click **Create**


The view will update, and you will be able to watch as the system begins to execute the steps of the release process. waits for a build host to become available. Once the host is ready, we will be connected to it, and we sould see the build of the artifact complete sucessfully for us
!(VSTS Build Artifact Queue Build Result)[/media/posts/VSTS_Pipeline/VSTS Build Defination Step 010.PNG]

Congratulations, you have completed your first automated build in the cloud!
