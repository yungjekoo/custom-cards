var Reflux = require('reflux');
var Const = require('../../Dashboard/util/Const');
var $ = require('jquery');

var Actions = Reflux.createActions([
  'connect',
  'disconnect',
  'pause',
  'resume'
]);

var AAAStore = Reflux.createStore({

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

  poll: function() {
    var url = "http://localhost:6004/sso";
    var self = this;
    $.getJSON(url, function(ssoData) {
    console.log(ssoData);
    self.trigger(ssoData);
      setTimeout(function() {
        self.poll();
      }, 5000);
    });
   },

  changeState: function() {
    this.trigger({state: this.state});
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

module.exports = AAAStore;
