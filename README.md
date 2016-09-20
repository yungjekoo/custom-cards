# Creating custom cards for IBM Watson IoT Platform

IBM Watson IoT Platform provides a default set of cards that you can use to display your device data on your Watson IoT Platform boards. In addition to these cards you can create and deploy your own custom cards to a card server that is then linked to your Watson IoT Platform organization.
Use custom cards to display your device data the way you want to see it. Start your exploration with our sample HelloWorld card, and then create your own masterpiece.

## Overview

The custom-cards repository is a template from which you can start your custom card creation by forking the repository to your own environment, then copying and modifying the sample cards to suit your needs. You then deploy your cards to your own custom cards HTTP server, and then connect to that server from Watson IoT Platform. Once connected, the cards in your custom cards server can be used seamlessly with the default IoT Platform cards.

Learn more about custom cards in the [IBM Watson IoT Platform documentation](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html).
**Tip:** To quickly take a look at some sample custom cards you can link your Watson IoT Platform organization to the custom cards sample server. For information, see *Step 6: Link your package* of this readme.

## Before you begin

Make sure that your local development environment meets the following requirements:
- Node.js with NPM
For information about installing Node.js, including the download links, go here: https://nodejs.org

Also, you must set up an HTTP server to host your custom cards package.
- The server must use the HTTPS protocol.
- The server must support CORS connections.  

**Tip:** For test and proof of concept work you can use the built-in sample node.js server which is configured to meet these requirements.

For information about how secure your custom cards server, see [Learn more about custom cards](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html) IBM Watson IoT Platform documentation.


## Getting started

Developing new cards for the dashboard with the custom-cards samples is easy. You can use this repository and the HelloWorld sample card to get up and running in just a few minutes.

To create, deploy, and connect a new card based on the HelloWorld card:

## Step 1: Create your own repository

1. Locate the template repository at https://github.ibm.com/IoT/custom-cards
2. Fork the repository to create your own copy.
3. Clone your repository in your local environment.  
**Note:** The exact process for the cloning step depends on the git client that you are using.

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

You have now prepared the code for your module, and the card is now ready to be used as `MyCard`in the Watson IoT Platfrom boards. However, before you use the card you must register it.

## Step 4: Register your module
To make your card available in the boards of your Watson IoT Platform organization, you must add the card configuration details in the `DashboardConfig.json` file. Your package contains a snippet of this configuration which you must add to the main configuration file.

1. Go to `public/config/DashboardConfig.json`.  
This is the configuration snippet for your package. It defines the cards that your package includes.
2. Find and duplicate the entry for `HelloWorld`.
3. In the new entry, change all occurrences of `HelloWorld` to `MyCard`.
4. Specify a new or existing value for the `category` entry.
The category specifies where in the Watson IoT Platform card gallery a new card is located.
5. Specify a title for the card.  
The `title` entry sets the title that the card is identified by in Watson IoT Platform.  

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

To build the card package:
1. Open a console and navigate to the root directory of your repository.  
For example: `C:\Users\{my_name}\GitHub\custom-cards`
2. Run `npm install`
3. Run `gulp`  
If you see errors, they should be pretty clear, indicating the line number where you have to change something. Fix it!

**Tip:** Run Gulp to rebuild your package every time you make a change.  After the first build, a gulp rebuild usually takes on the order of less than a second to complete.   

## Step 5: Upload your card package

Before you can use your cards with Watson Iot Platform, you must upload the card package to your custom cards HTTP server.

**Tip:** For test and proof of concept work you can use the built-in sample node.js server.

### Upload using the local node.js server
To deploy the card package:
1. Open a new console window to the root directory of your repository.  
 For example: `C:\Users\{my_name}\GitHub\custom-cards`
2. Run `node app`.  
This starts a local HTTP server for the custom cards package.  
**Important:** Your cards are only available when the local server is up and running. For card development, it is fine if you run your server locally. For more stringent testing and for production you should deploy your custom cards package to an HTTP server that is available on the web.
3. Make sure you can access the card package at: `https://{web_server_address}/index.html`

### Upload using an external custom cards server
**Note:** The generic steps below differ depending on your choice of web server.

To upload and deploy the card package:
1. Verify that your custom cards server is running and that it can be accessed.
2. Using the method of your choice, upload the `custom-cards\public` folder to your web server, and make sure you can access it at: `https://{web_server_address}/index.html`
3. If required, restart your web server.

Your card package is now available on your custom cards server. You can now link Watson IoT Platform to the server and start using your cards.

## Step 6: Link your package
Before you can use your card you must link the custom cards server to Watson IoT Platform.  

To link the custom cards server:
1. Log in to the Watson IoT Platform dashboard as a user with administrative rights.
2. Connect to the sample server.
 2. Go to **Extensions**.
 3. Click **Add extension** and select the **Custom Card** extension.
 4. In the extensions dashboard, click **Setup** on the custom cards tile to edit the settings.
 5. In the Configure Custom Cards dialog server field, enter the URL for the external card server.  
**Note:** The URL should start with HTTPS.  
**Tip:** The URL of the public sample card server is: https://samplecards.mybluemix.net
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

Congratulations! Now you can change your first new card step-by-step to adapt it to your needs.


## Cleaning up your repository
Your repository might contain multiple modules and cards, some of which are purely scratch pads for development, or just plain obsolete. They can serve as a source for inspiration since they cover different aspects, but you can also remove the modules if you do not need them.

To remove a module from your repository:
1. Remove the folder of the module
2. Remove the entry in `DashboardConfig.json`
3. Remove the reference in `modules/Modules.jsx`and `modules/Modules.less`
