var React = require('react');
var DashboardStore = require('./DashboardStore');
var Actions = require('./Actions.jsx');
var Reflux = require('reflux');
var IconLink = require('../../common/components/IconLink.jsx');
var Button = require('../../common/components/Button.jsx');
var Dialog = require('../../Dialog/Dialog.jsx');
var DialogTab = Dialog.DialogTab;
var ColorSelection = require('../../common/components/ColorSelection.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');

var RPT = React.PropTypes;

var styles = {
  category: {
    marginTop: "50px",
    marginBottom: "40px",
    clear: "both"
  },
  categoryHeader: {
    color: "#152935",
    fontSize: "40px",
    fontWeight: "300"
  },
  component: {
    borderTop: "4px solid #4983c6",
    marginTop: "20px",
    marginLeft: "40px",
    clear: "both"
  },
  componentHeader: {
    fontSize: "24px",
    marginTop: "5px",
    marginBottom: "5px"
  },
  componentDescription: {
    fontSize: "16px"
  },
  componentThumbnail: {
    width: "240px",
    marginBottom: "30px",
    float: "right",
    marginLeft: "20px"
  },
  componentButton: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#1d3649",
    display: "inline-block",
    padding: "10px 40px",
    marginTop: "20px",
    marginRight: "20px",
    cursor: "pointer"
  },
  componentCustomization: {
    clear: "both",
    marginTop: "50px"
  }
};

var PageCustomization = React.createClass({
  propTypes: {
        id: RPT.string,
        action: RPT.string,
        style: RPT.object,
        nls: RPT.object,
        theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      id: null,
      action: null
    };
  },

  getInitialState: function() {
    return {
      dashboard: null
    };
  },

  componentWillMount: function() {
    var dashboard = null;
    if (this.props.id) {
      dashboard = DashboardStore.getDashboard(this.props.id);
    } else {
      dashboard = DashboardStore.getEmptyDashboard();
    }
    this.setState({
      dashboard: dashboard
    });
  },

  onSelect: function(name) {
    var payload = {
      dashboard: this.state.dashboard
    };
    Actions.addDashboard(payload);
  },

  onTitleChanged: function(name) {
    this.state.dashboard.label = name;
    this.setState({
      dashboard: this.state.dashboard
    });
  },

  render: function() {

    var self = this;
    var component = null;
    if (this.state.dashboard) {
      var dashboard = this.state.dashboard;

      return (<Dialog theme={this.props.theme}>
        <DialogTab id={'Page customization'} theme={self.props.theme} label={'Page customization'} cancel={self.props.nls.resolve('Cancel')} submit={self.props.nls.resolve('Submit')} key={'Page customization'}>
            <div style={styles.categoryHeader}></div>
            <div style={styles.component}>
              <div style={styles.componentHeader}>{self.props.nls.resolve("CreateDashboardPage_TITLE")}</div>
              <div style={styles.componentDescription}>{self.props.nls.resolve("CreateDashboardPage_DESC")}</div>
              <Button text={self.props.nls.resolve('Create')} isPrimary={true} onClick={function() {self.onSelect();}}>
              </Button>
              <div style={styles.componentCustomization}>
                <Label label={Messages.resolve('DashboardTitle')} theme={this.props.theme}>
                    <InputField theme={this.props.theme} onChange={this.onTitleChanged} initialValue={dashboard.label}></InputField>
                </Label>
              </div>
            </div>
        </DialogTab>
      </Dialog>);

    } else {
      return (<Dialog theme={this.props.theme}>No dashboard found</Dialog>);
    }
  }
});

module.exports = PageCustomization;
