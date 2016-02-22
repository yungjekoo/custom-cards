#General  architecture and core components

The customizable dashboard can be considered as a framework. It has classes and components to provide the basic processing and advanced features. You normally do not have to touch these classes. On the other hand there is a well defined interface for exploiters and contributors to minimize the effort to add new cards or extend existing cards.


(The architecture chart is a bit outdated but the fundamentals are still valid.)

![Architecture](https://ibm.box.com/shared/static/rtzgfz9x4jnhj1e222cbu8ed03g4cuyv.png)

Following is a list of basic components of the dashboard and their function in the system. 

####Dashboard####
The *Dashboard* class is the main entry point into the dashboard. It renders the controls, the canvas and the dialogs. It serves as minimalistic router since it shows and hides UI components depending on the state.

####DashboardControl####
Renders the top level control to add and select pages and dashboards and to edit the dashboard.

####DashboardCanvas####
This is the main area of the dashboard. It contains the layout manager and renders all cards.

####DashboardDialog####
The dialog is a generic modal dialog. It can be used for different purposes. The dashboard uses it as customization dialog for cards.

####CustomizationWizard and ComponentCustomization####
Both classes contain the logic for the card customization. The DashboardDialog ist used as container for the content.

####ReactWrapper####
The customizable dashboard is designed to support cards built with different technologies. In future releases it will be possible to support custom cards written in Polymer, Angular or other techniques. The connection and interface to the dashboard is done with a wrapper class. The wrapper class handles the interface to the dashboard framework and translates it to the needs of the used card technology. The wrapper provides a rectangular canvas with a defined size and some attributes for the card. The card implementation can use this canvas, which is at the end just a DIV node, in any way. The implementation just has to take care that it reacts to the framework events and that it renders according to the passed attributes. The wrapper takes care about all other aspects like creation, destruction, resize, card interaction etc.    
The only wrapper class is currently the ReactWrapper which supports cards written in React. It might be interesting to take a look into the ReactWrapper code to understand the basic features and the propserties. Cards written in React follow the normal React lifecycle.

####WrapperTitle####
This class handles the basic card interaction. It provides a card header with card title and action menu. The card implementation does not have to take care of the basic card interaction. 

####DashboardStore####
The dashboard framework uses Reflux as Flux like data flow pattern. This provides a separation of view and processing logic. It is used for the backend access to implement the DataStores. It is also used for the dashboard processing itself. The layout, the configuration file handling, the card preparation and all persistence aspects are handled by the DashboardStore. It is the central piece of logic of the dashboard. All basic actions are implemented in the DashboardStore.

####Actions####
The action class defines the actions of the DashboardStore.

####DashboardConfig.json####
The DashboardConfig is the only core component you have to touch if you want to add a custom card. It is a central JSON file to define the capabilities and available cards of the dashboard. You can completely change the behavior and appearance of the dashboard just by changing the DashboardConfig file. 

####Dashboard.json####
Dashboard.json (not Dashboard.jsx) is the default dashboard layout definition. It defines what cards are visible at what size and what place. The user would normally define this by adding cards and dragging them to a position. For the initial start, this Dashboard.json will be used instead to have an out-of-the-box experience. Otherwise the user would have to start with a blank paper. As soon as the user has modified and saved the dashboard, it will be stored in the local storage of the browser. Next time the dashboard starts, it will use this stored version instead of the default Dashboard.json. Any changes to this file will have no effect. If you make manual changes to Dashboard.json, you must make sure that you do not have a copy in the local storage.

####Configuration repository####
The configuration repository is not a class but a remote database service to store dashboard configurations. It is currently a stand-alone Bluemix service but it will be part of the IoTF REST Apis soon. The framework automatically stores changes to the dashboard in the configuration repository and the local storage. When the dashboard starts, it tries to fetch the latest version of the stored dashboard. It tries to get it from the remote configuration repository. If it does not exist in the repository, it looks in the local browser storage. If it does not exist in the storage, it will load the default dashboard configuration.

####Stores####
The dashboard comes with a number of predefined stores. Stores are used to access backend data. The IoTFDeviceStore e.g. uses MQTT to connect to IoTF. It retrieves live device data. A store handles the data access and publishes events to the cards whenever data has changed.
You can provide your own stores if you want to access other data points and backend systems.



