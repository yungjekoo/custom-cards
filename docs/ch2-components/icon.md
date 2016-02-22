#Icon (component)

####Description
The icon component displays a predefined icon.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`icon`**          |`string`        |required|Specifies the icon type|
|**`color`**         |`string`        |        |Color hex code for custom icon color|
|**`size`**          |`number`        |        |Custom icon size (default 24)|
|**`onClick`**       |`func`          |        |Custom function that is processed on click|


####Details
* Icon source http://dmfrancisco.github.io/react-icons/
* If no color is specified the theme colors are used
* If no theme colors are passed to the component "#5a5a5a" is used as a fallback
* following icons are currently available: delete, fullscreen-exit, fullscreen, remove, undo, settings, save, add-circle-outline, apps, info, dashboard, grade, lock, location, play-arrow, circle-filled, sync
* to add new icons copy the code from the icon source and place it in the renderGraphic function in the icon.js

####Discussion


####Sample
    var Icon = require('../components/Icon');

    ReactDOM.render(
           <Icon icon="info"
                 size=32
                 theme={this.props.theme}
                >
           </Icon>
    ), document.getElementById('id'));

####References
[Icon.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/components/Icon.jsx)

