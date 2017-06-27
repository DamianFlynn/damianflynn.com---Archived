---
author: Damian Flynn
comments: true
date: 2016-02-04 09:40:00
layout: post
title: "Azure Pack: Get the Token?"
categories:
- Identity & Access Management
- IT Pro/DevOps
- Security
tags:
- PowerShell
- Azure
- Active Directory
- Azure AD
- Federation
- Windows Azure Pack
---

This post is primarily for personal reference. It is a clone of the code posted on the (Windows Azure Pack Security Troubleshooting)[https://technet.microsoft.com/en-us/library/dn554315.aspx#C_GetMgmtSvcToken] page.

The code resolves a problem in the default function when requesting a token to work with the Azure Pack sites from PowerShell, in the scenario that the site is configured with a connection to ADFS. 

```powershell
function Get-AdfsToken([string]$adfsAddress, [PSCredential]$credential)
{
    $clientRealm = 'http://azureservices/AdminSite'
    $allowSelfSignCertificates = $true

    Add-Type -AssemblyName 'System.ServiceModel, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089'
    Add-Type -AssemblyName 'System.IdentityModel, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089'

    $identityProviderEndpoint = New-Object -TypeName System.ServiceModel.EndpointAddress -ArgumentList ($adfsAddress + '/adfs/services/trust/13/usernamemixed')
    $identityProviderBinding = New-Object -TypeName System.ServiceModel.WS2007HttpBinding -ArgumentList ([System.ServiceModel.SecurityMode]::TransportWithMessageCredential)
    $identityProviderBinding.Security.Message.EstablishSecurityContext = $false
    $identityProviderBinding.Security.Message.ClientCredentialType = 'UserName'
    $identityProviderBinding.Security.Transport.ClientCredentialType = 'None'

    $trustChannelFactory = New-Object -TypeName System.ServiceModel.Security.WSTrustChannelFactory -ArgumentList $identityProviderBinding, $identityProviderEndpoint
    $trustChannelFactory.TrustVersion = [System.ServiceModel.Security.TrustVersion]::WSTrust13

    if ($allowSelfSignCertificates)
    {
        $certificateAuthentication = New-Object -TypeName System.ServiceModel.Security.X509ServiceCertificateAuthentication
        $certificateAuthentication.CertificateValidationMode = 'None'
        $trustChannelFactory.Credentials.ServiceCertificate.SslCertificateAuthentication = $certificateAuthentication
    }

    $ptr = [System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($credential.Password)
    $password = [System.Runtime.InteropServices.Marshal]::PtrToStringUni($ptr)
    [System.Runtime.InteropServices.Marshal]::ZeroFreeCoTaskMemUnicode($ptr)

    $trustChannelFactory.Credentials.SupportInteractive = $false
    $trustChannelFactory.Credentials.UserName.UserName = $credential.UserName
    $trustChannelFactory.Credentials.UserName.Password = $password #$credential.Password

    $rst = New-Object -TypeName System.IdentityModel.Protocols.WSTrust.RequestSecurityToken -ArgumentList ([System.IdentityModel.Protocols.WSTrust.RequestTypes]::Issue)
    $rst.AppliesTo = New-Object -TypeName System.IdentityModel.Protocols.WSTrust.EndpointReference -ArgumentList $clientRealm
    $rst.TokenType = 'urn:ietf:params:oauth:token-type:jwt'
    $rst.KeyType = [System.IdentityModel.Protocols.WSTrust.KeyTypes]::Bearer

    $rstr = New-Object -TypeName System.IdentityModel.Protocols.WSTrust.RequestSecurityTokenResponse

    $channel = $trustChannelFactory.CreateChannel()
    $token = $channel.Issue($rst, [ref] $rstr)

    $tokenString = ([System.IdentityModel.Tokens.GenericXmlSecurityToken]$token).TokenXml.InnerText;
    $result = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($tokenString))
    return $result
}
```

The use the function, we can define the variables, similarly to the following sample, and then leverage the function to get a valid token, as follows

```powershell
# Fill in values
$adfsAddress = 'https://adfshost'
$username = 'domain\username'
$password = 'password'
$securePassword = ConvertTo-SecureString -String $password -AsPlainText -Force
$credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $username,$securePassword

$token = Get-AdfsToken -adfsAddress $adfsAddress -credential $credential 
$token
```

*Note: All credits for this code are attributed to the original post and author.*