---
author: Damian.Flynn
comments: true
publishDate: 2012-02-16 21:32:00+00:00
template: post.hbt
slug: app-controller-sql-agent-jobs-installed-cannot-share-sql-server-instance
title: App Controller SQL Agent jobs installed
wordpress_id: 286
categories:
- Blog
tags:
- Cloud
- Portal
- SCAPPC
- SCVMM
- WS/SC
---

Resetting my lab I needed to remove my App Controller installation after a problem on the VM hosting the software. The approach i tool was to use SQL management studio to remove the AppController database from the server, and refreshed the Virtual Machine which I am deploying to.

However during installation I was presented with a problem I was not expecting to see, while on the installation screen “Configure the SQL Server database”

[![image_thumb8](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb8_thumb1.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb81.png)

This calls for another trip back to the SQL server, as I figured by dropping the database everything was going to be fine. Obviously this is not the case, so back on the SQL Server Management Studio I needed to expand the SQL Server Agent node, to locate the Jobs node. Expanding the Jobs node I could find two possible culprits.

[![image_thumb9](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb9_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb91.png)

By Right Clicking on each of these to jobs **CloudManagerDailyJobGroomer** and **CloudManagerOrphanedJobMarker**, I selected _Delete_ from the context menu to remove these.

Now, back to the **_AppController_** installation, and click Next on the page to retest the SQL connection and this time everything should be good!
