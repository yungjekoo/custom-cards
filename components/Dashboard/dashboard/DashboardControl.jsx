var React = require('react');
var DashboardStore = require('./DashboardStore');
var Utils = require('./DashboardUtils');
var Actions = require('./Actions.jsx');
var Reflux = require('reflux');
var IconLink = require('../../common/components/IconLink.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var RPT = React.PropTypes;

/*
 *  Dashboard component
 *
 */
var styles = {
  container: {
    fontSize: "14px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    color: "#e0e0e0",
    backgroundColor: "transparent",
    margin: "10px 10px 0px 10px",
    padding: "10px",
    position: "relative",
    zIndex: "10"
  },
  containerMobile: {
    margin: "10px 50px 0px 20px"
  },

  actions: {
    float: "right",
    marginLeft: "20px"
  },

  actionContainer: {
    position: "absolute",
    top: "0px",
    right: "10px"
  },
  pageContainer: {
    position: "absolute",
    top: "0px",
    left: "10px"
  },

  selection: {
    width: "300px",
    float: "right",
    marginLeft: "20px",
    position: "relative",
    top: "-10px"
  },

  selectionMobile: {
    marginLeft: "0px",
    paddingRight: '20px'
  },

  actionsMobile: {

  }
};

var DashboardControl = React.createClass({
    propTypes: {
        organization: RPT.string,
        configurable: RPT.bool,
      style: RPT.object,
        theme: RPT.object.isRequired
  },

  applyTheme: function() {
    var t = this.props.theme;
    if (t) {
      styles.container.fontFamily = t.font;
      styles.container.color = t.textOnCanvas;
      styles.container.backgroundColor = t.canvas;
    }
  },

  getDefaultProps: function() {
    return {
      organization: "Unkown",
      configurable: false
    };
  },

  getInitialState: function() {
    return {
      history: 0,
      layout: DashboardStore.getBreakpoint()
    };
  },

  componentDidMount: function() {
    DashboardStore.listen(this.onModelUpdate);
  },

  onModelUpdate: function(payload) {
    var model = {};
    if (payload.history) {model.history = payload.history;}
    if (payload.dashboard) {model.dashboard = payload.dashboard;}
    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onUndo: function() {
    Actions.undo();
  },

  onAddDashboard: function() {
    Actions.showDialog({
      id: null,
      action: 'modifyPage'
    });
  },

  onRemoveDashboard: function() {
    Actions.removeDashboard();
  },

  onAdd: function() {
    //Actions.addComponent();
    Actions.showDialog({
      id: null,
      action: 'addCard'
    });
  },

  onDashboardChange: function(value) {
      Actions.loadDashboard(value);
      Actions.getComponents();
  },

  render: function() {
    var node = null;
    var self = this;
    var undo = "";
    var configure = "";
    var add = "";
    var addDashboard = "";
    var removeDashboard = "";
    var selection = "";

    var actionsStyle = this.state.layout==="sm"?Object.assign({},styles.actions, styles.actionsMobile) : styles.actions;
    var selectionStyle = this.state.layout==="sm"?Object.assign({},styles.selection, styles.selectionMobile) : styles.selection;
    var containerStyle = this.state.layout==="sm"?Object.assign({},styles.container, styles.containerMobile) : styles.container;

    if (this.state.history > 1) {
      undo = <IconLink theme={this.props.theme} color={this.props.theme.textOnCanvas} icon='undo' size={24} style={actionsStyle} action={this.onUndo}>Undo</IconLink>;
    }
    if (this.props.configurable) {
      configure = <IconLink theme={this.props.theme} color={this.props.theme.textOnCanvas} icon='settings' size={24} style={actionsStyle} action={this.onConfigure}>Configure dashboard</IconLink>;
      add = <IconLink theme={this.props.theme} color={this.props.theme.textOnCanvas} icon='add-circle-outline' size={24} style={actionsStyle} action={this.onAdd}>Add card</IconLink>;
    }

    var dashboards = DashboardStore.getDashboards();
    self = this;

    if (Utils.getCapability("multiplePages")) {
      selection = <Select theme={this.props.theme} onChange={this.onDashboardChange} dummy={self.state.dashboard} value={self.state.dashboard?self.state.dashboard.name:null}>
        {dashboards.map(function(option) {
          return (<Option key={option.name} value={option.name}>{option.label}</Option>);
        })}
      </Select>;

      addDashboard = <IconLink theme={this.props.theme} color={this.props.theme.textOnCanvas} icon='add-circle-outline' size={24} style={styles.actions} action={this.onAddDashboard}>Add page</IconLink>;
      if (dashboards.length > 1 && this.state.dashboard && DashboardStore.getSettings("defaultDashboard") != this.state.dashboard.name) {
        removeDashboard = <IconLink theme={this.props.theme} color={this.props.theme.textOnCanvas} icon='delete' size={24} style={actionsStyle} action={this.onRemoveDashboard}>Remove page</IconLink>;
      }
    }



    return (<div style={styles.container}><div style={styles.actionContainer}>{undo}{add}</div><div style={styles.pageContainer}><div style={selectionStyle}>{selection}</div>{removeDashboard}{addDashboard}</div>{this.props.children}</div>);
  }
});

module.exports = DashboardControl;
