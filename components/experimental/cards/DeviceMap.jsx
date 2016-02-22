var React = require('react');
var RPT = React.PropTypes;
var Map = require('../../common/components/MapView.jsx');
var MapPin = require('../../common/components/MapPin.jsx');


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
    demo: RPT.bool
  },

  getDefaultProps: function() {
    return {
      showMyLocation: true
    };
  },

  getInitialState: function() {
    return {
      model: []
		};
  },

  componentDidMount: function() {
      if (this.props.demo) {
        var self = this;
        var createDemoData = function() {
          var model = [];
          for (var i = 0; i < 5; i++) {
            var item = {
              id: i,
            lng: (Math.random()*0.001-0.0005) + 11.575642,
            lat: (Math.random()*0.001-0.0005) + 48.137294
	    			};
            model.push(item);
          }
        self.setState({model: model});
	    	};
        setInterval(function() {
          createDemoData();
        }, 5000);
        createDemoData();
      }
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
    return (
      <Map width={this.props.wrapper.realWidth} height={this.props.wrapper.realHeight} showMyLocation={this.props.showMyLocation}>
        {this.state.model.map(function(pin) {
          return <MapPin lng={pin.lng} lat={pin.lat} id={pin.id} payload={pin.payload} icon={pin.icon}/>;
        })}
      </MapView>
    );
  }
});

module.exports = DeviceMap;
