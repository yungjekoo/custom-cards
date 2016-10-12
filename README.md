# Creating custom cards for IBM Watson IoT Platform

IBM Watson IoT Platform provides a default set of cards that you can use to display your device data on your Watson IoT Platform boards. In addition to these cards, you can create and deploy your own custom cards to a card server that is then linked to your Watson IoT Platform organization.
Use custom cards to display your data the way you want to see it. Start your exploration with our sample HelloWorld card and then create your own masterpiece.

## Overview

The custom cards repository is a template from which you can start your custom card creation by forking the repository to your own environment, then copying and modifying the sample cards to meet your needs. You then deploy your cards to your own custom cards HTTP server and then connect to that server from Watson IoT Platform. After the servers are connected, the cards in your custom cards server can be used seamlessly with the default Watson IoT Platform cards.

Learn more about custom cards in the [IBM Watson IoT Platform documentation](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html).
**Tip:** To quickly take a look at some sample custom cards, you can link your Watson IoT Platform organization to the custom cards sample server. For information, see *Step 6: Link your package* in this readme.

## Before you begin

Make sure that your local development environment has Node.js with the npm node package manager.  

For information about installing Node.js, including the download links, go here: https://nodejs.org

Also, to host your custom cards package, you must set up an HTTP server that meets the following requirements:
- The server must not require credentials to access.
- The server must use the HTTPS protocol.
- The server must support Cross-Origin Resource Sharing (CORS) connections.  

**Tip:** For test and proof of concept work, you can use the built-in sample node.js server, which is configured to meet these requirements.

For information about how secure your custom cards server, see [Learn more about custom cards](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html) IBM Watson IoT Platform documentation.


## Getting started

Developing new cards for the dashboard by using the custom cards samples is easy. You can use the samples in this repository to get up and running in just a few minutes.

The sample repository contains two samples: EmptyCard and HelloWorld

To create, deploy, and connect a new card that is based on the HelloWorld card:

## Step 1: Create your own repository.

1. Locate the template repository at: https://github.com/ibm-watson-iot/custom-cards
2. Fork the repository to create your own copy.
3. Clone your repository in your local environment.  
**Note:** The exact process for the cloning step depends on the git client that you are using.

## Step 2: Create your own module and card framework.

Custom cards are organized in modules. The sample repository contains two samples: EmptyCard and HelloWorld.

1. Locate the HelloWorld module in`/modules/HelloWorld`.  
Use this module as your template.
2. Duplicate the HelloWorld folder into the modules directory and change the name to your new card name, for example: `/modules/MyCard`
3. Update all instances of HelloWorld in file names and file content.  
For example, change all occurrences of `HelloWorld`to `MyCard`.
 **Tip:** You can use a global find and replace in all files in the `MyCard` module folder to change all occurrences at the same time.  

File | Description
--- | ---
`MyCard/cards/MyCard.jsx`| Your React card component.  
`MyCard/customization/MyCardProperties.jsx`| The customization plug-in.
`MyCard/stores/MyCardStore.js`| The DataStore to deliver new data to the card.
`MyCard/MyCard.jsx`| The main module file, which references all the other components of your module. If you add additional files, for example, if your your module contains multiple cards, you must reference them here.
`MyCard/MyCard.less` | If you need CSS styles, add them to the `MyCard/MyCard.less` file in the same folder.

## Step 3. Reference the new card.
Your custom card package can contain multiple modules. You must reference your new module in the main package file. The file `modules/Modules.jsx`contains the references to all main module files. Add a line `Modules.MyCard = require('./MyCard/MyCard.jsx')`.  

There is also a `.less`file in the same folder. If you have changed the `MyCard.less` file in your module, you can reference it here.

The code is now prepared for your module, and the card is now ready to be used as `MyCard`in the Watson IoT Platfrom boards. However, before you use the card, you must register it.

## Step 4: Register your module
To make your card available in the boards of your Watson IoT Platform organization, you must add the card configuration details in the `DashboardConfig.json` file. Your package contains a snippet of this configuration that you must add to the main configuration file.

1. Go to `public/config/DashboardConfig.json`.  
This file contains the configuration snippet for your package. It defines the cards that your package includes.  
2. Change the name of your custom card package.  
If you want to use multiple different custom card servers at the same time, each server must have a unique package name.
 1. Update the `packageName` entry with a unique package name for your server, such as "MyCustomCardPackage".  
 `"settings": {`  
 `"packageName": "MyCustomCardPackage"`  
 `},`
 2. Open the gulpfile.js in the root directory to specify the same package name.  
  This build file will use the package name to create unique modules.  
 `//****************************************`  
 `// Enter external name of the package here`  
 `var packageName = 'MyCustomCardPackage';`  
 `//****************************************`  

2. Find and duplicate the entry for `HelloWorld`.
3. In the new entry, change all occurrences of `HelloWorld` to `MyCard`.
4. Specify a new or existing value for the `category` entry.
The category specifies where a new card is located in the Watson IoT Platform card gallery.
5. Specify a title for the card.  
The `title` entry sets the title that the card is identified by in Watson IoT Platform.  

**Important:** Verify that there are no trailing commas and that no commas are missing.  Make sure that the file content is well formatted JSON. For example, use a JSON formatter or validator to verify that the file is proper JSON.

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
The unique name of the card.
- displayName  
A user-readable name of the card. This name identifies the card in the card gallery.  
- description  
A short description of your card. The description is displayed with the card in the card gallery, for example, `overview`
<!-- - thumbnail  
The name of one of a set of standard SVG icons. The icon is used in the customization dialog box. -->
- category  
 The type of card. The category is used to sort the cards in the card gallery.
...
- cardType  
The definition of the basic requirements of the card. Use `cardType` to for example specify that the card requires property data points or that it is preconfigured and can be used as-is. You can use multiple values that are separated by a comma.  
The following cardType values are supported:
 - NO_DATAPOINTS - Do not show data set definition, for example, you can use this value if you do not want to access IoT data points.
 - SINGLE_DATAPOINT - Only one data point can be defined.
 - EVENT_ONLY - Only require an event name. Do not show the property field in data point definition.
 - SOURCE_ONLY - Select only the source but specific data points are not defined.
 - NO_CUSTOMIZATION - Skip card customization completely and add the card immediately for the event name.
- wrapper  
Defines the wrapper class, which sets the technology that is used for the card implementation. **Important:** At this point, only React cards are supported. Use `"wrapper": "ReactWrapper",`.
- sizes  
An array that is used to define the supported sizes for the card. Each entry represents a valid width and height combination of the card measured in grid tiles. The card has access to the current width and height, and it can render accordingly. The user can use the card actions to toggle between these sizes.
- module  
 The name of your custom module. The name must match the name of the folder and the object name that is used in your main module file and the main module file itself.
- parameters  
Parameters that are passed to the wrapper and the card itself.   
For example, you can directly specify custom parameters, such as credentials for your test service. All instances of this card have access to these parameters as properties. If you defined a customization plug-in, the defined fields result in parameters that are accessible by the card. For example, you can use a switch to specify whether a chart is oriented horizontally or vertically.  
The following two parameters are mandatory:
 - component  
The name of the main class of the card.
 - title  
The default title for the card. The user can change the title in the customization dialog box.
- customization  
The name of the card customization plug-in. The card customization dialog box is generic, but you can add custom fields in the settings section of the dialog box. The HelloWorld example provides a simple customization plug-in.


## Step 4: Build your card package.

To build the card package:
1. Open a console and navigate to the root directory of your repository.  
For example, navigate to: `C:\Users\{my_name}\GitHub\custom-cards`
2. Run `npm install`
3. Run `gulp`  
If you see errors, they should include the line number where you must change something. Correct the error and try again.

**Tip:** Leave Gulp running to automatically rebuild your package every time you make a change. After the first build, a Gulp rebuild usually takes approximately less than a second to complete.   

## Step 5: Deploy your card package.

Before you can use your cards with Watson Iot Platform, you must deploy the card package to your custom cards HTTP server.

**Tip:** For test and proof of concept work, you can use the built-in sample node.js server.

### Deploy by using the local node.js server
To deploy the card package:
1. Open a new console window to the root directory of your repository.  
 For example, navigate to: `C:\Users\{my_name}\GitHub\custom-cards`
2. Run `node app`.  
This command starts a local HTTP server for the custom cards package.  
**Important:** Your cards are only available when the local server is up and running. For card development, it is fine to run your server locally. For more stringent testing and for production, you should deploy your custom cards package to an HTTP server that is available on the web.
3. Make sure you can access the card package at `https://{web_server_address}/index.html`

### Deploy by using an external custom cards server
**Note:** The generic steps below differ depending on your choice of HTTP server.

To upload and deploy the card package:
1. Verify that your HTTP server is running and that it can be accessed.
2. Using the method of your choice, upload the `custom-cards\public` folder to your web server and make sure you can access it at `https://{web_server_address}/index.html`
3. If required, restart your web server.

Your card package is now available on your custom cards server. You can now link Watson IoT Platform to the server and start using your cards.

## Step 6: Link your package.
Before you can use your card, you must link the custom cards server to Watson IoT Platform.  

**Important:** Custom cards are currently an experimental service, and the custom cards settings are stored locally in your browser. You must register your custom cards server in each browser that you want to use to access custom cards in your Watson IoT Platform dashboard dashboards.

To link the custom cards server:
1. Log in to the Watson IoT Platform dashboard as a user with administrative rights.
2. Go to **Settings** and verify that experimental features are enabled.
2. Connect to the sample server.
 2. Go to **Extensions**.
 3. Click **Add extension** and select the **Custom Card** extension.
 4. In the extensions dashboard, click **Setup** on the custom cards tile to edit the settings.
 5. In the Configure Custom Cards dialog box, in the server field, enter the URL for the external card server.  
**Note:** The URL should start with HTTPS.  
**Tip:** The URL of the public sample card server is https://customcards.mybluemix.net
If you are connecting to your own server, enter the URL of that server.
 4. Click **OK** to add the server connection.
5. Create a new card that is based on the sample cards.
 1. In the Watson IoT Platform dashboard, go to **Boards**.
 2. Click **Create New Board**.  
 Complete the Create new board dialog. For information, see [Creating boards and cards](https://new-console.ng.bluemix.net/docs/services/IoT/data_visualization.html#visualizing_data).
 3. Open the new board.
 4. Click **Add New Card**.  
 5. Scroll down to **Custom cards** and select one of the sample cards.  
 Complete the card creation process. For information, see [Creating boards and cards](https://new-console.ng.bluemix.net/docs/services/IoT/data_visualization.html#visualizing_data).  

Your new custom card is now in your new board displaying data from your connected device.

Congratulations! Now you can change your first new card step-by-step to adapt it to your needs.


## Cleaning up your repository
Your repository might contain multiple modules and cards, some of which are purely scratch pads for development or just plain obsolete. They can serve as a source for inspiration, because they cover different aspects, but you can also remove the modules if you do not need them.

To remove a module from your repository:
1. Remove the folder of the module.
2. Remove the entry in `DashboardConfig.json`
3. Remove the reference in `modules/Modules.jsx`and `modules/Modules.less`
