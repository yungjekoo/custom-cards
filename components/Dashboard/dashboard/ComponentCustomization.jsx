var React = require('react');
var DashboardStore = require('./DashboardStore');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var Actions = require('./Actions.jsx');
var Reflux = require('reflux');
var IconLink = require('../../common/components/IconLink.jsx');
var ColorSelection = require('../../common/components/ColorSelection.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var CustomizationWizard = require('./CustomizationWizard.jsx');


var RPT = React.PropTypes;

var ComponentCustomization = React.createClass({
  propTypes: {
        id: RPT.string,
        action: RPT.string,
        type: RPT.string,
        style: RPT.object,
        nls: RPT.object,
        theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      id: null,
      type: name,
      action: null
    };
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
    DashboardStore.listen(this.onModelUpdate);
    IoTFDeviceStore.listen(this.onModelUpdate);
    IoTFDeviceStore.Actions.fetchDevices();
    console.log(this.props.id,this.props.type);
    Actions.getComponent({id: this.props.id, type: this.props.type});
    Actions.getCategories();
  },

  onModelUpdate: function(payload) {
    var model = {};
    if (payload.component) {
      model.component = payload.component;
      if (!this.state.devices ||this.state.devices.length === 0) {
        model.devices = this.createDeviceListForPlots(payload.component);
      }
    }
    if(payload.devices){
      var devices = this.setSelectionInDevices(payload.devices);
      model.devices = devices;
    }
    if (payload.categories) {
      model.categories = payload.categories;
    }
    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onChangeType: function(type) {
    Actions.getComponent({id: this.props.id, type: type.name});
  },

  onSubmit: function() {
    var parameters = Object.assign({}, this.state.component.parameters, this.customElement.state);
    var payload = {
      id: this.props.id,
      type: this.state.component.name,
      parameters: parameters
    };
    console.log("WRAPPER PAYLOAD",payload);
    //Actions.configureComponent(payload);
  },

  onCustomMounted: function(element) {
    this.customElement = element;
  },

  setSelectionInDevices: function(devices) {
    var result = [];
    var dataSets = this.state.component.parameters.plots?this.state.component.parameters.plots:[];
    for (var i in devices) {
      var device = devices[i];
      var found = false;
      for (var t in dataSets) {
        var dSet = dataSets[t];
        if(dSet.device == device.deviceId) {
          result.push({id:device.deviceId,type:device.typeId,active:true});
          found = true;
          break;
        }
      }
      if (!found) {
        result.push({id:device.deviceId,type:device.typeId,active:false});
      }
    }
    return result;
  },

  // create a device list before we have the result of the devices call
  createDeviceListForPlots: function(component) {
    if (!component) {component = this.state.component;}
    var result = [];
    var dataSets = component.parameters.plots?component.parameters.plots:[];
    var device;
    var fnct = function(item) {
      return item.id == device.id;
    }
    for (var i in dataSets) {
      device = dataSets[i];
      var found = result.filter(fnct);
      if (found.length === 0) {
          result.push({id:device.device,type:"",active:true});
      }
    }
    return result;
  },

  render: function() {

    var self = this;
    var component = null;
    if (this.state.component) {
      component = this.state.component;
      var customization = "";

        customization = CustomizationWizard;

        customization = React.createElement(customization, Object.assign({}, {component: component}, {devices: this.state.devices,onChangeType:this.onChangeType, categories: this.state.categories, scheme: component.parameters.scheme, title: component.parameters.title, id: this.props.id, onSubmit: this.onSubmit, onCancel: this.onCancel, ref: this.onCustomMounted, nls: this.props.nls, theme:this.props.theme}));

      return (customization);
    } else {
      return <div/>;
      //return (<DashboardDialog theme={this.props.theme}>No components found</DashboardDialog>);
    }
  }
});

module.exports = ComponentCustomization;
