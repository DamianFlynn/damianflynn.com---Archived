---
authors: Damian Flynn
comments: false
date: 2010-10-08 22:36:00+00:00
layout: post
description: sagetv-and-dvblogic-sagetv
title: 'SageTV and DVBLogic: SageTV'
wordpress_id: 3441
categories:
- Developer
- Smart Home/Buildings
tags:
- Live TV / PVR / IPTV
- Audio Video
---

<blockquote>We continue on the path to HTPC bliss, we now are going to focus on the heart of the solution, and walk trough the installation of the core technology.
> 
> </blockquote>

In this post, we will install Sage TV 7, and get us to the point where we can connect to our new Satellite Broadcasts! 

# Installation

With nothing to waste, we start off the _SageTV_Setup.exe_ and before we know what is happening the Welcome splash is on the screen.

[![image](/assets/posts/2010/10/image_thumb86.png)](/assets/posts/2010/10/image86.png)

I think you know what to do with the **Next** button, and after some tireless reading of really interesting license agreements, we can click on **I accept the license agreement** and then that nice **Next **button again.

[![image](/assets/posts/2010/10/image_thumb87.png)](/assets/posts/2010/10/image87.png)

Now, we need to declare who we are for the registration, and decide who can use this install. In most cases this last option will not be very important, as we will be running the server headless, which means simply, that its just going to be running in the background, and we will use other computers, or the really sexy HD300 _(or previous version if you have them)_ extenders.

[![image](/assets/posts/2010/10/image_thumb88.png)](/assets/posts/2010/10/image88.png)

The next screen we get is just checking the folder where SageTV will be installed, and if we have any special IR or Capture cards to support. Nothing special here, so unless you have needs, just click on **Next**

[![image](/assets/posts/2010/10/image_thumb89.png)](/assets/posts/2010/10/image89.png)

That is it for the questions, now we can get on with the installation.

[![image](/assets/posts/2010/10/image_thumb90.png)](/assets/posts/2010/10/image90.png)

The process will not take very long…

[![image](/assets/posts/2010/10/image_thumb91.png)](/assets/posts/2010/10/image91.png)

… and before you know it, we get the message that we are all complete.

[![image](/assets/posts/2010/10/image_thumb92.png)](/assets/posts/2010/10/image92.png)

Once you click on the **Finish** button you will notice hiding in the background there is an installer for **Java** waiting for our attention. SageTV requires Java to be installed for it to function correctly, so we will work trough this wizard also.

[![image](/assets/posts/2010/10/image_thumb93.png)](/assets/posts/2010/10/image93.png)

Start with a simple click on **Accept** to run the installation, and again within a few seconds…

[![image](/assets/posts/2010/10/image_thumb94.png)](/assets/posts/2010/10/image94.png)

…Java is now installed and ready also.

[![image](/assets/posts/2010/10/image_thumb95.png)](/assets/posts/2010/10/image95.png)

# Configuration

Now, on the desktop you will see an Icon on the screen for **SageTV,** so double click on the Icon. Each time SageTV starts it checks to see if we have a license, and if not, presents us with the option to provide one, or run in trial mode.

[![image](/assets/posts/2010/10/image_thumb96.png)](/assets/posts/2010/10/image96.png)

You can Enter your registration key, or just Click on **OK. **SageTV will continue starting up

[![image](/assets/posts/2010/10/image_thumb97.png)](/assets/posts/2010/10/image97.png)

After a few more seconds SageTV will present us with the **Configuration Wizard.** The first page of the wizard is **Select Your Country** which is easy to figure out (I hope!).

Navigation is pretty simple, generally using the arrow keys, and enter to make your selection’s.

[![image](/assets/posts/2010/10/image_thumb98.png)](/assets/posts/2010/10/image98.png)

Page 2, is to chose the **Language** we will be using

[![image](/assets/posts/2010/10/image_thumb99.png)](/assets/posts/2010/10/image99.png)

The following page we get to **Enable SageTV Server** so that we can connect SageTV Clients to the server.

[![image](/assets/posts/2010/10/image_thumb100.png)](/assets/posts/2010/10/image100.png)

Next step is to also **Enable Media Extender and Placeshifters** so these can also connect to the server

[![image](/assets/posts/2010/10/image_thumb101.png)](/assets/posts/2010/10/image101.png)

SageTV has a really cool feature for remote users to use the server, which they call Placeshifter, to take advantage of this we also need to create user accounts so that these connections can be secured

[![image](/assets/posts/2010/10/image_thumb102.png)](/assets/posts/2010/10/image102.png)

Click on **Configure Placeshifter users** and we will see a dialogue with some options. Just select **Add New User** and hit enter. we will be

[![image](/assets/posts/2010/10/image_thumb103.png)](/assets/posts/2010/10/image103.png)

A keyboard will then appear where we can now supply the user name for the account which will be used for Place Shifting.

[![image](/assets/posts/2010/10/image_thumb104.png)](/assets/posts/2010/10/image104.png)

After you hit **Enter**, the display will refresh and we now need to provide a password for this account

[![image](/assets/posts/2010/10/image_thumb105.png)](/assets/posts/2010/10/image105.png)

You will be asked to retype the password to confirm it, and then we should see that the new accounts has been added is is now Enabled for use

[![image](/assets/posts/2010/10/image_thumb106.png)](/assets/posts/2010/10/image106.png)

Once you **Close** the user list, you will be returned back to the wizard, where we can now **Continue**

[![image](/assets/posts/2010/10/image_thumb107.png)](/assets/posts/2010/10/image107.png)

On the next page, we get the option to **Configure Place shifter Internet Connection,** after testing we can simply press on **Continue**

[![image](/assets/posts/2010/10/image_thumb108.png)](/assets/posts/2010/10/image108.png)

On the next page, we get to decide to auto start SageTV with windows. As we plan to use this as a server, I prefer to run headless and run as a service, so I am going with the default option **No – Don’t Load SageTV**

[![image](/assets/posts/2010/10/image_thumb109.png)](/assets/posts/2010/10/image109.png)

We next need to tell SageTV what aspect ratio we are using on our display, and then select the option **Done**

[![image](/assets/posts/2010/10/image_thumb110.png)](/assets/posts/2010/10/image110.png)

The next two screens allow you to adjust the picture to address any over or under scan on the display.

[![image](/assets/posts/2010/10/image_thumb111.png)](/assets/posts/2010/10/image111.png)

[![image](/assets/posts/2010/10/image_thumb112.png)](/assets/posts/2010/10/image112.png)

On the next menu, SageTV offers how to deal with playing video when the menus are active

[![image](/assets/posts/2010/10/image_thumb113.png)](/assets/posts/2010/10/image113.png)

As we have chosen to keep the video going, now we are asked how we would like to see this presented.

[![image](/assets/posts/2010/10/image_thumb114.png)](/assets/posts/2010/10/image114.png)

Pretty obvious, but since we are going to be running as a headless server, the default option works just perfect.

[![image](/assets/posts/2010/10/image_thumb115.png)](/assets/posts/2010/10/image115.png)

SageTV has some magic which it can use to figure out what you would like to record. Been pretty fussy about TV, I like to make my own decisions on which shows to record.

[![image](/assets/posts/2010/10/image_thumb116.png)](/assets/posts/2010/10/image116.png)

Time for a weather check, we can tell SageTV our local town, and how we like the weather presented.

[![image](/assets/posts/2010/10/image_thumb117.png)](/assets/posts/2010/10/image117.png)

Similar to the User accounts, these options will popup a dialogue where we can type in the town name, and select the units of measure for the weather reports. After all is set, we can then **Continue**

[![image](/assets/posts/2010/10/image_thumb118.png)](/assets/posts/2010/10/image118.png)

Parental Control – No thanks, I am skipping over this one

[![image](/assets/posts/2010/10/image_thumb119.png)](/assets/posts/2010/10/image119.png)

Now, time to tell SageTV where to find our media, The defaults might work for you, or you may need to point to a server where you have your media stored.

[![image](/assets/posts/2010/10/image_thumb120.png)](/assets/posts/2010/10/image120.png)

Time to tell SageTV which Video standard you will be using, PAL is the choice for most of Europe.

[![image](/assets/posts/2010/10/image_thumb121.png)](/assets/posts/2010/10/image121.png)

When SageTV records your shows, or needs to create Time Shifting files, we need to tell SageTV were it can put these, and how much disk to use (or not)

[![image](/assets/posts/2010/10/image_thumb122.png)](/assets/posts/2010/10/image122.png)

The Next stage of the wizard allows us to setup the video sources we will be using for the TV Feeds

[![image](/assets/posts/2010/10/image_thumb123.png)](/assets/posts/2010/10/image123.png)

The Source setup wizard will show us any currently installed sources, and offer us the option to **Add New Source** to the system, or **Finish Source Setup** once we are done so that we can continue with the main wizards remaining steps.[![image](/assets/posts/2010/10/image_thumb124.png)](/assets/posts/2010/10/image124.png)

You are not going to appreciate this, but for now I am going to skip installing the sources, as the first time around there are a few things we need to do, in order to ensure that we get the process correct and ensure we have a good experience. I will cover this in detail in another blog post.

Back on the main wizard, we now get the opportunity to setup video playback. Not sounding like a parrot, but the server is going to be running headless, so I really do not care about video playback on this machine, after all that is why we use extenders!

_(Of Course you may have other plans, in which case, you may actually be interested in running these tests to get the video on the computer optimal)_

[![image](/assets/posts/2010/10/image_thumb125.png)](/assets/posts/2010/10/image125.png)

And then Finally, we get to the End Page where we have the option to go back and review some of the choices we made, or **Return to the Main Menu** which is where I am going.

[![image](/assets/posts/2010/10/image_thumb126.png)](/assets/posts/2010/10/image126.png)

Nice work so far.

# Home Screen

Well, after answering all those questions, we are now finally presented with the Home Screen

[![image](/assets/posts/2010/10/image_thumb127.png)](/assets/posts/2010/10/image127.png)

Before we close and and convert over the SageTV system to run in Headless mode, I am going to install a plug-in which I fell is a requirement to provide a good experience when watching live TV.

# Installing a Plug-In

Navigate down the menu to the **Setup** option, the press the Right Arrow, to fold out the sub options. On this menu, now scroll down to **SageTV Pligins** and again press on the Right Arrow. Yet another sub menu with now fold out, and we can again select the option **All Available Plugins** and once again press the Right Arrow

[![image](/assets/posts/2010/10/image_thumb128.png)](/assets/posts/2010/10/image128.png)

You will now be presented the Plugin’s interface, and as this is our first visit we are presented with an information disclaimer. After reading this, we can select the option **Do not show this message again** and be dropped into the Plugin nirvana

[![image](/assets/posts/2010/10/image_thumb129.png)](/assets/posts/2010/10/image129.png)

As you will quickly see, there are many Plugins to select from, and you can read about each one either in the SageTV forums, or by selecting one of the plugins and choosing the information button.

To begin, our Cursor is located in the top Horizontal menu, with the **General **plugin category highlighted.

[![image](/assets/posts/2010/10/image_thumb130.png)](/assets/posts/2010/10/image130.png)

Using the Arrow keys, I will navigate over to the category **UI Mod** and press enter, this will refresh the list of plugin’s to match this new category choice and I will then scroll down the list until I locate the plugin **MiniGuide**.

[![image](/assets/posts/2010/10/image_thumb131.png)](/assets/posts/2010/10/image131.png)

Now, Pressing enter on the Plugin, its Options dialogue will popup, and I can now select the choice to **Install Plugin,** but before we do, there is no harm in clicking on **View Plugin Details** so that we can actually learn what this plugin is actually used for.

[![image[208]](/assets/posts/2010/10/image208_thumb.png)](/assets/posts/2010/10/image208.png)

_In the case of the MiniGuide, the description is not very useful, so a visit to the forums will help out with understand what the real purpose of the plugin is, or in this case a simple picture will help. The guide appears at the bottom of the LiveTV screen, and allows you to use the remote to browse what is on now or later on your TV channels without actually changing channels or requiring you to go back to the main program guide, making the process less intrusive._

[![image](/assets/posts/2010/10/image_thumb132.png)](/assets/posts/2010/10/image132.png)

Pressing on the Left Arrow once finished reading, returns you to the previous screen, where you can again press the enter button to pop up the Options dialogue, and now proceed with the **Install Plugin** process

[![image](/assets/posts/2010/10/image_thumb133.png)](/assets/posts/2010/10/image133.png)

This will then start the process, collecting any dependencies on the way and also installing those as required also.

[![image](/assets/posts/2010/10/image_thumb134.png)](/assets/posts/2010/10/image134.png)

After a few moments, once all the requirements have been downloaded and installed SageTV will inform us that the Install is complete

[![image](/assets/posts/2010/10/image_thumb135.png)](/assets/posts/2010/10/image135.png)

After the Install is complete, SageTV will then detect if any type of restart or reload is required, and prompt you if that is the case

[![image](/assets/posts/2010/10/image_thumb136.png)](/assets/posts/2010/10/image136.png)

Selecting Yes, will then cause the SageTV system to restart or reload as required. Normally this will drop you back in the home screen, unless your using an extender and we required a restart, in which case you will need to power up the extender again.

That's all there is to it. You now have your First plugin installed and ready for use a little later. I am pretty sure you will have spotted a lot of others on the list which appear to be interesting, so go ahead, and do some investigations.

# Service Mode

Finally, we are now ready to switch SageTV over to Service Mode so that we can run Headless, and use the Extenders, Clients or Place shifters for our TV and Media consumption.

We will first close down our SageTV installation, so that there is nothing running. SageTV may popup a warning asking if you are sure you want to shutdown. We are![![image](/assets/posts/2010/10/image_thumb137.png)](/assets/posts/2010/10/image137.png)

Once SageTV has stopped, we can now navigate our start menu, and we will locate **SageTVServiceControl.exe** which is what we now want to launch

[![image](/assets/posts/2010/10/image_thumb138.png)](/assets/posts/2010/10/image138.png)

After Clicking to Launch to tool we will be presented with its interface. The process here is pretty simple.

[![image[221]](/assets/posts/2010/10/image221_thumb.png)](/assets/posts/2010/10/image221.png)

We first need to decided which account we would like SageTV to use while it is running. If you are going to have all your media on this server, then we can safely go with the default _**LocalSystem** _account, however if you have all your media stored on a different server, then LocalSystem is not a good option, as this account will not have permission to access media not local to the server SageTV is running on.

If this is your scenario, you should have a user account, possibly on a domain which has access to the media. I generally use a domain structure and create an account especially for SageTV to use. In this case you will need to click on the option **Change User** and provide the username, and password for this account.
