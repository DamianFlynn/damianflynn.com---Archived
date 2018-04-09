Decision Time


# Compute Comparison

The following respresents a list of considerations we will need to be aware of as we being the business and Technology requirements of our next deployment of the cloud fabric.

Focus | Azure Stack(TP1) | Azure Pack & VMM 2012 | Azure Pack and VMM 2016
---|---|---|---
Management Technology | Compute Resource Provider | Service Provider Framework & Virtual Machine Manager 2012 | Service Provider Framework & Virtual Machine Manager 2016
Hypervisor Support | Hyper-V 2016 | Hyper-V 2012/2016, Xen & VMWare | Hyper-V & VMWare
Virtual Machine Nameing Policy | NO (Resource Provider Policy not implemented in TP1) | Yes (Virtual Machine Name Syncronisation *[WAP UR4]*) | Yes (Virtual Machine Name Syncronisation *[WAP UR4]*)
Memory Type | Static | Static & Dynamic | Static & Dynamic
Memory Hot Resize | Not Applicable (Static Only) | No | Yea
Virtual Machine Disk Technologies | VHD | VHD, VHDX & Shared VHDX | VHD, VHDX & Shared VHDX
VM Support for Multiple Network Interfaces | Yes | Yes | Yes
Support for Virtual Networking Hot Add & Remove | No | No | Yes
Support for Attaching ISO to Virtual Machine | Yes | Yes | Yes
Support for Per VM Disaster Recovery | No | Yes (Utilizing Azure Site Recover Integration) | Yes (Utilizing Azure Site Recover Integration)
Cloud Framework High Availability | Yes (Winows Service Fabric) | No (Windows Failover Cluster) | No (Windows Failover Cluster)
Integrated In Portal Montoring of the VM | Yes (Rich guest metrics) | Yes | Yes
VM Checkpoint Support | No | Yes *[WAP UR7 for Single Checkpoint / WAP UR8 for Multiple Checkpoints]*  | Yes *[WAP UR7 for Single Checkpoint / WAP UR8 for Multiple Checkpoints]* 
Hyper-V Virtual Machine Generation Technologies | Generation 1 (BIOS) | Generation 1 (BIOS) & Generation 2 (UEFI) | Generation 1 (BIOS) & Generation 2 (UEFI)
Access to the VM Console | Diagnostic Screen Shots | Console Access via RD Gateway Implemention | Console Access via RD Gateway Implemention
Virtual Machine Gallery Support | Image Repository | WAP Gallery & Virtual Machine Manager Templates | WAP Gallery & Virtual Machine Manager Templates 

# Network Comparison

The next area we will focus on is the network layer, a number of major changes have occured in the underlaying operating system which will in this case bubble up the support offered to the cloulds as a result of these fabric changes.

Focus | Azure Stack(TP1) | Azure Pack & VMM 2012 | Azure Pack and VMM 2016
---|---|---|---
Network Isolation Technologies Supported | Software Defined Networking | Software Defined Networking, VLAN and PVLAN |  Software Defined Networking, VLAN and PVLAN
Gateway Technologies Available to Software Defined Networks | NAT & Site 2 Site | NAT, Site 2 Site & Routed | NAT & Site 2 Site
Gateway Protocol Support | GRE, IPSec, SSTP & BGP | GRE, IPSec | GRE, IPSec, SSTP & BGP 
3rd Party Virtual Switch Extensions | No (Network Virtual Functions Implemention) | Yes (eg. Cisco, NFlow, 5Nine, etc) | No (Network Virtual Functions Implemention)
Software Defined Protocol Support | VXLAN (Preferred) & NVGRE | NVGRE | VXLAN (Preferred) & NVGRE
SDN Mananagment Function | Distributed Network Controllers | Virtual Machine Manager | Distributed Network Controllers
Support for Per VM Multiple NAT Addresses | Yes | Yes *[WAP UR4]* | Yes *[WAP UR4]*
Support for Virtual Network Functions | Yes | No | Yes

# Security Comparison

Security appears in a number of locations, both as part of the cloud managment experience and also as a fucntion of protecting the virtual machine. As with the networking fucntions the offereings here are greatly influenced by the hosting opeating system affect on the fabric.

Focus | Azure Stack(TP1) | Azure Pack & VMM 2012 | Azure Pack and VMM 2016
---|---|---|---
Portal Experience Authentiation Provider | AzureAD | .NET WinAuth & ADFS JWT Claims | .NET WinAuth & ADFS JWT Claims
Multifactor Authentiation Provider Support | AzureAD Providers | ADFS Mode with Mutlifactor Extensions | ADFS Mode with Mutlifactor Extensions
In Portal Role Based Access Control | Yes (Resource Manager Granularity) | No (Limited Support via 3rd Party Extensions) |  No (Limited Support via 3rd Party Extensions)
Virtual Machine Secure Boot Support | No | No | Yes
Shielded Virtual Machine technology support | No | No | Yes

# Storage Comparison

Storage plays a critical role both in the context of the fabric and also as a consumer of the cloud. 

Focus | Azure Stack(TP1) | Azure Pack & VMM 2012 | Azure Pack and VMM 2016
---|---|---|---
Per Tenant Storage Access | Blob's | Not Integrated | No Integrated
Per Tenand Storage Quotas and Resources | Yes | Not Applicable | Not Applicable
Fabric Managment of Storage | Yes (Storage Resource Provider) | Yes (VMM Storage Management) | Yes (VMM Storage Management) 

  