#Default dashboard

The default dashboard definition is defined in `dashboard/config/Dashboard.json`. This JSON file represents the dashboard layout if there is no remote definition of the dashboard in the remote configuration service or if a valid dashboard definition cannot be found in the local browser storage. In contrast to the DashboardConfig.json, the Dashboard.json defines what cards are visible, what size they have and where they are. 

If you modify the dashboard by moving or adding a card, you overrule this default definition with your own copy. The modified copy has the same structure and syntax as the Dashboard.json. You can find the copy in the local storage of your browser. Manual changes to the origianl file will have no effect. 

A full understanding of the format of the JSON file is not necessary to create new cards. Therefore we only take a look at the main concepts.

A Dashboard.json file can have multiple dashboard pages.    
The ***settings*** block defines the selected dashboard page.    
The ***dashboards*** array contains one or more single dashboard pages. Each page has a unique id.    
The ***components*** array of a dashboard definition defines the cards of this dashboard.    
A single card entry refers to the card definition in the DashboardConfig.json with the ***type*** parameter.    
The ***parameters*** block of the card entry has the same structure as the parameters in the DashboardConfig.json but it overwrites these basic definition with customized values. If you specify parameters in the card customization dialog, the values are written into the parameters section and passed to the card as props. One special entry in the parameters object is the ***size*** object. It defines the selected size for each form factor. The available sizes have been defined in the card definition.  

        {
          "id": "6747eb79-0251-498d-9401-290aa98b4375",
          "type": "HorizontalLine",
          "parameters": {
            "component": "HorizontalLine",
            "title": "Playground",
            "size": {
              "sd": 0,
              "md": 0,
              "lg": 2
            }
          }
        }
The ***layouts*** array refers to entries in the components block. There are three layouts: small(sm), medium(md) and large(lg) for smartphones, tables and desktop browsers. The dashboard can handle a layout for each size separately, i.e. if you move a card in the desktop browser, it will still be at the old location on the tablet. The user can optimize the layout for each form factor. 

          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 4,
            "i": "d4ba0e17-95d6-400e-800a-108be0b2e88d"
          }
Each entry in a layout definition defines the position and dimension for a card for a certain form factor.
