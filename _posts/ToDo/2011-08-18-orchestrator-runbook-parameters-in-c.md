---
author: Damian.Flynn
comments: true
date: 2011-08-18 15:38:00+00:00
layout: post
slug: orchestrator-runbook-parameters-in-c
title: Orchestrator Runbook Parameters in C#
wordpress_id: 199
categories:
- Blog
tags:
- Automation
- SCORCH
- WS/SC
---

So you came back for more, welcome!

This time we are going to pick up directly from where we left off, and get back to adding in the code for injecting our parameters. Now, if you were paying attention to the last post, you would have already spotted that we have the place holders already created for where we will inject the parameters into the header, so all we need to do now is update our code to implement this.

Get that VS project opened up again, and we will jump directly into our helper code, the **SCOrchestrator **class.

## Back on the field…

Last time we created the main public function called **CreateJob** and it only accepted the Runbook ID, so this time we will extend that method so we can also pass in some parameters. Now, again there are many ways to do this, and I am sure everyone of them is going to be better than my attempt, but its a good start point to figure out how this works.

Rather then blow away the code from the last time, I am going to to declare a new version of the **CreateJob **method, which this time will also accept a list of parameters.

Line 1, presents us with the new method declaration, this time you can see I now also accept a sting list of parameters.

The rest of the method is a complete copy of the original version of the code, with the only difference appearing on line 5 where instead of passing in an empty string for the parameters, I am now calling a new method called **formatParameters** which we will look at next.

Everything else is completely the same.
    
            public HttpWebResponse CreateJob(Guid runbookId, List<String><string> parameters)
            {
    
                HttpWebRequest jobRequest = prepareHttpRequestHeader("/Jobs");
                string requestBody = prepareHttpJobRequest(runbookId.ToString(), formatParameters(parameters));
    
                UTF8Encoding encoding = new UTF8Encoding();
                byte[] requestQuery = encoding.GetBytes(requestBody);
    
                jobRequest.ContentLength = requestQuery.Length;
    
    
                Stream requestStream = jobRequest.GetRequestStream();
                requestStream.Write(requestQuery, 0, requestQuery.Length);
                requestStream.Close();
                jobRequest.Credentials = System.Net.CredentialCache.DefaultCredentials;
    
                return (HttpWebResponse)jobRequest.GetResponse();
            }
            




So, what is this new **formatParamates** method we are referencing? well its exactly what it sounds like. Remember in the last post we had two methods which were designed to format the main HTTP Request, well this is very similar. This method takes in the list of parameters and formats them into the XML String format which is needed to correctly pass the parameters on to the web service.




Like all XML strings, there is a strict format on how this should be done, so to help us understand lets take a close look at the request format.




<Data>   
  
<Parameter>




<ID>{00000001-0000-0000-0000-000000020000}</ID>




<Value>The First Value</Value>




</Parameter>




<Parameter>




<ID>{00000002-0000-0000-0000-000000020000}</ID>




<Value>The Second Value</Value>




</Parameter>




</Data>




From this we can see, that the complete request is wrapped in a <Data> </Data> element, with a new <Parameter> </Parameter> element for each value we pass in.




Also from this we can see that the <ID> </ID> elements are in a GUI format, but run in a sequential manner.




## formatParamaters




So, how do we code this one, actually that's pretty simple sting manipulation and a loop; lets give it a go
    
     
            public string formatParameters(List<string> paramaters)
            {
                string request;
                int count = 0;
                
                string xmlParamaterHeader = "<Data>";
                string xmlParamaterFooter = "</Parameter></Data>";
                string xmlParamaterSegment1 = "<Parameter><ID>{0000000";
                string xmlParamaterSegment2 = "-0000-0000-0000-0000000";
                string xmlParamaterSegment3 = "0000}</ID><Value>";
                string xmlParamaterSegment4 = "</Value></Parameter>";
    
                // Now we can start to build the string, first adding the header
                request = xmlParamaterHeader;
    
                // Next we will loop for each parameter we will be encoding
                foreach (string item in paramaters)
                {
                    count = count + 1;
                    request = request + xmlParamaterSegment1 + count + xmlParamaterSegment2 + count + xmlParamaterSegment3 + item + xmlParamaterSegment4;
                }
    
                // Finally adding the closing of the elements and returning the new string
                request = request + xmlParamaterFooter;
                return request;
            }    




Now, I am pretty sure that this one is self explanatory, so lets move on.




## Main Program




Right, we are done in the helper again! This time I am going to modify our main program to pass in 1 parameter to the **ToggleSpooler** runbook we looked at in the previous exercise. This new parameter will be the Computer Name of the system we will have the Runbook execute the Spooler Service toggle against. So before we go any further, make sure you edit the runbook to accept this new parameter.




Ready? Good. Now lets take a peek at the code we need to change in our program to make this work.
    
     
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Net;
    
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
    
                List<string> myParameters = new List<String><string> { };
                myParameters.Add("computer1.test.domain");
    
                foreach (var item in runbooks)
                {
                    Console.WriteLine("Name: " + item.Name + "  ID: " + item.Id);
    
                    if (item.Name == "ToggleSpooler")
                    {
                        // Now we found the Service, lets kick off the job :)
                        Console.WriteLine("> Start the Runbook Job");
    
                        HttpWebResponse response = scorch.CreateJob(new Guid(item.Id.ToString()), myParameters);
                        if (response.StatusCode == HttpStatusCode.Created)
                        {
                            // Request was successful
                            Console.WriteLine("Create a Link > " + response.Headers[7]);
                            for (int i = 0; i < response.Headers.Count; ++i)
                                Console.WriteLine("{0} - {1}", response.Headers.Keys[i], response.Headers[i]);
                        }
                    }
                }
    
    
                Console.ReadKey();
            }
        }
    }




Now, if you have sharp eyes, you will see that there is just 3 new lines of code here.




Lines 19 and 20 declare a new list of strings, which I just add one entry to, the name of the new computer I wish the runbook to target as part of its new input parameters. You can see how simple is is to add more parameters, but simple adding more lines like the content of Line 20.




Then on line 31, we call our **CreateJob** function, however now i am also passing in the string list we just added on line 19 called **myParameter **and this is all we need to test the code again.




So, go play, try it out, see what you learn and come back and comment.




Till next time.
