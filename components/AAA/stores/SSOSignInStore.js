var Reflux = require('reflux');
var Const = require('../../Dashboard/util/Const');
var $ = require('jquery');

var Actions = Reflux.createActions([
  'connect',
  'disconnect',
  'pause',
  'resume'
]);

var SSOSignInStore = Reflux.createStore({

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
    var url = "http://localhost:6004/ssoSignIn";
    var self = this;
    $.getJSON(url, function(ssoSignInData) {
    console.log(ssoSignInData);
    self.trigger(ssoSignInData);
      setTimeout(function() {
        self.poll();
      }, 5000);
    });
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

module.exports = SSOSignInStore;


