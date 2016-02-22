var React = require('react');
var Actions = require('./Actions.jsx');
var Utils = require('./DashboardUtils.js');
var Reflux = require('reflux');
var Icon = require('../../common/components/Icon.jsx');
var ComponentSelection = require('./ComponentSelection.jsx');

var RPT = React.PropTypes;

var styles = {
  backdrop: {
    backgroundColor: "rgba(21,41,53,0.3)",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "0px",
    left: "0px"
  },
  container: {
    width: "800px",
    height: "600px",
    fontSize: "14px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    color: "#333333",
    background: "white",
    margin: "0 auto",
    top: "100px",
    position: "relative",
    overflow: "hidden"
  },
  content: {
    width: "480px",
    height: "100%",
    float: "right",
    marginRight: "35px",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  tabs: {
    width: "250px",
    height: "100%",
    backgroundColor: "whitesmoke",
    float: "left",
    paddingTop: "50px",
    overflowY: "scroll"
  },
  header: {
    width: "100%",
    paddingTop: "50px",
    paddingBottom: "20px",
    borderBottom: "2px solid lightgray"
  },
  title: {
    fontSize: "20px"
  },
  description: {
    fontSize: "12px",
    color: "silver"
  },
  canvas: {
    width: "100%",
    overflowY: "scroll",
    marginBottom: "100px",
    paddingTop: "20px",
    height: "100%"
  },
  buttons: {
    width: "100%",
    height: "100px",
    position: "absolute",
    bottom: "0px",
    textAlign: "right"
  },
  cancel: {
    position: "absolute",
    right: "30px",
    top: "20px",
    zIndex: 1
  },
  tab: {
    padding: "18px",
    fontSize: "16px",
    borderLeft: "8px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative"
  },
  tabText: {
    marginRight: "24px"
  },
  tabCancel: {
    position: "absolute",
    right: "5px",
    top: "16px",
    opacity: 0
  },
  activeTab: {
    borderLeft: "8px solid #4581e0",
    color: "#4581e0"
  }
};

var DashboardDialog = {};

var Tab = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    id: RPT.string,
    active: RPT.bool,
    onClick: RPT.func
  },

  getDefaultProps: function() {
    return {
      active: false,
      id: Utils.createUUID()
    };
  },

  getInitialState: function() {
    return {
      hover: false
    };
  },

  onClick: function() {
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  },

  onRemove: function() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
  },

  onMouseOver: function() {
    this.setState({
      hover: true
    });
  },

  onMouseOut: function() {
    this.setState({
      hover: false
    });
  },

  render: function() {
    var style = styles.tab;
    if (this.props.active) {
      style = Object.assign({}, style, styles.activeTab);
    }

    var textStyle = {};
    var remove = "";
    if (this.props.onRemove) {
      var iconStyle = styles.tabCancel;
      if (this.state.hover) {
        iconStyle = Object.assign({},iconStyle, {opacity: 1});
      }
      textStyle = styles.tabText;
      remove = <Icon icon="delete" style={iconStyle} onClick={this.onRemove} color="#333333" size="18" theme={this.props.theme}/>;
    }
    return (
      <div style={style} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick}><span style={textStyle}>{this.props.children}</span>{remove}</div>
    );
  }
});

var ButtonTab = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    onClick: RPT.func,
    id: RPT.string
  },

  getDefaultProps: function() {
    return {
        label: "Label",
        id: Utils.createUUID()
    };
  },

  render: function() {
    return (
      <div style={styles.tab} onClick={this.props.onClick}>{this.props.children}</div>
    );
  }
});

var DialogTab = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    onClick: RPT.func,
    selected: RPT.bool,
    id: RPT.string
  },

  getDefaultProps: function() {
    return {
        label: "Label",
        id: Utils.createUUID()
    };
  },

  render: function() {
    return (<div>{this.props.children}</div>);
  }
});

var DialogButtons = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    return (<div>{this.props.children}</div>);
  }
});

var Dialog = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    var tabs = this.getTabs();
    return {
      activeTab: (tabs.length > 0)?tabs[0].props.id:null
    };
  },

  onCancel: function() {
    Actions.closeDialog();
  },

  onTabClicked: function(id) {
    this.setState({
      activeTab: id
    });
  },

  getTabs: function() {
    var dialogTabs = [];
    var children = [];
    React.Children.forEach(this.props.children, function(child) {children.push(child);});
    for (var i in children) {
      var tab = children[i];
      if (tab.type.displayName == "DialogTab") {
        dialogTabs.push(tab);
      }
    }
    return dialogTabs;
  },

  getButtonTabs: function() {
    var buttonTabs = [];
    var children = [];
    React.Children.forEach(this.props.children, function(child) {children.push(child);});
    for (var i in children) {
      var tab = children[i];
      if (tab.type.displayName == "ButtonTab") {
        buttonTabs.push(tab);
      }
    }
    return buttonTabs;
  },

  getButtons: function() {
    var dialogButtons = null;
    var children = [];
    React.Children.forEach(this.props.children, function(child) {children.push(child);});
    for (var i in children) {
      var buttons = children[i];
      if (buttons.type.displayName == "DialogButtons") {
        return buttons;
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    // find selected tab
    var active = null;

    React.Children.forEach(nextProps.children, function(child) {
      if (child.props.selected) {
        active = child.props.id;
      }
    });

    if (active) {
      this.setState({
        activeTab: active
      });
    }
  },

  render: function() {
    var self = this;

    var dialogTabs = this.getTabs();
    var activeTab = this.state.activeTab;
    // check if there is an empty plot -> focus it
    for (var i in dialogTabs) {
      tab = dialogTabs[i];
      if (tab.props.selected) {
        activeTab = tab.props.id;
      }
    }

    // focus the selected
    var tab = "";
    for (var j in dialogTabs) {
      tab = dialogTabs[j];
      if (tab.props.id == activeTab) {
        break;
      }
    }
    var dialogButtons = this.getButtons();
    var buttonTabs = this.getButtonTabs();


    return (
      <div style={styles.backdrop}>
        <div style={styles.container}>
          <Icon icon="highlight-remove" style={styles.cancel} onClick={this.onCancel} color="#333333" size="32" theme={this.props.theme}/>
          <div style={styles.tabs}>
            {dialogTabs.map(function(tab) {
              return <Tab key={tab.props.id} onRemove={tab.props.onRemove} onClick={self.onTabClicked} active={tab.props.id == activeTab} theme={self.props.theme} id={tab.props.id}>{tab.props.label}</Tab>;
            })}
            {buttonTabs.map(function(tab) {
              return tab;
            })}
          </div>
          <div style={styles.content}>
            <div style={styles.header}>
              <div style={styles.title}>{this.props.title}</div>
              <div style={styles.description}>{this.props.description}</div>
            </div>
            <div style={styles.canvas}>
              {tab}
            </div>
            <div style={styles.buttons}>
              {dialogButtons}
            </div>
          </div>
        </div>
      </div>);
  }
});

DashboardDialog.Dialog = Dialog;
DashboardDialog.DialogTab = DialogTab;
DashboardDialog.DialogButtons = DialogButtons;
DashboardDialog.ButtonTab = ButtonTab;

module.exports = DashboardDialog;
