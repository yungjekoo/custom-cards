var React = require('react');

var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var LineChart = require('../../common/components/LineChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: "30px"
  },
  empty: {
    padding: "20px"
  }
};

var Value = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    major: RPT.string,
    plots: RPT.array
  },

  getDefaultProps: function() {
    return {
      plots: [],
      data: {}
    };
  },


  getInitialState: function() {
    return {
      value: null,
      allData: []
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
    var major = this.getPlot();

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
      var model = Object.assign({}, data, {data: data});
      if (data[major.id] !== undefined) {
        var temp = {
          timestamp: data.timestamp
        };
        temp[major.id] = data[major.id];
        this.state.allData.push(temp);
        model = Object.assign(model, {allData: this.state.allData});

      }
      this.setState(model);
    }
  },

  render: function() {
    var plot = this.getPlot();
    if (plot && this.state.data !== null) {
      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

      var firstDataPoint = "";
      var secondDataPoint = "";
      var thirdDataPoint = "";
      var table = "";
      var chart = "";

      if (this.state[plot.id] !== undefined) {
        firstDataPoint = 	<CardDatapoint theme={this.props.theme} unit={plot.label}>
                    {(plot.precision !== undefined)?this.state[plot.id].toFixed(plot.precision):this.state[plot.id]}{plot.unit?" "+plot.unit:""}
                  </CardDatapoint>;
      }

      if (this.props.wrapper.height == 1) {
        style = Object.assign({}, style, {paddingTop: "15px"});
      } else {
        style = Object.assign({}, style, {paddingTop: "30px"});
      }
      if (this.props.wrapper.height == 3) {
        var second = null;
        var third = null;
        for (var i in this.props.plots) {
          var temp = this.props.plots[i];
          if (temp != plot) {
            if (!second) {second = temp;}
            else if (!third) {third = temp;}
            else {break;}
          }
        }
        if (second && this.state[second.id] !== undefined) {
          secondDataPoint = 	<CardDatapoint theme={this.props.theme} unit={second.label}>
                      {(second.precision !== undefined)?this.state[second.id].toFixed(second.precision):this.state.value}{second.unit?" "+second.unit:""}
                    </CardDatapoint>;
        }
        if (third && this.state[third.id] !== undefined) {
          thirdDataPoint = 	<CardDatapoint theme={this.props.theme} unit={third.label}>
                      {(third.precision !== undefined)?this.state[third.id].toFixed(third.precision):this.state.value}{third.unit?" "+third.unit:""}
                    </CardDatapoint>;
        }
      } else if (this.props.wrapper.width == 3) {
        var data = [];
        var details = this.state.allData;
        for (var j = details.length - 1; j >= 0 && j > details.length - 6; j--) {
          var line = details[j];
          var value = line[plot.id];
          value = (plot.precision !== undefined)?value.toFixed(plot.precision):value;
          var entry = [
            new Date(line.timestamp).toLocaleString(),
            value + " " + (plot.unit?plot.unit:"")
          ];
          data.push(entry);
        }
        table = <CardTable
              theme={this.props.theme}
              data={data}
              header={[
                this.props.nls.resolve("Time"),
                this.props.nls.resolve("Value")
              ]}
              >
            </CardTable>;
      } else if (this.props.wrapper.width == 4) {
        if (this.state.data) {
          chart = <LineChart
                theme={this.props.theme}
                data={this.state.data}
                //initialData={this.state.data}
                plots={this.props.plots}
                overview={true}
                range={60}
                autoscroll={true}
                stacked={false}
                steps={false}
                legend={false}
              >
              </LineChart>;
        }
      }

      return (
        <div style={style}>
          {firstDataPoint}
          {secondDataPoint}
          {thirdDataPoint}
          {table}
          {chart}
        </div>
      );

    } else {
      if (!plot) {
        return <div style={styles.empty}>No data point defined</div>;
      } else {
        return <div style={styles.empty}>
	    	      <LoadIndicator theme={this.props.theme} useDataPoints={true}/>
		        </div>
      }
    }
  }
});

module.exports = Value;
