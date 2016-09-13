# Creating custom cards for IBM Watson IoT Platform

iotf-react
Template for custom card creation

## Background

This repo is a template for custom card creation. Fork it to create your own custom cards. See the dashboard documentation to link your custo cards with a dashboard installation. https://pages.github.ibm.com/IoT/iotf-react/

## Running

Install dependencies
`npm install`

Start build and watch
`gulp`

Run server
`node app.js`

### Deployment

* change manifest.yml to match your environment
* cf api https://api.ng.bluemix.net
* cf login -u mielke@de.ibm.com -o markus.juettner@de.ibm.com -s IoTFDashboard (adapt user, org and space)
* cf push manifest


# Before you begin
Requirements:
- nodejs
- npm
- ...

# Getting started - Custom card hot plug

The new way to publish custom cards is the hot plug. You do no longer have to touch the IoTP core code. You do not even have to fork the IoTP repository since you develop your cards in a separate repository.

Learn more about custom cards in the [IBM Watson IoT Platform documentation](https://new-console.ng.bluemix.net/docs/services/IoT/custom_cards/custom-cards.html).

Developing new cards for the dashboard with the hot plug mechanism is easy. You do not have to start from scratch since there is a custom card repository which serves as template for your developement. Just use this existing repo and the HelloWorld sample card to get your own card live in only a few minutes. The HelloWorld card already contains most interesting aspects of a card which can just be reused and enhanced for your needs.

Follow these steps to create a new card based on the HelloWorld card in the template repo:

## Step 1: Create your own repository

1. Locate the template repository at https://github.ibm.com/IoT/custom-cards
2. Fork the repo to create your own copy.
 The button to fork is in the upper right corner of the Web UI.
3. Clone your repository in your local environment.  
This step depends on the git client you are using.

## Step 2: Create your own module and card

Custom cards are organized in modules. The repo might contain multiple modules. Locate the HelloWorld module in
`/modules/HelloWorld`. Use this module as your template.

1. Copy the folder into the same directory and change the name to your new card name, e.g.
`/modules/MyCard`
2. Change all the file names in your module to something with `MyCard`instead of `HelloWorld`.  
 **Tip:** You can also use a global change in all files in the `MyCard` module folder to change all occurences at once.  

File | Change
--- | ---
`MyCard/cards/MyCard.jsx`| Change all occurrences of `HelloWorld`to `MyCard`. This is your React card component.  
`MyCard/customization/MyCardProperties.jsx`| Change all occurrences of `HelloWorld`to`MyCard`. This is the customization plugin.
`MyCard/stores/MyCardStore.js`| Change all occurrences of `HelloWorld`to `MyCard`. This is the DataStore to deliver new data to the card.
`MyCard/MyCard.jsx`| Change all occurrences of `HelloWorld`to `MyCard`. This is the main module file. It references all other components of you module. If you add additional files, e.g. your module contains multiple cards, you must reference them here.

If you need css styles, add them to `MyCard/MyCard.less` in the same folder.
Your custom card package can contain multiple modules. You must reference your new module in the main package file. The file `modules/Modules.jsx`contains the references to all main module files. Add a line `Modules.MyCard = require('./MyCard/MyCard.jsx')`.
There is also a `.less`file in the same folder. If you have changed the `MyCard.less` file in your module, you can reference it here.

Now you have prepared the code of your module. It can now be used as `MyCard`in the dashboard. Before you can do this, you must make it known to the dashboard.

## Step 3: Register your module
The available cards in the dashboard are configured in the central `DashboardConfig.json` file. You package contains a snippet of this configuration which will be included into the main configuration file.
1. Go to `public/config/DashboardConfig.json`. This is the configuration snippet for your package. It defines what cards your package provides.
2. Find the entry for `HelloWorld` and duplicate it.
3. Change all occurrences of `HelloWorld` to `MyCard` in the new entry.
4. Also change the value of `category`in this entry.  
Specify a new category to easily find your new cards in the card gallery.
5. Also specify a new title for the card so that you can see a difference to the `HelloWorld` card.  
Remember that we did not change any functionality so far.  
**Important:** Do not forget any trailing commas when you make changes to the configuration.

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



## Step 4: Build your package
1. Open a console and navigate to the root directory of your repo.
2. Run `npm install`
3. Run `gulp`.  
This will build your package every time you make a change to it. **Tip:** You will notice the a rebuild will only probably take 0.1 seconds.  
If you see errors, they should be pretty clear, indicating the line number where you have to change something. Fix it!
4. Open a new console window and navigate to the same directory.
5. Run `node app`.  
This is your server for the custom cards package. Your cards are only available when the server is up and running. For card development, it is fine if you run your server locally. For test or production, you must make your package available in the Web, e.g. using Bluemix.

## Step 5: Link your package
You can now link your new card package to any running instance of the dashboard. This can be the sample application of the iotf-react repository as well as a test server or the public environment.
1. Log in to Watson IoT Platform dashboard as an administrative user.
2. Connect to the sample server.
 2. Go to **Settings > Extensions**.
 3. Click **Add extension** and select the Custom Card Hot Plug extension.
 4. In the extensions dashboard, click the **Custom Card Hot Plug** tile to edit the settings.
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

## Step 6: Clean up
Your repo still contains multiple modules and cards. They can serve as a source for inspiration since they cover different aspects. You can also remove the modules if you do not need them.
Remove the folder of the module
Remove the entry in `DashboardConfig.json`
Remove the reference in `modules/Modules.jsx`and `modules/Modules.less`
