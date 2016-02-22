var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var ComboBox = require('../../common/components/ComboBox.jsx');
var Label = require('../../common/components/Label.jsx');
var Option = require('../../common/components/Option.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var Dialog = require('../../Dialog/Dialog.jsx');
var DialogTab = Dialog.DialogTab;

var ValueLabelProperties = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object,
      device: RPT.string,
      property: RPT.string,
        unit:RPT.string,
        availableUnits:RPT.string
  },

  getDefaultProps: function() {
    return {
      parameters: {}
    };
  },

  getInitialState: function() {
    return {
      device: this.props.device?this.props.device:null,
      property: this.props.property?this.props.property:null,
            unit:this.props.unit?this.props.unit:null
    };
  },

  componentDidMount: function() {
  },

  onDevIDChanged: function(id) {
    this.setState({
      device: id
    });
  },

  onDevicePropertyChanged: function(name) {
    this.setState({
      property: name
    });
  },

    onPropertyUnitChanged: function(name){
        this.setState( {
          unit:name
        });
    },

  onUpdate: function(state) {
    var updatedState = Object.assign({},this.state, state);
    this.setState(updatedState);
  },

  render: function() {
    var newProps = Object.assign({}, this.props, this.state);
        var self = this;
    var options = JSON.parse(this.props.nls.resolve(this.props.availableUnits));
        var header = JSON.parse(this.props.nls.resolve(this.props.unitListHeader));

        var optionsContainerStyle = {maxHeight:"140px",overflow:"auto"};

        return (
      <CustomizationDialog {...newProps} onUpdate={this.onUpdate}>
        <DialogTab id="Data selection" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_DATASEL_ValueLabel")}>
                  <Label label={this.props.nls.resolve("COMP_CUSTOM_DEVID_ValueLabel")} theme={this.props.theme}>
                      <InputField theme={this.props.theme} onChange={this.onDevIDChanged} initialValue={this.state.device}></InputField>
                  </Label>
                  <Label label={this.props.nls.resolve("COMP_CUSTOM_DEVPROP_ValueLabel")} theme={this.props.theme}>
                      <InputField theme={this.props.theme} onChange={this.onDevicePropertyChanged} initialValue={this.state.property}></InputField>
                  </Label>
                  <Label label={this.props.nls.resolve("COMP_CUSTOM_PROPUNIT_ValueLabel")} theme={this.props.theme}>
                      <ComboBox theme={this.props.theme} onChange={this.onPropertyUnitChanged} initialValue={this.state.unit} header={header} optionsContainerStyle={optionsContainerStyle} placeholderNoItems={this.props.nls.resolve("NoOptionsFound")}>
                      {options.map(function(option) {
                          return (<Option value={option.value} theme={self.props.theme}>{option.label}</Option>);
                        })}
                      </ComboBox>
                  </Label>
        </DialogTab>
      </CustomizationDialog>
    );
  }
});

module.exports = ValueLabelProperties;
