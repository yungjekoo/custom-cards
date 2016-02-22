#React card wrapper

####Description
The react card wrapper is a container for dashboard cards implemented in react.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`id`**            |`string`        |        | |
|**`inbound`**       |`array`         |        |Conversion scheme for incoming events |
|**`outbound`**      |`array`         |        |Conversion scheme for outgoing events  |
|**`type`**          |`string`        |        |Card type |
|**`parameters`**    |`object`        |required|Parameters for the wrapped card, also includes the component name that defines the wrapped card |
|**`layout`**        |`string`        |        |Layout id for the layout specified in the config file (default: sm,md or lg) |
|**`width`**         |`number`        |        |Card width in number of columns |
|**`height`**        |`number`        |        |Card height in number of rows   |

####Details
* The style property passes the height (without the title and a small footer) to the child component

####Discussion


####Sample
    var ReactWrapper = require('../dashboard/ReactWrapper');

    var component: {
      "name": "TestComponent",
      "displayName": "COMP_TITLE_TestComponent",
      "description": "COMP_DESC_TestComponent",
      "thumbnail" : "config/resources/images/ThumbTest.jpeg",
      "category": "Test",
      "require": ["../cards/TestComponent", "../customization/TestProperties"],
      "wrapper": "ReactWrapper",
      "pos": {
        "default": {
          "w": 4,
          "h": 3,
          "minW": 2,
          "maxW": 8,
          "minH": 2,
          "maxH": 8
        },
        "lg": {
          "w": 4,
          "h": 3
        },
        "md": {
          "w": 4,
          "h": 3
        },
        "sm": {
          "w": 3,
          "h": 2
        }
      },
      "parameters" : {
        "component": "TestComponent",
        "title": "Test component",
        "value": "Test value"
      },
      "customization": "TestProperties",
      "inbound": [{
        "from": "alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "condition-selected",
        "to": "asset/condition"
      }]
    };

    ReactDOM.render(
        <ReactWrapper inbound={result.inbound} outbound={result.outbound} parameters={component.parameters} type={component.name} layout={"md"} width={3} height={2}/>
    ), document.getElementById('id'));

####References
[ReactWrapper.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/dashboard/ReactWrapper.jsx)

