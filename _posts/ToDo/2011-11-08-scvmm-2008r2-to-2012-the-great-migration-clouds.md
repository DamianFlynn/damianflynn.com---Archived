---
author: Damian.Flynn
comments: true
date: 2011-11-08 20:37:00+00:00
layout: post
slug: scvmm-2008r2-to-2012-the-great-migration-clouds
title: 'SCVMM 2008R2 to 2012-The Great Migration: Clouds'
wordpress_id: 239
categories:
- Blog
tags:
- Cloud
- SCVMM
- WS/SC
---

Its been a little while since we last looked at the process of migrating from SCVMM 2008R2 to the new 2012 environment. The last visit we introduced a simple function to determine which of our 2008R2 Clouds (User Roles) are still active, and thus we need to migrate over to 2012.

## SCVMM 2008 R2

In this post we will use this function, so be sure to have it loaded into your PowerShell session; the first thing we will do is create a sorted unique list of the clouds we will process.
    
    # Using the function we introduced
    
    Get-SCVMRolesInUse | select name | Export-Csv RolesToBeMigrated.csv
    $RolesToExport = Import-Csv .RolesToBeMigrated.csv
    $RolestoExport = $RolesToExport | sort name -Unique




That was pretty simple, now our variable $RolestoExport has a list of all the User Roles we are going to migrate.




We will loop trough the list of roles, grab the information which is important to us, and store this detail in a CSV file which we will use as the import data on to 2012 server.
    
    # now we have a unique list of User Roles (Clouds) which we will be exporting out, as these will need to be imported into SCVMM 2012
    
    $ExportedRoles = @()
    
    foreach ($role in $RolesToExport) {
       $RoleInfo = Get-VMMUserRole -Name $role.name
       
       if ($RoleInfo.Profile -like "SelfServiceUser") {
          $ExportedRoles += $RoleInfo | select name, Description, QuotaPoint, @{Name='Member0';Expression={$_.Members[0].name}}, @{Name='Member1';Expression={$_.Members[1].name}},  @{Name='Member2';Expression={$_.Members[2].name}}, @{Name='Member3';Expression={$_.Members[3].name}}, @{Name='Member4';Expression={$_.Members[4].name}}, @{Name='Member5';Expression={$_.Members[5].name}}, @{Name='Member6';Expression={$_.Members[6].name}}, @{Name='Member7';Expression={$_.Members[7].name}}, @{Name='Member8';Expression={$_.Members[8].name}}, @{Name='Member9';Expression={$_.Members[9].name}}, @{Name='Template0';Expression={$_.Template[0].name}}, @{Name='Template1';Expression={$_.Template[1].name}}, @{Name='Template2';Expression={$_.Template[2].name}}, @{Name='Template3';Expression={$_.Template[3].name}}, @{Name='Template4';Expression={$_.Template[4].name}}, @{Name='Template5';Expression={$_.Template[5].name}}, @{Name='Template6';Expression={$_.Template[6].name}}, @{Name='Template7';Expression={$_.Template[7].name}}, @{Name='Template8';Expression={$_.Template[8].name}}, @{Name='Template9';Expression={$_.Template[9].name}}, @{Name='Action0';Expression={$_.VMPermission[0]}}, @{Name='Action1';Expression={$_.VMPermission[1]}}, @{Name='Action2';Expression={$_.VMPermission[2]}}, @{Name='Action3';Expression={$_.VMPermission[3]}}, @{Name='Action4';Expression={$_.VMPermission[4]}}, @{Name='Action5';Expression={$_.VMPermission[5]}}, @{Name='Action6';Expression={$_.VMPermission[6]}}, @{Name='Action7';Expression={$_.VMPermission[7]}}, @{Name='Action8';Expression={$_.VMPermission[8]}}, @{Name='Action9';Expression={$_.VMPermission[09]}}
       }
    }
    
    $ExportedRoles | Export-Csv .CloudsToMigrate.csv




## SCVMM 2012




Now, on our SCVMM 2012 server, we will launch the PowerShell Console for VMM, and copy over the export file we created on the SCVMM 2008R2 server. In the case of the example I called this CloudsToMigrate.csv




There are a lot of custom options we can define in SCVMM 2012, however the objective of this exercise is to create Clouds and User roles which match what we had on the source server. To make this easy I have made a few assumptions, and decided to have some templates defined as required for every single cloud. Another point here to consider is that for every user role in SCVMM 2008 we will create a Single Cloud and an Associated User Role in SCVMM 2012. This one to one relationship might not be best approach, but we can always look at this again once we have the migration complete.
    
    # Some Static Stuff which does not change between each new cloud/role
    
    $addCapabilityProfiles = @()
    $addCapabilityProfiles += Get-SCCapabilityProfile -Name "Hyper-V"
    
    $hostGroups = @()
    $hostGroups += Get-SCVMHostGroup  -Name "SelfHosting (BIL)"
    
    $RoleParent = "CorpIT LAB Private Cloud Administrator"
    
    # First import the metadata in question from the exported xml file
    $ListOfClouds = Import-Csv .CloudsToMigrate.csv
    
    foreach ($NewCloud in $ListOfClouds)
    {
       # Address null values
       if ($NewCloud.QuotaPoint -eq $null) { $Quota = 1 } else { $Quota = $NewCloud.QuotaPoint }
       if ($NewCloud.Description -eq $null) { $Description = "" } else { $Description = $NewCloud.Description}
       
       # We need to create a new GUID for each Job we start, and set the Default Capability Profiles
       $JobID = [System.Guid]::NewGuid().toString()
       Set-SCCloud -JobGroup $JobID -RunAsynchronously -AddCapabilityProfile $addCapabilityProfiles
       
       # Set the Quota, We will take the Old Quota System and use it as the Number Of VMs allowed in the Cloud
       # You Might want to change this to match your logic
       Set-SCCloudCapacity -JobGroup $JobID -UseCustomQuotaCountMaximum $true -UseMemoryMBMaximum $true -UseCPUCountMaximum $true -UseStorageGBMaximum $true -UseVMCountMaximum $false -VMCount $Quota
       
       # Now, Create the Cloud, with the Name and Description we exported from SCVMM 2008R2
       New-SCCloud -JobGroup $JobID -VMHostGroup $hostGroups -Name $NewCloud.Name -Description $NewCloud.Description -RunAsynchronously
       
    
       # Good Start, Next we need to create the user Role in 2012 and grant it access to the cloud we just created
       
       # We start by creating the User Role, this will have the same name and description as the cloud
       # It will be of self service, and I am setting this to be under the scope of my delegated administrator
       $ParentUserRoleID = Get-SCUserRole -Name $RoleParent
       New-SCUserRole -Name $NewCloud.Name -Description $NewCloud.Description -UserRoleProfile "SelfServiceUser" -ParentUserRole $ParentUserRoleID
    
       # Next, there are 2 templates which I need to be assigned to every cloud we create, so i will assign these next
       $libResource = Get-SCVMTemplate -ID "1cab138b-1d89-425c-9bd9-88709d5f2251"
       Grant-SCResource -Resource $libResource -UserRoleName $NewCloud.Name
    
       $libResource = Get-SCVMTemplate -ID "d8c454be-df6f-48c6-aa3b-6f471bf121f4"
       Grant-SCResource -Resource $libResource -UserRoleName $NewCloud.Name
    
       # Time now to add the Members to this role,
       $UserRoleID = Get-SCUserRole -Name $NewCloud.Name
       
       $MemberList = $null
       $MemberList = @()
       if ($NewCloud.Member0 -ne "") { $MemberList += $NewCloud.Member0 }
       if ($NewCloud.Member1 -ne "") { $MemberList += $NewCloud.Member1 }
       if ($NewCloud.Member2 -ne "") { $MemberList += $NewCloud.Member2 }
       if ($NewCloud.Member3 -ne "") { $MemberList += $NewCloud.Member3 }
       if ($NewCloud.Member4 -ne "") { $MemberList += $NewCloud.Member4 }
       if ($NewCloud.Member5 -ne "") { $MemberList += $NewCloud.Member5 }
       if ($NewCloud.Member6 -ne "") { $MemberList += $NewCloud.Member6 }
       if ($NewCloud.Member7 -ne "") { $MemberList += $NewCloud.Member7 }
       if ($NewCloud.Member8 -ne "") { $MemberList += $NewCloud.Member8 }
       if ($NewCloud.Member9 -ne "") { $MemberList += $NewCloud.Member9 }
       
       Set-SCUserRole -UserRole $UserRoleID -AddMember $MemberList
       
       #  and also the permissions which will be allowed for the cloud.
       $ActionList = $null
       $ActionList = @()
       $ActionList += "CanReceive"
       $ActionList += "CanShare"
       if ($NewCloud.Action0 -ne "") { $ActionList += $NewCloud.Action0 }
       if ($NewCloud.Action1 -ne "") { $ActionList += $NewCloud.Action1 }
       if ($NewCloud.Action2 -ne "") { $ActionList += $NewCloud.Action2 }
       if ($NewCloud.Action3 -ne "") { $ActionList += $NewCloud.Action3 }
       if ($NewCloud.Action4 -ne "") { $ActionList += $NewCloud.Action4 }
       if ($NewCloud.Action5 -ne "") { $ActionList += $NewCloud.Action5 }
       if ($NewCloud.Action6 -ne "") { $ActionList += $NewCloud.Action6 }
       if ($NewCloud.Action7 -ne "") { $ActionList += $NewCloud.Action7 }
       if ($NewCloud.Action8 -ne "") { $ActionList += $NewCloud.Action8 }
       if ($NewCloud.Action9 -ne "") { $ActionList += $NewCloud.Action9 }
       
       Set-SCUserRole -UserRole $UserRoleID -Permission $ActionList -ShowPROTips $false
    
    
       # Almost done, Now we need to first Give the Delegated Administrator Scope for the Cloud
       # and then we will be able to assign the cloud to the new user role we just created
       $ParentUserRoleID = Get-SCUserRole -Name $RoleParent
    
       $CloudName = Get-SCCloud -name $NewCloud.Name
       $scopeToAdd = @()
       $scopeToAdd += $CloudName
       Set-SCUserRole -UserRole $ParentUserRoleID -AddScope $scopeToAdd 
       Set-SCUserRole -UserRole $UserRoleID -AddScope $scopeToAdd 
    
    }
    




This will take a little time to run, depending on how many new Clouds we need to create. Once it is complete, you will see that we are not yet done.




Next focus will be Libraries and templates, then finally we will address the Virtual Machines.




For now, give it a shot and see if this will help you customise your own migration.
