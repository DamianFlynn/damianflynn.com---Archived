---
author: Damian.Flynn
comments: true
publishDate: 2011-08-25 15:59:00+00:00
template: post.hbt
slug: query-virtual-machines-details-using-powershell
title: Query Hyper-V Virtual Machines Details using PowerShell
wordpress_id: 206
categories:
- Blog
tags:
- Cloud
- PowerShell
- SCVMM
- WS/SC
---

As I spend more time working with Powershell, Hyper-V, SCVMM and Orchestrator one of the by-products is that my library of functions and modules keeps growing. Recently one of my fellow MVPs needed a simple method to determine the Dynamic Memory Demand one of his Virtual Machines was issuing.

I knew that somewhere in my Mercurial repository I did have code to figure the answer out, from some work I completed earlier in the year, but when I finally located the code, I was just a tad to embarrassed to share it, so Instead I redrafted the code to actually resemble something which might be of value.

Hyper-V keeps all it’s magic in the WMI database’s, which with Powershell is pretty easy to navigate; and in the code of the function below you can easily see how we can get a list of all the Virtual Machines which are living on a single Hyper-V host.

The WMI database is really cool, everything we need is at our fingertips, and I do not need to really do any manipulation to produce the output needed, just put a nicer header on each of the column’s

Now, let’s dig in a bit deeper, this time looking to gather some information about the VM’s memory utilization and some other interesting data, which we can then format

There is a fair amount of code, there, but most of this is just Comments, and Formatting. The process as we can see simply converts the name of a Virtual Machine to a GUID. Once we have the GUID, we can look up 2 more databases, the first to gather up information on the VM, and the second to look at the Memory utilization and demands of the VM. Then all this is combined into a single list of results and sent back out to the pipeline.

Let’s take this a step deeper, each VM which has Integration Components installed on it, has the ability to send and receive information to and from the Hyper-V host. This information is really interesting, for example we can learn what version of Integration Components are in the guest, maybe we would like the know the IP the Guest has? or the real OS version on the guest? Great, then check out this little function

If you are using Orchestrator, these are really useful functions, as their is NO dependences on the Hyper-V or SCVMM management packs to be around, it is 100% WMI all the way.

I have more of these in the library, Ill get the polish cloth, and share these also later.

-d
