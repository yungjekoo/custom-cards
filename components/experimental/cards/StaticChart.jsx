var React = require('react');
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var StaticChartComponent = require('../../common/components/StaticChart.jsx');

/**
* Static chart
*/
var styles = {
  container: {
  	width: "100%",
  	height: "100%"
  }
};

var StaticChart = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    type: RPT.string,
    title: RPT.string,
    horizontal: RPT.bool
  },

  getDefaultProps: function() {
    return {
            "plots": [],
            "type": "bar"
    };

  },

  getInitialState: function() {
  	return {
            data: [],
            names: {}
    };
  },

  componentDidMount: function() {
    IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  onUpdate: function(payload) {
    var found = false;
    var data = this.state.data;
    var names = Object.assign({}, this.state.names);

    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent &&
            payload.deviceEvent.deviceId == plot.device &&
            payload.deviceEvent.eventType == plot.event) {

          var obj = Object.assign({}, payload.deviceEvent.data);
          var propertyPieces = plot.property.split(".");
          for (var j in propertyPieces) {
            var piece = propertyPieces[j];
            obj = obj[piece];
            if (obj === undefined) {
              break;
            }
          }
          //console.log(obj);

          if (obj !== undefined) {
            var newData = [plot.id, obj];
            var replaced = false;
            for (var t in data) {
              if (data[t][0] == plot.id) {
                data.splice(t,1, newData);
                replaced = true;
                break;
              }
            }
            if (!replaced) {
              data.push(newData);
            }
            names[plot.id] = plot.label;
            found = true;
          }
        }


      }
    }
    if (found) {
      this.setState({
      	data: data,
      	names: names
      });
    }
  },

  render: function() {
    // line
    // spline
    // step
    // area
    // area-spline
    // area-step
    // bar
    // scatter
    // pie
    // donut
    // gauge

    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
    return (
    	<div style={style}>
	      <StaticChartComponent
	        theme={this.props.theme}
	        data={this.state.data}
	        names={this.state.names}
	        type={this.props.type}
	        title={this.props.title}
          horizontal={this.props.horizontal}
          height={this.props.wrapper.realHeight}
          width={this.props.wrapper.realWidth}
	      >
	      </StaticChartComponent>
    	</div>
    );
  }
});

module.exports = StaticChart;
