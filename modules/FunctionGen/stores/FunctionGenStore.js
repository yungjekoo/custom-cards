/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Marcus Kamieth - Initial Contribution
*****************************************************************************/
var Reflux = require('reflux');
var DeviceWrapper = require('../device-simulator/DeviceWrapper.js');
var Actions = Reflux.createActions([
  'setCredentials',
  'changeFrequency',
  'functionToggle',
  'stopDevices'
]);
/*function generator store
* this store stores the required state as a list of device wrappers
* it listens to actions fired on the card and forwards them to the right
* device
*/
var FunctionGenStore = Reflux.createStore({

  Actions: Actions,
  deviceWrappers: [],

  init: function() {
    this.listenTo(Actions.changeFrequency, this.onChangeFrequency);
    this.listenTo(Actions.setCredentials, this.onSetCredentials);
    this.listenTo(Actions.functionToggle, this.onFunctionToggle);
    this.listenTo(Actions.stopDevices, this.onStopDevices);
    var self = this;
  },
  onSetCredentials : function(plots){
    this.deviceWrappers = [];
    for(var i in plots){
      var plot = plots[i];
      var deviceWrapper = new DeviceWrapper(plot.device);
      deviceWrapper.setDeviceCredentials(plot.device, plot.deviceType);

      this.deviceWrappers.push(deviceWrapper);
    }
  },
  onChangeFrequency : function(devicePlotIndex, newFrequency) {
    if(this.deviceWrappers.length > devicePlotIndex){
      var deviceWrapper = this.deviceWrappers[devicePlotIndex];
      deviceWrapper.setDataPerSecond(newFrequency);
    }
  },

  onFunctionToggle : function(devicePlotIndex, name, state){
    if(this.deviceWrappers.length > devicePlotIndex){
      var deviceWrapper = this.deviceWrappers[devicePlotIndex];
      deviceWrapper.toggleFunction(name, state);
    }
  },

  onStopDevices : function(){
    for(var i in this.deviceWrappers){
      this.deviceWrappers[i].stop();
    }
  }

});

module.exports = FunctionGenStore;
