var React = require('react');
var IoTFCommon = require('IoTFCommon');
var LoadIndicator = IoTFCommon.LoadIndicator;
var MaintenanceStore = require('../stores/MaintenanceStore.js');
var Button = IoTFCommon.Button;
var Label =IoTFCommon.Label;

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px"
  }
}

var Maintenance = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string
  },

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function() {
    MaintenanceStore.listen(this.onUpdate);
  },

  onUpdate: function(payload) {
    if (this.isMounted()) {
      if (payload.dashboards) {
        var model = {};
        if (payload.dashboards) {
          model.dashboards = payload.dashboards;
        }
        this.setState(model);
      }
      if (payload.fullLog) {
        this.setState({
          log: payload.fullLog
        })
      }
    }
  },

  onBackup: function() {
    MaintenanceStore.Actions.backupDashboard();
  },

  onRestore: function() {
    var button = document.getElementById("uploadButton");
    button.click();
  },

  onUploadRestoreFile: function() {
    var button = document.getElementById("uploadButton");
    var files = button.files;
    if (files && files.length > 0) {
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var content = e.target.result;
        console.log(content);
        MaintenanceStore.Actions.restoreDashboard({content: content});
      };
      reader.readAsBinaryString(file);
    }
  },

  onStartLogging: function() {
    MaintenanceStore.Actions.startLogging();
  },

  onStopLogging: function() {
    MaintenanceStore.Actions.stopLogging();
  },

  render: function() {
  	var self = this;

    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    var backupButton = "";
    if (this.state.dashboards) {
      backupButton = <Button key={1} download={"DashboardBackup.json"} onClick={function() {setTimeout(function() {self.setState({dashboards: null})}, 1000)}} target={"_blank"} href={"data:text/json;charset=utf-8," + this.state.dashboards} text={"Download Backup"}></Button>
    } else {
      backupButton = <Button key={2} onClick={self.onBackup} text={"Generate Backup"}></Button>
    }

    var downloadButton = "";
    if (this.state.log) {
      downloadButton = <Button key={1} download={"DashboardLog.txt"} onClick={function() {setTimeout(function() {self.setState({log: null})}, 1000)}} target={"_blank"} href={"data:text;charset=utf-8," + this.state.log} text={"Download Log"}></Button>
    } else {
      downloadButton = <Button key={2} onClick={self.onStopLogging} text={"Stop Log"}></Button>
    }

    return (
      <div style={style}>
        <Label label={"Dashboard"} theme={this.props.theme}>
          {backupButton}
          <Button onClick={self.onRestore} text={"Restore"}></Button>
          <input id="uploadButton" onChange={this.onUploadRestoreFile} type={"file"} style={{display: "none"}}/>
        </Label>
        <Label label={"Logs"} theme={this.props.theme}>
          <Button onClick={self.onStartLogging} text={"Start log"}></Button>
          {downloadButton}
        </Label>

      </div>
    )
  }
});

module.exports = Maintenance;
