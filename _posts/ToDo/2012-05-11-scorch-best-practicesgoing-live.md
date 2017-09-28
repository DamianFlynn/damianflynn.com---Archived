---
author: Damian.Flynn
comments: true
date: 2012-05-11 23:00:00+00:00
layout: post
slug: scorch-best-practicesgoing-live
title: SCORCH Best Practices–Going Live
wordpress_id: 436
categories:
- Blog
tags:
- SCORCH
- WS/SC
---

During MMS, [Ryan Andorfer](http://www.codeplex.com/site/users/view/randorfer) (General Mills, and Codeplex fame) presented some of the Best Practices which he worked out in conjunction with some other Orchestrator Power Users/Guru's. Over the last few months I have had the pleasure of working with Ryan reviewing some of my own practices, issues and of course Integration Pack challenges, so I think its only fit that we should take a little time out to consider these practices and why they are actually important.

The official guide which Ryan has being working on, I am not sure is publically available, but there is a copy on the MMS Digital Media site if you have not already got yourself a copy.

To help digest these practices I will break them into some high level topic groupings, and elaborate a little on why these are important as you embrace SCO into your infrastructure. So, lets start with exactly that point:

# Go Live Process

As with any development process, crafting an Orchestrator Runbook should really follow a life cycle model. Now these do not need to be complex at all, just a set of guiding principals which will help you deliver a process to enable new orchestrations to be delivered up to live production.

In a typical world there are 3 steps on this route

  1. Development  
  2. Test and Approval  
  3. Production 

And, in many cases these might all be on one server, which is really a recipe for trouble unless you have some very good governance, so the best practices around this approach are very simple - just like SOX, HIPPA or any other governance policy, we should segregate the roles.

The starting point should be a development Environment, this can be quite simply a virtual machine, with all the parts installed, including the Server, Designer and a local SQL installation.

## Development Environment

Each developer, or team of developers can host their own Orchestrator server, its light weight, easy to install, and if you are clever you can offer this as a pre-canned service using VMM (I'll show you how to do this in a post later).

This approach is of course restricted, as what happens on this environment will have not effect on the bigger picture, while enabling the developers to approach the issue any way the like, from coding up a new IP in Visual Studio, to just getting into the fun of building cool work flows, which they can test out on the rest of their development environment, without risk or fear of catastrophe hitting.

From a the perspective of a governance team, they have no issues either to be concerned about, as there is no security to be delegated on the installation, and the service itself can not access anything more than the accounts used have access to, or the hosting network segment is allowed to access.

## Pre-Production Environment

Once the Development work has reached a specific milestone, its time to test, and validate that all is working to plan, this is where the Pre-Production world comes into play. Now we can use many names here, and even many stages and duplicates of this environment depending on the complexities (red tape) that your organisation impose on this process.

Pre-Production can work under many names, including Test, QA, Staging, etc.; but they all have one thing in common, and that is - if the solution is not working here, it will definitely not work in the live production environment, so issues get fixed here before we proceed to the final stage.

Therefore, its quite normal, and probably recommended that the Infrastructure IT team who are responsible for the production servers, are also the owners of the pre-production environment also. Therefore this environment will be restricted similar to the production, and services will need to use accounts which have similar access privileges.

The process of getting the Green light to move out of Pre-Production will depend on your organisation and policies you define, for example the Runbook must execute without failure x number of times, or for a period of x days, or need to pass a defined set of validation test. Only after these scenarios have being verified can the next stage be considered.

## Production Environment

Updates to this environment are normally managed using a change control process, and will generally need the approval of the Pre-Production test team to have the request considered. The actual implementation may then be restricted to a specific window, which might be daily, weekly, or monthly.

Environments will also likely have more than a single action server to consider also.

# Runbook Revisions

Like all good software, revisions are to be expected; and in a well optimised environment the flow of these new versions will need to continue to follow the standard cycle defined above. In some scenarios the time spent in Pre-Production might be reduced depending on the type and scale of the revision.

Simple examples here, maybe of just a single Runbook object being updated; while comparing that to maybe a “utility” Runbook getting refreshed, which may result in a number of dependant Runbook’s also needing to be validated.

# Stage Progression

Moving between these stages is going to be very easy, thanks to the design of Orchestrator.

In general there are one 2 scenarios here we need to consider

  1. Runbook’s  
  2. Integration Packs 

## Runbook’s

Orchestrator has a native feature for exporting Runbook's which will package up all the associated variables ready for transfer to the next stage. Using this feature the process of migrating from Development to Pre-Production is trivial; simply needing only the exported package to be imported on the next environment.

During this process, it is important to consider that the required Integration packs and their version are also communicated, so that the import will complete and Runbook execute as expected.

## Integration Packs

Although Integration packs are normally supplied by Microsoft or 3rd Parties including Codeplex, it is of course quite easy for you to generate your own Integration Packs. All of which will result in a major change to your Orchestrator environment, as these must be imported and distributed to both the servers and designers running in your eco-system.

The practice for executing this exercise should be no different to that of Runbook releases, ensuring to import the new versions of the Integration Packs first into your Development environment, so to validate that all the objects used in your Runbook continue to function. Many times these will have new settings and attributes which will need to be addressed, and thus end up breaking your previously working solution.

Starting at the Development point will help illustrate the scale of the break / fix which might be needed for your environment prior to updating the pre-production; as the objects of the Runbook might be used by a far wider audience that you were originally aware of; including this detail in the hard off is quite important.
