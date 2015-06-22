---
author: Damian.Flynn
comments: true
publishDate: 2012-08-22 12:19:00+00:00
template: post.hbt
slug: sccm-2012-database-recovery
title: SCCM 2012 Database Recovery
wordpress_id: 528
categories:
- Blog
tags:
- SCCM
- SQL
- WS/SC
---

If you followed some of my earlier posts you will be aware that I recently deployed my first SCCM 2012 environment into production, and as part of the process I made a number of decision's regarding the architecture and roles:

  * I opted to utilize a remote SQL Cluster to host both my instances for SCCM  
  * And chose to deploy both a Central Administration Site (CAS) and Primary Site (PRI) in my environment. 

Over the last number of weeks, I have being considering what additional value I actually got from implementing the CAS, and questioning whether I would take this same approach if I needed to redeploy again… and honestly, I was trending towards the keeping it simple option, as I expect I will never hit the limits of a single primary side in terms of scale. However, that opinion has being changed now!

All deployments have risks, and as Administrators we take steps to hedge our exposure; considering SCCM 2012 one of the biggest risks is handing off your database to other members of your organisation to manage and maintain. Thankfully the team I work with is both agile and cohesive, so getting stuff done is enjoyable, and we all have a mutual respect; making many of these decisions easier.

But – there is always going to be the Firday 13th syndrome, and mine hit hard and fast a few weeks ago. While provisioning a new storage allocation for extending our SQL clusters a mistake on the storage provisioning started the grim reaper on his journey of destruction. As the end of the day's events the scene was not pretty; the SQL Instance which hosted my SCCM CAS Database was no more; the Instance hosting the Primary SCCM Database had lost its logs (easy fix), and Configuration Manager was Down hard.

A quick check for backups on my CAS instance quickly uncovered that these had not being executing correctly, and were unusable; so working with a colleague we checked the storage replicas which we snap and ship to the passive datacentre only to find that these were working as designed – however the storage had being originally labelled wrong, and the data from my CAS had never actually be replicated.

Good time as any for s stiff drink…

## NUMBER 1 CAS Benefit

With my CAS dead and not really sure if I actually had much value in it from the start, I focused on the Primary and got it back up and only with some relative ease; as all I had lost was the disk hosting the logs. A little time testing the primary console and I was able to relax a little as I considered the CAS; which I now realised was key to my updates and reports…

After some checks and MS CSS, we recalled that the Setup tool for SCCM has a recovery option; but knowing we had no data, this was going to be a long shot. But before we could even check it out we had another problem; the setup tool was not offering us the option to recover, it was greyed out… CRAP!

If you use the Add/Remove programs option on the server damaged, located the System Centre Configuration Manager entry for the role installed and select the option to Change/Update the installation the familiar setup wizard will launch as expected; however – this is truly in change mode and not repair mode… REALLY!

[![082212_1443_SCCM2012Dat11](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat11_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat11.png)

### Rebuilding a SCCM Site

Some more head scratching, and a Eureka moment later, we launch the SCCM Setup tool from the original media, which now runs in repair mode! SWEET. At this point I now have the option available to recover my site... here goes nothing.

[![082212_1443_SCCM2012Dat21](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat21_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat21.png)

Click Next, and the take a deep breath

[![082212_1443_SCCM2012Dat31](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat31_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat31.png)

Look closely at the image, and you will see that really sexy option – **Create a new database for this site**; oh there is some hope for me yet…. Click Next quickly J

[![082212_1443_SCCM2012Dat41](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat41_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1443_SCCM2012Dat41.png)

And there it is! The single most compelling reason to deploy a CAS; I have the option to now recover from another site within my environment – If I opted to use Primary only – this was going to be a dead end; and I would have to face the facts of a complete rebuild – or live without reports, updates etc. – which will never fly.

So, wasting no time, I provide the fully qualified domain name of my working Primary site, which will now be used to Create a flashy new database for my Central Administration site which is currently dead…

I won't bother with more screen shots, but from here is pretty much plain sailing.

However – you need to be aware that you cannot choose any customisations here – the recovery will be to the SAME database server and instance as to where the CAS was last hosted – this is not optional. So if that instance of SQL is not up, running and patched – this will not work!

Therefore, ensure that you have a working or even new version of this SQL instance online and ready prior to completing the wizard.

Finally, be patient – the wizard takes longer than the original install, as it pretty much does the full install, plus now replicates all the data back that was nuked in the disaster.

I found that using **CMTrace **to monitor the following logs gave a nice view of progress

  * C:ConfigMgrSetup.log  
  * C:Program FilesMicrosoft Configuration Manager Logssmsexec.log  
  * C:Program FilesMicrosoft Configuration Manager Logsrcmctrl.log  
  * C:Program FilesMicrosoft Configuration Manager Logsreplmgr.log 
