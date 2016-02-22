#Value label (card)

####Description:
The value card shows value and unit of a single device property. The size of the font automatically adapts to the available space. The component is listening to the device store and updates the value when new data is published.

![Value label card](https://github.ibm.com/IoT/iotf-react/blob/master/examples/public/style/images/ThumbValueLabel.png)
---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`wrapper`**       |`object`        |required|General information of the canvas provider|
|**`device`**        |`string`        |required|Device ID|
|**`property`**      |`string`        |required|Property ID|
|**`unit`**          |`string`        |        |Unit of the value|

####Details
* The device store is currently a sample implementation
* The metadata format of the devices is not yet defined in IoTF. This component and its interface will change.

####Discussion
[Comments on card](https://github.ibm.com/IoT/dashboard-component/issues/8)

####Sample
This component can only be used inside a card wrapper component
####References
[ValueLabel.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/cards/ValueLabel.jsx)
[ValueLabelProperties.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/customization/ValueLabelProperties.jsx)
[DeviceStore.js](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/stores/DeviceStore.js)

