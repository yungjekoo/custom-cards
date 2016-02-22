var React = require('react');

var IoTFUsageStore = require('../../common/stores/IoTFUsageStore.js');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var CardLineChart = require('../../common/components/CardLineChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: "30px"
  }
};

var UsageDeviceCard = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object
  },

  getInitialState: function() {
    return {
      deviceCount: 0,
      details: [],
      devicesCreatedThisMonth: 0,
      devicesCreatedPreviousMonth: 0
    };
  },

  componentDidMount: function() {
    this.sub = IoTFUsageStore.listen(this.onUpdate);
    IoTFUsageStore.Actions.fetchDeviceCount();
    IoTFUsageStore.Actions.fetchActiveDeviceUsage();
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var model = {};
    if (payload.deviceCount) {
      model.deviceCount = payload.deviceCount;
    }
    if (payload.activeDeviceUsageThisMonth) {
      model.devicesCreatedThisMonth = payload.activeDeviceUsageThisMonth;
    }
    if (payload.activeDeviceUsageLastMonth) {
      model.devicesCreatedPreviousMonth = payload.activeDeviceUsageLastMonth;
    }
    if (payload.activeDeviceUsageDetails) {
      var details = payload.activeDeviceUsageDetails;
      if (details.length > 0) {
        var today = details[details.length-1].total;
        model.today = today;
      }
      model.details = details;
    }

    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    var firstDataPoint = "";
    var secondDataPoint = "";
    var thirdDataPoint = "";
    var table = "";
    var chart = "";

    firstDataPoint = 	<CardDatapoint theme={this.props.theme} unit={this.props.nls.resolve("DevicesNow")}>
                {this.state.deviceCount}
              </CardDatapoint>;

    if (this.props.wrapper.height == 1) {
      style = Object.assign({}, style, {paddingTop: "15px"});
    } else {
      style = Object.assign({}, style, {paddingTop: "30px"});
    }
    if (this.props.wrapper.height == 3) {
      secondDataPoint = 	<CardDatapoint theme={this.props.theme} minor={true} unit={this.props.nls.resolve("DevicesThisMonth")}>
                  {this.state.devicesCreatedThisMonth}
                </CardDatapoint>;
      thirdDataPoint = 	<CardDatapoint theme={this.props.theme} minor={true} unit={this.props.nls.resolve("DevicesPreviousMonth")}>
                  {this.state.devicesCreatedPreviousMonth}
                </CardDatapoint>;
    } else if (this.props.wrapper.width == 3) {
      var data = [];
      var details = this.state.details;
      for (var i = details.length - 1; i >= 0 && i > details.length - 6; i--) {
        var line = details[i];
        var entry = [
          line.date,
          line.total
        ];
        data.push(entry);
      }
      table = <CardTable
            theme={this.props.theme}
            data={data}
            header={[
              this.props.nls.resolve("Time"),
              this.props.nls.resolve("DevicesConnected")
            ]}
            >
          </CardTable>;

    } else if (this.props.wrapper.width == 4) {
      chart = <CardLineChart
            theme={this.props.theme}
            data={this.state.details}
            showRange={true}
            unit="Devices"
            >
          </CardLineChart>;
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
  }
});

module.exports = UsageDeviceCard;
