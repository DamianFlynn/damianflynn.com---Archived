---
author: Damian.Flynn
comments: false
publishDate: 2010-10-06 22:34:00+00:00
template: post.hbt
slug: sagetv-with-dvblogic-install-tvsource
title: 'SageTV with DVBLogic: Install TVSource'
wordpress_id: 3431
categories:
- Blog
tags:
- DVB
- Home Automation
- Media Center
---

<blockquote>In the first post, we took a quick look at the modules we were going to deploy as part of our fresh build on the HTPC, and also put the server hardware together which is going to be the foundation for the build out.
> 
> </blockquote>

In this post, we will take the next steps, and introduce DVB Logic, Install some of their software suites, and then configure the software.

# VLC

Before we get into the fun stuff of setting up DVBLink, we are first going to install VLC. This all round tool will allow us to verify the functionality of DVBLink later on in the process.

Grab a copy of the latest version from [www.videolan.org](http://www.videolan.org) and install it on server. This process is very painless and should be completed within a few short minutes. All the defaults are fine for our requirements, so i simply click Next trough all the wizard steps.

[![VLC Installed](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/VLCInstalled_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/VLCInstalled1.png)

After we are complete, VLC will launch. We don’t need to use this currently, so we can just close out for now.

[![VLC](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/VLC_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/VLC1.png)

# DVBLogic

The DVBLink product suite is designed to seamlessly integrate Satellite, Cable and IPTV sources into Virtual DVB-S2 Cards irrespective of the original source medium. The suite includes support for MPEG-2 and MPEG-4 HD video, multichannel audio, EPG information, teletext and subtitles.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb43.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image43.png)

The suite has two main components, DVBLink Server and DVBLink Source.

From the Image above, we can see the DVBLink Server presents two interfaces for other software to connect with; as a set of 4 Virtual DVB-S2 Capture cards, and also a UPNP Server.

We will use the UPNP Server option to check everything is working correctly, and for the rest of the project we will be concentrating on the Virtual DVB-S2 cards.

The second component are the Source modules, Currently DVBLogic have a number of Source Modules which can be used with the DVBLink server, which is quite impressive, and addresses most combinations you will ever require.

<table cellpadding="0" width="435" border="0" cellspacing="0" > <tbody > <tr >
<td width="136" valign="top" >**TVSource 3.1**
</td>
<td width="297" valign="top" >Locally installed DVB/ATSC Tuner Cards are published to the Server using this component
</td></tr> <tr >
<td width="136" valign="top" >**Dreambox 3.1**
</td>
<td width="297" valign="top" >Linux DVB Set-top boxes running PLi, Gemini or Niablosat Images can be used as Video Source
</td></tr> <tr >
<td width="136" valign="top" >**IPTV 3.1**
</td>
<td width="297" valign="top" >IP TV Client, supports sources from IPTV Channels published or your private IP Camera’s
</td></tr> <tr >
<td width="136" valign="top" >**DVBDream**
</td>
<td width="297" valign="top" >PC Based DVB Viewing Software which can be used as a Video Source
</td></tr> <tr >
<td width="136" valign="top" >**HDPVR**
</td>
<td width="297" valign="top" >Hauppauge HD capture device, useful for connection analogue devices so they can be used as a Video Source
</td></tr></tbody></table>

For this scope of this project, we are going to use just one of the components, the TVSource Module, which we will be configuring to use the TBS 6980 DVB-S2 cards we installed already.

## Installation

Ok, time for the the fun stuff, we are going to install this amazing piece of software. Let’s start by downloading the TV Source software. You can grab the latest release code at [http://www.dvblogic.com/download.php](http://www.dvblogic.com/download.php), currently at version 3.1. After downloading the package, you can extract and and we should see two components to install.

[![TVSource 3.1 progs](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/TVSource3.1progs_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/TVSource3.1progs.png)

### DVBLink Server

We will begin the installation with the DVBLink server, this application as we introduced a little earlier is the core of DVBLogic’s DVBLink product, once installed we will have 4 new Virtual DVB-S Cards presented to the operating system, and a new UPNP server running.

Lets launch the installer, and click on **Next** to progress to the next screen of the wizard.

[![DVBLink Server - step1](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep1_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep11.png)

We are then presented with the License Agreement, which we need to accept, and then click on **Next.**

[![DVBLink Server - step2](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep2_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep21.png)

Next, we select and accept the installation location for the server software, and once satisfied we again click on **Next**

[![DVBLink Server - step3](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep3_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep31.png)

Now, we are ready to being the installation process, Click on **Install** and the wizard will start on its magic.

[![DVBLink Server - step4](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep4_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep41.png)

After a few seconds of installation, we will be prompted to verify that we are OK to trust and install the drivers required to create the Virtual DVB Tuners. This is extremely important, so I normally click on **Always trust software from “Tabekc”** and then click on **Install** to allow the installation to progress

[![DVBLink Server - step5](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep5_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep51.png)

The installation should then continue for a few more seconds

[![DVBLink Server - step6](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep6_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep61.png)

And then finally, we will be presented with a message to confirm that the Install has completed.

[![DVBLink Server - step7](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep7_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerstep71.png)

Nice work, at this point we now have the Server and its associated Virtual DVB-S cards installed. We are now ready to proceed to the next step

#### What actually happened?

If you are curious like me, you can now check to see what actually has occurred under the ‘hood’.

**Right Click** on **“My Computer”** and select the option **Manage**. This will launch the **“Computer Manager”**, where we can see the **“Device Manager”** listed under **“System Tools”** on the left hand tree.

**Clicking** on this **“Device Manager”** the Right pane will redraw, and we can **expand** the option **“Sound, video and game controllers”** where we should see our 4 new **“DVBLink Capture”** virtual devices appear.

[![DVBLink Server - Post Install](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerPostInstall_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkServerPostInstall1.png)

### DVBLink TVSource

At this stage we can now install any of the other DVBLink components, As we mentioned at the start of the process I am going to just focus on the TVSource module. This will shortly be configured to serve our recently installed the TBS 6980 DVB-S2 Cards to the DVBLink Server Module,

In the same expanded folder as we located the server module, we can now proceed and launch the installation process for DVBLink TVSource.

After launching the installer, and click on **Next** to progress to the next screen of the wizard.

[![DVBLink TVSource - step1](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep1_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep11.png)

We are then presented with the License Agreement, which we need to accept, and then click on **Next.**

[![DVBLink TVSource - step2](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep2_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep21.png)

Now, we are ready to being the installation process, Click on **Install** and the wizard will start on its magic.

[![DVBLink TVSource - step3](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep3_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep31.png)

The installation should then continue for a few more seconds

[![DVBLink TVSource - step4](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep4_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep41.png)

And then finally, we will be presented with a message to confirm that the Install has completed.

[![DVBLink TVSource - step5](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep5_thumb1.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkTVSourcestep51.png)

Now, that was easy right.

## Configuration

You will by now also have noticed that the **DVBLink Configuration **windows will be displayed on screen, and we can dive straight into configuration of source.

_(Note – you can always open this tool at any time, from the All Programs in the Start Menu find the DVBLink programs group and open **DVBLink Server Configuration**.)_

On the mail page we can see tabs on the top and bottom of the main window, Currently we have just one Tab at the top of the window called **Sources**, which is automatically selected for us. Along the bottom of the window we have additional tabs, which read **Sources** and also **Server Configuration**.

For the most part we are not going to see any additional tab’s along the top of the work space appear; DVBLogic have some additional software called the _Network Server _which we have not even mentioned until now, which will result in a new tab been presented here, but that is beyond our current requirements.

So, the Configuration work we will be doing with DVBLink is going to be between the two tabs on the bottom of the workspace, and before we can really gain value from the second tab, we need to provide some more information on the first one….

### Stage 1 - Sources

Ok, enough chatter, lets get going. On the Source tab we have 2 panes. The left pane is a list of Source Types we can add (known as templates). As you can see we have 2 available to us. If you decided to install some of the other DVBLink source components, these will create additional templates for us.

Click on **TVSource **and then the top arrorw should glow Green to signify that we can now **Click** on the **Arrow.**

[![image](http://albal21.files.wordpress.com/2010/01/image49_thumb.png?w=593&h=484)](http://albal21.files.wordpress.com/2010/01/image49.png)

After clicking, a dialogue will popup asking us to provide a name for this TV Source we are adding. You can name as you like, personally I am going to use a simple name to indicate easily which source this entry is referencing. As an example, I have 2 TBS 6980 cards, both of which have 2 DVB-S2 feeds, so that will result in a total of 4 sources to be added once I am fully done. As a result I am going to call these TBS-A-1 to signify the TBS Card, Card A, and Source 1.

Once you are happy with your chosen name, click on **OK**.

[![DVBLink Config -TVSource step3](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep3_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep3.png)

Now, on the right pane, we get to see that our new source is added to the list. In this pane we can now quickly see that the source is from the TVSource template, it will be a Video stream and its status is currently down (Red).

[![DVBLink Config -TVSource step4](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep4_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep4.png)

Now, we need to configure this new source. To do that we need to click on the **‘…’ **button in the far right column of this source. After clicking, we should get a new window **TVSource Configuration**, with another set of tab’s across the top.

We will be sitting on the Device Tab, where we get to see a list of the physically installed TVSource devices which are available on our server. In the shot below you will see 2 devices, which are the 2 DVB-S2 ports on my TBS-6980 card _(in the shot below only one of my TBS 6980’s is installed in the server)_

[![DVBLink Config -TVSource step5[4]](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep54_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep54.png)

Now, we need to select one of these 2 ports to be used for this source configuration, (we will add a second source shortly and select the other port then). So since I named the source as TBS-A-01, im going to pick the first port by **clicking **on the **Tick Box** for that port, and the text under status should change to read _Active_.

Note that the **Type** I did not change from _Satellite** **_because these really are Satellite inputs, but I recommend you change these to match the technology you are using!

[![DVBLink Config -TVSource step6](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep6_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep6.png)

Cool, that was not to hard. Now we can move on to the next tab in the view, which is called **Headends**.

A bit of an odd name, but the theory is very simple. The software simply wants to know what this source is actually connected to, that is, what is on the end of the input!

Looking at the column headers, these have some _satellite_ specific questions, but don’t worry to much about that, this is not hard to figure out either. Of course if you changed the **Type** on the device tab, these these headers would be a little different to match your chosen technology.

[![DVBLink Config -TVSource step7](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep7_thumb.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/DVBLinkConfigTVSourcestep7.png)

Ok, In my initial setup I am keeping things very simple, and each input is cabled directly to an LNB feed on my satellite dish, and that dish is pointing at the stars for Sky UK, which we know is on a satellite called “Eurobird 1 - Astra 2B/C/D” at an orbit of 28.2 W

I simply **Click** on the **Add **button, and this pops in a line in the list of _Headends, _Since I am just using 1 Headend with this source, I do not need to make changes to the **Diseqc **options, but simple select my target satellite from the drop down list under **Provider.**

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb44.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image44.png)

Next we can move on to the **Scan** tab and select the **Scan** button to start the scan of the services connected to our _headend_. In my case that of course is the satellite for Sky UK. Once the scanning begins we should see some of the services been broadcast been detected. The complete scan may take a little while to finish up, but its a necessary evil, as the TV companies like to move stuff around up there ![Smile](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/wlEmoticonsmile.png)

[![image](http://albal21.files.wordpress.com/2010/01/image73_thumb.png?w=593&h=484)](http://albal21.files.wordpress.com/2010/01/image73.png)

Once scanning is complete, we will have the opportunity to test that everything is working correctly, which will give is the confidence we need later when we get around to connecting this software with other applications.

So, lets click on the last tab **Channels.**

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb45.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image45.png)

Ok, so this is going to be very painless. In the top option we need to fill in the **Path to VLC executable** which I suggested you install earlier. You can click on the button to the right ‘**…**’ to pop one a browser to help locate the program.

Now, think of a channel, any channel, just be sure its not encrypted. you can click on the name of your _Headend_ and expand down the tree to find a perfect test channel, or just use the **Find** option and type in part of the channel name, then **click **the **button** with the spy glass.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb46.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image46.png)

Now, you should have your chosen channel highlighted. Excellent. Now click on the Preview window, and we should see VLC start, and after a few seconds you should be watching your chosen channel.

Great, we have now completed the procedure to setup this source. You should repeat this process for each source you want enabled.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb47.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image47.png)

### Stage 2 – Server Configuration

Ok, we are not ready to move on with the next stage of the setup. One way of thinking about this process is to consider that you are now the TV Broadcaster, and you now have the power to decided what channels you would like broadcast.

You have already located a few hundred possible video feeds in the previous steps while configuring the sources, so here we are just going to patch the video feeds trough that we are interested in, and leave out the stuff we don't care about, for example all those horrid shopping channels.

Back on the main window, we will click on the bottom tab for **Server Configuration** which will present us with some new panes to work within. The first thing you should notice now, is the new tabs which have just appeared along to top of the window, Channel Selection, Channel Merge, Channel Settings and EPG Sources.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb48.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image48.png)

Starting in the first tab, **Channel selection** we have a two pane view again, On the left pane we now see all the video feeds (Channel’s) which we configured earlier, and on the right pane we will create a list of the channels we will be patching trough for our rebroadcast.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb49.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image49.png)

If you have multiple sources, and the feed (channel) you are interested in appears in more than one source, you should move the additional copies of the channel to the right pane also. This will permit the DVBLink server to tune to the feed, if for example the first source is busy, by selecting this feed from the second source.

Now, lets move on to the second tab **Channel merge** where we can use the options on the right side to help group video feeds (channels) of the same service together

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb50.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image50.png)

If you prefer, you can always drag and drop the feeds to group them as you need. The purpose of this process is to teach the DVBlink server which feeds are the same if they appear from different sources.

Once you have completed setting up the merge groups, we can then move on to the **Channel settings **tab.

[![image](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image_thumb51.png)](http://blogstorage.damianflynn.com/wp-content/uploads/2010/10/image51.png)

Good work, now we just need to add channel numbers for each of the feeds we are broadcasting. Again, as you are the broadcaster, you have the control on what numbers you decided to use.

When you have completed this, you are all done!

Fantastic, now you can Select **OK **and if prompted you should agree to store the changes.

# Testing

At the beginning of the article, we mentioned that the server broadcasts on two different technologies, The first is the “Virtual DVB-S cards”, and the second been a “UPNP Server”.

We are going to test that the server is working by using the UPNP Server, Windows 7 is a nice simple client for UPNP, so all we need to do is launch Windows Explorer, and open network connections and verify you have the DVBLink Server present:

[![image](http://albal21.files.wordpress.com/2010/01/image22_thumb.png?w=441&h=484)](http://albal21.files.wordpress.com/2010/01/image22.png)

## Connect

Open up Windows Media Player and under** Other Libraries** you should see an entry for **DVBLink TV Server** underneath your server name

[![image](http://albal21.files.wordpress.com/2010/01/image_thumb2.png?w=522&h=484)](http://albal21.files.wordpress.com/2010/01/image2.png)

Select Recorded TV, and you should see** **all of your feeds been broadcast. Yep, Damn Cool.

Double click on any of the channel and then when the window pops up select the Play button:

[![image](http://albal21.files.wordpress.com/2010/01/image_thumb3.png?w=394&h=293)](http://albal21.files.wordpress.com/2010/01/image4.png)

# Conclusion

Well, let me first congratulate you, you are now your own satellite provider, and we have now the first major task completed in sorting or HTPC.

Until next time.
