#Select (component)

####Description
The Select component is a simple list to select an entry. Higher level components like Combobox and DropDown use the Select component. The entries of a Select component are represented by Option components.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`onChange`**      |`func`          |required|Callback on selection|

####Details
* The initial selection of the Select component is specified with the select attribute of the Option component
* The Select component will soon be enhanced to show custom components in the Options.

####Discussion
[Comments on component](https://github.ibm.com/IoT/dashboard-component/issues/8)

####Sample
    var Select = require('../components/Select');
    var Option = require('../components/Option');

    ReactDOM.render(
        <Select onChange={this.onChange}>
            <Option value="1">Egon 1</Option>
            <Option value="2">Egon 2</Option>
            <Option value="3" selected={true}>Egon 3</Option>
            <Option value="4">Egon 4</Option>
            <Option value="5">Egon 5</Option>
            <Option value="6">Egon 6</Option>
        </Select>
    ), document.getElementById('id'));

####References
[Select.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/components/Select.jsx)

