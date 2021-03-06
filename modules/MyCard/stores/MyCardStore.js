/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Frank Leo Mielke - Initial Contribution
*****************************************************************************/
var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'sayHello'
]);

var MyCardStore = Reflux.createStore({

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

module.exports = MyCardStore;
