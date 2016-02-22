var React = require('react');

var LoadIndicator = require('../../common/components/LoadIndicator.jsx');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var ToggleTile = require('../components/ToggleTile.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "15px 5px"
  }
}

var ToggleGroup = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    plots: RPT.array,
    iconType: RPT.string,
    invert: RPT.bool
  },

  getDefaultProps: function() {
    return {
    	iconType: "WINDOW",
      invert: false
    };
  },

  getInitialState: function() {
    return {
      model: {}
    }
  },

  componentDidMount: function() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var found = false;
    var model = {};

    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent &&
            payload.deviceEvent.deviceId == plot.device &&
            payload.deviceEvent.eventType == plot.event) {

          var property = IoTFDeviceStore.normalizeProperty(plot.property);
          var obj = payload.deviceEvent.data[property];

          if (obj !== undefined) {
            model[plot.id] = obj;
            found = true;
          }
        }
      }
    }
    if (found) {
      this.setState(model);
    }
  },

  render: function() {
  	var self = this;

    if (this.state) {

      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

      var items = [];

      for (var i in this.props.plots) {
        var plot = this.props.plots[i];
        var state = this.state[plot.id];
        var icon = null;
        if (state !== undefined) {
          if (this.props.invert) {
            state = !state;
          }
          icon = "/resources/images/" + this.props.iconType + "_" + (state?"ON":"OFF") + ".png";
        }
        var item = {
          id: plot.id,
          label: plot.label,
          value: state,
          icon: icon
        }
        items.push(item);
      }

      return (
        <div style={style}>
          {items.map(function(item) {
            return <ToggleTile key={item.id} theme={self.props.theme} icon={item.icon} state={!!item.value}>
              {item.label}
            </ToggleTile>
          })}
        </div>
      )
    } else {
      	return (
			<div style={styles.style}>
				<LoadIndicator theme={this.props.theme} useDataPoints={true}/>
			</div>
		)
    }
  }
});

module.exports = ToggleGroup;
