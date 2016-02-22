#Label (component)

####Description
The label component identifies or describes a related (form) component. Examples for these could be input fields, selects or combo boxes.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`label`**         |`string`        |        |The actual label content |
|**`labelFor`**      |`string`        |        |Specifies the related (form) component|
|**`customContainerStyle`** |`obj`    |        |Style container that affects the outer container|

####Details
* The label component wraps the related component

####Discussion

####Sample
    var Label = require('../components/Label ');
    var InputField= require('../components/InputField');

    ReactDOM.render(
           <Label label='Username' theme={this.props.theme}>
                <InputField theme={this.props.theme} placeholder="Type here"></InputField>
           </Label>
    ), document.getElementById('id'));

####References
[Label.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/components/Label.jsx)

