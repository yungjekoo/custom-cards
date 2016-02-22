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

var UsageDataCard = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object
  },

  getInitialState: function() {
    return {
      dataTrafficUsageToday: 0,
      details: [],
      dataTrafficUsageThisMonth: 0,
      dataTrafficUsageLastMonth: 0
    };
  },

  componentDidMount: function() {
    this.sub = IoTFUsageStore.listen(this.onUpdate);
    IoTFUsageStore.Actions.fetchDataTrafficUsage();
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var model = {};
    if (payload.dataTrafficUsageThisMonth !== undefined) {
      model.dataTrafficUsageThisMonth = payload.dataTrafficUsageThisMonth;
    }
    if (payload.dataTrafficUsageLastMonth !== undefined) {
      model.dataTrafficUsageLastMonth = payload.dataTrafficUsageLastMonth;
    }
    if (payload.dataTrafficUsageToday !== undefined) {
      model.dataTrafficUsageToday = payload.dataTrafficUsageToday;
    }
    if (payload.dataTrafficUsageDetails) {
      var details = payload.dataTrafficUsageDetails;
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

    firstDataPoint = 	<CardDatapoint theme={this.props.theme} unit={this.props.nls.resolve("DataToday")}>
                {this.state.dataTrafficUsageToday}
              </CardDatapoint>;

    if (this.props.wrapper.height == 1) {
      style = Object.assign({}, style, {paddingTop: "15px"});
    } else {
      style = Object.assign({}, style, {paddingTop: "30px"});
    }
    if (this.props.wrapper.height == 3) {
      secondDataPoint = 	<CardDatapoint theme={this.props.theme} minor={true} unit={this.props.nls.resolve("ThisMonth")}>
                  {this.state.dataTrafficUsageThisMonth}
                </CardDatapoint>;
      thirdDataPoint = 	<CardDatapoint theme={this.props.theme} minor={true} unit={this.props.nls.resolve("PreviousMonth")}>
                  {this.state.dataTrafficUsageLastMonth}
                </CardDatapoint>;
    } else if (this.props.wrapper.width == 3) {
      var data = [];
      var details = this.state.details;
      for (var i = details.length - 1; i >= 0 && i > details.length - 6; i--) {
        var line = details[i];
        var entry = [
          line.date,
          line.total.toFixed(1) + " MB"
        ];
        data.push(entry);
      }
      table = <CardTable
            theme={this.props.theme}
            data={data}
            header={[
              this.props.nls.resolve("Time"),
              this.props.nls.resolve("DataConsumed")
            ]}
            >
          </CardTable>;

    } else if (this.props.wrapper.width == 4) {
      chart = <CardLineChart
            theme={this.props.theme}
            data={this.state.details}
            showRange={true}
            unit="MB"
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

module.exports = UsageDataCard;
