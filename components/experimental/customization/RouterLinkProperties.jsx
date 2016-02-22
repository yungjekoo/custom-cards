var React = require('react');
var RPT = React.PropTypes;
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var Option = require('../../common/components/Option.jsx');
var Select = require('../../common/components/Select.jsx');
var DialogTab = DashboardDialog.DialogTab;

var RouterLinkProperties = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object,
    target:RPT.string
  },

  getDefaultProps: function() {
    return {
      target: null
    };
  },

  getInitialState: function() {
    return {
            target:this.props.target?this.props.target:null
    };
  },

  onTargetChanged: function(target) {
    this.setState({
      target: target
    });
  },

  onUpdate: function(state) {
    var updatedState = Object.assign({},this.state, state);
    this.setState(updatedState);
  },

  render: function() {
    var newProps = Object.assign({}, this.props, this.state);
    // TODO this class is referenced in DashboardStore, therefore require does not work
    var DashboardStore = require('../dashboard/DashboardStore');
    var dashboards = DashboardStore.getDashboards();
    var targets = [];
    for (var i = 0; i < dashboards.length; i++) {
      var dashboard = dashboards[i];
      targets.push({
        value: dashboard.name,
        label: dashboard.displayName
      });
    }
      var header = {
        "value": 0,
        "label": "Choose target"
      };

    return (
      <CustomizationDialog {...newProps} onUpdate={this.onUpdate}>
        <DialogTab id="TargetSelection" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_TARGETSEL_RouterLink")}>
          <Label label={this.props.nls.resolve("COMP_CUSTOM_TARGET_RouterLink")} theme={this.props.theme}>
            <Select theme={this.props.theme} onChange={this.onTargetChanged} initialValue={this.state.target}>
              {targets.map(function (target) {
                return <Option value={target.value}>{target.label || target.value}</Option>;
              })}
            </Select>
          </Label>
        </DialogTab>
      </CustomizationDialog>
    );
  }
});

module.exports = RouterLinkProperties;
