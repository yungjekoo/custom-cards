var Reflux = require('reflux');
var $ = require('jquery');
var Const = require('../../Dashboard/util/Const');

var Actions = Reflux.createActions([
  'connect',
  'disconnect',
  'pause',
  'resume'
]);

var DeviceStore = Reflux.createStore({

  Actions: Actions,

  state: Const.DISCONNECTED,

  init: function() {
    this.listenTo(Actions.connect, this.onConnect);
    this.listenTo(Actions.disconnect, this.onDisconnect);
    this.listenTo(Actions.pause, this.onPause);
    this.listenTo(Actions.resume, this.onResume);

    this.trigger({state: Const.DISCONNECTED});
  },

  onConnect: function(payload) {
    if (this.state == Const.DISCONNECTED) {
      this.state = Const.CONNECTED;
      this.changeState();
      this.poll();
    }
  },

  changeState: function() {
    this.trigger({state: this.state});
  },

  poll: function() {
    var url = "http://iotfcommondashboarddev.mybluemix.net/devices";
    //var url = "http://flm.mybluemix.net/devices";
    //var url = "http://localhost:6005/devices";
    //var url="https://mymielkeips.mybluemix.net/deviceSDP.php?id=" + this.device + "&raw=true";
    var self = this;
    $.getJSON(url, function(result) {
      self.transformData(result);
      var map = self.createMap(result);
      for (var key in map) {
        var entry = map[key];
        if (entry) {
          self.trigger({device: key, model: entry});
        }
      }
      setTimeout(function() {
        self.poll();
      }, 5000);
    });
  },

  transformData: function(data) {
    if (data["26877-POWER"] < 0) {
      data["26877-POWER"] = Math.abs(data["26877-POWER"]);
    }
  },

  createMap: function(result) {
    var map = {};
    var keys = Object.keys(result);
    for (var i in keys) {
      var key = keys[i];
      var value = result[key];
      var tokens = key.split("-");
      if (tokens.length > 1) {
        var device = tokens[0];
        if (!map[device]) {
          map[device] = {};
        }
        map[device][key] = value;
      }
    }
    return map;
  },

  onDisconnect: function(payload) {
    this.trigger({state: Const.DISCONNECTED});
  },

  onPause: function(payload) {
    this.trigger({state: Const.PAUSED});
  },

  onResume: function(payload) {
    this.trigger({state: Const.CONNECTED});
  }
});

module.exports = DeviceStore;
