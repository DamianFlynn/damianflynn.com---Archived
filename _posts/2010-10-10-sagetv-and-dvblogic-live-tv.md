---
authors: Damian Flynn
comments: false
date: 2010-10-10 22:38:00+00:00
layout: post
description: sagetv-and-dvblogic-live-tv
title: 'SageTV and DVBLogic: Live TV!'
wordpress_id: 19
categories:
- Developer
- Smart Home/Buildings
tags:
- Live TV / PVR / IPTV
- Audio Video
---

2010Over the past 3 postings, we introduced the concept of the solution we were going to deploy. Then carefully we introduced, installed and finally configured the DVBLogic applications, before finally testing that these are all working correctly.

We followed up in the previous article, with a step by step on installing SageTV, running trough the configuration wizard, and installing a plugin to make our Live TV experience even richer.

In this Article we are going to focus on binding these two suites together, so to get our Live TV service working, powered by the DVBLogic applications.

Currently,The process is still to complicated, however with the correct encouragement the teams in Frey and DVBLogic will continue to work together and make this process so much simpler for us.  

Let’s recap on the tools we listed in the first post, and address the parts which are still remaining.

  * DVBLogic TV Source 3.1  
  * VLC  
  * SageTV Server  
  * DigiGuide (Or other Suitable XMLTV source for your geographic location)  
  * DG2XMLTV Converter  
  * Stephanes XMLTV Import Tool for Sage  
  * Damian’s DVBlogic2SageTV utility 

# EPG Services

Ok, the first of the solutions which is not ‘Optimal’ is the supply of EPG data for our program guide.

DVBLogic has some nice features which we did not pay attention to, which allows us to provide or gather EPG information from our sources, and broadcast this information over our virtual Satellites to the Virtual DVB-S2 cards, however currently this is not working 100% for the SageTV setup, and needs some more attention. For this reason I am going to provide the data directly to SageTV for now.

## DigiGuide

In the Ireland and the UK there are a few options to collect EPG sources from, but many of these are not optimal. I have have pretty good success with Microsoft's Guide for Mediacenter, however there is some question on the licenses around using this data for non-media centre purposes.

If you are interested, you can use the tool **MC2XML** which will gather the guide data from Microsoft's Servers and generate an XMLTV file ready for processing in the next step.

However, I have found a very nice tool called DigiGuide which provides a good 14 day supply of Guide data. But, after a native install this data is not available in XMLTV format, therefore we need to apply a few simple steps which will permit us to generate the XMLTV file we require.

### Install DigiGuide

First off, we download and install DigiGuide from [www.digiguide.com](http://www.digiguide.com).

Start off the installation and we will be instantly requested for the location to install the tool to, we can accept the default, and click next. Before you know it, the tool is installed and ready for configuration

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHKQiZtRI/AAAAAAAAACw/BNbAfTriVeQ/image_thumb.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHJXS26DI/AAAAAAAAACs/Dqq1azc_JnQ/s1600-h/image2.png)[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHMcbexgI/AAAAAAAAAC4/gUW1myLwo3I/image_thumb1.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHLcWVlBI/AAAAAAAAAC0/PWRC2aB_x1c/s1600-h/image511.png)

The main screen is automatically presented as soon as installation is complete, and we can proceed with the Configuration Wizard.

[![image](/assets/posts/2010/10/image_thumb52.png)](/assets/posts/2010/10/image52.png)

The first question is as simple as selecting the Country for which you will be subscribing to TV Channels.

[![image](/assets/posts/2010/10/image_thumb53.png)](/assets/posts/2010/10/image53.png)

After this, we are asked to identify the provider / package for TV we are receiving. This will help DigiGuide to present all the relevant channel available in our region.

Then we can select the Categories which we normally watch, or subscribe to.

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHTPKw9cI/AAAAAAAAADQ/o9siMuV2BvI/image_thumb4.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHSH19sMI/AAAAAAAAADM/eyTSy8sx_Ro/s1600-h/image14.png) [![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHVrZgU5I/AAAAAAAAADY/NVee0ovrnjQ/image_thumb5.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHUa-SxwI/AAAAAAAAADU/PRyFNEgSVzw/s1600-h/image171.png)

We are then offered the option of assigning preferences on the different channels categories we watch. As we are not going to be actually using the DigiGuide application for normal reference of the guide, but rather using it as source for our XMLTV export, this selection presents no value for us.

[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHYMIn2AI/AAAAAAAAADg/1484XUjbiPY/image_thumb61.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHWwZ42OI/AAAAAAAAADc/kTsv1DzEp1A/s1600-h/image20.png) [![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHaTcP5fI/AAAAAAAAADw/DMZDn757TxM/image_thumb7.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHZa2fKWI/AAAAAAAAADs/n61Qgjn3MK0/s1600-h/image23.png)

That’s should be it, We can finish off the wizard, and give DigiGuide a little time to work.

Once everything is updated we will see the guide information, and we can progress with the XML support for DigiGuide

[![image](/assets/posts/2010/10/image_thumb54.png)](/assets/posts/2010/10/image54.png)

## 

### DigiGuide to XML

Now, We have the TV Guide, but so far this really has no value for us in its current format. We need to export the data which this tool is providing us, and convert it into a useful format. To achieve that, we need the data in XMLTV format.

Make sure you have a copy of [DG2XML](/assets/posts/2010/10/DG2XMLdigiguide84.zip)

Unpack this Archive, and Inside you will find **_DG2XML.EXE_** and a folder **DG2XML.dgscheme.web.**

We will move **DG2XML.dgscheme.web** folder into the DigiGuide Server Skins folder **_.DigiGuide TV Guideschemesserver skins_**

[![image](/assets/posts/2010/10/image_thumb59.png)](/assets/posts/2010/10/image59.png)

We will make a new Folder for the **DG2XML.exe** utility, calling it simply **DG2XML**

[![image](/assets/posts/2010/10/image_thumb60.png)](/assets/posts/2010/10/image60.png)

And finally, we copy the **DG2XML.exe **utility in this folder

[![image](/assets/posts/2010/10/image_thumb61.png)](/assets/posts/2010/10/image61.png)

Next, lets start up **DigiGuide**, and configure the Web Server. In **DigiGuide** we select the Menu **Tools -> Customize -> Web Service -> Enable Web Service**

We should set the password to **password**

[![image](/assets/posts/2010/10/image_thumb62.png)](/assets/posts/2010/10/image62.png)

That wraps up our current work in DigiGuide, you can close the Customise dialogue, and minimize the application out of the way.

Now, we should be able to test that the XML Conversion tools are working, so lets pop open a command prompt and navigate to the **DG2XML** installation folder. Once there we will run the **DG2XML** utility and if it works correctly we should be presented with a new **epgdata.xml** file, generated from the **DigiGuide **information. (You could also just double click on _DG2XML.exe _while in explorer, and the tool should execute)

[![image](/assets/posts/2010/10/image_thumb63.png)](/assets/posts/2010/10/image63.png)

In the DG2XML folder you should see a new file created called _**epgdata.xml** _which is our new XMLTV file.

# DVBLogic To SageTV

We are making great progress, and have almost all the requirements ready to get these applications communicating with each other. The next step in the quest is to create the Frequency files which SageTV requires, so that it can Tune into the Channels we are broadcasting on our Virtual Tuners.

First, you need to grab a copy of my utility [DVBLogic2SageTV](/assets/posts/2010/10/DVBLogic2SageTV3.zip)

Extract the contents of this archive into your SageTV directory, so that the files are located in the .SageTVSageTV folder, and you should now have 2 new .EXE files in place, as per the screen shot below.

[![image](/assets/posts/2010/10/image_thumb55.png)](/assets/posts/2010/10/image55.png)

  * **DVBLogic2SageTV_x64.exe **is to be used on x64 versions of windows  
  * **DVBLogic2SageTV_x86.exe **is to be used on normal 32-bit versions of windows 

You now, simply double click on the relevant version of this utility for your Windows Architecture.

_If you have problems generating these files, open the Command Window, and run the Utility again. This you you can view the status messages generated by the utility which should help us understand what the issue may be._

[![image](/assets/posts/2010/10/image_thumb56.png)](/assets/posts/2010/10/image56.png)

Assuming everything has worked out correctly, the utility will now have created 4 new Frequency files for SageTV to use.

[![image](/assets/posts/2010/10/image_thumb57.png)](/assets/posts/2010/10/image57.png)

Each file will have different content, depending on what channels if any DVBLogic is broadcasting on the Virtual DVB-S2 card. An example of the content looks as follows

[![image](/assets/posts/2010/10/image_thumb58.png)](/assets/posts/2010/10/image58.png)

Excellent, another step closer to complete.

# SageTV

We are now at the last stage of the configuration, during this stage we will Setup Video Sources in SageTV.

## XMLTV Importer

If you have not already downloaded, then grab the [SageTV XMLT Importer](http://www.lmgestion.net/@en-us/4/22/59/article.asp)

After Installing the tool, We need to process the XMLTV files to be SageTV ready. Launching the tool, we will be presented with the main interface

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHor27tpI/AAAAAAAAAEY/uFg_sXo7joE/image_thumb58.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHnXxhueI/AAAAAAAAAEU/VP7T_vpaL5Y/s1600-h/image124.png)

### Configure the XMLTV Grabber

Now, we click on the top option **XMLTV Files and Grabber** to see what XMLTV sources we have configured. Since this is our first run we will just see one source called Default. We are going to remove this Default, and then click on **Add a new XMLTV source**.

[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHrWbyMNI/AAAAAAAAAEg/UrRYfb9KJ7U/image_thumb60.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHqBrKXrI/AAAAAAAAAEc/fJ1nDMJhUhM/s1600-h/image128.png)

We will now be presented with the **XMLTV Files and Grabber **screen where we get to define more detail for the DigiGuide Feed.

  * First we change the **Source Name** to read as **DigiGuide.**  
  * Next, Using the Browse button we locate the **egpdata.xml** file which was created when we tested that the **DG2XML** tool was working correctly. Once set the **XMLTV File** will be set to a setting similar to **C:program filesdg2xmlepgdata.xml**  
  * Finally we can tell the system to call the XML Grabber each time it runs, so to get the most recent information available in DigiGuide. to do this we set the **Grabber** to the folder we placed the **DG2XML.exe** file, this should resemble **c:program filesdg2xmldg2xml.exe**

[![image](/assets/posts/2010/10/image_thumb64.png)](/assets/posts/2010/10/image64.png)

Now that we have provided the main configuration data, we can click next, where the tool will then go and read the XMLTV file to check that it is formatted correctly, and allow us make some fine tuning adjustments.

[![image](/assets/posts/2010/10/image_thumb65.png)](/assets/posts/2010/10/image65.png)

We are presented with One random program found in the XMLTV File, where we have the ability to verify and check that everything is correct. If your time zone is different from the DigiGuide source, we can use the Time Offset setting to apply any modifications needed. **Next** we can move on to the the last section of the configuration.

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHzA-xKyI/AAAAAAAAAE8/U-I4zhXJGw4/image_thumb70.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHxormX3I/AAAAAAAAAE4/e4vrB5yFmcE/s1600-h/image148.png)

Here we are offered a process to help determine when programs are part of a series. Using the DigiGuide service, we will set the tool to use the option **Based on episode title or program Description.** We can now click **OK** to complete the edit process. returning back to the **XMLTV Files and Grabber.**

### Channel Line Ups

This is the next most important part of the process. Now that we have our XMLTV guide in place, we need to teach the system how to match programs in the XMLTV file to the actually channels we are receiving on the DVB Enhancer.

[![image](/assets/posts/2010/10/image_thumb66.png)](/assets/posts/2010/10/image66.png)

Launching into this section of the Wizard lets us customise the details for our TV Viewing.

[![image](/assets/posts/2010/10/image_thumb67.png)](/assets/posts/2010/10/image67.png)

Click on the option **Add a new lineup** which will open the window **Channel Lineups** page in the window

  * First we will start with assigning a **Name **for the feed, in this case **DVBLink – Virtual Satellite 1 Lineup**  
  * Since this stuff is very customised, I am not going to share this on the public servers, as it will just create a lot of rubbish for other, therefore I recommend clicking on **Do not upload this lineup to the online database**  
  * Next, we will set the Country, Region, Type and Source information. As I am based in the West Of Ireland my specifics will be  
    * Country – **Ireland**  
    * Region – **West**  
    * Type – **Digital**  
    * Source – **Other**  
    * Provider – **None**
  * In the **Frq file **drop down list, we should be presented with the four files created with the DVBLogic2SageTV tool. As we are creating the line up for _Virtual Satellite 1 _we should select **DVBLink Capture #1-0-DVB-S.frq** file. 

[![image](/assets/posts/2010/10/image_thumb68.png)](/assets/posts/2010/10/image68.png)

Ready, lets click on **Next. **

On the next page, we will be presented with a list of the channels which were imported from the frequency file, including the channel numbers which we provided while configuring DVBLogic.

[![image](/assets/posts/2010/10/image_thumb69.png)](/assets/posts/2010/10/image69.png)

Thanks to the import file, we don’t need to do a lot of work here, the main focus will be on the last column, **XMLTV** where you can select the guide data for the channel from the drop down list. This list is of course the data stored in the XMLTV guide we created from DigiGuide, and setup in this tool on the first tab.

<table cellpadding="0" width="440" border="0" cellspacing="0" > <tbody > <tr >
<td width="91" valign="top" >ID
</td>
<td width="349" valign="top" >Unique name to identify the channel
</td></tr> <tr >
<td width="91" valign="top" >Name
</td>
<td width="349" valign="top" >A unique name for the Channel, this name is provided from the information in the DVBLogic Virtual Satellite
</td></tr> <tr >
<td width="91" valign="top" >Call Sign
</td>
<td width="349" valign="top" >_This is the Name which we will see in the EPG for the channel, I like to edit this to something nicer._
</td></tr> <tr >
<td width="91" valign="top" >Number
</td>
<td width="349" valign="top" >This is the **Logic (Guide) Channel Number** [For your TV Channel Number] and also **Physical (Tuning) Channel Number**
</td></tr> <tr >
<td width="91" valign="top" >Time Offset
</td>
<td width="349" valign="top" >Some Channels may be focused for different time zones in Europe, so we can make adjustments here to bring these channels into the same time zone as the guide to get the EPG data to correspond correctly
</td></tr> <tr >
<td width="91" valign="top" >HD
</td>
<td width="349" valign="top" >Provides us an opportunity to define that this channel broadcasts in Hi-Def mainly, or Only
</td></tr> <tr >
<td width="91" valign="top" >XMLTV Data
</td>
<td width="349" valign="top" >This is a dropdown list of all the channels we have detected in the XMLTV file, with the channels name, and its guide Channel Number should we decided to use the channel same numbers
</td></tr> <tr >
<td width="91" valign="top" >
</td>
<td width="349" valign="top" >
</td></tr></tbody></table>

We have Four Virtual Satellite Cards, so we need to repeat this process for the remaining 3 cards.

### Categories and Ratings

The next Configuration we focus on will be the Categories.

#### Categories

This is used for improving the readability of the Program Guide when it is displayed.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tH-wUD33I/AAAAAAAAAFk/99XbciG_nFo/image_thumb72.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tH9kM2CcI/AAAAAAAAAFg/EUsQHsp13Qg/s1600-h/image152.png)

We click on **Edit categories for reliable recordings and easily readable program guide**

Before we start the configuration, we have two different Categories lists which we will be matching up. On the Left we have the Categories which Sage utilizes for its guide, and on the right is the categories which we get in the DigiGuide XMLTV Feed.

<table cellpadding="0" width="440" border="0" cellspacing="0" > <tbody > <tr >
<td width="133" valign="top" >**SageTV EPG**
</td>
<td width="347" valign="top" >**DigiGuide XMLTV**
</td></tr> <tr >
<td width="133" valign="top" >Serie  
Movie  
News  
Sport  
Recreation  
Music  
Educational  
Magazine  
Children  
Other
</td>
<td width="347" valign="top" >Technology, Political, Gardening, Business and Finance, Education, Scientific Documentary, Motoring, Adult Entertainment, Reality Show, Quiz Show, Special Interest, Fashion, Nature, Kids Drama, Arts, Animation, Comedy, Chat Show, Travel, Entertainment, DIY, Cookery, Game Show, Religious, Health, Sitcom, Consumer, History Documentary, Drama, Talk Show, Soap, Documentary, Series, Science Fiction Series, Film, News, Sport, Music, Magazine Programme, and Children's
</td></tr></tbody></table>

Our objective is to Match the Categories on the Left to the Categories on the right. This process is of course subjective to your viewing preferences, but as a guide to assist, this is the breakdown I am currently utilizing

<table cellpadding="0" width="440" border="0" cellspacing="0" > <tbody > <tr >
<td width="92" valign="top" >**SageTV Guide**
</td>
<td width="113" valign="top" >**Keyword Matcher**
</td>
<td width="125" valign="top" >**Keyword Excluder**
</td>
<td width="141" valign="top" >**DigiGuide Category**
</td></tr> <tr >
<td width="92" valign="top" >Serie
</td>
<td width="113" valign="top" >Serie
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >Series  
Science Fiction Series
</td></tr> <tr >
<td width="92" valign="top" >Movie
</td>
<td width="113" valign="top" >movie  
film  
drama
</td>
<td width="125" valign="top" >kids
</td>
<td width="141" valign="top" >Film  
Drama
</td></tr> <tr >
<td width="92" valign="top" >News
</td>
<td width="113" valign="top" >news  
scientific  
business  
political
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >News  
Scientific Documentary  
Business and Finance  
Political
</td></tr> <tr >
<td width="92" valign="top" >Sport
</td>
<td width="113" valign="top" >Sport
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >Sport
</td></tr> <tr >
<td width="92" valign="top" >Recreation
</td>
<td width="113" valign="top" >Sitcom  
soap  
entertainment  
comedy
</td>
<td width="125" valign="top" >adult
</td>
<td width="141" valign="top" >Soap  
Sitcom  
Entertainment  
Comedy
</td></tr> <tr >
<td width="92" valign="top" >Music
</td>
<td width="113" valign="top" >Music
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >Music
</td></tr> <tr >
<td width="92" valign="top" >Educational
</td>
<td width="113" valign="top" >education  
technology  
gardening  
nature  
Cookery  
DIY
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >Technology  
DIY  
Cookery  
Gardening  
Education  
Nature
</td></tr> <tr >
<td width="92" valign="top" >Magazine
</td>
<td width="113" valign="top" >magazine  
documentary  
motoring  
health  
consumer
</td>
<td width="125" valign="top" >scientific
</td>
<td width="141" valign="top" >Magazine Programme  
Health  
Motoring  
Consumer  
History Documentary  
Documentary
</td></tr> <tr >
<td width="92" valign="top" >Children
</td>
<td width="113" valign="top" >Children  
Kids  
Animation
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >Childrens  
Kids Drama  
Animation
</td></tr> <tr >
<td width="92" valign="top" >General
</td>
<td width="113" valign="top" >Talk Show  
Religious  
Game Show  
Travel  
Chat Show  
Arts  
Fashion  
Special Interest  
Quiz Show  
Adult Entertainment
</td>
<td width="125" valign="top" >
</td>
<td width="141" valign="top" >Talk Show  
Religious  
Game Show  
Travel  
Chat Show  
Arts  
Fashion  
Special Interest  
Quiz Show  
Adult Entertainment
</td></tr></tbody></table>

The result of this exercise will look a little similar to the results below.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIBivgt6I/AAAAAAAAAFs/8mk0s_x-Ol8/image_thumb21.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIAUvdp4I/AAAAAAAAAFo/APRcbhLCiA0/s1600-h/image4.png)

#### Ratings

Again, each guide will support different rating grades deepening on the broadcaster or the countries standards. In order for SageTV to process these with some degree of meaning, we are offered the opportunity in the tool to view all the Ratings detected in the XMLTV data file, and match these to the pre-defined ratings which SageTV Understands

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIEXARMjI/AAAAAAAAAF0/RF_AwpY_qak/image_thumb41.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tIDEt7qjI/AAAAAAAAAFw/TklGUGki8mI/s1600-h/image811.png)

### Advanced Options

We are offered the ability to tag programs in the XMLTV File with Star Ratings and HD flags if the data is available. Using this page you can customise some of the settings to match your personal requirements

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIG9kBhBI/AAAAAAAAAF8/yuuBTCRh58E/image_thumb6.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIFo6MCpI/AAAAAAAAAF4/0XBnQ6Z0LWA/s1600-h/image1211.png)

### Update Guide Data

Finally, we should have all the correct details in place, so we can proceed and Update the Guide Data into SageTV

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIJh6G_JI/AAAAAAAAAGE/RBFw6BZcQL8/image_thumb50.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIIGrK_tI/AAAAAAAAAGA/KnQcY_EOop0/s1600-h/image100.png)

Click on Start Import, and the tool will connect to the DigiGuide Source, Update the XMLTV File, Map the Channels, add any custom groups, and settings to the programs on the channel, including categories, ratings etc, and finally update the SageTV system with the new information.

## SageTV Video Sources

We can now start-up SageTV again, and use the Setup Wizard to add the new Virtual DVB-S2 cards.

From **SageTV** main menu, press **Setup**, then **Setup Video Sources**.

[![image](/assets/posts/2010/10/image_thumb70.png)](/assets/posts/2010/10/image70.png)

As we have so far skipped this step in SageTV, the first time we open the **Setup Video Sources** we will be directly presented the **Add Video Source **Screen.

[![image](/assets/posts/2010/10/image_thumb71.png)](/assets/posts/2010/10/image71.png)

We will be repeating this process for each of the DVBLink Capture cards, so we will start with the 1st one, by selecting **DVBLink Capture #1 **and clicking enter.

[![image](/assets/posts/2010/10/image_thumb72.png)](/assets/posts/2010/10/image72.png)

On the next screen, we will be presented with the different input types available on this device, In this case there is only one – **Digital TV Tuner** which you need to select.

We will then be asked which Satellite we will be tuning. Since we are not tuning a real satellite, we are going to tell a white lie, and select any one of these. After we have selected one, we can click on **Done** which will move us forward to the next screen

[![image](/assets/posts/2010/10/image_thumb73.png)](/assets/posts/2010/10/image73.png)

We are next asked to define what type tuner we are using. The decision is not critical here, but I normally select the first one, as its a Digital source. So, select **User Tuner on Capture Card to tune Cable TV**

[![image](/assets/posts/2010/10/image_thumb74.png)](/assets/posts/2010/10/image74.png)

Next, we need to define where we are gathering the Guide Data from. I expect you can guess this is going to be the first one, XMLTV.

[![image](/assets/posts/2010/10/image_thumb75.png)](/assets/posts/2010/10/image75.png)

Now, we need to determine where the Data maybe delivered from, Again sticking with the Digital option, I suggest we go with **Cable or Satellite**

[![image](/assets/posts/2010/10/image_thumb76.png)](/assets/posts/2010/10/image76.png)

We are then asked for our ZIP code!, like Ireland here, excuse me, what the heck is a ZIP Code right. Well not to panic – we are not needing this, and instead will type **00000** as the ZIP code, which is SageTV speak for, use XMLTV dummy.

[![image](/assets/posts/2010/10/image_thumb77.png)](/assets/posts/2010/10/image77.png)

Now, when you hit enter, we get presented with a list of the Line-ups we created in the XMLTV Import tool a little while earlier. Select the one from the list which matches the Virtual Satellite tuner you are configuring now, (remember we will be repeating this 4 times!)

[![image](/assets/posts/2010/10/image_thumb78.png)](/assets/posts/2010/10/image78.png)

Now, we just need to wait a little, while SageTV works

[![image](/assets/posts/2010/10/image_thumb79.png)](/assets/posts/2010/10/image79.png)

We next need to decide on the quality of the guide information, which in this case, is good, so I am selecting **Extended Basic Services**

[![image](/assets/posts/2010/10/image_thumb80.png)](/assets/posts/2010/10/image80.png)

Next, we are dropped back into the Channel Setup, and instantly prompted to **Scan For Channels**, however we will be selecting **No – I will scan for channels later** as all the channels on this virtual satellite are now in place and ready for us!

[![image](/assets/posts/2010/10/image_thumb81.png)](/assets/posts/2010/10/image81.png)

Great, we now should see the channels we included in the **XMLTV Channel List** a little earlier in the **Channel Setup** screen. We can now select the option **Done with Channel Setup**

[![image](/assets/posts/2010/10/image_thumb82.png)](/assets/posts/2010/10/image82.png)

This will return is back to the **Source Wizard Summary** where can now see that the New **DVBLink Capture #1 Digital TV Tuner : DVBLink – Virtual Satellite 1 Lineup** is now assigned

[![image](/assets/posts/2010/10/image_thumb83.png)](/assets/posts/2010/10/image83.png)

That is now us complete with the first tuner. You can repeat this process for the remaining 3 Virtual Tuners remaining, and the Channel Line-up’s you created.

## Live TV

Ok, we are Done!

Use the SageTV menu, and open the Program Guide where you can now see your channel list, and guide data.

[![image](/assets/posts/2010/10/image_thumb84.png)](/assets/posts/2010/10/image84.png)

And, of course now is as good a time as any to see that you can select one of these channels and view them. For example, we can highlight **NCIS LA** on _Sky2_ and SageTV will ask what we would like to do

[![image](/assets/posts/2010/10/image_thumb85.png)](/assets/posts/2010/10/image85.png)

The obvious choice is to **Watch Now** which if everything is good will show your show on screen

# Conclusion

It was a fun journey, and this last stage sure could have some simpler steps on how to do the task, but taking all in, it is a major improvement on the previous methods, and so far – it has proven to be very stable

Enjoy your trip, and I hope you have as much success as i have in pulling this together

Finally, a Big thank you to SageTV team, DVBLogic Team, and Stephane for his XMLTV Importer

-Damian.
