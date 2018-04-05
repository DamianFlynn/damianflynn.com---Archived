---
layout: post
title: "Azure Scaffolding 101 - Network Foundations"
date: 2018-04-04 18:25:51
tags:
- Azure
- Resource Manager
- Networking
categories:
- Cloud Strategy
- IT Pro/DevOps
- Networking
- Supportability
twitter_text: "#Azure #Scaffoling Basics - Adding #networks  http://www.damianflynn.com"
authors: Damian Flynn
image: https://farm1.staticflickr.com/122/304348975_0360928345_z.jpg?zz=1
image_url: https://www.flickr.com/photos/willosof/
image_credit: William Vlker
---


Anyone with a little patients can begin deployed resources to the cloud, and over time establish a fantasitic real estate of resources, while potentially saving money, OR...

# Scaffoling a strong foundation

In the real world, when we begin the paractice of build new datacenters, before we roll in the first rack, we first spend a lot of time planning the layout of the space, taking into considerations many attributes, from airflow, power disribution, rack security, and so on. 

However the real focus starts and end on the digital plumbing, How we wire the technology together to ensure that the blinky lights, all behave in a secure and predictable matter. This takes a lot of consideration as we segment the environment for different resources.

So, why on a cloud plaform would we ever skip this step and begin by hosting a website, or virtual machine, and connect up some quick virtual network without ever planning this properly?

Will it work? Yes, of course; 
Will it scale? Yes, of course;
Will it last? God No! One fine day reality will dawn, and panic kicks in...

## Networking in the cloud

Lets begin with a structure...

<div class="mermaid">
graph TD

subgraph BM-Network
subgraph BM-VNET-Management
N0[BM-VNET-Management<br>10.0.0.0/16<BR>West Europe]
SN1(BM-NE-Management<br>10.0.10.0/24)
R1
end

subgraph BM-VNET-NE-Operations
N10[BM-VNET-NE-Operations<br>10.1.0.0/16<BR>West Europe]
SN12(BM-US-AppGateway<br>10.1.2.0/24)
SN110(BM-NE-Servers<br>10.1.10.0/24)

SN12 --> SN110
end

subgraph BM-VNET-US-Operations
N2[BM-VNET-US-Operations<br>10.2.0.0/16<BR>WEST US 2]
SN21(BM-US-Gateway<br>10.2.1.0/24)
SN22(BM-US-AppGateway<br>10.2.2.0/24)
SN210(BM-US-Servers<br>10.2.10.0/24)

SN21 --> SN210
SN22 --> SN210
end

end
</div>


