---
author: Damian Flynn
comments: true
date: 2015-10-22 09:07:00
layout: post
title: "SCCM: Stopping Endpoint Protection"
categories: 
categories:
- IT Pro/DevOps
- Supportability
tags:
- PowerShell
- System Center
- Configuration Manager
- Endpoint Protection
---

Scenario: A user is experiencing really poor workstation performance, and after some performance monitoring, we determine that the Endpoint Protection engine is trashing the Disk IO and CPU for no apparent reason.

Familiar problem statement I guess.

# Bad Definations
Normally, to address this; we would navigate the registry to locate the key which will inform us where on the system the definations happen to be stored. For reference the key in question is ```HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft Antimalware\Signature Updates\SignatureLocation```

After navigating to the defined folder on the disk, we will normally delete the files we find, and issue a reboot; after which windows will go fecth a fresh set of updates and we hopefully should be back in working order.

# Stopping Endpoint
But, what do we do when this fails? And even after the normal replace definations process; we find the system is still unusable. so bad sometimes, that even running the previous process can take many times longer than we ever expected.

We would just use Windows Services and Stop the service, taking the pressure off the system, so we can do a more intensive review of the issue.

Of Course, that is no just so simple, the Windows Service which hosts the Malware Daemon is protected. What?? Simply put you do not get the options to starting and stopping the service unless you are SYSTEM!

## How to stop SCCM Endpoint Service
You are going to need to go to sysinternal.com and grab a copy of the ever so important free ```PSEXEC``` utility.

We will use this tool to open a session under the SYSTEM role, so that we can offer ourselves access to the manage the service

* Using PSEXEC we will start an interactive command session launching it using the SYSTEM account.
```
psexec -s -i cmd.exe
```
  * In the new Command window, we can issue the command ```whoami``` and we should be told that we are **nt authority\system**
  * Now, with our new persona, we can stop the service with the ```net``` command.
  ```
  net stop MsMpSvc
  ```

Now, if this has worked, we should see in the Windows Services snap in, ```services.msc``` that the Malware Agent is now stopped.
