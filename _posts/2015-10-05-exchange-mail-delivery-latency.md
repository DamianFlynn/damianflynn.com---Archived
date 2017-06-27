---
author: Damian Flynn
comments: true
date: 2015-10-05 22:07:00
layout: post
title: "Exchange: Mail delivery latency KPI"
categories:
- Business Intelligence
- IT Pro/DevOps
- Monitoring & Management
- Messaging Platforms
tags:
- Powershell
- Azure Auotmation
- Service Management Automation
- PowerBI
- Dashboards
- KPI
- Exchange
- SMTP
---

One of the new KPI's which I have been asked recently to collect and report on is that of the average time to deliver email in our hybrid environment.

Initially I considered this to be a horrible request as my first gut reaction was to write a workflow to connect with Exchange using the Exchange Web Services, send an email to a known external echo address, then monitor to the echo to return; reading the deliver header to determine the duration which has elapsed from the initial send, to the final recipe of the echo. I would need to repeat this process very frequently, storing the results in a database, which I could query to get back the average of all samples for the week, thus providing the value for my KPI.

However, there are many ways to skin the cat, and as I truly begun to consider this objective, it became clear that if I just analysed the emails in my inbox for the same period of time, the headers of these mails would provide a very good source of data from which to build the same KPI results.

# Exchange 2010 and Beyond

Now, once we realise that the mail environment is powered by Exchange 2010 or newer, things get even better. We have a fantastic feature which holds all the data we could ever be interested in, that of course is the ever so helpful **Message Tracking Logs**.

In these logs, when a HUB server delivers a message (through the Store Driver) it generates a DELIVER event which contains the TimeStamp of when the message was delivered as well the MessageLatency; which is the difference between the original arrival time of the message and this timestamp.

Let's look at what these logs offer us, the following command will present all the properties of the first entry in the current logs.

```powershell
PS > Get-TransportServer | Get-MessageTrackingLog | select * -First 1

RunspaceId              : 4159009d-????-????-????-4edccd3e6c16
Timestamp               : 06/09/2015 01:02:44
ClientIp                :
ClientHostname          : Exchange2010
ServerIp                :
ServerHostname          : Exchange2010
SourceContext           : 08D2A38562DD7452;2015-09-06T00:02:44.134Z;0
ConnectorId             :
Source                  : STOREDRIVER
EventId                 : DELIVER
InternalMessageId       : 3175
MessageId               : <6a85be58-????-????-????-913b4613e40e@CH???HUB13.???.gbl>
Recipients              : {?????@?????.net}
RecipientStatus         : {}
TotalBytes              : 22903
RecipientCount          : 1
RelatedRecipientAddress :
Reference               :
MessageSubject          : Healthy: "My first test" in app "my blog site"
Sender                  : ??reply@??????.com
ReturnPath              : ??reply@??????.com
MessageInfo             : 2015-09-06T00:02:43.649Z;SRV=EXCHANGE2010.??????.net:TOTAL=0
MessageLatency          : 00:00:00.5320000
MessageLatencyType      : EndToEnd
EventData               : {[MailboxDatabaseName, ??????], [DatabaseHealth, -1]}

WARNING: There are more results available than are currently displayed. To view them, increase the value of the ResultSize parameter.
```

Now, Let's check the mailbox, and find this matching message, so we can take a closer look at the mail header; why? so that we can verify the data in the log is trustable for our PKI

```
Received: from smtp.???.com (207.46.200.23) by smtp.??????.net
 (???.??.??.??) with Microsoft SMTP Server (TLS) id 14.3.210.2; Sun, 6 Sep 2015
 01:02:43 +0100
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=microsoft.com;
	s=s1024; t=1441497762; h=From:Subject:Date:Message-ID:To:MIME-Version
	:Content-Type; bh=CAm79b/B//rjl74f3kAUnQ8udQgOsyg47G1c47VuwhI=; b=h6RA8Ye
	c/0IOi+YcOouJmgruX3mhBal3g5n+Tca+7E5v6EtrsPfH44412/9buynbD1FxLYdIBQLhgQ6I
	l0P/2p+eWTs8q0qjuqaTeWhF0Sh77r4T6xvUIyht7C6Tfa1D4PzeuU3wyUPc04NkF/4+pOd5j
	ycX4AYYkTbsqdPrCV0=;
MIME-Version: 1.0
From: App Insights Alerts <??reply@??????.com>
To: <????@??????.com>
Date: Sun, 6 Sep 2015 00:02:42 +0000
Subject: Healthy: "My first test" in app "my blog site"
Content-Type: multipart/alternative;
	boundary="--boundary_10198_64254f5b-bd41-47b6-a91a-85e6ac495da8"
Message-ID: <6a85be58-d164-403a-9eae-913b4613e40e@CH1GMEHUB13.gme.gbl>
Return-Path: ??reply@??????.com
X-DKIM-Signer: DkimX (v1.11.111)
X-MS-Exchange-Organization-AuthSource: Exchange2010.??????.net
X-MS-Exchange-Organization-AuthAs: Anonymous
```
Looking at Line 3 we can see the send time stamp *Sun, 6 Sep 2015
01:02:43 +0100*, and when we check lower in the header we can see the receive time stamp of *Sun, 6 Sep 2015 00:02:42 +0000*. The difference between these is the duration the message took to be delivered, which in this case is 1 second.

Now, refer to the ```MessageLatency``` from the Transport log, and it matches our result, but just a lot more accurately! in this case *00:00:00.5320000*

Fantastic, so now this log is the database we need to support.

## Analyse a days' worth of logs

So, now we can get a list of all the hub servers with ```Get-TransportServer```, then on each of these servers we can request the tracking log for the past 24 hours, which are *Deliver* type, finally we can return the *MessageLatency* for each message

```powershell
Get-TransportServer | Get-MessageTrackingLog -ResultSize Unlimited -Start (Get-Date).AddHours(-24) -EventID DELIVER | select MessageLatency
```

Simply awesome, we now have a really great set of raw data to work from, and have the one value we truly need to understand.

## Calculate the Weeks KPI

Extrapolating all this, we just need to expand the collection window to 7 days, and of course create an average from all the recorded *Deliver* records, using our favourite *Message Latency* property.


```powershell
PS > Get-TransportServer | Get-MessageTrackingLog -ResultSize Unlimited -Start (Get-Date).AddHours(-168) -EventID DELIVER | Select @{ Label="LatencyMilliseconds"; Expression={ $($_.MessageLatency).TotalMilliseconds } } | Measure-Object -Property LatencyMilliseconds -Average


Count    : 634
Average  : 3383.67350157729
Sum      :
Maximum  :
Minimum  :
Property : LatencyMilliseconds
```

And there we have it, all the data we could ever require for our KPI in a very nice line of PowerShell, gosh we could just show off and use a fancy one liner to report the average mail deliver over the last week in millseconds, with a very simple tweak:

```powershell
PS > (Get-TransportServer | Get-MessageTrackingLog -ResultSize Unlimited -Start (Get-Date).AddHours(-168) -EventID DELIVER | Select @{ Label="LatencyMilliseconds"; Expression={ $($_.MessageLatency).TotalMilliseconds } } | Measure-Object -Property LatencyMilliseconds -Average).Average

3383.67350157729
```

# Data Collection using a Workflow

But, to be really of any value, we will leverage the Service Manager Automation engine to schedule the data collection, and provide the data at the same predictable time each week.

<code data-gist-id="322050495c32d9d6eac2" data-gist-file="Get-OnPremiseExchangeMailLatency.ps1"></code>

If you look at the code, you will see that in lines 100-124 are using a very verbose method of collecting the same data we completed in just one line earlier.

After much initial issues I found that the ```MessageLatency``` data returned from the remote shell needed to be cast to ```[Timespan]```.

The results of calling this function will hand back a simple JSON object, for example
```
{
    "Latency":  7994.0027454679948,
    "Samples":  41498,
    "Status":  "Success",
    "Feedback":  "Located [41498] End to End Mail Messages, taking an average [7994.00274546799] milliseconds to route \n\r"
}
```

# Publishing the KPI

Now, all we have remaining to do, is publish the KPI, this is the workflow I will be using to accomplish this magical reality

<code data-gist-id="322050495c32d9d6eac2" data-gist-file="Post-DashboardMailDeliveryTime.ps1"></code>

All this does is create a simple helper function for adding or updating a record in our SharePoint list. Then we proceed to call our workflow to gather and calculate the latency information; this for me takes about 90 minutes to process 3 hubs for 7 days worth of logs...

Once complete we then call the helper function, passing in the name of the KPI we are about to publish, along with the value of the KPI.

Job Done!
