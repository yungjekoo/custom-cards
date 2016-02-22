var React = require('react');
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var SwitchBtn = require('../../common/components/SwitchBtn.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "10px 0px"
  }

};

var RealTimeChartProperties = React.createClass({

  propTypes: {
    range: RPT.number,
    autoscroll: RPT.bool,
    overview: RPT.bool,
    stacked: RPT.bool,
    steps: RPT.bool,
    threshold: RPT.number,
    nls: RPT.object,
    style: RPT.object,
        theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      range: 60,
      autoscroll: true,
      overview: true,
      stacked: false,
      steps: false,
      threshold: 300
    };
  },

  getInitialState: function() {
    return {
      range: this.props.range,
      autoscroll: this.props.autoscroll,
      overview: this.props.overview,
      stacked: this.props.stacked,
      steps: this.props.steps,
      threshold: this.props.threshold
    };
  },

  componentDidMount: function() {
  },

  onRangeChanged: function(value) {
    this.setState({
      range: value
    });
  },

  onAutoscrollChanged: function(value) {
    this.setState({
      autoscroll: value
    });
  },

  onOverviewChanged: function(value) {
    this.setState({
      overview: value
    });
  },

  onStackedChanged: function(value) {
    this.setState({
      stacked: value
    });
  },

  onStepsChanged: function(value) {
    this.setState({
      steps: value
    });
  },

  onThresholdChanged: function(value) {
    this.setState({
      threshold: value
    });
  },

  onUpdate: function(state) {
    var updatedState = Object.assign({},this.state, state);
    this.setState(updatedState);
  },

  render: function() {
    var self = this;
    var newProps = Object.assign({}, this.props, this.state);
    var range = parseInt(this.state.range, 10);
    var threshold = parseInt(this.state.threshold, 10);

    return (
      <div style={Object.assign({}, styles.container, this.props.style)}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td>
                      <Label label={this.props.nls['WindowSize']} theme={this.props.theme}>
                          <Select onChange={this.onRangeChanged} value={""+range}>
                              <Option value="60" selected={range == 60}>1 minute</Option>
                              <Option value="300" selected={range == 300}>5 minutes</Option>
                              <Option value="600" selected={range == 600}>10 minutes</Option>
                              <Option value="900" selected={range == 900}>15 minutes</Option>
                              <Option value="1800" selected={range == 1800}>30 minutes</Option>
                              <Option value="3600" selected={range == 3600}>60 minutes</Option>
                          </Select>
                      </Label>
                    </td>
                    <td>
                      <Label label={this.props.nls['KeepDataFor']} theme={this.props.theme}>
                          <Select onChange={this.onThresholdChanged} value={""+threshold}>
                              <Option value="60" selected={threshold == 60}>1 minute</Option>
                              <Option value="300" selected={threshold == 300}>5 minutes</Option>
                              <Option value="600" selected={threshold == 600}>10 minutes</Option>
                              <Option value="900" selected={threshold == 900}>15 minutes</Option>
                              <Option value="1200" selected={threshold == 1200}>20 minutes</Option>
                              <Option value="1800" selected={threshold == 1800}>30 minutes</Option>
                              <Option value="2700" selected={threshold == 2700}>40 minutes</Option>
                              <Option value="3000" selected={threshold == 3000}>50 minutes</Option>
                              <Option value="3600" selected={threshold == 3600}>60 minutes</Option>
                          </Select>
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label label={this.props.nls['Stacked']} theme={this.props.theme}>
                          <SwitchBtn theme={this.props.theme} onChange={this.onStackedChanged} initialValue={!!this.state.stacked} trueText="Yes" falseText="No" ></SwitchBtn>
                      </Label>
                    </td>
                    <td>
                      <Label label={this.props.nls['Steps']} theme={this.props.theme}>
                          <SwitchBtn theme={this.props.theme} onChange={this.onStepsChanged} initialValue={!!this.state.steps} trueText="Yes" falseText="No" ></SwitchBtn>
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label label={this.props.nls['EnableAutoscroll']} theme={this.props.theme}>
                          <SwitchBtn theme={this.props.theme} onChange={this.onAutoscrollChanged} initialValue={!!this.state.autoscroll} trueText="Yes" falseText="No" ></SwitchBtn>
                      </Label>
                    </td>
                    <td>
                      <Label label={this.props.nls['ShowOverview']} theme={this.props.theme}>
                          <SwitchBtn theme={this.props.theme} onChange={this.onOverviewChanged} initialValue={!!this.state.overview} trueText="Yes" falseText="No" ></SwitchBtn>
                      </Label>
                    </td>
                  </tr>
                </tbody>
              </table>
      </div>
    );
  }
});



module.exports = RealTimeChartProperties;
