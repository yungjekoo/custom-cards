var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var ImagePreview = require('../../common/components/ImagePreview.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;


var styles = {

};

var ImageCardProperties = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object,
      url: RPT.string,
        scaleToFill:RPT.string
  },

  getDefaultProps: function() {
    return {
      parameters: {}
    };
  },

  getInitialState: function() {
    return {
      url: this.props.url?this.props.url:"",
            scaleToFill: this.props.scaleToFill?this.props.scaleToFill:"0"
    };
  },

  onUrlChanged: function(url) {
    this.setState({
      url: url
    });
  },

  onScaleToFillChanged: function(value) {
    this.setState({
      scaleToFill: value?"1":"0"
    });
  },

  onUpdate: function(state) {
    var updatedState = Object.assign({},this.state, state);
    this.setState(updatedState);
  },

  render: function() {
    var newProps = Object.assign({}, this.props, this.state);
    var options = JSON.parse(this.props.nls.resolve(this.props.scaleOptions));
        return (
      <CustomizationDialog {...newProps} onUpdate={this.onUpdate}>
        <DialogTab id="Image selection" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_IMGSEL_Image")}>
                  <Label label={this.props.nls.resolve("COMP_CUSTOM_URL_Image")} theme={this.props.theme} >
                      <InputField theme={this.props.theme} type="url" onChange={this.onUrlChanged} initialValue={this.state.url}></InputField>
                  </Label>
                  <Label label={this.props.nls.resolve("COMP_CUSTOM_SCALE_Image")} theme={this.props.theme} >
                      <SwitchBtn  theme={this.props.theme} onChange={this.onScaleToFillChanged} initialValue={this.state.scaleToFill=="1"} trueText="Yes" falseText="No" ></SwitchBtn>
                  </Label>
                  <Label label={this.props.nls.resolve("COMP_CUSTOM_PREV_Image")} themes={this.props.theme}>
                      <ImagePreview url={this.state.url}></ImagePreview>
                  </Label>
        </DialogTab>
      </CustomizationDialog>
    );
  }
});

module.exports = ImageCardProperties;
