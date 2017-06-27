---
authors: Damian Flynn
comments: true
date: 2014-10-14 09:45:03+00:00
layout: post
description: configuring-service-management-automation-repeating-schedules
title: Configuring Service Management Automation for Repeating Schedules
categories:
- IT Pro/DevOps
- Monitoring & Management
tags:
- PowerShell
- Azure Automation
- Service Management Automation
- Self Service
- Cloud
- Windows Azure Pack
- Windows Server 2012
---


Service Management Automation is one of these tools which quickly becomes the central location to host and execute all our scripting activities. One of the more useful options for the service is the ability to schedule the execution of these scripts so that we can set and forget, allowing SMA to take over from what was once the task of the Windows Scheduler.

However, the first time you are faced with the requirement to execute a flow on a schedule of 30 minutes for example, you will quickly release that this is still a V1 release, as the minimum granularity which we can define for execution is one day! OPPS!

![](/assets/posts/2014/10/101414_0944_Configuring1.png)


# Now What?!?


Never fear, there is an answer, but it is not so pretty. As we can see for the above screen grab, we can define the Hour and Minutes at which the schedule should occur daily, therefore we can easily create a schedule to trigger for each of our required intervals. In this case we would create a schedule for example to **Execute Flow at 00:30 **then, save this and create another schedule **Execute Flow at 01:00**, and repeat this cycle. Resulting in no less than 48 schedule entries, to tackle our requirement.

While this might not be ideal, using the web UI only leads to increasing the anxiety, so I have chosen to use PowerShell to make our life a whole lot less stressful.


## PowerShell to the Rescue!


I have created a simple function in PowerShell which will loop through the process of creating each of our schedules, providing just some very basic details, including the prefix for the schedule name, for example "**Execute Flow At **", along with the interval for which these schedules names should be created for in minutes, and then of course the HTTPS endpoint of our SMA Service.

An example of how I call this function would be as follows

    
    ADD-SMARecurringSchedule –Interval 20 –ScheduleNamePrefix "Execute Flow at " –WebServiceEndpoint https://pdc-sc-sma01


The results is a labour of love, with all the requested schedules created and ready for our consumption.

![](/assets/posts/2014/10/101414_0944_Configuring2.png)


# Workflows


We are not done yet however, all that we have succeed to do yet is define the schedules. Now we must proceed to associate some, or all of these with the workflow which we require to be triggered.

On the Web UI we can navigate to the _workflow_ in question, and from the associated _Schedule_ page, we can click on the _Schedule_ icon in the drawer, and select the option _Use Existing _which will present the dialog to '_Select a schedule' _offering only the options which have not already been associated with the workflow. From here we can select one of the Schedules and click on the _Tick _then confirm our choice.

Again, you will quickly get the V1.0 feel for the portal when you realise that we cannot multi-select options here, and we are once again facing the daunting reality of having to repeat this exercise far too many times; thus back to PowerShell.


## PowerShell to Associate our Recurring Schedules to the Workflow


Leveraging the schedules we created in the previous step, I have created a second function which leverages the same logic loop as before, but this time also accepts a runbook name, to which the function will add the recurring schedule to recursively.

In a very similar experience to before, the command which I will issue would look as follows

    
    ADD-SMARunbookRecurringSchedule –Interval 20 –ScheduleNamePrefix "Execute Flow at " –WebServiceEndpoint https://pdc-sc-sma01 –RunbookName "My Special Runbook"


One completed, the result is just as we expect, and the previously defined Schedules are now associated with the runbook, ensuring it will trigged at the desired interval.


# The Module


Enough already, the following is the code which I have created to make our lives easier.

[getgit repoid="PowerShell" userid="DamianFlynn" path="Scripts/SMA/Create-SMARecurringSchedules.psm1" language="powershell"]

Feel free to fork and update if you like.
