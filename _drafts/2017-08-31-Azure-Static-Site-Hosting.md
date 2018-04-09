---
authors: Damian Flynn
comments: true
date: 2017-08-31 20:30:00
layout: post
description: Azure Staic Site Hosting Sample
title: "Static Site Hosting On Azure"
categories:
- IT Pro/DevOps
tags:
- Continous Deployment
- DevOps
---




<!--excerpt.start-->I am delighed to be invited as a guest presenter for the Windows Mangement User Group, for thier November 2016 online Webinar. This dutch event is open to everyone to join and will be presented in English (well seriosuly, can you imagine what my Irish Dutch would sound like?!!?)<!--excerpt.end--> As an online event, everyone is welcome to join and I am following in the foot steps of some amazing people whom have presented over the years. 




### Configuration Settings

|Item                      | Variable               | Value
|---|---|---|
|Azure Location            | azLocation             | North Europe
|Resource Group Name       | azResourceGroup        | StaticWebsite
|Storage Account Name      | azStorageName          | damianflynn
|Storage Connection String | azStorageConnection    | *to be deterimed during configuration*
|Storage Container Name    | azStorageContainerName | Blog
|CDN Profile Name          | azCDNProfileName       | staticWebsite
|CDN Endpoint Name         | azCDNEndpointName      | damianflynn


```bash
export azLocation="North Europe"
export azResourceGroup="StaticWebsite"
export azStorageName="damianflynn"
export azStorageContainerName="blog"
export azCDNProfileName="staticWebsite"
export azCDNEndpointName="damianflynn"
```

### Creates a resource group

```bash
az group create --location $azLocation \
   --name $azResourceGroup
```

### Create the Storage

Once this step is complete, we will have a storage account, and container which will be publically available, and hosted  for HTTP and HTTPS traffic.

The site will be listening at:

**Origin Hostname**: https://*$azStorageName*.blob.core.windows.net

#### Creates a blob storage account

> Locally-redundant storage (LRS) should suffice.
> We will require frequent access and therefore choose the Hot tier.

```bash
az storage account create --location $azLocation \
   --name $azStorageName \
   --resource-group $azResourceGroup \
   --kind BlobStorage \
   --sku Standard_LRS \
   --access-tier Hot
```

#### Storage Connection String 
As the connection string is quite long, and we are going to need to supply it a a paramater to many of the commands we are going to execute, we can export its value to a shell variable which we will call $azStorageConnection

```bash
export azStorageConnection=$(az storage account show-connection-string \
   --name $azStorageName \
   --resource-group $azResourceGroup | \
   grep -Eo "\"DefaultEndpointsProtocol.*")
```

#### Creates a publicly (anonymously) accessible container to host the static site

```bash
az storage container create --connection-string $azStorageConnection \
   --name $azStorageContainerName

az storage container set-permission --connection-string $azStorageConnection \
   --name $azStorageContainerName \
   --public-access container
```



### Upload Static site

With the storage now in place, we can proceed to upload the site content to the storage. As we need to ensure that we tag each of the resources with the correct content type for serving to browsers, we will need to upload the files type by type.
 
```bash
# Upload all files of a specific content type in batches.

# Copy all CSS files
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "text/css" --pattern "*.css"

# Copy all PNG images
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "image/png" --pattern "*.png"

# Copy all GIF images
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "image/gif" --pattern "*.gif"

# Copy all JPG images
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "image/jpg" --pattern "*.jpg"

# Copy all HTML files
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "text/html" --pattern "*.html"

# Copy all JavaScript files
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "application/javascript" --pattern "*.js"

# Copy all XML files
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "text/xml" --pattern "*.xml"

# Copy all Icon files
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "image/x-icon" --pattern "*.ico"

# Copy all ZIP files
az storage blob upload-batch --connection-string $azStorageConnection \
--destination $azStorageContainerName --source ~/clouddrive/blog/ \
--content-type "application/zip" --pattern "*.zip"

# ... Continue doing this for other file types
```

#### Verification

At this point of the process, our static site content should be hosted in the blob, and accessible from anywhere on the internet.
We should have at a minimum uploaded a file called `index.html` to root of the container, which can be a simple HTML file.

The site should be accessible from the following location:

**Storage Site**: https://*$azStorageName*.blob.core.windows.net/$azStorageContainerName/index.html

### Content Delivery Network

#### Create a CDN Profile

As we will need to implement a number or transform rules, we need to use a Permium version of the CDN Service

```bash
az cdn profile create --name $azCDNProfileName \
   --resource-group $azResourceGroup \
   --location $azLocation \
   --sku Premium_Verizon
```

#### Create a CDN Endpoint

With the profile defined, we need to proceed to create the endpoint which will be the new edge for our site.

```bash
az cdn endpoint create --name $azCDNEndpointName \
   --location $azLocation
   --resource-group $azResourceGroup \
   --profile-name $azCDNProfileName \
   --origin $azStorageName.blob.core.windows.net \
   --origin-path /$azStorageContainerName
   --origin-host-header $azStorageName.blob.core.windows.net \
   --no-http false \
   --no-https false \
```

Once established, the edge will be publically available at the following location:

**Edge Hostname**: *$azCDNEndpointName*.azureedge.net

#### Custom Domain Name

On your DNS Name Servers, proceed to create a new `CNAME` for the service, pointing to the newly created Edge Hostname.

For example, my DNS is hosted with GODaddy, and I add a record similar to the following

```DNS
CNAME    blog     damianflynn.azureedge.net  1h
```

You should then validate that this record is working as expected before proceeding. 

```bash
$ dig cname blog.damianflynn.com +short
damianflynn.azureedge.net.
```

Now, finally we can proceed with creating our custom Domain

```bash
az cdn custom-domain create -host-name blog.damianflynn.com \
   --resource-group $azResourceGroup \
   --profile-name $azCDNProfileName \
   --endpoint-name $azCDNEndpointName 
```

Once established, the edge will be publically available at the new alias location:

**Edge Alias**: blog.damianflynn.com

#### Rewrite rules

For this final part, we need to use the Azure Portal UX, as I have not yet figured out the process to configure the settings from the Azure CLI

Navigate to your newly created resoure group, and open the blade for the `CDN Profile`. This will by default display the `Overview` details blade.
Click on **Manage** button, to have your browser launch a new page for managing the CDN configuration

* Navigate to the menu item ***HTTP Large*** and from the drop down select the option **Rules Engine**
  * In the **Name / description** field, provide a name for the rule
  * Ensure the first dropdown says **IF**, and the second dropdown shows as **Always**
  * Click on **+** button next to **Features** two times
    * Set Both of the new dropdown selectors to read **URL Rewrite**
    * Set Both pairs of ***Source*** and ***Destination*** dropdowns to your endpoint name, e.g. `/1234AB/damianflynn`
    * Set Both of the new dropdown selectors to read **URL Rewrite**
    * Set the first source pattern as `((?:[^\?]*/)?)($|\?.*)`
    * Set the first destination pattern as `$1index.html$2` 
    * Set the second source pattern as `((?:[^\?]*/)?[^\?/.]+)($|\?.*)`
    * Set the second destination pattern as `$1/index.html$2`
  * Click on **Add** button to save the new rule
 
> Note: It will take up to 4 hours for the setting to propagate to all the CDN nodes.

After the status has changed to be **Active**, you should be able to access the site by going to your CDN Endpoint URL without pointing directly to index.html!
