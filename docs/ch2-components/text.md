#Text (component)

####Description
The Text component simply displays some text.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`fontSize`**      |`number`        |        |Specifies the font size|
|**`alignment`**     |`string`        |        |Specifies the vertical alignment of the text|

####Details
* so simple ...

####Discussion

####Sample
    var SimpleText= require('../components/SimpleText');

    ReactDOM.render(
       <SimpleText fontSize={48} alignment={'middle'} >Simple text content</SimpleText>
    ), document.getElementById('id'));

####References
[SimpleText.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/components/SimpleText.jsx)

