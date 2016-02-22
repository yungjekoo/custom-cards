var React = require('react');
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%"
  },

  thresholdLabel: {
    top: "8px",
    position: "relative"
  },
  thresholdLabelLeft: {
    position: "relative",
    marginRight: "10px"
  },
  thresholdLabelRight: {
    position: "relative",
    marginLeft: "10px"
  },
  thresholdInput: {
    display: "inline-block",
    width: "50px",
    height: "24px"
  },
  thresholdInputField: {
    textAlign: "right"
  },
  tableData: {
    verticalAlign: "top"
  },
  comboBoxCell: {
  	paddingTop: "25px"
  }

};

var GaugeProperties = React.createClass({

  propTypes: {
    major: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  meanings: [
    "NONE",
    "GOOD",
    "FAIR",
    "CRITICAL"
  ],

  getDefaultProps: function() {
    return {
      major: null,
      lowerThresholdMeaning: "NONE",
      middleThresholdMeaning: "NONE",
      upperThresholdMeaning: "NONE"
    };
  },

  getInitialState: function() {
    var plot = this.getPlot();
    if (plot) {
      return {
        major: plot?plot.id:null,
        lowerThresholdMeaning: this.props.lowerThresholdMeaning?this.props.lowerThresholdMeaning:"NONE",
        middleThresholdMeaning: this.props.middleThresholdMeaning?this.props.middleThresholdMeaning:"NONE",
        upperThresholdMeaning: this.props.upperThresholdMeaning?this.props.upperThresholdMeaning:"NONE",
        lowerThreshold: this.props.lowerThreshold !== undefined?this.props.lowerThreshold:plot.min,
        upperThreshold: this.props.upperThreshold !== undefined?this.props.upperThreshold:plot.max
      };
    } else {
      return {
        major: null,
        lowerThresholdMeaning: "NONE",
        middleThresholdMeaning: "NONE",
        upperThresholdMeaning: "NONE",
        lowerThreshold: 0,
        upperThreshold: 100
      };
    }
  },

  getPlot: function() {
    if (this.state) {
      for (var i in this.props.plots) {
        var plot = this.props.plots[i];
        if (plot.id == this.state.major) {
          return plot;
        }
      }
    }
    // fallback
    if (this.props.plots.length > 0) {
      return this.props.plots[0];
    } else {
      return null;
    }
  },

  initThresholds: function(plotId) {
    var plot = this.getPlot();
    this.setState(
      {
        lowerThreshold: this.props.min,
        upperThreshold: this.props.max,
        lowerThresholdMeaning: this.props.lowerThresholdMeaning,
        middleThresholdMeaning: this.props.middleThresholdMeaning,
        upperThresholdMeaning: this.props.upperThresholdMeaning
      }
    );

  },

  onMajorChanged: function(value) {
    this.setState({
      major: value
    });
    this.initThresholds();
  },

  onLowerThresholdChanged: function(value) {
    value = parseFloat(value);
    this.setState({
      lowerThreshold: value
    });
  },

  onUpperThresholdChanged: function(value) {
    value = parseFloat(value);
    this.setState({
      upperThreshold: value
    });
  },

  onLowerThresholdBlur: function(value) {
    value = parseFloat(value);
    var plot = this.getPlot();
    if (plot) {
      if (value < plot.min) {value = plot.min;}
      if (value > plot.max) {value = plot.max;}
      if (value > this.state.upperThreshold) {value = this.state.upperThreshold;}
      this.setState({
        lowerThreshold: value
      });
    }
  },

  onUpperThresholdBlur: function(value) {
    value = parseFloat(value);
    var plot = this.getPlot();
    if (plot) {
      if (value > plot.max) {value = plot.max;}
      if (value < plot.min) {value = plot.min;}
      if (value < this.state.lowerThreshold) {value = this.state.lowerThreshold;}
      this.setState({
        upperThreshold: value
      });
    }
  },

  onLowerThresholdMeaningChanged: function(value) {
    this.setState({
      lowerThresholdMeaning: value
    });
  },

  onMiddleThresholdMeaningChanged: function(value) {
    this.setState({
      middleThresholdMeaning: value
    });
  },

  onUpperThresholdMeaningChanged: function(value) {
    this.setState({
      upperThresholdMeaning: value
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
    var plot = this.getPlot();

    if (this.state && plot && plot.min !== undefined && plot.max !== undefined) {
      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <Label label={this.props.nls['DataPoint']} theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onMajorChanged} value={plot.id}>
                              {this.props.plots.map(function(item) {
                                return <Option key={item.id} value={item.id} selected={plot.id == item.id}>{item.label}</Option>;
                              })}
                            </Select>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.tableData}>
                        <Label label={this.props.nls['LowerThreshold']} theme={this.props.theme}>
                          <span style={styles.thresholdLabelLeft}>{plot.min} {plot.unit} to </span>
                          <div style={styles.thresholdInput}>
                            <InputField style={styles.thresholdInputField} theme={this.props.theme} type="number" min={plot.min} max={plot.max} onChange={this.onLowerThresholdChanged} onBlur={this.onLowerThresholdBlur} value={this.state.lowerThreshold} initialValue={this.state.lowerThreshold}></InputField>
                          </div>
                          <span style={styles.thresholdLabelRight}> {plot.unit}</span>
                        </Label>
                      </td>
                      <td style={styles.comboBoxCell}>
                        <Select theme={this.props.theme}  onChange={this.onLowerThresholdMeaningChanged} value={self.state.lowerThresholdMeaning}>
                          {this.meanings.map(function(item) {
                            return <Option key={item} value={item} selected={self.state.lowerThresholdMeaning == item}>{self.props.nls.resolve("THRESHOLD_" + item)}</Option>;
                          })}
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.tableData}>
                        <Label label={this.props.nls['Middle']} theme={this.props.theme}>
                          <span style={styles.thresholdLabel}>{this.state.lowerThreshold} {plot.unit} to {this.state.upperThreshold} {plot.unit}</span>
                        </Label>
                      </td>
                      <td style={styles.comboBoxCell}>
                        <Select theme={this.props.theme}  onChange={this.onMiddleThresholdMeaningChanged} value={self.state.middleThresholdMeaning}>
                          {this.meanings.map(function(item) {
                            return <Option key={item} value={item} selected={self.state.middleThresholdMeaning == item}>{self.props.nls.resolve("THRESHOLD_" + item)}</Option>;
                          })}
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.tableData}>
                        <Label label={this.props.nls['UpperThreshold']} theme={this.props.theme}>
                          <div style={styles.thresholdInput}>
                            <InputField style={styles.thresholdInputField} theme={this.props.theme} type="number" min={plot.min} max={plot.max} onChange={this.onUpperThresholdChanged} onBlur={this.onUpperThresholdBlur} value={this.state.upperThreshold} initialValue={this.state.upperThreshold}></InputField>
                          </div>
                          <span style={styles.thresholdLabelRight}> {plot.unit} to {plot.max} {plot.unit}</span>
                        </Label>
                      </td>
                      <td style={styles.comboBoxCell}>
                        <Select theme={this.props.theme}  onChange={this.onUpperThresholdMeaningChanged} value={self.state.upperThresholdMeaning}>
                          {this.meanings.map(function(item) {
                            return <Option key={item} value={item} selected={self.state.upperThresholdMeaning == item}>{self.props.nls.resolve("THRESHOLD_" + item)}</Option>;
                          })}
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>
      );
  } else if (plot) {
    return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <Label label={this.props.nls['DataPoint']} theme={this.props.theme}>
                            <Select theme={this.props.theme}  onChange={this.onMajorChanged} value={plot.id}>
                              {this.props.plots.map(function(item) {
                                return <Option key={item.id}  value={item.id} selected={plot.id == item.id}>{item.label}</Option>;
                              })}
                            </Select>
                        </Label>
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>

    );
  } else {
    return (
        <div>
        </div>
    )
  }
}
});



module.exports = GaugeProperties;
