---
author: Damian Flynn
comments: true
date: 2015-11-07 21:02:00
layout: post
title: "GIT: Updating a Forked Repository"
categories:
categories:
- Developer
- IT Pro/DevOps
tags:
- Community
- PowerShell
- OpenSource
- Git / GitHub
---


While recently working with a community project which is hosted using GIT, due to high frequency of activity in the main repository, I quickly found that I needed to re-sync my fork of the project with the main upstream copy. 

Additionally, this particular project happened to be structured using submodule's enabling the project to be segregated into a number of independently managed repositories. In this post, I will cover first how to clone a local copy of your projects fork, including its submodule's, fork and checkout a submodule including updating your references to use your fork of the submodule so you can manage it also as part of the project, then finally refresh your copy of the project from the upstream master repository to ensure your fork is updated to the current version.

# Forking
The concept of forking is to create a linked copy of a repository for your own project, This parent and child relationship of repositories is more commonly refered to as the upstream (original or master) and the fork (our GIT copy). Our forked copy is where we will carry out all our work, checking in changes and creating tags and versions.

To create the Fork, we will normally use a service like github.com where we have an account, We would normally locate the project we are interested in contributing to and using the User Interface, click on the **Fork** button, which will result in the interface updating, presenting a copy of the project in our account, with a link to the original project. If this project happens to be using submodule's these will not be at this point forked to our repository, instead these will be referenced to their current repository.

To pull a copy of the project locally from your GIT account including any potential submodule's, as well as adding a reference to the upstream master we can use the following commands

```powershell
git clone https://github.com/<myaccount>/<repositoryName>.git --recursive
cd <repositoryName>
# add the upstream repo URL
git remote add upstream https://github.com/<upstream>/<repositoryName>.git
```

## Forking Submodule's
In the event that the project does use submodule's, and you happen to wish to customise the submodule you will then also want to fork a copy of one or more of the submodule to your GIT account, repeated depending on which and how many of the submodule's you wish to edit. The procedure is exactly the same as we just executed with the initial main project. Once you have a fork of the submodule you will want to update your local copy of the submodule to point at your GIT fork of the project otherwise you will not be able to push changes back to your GIT account.

The following commands will allow us change the references, first we can change to the submodule, and check the current upstream repository being used.

```powershell
cd <repositoryName>\<subModule>
git remote
```

Now, remove the current upsteam, add our copy as **Origin** and the upstream master as **Upstream**

```powershell
git remote remove
git remote add origin https://github.com/<myAccount>/<repositoryName>.git
git remote add upstream https://github.com/<upstream>/<repositoryName>.git
```

The benefits are that you can modify the fork to your needs and even open pull requests to the maintainer. If the maintainer updates his code you can then merge/update everything you want into your fork and keep your patches that are not approved in upstream.

From time to time you then need to update the submodule in your projects because the upstream maintainer has added a feature or version you want to have. This cannot be done by a simple “git pull” because git submodules are only pointers to a specific commit revision in another repo and therefore have a detached HEAD. This is necessary because you always want to have a specific revision when cloning your main repo. The revision the submodule repo had when you added it. Not any future commits which you might not know of.

So first of all you need to update your fork to get all upstream changes. This can be skipped if your submodule points directly to the 3rd-party repo !

 ```powershell
git fetch upstream
git merge upstream/master
```

Now, you can update your copy of the repository, or if you have already applied updates to the repository, we are going to merge in these changes to our fork

```powershell
git add -A :/
git commit -a -m "Commit message."
git push origin master
git push --tags
```

At this point, our fork should be up-to-date with the original code.

## Updating remote Submodule's

In many cases we will also have submodules in our repository which may also need to be updated to the current revision or tag.

If your repository has submodules then the following process will need to be repeated in each of the submodules you may have forked.

```powershell
cd /<repositoryName>/<pathToSubmodule>
git checkout master
git pull origin master
git pull --tags
# go to your desired tag or revision ID
git checkout 2.1.1
cd /path/to/main/repo
# now save the new submodule pointer
git add /path/to/submodule/
git commit -m "updated submodule to Tag 2.1.1"
git push
```
