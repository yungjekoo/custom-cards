# Creating custom cards for IBM Watson IoT Platform

Use your own custom cards with Watson IoT Platform to visualize your IoT data beyond the generic cards.

## Background

This repository is a template that you can use to start your custom card creation. You can fork the repository, copy  and modify the sample cards, deploy your cards to a custom cards HTTP server, and then connect to that server from Watson IoT Platfrom to use your custom cards together with the default IoT Platform cards.

Learn more about custom cards in the [IBM Watson IoT Platform documentation](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html).

> See the dashboard documentation to link your custo cards with a dashboard installation. [See documentation here](https://pages.github.ibm.com/Watson-IoT/platform-ui-components/dashboard/ch1-develop/getting_started_hotplug.html)



> ### Deployment

> * change manifest.yml to match your environment
> * cf api https://api.ng.bluemix.net
> * cf login -u mielke@de.ibm.com -o markus.juettner@de.ibm.com -s IoTFDashboard (adapt user, org and space)
> * cf push manifest


## Before you begin

Make sure that your local development environment meets the following requirements:
- nodejs
- npm
- ...

Also, you must set up an HTTP server to host your custom cards package.
- The server must use the HTTPS protocol
- More Requirements

For information about how secure your custom cards server, see Learn more about custom cards in the [IBM Watson IoT Platform documentation](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html).


## Getting started

Developing new cards for the dashboard with the custom-cards samples is easy. You can use this repository and the HelloWorld sample card to get up and running in just a few minutes.

The HelloWorld card already contains most interesting aspects of a card which can just be reused and enhanced for your needs. For example:
- List of aspect 1
- List of aspect 2
- ...

To create a new card based on the HelloWorld card:

## Step 1: Create your own repository

1. Locate the template repository at https://github.ibm.com/IoT/custom-cards
2. Fork the repository to create your own copy.
3. Clone your repository in your local environment.  
The exact process for this step depends on the git client that you are using.

## Step 2: Create your own module and card framework

Custom cards are organized in modules. The sample repository contains two samples: EmptyCard and HelloWorld.

1. Locate the HelloWorld module in`/modules/HelloWorld`.  
Use this module as your template.
2. Duplicate the HelloWorld folder into the modules directory and change the name to your new card name: For example: `/modules/MyCard`
3. Update all instances of HelloWorld in file names and file content.  
For example, change all occurrences of `HelloWorld`to `MyCard`.
 **Tip:** You can use a global find and replace in all files in the `MyCard` module folder to change all occurrences at the same time.  

File | Change
--- | ---
`MyCard/cards/MyCard.jsx`| This is your React card component.  
`MyCard/customization/MyCardProperties.jsx`| This is the customization plugin.
`MyCard/stores/MyCardStore.js`| This is the DataStore to deliver new data to the card.
`MyCard/MyCard.jsx`| This is the main module file. It references all other components of you module. If you add additional files, e.g. your module contains multiple cards, you must reference them here.
`MyCard/MyCard.less` | If you need CSS styles, add them to the `MyCard/MyCard.less` file in the same folder.

## Step 3. Reference the new card
Your custom card package might contain multiple modules. You must reference your new module in the main package file. The file `modules/Modules.jsx`contains the references to all main module files. Add a line `Modules.MyCard = require('./MyCard/MyCard.jsx')`.  

There is also a `.less`file in the same folder. If you have changed the `MyCard.less` file in your module, you can reference it here.

Now you have prepared the code of your module. It can now be used as `MyCard`in the dashboard. Before you can do this, you must make it known to the dashboard.

## Step 4: Register your module
To make your card available in the Watson IoT Platform boards you must include the card configuration details in the `DashboardConfig.json` file. You package contains a snippet of this configuration which will be included into the main configuration file.
1. Go to `public/config/DashboardConfig.json`.  
This is the configuration snippet for your package. It defines what cards your package provides.
2. Find and duplicate the entry for `HelloWorld`.
3. In the new entry, change all occurrences of `HelloWorld` to `MyCard`.
4. Assign a category for your module.
The category specifies where in the Watson IoT Platform card gallery a new card is located.
Specify a new or existing value for the `category` entry.  
5. Specify a title for the card. The `title` entry sets the title that the card will use in Watson IoT Platform.  

**Important:** Do not forget any trailing commas when you make changes to the configuration. Make sure that the file content is well formatted JSON.

```
    {
      "name": "MyCard",
      "displayName": "MyCard",
      "description": "Example card with simple customization and store",
      "thumbnail" : "overview",
      "category": "My new cards",
      "cardType": "NO_DATAPOINTS",
      "wrapper": "ReactWrapper",
      "sizes": [[2,3],[4,4]],
      "module": "MyCard",
      "parameters" : {
        "component": "MyCard",
        "title": "This is my new card!"
      },
      "customization": "MyCardProperties"
    },
```
Legend:
- name  
The name of your card.
- displayName  
The name as it will be displayed in Watson IoT Platform.  
- description  
A short description of your card.
- thumbnail  
The icon to use for your card. The default is `overview` which is a flag.
- category  
...
- cardType
- wrapper
- sizes
- module
- component
- title
- customization


## Step 4: Build your card package

To build the card package that you will deploy to the custom card server:
1. Open a console and navigate to the root directory of your repository.
2. Run `npm install`
3. Run `gulp`.  
Gulp builds your package every time you make a change to it.  
**Tip:** After the first build, a gulp rebuild usually takes on the order of less than a second to complete.   
If you see errors, they should be pretty clear, indicating the line number where you have to change something. Fix it!

## Step 5: Upload your card package

To upload the card package:
1. Optional: Start your local http server
 1. Open a new console window to the same directory.
 2. Run `node app`.  
This starts a local HTTP server for the custom cards package.  
**Important:** Your cards are only available when the local server is up and running. For card development, it is fine if you run your server locally. For more stringent testing and for production you should deploy your custom cards package to an HTTP server that is available on the web.
2. Upload the `custom-cards\public` folder to your web server, and make sure you can access it at: URL

> This is where we need some specific information... How and what to upload to the HTTPS server. Also, is there anything specific the user has to do when running a local server to make it accessible to Iot Platform on Bluemix? What URL should they use for example?

## Step 6: Link your package
You can now link your new card package to Watson IoT Platform.  

To link the custom cards server:
1. Log in to the Watson IoT Platform dashboard as a user with administrative rights.
2. Connect to the sample server.
 2. Go to **Extensions**.
 3. Click **Add extension** and select the Custom Card extension.
 4. In the extensions dashboard, click **Setup** on the custom cards tile to edit the settings.
 5. In the Configure Custom Cards dialog server field, enter the URL for the external card server.  
**Note:** The URL should start with https.  
The URL of the public sample card server is: https://samplecards.mybluemix.net
If you are connecting to your own server, enter the URL of that server.
 4. Click **OK** to add the server connection.
5. Create a new card based on the sample cards.
 1. In the Watson IoT Platform dashboard, go to **Boards**.
 2. Click **Create New Board**.  
 Complete the Create new board dialog. For information, see [Creating boards and cards](https://new-console.ng.bluemix.net/docs/services/IoT/data_visualization.html#visualizing_data).
 3. Open the new board.
 4. Click **Add New Card**.  
 5. Scroll down to **Custom cards** and select one of the sample cards.  
 Complete the card creation process. For information, see [Creating boards and cards](https://new-console.ng.bluemix.net/docs/services/IoT/data_visualization.html#visualizing_data).
 6. Your new custom card is now in your new board displaying data from your connected device.

- Now you can change your first new card step by step to adapt it to your needs. The automated build will rebuild your package every time you make a change and the changes will immediately be available after a browser refresh.
- Congratulations!

## Step 7: Clean up
Your repo still contains multiple modules and cards. They can serve as a source for inspiration since they cover different aspects. You can also remove the modules if you do not need them.
Remove the folder of the module
Remove the entry in `DashboardConfig.json`
Remove the reference in `modules/Modules.jsx`and `modules/Modules.less`
