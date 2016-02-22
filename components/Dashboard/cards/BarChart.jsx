var React = require('react');
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var BarChartComponent = require('../../common/components/BarChart.jsx');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');

/**
* Static chart
*/
var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px"
  }
};

var BarChart = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    title: RPT.string,
    horizontal: RPT.bool
  },

  getDefaultProps: function() {
    return {
            "plots": []
    };

  },

  getInitialState: function() {
    return {
            data: [],
            names: {},
            unit: "",
            precision: 0
    };
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
    var data = this.state.data;
    var names = Object.assign({}, this.state.names);
    var unit = null;
    var precision = 0;

    // get first unit and precision
    for (var i in this.props.plots) {
      if (this.props.plots[i].unit) {
        unit = this.props.plots[i].unit;
      }
      if (this.props.plots[i].precision) {
        precision = this.props.plots[i].precision;
      }
    }

    for (var j in this.props.plots) {
      var plot = this.props.plots[j];
      if (plot) {
        if (payload.deviceEvent &&
            payload.deviceEvent.deviceId == plot.device &&
            payload.deviceEvent.eventType == plot.event) {


          var property = IoTFDeviceStore.normalizeProperty(plot.property);
          var obj = payload.deviceEvent.data[property];

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
        names: names,
        unit: unit,
        precision: precision
      });
    }
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    if (this.state.data && this.state.data.length > 0) {
	    return (
	      <div style={style}>
	        <BarChartComponent
	          theme={this.props.theme}
	          data={this.state.data}
	          names={this.state.names}
	          title={this.props.title}
	          horizontal={this.props.horizontal}
	          unit= {this.state.unit}
	          precision={this.state.precision}
	          height={this.props.wrapper.realHeight - 40}
	          width={this.props.wrapper.realWidth - 40}
	          small={this.props.wrapper.width == 2 || this.props.wrapper.height == 2}
	        >
	        </BarChartComponent>
	      </div>
	    );
    } else {
    	return (
		    	<div style={style}>
			    	<LoadIndicator theme={this.props.theme} useDataPoints={true}/>
		    	</div>
    		)
    }
  }
});

module.exports = BarChart;
