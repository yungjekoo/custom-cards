#Package structure

This is the basic structure of the code. The code is organized in modules. Some modules like `Dashboard` or `common` are the foundation blocks of the dashboard. Others are custom modules providing custom cards. They are optional.

`/Dashboard/cards`
This folder contains all cards. *Cards* are React components which are directly used inside the dashboard in contrast to *components* which are React components representing single UI elements.

`/common/components`
Here are all UI elements that are used in the IoTF UI. Make sure that you avoid using external UI components. If you need a UI component, take one from this folder. If it is not there, write a new one and put it into the folder.

`/Dashboard/customization`
Plugins for the card customization dialog. Every card can provide a UI for extra parameters. A chart might need a switch to distinguish between horizontal and vertical representation. You can define a code snippet to deliver the UI and to put the data into the right places.

`/Dashboard/dashboard`
This is the place for the dashboard framework. You will most like not change too much code in here.

`/Dashboard/dashboard/config`
These are the configuration files for the dashboard. To be more precise: an overall configuration file which defines the capabilities of the dashboard and the default dashboard definition which defines how the initial dashboard page will look like.

`/Dashboard/stores`
A collection of stores. You can contribute your own stores here if they are of general interest. Otherwise your stores will go into your own module.

`/Dashboard/util`
Some utility classes and things that do not fit elsewhere.


Please discuss with the dashboard core team before you integrate code to the dashboard. Normally you will create your specialized code in a  separate module. Some cards and especially components might be interesting for others for reuse. They should go into the dashboard base.

 
