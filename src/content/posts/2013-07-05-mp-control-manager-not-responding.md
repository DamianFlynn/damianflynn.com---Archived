---
author: Damian.Flynn
comments: true
publishDate: 2013-07-05 23:18:00+00:00
excerpt: SCCM 2012 Component Monitoring constantly reports that the Management Point
  is not responding to HTTP requests. In this post we conclued the root of this evil
  message is HTTPS related and caused by a rogue certificate.
template: post.hbt
slug: mp-control-manager-not-responding
title: MP Control Manager not responding
wordpress_id: 747
categories:
- Blog
tags:
- AD
- PowerShell
- SCCM
- WS/SC
---

The days starts off with a ugly red mark on your SCCM component health, but your a professional, and these are normally par for the course, taking only a few minutes of your highly skilled fingers to put this behind you.

But. Sadly as you quickly start to learn, that's not how the ball is going to role today. Nope, this one is going to be a total plain. The simple message "**_MP Control Manager detected management point is not responding to HTTP requests. The HTTP status code and text is 403, Forbidden._**" is about to take center stage.

The investigation begins when we take a closer look at the log, only to be presented in a repeating message that the MP is not working for HTTP traffic.

[![SCCM-MP-HTTP-Errors](http://blogstorage.damianflynn.com/wordpress/2014/08/SCCM-MP-HTTP-Errors-300x46.png)](http://blogstorage.damianflynn.com/wordpress/2014/08/SCCM-MP-HTTP-Errors.png)

Quickly, you connect over to the problem Management Point, and located the current IIS logs for this node. Quickly scrolling to a point where you can match the time stamps from the Control Manager with the events in IIS, so that you can get a view of what IIS is really up to.

What you see, however looks a little odd, the issue which IIS is reporting is not HTTP, but actually HTTPS (note the Port is listed in the log below as 443). The error is indeed 403, but again looking at the log it is not a simple 403.0 HTTP code, but actually is a 403.16 HTTP code. A quick search on this one, and now I am very confused, as the code translates to **Client certificate is untrusted or invalid**?

[![SCCM-IIS-HTTP-Log-403-16-Messages](http://blogstorage.damianflynn.com/wordpress/2014/08/SCCM-IIS-HTTP-Log-403-16-Messages-300x21.png)](http://blogstorage.damianflynn.com/wordpress/2014/08/SCCM-IIS-HTTP-Log-403-16-Messages.png)

Ok, what give? All the certificates involved here are being issues from a new CA, I have triple checked to ensure that the root chain is in place, and that all the certificates issued by this new CA are of sound mind and body. So why is IIS reporting this error?

After a few minutes for searching on the web, I reached the MS KB 952061, which when summarised basically says that my root certificate is not in the root certificate store, and therefore IIS is rejecting the connection. Well, sorry IIS, but that is clearly not the case, I checked again, just to keep my sanity and my root certificate is indeed in the **_Trusted Root Certification Authorities_** store on the computer.

So, more searching, as part of the error I also see that we have a code 2148204809 which is appearing every time I get this HTTP code. This one turned up yet another interesting message **_The operating system reported error 2148204809: A certificate chain processed, but terminated in a root certificate which is not trusted by the trust provider._**

Now, how could this be the problem? After all, IIS has the correct client cert offered to it, and the matching Root in its store, so a match should be obvious? Well apparently not. So back for some verification, and I happened to find this article which is related to Lync 2013, but while hosted on Windows Server 2012 – KB 2795828.

In this article, the cause explanation started to raise an eyebrow.


This issue occurs because a certificate that is not self-signed was installed in the **Trusted Root Certification Authorities**** **store. This is an incorrect configuration that can cause HTTP communication between Lync servers to fail with an untrusted root certificate error. Lync Server 2013 deployments in Windows Server 2012 may experience this issue because Windows Server 2012 implements checks for a higher level of trust for certificate authentication.


I like what I read now, and there is a simple PowerShell command which will help me validate that my server is not affected by this misconfiguration. Running the command should return nothing, as the root store should only have root certificates.

    
    PS > Get-Childitem cert:\LocalMachine\root -Recurse | Where-Object {$_.Issuer -ne $_.Subject} | Format-List *
    
    PSPath                   : Microsoft.PowerShell.SecurityCertificate::LocalMachineroot3DE2837CFE43D183879F1DF065CCD2CA40545FB1
    PSParentPath             : Microsoft.PowerShell.SecurityCertificate::LocalMachineroot
    PSChildName              : 3DE2837CFE43D183879F1DF065CCD2CA40545FB1
    PSDrive                  : Cert
    PSProvider               : Microsoft.PowerShell.SecurityCertificate
    PSIsContainer            : False
    EnhancedKeyUsageList     : {}
    DnsNameList              : {HIDDEN BY BLOGGER}
    SendAsTrustedIssuer      : False
    EnrollmentPolicyEndPoint : Microsoft.CertificateServices.Commands.EnrollmentEndPointProperty
    EnrollmentServerEndPoint : Microsoft.CertificateServices.Commands.EnrollmentEndPointProperty
    PolicyId                 :
    Archived                 : False
    Extensions               : {System.Security.Cryptography.Oid, System.Security.Cryptography.Oid,
    System.Security.Cryptography.Oid, System.Security.Cryptography.Oid...}
    FriendlyName             :
    IssuerName               : System.Security.Cryptography.X509Certificates.X500DistinguishedName
    NotAfter                 : 1/2/2016 6:05:05 AM
    NotBefore                : 3/30/2006 4:57:11 AM
    HasPrivateKey            : False
    PrivateKey               :
    PublicKey                : System.Security.Cryptography.X509Certificates.PublicKey
    RawData                  : {48, 130, 3, 135...}
    SerialNumber             : 41B5B1E9
    SubjectName              : System.Security.Cryptography.X509Certificates.X500DistinguishedName
    SignatureAlgorithm       : System.Security.Cryptography.Oid
    Thumbprint               : 3DE2837CFE43D183879F1DF065CCD2CA40545FB1
    Version                  : 3
    Handle                   : 656525007248
    Issuer                   : CN=Org  Root CA, O=Org
    Subject                  : CN=Org BI CA, O=Org, C=FI


However, that’s not what happened, Instead I have a certificate in the Root Store, which is not expected to be there. Bingo!

Now, looking at this certificate, I know that this has nothing to do with my SCCM environment, and getting rid of this is not going to be a problem. But where did it come from? Group Policy! Sure enough the certificate is published to the Root Store and not the Intermediate Store using Group Policy. So first things first, I get the root issue fixed, and then lets clean out this bad certificate from my local store.

    
    PS > Get-Childitem cert:\LocalMachine\root -Recurse | Where-Object {$_.Issuer -ne $_.Subject} | del
    PS > Get-Childitem cert:\LocalMachine\root -Recurse | Where-Object {$_.Issuer -ne $_.Subject} | Format-List *
    PS >


Now, all that remains is that the server gets a quick reboot.

Once the server is back online, I can quickly confirm in the IIS logs that my 400.16 is now replaced with a 200.0 message and everything is once more rosy in the world.

[![SCCM-IIS-HTTP-Log-200-Messages](http://blogstorage.damianflynn.com/wordpress/2014/08/SCCM-IIS-HTTP-Log-200-Messages-300x19.png)](http://blogstorage.damianflynn.com/wordpress/2014/08/SCCM-IIS-HTTP-Log-200-Messages.png)

Happy Hunting
