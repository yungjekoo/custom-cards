var React = require('react');
IoTFCommon = require('IoTFCommon');
var RPT = React.PropTypes;
var InputField = IoTFCommon.InputField;
var Label =IoTFCommon.Label;
var Select = IoTFCommon.Select;
var Option = IoTFCommon.Option;

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }

}

var ElevatorProperties = React.createClass({

  propTypes: {
    floor: RPT.string,
    height: RPT.string,
    weight: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      floor: "location.floor",
      height: "location.height",
      weight: "weight.value"
      // floor: null,
      // height: null,
      // weight: null
    };
  },

  getInitialState: function() {
    return {
      floor: this.props.floor,
      height: this.props.height,
      weight: this.props.weight
    }
  },

  onFloorChanged: function(value) {
    this.setState({
      floor: value
    })
  },

  onHeightChanged: function(value) {
    this.setState({
      height: value
    })
  },

  onWeightChanged: function(value) {
    this.setState({
      weight: value
    })
  },

  onUpdate: function(state) {
    var state = Object.assign({},this.state, state);
    this.setState(state);
  },

  render: function() {
    var self = this;

    if (this.state) {
      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <Label label='Floor data point' theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onFloorChanged} value={this.state.floor}>
                              {this.props.plots.map(function(item) {
                                return <Option key={item.id} value={item.id} selected={self.state.floor == item.id}>{item.label}</Option>
                              })}
                            </Select>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Label label='Height data point' theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onHeightChanged} value={this.state.height}>
                              {this.props.plots.map(function(item) {
                                return <Option key={item.id} value={item.id} selected={self.state.height == item.id}>{item.label}</Option>
                              })}
                            </Select>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Label label='Weight data point' theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onWeightChanged} value={this.state.weight}>
                              {this.props.plots.map(function(item) {
                                return <Option key={item.id} value={item.id} selected={self.state.weight == item.id}>{item.label}</Option>
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



module.exports = ElevatorProperties;
