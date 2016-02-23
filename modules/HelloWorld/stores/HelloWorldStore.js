var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'sayHello'
]);

var HelloWorldStore = Reflux.createStore({

  Actions: Actions,
  helloCount: 0,

  init: function() {
    this.listenTo(Actions.sayHello, this.onSayHello);
    var self = this;
    setInterval(function() {
    	self.helloCount++;
    	self.trigger({
    		helloCount: self.helloCount
    	});
    }, 1000);
  },

  onSayHello: function(payload) {
    this.trigger({
    	helloMessage: "Hello from the store!",
    	helloCount: this.helloCount
    });
  }

});

module.exports = HelloWorldStore;
