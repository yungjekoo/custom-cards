var Reflux = require('reflux');
//var ibmiotf = require('ibmiotf');
var mqtt = require('mqttws31');
var $ = require('jquery');
var Const = require('../../Dashboard/util/Const');
var IoTFAuthStore = require('./IoTFAuthStore.js');

var Actions = Reflux.createActions([
	'fetchDevice',
	'fetchDevices',
	'startDeviceWatch',
	'stopDeviceWatch',
	'loadDeviceHistory',
	'startPropertyWatch',
	'stopPropertyWatch',
	'startEventWatch',
	'stopEventWatch'
]);

var State = {
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED"
};

var IoTFDeviceStore = Reflux.createStore({

	client: null,

	// keep track of watched objects
	watches: {
		devices: [],
		properties: []
	},

  deviceTypes: {},

	cache: {},

  historianRequests: [],

  historianRequestDelay: 100, // in millis

	lastValueInterval: 24 * 60 * 60 * 1000,   // look up last value in previous 24 hours

	Actions: Actions,

	auth: {
	},

  state: State.DISCONNECTED,

	init: function() {
		IoTFAuthStore.listen(this.onAuth);
		this.listenTo(Actions.fetchDevice, this.onFetchDevice);
	  this.listenTo(Actions.fetchDevices, this.onFetchDevices);
		this.listenTo(Actions.startDeviceWatch, this.onStartDeviceWatch);
		this.listenTo(Actions.stopDeviceWatch, this.onStopDeviceWatch);
		this.listenTo(Actions.startPropertyWatch, this.onStartPropertyWatch);
		this.listenTo(Actions.stopPropertyWatch, this.onStopPropertyWatch);
		this.listenTo(Actions.startEventWatch, this.onStartEventWatch);
		this.listenTo(Actions.stopEventWatch, this.onStopEventWatch);
	},

  onAuth: function(payload) {
      console.log("Retrieving auth:");
      this.auth = {
      ltpa: (payload.ltpa !== null) ? encodeURIComponent(payload.ltpa) : null,
        org: encodeURIComponent(payload.org),
        apiKey: (payload.apiKey !== null) ? encodeURIComponent(payload.apiKey) : null,
        apiToken: (payload.apiToken !== null) ? encodeURIComponent(payload.apiToken) : null
      };

    // auth was updated
    this.initClient();
    this.connectClient();
  },

	initClient: function() {
		var auth = IoTFAuthStore.getAuth();
		var randomNumber = Math.floor(Math.random() * 90000) + 10000;
		var clientId = 'a:' + auth.org + ':ptl' + randomNumber;

		var host = auth.org + ".messaging." + auth.domain;

		var port = 443;

		this.client = new window.Messaging.Client(host, port, clientId);

		var self = this;

		this.client.onMessageArrived = function(message) {
			if (message && message.payloadString !== "") {
				console.log("MQTT Client: Message Arrived on topic " + message.destinationName);

				var topic = message.destinationName;
				var typeId = topic.split("/")[2];
				var deviceId = topic.split("/")[4];
				var evtType = topic.split("/")[6];

				var data = JSON.parse(message.payloadString);

        // add to cache an flatten the structure
        var props = self.addToCache(deviceId, evtType, data, (new Date().getTime()));

        var payload = {};
        var timestamp = null;

        var keys = Object.keys(props);
        for (var i in keys) {
          var entry = props[keys[i]];
          payload[keys[i]] = entry.value;
          timestamp = entry.timestamp
        }

				self.trigger({
					deviceEvent: {
						deviceId: deviceId,
						eventType: evtType,
						data: payload,
            timestamp: (new Date(timestamp).toISOString())
					}
				});
			}
		};

		this.client.onConnectionLost = function(responseObj) {
			console.log("MQTT Client: Connection lost", responseObj);
			self.state = State.DISCONNECTED;
			setTimeout(function() {
				console.log("MQTT Client: Reconnecting...");
				self.connectClient();
			}, 100);
		};
	},

	connectClient: function() {
		var auth = IoTFAuthStore.getAuth();
		var self = this;
		var options = {
			onSuccess: function() {
				self.state = State.CONNECTED;
				console.log("MQTT Client: Successfully opened a connection to the MQTT broker");
				self.handlePendingSubscribes();
			},
			onFailure: function(error) {
				console.log("MQTT Client: An error occured whilst trying to open a connection to the MQTT broker");
				self.state = State.DISCONNECTED;
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
	},

	onFetchDevice: function() {
		// fetch device data
	},

	onFetchDevices: function() {
		var deviceUrl = "/api/v0002/bulk/devices";
		var opts = {
		  url: deviceUrl,
		  contentType: "application/json"
		};

		if (this.auth.apiKey !== null) {
			// if running as localhost
			opts.url += "?org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		}

		//console.log(opts);
		var self = this;
		$.ajax(opts)
		.done(function(response) {
		  //console.log(response);
		  try {
		    if (response.meta && response.meta.total_rows) {
		      self.trigger({
		        devices: response.results
		      });
		    } else {
		      // handle bad result?
		    }
		  } catch (e) { console.error(e); }
		})
		.fail(function(response) {
		  console.error(response);
		});
	},

	handlePendingSubscribes: function() {
		// handle subscribes that happened before connect
		var topic;
		for (var i in this.watches.devices) {
			topic = "iot-2/type/+/id/" + this.watches.devices[i] + "/evt/+/fmt/json";
			console.debug("subscribing to " + topic);
			this.client.subscribe(topic);
		}

		for (var j in this.watches.properties) {
			var deviceId = this.watches.properties[j].split("_|_")[0];
			var event = this.watches.properties[j].split("_|_")[1];
			topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
			console.debug("subscribing to " + topic);
			this.client.subscribe(topic);
		}
	},


  /**
  * Returns the cache object.
  */
  getCache: function() {
    return this.cache?this.cache:{};
  },

  /**
  * Get the last value and timestamp for a property from the cache
  */
  getFromCache: function(device, event, property) {
    var cache = this.getCache();
    var obj = cache[device];
    if (obj) {
      obj = obj[event];
      if (obj) {
        if (property) {
          return obj[property];
        } else {
          return obj;
        }
      }
    }
    return null;
  },

  /**
  * Caches all devices, events and property names to have something to prefill comboboxes.
  * Use this also to have the last value without extra query.
  */
  addToCache: function(device, event, data, timestamp) {
    if (!this.cache[device]) {
      this.cache[device] = {};
    }
    if (!this.cache[device][event]) {
      this.cache[device][event] = {};
    }
    var obj = this.cache[device][event];
    var props = this.generateListOfProperties(data,null, timestamp);
    if (props) {
      Object.assign(obj, props);
    }
    return props;
  },

  /*
  * Creates a flattened list of properties for the event data. Used for caching.
  */
  generateListOfProperties: function(data, prefix, timestamp) {
    var result = {};
    if (prefix) {
      prefix = prefix + ".";
    } else {
      prefix = "";
    }
    if (prefix == "d." || prefix == "g.") {
      prefix = "";
    }
    for (var i in data) {
      var item = data[i];
      if (typeof item == "object") {
        Object.assign(result, this.generateListOfProperties(item, prefix + i, timestamp));
      } else if (item !== undefined) {
        result[prefix + i] = {
          value: item,
          timestamp: timestamp
        }
      }
    }
    return result;
  },

  /*
  * Device watch will trigger when any message is received from the device.
  */
	onStartDeviceWatch: function(deviceId) {
		console.debug("onStartDeviceWatch -- ", deviceId);
		var topic = "iot-2/type/+/id/" + deviceId + "/evt/+/fmt/json";
		if (this.watches.devices.indexOf(deviceId) == -1) {
			this.watches.devices.push(deviceId);

			// is there already a connection? -> subscribe right away
			if (this.state == State.CONNECTED) {
				this.client.subscribe(topic);
			}

      // TODO Query history for full device
		}
	},

  /**
  * Strips of a leading d. or g. prefix. This is necessary since the historian returns the property names without prefix.
  * Therefore we have to normalize it.
  */
  normalizeProperty: function(property) {
    var hasPrefix = (property.indexOf("d.") === 0) || (property.indexOf("g.") === 0);
    if (hasPrefix) {
      property = property.substring(2);
    }
    return property;
  },

  /**
  * Same as normalizeProperty for the full payload of an MQTT message.
  */
  normalizePayload: function(payload) {
    if (payload && payload.d) {
      payload = payload.d;
    } else if (payload && payload.g) {
      payload = payload.g;
    }

    return payload;
  },

  /**
  * Unsubscribes from device watch.
  */
	onStopDeviceWatch: function(deviceId) {
		console.debug("onStopDeviceWatch -- ", deviceId);
		var topic = "iot-2/type/+/id/" + deviceId + "/evt/+/fmt/json";
		this.client.unsubscribe(topic);
		delete this.watches.devices[this.watches.devices.indexOf(deviceId)];
	},

  /**
  * Event watch will trigger when a specific event is received from the device.
  */
	onStartEventWatch: function(deviceId, event) {
		this.onStartPropertyWatch(deviceId, event, null);
	},

  /**
  * Unsubscribes from event watch.
  */
	onStopEventWatch: function(deviceId, event, property) {
		this.onStartPropertyWatch(deviceId, event, null);
	},

  /**
  * Checks if we are already watching this property.
  */
  isWatching: function(device, event, property) {
    return (this.watches.properties.indexOf(device + "_|_" + event + "_|_" + property) > -1);
  },

  /**
  * Checks if we already have a watch for this event since subscription is always on event level.
  * Counts the number of property watches for that event.
  */
  isWatchingEvent: function(device, event) {
    var count = 0;
    for (var i in this.watches.properties) {
      if (this.watches.properties[i].split("_|_")[0] === device &&
        this.watches.properties[i].split("_|_")[1] === event) {
          count++;
      }
    }
    return count;
  },

  /**
  * Add an entry in the list of watched properties.
  */
  addWatch: function(device, event, property) {
    this.watches.properties.push(device + "_|_" + event + "_|_" + property);
  },

  /**
  * Gets the device type for a device. This is necessary to make a historian request.
  * Therefore we handle multiple request in a list of callback.
  */
  getDeviceType: function(device, callback) {
    var self = this;

    // check if we have it in cache
    if (this.deviceTypes[device]) {
      var obj = this.deviceTypes[device];
      // We have an entry for this device type. This can be the deviceType itself or an array of
      // callbacks because others are already waiting for it.
      if($.isArray(obj)) {
        // Add the callback to the list.
        obj.push(callback);
      } else {
        // we already have a value -> return it
        callback(obj);
      }
      return;
    } else {
      // create an array of callback to handle multiple requestors
      this.deviceTypes[device] = [callback];
    }

    // handle callbacks for all requests
    var deliverDeviceType = function(deviceType) {
      var obj = self.deviceTypes[device];
      // set the value
      self.deviceTypes[device] = deviceType;

      // call the callbacks
      for (var i in obj) {
        obj[i](deviceType);
      }
    }

    // we do not have it in cache -> make a request
    // get credentials for historian request
    var auth = IoTFAuthStore.getAuth();
    auth = {
      ltpa: encodeURIComponent(auth.ltpa),
      org: encodeURIComponent(auth.org),
      apiKey: encodeURIComponent(auth.apiKey),
      apiToken: encodeURIComponent(auth.apiToken)
    };

    var deviceUrl = "/api/v0002/bulk/devices?deviceId="+device;
    var opts = {
      url: deviceUrl,
      contentType: "application/json"
    };
    if (auth.apiKey != null) {
      // if running as localhost
      opts.url += "&org="+auth.org+"&apiKey="+auth.apiKey+"&apiToken="+auth.apiToken;
    }
    var self = this;

    console.debug("getDeviceType -- ", device);

    $.ajax(opts)
    .done(function(response) {
      try {
        if (response.results && response.results[0] && response.results[0].typeId) {
          var typeId = response.results[0].typeId;
          deliverDeviceType(typeId);
        }
        else {
          // handle bad result?
          deliverDeviceType(null);
        }
      } catch (e) {
        console.error(e);
        deliverDeviceType(null);
      }
    })
    .fail(function(response) {
      console.error(response);
      deliverDeviceType(null);
    });
  },

  /**
  * Publishes the values in the cache for this property. Returns false if nothing found.
  */
  publishCachedValues: function(deviceId, event, property) {
    var data = this.getFromCache(deviceId, event, property);

    // Currently all calls are event calls without property

    if (property) {
      // This is a single property watch. Send only this property.
      if (data && data.value !== undefined) {
        var payload = {};
        payload[property] = data.value;
        this.trigger({
          deviceEvent: {
            deviceId: deviceId,
            eventType: event,
            data: payload,
            timestamp: (new Date(data.timestamp)).toISOString()
          }
        });
        return true;
      }
    } else {
      // This is an event watch. Send a payload for the whole event
      if (data){
        payload = {};
        var timestamp = null;

        var keys = Object.keys(data);
        for (var i in keys) {
          var entry = data[keys[i]];
          payload[keys[i]] = entry.value;
          timestamp = entry.timestamp
        }
        this.trigger({
          deviceEvent: {
            deviceId: deviceId,
            eventType: event,
            data: payload,
            timestamp: (new Date(timestamp).toISOString())
          }
        });
        return true;
      }
    }
    return false;
  },

  /**
  * Property Watch will trigger when a specific property (JSON) on an event is received from the device.
  * Used for property and event watch.
  */
	onStartPropertyWatch: function(deviceId, event, property) {
		console.debug("onStartPropertyWatch -- ", deviceId, event, property);
		var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";

    // remove d. and g. prefix
    if (property) {
      property = this.normalizeProperty(property);
    }

    // check before we modify the list of watches
    var alreadyWatchingEvent = this.isWatchingEvent(deviceId, event);

    // this is the first time somebody is subscribing for that property
		if (!this.isWatching(deviceId, event, property)) {
			this.addWatch(deviceId, event, property);

			// only subscribe if we are the first property watch to match this event
			if (this.isWatchingEvent(deviceId, event) === 1) {
				// is there already a connection? -> subscribe right away
				if (this.state == State.CONNECTED) {
					this.client.subscribe(topic);
				}
			}
    }

    // check if someone already requested that event
    if (alreadyWatchingEvent > 0) {
      // Somebody already subscribed for this property.
      // Option 1: We find something in cache
      // Option 2: There is nothing in cache, but there must be an inflight historian request -> just wait and do nothing

      // check if we find historic values in cache
      this.publishCachedValues(deviceId, event);
      return;
    } else {
      // This is the first request for this event. Make it an event request to avoid duplicate historian calls.
      property = null;
    }

    // TODO Avoid duplicate historian calls for multiple properties of an event

    // call historian API to fetch last value for this event

    // get credentials for historian request
    var auth = IoTFAuthStore.getAuth();
    auth = {
      ltpa: encodeURIComponent(auth.ltpa),
      org: encodeURIComponent(auth.org),
      apiKey: encodeURIComponent(auth.apiKey),
      apiToken: encodeURIComponent(auth.apiToken)
    };

    var self = this;
    this.getDeviceType(deviceId, function(deviceType) {
      // get the last 100 messages of that event to get the latest values
      var now = new Date().getTime();
      var historianUrl = "/api/v0002/historian/types/"+deviceType+"/devices/"+deviceId+"?evt_type="+event+"&start="+ (now - self.lastValueInterval) + "&end="+now;
      var opts = {
        url: historianUrl,
        contentType: "application/json"
      };
      if (auth.apiKey != null) {
        // if running as localhost
        opts.url += "&org="+auth.org+"&apiKey="+auth.apiKey+"&apiToken="+auth.apiToken;
      }

      console.debug(" -> query historian -- ", deviceId, event, property);

      // Queue the requests to avoid having 50 request at a time. This would result in slow interaction and
      // delayed image loading
      self.queueHistorianRequests(opts);

    });
	},

  /**
  * Do not send all historian requests at a time. Images would not load for seconds and UI would be slow.
  */
  queueHistorianRequests: function(opts) {
    var self = this;
    this.historianRequests.push(opts);
    if (!this.historianTimer) {
      this.historianTimer = setTimeout(function() {
        self.historianTimer = null;
        self.performHistorianRequest();
      }, this.historianRequestDelay);
    }
  },

  performHistorianRequest: function() {
    var self = this;
    if (this.historianRequests.length > 0) {
      if (!this.historianTimer) {
        this.historianTimer = setTimeout(function() {
          self.historianTimer = null;
          self.performHistorianRequest();
        }, this.historianRequestDelay);
      }

      var opts = this.historianRequests.shift();
      $.ajax(opts)
      .done(function(response) {
        try {
          if (response.events) {

            // add result to cache, beginning with oldest to the newest event
            var items = response.events;
            var deviceId = null;
            var event = null;
            for (var i = items.length - 1; i >= 0; i--) {
              var item = items[i];
              deviceId = item.device_id;
              event = item.evt_type;
              self.addToCache(item.device_id, item.evt_type, item.evt, item.timestamp["$date"])
            }

            self.publishCachedValues(deviceId, event);

          } else {
            // handle bad result?
          }
        } catch (e) {
          console.error(e);
        }
      })
      .fail(function(response) {
        console.error(response);
      });

    }
  },

	onStopPropertyWatch: function(deviceId, event, property) {
		console.debug("onStopPropertyWatch -- ", deviceId, event, property);
		delete this.watches.properties[this.watches.properties.indexOf(deviceId + "_|_" + event + "_|_" + property)];

		// only unsubscribe if there are no other properties watched on this event,
		// or if the event is being watched separately
		for (var i in this.watches.properties) {
			if (this.watches.properties[i].split("_|_")[0] === deviceId &&
				this.watches.properties[i].split("_|_")[1] === event) {
					return;
			}
		}

		var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
		console.debug("unsubscribing from " + topic);
		this.client.unsubscribe(topic);
	}
});

module.exports = IoTFDeviceStore;
