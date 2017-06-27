---
authors: Damian Flynn
comments: false
date: 2009-08-08 22:25:00+00:00
layout: post
description: sagetv-and-hi-def-satellite-tv
title: SageTV and Hi-Def Satellite TV.
categories:
- Developer
- Smart Home/Buildings
tags:
- Live TV / PVR / IPTV
- Audio Video
---


Before we start, lets get the objectives listed.

1) Stable Server to host Sage 7

2) Multiple Satellite feeds for the Live TV Service

3) Fully working EPG

As I am based in Ireland, the primary satellite I will be focusing on is Astra 28.2; otherwise know as Sky UK or Freesat. The solution will be able to deliver Standard and High Def TV to all my Extenders, and with a little more work which for legal reasons we will not delve into, have the ability to decode with legit cards encrypted Channels.

I am fortunate to have 4 Satellite dishes out back, all of which I will be connecting to the Sage box, covering from Thor at 0.8 w, Hotbird at 13w, Astra at 19w and the focus for this document Eurobird/Astra2 at 28.2w

## Overview

I am going to build this project from the ground up, so as you read trough, you are welcome to pick and mix the different modules to suite you own needs. The theory is sound for all Satellite's following the Ku band technologies. The cards we use must be have a driver format know as “BDA”, otherwise you are really better to throw in the bin and go shopping. I have used Digital Everywhere FireDTV, and Technotrend cards with no real issues, however my latest hardware is dual head, increasing the number of feeds i can fit in the same small server.

## My Environment

For this project I am using an older Server class piece of kit, the Dell 860 1U rack machine. It will be loaded with Windows 7 Ultimate, has 8gb of RAM, and using 2 new TBS 6980 Dual Head DVB-S2 satellite cards. The Feeds will be direct from a Quad LNB.

## Ingredients

If you like to be organised up front, then now is as good a time as any to go gather in the tools we are going to use in this project.

Please note that there are many choices available for each of the key components we will be utilizing. I will try to explain why i have made my personal choices to help you understand the logic I am employing, but please do not consider this as gospel. You are welcome and encourage to use the solutions which best fit your personal needs.

  * OS  
  * DVB-S Bridge Software  
  * SageTV  
  * Extenders/Place shifters / Clients  
  * XMLTV TV Guide Data 


### OS

The choose of the Operating system is really up to you. The requirements are simple – Must support the BDA framework. I am going to focus on Windows OS; however with a little magic this could be done on Linux or MAC. you just need a version of the tools which are compatible with those operating systems. The problem software will generally be the DVB-S Bridge options as these are mainly windows based.

If you do decide to use and x64 based OS, remember to update the paths in the guide to represent the x86 version [_normally on x64 OS versions use c:program files (x86) as the base path_].

For my deployment I am selecting Windows 7 Ultimate x64. I know that this OS has a full support layer for the Media components we need especially BDA. I have hacked a Windows 2008 server into getting BDA support added, but its to much pain to worry about, and if your going to make this the main TV solution for your home, you are not going to want the Wife Acceptance Factor (WAF) to sink to null if you can not quickly rule out where the issues are (it is just a painful experience).

I am not going to hand hold you trough the installation of Windows 7, so just grab that USB or DVD and get the OS deployed.

Expect that you will need to spend a little time installing the additional drivers required for the DVB-S2 cards. If you are joining a “Domain” go for it, or in windows 7 you could also create or join a “Homegroup” for sharing your media.

### 

### DVB-S Bridge

Before I even bother to waste further time working on this project, I am going to validate that the DVB-S system is working correctly. therefore I am going to jump directly into installing the bridge software. There are a number of options again available to select from for this part of the installation

1) DVBViewer for SageTV

2) TheatherTech for SageTV

3) DVB Enhanced for SageTV

4) DVBLink2 (Not validated support for SageTV in the current version)

#### DVB Enhanced for SageTV (DVBE4SAGE)

DVBE4SAGE is provided as a ZIP archive and is pretty simple to install. If you have not downloaded the software, point your browser to [http://code.google.com/p/dvbe4sage/downloads/list](http://code.google.com/p/dvbe4sage/downloads/list) and grab the latest build. This was 236 at the time of writing.

Create a folder on your chosen computer, for example **c:program filesdvb4sage** and proceed to unzip the downloaded software. Once complete you will see a few new files and a new folder as in the shot:

<blockquote>[![image](/assets/posts/2010/10/image_thumb.png)](/assets/posts/2010/10/image.png)
> 
> </blockquote>

What these files actually do is pretty much self explainatory

  * dvbe4sagescv.exe  
    * We will ignore for now, but once we have fully debugged, this will permit us run the software as a windows Service. 
  * encoder.dll  
    * Support file for DVB stream handling 
  * dvb4sage.exe  
    * The main application we will be executing 
  * dvb4sage.ini  
    * The configuration file for the DVB4SAGE application 
  * Plugins Folder  
    * Holder folder for any SINGLE MDAPI Plug-in that you may need to utilize 

Ok, that is all there is to installing this software, its time to configure the settings, and then we can test.

##### Configuration

Lets start with the configuration file I am using for SkyUK/Freesat on 2 DVB-S Feeds, then we can break it into sections to understand what this really means.

<blockquote>[General]   
LogLevel=2   
NumberOfVirtualTuners=2
> 
> [Plugins]   
DCWTimeout=5   
IsVGCam=0   
MaxNumberOfResets=1   
ServedCAIDs=   
ServedPROVIds=
> 
> [Tuning]   
LNBSW=11700000   
LNBLOF1=9750000   
LNBLOF2=10600000   
InitialFrequency=10714000   
InitialSymbolRate=22000   
InitialPolarization=H   
InitialModulation=QPSK (DVB-S)   
InitialFEC=5/6   
DVBS2Tuners=2   
TSPacketsPerBuffer=1024   
NumberOfBuffers=400   
TuningTimeout=20   
TuningLockTimeout=5   
InitialRunningTime=40   
UseSidForTuning=0   
UseNewTuningMethod=0   
ScanAllTransponders=0   
ExcludeTuners=   
ExcludeTunersMAC=   
IncludeTuners=   
IncludeTunersMAC=
> 
> [Output]   
TSPacketsPerOutputBuffer=160000   
TSPacketsOutputThreshold=135   
DisableWriteBuffering=0
> 
> [Encoder]   
ListeningPort=6969
> 
> [Recording]   
PreferredAudioLanguage=eng   
PreferredAudioFormat=ac3   
PreferredSubtitlesLanguage=eng
> 
> [Advanced]   
PMTDilutionFactor=1   
PATDilutionFactor=1   
PMTThreshold=100   
PSIMaturityTime=40   
MaxECMCacheSize=3000   
EnableECMCache=1   
ECMCacheAutodeleteChunkSize=300   
BouquetName=BSkyB Bouquet 4 - DTH Other   
PreferSDOverHD=0
> 
> </blockquote>

Ok, If you just glanced over this, some of the options are pretty straight forward on what they are about.

The configuration file sections and parameters are described in the following table:

<table cellpadding="0" border="0" cellspacing="0" > <tbody > <tr >
<td width="302" >

[General]

</td>
<td width="289" >
</td></tr> <tr >
<td >LogLevel=2
</td>
<td width="289" >Determine the amount of Logging we want - 2 is good for normal use, 0 will stop logging when you are happy all is good, and 5 will hide no secrets!
</td></tr> <tr >
<td >NumberOfVirtualTuners=2
</td>
<td width="289" >This is the number of Satellite Tuners which the DVB-S2 bridge tells Sage it can have, this should be as many as physical tuners you are using, and can be more depending on the channel layout.
</td></tr> <tr >
<td >[Plugins]
</td>
<td width="289" >
</td></tr> <tr >
<td >DCWTimeout=5
</td>
<td width="289" >We will ignore this section as its focus is for CAM software when we need to decode encrypted TV
</td></tr> <tr >
<td >IsVGCam=0
</td></tr> <tr >
<td >MaxNumberOfResets=1
</td></tr> <tr >
<td >ServedCAIDs=
</td></tr> <tr >
<td >ServedPROVIds=
</td></tr> <tr >
<td >[Tuning]
</td>
<td width="289" >
</td></tr> <tr >
<td >LNBSW=11700000
</td>
<td width="289" >One of the cool functions of this software is to go and find all the channels on the satellite for you, here we provide the frequency of any one transponder on the satellite and the software can then do the rest.
</td></tr> <tr >
<td >LNBLOF1=9750000
</td></tr> <tr >
<td >LNBLOF2=10600000
</td></tr> <tr >
<td >InitialFrequency=10714000
</td></tr> <tr >
<td >InitialSymbolRate=22000
</td></tr> <tr >
<td >InitialPolarization=H
</td></tr> <tr >
<td >InitialModulation=QPSK (DVB-S)
</td></tr> <tr >
<td >InitialFEC=5/6
</td></tr> <tr >
<td >DVBS2Tuners=2
</td>
<td width="289" >The number of Physically connected DVBS connections
</td></tr> <tr >
<td >TSPacketsPerBuffer=1024
</td>
<td width="289" >
</td></tr> <tr >
<td >NumberOfBuffers=400
</td>
<td width="289" >
</td></tr> <tr >
<td >TuningTimeout=20
</td>
<td width="289" >
</td></tr> <tr >
<td >TuningLockTimeout=5
</td>
<td width="289" >
</td></tr> <tr >
<td >InitialRunningTime=40
</td>
<td width="289" >
</td></tr> <tr >
<td >UseSidForTuning=0
</td>
<td width="289" >Do we want to use the Service ID or Channel Number to tune with? This is a cool new feature in the software which I will take advantage of
</td></tr> <tr >
<td >UseNewTuningMethod=0
</td>
<td width="289" >
</td></tr> <tr >
<td >ScanAllTransponders=0
</td>
<td width="289" >
</td></tr> <tr >
<td >ExcludeTuners=
</td>
<td width="289" >
</td></tr> <tr >
<td >ExcludeTunersMAC=
</td>
<td width="289" >
</td></tr> <tr >
<td >IncludeTuners=
</td>
<td width="289" >
</td></tr> <tr >
<td >IncludeTunersMAC=
</td>
<td width="289" >
</td></tr> <tr >
<td >[Output]
</td>
<td width="289" >
</td></tr> <tr >
<td >TSPacketsPerOutputBuffer=160000
</td>
<td width="289" >
</td></tr> <tr >
<td >TSPacketsOutputThreshold=135
</td>
<td width="289" >
</td></tr> <tr >
<td >DisableWriteBuffering=0
</td>
<td width="289" >
</td></tr> <tr >
<td >[Encoder]
</td>
<td width="289" >
</td></tr> <tr >
<td >ListeningPort=6969
</td>
<td width="289" >The TCP port we will connect to the Bridge on from SageTV, This will increment +1 for each Virtual Tuner we have as listed at the top of this configuration
</td></tr> <tr >
<td >[Recording]
</td>
<td width="289" >
</td></tr> <tr >
<td >PreferredAudioLanguage=eng
</td>
<td width="289" >If the Channel broadcasts multiple audio streams, which would we prefer to use?
</td></tr> <tr >
<td >PreferredAudioFormat=ac3
</td>
<td width="289" >
</td></tr> <tr >
<td >PreferredSubtitlesLanguage=eng
</td>
<td width="289" >
</td></tr> <tr >
<td >[Advanced]
</td>
<td width="289" >
</td></tr> <tr >
<td >PMTDilutionFactor=1
</td>
<td width="289" >
</td></tr> <tr >
<td >PATDilutionFactor=1
</td>
<td width="289" >
</td></tr> <tr >
<td >PMTThreshold=100
</td>
<td width="289" >
</td></tr> <tr >
<td >PSIMaturityTime=40
</td>
<td width="289" >
</td></tr> <tr >
<td >MaxECMCacheSize=3000
</td>
<td width="289" >
</td></tr> <tr >
<td >EnableECMCache=1
</td>
<td width="289" >
</td></tr> <tr >
<td >ECMCacheAutodeleteChunkSize=300
</td>
<td width="289" >
</td></tr> <tr >
<td >BouquetName=BSkyB Bouquet 4 - DTH Other
</td>
<td width="289" >This is used in conjunction with the UseSidForTuning option, channel numbering may change by region on the satellites, so here we name the region we want
</td></tr> <tr >
<td >PreferSDOverHD=0 
</td>
<td width="289" >If the channel is in SD and HD, would you prefer to use the SD version?
</td></tr></tbody></table>

##### Initial Run DVB4SAGE

Ok, we are almost done with the setup for DVB4SAGE! Seriously.

Before we move on to getting SageTV configured we will use the built in function in DVBE4SAGE to test that Channels can be recorded correctly.

Start DVBE4SAGE, if your OS has UAC enabled, select to start with Administrator level privileges. I generally right click and select Run as administrator to launch the program. This helps ensure there is no resource issues we need to deal with.

[![image](/assets/posts/2010/10/image_thumb1.png)](/assets/posts/2010/10/image1.png)

Start up will take about 60 seconds or so to complete, during this time it will Scan of the Hardware, bring online the DVB environment, and listen for the NIT/PMT table from the Transponder we defined in the configuration file, and grab the Channel number information for us. Once complete we should see a final message **Graph Successfully stopper**

[![image](/assets/posts/2010/10/image_thumb2.png)](/assets/posts/2010/10/image2.png)

It is a good idea to scan over this log, to check for errors, but if you see messages such as in the below sequence at the top of the log then you can rest easy that stuff has gone to plan so far.

<blockquote>_2010-05-28 20:08:33.218 #1: Loading filter "TBS 6980 BDA DVBS/S2 A Tuner/Demod" - succeeded!   
2010-05-28 20:08:33.218 #1: Tuner Filter Info = "TBS 6980 BDA DVBS/S2 A Tuner/Demod"   
2010-05-28 20:08:33.233 #1: Loading filter "TBS 6980 DVBS/S2 A AVStream TS Capture" - succeeded!   
2010-05-28 20:08:33.236 #1: Loaded our transport stream filter   
2010-05-28 20:08:33.237 #1: Added demux filter to the graph   
2010-05-28 20:08:33.238 #1: Connected demux to our filter output pin   
2010-05-28 20:08:33.242 #1: Loading filter "BDA MPEG2 Transport Information Filter" - succeeded!   
2010-05-28 20:08:33.243 #1: Using tuning request-based tuning method...   
2010-05-28 20:08:33.933 #1: Starting initial run for autodiscovery, transponder data: Frequency=10714000, Symbol Rate=22000, Polarization=H, Modulation=Not defined, FEC=5/6_
> 
> </blockquote>

As you scroll back to the bottom of the log, we should see messages which you can recognise as channel names from the satellite, looking closer you will also notice that there is a channel number detected for each entry:[![image](/assets/posts/2010/10/image_thumb3.png)](/assets/posts/2010/10/image3.png)

Skip back to the end of the log and we should see the **Graph successfully stopped **message, which tells us we are ready for business. 

<blockquote>2010-05-28 20:08:54.122 #1: Mapped SID=55355, ONID=2, TSID=2614, Channel=452, Name="Rush HD", Type=25, Running Status=4   
2010-05-28 20:09:13.935 #1: The initial run for autodiscovery finished   
2010-05-28 20:09:13.938 #1: Signal locked, quality=98, strength=86   
2010-05-28 20:09:13.955 #1:** Graph successfully stopped**
> 
> </blockquote>

Before we move on, just check the results of the Signal Locked entry, this will help us ensure that the Satellite feed is strong enough to start the tuning.

##### Testing

Now, we can proceed and test a recording. I recommend that you select an non-encrypted service or Free To Air channel as they are referred to. We will select the **Operations** menu and then **Start Recording...**

[![image](/assets/posts/2010/10/image_thumb4.png)](/assets/posts/2010/10/image4.png)

In the previous stage we observed all the channel names and their respective channel numbers which had been detected. On this satellite one of the better know clear channels is Sky News, which is on Channel Number 501. There are many others, and looking back the log we can pick to test with, an example of a HD option is BBC HD which is on Channel 143.

I’m going to start high since i am over confident and select the HD option. I will enter **143** in the _**Channel**_ field, and then click on **OK.**

This will start off the recorder, which should now create a new file in the program folder for DVBE4SAGE which is the recording. As the default record time is 60 seconds, we will then see the following lines appear once the time has expired

<blockquote>2010-05-28 20:53:13.017 #1: **Time passed, stopping recording of channel 143 ("BBC HD")** on source="TBS 6980 BDA DVBS/S2 A Tuner/Demod", Ordinal=1   
2010-05-28 20:53:13.017 #1: Graph successfully stopped
> 
> </blockquote>

Looking in the folder we should see the new recording file, which was just created.

[![image](/assets/posts/2010/10/image_thumb5.png)](/assets/posts/2010/10/image5.png)

Don't bother double clicking the file to play it, as Windows Media Player will likely start, and it is not able to play back the content without some more tweaking.

I do however suggest you grab a copy of VLC and install it. then open the recording with VLC and you should actually see your recorded TV station. The result should look similar to this.

Right, if everything has gone to plan, the DVBE4SAGE part of the configuration is done, and we can move on to the next part of the puzzle. If you have had some issues then its a good idea to get more technical, and investigate more before progressing to the next segment.

##### Manually Tuning

If you are reading this, then either your scan had no channel numbers, you are having more issues, or you just want to be a armed with good techie pub banter!

Right, to make sense of the rest of the dialogue we will open a look at [LyngSat SkyUK Page](http://www.lyngsat.com/packages/skyuk.html) for some technical details on our target satellite. Of course all the sat details should be updated to represent your provider and location.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tGzoo4YyI/AAAAAAAAABs/UIR1FuXx-0U/image_thumb38.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tGyHkWDUI/AAAAAAAAABo/9rTDQNRvIYw/s1600-h/image76.png)

Now, Armed with some knowledge, lets fill in the Recorder Interface. We are going to start with the simple option, because if this works, we can just skip straight on for SageTV preparation, otherwise we need to debug more.

[![image](/assets/posts/2010/10/image_thumb4.png)](/assets/posts/2010/10/image4.png)

This time, we just enter the **SID** for the channel we are going to test, in this case **Movies4Men** which has a **SID **of **53109**. We type this into the **Channel/SID** field and also **Click** on the **Use SID** option. Now, just **Click OK**

Now, in the same folder as we have the **DVB4SAGE **software we will see the new file created, and as long as its not 0 Bytes we should be in business. You can use the SageTV file browser to play this file back to see what was just recorded.

<blockquote>_2009-08-04 15:15:23.905 Time passed, stopping recording of service 53109 ("movies4men") on tuner="FireDTV BDA Tuner DVBS2", Ordinal=2   
2009-08-04 15:15:23.913 Graph successfully stopped_
> 
> </blockquote>

You will see if everything worked correctly, that the log shows we Auto Discovered the correct transponder details for the channel.

When we get to the Setup step of mapping the EPG to the Channel, since Channel numbers did not work for us, we will have no option but to use this SID number instead, So that Lyngsat page will be very important in gathering this information.

If you did not have success at this stage, go back to the recorded, but this time **Untick **the option **Automatically discover the transponder settings** and add them as you see them from the Lyngsat details. Refer to the image above for some additional assistance, as an example, we will untick the option **Automatic discover transponder settings, **and enter the **Frequency **of **1224000**, **Symbol Rate** of 27500, **Polarity** of Vertical, and **FEC** of 2/3

### SageTV

Go ahead, download if you have not already done so, and install the SageTV Application, current version is 7.0.9 at the time of writing.

Once you have SageTV installed, connect up your extender if you are using one, and configure the environment with your regional details. If you are using the SageTV interface on the computer, ensure you have installed any necessary Codec packs also, otherwise we will have issues later when we try to view Live TV.

Once you are happy that the Basic SageTV environment is working, and you can view an AVI or MKV File, listen to your MP3, and see some photos.

### Sage.Properties

Stop SageTV and ensure the SageTV service is not running. Then add the following entries to the **sage.properties** file for each Virtual Tuner we will be adding to the environment. If you have configured DVB Enhancer to support more than one Virtual tuner, which is what we are connecting SageTV to, then we need to make a few minor changes to this detail for each additional tuner

  * mmc/encoders/1111  
    * The 1111 number should be incremented for each tuner, and should be unique to the sage.properties file. so tuner two should read for example **mmc/encoders/1112**
  * mmc/encoders/1111/1/0/device_name=Tuner 1  
  * mmc/encoders/1111/encoding_host=127.0.0.1:6969  
  * mmc/encoders/1111/video_capture_device_name=SageTV DVB-S2 Enhancer 1   


**mmc/encoders/1111/1/0/available_channels=   
mmc/encoders/1111/1/0/brightness=0   
mmc/encoders/1111/1/0/contrast=0   
mmc/encoders/1111/1/0/device_name=Tuner 1   
mmc/encoders/1111/1/0/encode_digital_tv_as_program_stream=false   
mmc/encoders/1111/1/0/hue=0   
mmc/encoders/1111/1/0/last_channel=2939   
mmc/encoders/1111/1/0/provider_id=-8505416142496727040   
mmc/encoders/1111/1/0/saturation=0   
mmc/encoders/1111/1/0/sharpness=0   
mmc/encoders/1111/1/0/tuning_mode=Air   
mmc/encoders/1111/1/0/tuning_plugin=   
mmc/encoders/1111/1/0/tuning_plugin_port=0   
mmc/encoders/1111/1/0/video_crossbar_index=0   
mmc/encoders/1111/1/0/video_crossbar_type=100   
mmc/encoders/1111/audio_capture_device_index=-1   
mmc/encoders/1111/audio_capture_device_name=   
mmc/encoders/1111/audio_capture_device_num=0   
mmc/encoders/1111/audio_processor=   
mmc/encoders/1111/broadcast_standard=DVBT   
mmc/encoders/1111/capture_config=67600   
mmc/encoders/1111/default_device_quality=Fair   
mmc/encoders/1111/device_class=   
mmc/encoders/1111/dshow_tv_type=   
mmc/encoders/1111/encoder_merit=7   
mmc/encoders/1111/encoding_host=127.0.0.1:6969   
mmc/encoders/1111/forced_video_storage_path_prefix=   
mmc/encoders/1111/last_cross_index=0   
mmc/encoders/1111/last_cross_type=100   
mmc/encoders/1111/live_audio_input=   
mmc/encoders/1111/multicast_host=   
mmc/encoders/1111/never_stop_encoding=false   
mmc/encoders/1111/video_capture_device_name=SageTV DVB-S2 Enhancer 1   
mmc/encoders/1111/video_capture_device_num=0   
mmc/encoders/1111/video_encoding_params=Fair   
mmc/encoders/1111/video_processor=**

### SageTV Testing

[![image](/assets/posts/2010/10/image_thumb6.png)](/assets/posts/2010/10/image6.png)

[![image](/assets/posts/2010/10/image_thumb7.png)](/assets/posts/2010/10/image7.png)

[![image](/assets/posts/2010/10/image_thumb8.png)](/assets/posts/2010/10/image8.png)

[![image](/assets/posts/2010/10/image_thumb9.png)](/assets/posts/2010/10/image9.png)

[![image](/assets/posts/2010/10/image_thumb10.png)](/assets/posts/2010/10/image10.png)

[![image](/assets/posts/2010/10/image_thumb11.png)](/assets/posts/2010/10/image11.png)

[![image](/assets/posts/2010/10/image_thumb12.png)](/assets/posts/2010/10/image12.png)

[![image](/assets/posts/2010/10/image_thumb13.png)](/assets/posts/2010/10/image13.png)

[![image](/assets/posts/2010/10/image_thumb14.png)](/assets/posts/2010/10/image14.png)

[![image](/assets/posts/2010/10/image_thumb15.png)](/assets/posts/2010/10/image15.png)

[![image](/assets/posts/2010/10/image_thumb16.png)](/assets/posts/2010/10/image16.png)

[![image](/assets/posts/2010/10/image_thumb17.png)](/assets/posts/2010/10/image17.png)

After we add the virtual tuner to SageTV, we can progress the configuration and test to see if the two systems are getting a successful communications channel open. Once SageTV is started, we can go to the tuner setup, where we should now see the new Virtual tuner we just added as part of the installed and available tuners list.

After selecting this new tuner, we get presented the **Source Details** where we will use the **Channel Setup** option to proceed and configure a channel to validate that both SageTV and DVB Enhancer for SageTV can communicate with each other.

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tG4qMaVpI/AAAAAAAAACA/qDbYTmoqVnE/image_thumb221.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tG3MrMm-I/AAAAAAAAAB8/oa0Di1g8aDg/s1600-h/image54.png)

Now, In Channel Setup we can select **Edit Channel Line-up** and then **Add Channel to Line-up**

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tG8LLaeOI/AAAAAAAAACI/8MBVKVZ7E2E/image_thumb261.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tG6EldpUI/AAAAAAAAACE/YT2ep5DfQdM/s1600-h/image62.png)

In the next Screen We can provide the detail for each Channel

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tG_NFw71I/AAAAAAAAACQ/YTFM9dx2B84/image_thumb281.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tG9ZqJwmI/AAAAAAAAACM/zfMFL7Nx_R0/s1600-h/image66.png)

For example we Add a channel from SkyUK package, for example Sky News Ireland

[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHBEeT-2I/AAAAAAAAACY/tsj7BH9pdYY/image_thumb16.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHAKjBPwI/AAAAAAAAACU/oGtvBbbAxWE/s1600-h/image321.png)

The Details for this will look as follows

  * Station Name  
    * **Sky News **[The Name we will see in the guide for the channel] 
  * Station ID  
  * Logic (Guide) Channel Number  
    * **501 **[For your TV Channel Number] 
  * Physical (Tuning) Channel Number  
    * **4711** [This is the SID of the Channel and passed to DVBE4EPG to tune in the channel for us] 

Once you have provided this detail, we can click on the **Add – Done** option which will be us back to the **Channel Setup Page. **At this point you can of course go ahead and preview the channel to make sure that SageTV and DVB Enhancer are working as expected

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHE3MdJiI/AAAAAAAAACg/oi6k8frgfxE/image_thumb42.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHDA8yZKI/AAAAAAAAACc/uHJh7L3u-kU/s1600-h/image84.png)

After clicking on preview, SageTV will send its message to DVBE4SAGE and start the tuning procedure, requesting the P**hysical (Tuning) Channel Number** we defined a few moments earlier, when we added the channel.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHIVndnaI/AAAAAAAAACo/2AWXbDPQFWo/image_thumb44.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHGPoxZMI/AAAAAAAAACk/Fn08cdmFQhg/s1600-h/image88.png)

You should now see the picture from this channel and, if you check the logs in DVBE4SAGE you should see the tuning request correctly transfer, and the stream file begin to grow

<blockquote>_2009-08-04 15:44:00.100 Received command: "START SageTV DVB-S2 Enhancer 1 Digital TV Tuner|1539987586|4711|2498794080168|C:Program Files (x86)SageTVSageTVVideoAfternoonLiveWithKayBurley-4715-1.ts|Fair"   
2009-08-04 15:44:00.101 Received START command to start recording on source "SageTV DVB-S2 Enhancer 1 Digital TV Tuner", channel=4711, duration=2498794080, file="C:Program Files (x86)SageTVSageTVVideoAfternoonLiveWithKayBurley-4715-1.ts"   
2009-08-04 15:44:00.102 Service SID=4711 has Name="Sky News Eire (Cable)"   
2009-08-04 15:44:00.102 Autodiscovery results for SID=4711: TID=2026, Frequency=12207000, Symbol Rate=27500, Polarization=V, Modulation=QPSK (DVB-S), FEC=2/3   
2009-08-04 15:44:00.102 Starting recording on tuner="FireDTV BDA Tuner DVBS2", Ordinal=2, SID=4711 ("Sky News Eire (Cable)"), Autodiscovery=TRUE, Duration=2498794080, Frequency=12207000, Symbol Rate=27500, Polarization=V, Modulation=QPSK (DVB-S), FEC=2/3   
2009-08-04 15:44:00.116 Loading filter "FireDTV BDA Tuner DVBS2" - succeeded!   
2009-08-04 15:44:00.121 Tuner Filter Info = "FireDTV BDA Tuner DVBS2"   
2009-08-04 15:44:00.145 Loaded our transport stream filter   
2009-08-04 15:44:00.146 Added demux filter to the graph   
2009-08-04 15:44:00.147 Connected demux to our filter output pin   
2009-08-04 15:44:00.148 Loading filter "BDA MPEG2 Transport Information Filter" - succeeded!   
2009-08-04 15:44:00.151 Using tuning request-based tuning method...   
2009-08-04 15:44:00.428 Found CA descriptor EMM PID=0xC0(192), CAID=0x960(2400), PROVID=0x0(0), this CAID is served and will be passed to plugins   
2009-08-04 15:44:00.669 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoAfternoonLiveWithKayBurley-4715-1.ts"   
2009-08-04 15:44:00.669 Replied 0   
2009-08-04 15:44:00.716 Received command: "NOOP"   
2009-08-04 15:44:00.949 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoAfternoonLiveWithKayBurley-4715-1.ts"   
2009-08-04 15:44:00.949 Replied 27636   
2009-08-04 15:44:01.154 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoAfternoonLiveWithKayBurley-4715-1.ts"   
2009-08-04 15:44:01.154 Replied 134984   
_
> 
> </blockquote>

Congratulations – Phase 1 is done, and we have a working SageTV to DVB4Sage configuration

## DigiGuide

First off, we download and install DigiGuide from [www.digiguide.com](http://www.digiguide.com).

### 

### Install DigiGuide

Start off the installation and we will be instantly requested for the location to install the tool to, we can accept the default, and click next. Before you know it, the tool is installed and ready for configuration

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHKQiZtRI/AAAAAAAAACw/BNbAfTriVeQ/image_thumb.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHJXS26DI/AAAAAAAAACs/Dqq1azc_JnQ/s1600-h/image2.png) [![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHMcbexgI/AAAAAAAAAC4/gUW1myLwo3I/image_thumb1.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHLcWVlBI/AAAAAAAAAC0/PWRC2aB_x1c/s1600-h/image511.png)

The main screen is automatically presented as soon as installation is complete, and we can proceed with the Configuration Wizard. The first question is as simple as selecting the Country for which you will be subscribing to TV Channels.

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHO22euII/AAAAAAAAADA/Fd8JrfZvm3Q/image_thumb2.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHNcb2VbI/AAAAAAAAAC8/Z9j25GTLXDk/s1600-h/image8.png) [![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHQ6uCHkI/AAAAAAAAADI/Xo1BzxDUOi0/image_thumb3.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHP9Wk1iI/AAAAAAAAADE/z_xC2w9v_n8/s1600-h/image11.png)

After this, we are asked to identify the provider / package for TV we are receiving. this will help the Guide get all the necessary channels we have in our area. Then we can select the Categories which we normally watch, or subscribe to. The next option, lets us put some preferences on the different channels categories we watch. This is not going to be very important for our installation as we will be using SageTV to present the guide and not relying on DigiGuide as a User Interface

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHTPKw9cI/AAAAAAAAADQ/o9siMuV2BvI/image_thumb4.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHSH19sMI/AAAAAAAAADM/eyTSy8sx_Ro/s1600-h/image14.png) [![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHVrZgU5I/AAAAAAAAADY/NVee0ovrnjQ/image_thumb5.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHUa-SxwI/AAAAAAAAADU/PRyFNEgSVzw/s1600-h/image171.png) [![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHYMIn2AI/AAAAAAAAADg/1484XUjbiPY/image_thumb61.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHWwZ42OI/AAAAAAAAADc/kTsv1DzEp1A/s1600-h/image20.png)

That’s should be it, We can finish off the wizard, and give DigiGuide a little time to work, as it builds up our channel list from the details we just provided, and then fetches the EPG details

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHaTcP5fI/AAAAAAAAADw/DMZDn757TxM/image_thumb7.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHZa2fKWI/AAAAAAAAADs/n61Qgjn3MK0/s1600-h/image23.png)

Once everything is updated we will see the guide information, and we can progress with the XML support for DigiGuide

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHeN1ai1I/AAAAAAAAAD4/mhGnuhQeBcY/image_thumb9.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHcOLYoSI/AAAAAAAAAD0/U0I0x9ReZs4/s1600-h/image27.png)

## 

### DigiGuide to XML

Next we need to download the **DG2XML** support pack, this is provided on the [Sage Site](http://forums.sagetv.com/forums/downloads.php?do=file&id=222). Download and unpack the archive. Inside the archive you will find **_DG2XML.EXE_** and a folder **DG2XML.dgscheme.web.**

We will move **DG2XML.dgscheme.web** folder into the DigiGuide Server Skins folder located normally in **_C:Program FilesDigiGuide TV Guideschemesserver skins_**

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHge-DZKI/AAAAAAAAAEA/zl5TPmWC1Ic/image_thumb13.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHfBm4msI/AAAAAAAAAD8/MmP6GAuW9aY/s1600-h/image35.png)

Now, lets start up **DigiGuide**, and configure the Web Server, to use this DG2XML support pack as the Skin for the web service. To do this,

  * In **DigiGuide** we select the Menu **Tools -> Customize -> Web Service -> Enable Web Service**  
  * We don't really need to configure support from password authentication, but if you wish, that’s fine  
  * Select the DG2XML skin from in the "Web Skin" section.  
  * [![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHiqilbYI/AAAAAAAAAEI/3zDB-f6horc/image_thumb11.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHheNf09I/AAAAAAAAAEE/GrQV7ERaS7w/s1600-h/image31.png)

Now, we can place the **DG2XML.exe **utility in the SageTV folder, as we will require this a little later as we configure the XML TV support in SageTV.

  * Copy the **DG2XML.exe** file to a new folder, for example **C:Program FilesDG2XML**

Now, we should be able to test that the XML Conversion tools are working, so lets pop open a command prompt and navigate to the **DG2XML** installation folder. Once there we will run the **DG2XML** utility and if it works correctly we should be presented with a new **epgdata.xml** file, generated from the **DigiGuide **information

  * cd  
  * cd “program filesdg2xml”  
  * dg2xml.exe 

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHlVyE3zI/AAAAAAAAAEQ/gNru1_d807w/image_thumb321.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHj8XTa0I/AAAAAAAAAEM/G_5q35Gr7HQ/s1600-h/image74.png)

## 

## SageTV XMLTV Importer

The next Stage of the process is to use the XMLTV tool from LMGestion. Stop the SageTV services and run the installer for the XMLTV Importer. After installation, we will be presented with the main interface

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHor27tpI/AAAAAAAAAEY/uFg_sXo7joE/image_thumb58.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHnXxhueI/AAAAAAAAAEU/VP7T_vpaL5Y/s1600-h/image124.png)

### Configure the XMLTV Grabber

Now, we click on the top option **XMLTV Files and Grabber** to see what XMLTV sources we have configured. Since this is our first run we will just see one source called Default. We are going to edit this Default setting to work with our DigiGuide EPG Data.

[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHrWbyMNI/AAAAAAAAAEg/UrRYfb9KJ7U/image_thumb60.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHqBrKXrI/AAAAAAAAAEc/fJ1nDMJhUhM/s1600-h/image128.png)

Click on **Edit** and we get to define more detail for the DigiGuide Feed.

  * First we change the **Source Name** to read as **DigiGuide.**  
  * Next, Using the Browse button we locate the **egpdata.xml** file which was created when we tested that the **DG2XML** tool was working correctly. Once set the **XMLTV File** will be set to a setting similar to **C:program filesdg2xmlepgdata.xml**  
  * Finally we can tell the system to call the XML Grabber each time it runs, so to get the most recent information available in DigiGuide. to do this we set the **Grabber** to the folder we placed the **DG2XML.exe** file, this should resemble **c:program filesdg2xmldg2xml.exe**

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHt4T2WFI/AAAAAAAAAEo/4RjdVfksKcw/image_thumb62.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHsQBi4qI/AAAAAAAAAEk/nNfJlGTK4kU/s1600-h/image132.png)

Now that we have provided the main configuration data, we can click next, where the tool will then go and read the XMLTV file to check that it is formatted correctly, and allow us make some fine tuning adjustments. We can now click **Next** to continue

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tHwWYdNJI/AAAAAAAAAEw/YfMr7ZhSTWU/image_thumb64.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tHvHz7rAI/AAAAAAAAAEs/bMjW-Fzb6OU/s1600-h/image136.png)

We are presented with One random program found in the XMLTV File, where we have the ability to verify and check that everything is correct. If your time zone is different from the DigiGuide source, we can use the Time Offset setting to apply any modifications needed. Next we can move on to the the last section of the configuration.

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tHzA-xKyI/AAAAAAAAAE8/U-I4zhXJGw4/image_thumb70.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tHxormX3I/AAAAAAAAAE4/e4vrB5yFmcE/s1600-h/image148.png)

Here we are offered a process to help determine when programs are part of a series. Using the DigiGuide service, we will set the tool to use the option **Based on episode title or program Description.** We can now click **OK** to complete the edit process. returning back to the **XMLTV Files and Grabber.**

### Channel Line Ups

This is the next most important part of the process. Now that we have our XMLTV guide in place, we need to teach the system how to match programs in the XMLTV file to the actually channels we are receiving on the DVB Enhancer.

Launching into this section of the Wizard lets us customise the details for our TV Viewing.

  * First we will start with assigning a **Name **for the feed, in this case **DigiGuide XMLTV Lineup**  
  * As we are participating in an open community, I am going to allow my settings to be shared, so i will not be clicking on the options **Do not upload this lineup to the online database**  
  * Next, we will set the Country, Region, Type and Source information. As I am based in the West Of Ireland my specifics will be  
    * Country – **Ireland**  
    * Region – **West**  
    * Type – **Digital**  
    * Source – **Satellite**  
    * Provider – **Sky Digital**
  * Finally, before we move on, We will **Click** on the option **Use and external set top box or recorder plug-in** as we are taking advantage of the fantastic **DVBE4SAGE Plug-in** in this build 

[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tH1lzh6UI/AAAAAAAAAFE/sl9XJEaJeRo/image_thumb10.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tH0SACSrI/AAAAAAAAAFA/OT-cHdC7eMQ/s1600-h/image201.png)

On the next page, we are going to be starting from a clean sheet, so plenty of time will help a lot here. We have now go to go ahead and add each channel that we are interested in receiving and viewing, along with its Guide data into the form.

The Data which we will be providing will be

  * ID  
    * Unique name – I am using the EPG number of the channel to help me sort the list 
  * Name  
    * A unique name for the Channel, I am using the same as the Call Sign 
  * Call Sign  
    * This is the Name which we will see in the EPG for the channel 
  * Number  
    * This is the most important entry in the file, When we load this detail into SageTV this number will be used for the** Logic (Guide) Channel Number** [For your TV Channel Number] and also **Physical (Tuning) Channel Number** [This is the SID of the Channel and passed to DVBE4EPG to tune in the channel for us]. for this reason we MUST use the **SID** number in this field 
  * Time Offset  
    * Some Channels may be focused for different time zones in Europe, so we can make adjustments here to bring these channels into the same time zone as the guide to get the EPG data to correspond correctly. 
  * HD  
    * Provides us an opportunity to define that this channel broadcasts in Hi-Def mainly, or Only. 
  * XMLTV Data  
    * This is a dropdown list of all the channels we have detected in the XMLTV file, with the channels name, and its guide Channel Number should we decided to use the channel same numbers. 

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tH3_hGX1I/AAAAAAAAAFM/I3zTXdkEB1s/image_thumb14.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tH2hc2WdI/AAAAAAAAAFI/t_kJkQICKdM/s1600-h/image28.png)

Look at [LyngSat SkyUK Page](http://www.lyngsat.com/packages/skyuk.html) for a list of the Channels you plan to add, and get busy!

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tH5vo8dkI/AAAAAAAAAFU/hsR62xByI_E/image_thumb47.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tH4ropZaI/AAAAAAAAAFQ/YlGSGWLVA-s/s1600-h/image93.png)

Using **Movies4Men** as an example -

  * Name – **Movies4Men**  
  * Call Sign – **Movies4Men**  
  * Number – **53109** (Refer to the Shot above from Lyngsat)  
  * XMLTV Data – Select **Movies4Men** from the drop down list  
  * ID – Set it to the EPG Number of Movies4Men **323** (Note this has no effect in SageTV!) 

After adding a few Channels we will see the following presentation.

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tH8Vgk0NI/AAAAAAAAAFc/4NHvdIBjX2A/image_thumb18.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tH67Y17_I/AAAAAAAAAFY/fPBSyDug7F8/s1600-h/image36.png)

Keep up the good work until you have all the required channels added

### Categories and Ratings

The next Configuration we focus on will be the Categories.

#### Categories

This is used for improving the readability of the Program Guide when it is displayed.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tH-wUD33I/AAAAAAAAAFk/99XbciG_nFo/image_thumb72.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tH9kM2CcI/AAAAAAAAAFg/EUsQHsp13Qg/s1600-h/image152.png)

We click on **Edit categories for reliable recordings and easily readable program guide**

Before we start the configuration, we have two different Categories lists which we will be matching up. On the Left we have the Categories which Sage utilizes for its guide, and on the right is the categories which we get in the DigiGuide XMLTV Feed.

<table cellpadding="0" width="500" border="0" cellspacing="0" > <tbody > <tr >
<td width="250" valign="top" >**SageTV EPG**
</td>
<td width="250" valign="top" >**DigiGuide XMLTV**
</td></tr> <tr >
<td width="250" valign="top" >Serie   
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
<td width="250" valign="top" >Technology, Political, Gardening, Business and Finance, Education, Scientific Documentary, Motoring, Adult Entertainment, Reality Show, Quiz Show, Special Interest, Fashion, Nature, Kids Drama, Arts, Animation, Comedy, Chat Show, Travel, Entertainment, DIY, Cookery, Game Show, Religious, Health, Sitcom, Consumer, History Documentary, Drama, Talk Show, Soap, Documentary, Series, Science Fiction Series, Film, News, Sport, Music, Magazine Programme, and Childrens
</td></tr></tbody></table>

Our objective is to Match the Categories on the Left to the Categories on the right. This process is of course subjective to your viewing preferences, but as a guide to assist, this is the breakdown I am currently utilizing

<table cellpadding="0" width="600" border="0" cellspacing="0" > <tbody > <tr >
<td width="150" valign="top" >SageTV Guide
</td>
<td width="150" valign="top" >Keyword Matcher
</td>
<td width="150" valign="top" >Keyword Excluder
</td>
<td width="150" valign="top" >DigiGuide Category
</td></tr> <tr >
<td width="150" valign="top" >Serie
</td>
<td width="150" valign="top" >Serie
</td>
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >Series   
Science Fiction Series
</td></tr> <tr >
<td width="150" valign="top" >Movie
</td>
<td width="150" valign="top" >movie   
film   
drama
</td>
<td width="150" valign="top" >kids
</td>
<td width="150" valign="top" >Film   
Drama
</td></tr> <tr >
<td width="150" valign="top" >News
</td>
<td width="150" valign="top" >news   
scientific   
business   
political
</td>
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >News   
Scientific Documentary   
Business and Finance   
Political
</td></tr> <tr >
<td width="150" valign="top" >Sport
</td>
<td width="150" valign="top" >Sport
</td>
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >Sport
</td></tr> <tr >
<td width="150" valign="top" >Recreation
</td>
<td width="150" valign="top" >Sitcom   
soap   
entertainment   
comedy
</td>
<td width="150" valign="top" >adult
</td>
<td width="150" valign="top" >Soap   
Sitcom   
Entertainment   
Comedy
</td></tr> <tr >
<td width="150" valign="top" >Music
</td>
<td width="150" valign="top" >Music
</td>
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >Music
</td></tr> <tr >
<td width="150" valign="top" >Educational
</td>
<td width="150" valign="top" >education   
technology   
gardening   
nature   
Cookery   
DIY
</td>
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >Technology   
DIY   
Cookery   
Gardening   
Education   
Nature
</td></tr> <tr >
<td width="150" valign="top" >Magazine
</td>
<td width="150" valign="top" >magazine   
documentary   
motoring   
health   
consumer
</td>
<td width="150" valign="top" >scientific
</td>
<td width="150" valign="top" >Magazine Programme   
Health   
Motoring   
Consumer   
History Documentary   
Documentary
</td></tr> <tr >
<td width="150" valign="top" >Children
</td>
<td width="150" valign="top" >Children   
Kids   
Animation
</td>
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >Childrens   
Kids Drama   
Animation
</td></tr> <tr >
<td width="150" valign="top" >General
</td>
<td width="150" valign="top" >Talk Show   
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
<td width="150" valign="top" >
</td>
<td width="150" valign="top" >Talk Show   
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

## SageTV XMLTV Support

We can now start-up **SageTV** again, and use the Setup Wizard to configure the XMLTV guide. From **SageTV** main menu, press **Setup**, then **Setup Video Sources**.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIMxD79DI/AAAAAAAAAGM/oDOxYOq8F5Y/image_thumb341.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tILYU11jI/AAAAAAAAAGI/l1tF7JfAers/s1600-h/image78.png)

This will bring us to the **Source Wizard Summary** screen, where we have the option to add additional sources or modify existing ones. We will select the existing connection we added previously for the network stream on the **DVB Enhancer for SageTV**

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tIP5fGgPI/AAAAAAAAAGU/9L-AT1zEetE/image_thumb361.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIOdAnsjI/AAAAAAAAAGQ/BrTRndVsuiE/s1600-h/image82.png)

After selecting the tuner we are configuring, we can select the option for **EPG Line-up**

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tISfU5wmI/AAAAAAAAAGc/R-dOn4MMm7w/image_thumb52.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIRLMQMdI/AAAAAAAAAGY/HMQTHPzrGf4/s1600-h/image112.png)

In the Wizard, we now are offered the option of determining which source to use for the EPG. As we are utilizing XMLTV as the source we will take the option **Use US, Canada, or XMLTV Guide Data with Source**.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIVrIcRtI/AAAAAAAAAGk/S7sXQLuzVb4/image_thumb54.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIUIKcNoI/AAAAAAAAAGg/XBdl8sEBxE4/s1600-h/image116.png)

Next, we will be asked to select to source, this is not important in the configuration. Select either and we can move onto the next step

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIYWf57JI/AAAAAAAAAGs/dZRXD9tSs1o/image_thumb48.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIW0eRm5I/AAAAAAAAAGo/K2kNSjzlRNg/s1600-h/image104.png)

We will enter **00000** as your zip code (press enter).

[![image](http://lh5.ggpht.com/_SncQAdkhWiY/S7tIa0OmZbI/AAAAAAAAAG0/pKfhqs4zhok/image_thumb501.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIZm82PyI/AAAAAAAAAGw/KEAjlg7vYyA/s1600-h/image108.png)

If everything has went correctly, we should now be presented with the Name of the XMLTV Guide we configured in the XMLTV Import tool a little earlier. Select this entry to move forward.

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIeOMaGvI/AAAAAAAAAG8/LvPu6fwQOjs/image_thumb20.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIcD8e38I/AAAAAAAAAG4/7kbYOhJu8Qs/s1600-h/image40.png)

Now, we are offered the option of Basic Service or Extended Basic Service. I don’t think it matters but since we are customising the XMLTV Feed, lets go with Extended Basic Service

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIgob2U9I/AAAAAAAAAHE/Xuf3zEilLI0/image_thumb22.png?imgmax=800)](http://lh3.ggpht.com/_SncQAdkhWiY/S7tIfKGDWDI/AAAAAAAAAHA/MmQ5cFiOfhI/s1600-h/image44.png)

Next, we are dropped back into the Channel Setup, and instantly prompted to **Scan For Channels**, however we will be selecting **No – I will scan for channels later** as the DVBE4SAGE feed does not work like a normal DVB Card.

[![image](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIjk76d3I/AAAAAAAAAHM/0d-1cYRig10/image_thumb24.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tIiEfhjrI/AAAAAAAAAHI/iNrpXdHr-KE/s1600-h/image48.png)

Great, we now should see the channels we included in the **XMLTV Channel List** a little earlier in the **Channel Setup** screen. We can now select the option **Done with Channel Setup**

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIm4MbIsI/AAAAAAAAAHU/8JZp4yIfsWw/image_thumb26.png?imgmax=800)](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIlbfxPBI/AAAAAAAAAHQ/AHIyYRWVNWY/s1600-h/image52.png)

This will return is back to the **Source Wizard Summary** where can now see that the New **DigiGuide XMLTV Lineup** is now assgined

[![image](http://lh3.ggpht.com/_SncQAdkhWiY/S7tIpnrdeqI/AAAAAAAAAHc/MQEXsEMRzwE/image_thumb28.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tIoV1MtbI/AAAAAAAAAHY/idbtkpi74ys/s1600-h/image56.png)

That should do it. Now, lets just check the the program guide is presenting our new Channels which we added to the Channel Line-up in the XMLTV Import Tool

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tItiWwXYI/AAAAAAAAAHo/oEaUrUD4RIo/image_thumb30.png?imgmax=800)](http://lh5.ggpht.com/_SncQAdkhWiY/S7tIrlcHJsI/AAAAAAAAAHk/VByxZJxHxmg/s1600-h/image60.png)

And, of course now is as good a time as any to see that you can select one of these channels and view them. For example, we can highlight **The Sky Riders** on Movies4Men, and SageTV will ask what we would like to do

[![image](http://lh6.ggpht.com/_SncQAdkhWiY/S7tIxJUeNSI/AAAAAAAAAHw/TjjHNWPemQk/image_thumb32.png?imgmax=800)](http://lh4.ggpht.com/_SncQAdkhWiY/S7tIvVv7n4I/AAAAAAAAAHs/luirUng_i9k/s1600-h/image64.png)

The obvious choice is to **Watch Now** which if everything is good will show your show on screen, as we did earlier, we can check the logs on DVB4Sage and see that it is indeed getting the correct infomration and behaving as expected.

_2009-08-04 14:10:14.440 Received command: "START SageTV DVB-S2 Enhancer 1 Digital TV Tuner|395403344|53109|2498782829002|C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts|Fair"   
2009-08-04 14:10:14.441 Received START command to start recording on source "SageTV DVB-S2 Enhancer 1 Digital TV Tuner", channel=53109, duration=2498782829, file="C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"   
2009-08-04 14:10:14.442 Service SID=53109 has Name="movies4men"   
2009-08-04 14:10:14.442 Autodiscovery results for SID=53109: TID=2312, Frequency=11223670, Symbol Rate=27500, Polarization=V, Modulation=QPSK (DVB-S), FEC=2/3   
2009-08-04 14:10:14.442 Starting recording on tuner="FireDTV BDA Tuner DVBS2", Ordinal=2, SID=53109 ("movies4men"), Autodiscovery=TRUE, Duration=2498782829, Frequency=11223670, Symbol Rate=27500, Polarization=V, Modulation=QPSK (DVB-S), FEC=2/3   
2009-08-04 14:10:14.456 Loading filter "FireDTV BDA Tuner DVBS2" - succeeded!   
2009-08-04 14:10:14.464 Tuner Filter Info = "FireDTV BDA Tuner DVBS2"   
2009-08-04 14:10:14.481 Loading filter "FireDTV BDA Receiver DVBS2" - succeeded!   
2009-08-04 14:10:14.489 Loaded our transport stream filter   
2009-08-04 14:10:14.490 Added demux filter to the graph   
2009-08-04 14:10:14.491 Connected demux to our filter output pin   
2009-08-04 14:10:14.493 Loading filter "BDA MPEG2 Transport Information Filter" - succeeded!   
2009-08-04 14:10:14.494 Using tuning request-based tuning method...   
2009-08-04 14:10:14.670 TS packet messed up, fixing...   
2009-08-04 14:10:14.812 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"   
2009-08-04 14:10:14.923 Replied 0   
2009-08-04 14:10:14.931 Signal locked, quality=81, strength=81   
2009-08-04 14:10:14.984 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"   
2009-08-04 14:10:15.286 Replied 40420   
2009-08-04 14:10:15.287 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"   
2009-08-04 14:10:15.287 Replied 40420   
2009-08-04 14:10:15.342 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"   
2009-08-04 14:10:15.343 Replied 66740   
2009-08-04 14:10:15.372 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"   
2009-08-04 14:10:15.372 Replied 79900   
2009-08-04 14:10:15.495 Received command: "GET_FILE_SIZE C:Program Files (x86)SageTVSageTVVideoTheSkyRiders-8202-0.ts"_

Congratulations, you now have a working SageTV installation with the excellent XMLTV Import Tool and the amazing DVB4Sage Enhancer

## SageTV Force Update

As you start working on this, you will keep cycling back to the DigiGuide for new Channels, If you do add a channel which is not in your normal coverage, you must assign it a channel number, or the XMLTV Import tool will not offer you this new channel in the drop down list.

As you add new Channels in the XMLTV Import Tool, you will continue to provide as much detail as required, and then move to the Update Guide Data stage. Which will instruct SageTV of the new information. However it is quite likely that Sage will not go ahead and offer you the newly added channels in the Program Guide, as it believes that it has already added all the channels needed.

### Forcing XMLTV Reload

We need to stop the SageTV system fully if this occurs, and open the **Sage.properties** File, and set the following entries as below, and restart the SageTV System, allowing it a few moments to reload the XMLTV data and rebuild the Channel List for you.

_(Note the /XXXXXXXX/ will be a random string in your file.)_

<blockquote>_epg_data_sources/XXXXXXXX/chan_download_complete=false_
> 
> _epg_data_sources/XXXXXXXX/last_run=0   
epg_data_sources/XXXXXXXX/expanded_until=0_
> 
> </blockquote>

## SageTV Channel Numbers

Once you are 100% happy that everything in the EPG feed is correct, we can go back to SageTV and have the Physical and Logic Channel numbers changed to what we really want to use.

## Conclusion
