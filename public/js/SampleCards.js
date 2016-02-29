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
Maintenance.VideoChat = require('./cards/VideoChat.jsx');
Maintenance.MessageViewer = require('./cards/MessageViewer.jsx');
Maintenance.MessageDetails = require('./cards/MessageDetails.jsx');
Maintenance.LogViewer = require('./cards/LogViewer.jsx');
Maintenance.MaintenanceStore = require('./stores/MaintenanceStore.js');

module.exports = Maintenance;

},{"./cards/LogViewer.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/LogViewer.jsx","./cards/Maintenance.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/Maintenance.jsx","./cards/MessageDetails.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/MessageDetails.jsx","./cards/MessageViewer.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/MessageViewer.jsx","./cards/VideoChat.jsx":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/VideoChat.jsx","./stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/LogViewer.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var LoadIndicator = IoTFCommon.LoadIndicator;
var MaintenanceStore = require('../stores/MaintenanceStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    overflow: "scroll"

  },
  entry: {
    fontSize: "12px",
    backgroundColor: "#EEEEEE",
    padding: "2px 10px",
    margin: "1px"
  },
  timestamp: {
    width: "100px",
    display: "inline-block"
  },
  device: {
    width: "150px",
    display: "inline-block"
  },
  event: {
    width: "150px",
    display: "inline-block"
  },
  scroller: {}
};

var LogViewer = React.createClass({
  displayName: 'LogViewer',

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
    return {
      logEntries: []
    };
  },

  componentDidMount: function componentDidMount() {
    MaintenanceStore.listen(this.onUpdate);
  },

  onUpdate: function onUpdate(payload) {
    if (this.isMounted()) {
      if (payload.log) {
        if (!this.count) {
          this.count = 0;
        }
        payload.log = {
          log: payload.log,
          count: this.count++
        };
        this.state.logEntries.splice(0, 0, payload.log);
        while (this.state.logEntries.length > 100) {
          this.state.logEntries.pop();
        }
        this.setState(this.state.logEntries);
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {},

  render: function render() {
    var self = this;

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    if (this.state && this.state.logEntries && this.state.logEntries.length > 0) {
      return React.createElement(
        'div',
        { style: style },
        React.createElement(
          'div',
          { style: styles.scroller },
          this.state.logEntries.map(function (item) {
            return React.createElement(
              'div',
              { key: item.count, style: styles.entry },
              item.log
            );
          })
        )
      );
    } else {
      return React.createElement(
        'div',
        { style: style },
        'Start logging in maintenance card'
      );
    }
  }
});

module.exports = LogViewer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/Maintenance.jsx":[function(require,module,exports){
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
      if (payload.fullLog) {
        this.setState({
          log: payload.fullLog
        });
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

    var downloadButton = "";
    if (this.state.log) {
      downloadButton = React.createElement(Button, { key: 1, download: "DashboardLog.txt", onClick: function onClick() {
          setTimeout(function () {
            self.setState({ log: null });
          }, 1000);
        }, target: "_blank", href: "data:text;charset=utf-8," + this.state.log, text: "Download Log" });
    } else {
      downloadButton = React.createElement(Button, { key: 2, onClick: self.onStopLogging, text: "Stop Log" });
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
        React.createElement(Button, { onClick: self.onStartLogging, text: "Start log" }),
        downloadButton
      )
    );
  }
});

module.exports = Maintenance;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/MessageDetails.jsx":[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var LoadIndicator = IoTFCommon.LoadIndicator;
var MaintenanceStore = require('../stores/MaintenanceStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    overflow: "scroll"

  },
  entry: {
    fontSize: "14px",
    backgroundColor: "#EEEEEE",
    padding: "2px 10px",
    margin: "1px"
  },
  scroller: {}
};

var MessageDetails = React.createClass({
  displayName: 'MessageDetails',

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
    return {
      messages: []
    };
  },

  componentDidMount: function componentDidMount() {
    MaintenanceStore.listen(this.onUpdate);
    MaintenanceStore.Actions.observeMessages();
  },

  onUpdate: function onUpdate(payload) {
    if (this.isMounted()) {
      if (payload.message) {
        this.setState({
          message: payload.message
        });
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    MaintenanceStore.Actions.stopObservingMessages();
  },

  constructMessage: function constructMessage(message) {
    var self = this;

    var result = "";
    if (message != null && (typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
      var keys = Object.keys(message);
      result = React.createElement(
        'div',
        { style: styles.entry },
        keys.map(function (key) {
          return React.createElement(
            'div',
            { style: styles.entry },
            key,
            ': ',
            self.constructMessage(message[key])
          );
        })
      );
    } else {
      result = message;
    }
    return result;
  },

  render: function render() {
    var self = this;

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    if (this.state && this.state.message) {
      var message = this.constructMessage(this.state.message.data);

      var time = new Date(this.state.message.timestamp);

      return React.createElement(
        'div',
        { style: style },
        React.createElement(
          'div',
          { style: styles.scroller },
          React.createElement(
            'div',
            { style: styles.entry },
            React.createElement(
              'b',
              null,
              'Time:'
            ),
            ' ',
            time.toTimeString().split(" ")[0]
          ),
          React.createElement(
            'div',
            { style: styles.entry },
            React.createElement(
              'b',
              null,
              'Device:'
            ),
            ' ',
            this.state.message.device
          ),
          React.createElement(
            'div',
            { style: styles.entry },
            React.createElement(
              'b',
              null,
              'Event:'
            ),
            ' ',
            this.state.message.event
          ),
          React.createElement('p', null),
          message
        )
      );
    } else {
      return React.createElement('div', null);
    }
  }
});

module.exports = MessageDetails;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/MessageViewer.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var LoadIndicator = IoTFCommon.LoadIndicator;
var MaintenanceStore = require('../stores/MaintenanceStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    overflow: "scroll"

  },
  entry: {
    fontSize: "12px",
    backgroundColor: "#EEEEEE",
    padding: "2px 10px",
    margin: "1px"
  },
  timestamp: {
    width: "100px",
    display: "inline-block"
  },
  device: {
    width: "150px",
    display: "inline-block"
  },
  event: {
    width: "150px",
    display: "inline-block"
  },
  scroller: {}
};

var MessageViewer = React.createClass({
  displayName: 'MessageViewer',

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
    return {
      messages: []
    };
  },

  componentDidMount: function componentDidMount() {
    MaintenanceStore.listen(this.onUpdate);
    MaintenanceStore.Actions.observeMessages();
  },

  onUpdate: function onUpdate(payload) {
    if (this.isMounted()) {
      if (payload.message) {
        if (!this.count) {
          this.count = 0;
        }
        payload.message.count = this.count++;
        this.state.messages.splice(0, 0, payload.message);
        while (this.state.messages.length > 100) {
          this.state.messages.pop();
        }
        this.setState(this.state.messages);
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    MaintenanceStore.Actions.stopObservingMessages();
  },

  render: function render() {
    var self = this;

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    return React.createElement(
      'div',
      { style: style },
      React.createElement(
        'div',
        { style: styles.scroller },
        this.state.messages.map(function (item) {
          var time = new Date(item.timestamp);
          return React.createElement(
            'div',
            { key: item.count, style: styles.entry },
            React.createElement(
              'span',
              { style: styles.timestamp },
              time.toTimeString().split(" ")[0]
            ),
            React.createElement(
              'span',
              { style: styles.device },
              item.device
            ),
            React.createElement(
              'span',
              { style: styles.event },
              item.event
            )
          );
        })
      )
    );
  }
});

module.exports = MessageViewer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/cards/VideoChat.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var LoadIndicator = IoTFCommon.LoadIndicator;

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "0px"
  }
};

var VideoChat = React.createClass({
  displayName: 'VideoChat',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string
  },

  render: function render() {
    var self = this;

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    return React.createElement(
      'div',
      { style: style },
      React.createElement('iframe', { src: 'https://appear.in/fedscrum', width: '641', height: '341', frameborder: '0' })
    );
  }
});

module.exports = VideoChat;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/CustomCards/modules/Maintenance/stores/MaintenanceStore.js":[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var DashboardStore = IoTFComponents.Dashboard.DashboardStore;
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;

var Actions = Reflux.createActions(['backupDashboard', 'restoreDashboard', 'startLogging', 'stopLogging', 'observeMessages', 'stopObservingMessages']);

var MaintenanceStore = Reflux.createStore({

  Actions: Actions,

  buffer: [],
  pointer: 0,
  threshold: 500,

  init: function init() {
    this.listenTo(Actions.backupDashboard, this.onBackupDashboard);
    this.listenTo(Actions.restoreDashboard, this.onRestoreDashboard);
    this.listenTo(Actions.startLogging, this.onStartLogging);
    this.listenTo(Actions.stopLogging, this.onStopLogging);
    this.listenTo(Actions.observeMessages, this.onObserveMessages);
    this.listenTo(Actions.stopObservingMessages, this.onStopObservingMessages);
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

  onObserveMessages: function onObserveMessages() {
    var self = this;
    IoTFDeviceStore.setMessageObserver(function (device, event, data, timestamp) {
      self.trigger({ message: {
          device: device,
          event: event,
          data: data,
          timestamp: timestamp
        } });
    });
  },

  onStopObservingMessages: function onStopObservingMessages() {
    IoTFDeviceStore.setMessageObserver(null);
  },

  onStartLogging: function onStartLogging() {
    var self = this;
    this.buffer = [];
    this.pointer = 0;

    console.orgLog = console.log;
    console.log = function (obj) {
      self.storeInBuffer(obj);
      console.orgLog(obj);
    };

    console.orgInfo = console.info;
    console.info = function (obj) {
      self.storeInBuffer(obj);
      console.orgInfo(obj);
    };

    console.orgWarn = console.warn;
    console.warn = function (obj) {
      self.storeInBuffer(obj);
      console.orgWarn(obj);
    };

    console.orgError = console.error;
    console.error = function (obj) {
      self.storeInBuffer(obj);
      console.orgError(obj);
    };
  },

  onStopLogging: function onStopLogging() {
    var self = this;
    console.log = console.orgLog;
    console.info = console.orgInfo;
    console.warn = console.orgWarn;
    console.error = console.orgError;

    var text = this.getBufferAsString();
    this.trigger({
      fullLog: text
    });
  },

  storeInBuffer: function storeInBuffer(obj) {
    this.buffer[this.pointer] = obj;
    this.pointer++;
    if (this.pointer > this.threshold - 1) {
      this.pointer = 0;
    }
    this.trigger({
      log: obj
    });
  },

  getBufferAsString: function getBufferAsString() {
    var text = "";
    var counter = 0;
    for (var i = this.pointer; counter < this.threshold; i--) {
      if (i < 0) {
        i = this.threshold - 1;
      }
      var line = this.buffer[i];
      counter++;
      if (line) {
        text += line + "\r\n";
      }
    }
    return text;
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
