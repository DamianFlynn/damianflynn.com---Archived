With all the hype and communications surrounding the upcoming *Microsoft Azure Stack* one would be forgiven to assume that the incumbent *Windows Azure Pack* which is currently the primary portal self service experience for the Microsoft Private cloud is potentially on the list for sunsetting. 

Originally released as an extension to System Center 2012 R2, the  Windows Azure Pack **will** remain in mainstream support until 2022.

# Support Requirements

However, to be considered in support the following points are very salient, and taking no action will actually render you in an unsupported configuration by no later than **June 2017!**

Windows Azure Pack has a direct dependency on a number of roles within the System Center suite, including but not limited to Service Provider Framework, Virtual Machine Manager, Service Management Automation and Operations Manager. 

The current Branch of System Center is about to be SC2016, which is planned to be in support until July 2022. The outgoing branch SC2012 R2 is due to exit support in June 2017, which based on the September 2016 GA release of the 2016 product branch provides just 9 months to upgrade your ecosystem.

# Windows Azure Pack 2012 or 2016?

Despite the branch change with the System Center for the 2012 R2 to 2016 product version, Windows Azure Pack will **not** be receiving a name change, but instead continue with the same code branch which at this time is at Update Release 10. 

Therefore your current investment in this software  layer, and knowledge related to how it functions will remain valid and maintainable. 

# Mixed Mode Operation

Windows Azure Pack via its Service Provider foundation layer enables up to 5 different instances of Virtual Machine Manager to be registered with the installation.

While the initial obvious choice for upgrade will be to deploy and register a new VMM 2016 instance with your current Service Provider Foundation, this mixed mode approach will not be supported.

# Reaffirmation of support

Let's recap:
* *Windows Azure Pack* **will** remain on current branch (UR10)
* *Mixed mode registration* with different branches of VMM **will not be supported**
* *Windows Azure Pack with SC2012 R2* will be supported until **June 2017**
* *Windows Azure Pack with SC2016* will be supported until **July 2022**


## Upgrading to 2016

The upgrade to the 2016 solution I expect is not going to be 100% smooth sailing. The objective will be acomplishable somewhat simple if you are not currently using the VMM support for Software Defined Networking, however if you have been living on the edge and implemented the Software Defined Networking options, with all the changes which have been implemented in the 2016 release, we are going to have an intresting treck ahead.

I will begin to address the process to upgrade your Windows Azure Pack ecosystem to its 2016 branch in an upcoming series. 