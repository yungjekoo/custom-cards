#Modules

If you contribute new cards to the dashboard, they will most likely go into a separate module. This makes it easy to customize the content of the dashboard for different situations. There are some basic modules which are essential for the dashboard and custom modules to provide optional cards.


If you want to create your first module, follow the instructions in [Getting started](getting_started.md)

Your module contains all cards, components, resources, styles and stores in a single folder. This folder will automatically package  and minified during build.

A module has a basic structure. Some files and folder must have special names to work with automated build. Therefore is wise to stick to the common pattern.

`/cards` 
Contains all dashboard cards. These are the React components that can directly be used in the dashboard.

`/components`
Contains all UI components that can be used in cards. This can be specialized buttons, entry field, headers, charts etc.

`/stores`
Contains all your custom stores

`/resources`
This folder contains all your resources like images and other local data. The content of the folder with this exact name will be copied to the global resources folder.

`/MyCard.jsx`
The jsx file with the same name as the module folder is the main module file. It references all React classes of the module. It is important to require your classes here. Otherwise they won't be accessible as cards or customization plugins.

`/MyCard.less`
This is the style sheet for your module. It well be processed with less.

`../IoTFComponents.jsx`
In the parent directory you can find the main file. It references all modules. If you do not want a module in your build, remove the line for this module.

`../IoTFComponents.less`
What the jsx file for the Javascript code is the less file for the style sheets. Reference your less files in this global less file and it will be packaged, preprocessed and made available.