const React = require('react');
const $ = require('jquery');
const DashboardStore = require('./dashboard/DashboardStore');
const DashboardUtils = require('./dashboard/DashboardUtils');
const DashboardCanvas = require('./dashboard/DashboardCanvas.jsx');
const DashboardControl = require('./dashboard/DashboardControl.jsx');
const CustomizationWizard = require('./dashboard/CustomizationWizard.jsx');
const ComponentCustomization = require('./dashboard/ComponentCustomization.jsx');
const DialogAAAUserDetails = require('../AAA/dialogs/DialogAAAUserDetails.jsx');
const DialogAddMember = require('../AAA/dialogs/DialogAddMember.jsx');
const PageCustomization = require('./dashboard/PageCustomization.jsx');
const IoTFAuthStore = require('../common/stores/IoTFAuthStore.js');
const Actions = require('./dashboard/Actions.jsx');


const RPT = React.PropTypes;

const styles = {
  dialogContainer:{
    zIndex:"2000",
    position:"relative"
  },
  canvas: {
    //width: "1440px"
  },
  container: {
    backgroundColor: "#142a36"
  }
};

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      strings: {}
    };


    if (props.dashboardConfig) {
      DashboardStore.setDashboardConfig(props.dashboardConfig);
      DashboardUtils.setDashboardConfig(props.dashboardConfig);
    }
    if (props.defaultDashboard) {
      DashboardStore.setDefaultDashboard(props.defaultDashboard);
    }
    if(props.experimental){
      console.log("Experimental mode enabled");
      DashboardStore.setExperimentalMode(true);
    }

    // pass the emitter object to the store to emit whenever somebody call the notify action
    if (props.emitter) {
      DashboardStore.setEmitter(props.emitter);
    }

    DashboardStore.listen(function(payload) {
      if (payload.history !== undefined) {
        var editState = false
        if (payload.history > 1) {
          editState = true;
        }
        props.emitter.emit("Dashboard.inEditMode", editState);
      }
    });

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onModelUpdate = this.onModelUpdate.bind(this);
    this.render = this.render.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleNLS = this.handleNLS.bind(this);
  }

  handleNLS(strings) {
    this.setState(strings);
    this.render();
  }
  componentWillMount() {
    if (this.props.strings.length > 0) {
      this.props.nls.resolve("Dashboard", this.props.strings, this.handleNLS);
    }
  }

  componentDidMount() {
    DashboardStore.listen(this.onModelUpdate);
    IoTFAuthStore.Actions.setAuth(this.props.auth.org, this.props.auth.ltpa, this.props.auth.domain, this.props.auth.apiKey, this.props.auth.apiToken);

    window.addEventListener("orientationchange", function() {
      let orientation  = window.screen.orientation.angle;
      if(orientation == 90 || orientation == -90){
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.80, maximum-scale=1.0, user-scalable=no');
      }
      else{
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        console.log(viewport);
      }
    }, false);

  }

  onModelUpdate(payload) {
    const model = {};
    if (payload.dialog) model.dialog = payload.dialog;
    if (Object.keys(model).length > 0) {
      this.setState(model);
      if (model.dialog == 'none') {
        $('body').css('overflow', 'auto');
      } else {
        $('body').css('overflow', 'hidden');
      }
    }
  }

  onDeviceUpdate(payload) {
    Actions.deviceUpdated(payload);
  }

  render() {
    let dialog = "";

    const theme = DashboardStore.getTheme();

    if (this.state.dialog) {
      if (this.state.dialog.dialog == "ComponentSelection") {
        dialog = <ComponentSelection theme={theme} nls={this.props.nls} id={this.state.dialog.id} action={this.state.dialog.action}/>
      } else if (this.state.dialog.dialog == "ComponentCustomization") {
        dialog = <ComponentCustomization theme={theme} nls={this.props.nls} id={this.state.dialog.id} type={this.state.dialog.type} action={this.state.dialog.action}/>
      } else if (this.state.dialog.dialog == "CustomizationWizard") {
        dialog = <ComponentCustomization theme={theme} nls={this.props.nls} id={this.state.dialog.id} type={this.state.dialog.type} action={this.state.dialog.action}/>
      } else if (this.state.dialog.dialog == "PageCustomization") {
        dialog = <PageCustomization theme={theme} nls={this.props.nls} id={this.state.dialog.id} action={this.state.dialog.action}/>
      } else if (this.state.dialog.dialog == "DialogAddMember") {
        dialog = <DialogAddMember theme={theme} nls={this.props.nls} id={this.state.dialog.id} type={this.state.dialog.type} action={this.state.dialog.action}/>
      } else if (this.state.dialog.dialog == "DialogAAAUserDetails") {
        dialog = <DialogAAAUserDetails theme={theme} nls={this.props.nls} id={this.state.dialog.id} type={this.state.dialog.type} action={this.state.dialog.action}/>
      }
    }

    var control = "";
    if (DashboardUtils.getCapability("showControls")) {
      control = <DashboardControl theme={theme} nls={this.props.nls} configurable={true}></DashboardControl>
    }

    var container = Object.assign({}, styles.container, {backgroundColor: theme.canvas});

    return (
      <div style={container}r>
        {control}
        <div style={styles.canvas}>
          <DashboardCanvas theme={theme} nls={this.props.nls}  />
        </div>
        <div style={styles.dialogContainer}>
            {dialog}
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  style: RPT.object,
  nls: RPT.object,
  auth: RPT.object
};
Dashboard.defaultProps = {
  strings: []
};
Dashboard.callAction = function(action) {
    if (action == "ADD_CARD") {
      Actions.showDialog({
        id: null,
        action: 'addCard'
      });
    } else if (action == "UNDO") {
      Actions.undo();
    } else if (action == "EXPERIMENTAL_ON") {
      DashboardStore.setExperimentalMode(true);
    } else if (action == "EXPERIMENTAL_OFF") {
      DashboardStore.setExperimentalMode(false);
    }
  };


module.exports = Dashboard;
