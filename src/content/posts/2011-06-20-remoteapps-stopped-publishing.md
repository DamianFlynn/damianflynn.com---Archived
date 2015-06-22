---
author: Damian.Flynn
comments: true
publishDate: 2011-06-20 17:44:00+00:00
template: post.hbt
slug: remoteapps-stopped-publishing
title: RemoteApp’s Stopped Publishing?
wordpress_id: 135
categories:
- Blog
tags:
- Remote Desktop
- WS/SC
---

So, you have followed the instructions, adding your Remote Desktop Session Hosts into the correct Groups, and Added your Remote Desk Web Access Server into the Local group of each of your Session hosts but for some ungodly reason when you check the event log on your Remote Desktop Web Access Server you continue to see errors.

Looking at the error “RemoteApp and Desktop Connection Management” with Event ID 1010 is reporting an Access Denied to the WMI interface on the Remote Desktop Session host; however after tripped checking that the Computer Account for this server the is listed in the local security group “TS Web Access Computers” on the Session host and even rebooting the hosts, this issue will not clear.

[![image1](http://172.21.10.63:84/wp-content/uploads/2014/02/image1_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image1.png)

The RemoteApp Connection Management server, is simply trying to query the WMI database on the Session Host to see what Apps have been configured to be published, however for some reason these are not completing with an Access Denied. You can try manually also, but the results are the same. So, why? and how do we fix this.

Well, apparently the WMI Database on the Session Host does not believe that the RemoteApp Connection Manager is permitted to run the query so simply reject’s the connection. Normally this would not be a problem as the security group “TS Web Access Computers” should have the correct access, but clearly this is not working.

Lets check the WMI Database Access; Open the Server Manager and expand _Configuration_ and then select _WMI Control _on the Session Host machine. Next Right Click and select _Properties_

[![image_thumb2](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb2_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb2.png)

We will now see the WMI Control Properties dialogue. Next open the_ Security_ Tab and expand the Tree, to expose _CIMV2_ and then _TerminalServices_. Now select the node for _TerminalServices_ and click on the _Security_ Button

[![image_thumb3](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb3_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb3.png)

Now, we should see our issue. The Local Security Group “_TS Web Access Computers_” for this node is not listed in the delegates, which explains why WMI is rejecting the connection.

Click on _Add_, and then add back in this local Group for your local host, then Assign the permissions _Execute Methods_, _Enable Account_, and _Remote Enable_; finally you can click on _Apply_ and_ OK_ to apply the missing privileges.

[![image_thumb4](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb4_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/image_thumb4.png)

Now, go back and retry your Remote Apps Web portal, and you should now be able to refresh and see the applications from this host publish again, and the event log should now be clear for this node. Repeat the process for any other host affected with the WMI access issue.

Cheers

Damian
