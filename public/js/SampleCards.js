(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SampleCards = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/HelloWorld.jsx":[function(require,module,exports){
'use strict';

var HelloWorld = {};
HelloWorld.HelloWorld = require('./cards/HelloWorld.jsx');
HelloWorld.HelloWorldProperties = require('./customization/HelloWorldProperties.jsx');
HelloWorld.HelloWorldStore = require('./stores/HelloWorldStore.js');

module.exports = HelloWorld;

},{"./cards/HelloWorld.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/cards/HelloWorld.jsx","./customization/HelloWorldProperties.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/customization/HelloWorldProperties.jsx","./stores/HelloWorldStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/stores/HelloWorldStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/cards/HelloWorld.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var LoadIndicator = IoTFCommon.LoadIndicator;
var HelloWorldStore = require('../stores/HelloWorldStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat"
  },
  counter: {
    fontSize: "60px",
    textAlign: "center",
    width: "100%",
    paddingTop: "20px"
  }
};

var HelloWorld = React.createClass({
  displayName: 'HelloWorld',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string,
    helloColor: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      helloColor: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      message: "n/a",
      count: -1
    };
  },

  componentDidMount: function componentDidMount() {
    HelloWorldStore.listen(this.onUpdate);
    HelloWorldStore.Actions.sayHello("Hi there!");
  },

  onUpdate: function onUpdate(payload) {
    if (this.isMounted()) {
      if (payload.helloMessage || payload.helloCount !== undefined) {
        var model = {};
        if (payload.helloMessage) {
          model.message = payload.helloMessage;
        }
        if (payload.helloCount) {
          model.count = payload.helloCount;
        }
        this.setState(model);
      }
    }
  },

  render: function render() {
    var self = this;
    if (this.state.message && this.state.count > -1) {

      var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
      style = Object.assign(style, { color: this.props.theme.schemes[this.props.helloColor].normal });

      if (this.props.wrapper.width > 2) {
        // we could link to the kitty image in the resource folder but the url depends on the location of the package.
        // Therefore we point to the original on the Web.
        style = Object.assign(style, { backgroundImage: "url('http://wallpaper.pickywallpapers.com/1366x768/little-kitty.jpg')" });
      }

      return React.createElement(
        'div',
        { style: style },
        'The store says:',
        React.createElement(
          'div',
          { className: 'helloWorld' },
          this.state.message
        ),
        React.createElement(
          'div',
          { style: styles.counter },
          this.state.count
        )
      );
    } else {
      return React.createElement(
        'div',
        { style: styles.style },
        React.createElement(LoadIndicator, { theme: this.props.theme, useDataPoints: false })
      );
    }
  }
});

module.exports = HelloWorld;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/HelloWorldStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/stores/HelloWorldStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/customization/HelloWorldProperties.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var RPT = React.PropTypes;
var InputField = IoTFCommon.InputField;
var Label = IoTFCommon.Label;
var ColorSelection = IoTFCommon.ColorSelection;

var styles = {
  container: {},
  table: {
    width: "100%"
  }
};

var HelloWorldProperties = React.createClass({
  displayName: 'HelloWorldProperties',

  propTypes: {
    helloColor: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      helloColor: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      helloColor: this.props.helloColor
    };
  },

  onColorChanged: function onColorChanged(value) {
    this.setState({
      helloColor: value
    });
  },

  onUpdate: function onUpdate(state) {
    var state = Object.assign({}, this.state, state);
    this.setState(state);
  },

  render: function render() {
    var self = this;

    if (this.state) {
      return React.createElement(
        'div',
        { style: Object.assign({}, styles.container, this.props.style) },
        React.createElement(
          'table',
          { style: styles.table },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '2' },
                React.createElement(
                  Label,
                  { label: this.props.nls.resolve('ColorScheme'), theme: this.props.theme },
                  React.createElement(ColorSelection, { theme: this.props.theme, onChange: this.onColorChanged, initialSelection: this.state.helloColor })
                )
              )
            )
          )
        )
      );
    } else {
      return React.createElement('div', null);
    }
  }
});

module.exports = HelloWorldProperties;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/stores/HelloWorldStore.js":[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var Actions = Reflux.createActions(['sayHello']);

var HelloWorldStore = Reflux.createStore({

  Actions: Actions,
  helloCount: 0,

  init: function init() {
    this.listenTo(Actions.sayHello, this.onSayHello);
    var self = this;
    setInterval(function () {
      self.helloCount++;
      self.trigger({
        helloCount: self.helloCount
      });
    }, 1000);
  },

  onSayHello: function onSayHello(payload) {
    this.trigger({
      helloMessage: "Hello from the store!",
      helloCount: this.helloCount
    });
  }

});

module.exports = HelloWorldStore;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/Maintenance.jsx":[function(require,module,exports){
'use strict';

var Maintenance = {};
Maintenance.Maintenance = require('./cards/Maintenance.jsx');
Maintenance.MaintenanceStore = require('./stores/MaintenanceStore.js');

module.exports = Maintenance;

},{"./cards/Maintenance.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/Maintenance.jsx","./stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/Maintenance.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var LoadIndicator = IoTFCommon.LoadIndicator;
var MaintenanceStore = require('../stores/MaintenanceStore.js');
var Button = IoTFCommon.Button;
var Label = IoTFCommon.Label;

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px"
  }
};

var Maintenance = React.createClass({
  displayName: 'Maintenance',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  getInitialState: function getInitialState() {
    return {};
  },

  componentDidMount: function componentDidMount() {
    MaintenanceStore.listen(this.onUpdate);
  },

  onUpdate: function onUpdate(payload) {
    if (this.isMounted()) {
      if (payload.dashboards) {
        var model = {};
        if (payload.dashboards) {
          model.dashboards = payload.dashboards;
        }
        this.setState(model);
      }
    }
  },

  onBackup: function onBackup() {
    MaintenanceStore.Actions.backupDashboard();
  },

  onRestore: function onRestore() {
    var button = document.getElementById("uploadButton");
    button.click();
  },

  onUploadRestoreFile: function onUploadRestoreFile() {
    var button = document.getElementById("uploadButton");
    var files = button.files;
    if (files && files.length > 0) {
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var content = e.target.result;
        console.log(content);
        MaintenanceStore.Actions.restoreDashboard({ content: content });
      };
      reader.readAsBinaryString(file);
    }
  },

  onStartLogging: function onStartLogging() {
    MaintenanceStore.Actions.startLogging();
  },

  onStopLogging: function onStopLogging() {
    MaintenanceStore.Actions.stopLogging();
  },

  onDownloadLog: function onDownloadLog() {
    MaintenanceStore.Actions.downloadLog();
  },

  render: function render() {
    var self = this;

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    var backupButton = "";
    if (this.state.dashboards) {
      backupButton = React.createElement(Button, { key: 1, download: "DashboardBackup.json", onClick: function onClick() {
          setTimeout(function () {
            self.setState({ dashboards: null });
          }, 1000);
        }, target: "_blank", href: "data:text/json;charset=utf-8," + this.state.dashboards, text: "Download Backup" });
    } else {
      backupButton = React.createElement(Button, { key: 2, onClick: self.onBackup, text: "Generate Backup" });
    }

    return React.createElement(
      'div',
      { style: style },
      React.createElement(
        Label,
        { label: "Dashboard", theme: this.props.theme },
        backupButton,
        React.createElement(Button, { onClick: self.onRestore, text: "Restore" }),
        React.createElement('input', { id: 'uploadButton', onChange: this.onUploadRestoreFile, type: "file", style: { display: "none" } })
      ),
      React.createElement(
        Label,
        { label: "Logs", theme: this.props.theme },
        React.createElement(Button, { onClick: self.onBackup, text: "Start log" }),
        React.createElement(Button, { onClick: self.onRestore, text: "Stop log" }),
        React.createElement(Button, { onClick: self.onBackup, text: "Download log" })
      )
    );
  }
});

module.exports = Maintenance;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js":[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var DashboardStore = IoTFComponents.Dashboard.DashboardStore;

var Actions = Reflux.createActions(['backupDashboard', 'restoreDashboard', 'startLogging', 'stopLogging', 'downloadLog']);

var MaintenanceStore = Reflux.createStore({

  Actions: Actions,

  init: function init() {
    this.listenTo(Actions.backupDashboard, this.onBackupDashboard);
    this.listenTo(Actions.restoreDashboard, this.onRestoreDashboard);
    this.listenTo(Actions.startLogging, this.onStartLogging);
    this.listenTo(Actions.stopLogging, this.onStopLogging);
    this.listenTo(Actions.downloadLog, this.onDownloadLog);
  },

  onBackupDashboard: function onBackupDashboard() {
    var dashboards = DashboardStore.dashboards;
    var json = JSON.stringify(dashboards);

    this.trigger({
      dashboards: json
    });
  },

  onRestoreDashboard: function onRestoreDashboard(payload) {
    var ds = DashboardStore;
    var content = payload.content;
    try {
      var obj = JSON.parse(content);
      ds.dashboards = obj;

      ds.cleanup();

      var dashboard = ds.dashboards.dashboards[0];

      var name = null;
      if (!name && ds.dashboards.settings && ds.dashboards.settings.defaultDashboard) {
        name = ds.dashboards.settings.defaultDashboard;
      }

      if (name) {
        var temp = ds.getDashboardByName(name);
        if (temp) {
          dashboard = temp;
        }
      }

      ds.dashboard = dashboard;

      ds.trigger({ components: ds.getComponents(), dashboard: ds.dashboard });
      ds.storeDashboard();
    } catch (e) {
      this.trigger({
        error: "Restore failed"
      });
    }
  },

  onStartLogging: function onStartLogging() {
    this.trigger({});
  },

  onStopLogging: function onStopLogging() {
    this.trigger({});
  },

  onDownloadLog: function onDownloadLog() {
    this.trigger({});
  }

});

module.exports = MaintenanceStore;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/CustomCards/modules/Modules.jsx":[function(require,module,exports){
'use strict';

var Modules = {};
Modules.HelloWorld = require('./HelloWorld/HelloWorld.jsx');
Modules.Maintenance = require('./Maintenance/Maintenance.jsx');
module.exports = Modules;

},{"./HelloWorld/HelloWorld.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/HelloWorld/HelloWorld.jsx","./Maintenance/Maintenance.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/Maintenance.jsx"}]},{},["/Users/frank/Documents/Projects/CustomCards/modules/Modules.jsx"])("/Users/frank/Documents/Projects/CustomCards/modules/Modules.jsx")
});
//# sourceMappingURL=SampleCards.js.map
