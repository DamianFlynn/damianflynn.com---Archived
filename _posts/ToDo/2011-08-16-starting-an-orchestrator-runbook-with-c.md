---
author: Damian.Flynn
comments: true
date: 2011-08-16 15:34:00+00:00
layout: post
slug: starting-an-orchestrator-runbook-with-c
title: Starting an Orchestrator Runbook with C#
wordpress_id: 197
categories:
- Blog
tags:
- Automation
- SCORCH
- WS/SC
---

Ok, the last trip was fun, we quickly learned how to use VS to query the ODATA interface, by building a next Service Reference class for us. Then we took it a step further and added to this a class of our own, to help us reduce any code repetition, and then finally used these in our program to display back a list of Runbooks on the server.

This time, we will actually start one of these Runbooks running, and add a little code to both our helper and our program to make this work. So, without further a do, open up the project from before, and we can get started again.

## The Playground…

We are going to do the bulk of the work in the helper class today, because we are going to start building out some methods which we do not want to expose to the main program, and this is code we are going to reuse again as we add even more code.

This process is more complex than what we have seen so far, and that might be due to my lack of knowledge _[If so please comment!], _However, it still works very nicely and once we step trough this, you will see it is not actually very confusing.

So the context of what we need to do to start a Runbook is actually pretty simple

  * First, we will Construct a HTTP POST request to the ‘Jobs’ Entity and specify all the mandatory Properties  
  * These Mandatory Properties are:  
    * RunbookId (Which we already figured out for to print the last time – See Smart or What)  
    * Parameters (if the Runbook has parameters defined) 
  * Optional Properties we can set include  
    * RunbookServers (a semi-colon list of Runbook Server names) 

To keep this simple, I only have the one Runbook server, so we will ignore the optional parameters for now, and to make things as uncomplicated as possible, we will also focus first on starting a runbook which has no parameter.

So, for this demo, In the Runbook Designer, I created a very simple book, which has no input parameters, and called it **ToggleSpooler.** As you can see this is a very simple flow which toggles the running state of the spooler service on the host computer; just perfect for our needs.

[![image_thumb7](/assets/posts/2014/02/image_thumb7_thumb.png)](/assets/posts/2014/02/image_thumb7.png)

## SCOrchestrator Helper Class

Code time. I have created 3 methods for our helper class today. We will start by taking a look at each of these in turn, so we can try understanding what it is we are implementing.

This first method is called **prepareHttpRequestHeader** and accepts a sting to identify the **requrestType** which we are building the header for. From the name of the function alone we should be able to determine that what we are really doing here is manually constructing a HTTP Request message to send a little later to the web service. 

The request type information we are passing in here is actually just the part of the URL on the web service which defines what we are hoping to do. For the propose of running a new Runbook, this would be the Jobs URI, so we can assume the value passing into **requestType **will be **“/Jobs”**.

The first line of the method then creates the **strQuery** variable from the **serviceRoot** (remember that is the URL to the web service) and appends the **requestType** to the path, resulting in an example value of **http://orchestrator:81/Orchestrator.svc/Jobs** which if you are really curious you can try and open in your web browser.

The rest of the function just defines that the header, telling the web service we want to communicate in ATOM and XML, and that this is a HTTP POST Request.
    
            private HttpWebRequest prepareHttpRequestHeader(string requestType)
            {
                string strQuery = serviceRoot + requestType;
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(strQuery);
    
                request.Method = "POST";
                request.UserAgent = "Microsoft ADO.NET Data Services";
                request.Headers.Add("DataServiceVersion", "1.0;NetFx");
                request.Headers.Add("MaxDataServiceVersion", "2.0;NetFx");
                request.Accept = "application/atom+xml,application/xml";
                request.Headers.Add("Accept-Charset", "UTF-8");
                request.ContentType = "application/atom+xml";
    
                return request;
            }




The second method is even simpler, this time we will construct part of the main query, that we will place in the request. As you can see the request body is just created from an XML request, along with the all important **runbookId** which we will be starting, and if we have any **requestParamaters** we will inject them here also.




The formatted XML query is then simply returned back to us for use in the main method we will look at next.
    
            private string prepareHttpJobRequest(string runbookId, string requestParamaters)
            {
                string requestBody =
                    "<?xml version="1.0" encoding="utf-8" standalone="yes"?><?xml version="1.0" encoding="utf-8" standalone="yes"?>n" +
                    "<entry xmlns:d="<a href="http://schemas.microsoft.com/ado/2007/08/dataservices"">http://schemas.microsoft.com/ado/2007/08/dataservices"</a> xmlns:m="<a href="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"">http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"</a> xmlns="<a href="http://www.w3.org/2005/Atom"">http://www.w3.org/2005/Atom"</a>><?XML:NAMESPACE PREFIX = [default] "http://www.w3.org/2005/Atom" NS = ""http://www.w3.org/2005/Atom"" /><?XML:NAMESPACE PREFIX = [default] "http://www.w3.org/2005/Atom" NS = ""http://www.w3.org/2005/Atom"" /><?XML:NAMESPACE PREFIX = [default] "http://www.w3.org/2005/Atom" NS = ""http://www.w3.org/2005/Atom"" /><?XML:NAMESPACE PREFIX = [default] "http://www.w3.org/2005/Atom" NS = ""http://www.w3.org/2005/Atom"" /><entry xmlns:m=""http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"" xmlns:d=""http://schemas.microsoft.com/ado/2007/08/dataservices"" xmlns=""http://www.w3.org/2005/Atom"">n" +
                    "  <content type="application/xml"><content type=""application/xml"">n" +
                    "    <m:properties><m:properties>n" +
                    "      <d:runbookid type=""Edm.Guid""><d:RunbookId type="Edm.Guid">" + runbookId + "</d:RunbookId></d:runbookid>n" +
                    requestParamaters +
                    "    </m:properties></m:properties>n" +
                    "  </content></content>n" +
                    "</entry></entry>";
    
                return requestBody;
            }




Great, over half way there, and we are still not lost, cool. __




## Creating the Job




Now, for the fun part, we will now introduce the main method; unlike the pervious two which were declared as private, this one is going to be public, as we will be using this one from our program to start the new jobs.




The function declaration only needs a single paramater, that is the runbookId, which we already figured out how to get in the previous exercise.
    
            public HttpWebResponse CreateJob(Guid runbookId)
            {
    
                HttpWebRequest jobRequest = prepareHttpRequestHeader("/Jobs");
                string requestBody = prepareHttpJobRequest(runbookId.ToString(), "");
    
                UTF8Encoding encoding = new UTF8Encoding();
                byte[] requestQuery = encoding.GetBytes(requestBody);
    
                jobRequest.ContentLength = requestQuery.Length;
    
    
                Stream requestStream = jobRequest.GetRequestStream();
                requestStream.Write(requestQuery, 0, requestQuery.Length);
                requestStream.Close();
                jobRequest.Credentials = System.Net.CredentialCache.DefaultCredentials;
    
                return (HttpWebResponse)jobRequest.GetResponse();
            }




So, first things first, we call the **prepareHttpRequestHeader** method, requesting that this be defined for the /**Jobs** URI; placing the result in a variable called **jobRequest** which we will use in a few moments.




We then pass on the Runbook ID, and no paramaters to the second method we described, to create the XML request, and store its result in the variable **requestBody**.




Now, the following 3 lines simply convert out **requestBody** into UTF8 Encoding format, and count the number of characters (Bytes) in the request body. We need this count to tell the **jobRequest** how much information we will be sending on to the Web Service.







Cool, now we have done all the hard work, its time now to open up the stream to the web service, send the request query and then attach on our credentials. This is exactly what we are doing in the following 4 lines of code.




The very last thing we do then is wait for the Web Service to respond back to us with the result of our query, which we then in turn return as the result of the method to Create and new Job!
    
                Stream requestStream = jobRequest.GetRequestStream();
                requestStream.Write(requestQuery, 0, requestQuery.Length);
                requestStream.Close();
                jobRequest.Credentials = System.Net.CredentialCache.DefaultCredentials;
    
                return (HttpWebResponse)jobRequest.GetResponse();
            




And that is it; Not so complex after all when we spend a little time understanding what it is we are trying to accomplish.




## Main Program




Now, time for the fun bit, we are going to head back to our main program again, and this time we will add a few more lines of code here. The plan is going to be simple, As we loop trough the list of all runbooks on the Web Service we will check each one to see if the name matches the runbook I created at the very start, remember feather head, it was called **ToggleSpooler**.




Then when we hit a match, we will have our program call the new helper function in our **SCOrchestrator **class to create a job based on the ID of this runbook.
    
                foreach (var item in runbooks)
                {
                    Console.WriteLine("Name: " + item.Name + "  ID: " + item.Id);
    
                    if (item.Name == "ToggleSpooler")
                    {
                        // Now we found the Service, lets kick off the job :)
                        Console.WriteLine("> Start the Runbook Job");
    
                        HttpWebResponse response = scorch.CreateJob(new Guid(item.Id.ToString()));
                        if (response.StatusCode == HttpStatusCode.Created)
                        {
                            // Request was successful
                            Console.WriteLine("Create a Link > " + response.Headers[7]);
                            for (int i = 0; i < response.Headers.Count; ++i)
                                Console.WriteLine("{0} - {1}", response.Headers.Keys[i], response.Headers[i]);
                        }
                    }
                }




So, final time today; using the previous loop on line 3 we simply printed the name of the Runbook and its Runbook ID. Then on line 5 we added the new code, where we do a very simple IF Check to see if the name of the runbook matches the name of my Demo Sample.




If we have a match on line 8 we print to the console that we found the runbook and we are going to start the Job.




Line 9 has the honour of calling our new **CreateJob** method, and passes in the RunbookID in string format, and then puts the results of the request in the **response** variable.




Line 10 checks if the response was good, and tells us if the Job was created. If that is the case, we then print back to the screen all the details we got back about the job instance which was created, because we might be curious to monitor the job later on….




## What do we look like???




When we run the Runbook this time, we can see that we have a match and the new job is started up for us.




[![image_thumb8](/assets/posts/2014/02/image_thumb8_thumb.png)](/assets/posts/2014/02/image_thumb8.png)




Having Fun yet??!!!
