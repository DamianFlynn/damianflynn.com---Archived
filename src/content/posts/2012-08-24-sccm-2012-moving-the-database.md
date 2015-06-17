---
author: Damian.Flynn
comments: true
publishDate: 2012-08-24 12:44:00+00:00
template: post.hbt
slug: sccm-2012-moving-the-database
title: SCCM 2012 Moving the Database
wordpress_id: 553
categories:
- Blog
tags:
- SCCM
- SQL
- WS/SC
---

Ready to move that database to my new SQL instance which I have installed on my Site Server, I start off the exercise

  1. SCCM Server:  


    1. On the SCCM server I proceed with stopping the SCCM services. I am doing this just to try and ensure that the data will be as close to unchanged as possible during the exercise.  

  2. Remote SQL:   


    1. Next, on the SQL server instance currently hosting the active database, I proceed to use the SQL Server Management Studio to back up my Database to a File 
    2. [![082212_1444_SCCM2012Mov1](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov1_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov1.png)  
    3. This process will take some time depending on the database size, and disk speeds, etc.  

  3. SCCM Server:

    1. Now, on my new SQL server _(which again I already installed on my SCCM Site Server)_, I will copy over the backup I just created from the shared SQL Server, to the Backup folder on my new SQL server, so that I can be ready to import this blob. 
    2. Launch the SQL Server Management Server, and connect to our new instance. We should see no user databases as this is all new on my setup.  


      1. Right click on the Databases node and select **Restore Database…**
      2. The Restore database page appears  


        1. _Destination for restore:_ In the To Database enter the name of the new Database we are restoring – for example SCCM-PRI 
        2. _Source for restore:_ In the from Device option, select Browse – you can then click Add and browse to our backup file 
        3. The new backup is now offered in the list to choose from, select the most recent if more than one is offered 
        4. [![082212_1444_SCCM2012Mov2](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov2_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov2.png)  
        5. Now, start the restore by clicking on **OK**, which will take a little time to complete  

    3. SCCM Change Time – Open the Add/Remove programs control panel on the SCCM Server. In the list then locate the System Centre Configuration Manager entry for the role installed and select the option to Change/Update the installation the familiar setup wizard will launch.

      1. In the wizard we select the option **Perform the site maintenance**
      2. [![082212_1444_SCCM2012Mov3](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov3_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov3.png)  
      3. On the **Site Maintenance** page select **Modify SQL Server Configuration**
      4. [![082212_1444_SCCM2012Mov4](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov4_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov4.png)  
      5. On the **Database Information** Page, we now provide the name of the **SQL Server, Instance** and new **Database** we are pointing the site to 
      6. [![082212_1444_SCCM2012Mov5](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov5_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov5.png)
  4. While the process is running, we will monitor the progress by running CMTrace.exe on two of the log files
  * C:ConfigMgrSetup.log 
  * C:Program FilesMicrosoft Configuration Manager Logssmsexec.log
  1. Now, just wait….

[![082212_1444_SCCM2012Mov6](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov6_thumb.png)](http://172.21.10.63:84/wp-content/uploads/2014/02/082212_1444_SCCM2012Mov6.png)

That's all folks…
