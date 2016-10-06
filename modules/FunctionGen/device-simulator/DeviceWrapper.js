'use strict';
var IoTFAuthStore = IoTFCommon.IoTFAuthStore;
//collection of simple functions used as data
var MyMath = require('./MyMath.js');
/*
* device wrapper
* this object corresponds to a simulated device
* it creates a mqtt-client on the topic 'status' and sends data based on
* frequency / dataPerSecond and function configuration (enabled/disabled)
* as the frequency is created by setTimeout, 250 - 1000 will be the threshold
* where based on the browser sending at that frequency makes no difference at all
* as an update, the time taken for calculation gets substracted from the timeout
* such that the interval between events is enhanced.
*/
function DeviceWrapper(debugName) {
  // name is only used in debugging and logging to identify different devices
  this.name = debugName;
  this.client = {};
  this.isConnected = false;
  // Frequency of published data in Hz
  this.dataPerSecond = 1;
  // used to abort a timeout, when the interval changes
  this.timer = 0;
  //used for measuring time to enhance timeouts
  this.t_now = new Date().getTime();
  this.t_last = this.t_now - (1000 / this.dataPerSecond);
  //to set, whether the given function shall be sent or not
  this.functionConfig = {
    "sin" : false,
    "cos" : false,
    "sawTooth" : false,
    "sawToothBack" : false,
    "triangle" : false,
    "boolean" : false,
    "string" : false,
    "random" : false
  };
  //used both in subscribe and unsubscribe
  this.topicToSubscribe = "";
  // Quality of Serive for the publish event. Supported values : 0, 1, 2
  this.QosLevel = 0;
  // defines the topic to subscribe/send to, org (IoTFAuthStore),
  //device id and device type are set in setDeviceCredentials
  this.iotfConfig = {
    "org" : "",
    "id" : "",
    "type" : "",
    "topic" : "status"
  };
  //set frequency
  this.setDataPerSecond = function(data){
    this.dataPerSecond = Math.abs(data);
    clearTimeout(this.timer);
    this.t_now = new Date().getTime();
    this.t_last = this.t_now - (1000 / this.dataPerSecond);
    if(data > 0){ //negative values make no sense here, whereas 0 corresponds to not sending any data
      this.timer = this.startTimer(0);
    }

  };
  this.setDeviceCredentials = function(device_id, device_type){
    this.iotfConfig.org = IoTFAuthStore.getAuth().org;
    this.iotfConfig.id = device_id;
    this.iotfConfig.type = device_type;
  };
  this.toggleFunction = function(name, toggleState){
    if(this.functionConfig[name] != null){
      this.functionConfig[name] = toggleState;
    } else {
      console.error("undefined function in function generator: " + name);
    }
  };
  //initialize the DeviceWrapper and connect via mqtt
  this.setUp = function (){
    //var auth = DeviceWrapper.auth;
    var auth = IoTFAuthStore.getAuth();
    var hostName = auth.org + ".messaging." + auth.domain;
    var port = 443;

    var randomNumber = Math.floor(Math.random() * 90000) + 10000;
    var clientId = 'a:' + auth.org + ':ptl' + randomNumber;//a:org_id:app_id
    this.client = new Messaging.Client(hostName, Number(port), clientId);

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0)
        console.log("onConnectionLost:"+responseObject.errorMessage);
    };
    function onMessageArrived(message) {
      //console.log("onMessageArrived:"+message.payloadString);
    };
    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = onMessageArrived;

    var self = this;
    var options = {
      onSuccess: function() {
        self.isConnected = true;
        console.log("MQTT Client: Successfully opened a connection to the MQTT broker");
        self.topicToSubscribe = "iot-2/type/" + self.iotfConfig.type
          + "/id/" + self.iotfConfig.id + "/evt/"
          + self.iotfConfig.topic + "/fmt/json";
        self.client.subscribe(self.topicToSubscribe);
        //self.handlePendingSubscribes();
      },
      onFailure: function(error) {
        console.log("MQTT Client: An error occured whilst trying to open a connection to the MQTT broker");
        console.log(error);
        self.isConnected = false;
      },
      useSSL: true,
      cleanSession: true
    };

    if (auth.ltpa) {
      options.userName = "use-ltpa-token";
      options.password = auth.ltpa;
    } else if (auth.apiKey) {
      options.userName = auth.apiKey;
      options.password = auth.apiToken;
    } else {
      throw new Error("No LTPA token or API key defined for connection");
    }

    this.client.connect(options);

    var x = 0;
    this.timer = this.startTimer(x);
    //clearTimeout(timer)
  };
  //gather requested payload based on functionConfig
  this.getPayload = function(x) {
    var payload = {};
    if(this.functionConfig.sin){
      payload.sin = Math.sin(x);
    }
    if(this.functionConfig.cos){
      payload.cos = Math.cos(x);
    }
    if(this.functionConfig.sawTooth){
      payload.sawTooth = MyMath.sawTooth(x);
    }
    if(this.functionConfig.sawToothBack){
      payload.sawToothBack = MyMath.sawToothBack(x);
    }
    if(this.functionConfig.triangle){
      payload.triangle = MyMath.triangle(x);
    }
    if(this.functionConfig.boolean){
      payload.boolean = MyMath.booleanFunc(x);
    }
    if(this.functionConfig.string){
      payload.string = MyMath.stringFunc(x);
    }
    if(this.functionConfig.random){
      payload.random = Math.random()*100;
    }
      // "timestamp": (new Date()).getTime(),
      // "x": x
    return payload;
  };
  //callback for setTimeout
  this.sendDataAtInterval = function(x=0) {
    this.t_last = this.t_now;
    this.t_now = new Date().getTime();
  //  console.log("/\\  " + (this.t_now - this.t_last));
    //console.log(this.isConnected + " " + x + "("+this.name+")");
    if (this.isConnected) {
      //console.log("." + x + " / " + this.dataPerSecond);
      var payload = this.getPayload(x);
      //console.log(Object.keys(payload).length);
      if(Object.keys(payload).length > 0){
        var message = new Messaging.Message(JSON.stringify(payload) );
        message.destinationName = this.topicToSubscribe;
        //console.log(message);
        this.client.send(message);
        x = x + 0.2 / this.dataPerSecond;
      }
    }
    this.timer = this.startTimer(x);
  }
  //call setTimeout repeatedly to create frequency-changeable intervals
  this.startTimer = function(x){
    //return setTimeout(this.sendDataAtInterval.bind(this,x), 1000 / this.dataPerSecond); //without time adjustment
    //var timeout_actual = this.t_now - this.t_last;
    //var timeout_target = (1000 / this.dataPerSecond);
    //var err_variance =  0.5 * (timeout_actual - timeout_target); // pos delay, neg too short,
    //with k_p=0.5 see proportional control to reduce oscilleration
    //var correct_timeout = timeout_target - err_variance;
    return setTimeout(this.sendDataAtInterval.bind(this,x),  Math.max(
      1.5 * (1000 / this.dataPerSecond) + 0.5 * this.t_last - 0.5 * this.t_now, // correct_timeout
      0));
  }
  this.stop = function() {
    clearTimeout(this.timer);
    this.client.unsubscribe(this.topicToSubscribe);
    this.client.disconnect();
  };

  //call setUp as initialization
  this.setUp();
}
module.exports = DeviceWrapper;
