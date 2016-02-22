#Push button (card)

####Description
The card presents a single button triggers a specified action. For now, no actions can be chosen in the UI, but the component can be extended programmatically.

---
####Properties
|Property            |Type            |Required|Description|
|:-------------------|:---------------|:-------|:----------|
|**`theme`**         |`object`        |required|Global theme|
|**`style`**         |`object`        |        |Style object to overwrite the style of the root node|
|**`subtext`**       |`string`        |        |Text under the button|
|**`action`**       |`string`        |        |Action to be executed on click|
|**`icon`**       |`string`        |        |Specifies the icon on the card (for currently available icons look in the icon component)|

####Details
*  Is extended by the dashboard link card

####Discussion


####Sample
    Is only used in the card wrapper

####References
[PushButtonCard.jsx](https://github.ibm.com/IoT/iotf-react/blob/master/components/Dashboard/cards/PushButtonCard.jsx)

