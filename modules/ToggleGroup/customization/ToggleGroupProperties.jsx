var React = require('react');
var IoTFCommon = require('IoTFCommon');
var RPT = React.PropTypes;
var Label = IoTFCommon.Label;
var ComboBox = IoTFCommon.ComboBox;
var Option = IoTFCommon.Option;
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;
var Select = IoTFCommon.Select;
var SwitchBtn = IoTFCommon.SwitchBtn;

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }
}

var ToggleGroupProperties = React.createClass({

  propTypes: {
    iconType: RPT.string,
    invert: RPT.bool,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      iconType: "WINDOW",
      invert: false
    };
  },

  getInitialState: function() {
    return {
      iconType: this.props.iconType,
      invert: this.props.invert !== undefined?this.props.invert:null
    }
  },

  onIconTypeChanged: function(value) {
    this.setState({
      iconType: value
    })
  },

  onInvertChanged: function(value) {
    this.setState({
      invert: value
    })
  },

  onUpdate: function(state) {
    var state = Object.assign({},this.state, state);
    this.setState(state);
  },

  render: function() {
    var self = this;

    if (this.state) {

      var iconType = this.state.iconType;

      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <Label label='Visualization' theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onIconTypeChanged} value={iconType}>
                                <Option  theme={this.props.theme} value="DISC" selected={iconType == "DISC"}>Disc</Option>
                                <Option  theme={this.props.theme} value="LIGHT" selected={iconType == "LIGHT"}>Light</Option>
                                <Option  theme={this.props.theme} value="SWITCH" selected={iconType == "SWITCH"}>Switch</Option>
                                <Option  theme={this.props.theme} value="FAN" selected={iconType == "FAN"}>Fan</Option>
                                <Option  theme={this.props.theme} value="HEATING" selected={iconType == "HEATING"}>Heating</Option>
                                <Option  theme={this.props.theme} value="BATTERY" selected={iconType == "BATTERY"}>Battery</Option>
                                <Option  theme={this.props.theme} value="DOOR" selected={iconType == "DOOR"}>Door</Option>
                                <Option  theme={this.props.theme} value="WINDOW" selected={iconType == "WINDOW"}>Window</Option>
                                <Option  theme={this.props.theme} value="SMILEY" selected={iconType == "SMILEY"}>Smiley</Option>
                                <Option  theme={this.props.theme} value="BLANKET" selected={iconType == "BLANKET"}>Blanket</Option>
                                <Option  theme={this.props.theme} value="WATER" selected={iconType == "WATER"}>Water</Option>
                                <Option  theme={this.props.theme} value="SPRINKLER" selected={iconType == "SPRINKLER"}>Sprinkler</Option>
                                <Option  theme={this.props.theme} value="PUMP" selected={iconType == "PUMP"}>Pump</Option>
                                <Option  theme={this.props.theme} value="RAIN" selected={iconType == "RAIN"}>Rain</Option>
                            </Select>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Label label='Invert value' theme={this.props.theme}>
                            <SwitchBtn theme={this.props.theme} onChange={this.onInvertChanged} initialValue={!!this.state.invert} trueText="true = OFF" falseText="true = ON" ></SwitchBtn>
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



module.exports = ToggleGroupProperties;
