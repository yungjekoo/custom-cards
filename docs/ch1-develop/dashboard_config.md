#Dashboard configuration file

##Meaning##
The dashboard configuration file defines the capabilities and behavior of the dashboard. It also defines the set of available cards and their behavior (in contrast to the definition of a set of visible cards and their exact layout which is defined in the Dashboard.json file).

You must edit the dashboard configuration file to add new cards. You can find it in 

   `dashboard/config/DashboardConfig.json`
   
Note: This is a plain JSON file. Be careful that you stick to the JSON syntax when you edit. Property keys are always in double quotes. Do not forget commas between objects and do not have trailing commas after the last object in an array. The config file will not load if it cannot be parsed to valid JSON.

##Structure##
The config file has multiple sections.

***theme*** contains the color scheme or branding. Cards and components reference the color codes of the color schema with variables. This variables are defined in this section. Changing the color value of a variable will influence the color of UI elements throughout the dashboard. Do not use hardcoded color codes. Always refer to the theme. A *theme* object is passed to all cards and components as property. A theme could look like this

    "theme": {
      "canvas": "#142a36",
      "lightText": "#F7F7F7",
      "border": "#E6E6E6",
      "title": "#F7F7F7",
      "titleText": "#899399",
      "content": "#FDFDFD",
      "major": "#2E3636",
      "minor": "#899399",
      "accent": "#4581E0",
      "good": "#8CD210",
      "bad": "#FF5050",
      "font": "'Helvetica Neue',HelveticaNeue,Helvetica,'Segoe UI',Segoe,Calibri,Roboto,'Droid Sans','Arial Unicode MS',Arial,sans-serif",
      "logo": "style/images/iot.jpg",
      "light": "#c7c7c7",
      "normal": "#959595",
      "dark": "#5a5a5a",
      "chart": ["#5596E6", "#4178BE", "#325C80", "#264A60", "#1D3649", "#323c3c", "#3c4646", "#5a6464", "#6d7777", "#959f9f"],
      "schemes": [
        { 
          "name": 0,
          "light": "#c8d2d2",
          "normal": "#8cd211",
          "dark": "#4b8400"
        }
      ]
    }

***capabilities*** defines some fundamental parameters of the dashboard. The dashboard can be used stand-alone as an application or it can serve as foundation for POCs. You can use the capabilities object to enable features that are not available in the official IoTF version of the dashboard. You can also change fundamental layout parameters.

    "capabilities": {
      "multipleDashboards": false,
      "multiplePages": false,
      "useOldDialogs": false,
      "breakpoints": {"lg": 1200, "md": 996, "sm": 480},
      "cols": {"lg": 3, "md": 2, "sm": 1},
      "rowHeight": 120,
      "margin": [30,30]
    }

***settings*** are user defined settings. You can specify parameters which can be retrieved in your code by calling `DashboardUtil.getSettings(<NAME_OF_SETTING)`. This makes it easy to change the behavior of stores and cards just be changing the configuration.

    "settings": {
      "configRepositoryURL": "http://configrepositoryservice.mybluemix.net/rest",
      "configRepositoryUser": "admin",
      "configRepositoryPassword": "admin"
    }

***components*** defines the available cards. Every entry in this array is a card definition. See the details for more information

##Component definition##
You can define cards in the components section. If you create a new card, just use an existing entry and copy if with a new name to avoid typos and missing data. Here is an example for a card definition:

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
    
Following is the meaning of the component definition entries. 

***name*** defines the unique name of the card

***displayName*** user readable name of the card. This information is used in the card gallery to identify the card.

***description*** description of the card. This information is used in the card gallery to give some description for the card.

***thumbnail*** path to a thumbnail to represent the card. This can also bee the name of a standard SVG icon which is known to the dashboard framework. The customization dialog uses the thumbnail to represent the card. 

***category*** defines the type of card. The name of the category can be chosen by the card provider. It will most likely represent the name of the IoTF component or special card type, like e.g. "Risk Management", "Devices", "Basic". The category also defines the icon in the top left corner of the card. There is currently no way to change the icon without touching the code. Let me know if you have the need to have a custom icon.

***cardType*** Defines the basic requirements of the card. You can define if your card needs data points or if it is completely preconfigured. Following values are currently supported. You can use multiple values if they are separated by a comma.
-   `"NO_DATAPOINTS"` - Do not show data set definition (e.g. usage cards)
-   `"SINGLE_DATAPOINT"` - Only one data point can be defined (not used yet)
-   `"EVENT_ONLY"` - Do not show property field in data point definition (e.g. weather service)
-   `"SPECIFIC"` - Select properties with a special meaning (e.g. elevator)

***wrapper*** defines the wrapper class. This defines the technology used for the card implementation. Since only React cards are currently supported, the wrapper is always "ReactWrapper".

***module*** defines the name of your custom module. It must match the name of the folder as well as the object name used in your main module file and the main module file itself. 

***customization*** defines the name of the card customization plugin. The card customization dialog is generic but you can add custom fields to the dialog by with a customization class. This class must follow a certain pattern which is defined in the customization section of this documentation.

***sticky*** is a flag to disable card removal. A sticky card is always present. It cannot be removed from the dashboard canvas.

***sizes*** is an array to define the supported sizes of this card. Each entry represents a valid width and height combination of the card measured in grid tiles. The card has access to the current width and height and it can render accordingly. The Value.jsx card e.g. renders a simple text for width 1, a text and a table for width 2 and a text and a chart for width 3. The user can use the card actions to toggle between these sizes. 

***parameters*** are parameters that will be passed to the wrapper and the card itself. You can e.g. directly specify custom parameters (e.g. credentials for your test service). All instances of this cards will have access to these parameters as props. If you have defined a customization plugin, he defined fields will result in parameters which are accessible by the card. You could e.g. have a switch to specify if a chart is horizontally or vertically oriented. There are two manadatory parameters:
- ***component*** is the name of the main class of the card. Since dynamic requires do not work in the moment, this refers to the name that has been specified in the explicit require you have specified in DashboardStore.jsx.
- ***title*** is the default title of the card. The title can be changed in the customization dialog.





