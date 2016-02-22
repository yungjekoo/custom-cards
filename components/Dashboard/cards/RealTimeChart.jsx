var d3 = require('d3');
var React = require('react');
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var LineChart = require('../../common/components/LineChart.jsx');

/**
* Realtime chart
*/
var styles = {
  container: {
    height: "100%",
    width: "100%",
    color: "black",
    padding: "20px"
  }
};

var RealTimeChart = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    range: RPT.number,
    autoscroll: RPT.bool,
    overview: RPT.bool,
    stacked: RPT.bool,
    steps: RPT.bool,
    threshold: RPT.number
  },

  getDefaultProps: function() {
    return {
      plots: [],
      range: 60,
      threshold: 300,
      autoscroll: true,
      overview: true,
      stacked: false,
      steps: false
    };
  },

  getInitialState: function() {
    return {
      data: {}
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

    var self = this;

    // if (this.props.demo) {
    // 	setInterval(function() {
    // 		self.updateGraph([
    // 			(new Date().getTime()),
    // 			Math.round(Math.random()*(100 - (-100)) + -100)
    // 		]);
    // 	}, 1000);
    // }

  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var data = { timestamp: new Date().getTime()};
    var found = false;
    var count = 0;
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent &&
            payload.deviceEvent.deviceId == plot.device &&
            payload.deviceEvent.eventType == plot.event) {

          var property = IoTFDeviceStore.normalizeProperty(plot.property);
          var obj = payload.deviceEvent.data[property];

          if (obj !== undefined) {
            data[plot.id] = obj;
            found = true;
          }
        }
      }
    }
    if (found) {
      this.setState({
        data: data
      });
    }
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
    return (
      <div style={style} onMouseOver={this.onEnter} onMouseOut={this.onLeave}>
        <LineChart
          theme={this.props.theme}
          data={this.state.data}
          plots={this.props.plots}
          height={this.props.wrapper.realHeight - 40}
          width={this.props.wrapper.realWidth - 40}
          overview={this.props.overview && this.props.wrapper.height == 4 && this.props.wrapper.width > 2}
          range={this.props.range}
          legend={this.props.wrapper.height == 4}
          small={this.props.wrapper.width < 3}
          autoscroll={this.props.autoscroll}
          stacked={this.props.stacked}
          steps={this.props.steps}
          threshold={this.props.threshold}
        >
        </LineChart>
      </div>
    );
  }
});

module.exports = RealTimeChart;
