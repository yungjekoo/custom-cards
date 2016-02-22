#Combobox (component)

####Description
The Combobox component is a combination of an entry field and a list to easily select a predefined entry. The entries of a Select component are represented by Option components.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`onChange`**      |`func`          |required|Callback on selection|
|**`initialValue`**  |`string`        |        |Initially selected option|

####Details
* The list of options is dynamically filtered by the the current text in the entry field (startsWith)
* The Combobox typically holds Option components
* If a custom option component is used an onSelect function is passed to each child and processed in the Combobox component (-> onSelect:function(value,label,event), where value is the specified prop and label the string or child element)

####Sample
    var ComboBox = require('../components/ComboBox');
    var Option = require('../components/Option');

    ReactDOM.render(
        <ComboBox onChange={this.onChange}>
            <Option value="1">Egon</Option>
            <Option value="2">Peter</Option>
            <Option value="3">John</Option>
            <Option value="4">Eric</Option>
            <Option value="5">Jim</Option>
            <Option value="6">Daniel</Option>
        </Select>
    ), document.getElementById('id'));

####References
[ComboBox.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/components/ComboBox.jsx)

