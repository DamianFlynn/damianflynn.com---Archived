---
author: Damian.Flynn
comments: true
date: 2011-08-15 14:35:00+00:00
layout: post
slug: orchestrator-c-and-runbooks
title: Orchestrator, C# and Runbooks
wordpress_id: 191
categories:
- Blog
tags:
- Automation
- SCORCH
- WS/SC
---

At this point of the game, we have a pretty good feel for using the Designer, and we also have been playing with the new Silverlight console to play around with the runbook’s, but now its time to get even more curious with the ODATA Service’s. If you have been watching the blogs and webcasts; some demo’s of using the Excel Pivot tables have been created to show off the power of this service, with very little effort needed to take advantage.

However, I have different ideas; and today I am going to try and share a proof on concept Console App in C# to integrate with the ODATA Service. __

_**Disclaimer: **Now, I need to be very clear here; I am not a developer, although I do enjoy pretending to be, therefore its very likely there are much smarter ways to achieve the goals, but if there is, I don't know them yet! – so please comment…_

## Visual Studio and Web Services

Great, let’s start off the session with a nice new Project; I am going to call this **SCOrchServices** for obvious reasons

[![image_thumb2](/assets/posts/2014/02/image_thumb2_thumb2.png)](/assets/posts/2014/02/image_thumb22.png)

Now, let’s not waste any time at all. We are going to use the power of to tool, and create a Class to help us bind and communicate with the ODATA interface on Orchestrator. So navigate over to your **Solution Explorer** and right click on [![image_thumb3](/assets/posts/2014/02/image_thumb3_thumb2.png)](/assets/posts/2014/02/image_thumb32.png) the Project Name to get the context menu. From there I need you to select the option **Add Service Reference… **

This will present us with the **Add Service Reference **Dialogue, where will will type in the address of our Orchestrator 2012 Web Service. Once we have done that all we need to do next is click on the **Go** button and wait a few moments for the magic to work.

**Update for RC and Newer** - the ODATA link is now at [http://servername:port/**Orchestrator2012**/Orchestrator.svc/](http://servername:port/Orchestrator2012/Orchestrator.svc/)

[![image_thumb4](/assets/posts/2014/02/image_thumb4_thumb1.png)](/assets/posts/2014/02/image_thumb41.png)

Once control is returned, we will now see in the Services pane the new context **OrchestratorContext** which you can expand to see all the goodies which are on offer.

Now, let’s wrap up our work here, and in the **Namespace** field we will name this new reference as **SCOrchestratorOData** which we will be calling on in a few moments.

Hit the **OK **button, and before you know it, your solution explorer will now have a new entry, with this new reference ready for us to start using.

## Helper Class

So, that was pretty easy, Now lets get back to do some real work, this time we are going to see if we can add a few lines of code with the objective of using this new web service reference to get a list of all the Run Books which are currently published on the Orchestrator server.

Rather then repeat code over many times, I am going to also create a helper class which I will simple call **SCOrchestrator.** To do this, once again on the project name right click and from the context menu we are going to select **Add > Class** and when the file dialogue appears we will just set the name of the file to be **SCOrchestrator.cs** to match our class name.

VS will then stub out the blank class for us, and we can start typing.
    
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    
    namespace SCOrchServices
    {
        class SCOrchestrator
        {
            private string serviceRoot;
            private SCOrchestratorOData.OrchestratorContext context;
    
            public string ServiceRoot
            {
                get { return serviceRoot; }
                set { serviceRoot = value; }
            }
    
            public SCOrchestratorOData.OrchestratorContext Context
            {
                get { return context; }
                set { context = value; }
            }
    
            public void Initialize(string serviceRoot)
            {
                // Constructor for the Class
                ServiceRoot = serviceRoot;
                context = new SCOrchestratorOData.OrchestratorContext(new Uri(serviceRoot));
    
                // Let's try and use the Default Credentials which we are using under this windows user account
                context.Credentials = System.Net.CredentialCache.DefaultCredentials;
    
                // Alternatively - you could pass in credentials of your choice
                //orchestrator.Credentials = new System.Net.NetworkCredential("scorchUser", "!Pass123", "domain");
            }
    
        }
    }




Ok, Fair enough, it does look a bit odd, so lets break it down so we can make some logic of what's going on here. I am starting off the class with 2 private variables, the first is a string to hold the name of the URL to our actual web service we plan to connect with. And yes we did provided that when we used the Add Service Reference earlier, but that was just to make the template class for us, we don't actually ever need to use that again if we so wish; but since my lab only has the one Orchestrator server, I am going to do exactly that, and use the same server URL in a few moments.




The second Variable I am creating is a little different, If you look closely you will see that we are creating a variable of base type **SCOrchestratorOData** which from memory you will recall is the namespace which we only just defined as we had the wizard add the Service Reference. The **Context** part of this is the Glue which will help us tie our application via the service reference back to the actual OData feed.




Finally, I actually make these two private variables public as is, with to public methods; if we need to tweak later, then this will keep things a bit cleaner.
    
        class SCOrchestrator
        {
            private string serviceRoot;
            private SCOrchestratorOData.OrchestratorContext context;
    
            public string ServiceRoot
            {
                get { return serviceRoot; }
                set { serviceRoot = value; }
            }
    
            public SCOrchestratorOData.OrchestratorContext Context
            {
                get { return context; }
                set { context = value; }
            }







Now this next method is much more interesting (I could have overloaded the constructor, but figured this might be easier to explain). The purpose here is to Initialize our connection to the Orchestrator Web service, which we do in two steps. First we will use the magic of the new Service Reference class **SCOrchestratorOData **to create a new connection context for us.




This takes in the serviceRoot, which I already explained is the URL to the ODATA Web Service; then once the method has make the link, we store that in the **context** which we will use for all further interaction with Orchestrator.




Now, the second step here is that Orchestrator needs us to identify ourselves. So, using **context** we can pass in the **Credentials** and in the active code, we will use our currently logged in credentials for the domain; but the sample code i have commented out, we can pass in any identification manually if needed 
    
            public void Initialize(string serviceRoot)
            {
                // Constructor for the Class
                ServiceRoot = serviceRoot;
                context = new SCOrchestratorOData.OrchestratorContext(new Uri(serviceRoot));
    
                // Let's try and use the Default Credentials which we are using under this windows user account
                context.Credentials = System.Net.CredentialCache.DefaultCredentials;
    
                // Alternatively - you could pass in credentials of your choice
                //orchestrator.Credentials = new System.Net.NetworkCredential("scorchUser", "!Pass123", "domain");
            }




## Main Program




Right, lets get this stuff working and, see how simple it really is to work with Orchestrator and Visual Studio.
    
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    
    namespace SCOrchServices
    {
        class Program
        {
            static void Main(string[] args)
            {
                SCOrchestrator scorch = new SCOrchestrator();
                scorch.Initialize("http://orchestrator:81/Orchestrator.svc");
    
                var runbooks = from runbook in scorch.Context.Runbooks
                               select runbook;
    
                foreach (var item in runbooks)
                {
                    Console.WriteLine("Name: " + item.Name + "  ID: " + item.Id);
                }
    
                Console.ReadKey();
            }
        }
    }




Again, most of the work was already done for us when we created the new project in Visual Studio.




This time the first two lines of code, we are just creating an instance of our helper class, and then Initializing the connection.




Once that is done, we will make a variable called **runbooks** where using a simple Linq query we will grab from the RunBooks Context (_scorch.Context.Runbooks_) all the available runbooks, and store the results in the **runbooks** variable.




[![image_thumb5](/assets/posts/2014/02/image_thumb5_thumb.png)](/assets/posts/2014/02/image_thumb51.png)




Finally, we just loop trough all the data which is now stored in the runbooks variable, and place them in a temporary variable called **item** which we can then use to expose the currently available information for this entry. As you can see from the screen shot Visual Studio is very helpful, thanks in full to the ODATA services, and will show in the intelligence all the different data types we can display in this context, so no more guessing 




## Testing 123…




So, what are you waiting for, run the program! Assuming you have no errors, and have authenticated correctly, then your console should now be presenting you with a list of runbooks published on the server.




[![image_thumb6](/assets/posts/2014/02/image_thumb6_thumb.png)](/assets/posts/2014/02/image_thumb6.png)




Easy, Yah!!!




Check back, we will start a Runbook next!
