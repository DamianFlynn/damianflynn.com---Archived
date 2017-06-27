---
authors: Damian Flynn
comments: true
date: 2010-12-15 22:46:00+00:00
layout: post
description: automation-engine-decisions
title: Automation Engine… Decisions!
wordpress_id: 25
categories:
categories:
- Developer
- Smart Home/Buildings
tags:
- Lighting
- Live TV / PVR
- Audio Video
- Security
- HVAC
- Presence
- Command and Control
---

For the last few years I have been building an automation solution for my home, and like all good solutions I needed a good engine to power all the workflows, logic decisions and of [![image](/assets/posts/2011/05/image_thumb.png)](/assets/posts/2011/05/image.png) course the user interfaces which would be presented around my home. After spending may hours reviewing the numerous options available at the time I finally selected to use the CQC Automation Engine to take this role. Over the years I followed the progress of this product trough to its V1.0 release, right trough to its V3.1 version.

I learned a lot from the fantastic community which generated a lot of friends, contacts and support in the dark nights which stuff just refused to work. Some of the characters over the years departed to different technologies, while others invested and shared vast amounts of time and energy extended the support for the product. During the course of my time, I always struggled to get my mind around the bespoke programming concepts and language which was exposed for our usage; and as I deployed more technologies this challenge continued to grow to blocking point.

Finally, a number of changes in the Licencing and Support terms for the product kicked me to investigate alternative options. The idea of having to start over researching engines was daunting; at the same time I was offered a option to certify as a “Control 4” developer, however previous experience on that platform had left a bad taste, and thus I decided to move on with my quest.

## Elve

I had the pleasure of locating an ex-CQC user, whom had aborted the platform about 3 years earlier, who decided to try and hit the issue head on and code his own engine, which at the time was called the J9 [![image](/assets/posts/2011/05/image_thumb1.png)](/assets/posts/2011/05/image1.png)engine. This has since being converted to a professional solution and is marketed as “Elve” by CodeCore Technologies.

One of the biggest attractions to the solution, is that Johnny and his team, ported the best functions of the CQC platform, and built from the ground up a .NET solution, the SDK is very familiar and support has been simply fantastic. However, as a pre 1.0 version of the product, the SDK is progressing rapidly, and the number of supported devices and appliances is still quite limited. However, the team are acutely aware of this, and encourage any potential developers to create and contribute drivers; in return they are offering a free Professional Licence (Worth $800) and assistance in creating the driver.

### 

### My first Driver

After a few weeks starting and stopping, trying some different approaches and getting acquainted to the new framework, I decided it was time to create a driver for my whole house audio processor, the “Xantech MRC88” 16 Zone system. The first step was a study of the protocol document for controlling the device; then reviewing some of the sample drivers included in the SDK the time was right to start my development attempts. After a few hours, some emails and a lot of debugging, my first driver’s basic functionality was up and running.

The best news however was a few weeks later, I had fully completed the driver, and the icing on the cake was to learn that my driver would be included in the 1.0 version of the products release. Yahoo!

## Next

A few weeks into using the product, the conversion from CQC to ELVE has been totally painless, although I do admit that not having all the drivers I was accustomed to available to me a little limiting. However, the structure of the product, along with its SDK have facilitated for a very customisable environment. Development has been very enjoyable, and I already have my eyes set on some more drivers, long live the Elve’s.
