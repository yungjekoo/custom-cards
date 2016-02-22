nput field (component)

####Description
The input field component is a simple field for entering simple text of a common or special type (mail, url).

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`containerStyle`** |`object`        |        |Style object to overwrite the style of the root node|
|**`onChange`**      |`func`          |        |Callback on selection|
|**`initialValue`**  |`string`        |        |Initial string in the input filed|
|**`placeholder`**   |`string`        |        |Placeholder text when input field is empty|
|**`type`**          |`string`        |        |Specific type for validation (currently only "url" as special type)|

####Details
* Currently only type validation for url is implemented

####Discussion


####Sample
    var InputField = require('../components/InputField');

    ReactDOM.render(
        <InputField placeholder="Type here"></InputField>
    ), document.getElementById('id'));

####References
[InputField.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/components/InputField.jsx)

