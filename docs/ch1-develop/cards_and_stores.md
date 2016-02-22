Cards and stores

A React component renders props and states. It does not care about where this data comes from. A data store retrieves, handles and processes the data by request of a component. As a result, the component receives a notification with the requested information from the data store. This is, in a nutshell, the Flux architectural pattern. The dashboard uses Reflux for the internal processing, which is a library for a simplified Flux pattern.

![](https://qph.is.quoracdn.net/main-thumb-t-1510640-200-erakuyeoiqmjazaunpzxyjspodmujvur.jpeg)

If you want to access and process data, you will have to write your own data store or use an existing one. The existing stores are in folder `stores`.

You can use an other technology instead of Reflux if you create your own store. The basic pattern for the Reflux based stores is

- Define a set of actions
- Create a data store that listens to these actions
- Create a card that listens to event from the data store
- Call the action from inside the card, e.g. during initialization or as consequence of a user interaction

Interesting examples as template for stores are e.g.

`stores/IoTFDeviceStore.js` which uses an MQTT connection to retrieve live data and
`stores/DeviceStore.js` which uses a REST API call every 5 seconds to get data
