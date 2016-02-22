var d3 = require('d3');
var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var GaugeComponent = require('../../common/components/Gauge.jsx');
var CardIndicator = require('../../common/components/CardIndicator.jsx');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');

/**
* Flexible gauge.
*/
var styles = {
  container: {
    height: "100%",
    width: "100%"
  },
    waiting: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: "20px"
    },
    gauge: {
      marginTop: "15px"
    },
    dataPoint: {
      marginTop: "5px",
      marginLeft: "30px"
    },
    miniContainer: {
      width: "100%",
      height: "15px",
      position: "absolute",
      bottom: "0px"
    },
    miniBar: {
      height: "100%",
      position: "relative"
    }
};

var Gauge = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    minDegree: RPT.number,
    maxDegree: RPT.number,
    plots: RPT.array,
    major: RPT.string,
    needle: RPT.bool,
        lowerThresholdMeaning: RPT.string,
        middleThresholdMeaning: RPT.string,
        upperThresholdMeaning: RPT.string,
        lowerThreshold: RPT.number,
        upperThreshold: RPT.number
  },

  getDefaultProps: function() {
    return {
      plots: [],
      minDegree: 45,
      maxDegree: 315,
      needle: false
    };
  },

  getInitialState: function() {
    return {
      value: 0
    };
  },

  componentDidMount: function() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    if (this.props.plots && this.props.plots.length > 0) {
      var plot = this.getPlot();
          IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
    }

    if (this.props.demo) {
      // var self = this;
      // setInterval(function() {
      //   self.updateSVG(Math.round(Math.random()*(self.props.max - self.props.min) + self.props.min))
      // }, 1000);
    }
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },


  getPlot: function() {
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot.id == this.props.major) {
        return plot;
      }
    }
    // fallback
    if (this.props.plots.length > 0) {
      return this.props.plots[0];
    } else {
      return null;
    }
  },

  onUpdate: function(payload) {
    //console.log("onUpdate", payload.deviceEvent.deviceId, payload.deviceEvent.eventType, this.props);
    if (this.props.plots && this.props.plots.length > 0) {
      var plot = this.getPlot();

      if (payload.deviceEvent &&
          payload.deviceEvent.deviceId == plot.device &&
          payload.deviceEvent.eventType == plot.event) {

        var property = IoTFDeviceStore.normalizeProperty(plot.property);
        var obj = payload.deviceEvent.data[property];

        if (obj !== undefined) {
          this.setState({
            value: obj
          });
        }
      }
    }
  },

  render: function() {
    var self = this;
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
    var plot = this.getPlot();

    if (this.state.value !== undefined && plot) {
      var width = this.props.wrapper.realWidth;
      var height = this.props.wrapper.realHeight;
      if (this.props.wrapper.width == 2) {
        width = 280;
        height = 280;
      } else {
        width = 300;
        height = 300;
      }

      // handle thresholds
      var condition = "";
      var indicatorText = "";
      if (this.props.lowerThresholdMeaning && this.state.value <= this.props.lowerThreshold) {
        condition = this.props.lowerThresholdMeaning;
        indicatorText = "Threshold is " + this.props.nls["THRESHOLD_" + this.props.lowerThresholdMeaning];
      } else if (this.props.middleThresholdMeaning && this.state.value > this.props.lowerThreshold && this.state.value < this.props.upperThreshold) {
        condition = this.props.middleThresholdMeaning;
        indicatorText = "Threshold is " + this.props.nls["THRESHOLD_" + this.props.middleThresholdMeaning];
      } else if (this.props.upperThresholdMeaning && this.state.value >= this.props.upperThreshold) {
        condition = this.props.upperThresholdMeaning;
        indicatorText = "Threshold is " + this.props.nls["THRESHOLD_" + this.props.upperThresholdMeaning];
      }

      var indicator = "";
      var gauge = "";
      var miniGauge = "";
      var dataPoint = "";

      if (this.props.wrapper.height == 1 && plot) {
        dataPoint = <CardDatapoint theme={this.props.theme} unit={plot.label} style={styles.dataPoint}>
                  {(plot.precision !== undefined)?this.state.value.toFixed(plot.precision):this.state.value}{plot.unit?" "+plot.unit:""}
                </CardDatapoint>;
          var percentage = (Math.floor(this.state.value-plot.min)/(plot.max-plot.min)*100);
          var miniBar = Object.assign({}, styles.miniBar, {backgroundColor: this.props.theme.normal, width: percentage + "%"});
          var miniContainer = Object.assign({}, styles.miniContainer, {backgroundColor: this.props.theme.minor});
          miniGauge = <div style={miniContainer}>
                  <div style={miniBar}/>
                </div>;
      } else{
        if (condition) {
          indicator = <CardIndicator
                    theme={this.props.theme}
                    condition={condition}
                  >
                    {indicatorText}
                  </CardIndicator>;
        }

        gauge = <GaugeComponent
                theme={this.props.theme}
                value={this.state.value}
                height={height}
                width={width}
                      label={this.state.label}
                      unit={plot.unit}
                minDegree={this.props.minDegree}
                maxDegree={this.props.maxDegree}
                needle={this.props.needle}
                min={plot.min}
                max={plot.max}
                precision={plot.precision}
                style={styles.gauge}
                    lowerThresholdMeaning={this.props.lowerThresholdMeaning}
                    middleThresholdMeaning={this.props.middleThresholdMeaning}
                    upperThresholdMeaning={this.props.upperThresholdMeaning}
                    lowerThreshold={this.props.lowerThreshold}
                    upperThreshold={this.props.upperThreshold}

            >
            </GaugeComponent>;
      }

      return (<div style={style}>
            {indicator}
            {dataPoint}
            {miniGauge}
            {gauge}
          </div>
             );
    } else {
      return  <div style={styles.waiting}>
            <LoadIndicator theme={this.props.theme} useDataPoints={true}/>
          </div>;
    }
  }
});

module.exports = Gauge;
