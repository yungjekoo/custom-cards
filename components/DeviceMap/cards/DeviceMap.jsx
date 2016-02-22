var React = require('react');
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');
var Map = require('../components/MapView.jsx');
var MapPin = require('../components/MapPin.jsx');


/**
* Map to show device location
*/
var styles = {
  container: {
    height: "100%",
    width: "100%"
  }
};

var DeviceMap = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    showMyLocation: RPT.bool,
    type: RPT.string,
    maxZoom: RPT.number,
    longitude: RPT.string,
    latitude: RPT.string,
    plots: RPT.array,
    demo: RPT.bool
  },

  getDefaultProps: function() {
    return {
      showMyLocation: true,
      maxZoom: 18,
      type: "osm",
      plots: []
    };
  },

  getInitialState: function() {
    return {
    	model: []
	};
  },

  componentDidMount: function() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startEventWatch(plot.device, plot.event);
      }
    }
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var model = this.state.model;

    if (this.props.longitude && this.props.latitude) {
	    var found = false;
	    for (var i in this.props.plots) {
	    	var point = {};
	      var plot = this.props.plots[i];
	      if (plot) {
	        if (payload.deviceEvent &&
	            payload.deviceEvent.deviceId == plot.device &&
	            payload.deviceEvent.eventType == plot.event) {

	          var obj = Object.assign({}, payload.deviceEvent.data);

	      		point.lng = this.resolvePropertyPayload(obj, this.props.longitude);
	      		point.lat = this.resolvePropertyPayload(obj, this.props.latitude);
	      		point.id = plot.id;
	      		point.label = plot.label;
	      		found = true;
	      		if (point.lng && point.lat) {
	      			// remove old point
	      			for (var t in model) {
	      				if (point.id == model[t].id) {
	      					model.splice(t,1);
	      					break;
	      				}
	      			}
	      			model.push(point);
	      		}
	        }
	      }
	    }
	    if (found) {
	      this.setState({
	        model: model
	      });
	    }
    }
  },

  resolvePropertyPayload(obj, property) {
      var property = IoTFDeviceStore.normalizeProperty(property);
      var obj = obj[property];

      if (obj !== undefined) {
        return obj;
      } else {
      	return undefined;
      }
  },

  onClick: function(payload) {
    console.log("clicked: " + payload);
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
    var self = this;
    return (
    	<div style={style}>
	      <Map theme={this.props.theme} width={this.props.wrapper.realWidth} height={this.props.wrapper.realHeight} onClick={this.onClick} maxZoom={this.props.maxZoom} type={this.props.type} showMyLocation={this.props.showMyLocation}>
	        {this.state.model.map(function(pin) {
	          return <MapPin key={pin.id} theme={self.props.theme} lng={pin.lng} lat={pin.lat} id={pin.id} payload={{id: pin.id}}/>;
	        })}
	      </Map>
    	</div>
    );
  }
});

module.exports = DeviceMap;
