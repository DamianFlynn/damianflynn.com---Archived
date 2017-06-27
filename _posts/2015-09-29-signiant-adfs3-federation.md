---
author: Damian Flynn
comments: true
date: 2015-09-29 18:25:00
layout: post
title: "Federation: Signiant Media Shuttle"
categories:
categories:
- Identity & Access Management
- IT Pro/DevOps
- Security
tags:
- Powershell
- Active Directory
- Federation
- Windows Server 2016
- Windows Server 2012
---

In this post we will look at how we can configure an ADFS 2012 Server with a new Relying Trust, and add the required claims for that trust, all using powershell.
The sample is based on ADFS 2012 R2 using the native PowerShell module, and is been configured to enable a federation with a company called Signiant, and thier MediaShuttle service.

To help explain what is happening here, I am going to include details from the documentation offered by Signant, related to the sections which are relevant only.
As with any service to federate we have 2 sides to the equation:

A. The Service Provider we are going to build the trust with to use our Identities, the Identity Provider
B. Our Federation Service, offering the correct formated claims to the Service Consumer, the Relying Party

## Signiant Portal configuration

We will being with configuring the Serice Provider to communicate with out Identity Provider (Federation Service)

>NOTE: The following is an extract from the Signiant documentation

Configure the Identity Provider Metadata URL in Media Shuttle

* Launch the Media Shuttle Administration Console for your portal and go to the Security
page.
* Enable the "Use external SAML 2.0 provider to manage member logins" option in the
"Login is required" section.
* Type the metadata URL of your AD FS server in the "Identity Provider Metadata
URL" field (eg. https://<FQDN_of_your_ActiveDirectoryFederationService>/FederationMetadata/20
07-06/FederationMetadata.xml).
* Copy the Media Shuttle Service Provider Metadata URL that is provided (eg.
https://sample.mediashuttle.com/saml2/metadata/sp). This is required for the AD FS Relying Party Trust configuration step.
* Click Save.


## ADFS configuration

Now, we will shift focus, and this time start on the work needed to configure our Identity Provider to offer the correct details to the provider (relying party). This can be quite tricky, and if you have never threaded this water before it can take some time. To help simplify this, lets first look at what the Signant documentation suggests we should do, then once we have attempted to do all this manually, I will take all that detail and add it to a PowerShell function so we can easily implement this any time we need in the future, or for other environments, for example Proof of Concepts.

### Manual Exercise

>NOTE: The following is an extract from the Signiant documentation

Launch the AD FS 2.x Management Console.

1. Go to AD FS 2.x > Trust Relationships > Relying Party Trusts.
2. Select 'Add Relying Party Trust' from the Action menu to launch the Add Relying Party
Trust Wizard. Click Start.
  * Select the option to 'Import data about the relying party published online'.
  * Input the Media Shuttle Service Provider Metadata URL from Stage 1, and click Next.
  * Enter your Media Shuttle portal name as the display name. Click Next.
  * Select the option to 'Permit all users...'. Click Next.
  * Click Next to complete the wizard
  * Enable the checkbox to 'Open the Edit Claim Rules dialog'. Click Close.
3. On the 'Edit Claim Rules' dialog
  * On the Issuance Transform Rules tab, click the 'Add Rule' button and select 'Send
Claims using a Custom Rule'. Click Next.
    * In the Claim Rule Name field, type "<Your Media Shuttle portal name> Custom Claim".
    * In the Custom Rule field, copy and paste the following custom rule.
```
c1:[Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsaccountname"] &&
c2:[Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationinstant"]
=> add(
store = "_OpaqueIdStore",
types = ("https://sample.mediashuttle.com/internal/sessionid"),
query = "{0};{1};{2};{3};{4}",
param = "useEntropy",
param = c1.Value,
param = c1.OriginalIssuer,
param = "",
param = c2.Value);
```
> Replace https://sample.mediashuttle.com with the URL of your Media Shuttle portal.
    * Click Finish.
  * Click the 'Add Rule' button and select 'Transform an Incoming Claim'. Click Next.
    * In the Claim Rule Name field, type "<Your Media Shuttle portal name> Claim
Transform".
    * In the Incoming Claim Type field, type "https://sample.mediashuttle.com
/internal/sessionid", replacing https://sample.mediashuttle.com with the URL of your
Media Shuttle portal.
> Note: This must exactly match the "types" parameter from the
Custom Rule you entered in Step 11, above.
    * In the Outgoing Claim Type field, select the "Name ID" option.
    * In the Outgoing Name ID Format field, select the "Transient Identifier" option.
    * Select the Pass Through All Claim Values option, then Click Finish.
  * Click the 'Add Rule' button and select 'Send LDAP Attributes as Claims'. Click Next.
    * In the Claim Rule Name field, type "<Your Media Shuttle portal name> LDAP
Attributes".
    * In the Attribute Store field, select the Active Directory option.
    * In the LDAP Mapping fields, specify the following mappings:
```
LDAP Attribute Outgoing Claim Type
E-Mail-Addresses E-Mail Address
User-Principal-Name UPN
SAM-Account-Name Common Name
Display-Name Name
Given-Name Given Name
Surname Surname
Token Groups - Unqualified Names Role
```
    * Click Finish.
  * Click Apply, then Click OK to close the Edit Claim Rules dialog.
4. Select your portal in the Relying Party Trusts list, then select 'Properties' from the
Action menu.
  * Go to the Advanced tab.
  * In the Secure Hash Algorithm field, select the "SHA-1" option. Click Apply. Click OK.


### Powershell

Ok, that is pretty complicated stuff, and if you have seen the document from signant you will notice that i changed the formatting from a list of 23 points, to 4 main points with a lot of incuded steps, just to help see what is going on in the process.
I recommend that if you have not implemented a federation before, that you try the manual steps, it will work if you get all the details correct.
When you are done, then go back to your ADFS server, find that new Relying Trust and delete it!. Then using my powershell to try do the exact same thing, as we done manually.

<code data-gist-id="322050495c32d9d6eac2" data-gist-file="Add-SigniantFederationRelyingTrust.ps1"></code>

In the code, you will see that we follow all the main steps, exactly the same, but this time, we use the magic of Powershell to make it fast, and error free as possible.

This is all I now need to issue, which will create federation really simply for us.

```powershell
Add-SigniantFederationRelyingTrust -Name "My Signant Send Portal" -Group "!grp Signiant Send Portal Access" -MetadataURL = "https://myportal-send.mediashuttle.com/saml2/metadata/sp"
```

## Next Steps

The code is functional for the use with Signant, but more importantly this should proove to be quite useful to template out other federations which you may need to establish; with little pain.
Enjoy!
