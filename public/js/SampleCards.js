(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SampleCards = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/frank/Documents/Projects/SampleCards/modules/ElevatorDemo/ElevatorDemo.jsx":[function(require,module,exports){
'use strict';

var ElevatorDemo = {};
ElevatorDemo.Elevator = require('./cards/Elevator.jsx');
ElevatorDemo.ElevatorProperties = require('./customization/ElevatorProperties.jsx');

module.exports = ElevatorDemo;

},{"./cards/Elevator.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ElevatorDemo/cards/Elevator.jsx","./customization/ElevatorProperties.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ElevatorDemo/customization/ElevatorProperties.jsx"}],"/Users/frank/Documents/Projects/SampleCards/modules/ElevatorDemo/cards/Elevator.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;
var LoadIndicator = IoTFCommon.LoadIndicator;

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden"
  },
  empty: {
    padding: "20px"
  },
  scroller: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    transition: "top 0.5s ease"
  },
  floor: {
    width: "110px",
    fontSize: "60px",
    fontWeight: 100,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "120px",
    transition: "fontSize 1s ease"
  },
  highlight: {
    position: "absolute",
    width: "100%",
    height: "120px",
    opacity: 0.5,
    transition: "bottom 1s ease"
  },
  cabin: {
    position: "absolute",
    height: "100px",
    width: "60px",
    fontWeight: 200,
    border: "3px solid grey",
    backgroundColor: "white",
    left: "120px",
    transition: "bottom 1s ease",
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: "24px",
    lineHeight: "normal",
    paddingTop: "20px"
  },
  weightBar: {
    position: "absolute",
    width: "100%",
    height: "0px",
    bottom: "0px",
    left: "0px",
    transition: "height 1s ease",
    overflow: "hidden"
  },
  weightBarContainer: {
    height: "100px",
    width: "100%",
    position: "absolute",
    bottom: "-2px",
    lineHeight: "normal",
    paddingTop: "20px"
  },
  scale: {
    position: "absolute",
    top: "60px",
    bottom: "60px",
    width: "20px",
    right: "13px"
  },
  scaleAxis: {
    height: "100%",
    position: "absolute",
    left: "9px",
    borderLeft: "3px solid grey"
  },
  tick: {
    fontSize: "20px",
    lineHeight: "20px",
    backgroundColor: "white",
    width: "30px",
    position: "absolute",
    padding: "4px 0px",
    textAlign: "center",
    left: "-5px"
  },
  simpleTick: {
    borderBottom: "3px solid grey",
    width: "9px",
    position: "absolute",
    left: "5px"
  },
  heightLabel: {
    position: "absolute",
    fontSize: "20px",
    lineHeight: "30px",
    height: "30px",
    right: "48px",
    width: "65px",
    textAlign: "right",
    paddingRight: "0px",
    transition: "bottom 1s ease"
  },
  labelText: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  pointer: {
    width: "20px",
    height: "20px",
    transform: "rotate(45deg)",
    right: "-10px",
    top: "6px",
    position: "absolute"
  }
};

var Elevator = React.createClass({
  displayName: 'Elevator',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    minFloor: RPT.number,
    maxFloor: RPT.number,
    minHeight: RPT.number,
    maxHeight: RPT.number,
    capacity: RPT.number,
    floor: RPT.string,
    height: RPT.string,
    weight: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      plots: [],
      data: {}
    };
  },

  getInitialState: function getInitialState() {
    return {};
  },

  componentDidMount: function componentDidMount() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function onUpdate(payload) {
    var model = {};

    model = this.addData(payload, "floor", model);
    model = this.addData(payload, "height", model);
    model = this.addData(payload, "weight", model);

    if (Object.keys(model).length > 0) {
      model.timestamp = new Date().getTime();
      var self = this;
      setTimeout(function () {
        self.setState(model);
      }, 1);
    }
  },

  getPlot: function getPlot(type) {
    var prop = this.props[type];
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot.id == prop) {
        return plot;
      }
    }
    return null;
  },

  addData: function addData(payload, type, model) {
    var plot = this.getPlot(type);

    if (plot) {
      if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

        var property = IoTFDeviceStore.normalizeProperty(plot.property);
        var obj = payload.deviceEvent.data[property];

        if (obj !== undefined) {
          model[type] = obj;
        }
      }
    }

    return model;
  },

  render: function render() {
    var self = this;
    if (this.state.floor !== undefined || this.state.height !== undefined || this.state.weight !== undefined) {

      var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

      // create array of floor names
      var floors = [];
      var floorPlot = this.getPlot("floor");
      var floorMin = floorPlot.min !== undefined ? floorPlot.min : 0;
      var floorMax = floorPlot.max !== undefined ? floorPlot.max : 5;
      for (var i = floorMax; i >= floorMin; i--) {
        floors.push("" + i);
      }
      var currentFloor = this.state.floor !== undefined ? this.state.floor - floorMin : floorMin;
      var highlight = Object.assign({}, styles.highlight, { backgroundColor: this.props.theme.light, bottom: 120 * currentFloor + "px" });

      // prepare height scale and cabin
      var scale = [];
      var heightPlot = this.getPlot("height");
      var heightMin = Math.floor(heightPlot.min !== undefined ? heightPlot.min : 0);
      var heightMax = Math.floor(heightPlot.max !== undefined ? heightPlot.max : 20);
      for (var i = heightMax; i >= heightMin; --i) {
        scale.push(i);
      }
      var currentHeight = this.state.height !== undefined ? this.state.height - heightMin : heightMin;
      var heightFactor = 120 / ((heightMax - heightMin) / (floorMax - floorMin));
      var cabin = Object.assign({}, styles.cabin, { borderColor: this.props.theme.normal, backgroundColor: this.props.theme.content, color: this.props.theme.major, bottom: heightFactor * currentHeight + 10 + "px" });
      var label = Object.assign({}, styles.heightLabel, { backgroundColor: this.props.theme.light, color: this.props.theme.content, bottom: heightFactor * currentHeight + 40 + "px" });
      var labelText = Object.assign({}, styles.labelText, { backgroundColor: this.props.theme.light });
      var pointer = Object.assign({}, styles.pointer, { backgroundColor: this.props.theme.light });

      // prepare weight indicator
      var weight = [];
      var weightPlot = this.getPlot("weight");
      var weightMin = 0;
      var weightMax = weightPlot.max !== undefined ? weightPlot.max : 2000;
      var currentWeight = this.state.weight / weightMax * 100;
      var weightBar = Object.assign({}, styles.weightBar, { backgroundColor: this.props.theme.normal, color: this.props.theme.content, height: currentWeight + "px" });

      var contentHeight = (floorMax - floorMin) * 120;
      var containerHeight = this.props.wrapper.realHeight;

      var top = Math.min(contentHeight - currentFloor * 120, contentHeight - heightFactor * currentHeight);
      var bottom = Math.max(contentHeight - currentFloor * 120 + 120, contentHeight - (heightFactor * currentHeight + 120));

      var scrollPos = this.scrollPos ? this.scrollPos : 0;
      if (bottom + scrollPos > containerHeight) {
        scrollPos = -(bottom - containerHeight);
      } else if (top + scrollPos < 0) {
        scrollPos = 0 - top;
      }
      this.scrollPos = scrollPos;
      var scroller = Object.assign({}, styles.scroller, { top: scrollPos + "px" });

      return React.createElement(
        'div',
        { style: style },
        React.createElement(
          'div',
          { style: scroller },
          React.createElement(
            'div',
            { style: styles.scale },
            React.createElement('div', { style: styles.scaleAxis }),
            scale.map(function (item) {
              if (item % 5 == 0) {
                var tick = Object.assign({}, styles.tick, { backgroundColor: self.props.theme.content, color: self.props.theme.minor, bottom: heightFactor * item - 20 + "px" });
                return React.createElement(
                  'div',
                  { key: item, style: tick },
                  item
                );
              } else {
                var tick = Object.assign({}, styles.simpleTick, { borderColor: self.props.theme.minor, bottom: heightFactor * item - 10 + "px" });
                return React.createElement('div', { key: item, style: tick });
              }
            })
          ),
          React.createElement('div', { style: highlight }),
          React.createElement(
            'div',
            { style: styles.floors },
            floors.map(function (item) {
              var floor = Object.assign({}, styles.floor, "" + self.state.floor == item ? { fontSize: "100px" } : {});
              return React.createElement(
                'div',
                { key: item, style: floor },
                item
              );
            })
          ),
          React.createElement(
            'div',
            { style: cabin },
            this.state.weight,
            ' kg',
            React.createElement(
              'div',
              { style: weightBar },
              React.createElement(
                'div',
                { style: styles.weightBarContainer },
                this.state.weight,
                ' kg'
              )
            )
          ),
          React.createElement(
            'div',
            { style: label },
            React.createElement('div', { style: pointer }),
            React.createElement(
              'div',
              { style: labelText },
              this.state.height,
              ' m'
            )
          )
        )
      );
    } else {
      if (!this.props.floor || !this.props.height || !this.props.weight) {
        return React.createElement(
          'div',
          { style: styles.empty },
          'No all data point defined'
        );
      } else {
        return React.createElement(
          'div',
          { style: styles.empty },
          React.createElement(LoadIndicator, { theme: this.props.theme, useDataPoints: true })
        );
      }
    }
  }
});

module.exports = Elevator;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/ElevatorDemo/customization/ElevatorProperties.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var RPT = React.PropTypes;
var InputField = IoTFCommon.InputField;
var Label = IoTFCommon.Label;
var Select = IoTFCommon.Select;
var Option = IoTFCommon.Option;

var styles = {
  container: {},
  table: {
    width: "100%"
  }

};

var ElevatorProperties = React.createClass({
  displayName: 'ElevatorProperties',


  propTypes: {
    floor: RPT.string,
    height: RPT.string,
    weight: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      floor: "location.floor",
      height: "location.height",
      weight: "weight.value"
      // floor: null,
      // height: null,
      // weight: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      floor: this.props.floor,
      height: this.props.height,
      weight: this.props.weight
    };
  },

  onFloorChanged: function onFloorChanged(value) {
    this.setState({
      floor: value
    });
  },

  onHeightChanged: function onHeightChanged(value) {
    this.setState({
      height: value
    });
  },

  onWeightChanged: function onWeightChanged(value) {
    this.setState({
      weight: value
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
                  { label: 'Floor data point', theme: this.props.theme },
                  React.createElement(
                    Select,
                    { theme: this.props.theme, onChange: this.onFloorChanged, value: this.state.floor },
                    this.props.plots.map(function (item) {
                      return React.createElement(
                        Option,
                        { key: item.id, value: item.id, selected: self.state.floor == item.id },
                        item.label
                      );
                    })
                  )
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '2' },
                React.createElement(
                  Label,
                  { label: 'Height data point', theme: this.props.theme },
                  React.createElement(
                    Select,
                    { theme: this.props.theme, onChange: this.onHeightChanged, value: this.state.height },
                    this.props.plots.map(function (item) {
                      return React.createElement(
                        Option,
                        { key: item.id, value: item.id, selected: self.state.height == item.id },
                        item.label
                      );
                    })
                  )
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '2' },
                React.createElement(
                  Label,
                  { label: 'Weight data point', theme: this.props.theme },
                  React.createElement(
                    Select,
                    { theme: this.props.theme, onChange: this.onWeightChanged, value: this.state.weight },
                    this.props.plots.map(function (item) {
                      return React.createElement(
                        Option,
                        { key: item.id, value: item.id, selected: self.state.weight == item.id },
                        item.label
                      );
                    })
                  )
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

module.exports = ElevatorProperties;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/Maintenance.jsx":[function(require,module,exports){
'use strict';

var Maintenance = {};
Maintenance.Maintenance = require('./cards/Maintenance.jsx');
Maintenance.VideoChat = require('./cards/VideoChat.jsx');
Maintenance.MessageViewer = require('./cards/MessageViewer.jsx');
Maintenance.MessageDetails = require('./cards/MessageDetails.jsx');
Maintenance.LogViewer = require('./cards/LogViewer.jsx');
Maintenance.MaintenanceStore = require('./stores/MaintenanceStore.js');

module.exports = Maintenance;

},{"./cards/LogViewer.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/LogViewer.jsx","./cards/Maintenance.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/Maintenance.jsx","./cards/MessageDetails.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/MessageDetails.jsx","./cards/MessageViewer.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/MessageViewer.jsx","./cards/VideoChat.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/VideoChat.jsx","./stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/LogViewer.jsx":[function(require,module,exports){
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
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/Maintenance.jsx":[function(require,module,exports){
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
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/MessageDetails.jsx":[function(require,module,exports){
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
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/MessageViewer.jsx":[function(require,module,exports){
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
},{"../stores/MaintenanceStore.js":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/stores/MaintenanceStore.js"}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/cards/VideoChat.jsx":[function(require,module,exports){
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
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/stores/MaintenanceStore.js":[function(require,module,exports){
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
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/Modules.jsx":[function(require,module,exports){
'use strict';

var Modules = {};
Modules.Maintenance = require('./Maintenance/Maintenance.jsx');
Modules.ElevatorDemo = require('./ElevatorDemo/ElevatorDemo.jsx');
Modules.WeatherService = require('./WeatherService/WeatherService.jsx');
Modules.Runtastic = require('./Runtastic/Runtastic.jsx');
Modules.ToggleGroup = require('./ToggleGroup/ToggleGroup.jsx');

module.exports = Modules;

},{"./ElevatorDemo/ElevatorDemo.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ElevatorDemo/ElevatorDemo.jsx","./Maintenance/Maintenance.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Maintenance/Maintenance.jsx","./Runtastic/Runtastic.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Runtastic/Runtastic.jsx","./ToggleGroup/ToggleGroup.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/ToggleGroup.jsx","./WeatherService/WeatherService.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/WeatherService/WeatherService.jsx"}],"/Users/frank/Documents/Projects/SampleCards/modules/Runtastic/Runtastic.jsx":[function(require,module,exports){
'use strict';

var Runtastic = {};
Runtastic.Runtastic = require('./cards/Runtastic.jsx');

module.exports = Runtastic;

},{"./cards/Runtastic.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/Runtastic/cards/Runtastic.jsx"}],"/Users/frank/Documents/Projects/SampleCards/modules/Runtastic/cards/Runtastic.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);

var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;
var LoadIndicator = IoTFCommon.LoadIndicator;
var CardDatapoint = IoTFCommon.CardDatapoint;

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    padding: "30px"
  },
  empty: {
    padding: "20px"
  },
  map: {
    right: "30px",
    top: "30px",
    position: "absolute"
  }
};

var Runtastic = React.createClass({
  displayName: 'Runtastic',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      plots: [],
      data: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      "date": null,
      "distance": 0,
      "duration": 0,
      "gain": 0,
      "id": "0",
      "kcal": 0,
      "loss": 0,
      "map": "",
      "pace": 0,
      "page": "",
      "speed": 0
    };
  },

  componentDidMount: function componentDidMount() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    if (this.props.plots && this.props.plots.length > 0) {
      var plot = this.props.plots[0];
      // we just listen for the event since the properties are hardcoded
      IoTFDeviceStore.Actions.startEventWatch(plot.device, plot.event);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function onUpdate(payload) {
    if (this.props.plots && this.props.plots.length > 0) {
      var plot = this.props.plots[0];
      if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

        var model = {};
        var data = payload.deviceEvent.data;

        model = this.addData(data, "date", model);
        model = this.addData(data, "distance", model);
        model = this.addData(data, "duration", model);
        model = this.addData(data, "gain", model);
        model = this.addData(data, "id", model);
        model = this.addData(data, "kcal", model);
        model = this.addData(data, "loss", model);
        model = this.addData(data, "map", model);
        model = this.addData(data, "pace", model);
        model = this.addData(data, "page", model);
        model = this.addData(data, "speed", model);

        if (Object.keys(model).length > 0) {
          model.timestamp = new Date().getTime();
          var self = this;
          setTimeout(function () {
            self.setState(model);
          }, 1);
        }
      }
    }
  },

  addData: function addData(payload, property, model) {
    var property = IoTFDeviceStore.normalizeProperty(property);
    var obj = payload[property];

    if (obj !== undefined) {
      model[property] = obj;
    }

    return model;
  },

  render: function render() {
    var self = this;
    if (this.state["date"]) {

      var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

      var html = "";
      var height = this.props.wrapper.height;
      var width = this.props.wrapper.width;

      var seconds = Math.floor(this.state["duration"] / 1000);
      var hours = Math.floor(seconds / 3600);
      seconds = seconds - hours * 3600;
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;

      var dateString = this.state["date"];
      // handle messed up date format (missing leading 0 for hours below 10)
      var tokens = dateString.split("T");
      dateString = tokens[0] + "T" + (tokens[1].length < 8 ? "0" : "") + tokens[1];

      var dateObj = new Date(dateString);

      var main = React.createElement(
        'div',
        null,
        React.createElement(
          CardDatapoint,
          { theme: this.props.theme, unit: 'Start time' },
          dateObj.toLocaleString().replace(",", " ")
        ),
        React.createElement(
          CardDatapoint,
          { theme: this.props.theme, unit: 'Distance' },
          this.state["distance"],
          ' m'
        ),
        React.createElement(
          CardDatapoint,
          { theme: this.props.theme, unit: 'Duration' },
          hours,
          ' h ',
          minutes,
          ' m ',
          seconds,
          ' s'
        )
      );

      var paceSeconds = this.state["pace"];
      var paceMinutes = Math.floor(paceSeconds);
      paceSeconds = Math.floor((paceSeconds - paceMinutes) * 60);

      var sub = React.createElement(
        'div',
        null,
        React.createElement(
          CardDatapoint,
          { theme: this.props.theme, unit: 'Pace' },
          paceMinutes,
          ' m ',
          paceSeconds,
          ' s per km'
        ),
        React.createElement(
          CardDatapoint,
          { theme: this.props.theme, unit: 'Speed' },
          this.state["speed"].toFixed(2),
          ' km/h'
        )
      );

      if (height == 3 && width == 2) {

        return React.createElement(
          'div',
          { style: style },
          main
        );
      } else if (height == 4 && width == 4) {
        var mapUrl = "http:" + this.state["map"];
        mapUrl = mapUrl.replace("width=50", "width=300");
        mapUrl = mapUrl.replace("height=70", "height=280");
        return React.createElement(
          'div',
          { style: style },
          main,
          sub,
          React.createElement('img', { style: styles.map, src: mapUrl })
        );
      } else {
        return React.createElement(
          'div',
          { style: style },
          main
        );
      }
    } else {
      return React.createElement(
        'div',
        { style: styles.empty },
        React.createElement(LoadIndicator, { theme: this.props.theme, useDataPoints: true })
      );
    }
  }
});

module.exports = Runtastic;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/ToggleGroup.jsx":[function(require,module,exports){
'use strict';

var ToggleGroup = {};
ToggleGroup.ToggleGroup = require('./cards/ToggleGroup.jsx');
ToggleGroup.ToggleTile = require('./components/ToggleTile.jsx');
ToggleGroup.ToggleGroupProperties = require('./customization/ToggleGroupProperties.jsx');

module.exports = ToggleGroup;

},{"./cards/ToggleGroup.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/cards/ToggleGroup.jsx","./components/ToggleTile.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/components/ToggleTile.jsx","./customization/ToggleGroupProperties.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/customization/ToggleGroupProperties.jsx"}],"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/cards/ToggleGroup.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);

var LoadIndicator = IoTFCommon.LoadIndicator;
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;
var ToggleTile = require('../components/ToggleTile.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "15px 5px"
  }
};

var ToggleGroup = React.createClass({
  displayName: 'ToggleGroup',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    plots: RPT.array,
    iconType: RPT.string,
    invert: RPT.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      iconType: "WINDOW",
      invert: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      model: {}
    };
  },

  componentDidMount: function componentDidMount() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function onUpdate(payload) {
    var found = false;
    var model = {};

    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

          var property = IoTFDeviceStore.normalizeProperty(plot.property);
          var obj = payload.deviceEvent.data[property];

          if (obj !== undefined) {
            model[plot.id] = obj;
            found = true;
          }
        }
      }
    }
    if (found) {
      this.setState(model);
    }
  },

  render: function render() {
    var self = this;

    if (this.state) {

      var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

      var items = [];

      for (var i in this.props.plots) {
        var plot = this.props.plots[i];
        var state = this.state[plot.id];
        var icon = null;
        if (state !== undefined) {
          if (this.props.invert) {
            state = !state;
          }
          icon = "/resources/images/" + this.props.iconType + "_" + (state ? "ON" : "OFF") + ".png";
        }
        var item = {
          id: plot.id,
          label: plot.label,
          value: state,
          icon: icon
        };
        items.push(item);
      }

      return React.createElement(
        'div',
        { style: style },
        items.map(function (item) {
          return React.createElement(
            ToggleTile,
            { key: item.id, theme: self.props.theme, icon: item.icon, state: !!item.value },
            item.label
          );
        })
      );
    } else {
      return React.createElement(
        'div',
        { style: styles.style },
        React.createElement(LoadIndicator, { theme: this.props.theme, useDataPoints: true })
      );
    }
  }
});

module.exports = ToggleGroup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../components/ToggleTile.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/components/ToggleTile.jsx"}],"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/components/ToggleTile.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "95px",
    height: "95px",
    margin: "5px",
    float: "left"
  },
  icon: {
    width: "55px",
    height: "55px",
    margin: "5px 20px",
    fontSize: "12px",
    textAlign: "center",
    verticalAlign: "middle"
  },
  label: {
    fontSize: "12px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: "5px 10px",
    textAlign: "center"
  }
};

var ToggleTile = React.createClass({
  displayName: "ToggleTile",

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    icon: RPT.string,
    state: RPT.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      icon: null
    };
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style);
    var label = Object.assign({}, styles.label);
    var icon = Object.assign({}, styles.icon);

    if (!this.props.state) {
      label.color = this.props.theme.minor;
      label.backgroundColor = this.props.theme.content;
      icon.color = this.props.theme.minor;
    } else {
      label.color = this.props.theme.titleText;
      label.backgroundColor = this.props.theme.light;
    }

    if (this.props.icon) {
      return React.createElement(
        "div",
        { style: style },
        React.createElement("img", { src: this.props.icon, style: styles.icon }),
        React.createElement(
          "div",
          { style: label },
          this.props.children
        )
      );
    } else {
      return React.createElement(
        "div",
        { style: style },
        React.createElement(
          "div",
          { style: icon },
          "Unknown state"
        ),
        React.createElement(
          "div",
          { style: label },
          this.props.children
        )
      );
    }
  }
});

module.exports = ToggleTile;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/ToggleGroup/customization/ToggleGroupProperties.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);
var RPT = React.PropTypes;
var Label = IoTFCommon.Label;
var ComboBox = IoTFCommon.ComboBox;
var Option = IoTFCommon.Option;
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;
var Select = IoTFCommon.Select;
var SwitchBtn = IoTFCommon.SwitchBtn;

var styles = {
  container: {},
  table: {
    width: "100%"
  }
};

var ToggleGroupProperties = React.createClass({
  displayName: 'ToggleGroupProperties',


  propTypes: {
    iconType: RPT.string,
    invert: RPT.bool,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      iconType: "WINDOW",
      invert: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      iconType: this.props.iconType,
      invert: this.props.invert !== undefined ? this.props.invert : null
    };
  },

  onIconTypeChanged: function onIconTypeChanged(value) {
    this.setState({
      iconType: value
    });
  },

  onInvertChanged: function onInvertChanged(value) {
    this.setState({
      invert: value
    });
  },

  onUpdate: function onUpdate(state) {
    var state = Object.assign({}, this.state, state);
    this.setState(state);
  },

  render: function render() {
    var self = this;

    if (this.state) {

      var iconType = this.state.iconType;

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
                  { label: 'Visualization', theme: this.props.theme },
                  React.createElement(
                    Select,
                    { theme: this.props.theme, onChange: this.onIconTypeChanged, value: iconType },
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'DISC', selected: iconType == "DISC" },
                      'Disc'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'LIGHT', selected: iconType == "LIGHT" },
                      'Light'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'SWITCH', selected: iconType == "SWITCH" },
                      'Switch'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'FAN', selected: iconType == "FAN" },
                      'Fan'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'HEATING', selected: iconType == "HEATING" },
                      'Heating'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'BATTERY', selected: iconType == "BATTERY" },
                      'Battery'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'DOOR', selected: iconType == "DOOR" },
                      'Door'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'WINDOW', selected: iconType == "WINDOW" },
                      'Window'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'SMILEY', selected: iconType == "SMILEY" },
                      'Smiley'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'BLANKET', selected: iconType == "BLANKET" },
                      'Blanket'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'WATER', selected: iconType == "WATER" },
                      'Water'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'SPRINKLER', selected: iconType == "SPRINKLER" },
                      'Sprinkler'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'PUMP', selected: iconType == "PUMP" },
                      'Pump'
                    ),
                    React.createElement(
                      Option,
                      { theme: this.props.theme, value: 'RAIN', selected: iconType == "RAIN" },
                      'Rain'
                    )
                  )
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '2' },
                React.createElement(
                  Label,
                  { label: 'Invert value', theme: this.props.theme },
                  React.createElement(SwitchBtn, { theme: this.props.theme, onChange: this.onInvertChanged, initialValue: !!this.state.invert, trueText: 'true = OFF', falseText: 'true = ON' })
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

module.exports = ToggleGroupProperties;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/WeatherService/WeatherService.jsx":[function(require,module,exports){
'use strict';

var WeatherService = {};
WeatherService.WeatherService = require('./cards/WeatherService.jsx');
WeatherService.WeatherServiceProperties = require('./customization/WeatherServiceProperties.jsx');

module.exports = WeatherService;

},{"./cards/WeatherService.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/WeatherService/cards/WeatherService.jsx","./customization/WeatherServiceProperties.jsx":"/Users/frank/Documents/Projects/SampleCards/modules/WeatherService/customization/WeatherServiceProperties.jsx"}],"/Users/frank/Documents/Projects/SampleCards/modules/WeatherService/cards/WeatherService.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);

var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;
var LoadIndicator = IoTFCommon.LoadIndicator;

var RPT = React.PropTypes;

var styles = {
		container: {
				width: "100%",
				height: "100%",
				position: "relative",
				overflow: "hidden"
		},
		empty: {
				padding: "20px"
		}
};

var path = "resources/images/";

var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

var iconMap = {
		"chanceflurries": "w1",
		"chancerain": "w2",
		"chancesleet": "w3",
		"chancesnow": "w4",
		"chancetstorms": "w5",
		"clear": "w6",
		"cloudy": "w7",
		"flurries": "w8",
		"fog": "w9",
		"hazy": "w10",
		"mostlycloudy": "w11",
		"mostlysunny": "w12",
		"partlycloudy": "w13",
		"partlysunny": "w14",
		"sleet": "w15",
		"rain": "w16",
		"snow": "w17",
		"sunny": "w18",
		"tstorms": "w19",
		"unknown": "w0"
};

var WeatherService = React.createClass({
		displayName: 'WeatherService',

		propTypes: {
				theme: RPT.object.isRequired,
				style: RPT.object,
				nls: RPT.object,
				wrapper: RPT.object,
				demo: RPT.bool,
				plots: RPT.array,
				location: RPT.string
		},

		getDefaultProps: function getDefaultProps() {
				return {
						plots: [],
						data: {}
				};
		},

		getInitialState: function getInitialState() {
				return {
						"DATIcon": "unknown",
						"TomorrowIcon": "unknown",
						"DewPoint": "-",
						"Visibility": "-",
						"Location": "-",
						"IsDark": "-",
						"SunriseNow": "-",
						"WindDirection": "-",
						"WindSpeed": "-",
						"TomorrowLow": "-",
						"DATHigh": "-",
						"TodayHigh": "-",
						"DATLow": "-",
						"TodayIcon": "unknown",
						"Sunset": "-",
						"MoonAge": "-",
						"TodayLow": "-",
						"TomorrowHigh": "-",
						"Pressure": "-",
						"Temperature": "-",
						"Humidity": "-",
						"Sunrise": "-",
						"MoonLight": "-",
						"SunsetNow": "-"

				};
		},

		componentDidMount: function componentDidMount() {
				this.sub = IoTFDeviceStore.listen(this.onUpdate);
				if (this.props.plots && this.props.plots.length > 0) {
						var plot = this.props.plots[0];
						// we just listen for the event since the properties are hardcoded
						IoTFDeviceStore.Actions.startEventWatch(plot.device, plot.event);
				}
		},

		componentWillUnmount: function componentWillUnmount() {
				if (this.sub) {
						this.sub();
				}
		},

		onUpdate: function onUpdate(payload) {

				if (this.props.plots && this.props.plots.length > 0) {
						var plot = this.props.plots[0];
						if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

								var model = {};
								var data = payload.deviceEvent.data;

								model = this.addData(data, "DATIcon", model);
								model = this.addData(data, "TomorrowIcon", model);
								model = this.addData(data, "DewPoint", model);
								model = this.addData(data, "Visibility", model);
								model = this.addData(data, "Location", model);
								model = this.addData(data, "IsDark", model);
								model = this.addData(data, "SunriseNow", model);
								model = this.addData(data, "WindDirection", model);
								model = this.addData(data, "WindSpeed", model);
								model = this.addData(data, "TomorrowLow", model);
								model = this.addData(data, "DATHigh", model);
								model = this.addData(data, "TodayHigh", model);
								model = this.addData(data, "DATLow", model);
								model = this.addData(data, "TodayIcon", model);
								model = this.addData(data, "Sunset", model);
								model = this.addData(data, "MoonAge", model);
								model = this.addData(data, "TodayLow", model);
								model = this.addData(data, "TomorrowHigh", model);
								model = this.addData(data, "Pressure", model);
								model = this.addData(data, "Temperature", model);
								model = this.addData(data, "Humidity", model);
								model = this.addData(data, "Sunrise", model);
								model = this.addData(data, "MoonLight", model);
								model = this.addData(data, "SunsetNow", model);

								if (Object.keys(model).length > 0) {
										model.timestamp = new Date().getTime();
										var self = this;
										setTimeout(function () {
												self.setState(model);
										}, 1);
								}
						}
				}
		},

		addData: function addData(payload, property, model) {
				var property = IoTFDeviceStore.normalizeProperty(property);
				var obj = payload[property];

				if (obj !== undefined) {
						model[property] = obj;
				}

				return model;
		},

		getDayText: function getDayText(dayOfWeek) {
				dayOfWeek = dayOfWeek % 7;
				var text = this.props.nls.resolve(days[dayOfWeek]);
				return text;
		},

		getContentToday: function getContentToday() {
				var today = new Date().getDay();

				var html = "<table class='shWeatherTodayTable'><tbody>" + "<tr>" + "<td>" + this.props.nls.resolve("High") + " " + this.state.TodayHigh + "°</td>" + "<td rowspan='3'><img class='shWeatherTodayIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>" + "<td rowspan='3' class='shWeatherTodayValue'>" + this.state.Temperature + "°</td>" + "</tr>" + "<tr>" + "<td class='shWeatherTodayCity'>" + this.state.Location + "</td>" + "</tr>" + "<tr>" + "<td>" + this.props.nls.resolve("Low") + " " + this.state.TodayLow + "°</td>" + "</tr>" + "</tbody></table>";

				return html;
		},

		getContentSmall: function getContentSmall() {
				var today = new Date().getDay();

				var html = "<table class='shWeatherSmallTable'><tbody>" + "<tr>" + "<td rowspan='3'><img class='shWeatherSmallIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>" + "<td class='shWeatherSmallHighLow'>H: " + this.state.TodayHigh + "°</td>" + "</tr>" + "<tr>" + "<td class='shWeatherSmallValue'>" + this.state.Temperature + "°</td>" + "</tr>" + "<tr>" + "<td class='shWeatherSmallHighLow'>L: " + this.state.TodayLow + "°</td>" + "</tr>" + "</tbody></table>";

				return html;
		},

		getContentForecast: function getContentForecast() {
				var today = new Date().getDay();

				var html = "<table class='shWeatherForecastTable'><tbody>" + "<tr class='shWeatherForecastHeader'>" + "<td>" + this.getDayText(today) + "</td>" + "<td>" + this.getDayText(today + 1) + "</td>" + "<td>" + this.getDayText(today + 2) + "</td>" + "</tr>" + "<tr>" + "<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>" + "<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TomorrowIcon] + ".png'></td>" + "<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.DATIcon] + ".png'></td>" + "</tr>" + "<tr>" + "<td class='shWeatherForecastHigh'>" + this.state.TodayHigh + "°</td>" + "<td class='shWeatherForecastHigh'>" + this.state.TomorrowHigh + "°</td>" + "<td class='shWeatherForecastHigh'>" + this.state.DATHigh + "°</td>" + "</tr>" + "<tr>" + "<td class='shWeatherForecastLow'>" + this.state.TodayLow + "°</td>" + "<td class='shWeatherForecastLow'>" + this.state.TomorrowLow + "°</td>" + "<td class='shWeatherForecastLow'>" + this.state.DATLow + "°</td>" + "</tr>" + "</tbody></table>";

				return html;
		},

		getContentForecastSmall: function getContentForecastSmall() {
				var today = new Date().getDay();

				var html = "<table class='shWeatherForecastTableSmall'><tbody>" + "<tr class='shWeatherForecastHeader'>" + "<td>" + this.getDayText(today) + "</td>" + "<td>" + this.getDayText(today + 1) + "</td>" + "<td>" + this.getDayText(today + 2) + "</td>" + "</tr>" + "<tr>" + "<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>" + "<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TomorrowIcon] + ".png'></td>" + "<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.DATIcon] + ".png'></td>" + "</tr>" + "<tr>" + "<td class='shWeatherForecastHigh'>" + this.state.TodayHigh + "°</td>" + "<td class='shWeatherForecastHigh'>" + this.state.TomorrowHigh + "°</td>" + "<td class='shWeatherForecastHigh'>" + this.state.DATHigh + "°</td>" + "</tr>" + "<tr>" + "<td class='shWeatherForecastLow'>" + this.state.TodayLow + "°</td>" + "<td class='shWeatherForecastLow'>" + this.state.TomorrowLow + "°</td>" + "<td class='shWeatherForecastLow'>" + this.state.DATLow + "°</td>" + "</tr>" + "</tbody></table>";

				return html;
		},

		getContentDetails: function getContentDetails() {

				var html = "<table class='shWeatherDetailsTable'><tbody>" + "<tr>" + "<td rowspan='2' class='shWeatherDetailsIconCell'><img class='shWeatherDetailsIcon' src='" + path + "w20.png'></td>" + "<td class='shWeatherDetailsValue'>" + this.state.WindDirection + "</td>" + "<td rowspan='2' class='shWeatherDetailsIconCell'><img class='shWeatherDetailsIcon' src='" + path + "w21.png'></td>" + "<td class='shWeatherDetailsValue'>" + this.state.Sunset + " h</td>" + "<td rowspan='2' class='shWeatherDetailsIconCell'><img class='shWeatherDetailsIcon' src='" + path + "w22.png'></td>" + "<td class='shWeatherDetailsValue'>" + this.state.MoonAge + " days</td>" + "</tr>" + "<tr>" + "<td class='shWeatherDetailsValue'>" + this.state.WindSpeed + " km/h</td>" + "<td class='shWeatherDetailsValue'>" + this.state.Sunrise + " h</td>" + "<td class='shWeatherDetailsValue'>" + this.state.MoonLight + " %</td>" + "</tr>" + "</tbody></table>";

				return html;
		},

		getContentSideTable: function getContentSideTable() {

				var html = "<table class='shWeatherSideTable'><tbody>" + "<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w23.png'><br>" + this.state.Pressure + " mBar</td></tr>" + "<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w24.png'><br>" + this.state.Humidity + "</td></tr>" + "<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w25.png'><br>" + this.state.DewPoint + " °</td></tr>" + "<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w26.png'><br>" + this.state.Visibility + " km</td></tr>" + "</tbody></table>";

				return html;
		},

		render: function render() {
				var self = this;
				if (this.state !== undefined) {

						var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

						var html = "";
						var height = this.props.wrapper.height;
						var width = this.props.wrapper.width;

						if (height == 2 && width == 4) {
								// widescreen format
								html = "<table class='shWeatherWidescreen'><tbody><tr><td>" + this.getContentToday() + "</td><td>" + this.getContentForecast() + "</td></tr></tbody></table>";
						} else if (width == 2) {
								html = this.getContentSmall();
						} else if (width == 3) {
								html = this.getContentForecastSmall();
						} else if (width == 4 && height == 4) {
								html = this.getContentToday() + this.getContentForecast();
						} else if (width == 4) {
								html = "<table class='shWeatherForecastBaseTabel'><tbody><tr><td>" + this.getContentToday() + "</td><td valign='bottom' rowspan='3' class='shWeatherDetailsSide'>" + this.getContentSideTable() + "</td></tr>" + "<tr><td colspan='2'></td></tr>" + "<tr><td>" + this.getContentForecast() + "</td><td></td></tr>" + "<tr><td colspan='2'>" + this.getContentDetails() + "</td></tr>" + "<tbody></table>";
						}

						return React.createElement('div', { style: style, dangerouslySetInnerHTML: { __html: html } });

						//  return <div style={styles.style}>
						//  		<p>Weather Service goes here</p>
						// <div>DATIcon: {this.state.DATIcon}</div>
						// <div>TomorrowIcon: {this.state.TomorrowIcon}</div>
						// <div>DewPoint: {this.state.DewPoint}</div>
						// <div>Visibility: {this.state.Visibility}</div>
						// <div>Location: {this.state.Location}</div>
						// <div>IsDark: {this.state.IsDark}</div>
						// <div>SunriseNow: {this.state.SunriseNow}</div>
						// <div>WindDirection: {this.state.WindDirection}</div>
						// <div>WindSpeed: {this.state.WindSpeed}</div>
						// <div>TomorrowLow: {this.state.TomorrowLow}</div>
						// <div>DATHigh: {this.state.DATHigh}</div>
						// <div>TodayIcon: {this.state.TodayIcon}</div>
						// <div>DATLow: {this.state.DATLow}</div>
						// <div>TodayIcon: {this.state.TodayIcon}</div>
						// <div>Sunset: {this.state.Sunset}</div>
						// <div>MoonAge: {this.state.MoonAge}</div>
						// <div>TodayLow: {this.state.TodayLow}</div>
						// <div>TomorrowHigh: {this.state.TomorrowHigh}</div>
						// <div>Pressure: {this.state.Pressure}</div>
						// <div>Temperature: {this.state.Temperature}</div>
						// <div>Humidity: {this.state.Humidity}</div>
						// <div>Sunrise: {this.state.Sunrise}</div>
						// <div>MoonLight: {this.state.MoonLight}</div>
						// <div>SunsetNow: {this.state.SunsetNow}</div>
						//  	</div>
				} else {
								return React.createElement(
										'div',
										{ style: styles.empty },
										React.createElement(LoadIndicator, { theme: this.props.theme, useDataPoints: true })
								);
						}
		}
});

module.exports = WeatherService;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/SampleCards/modules/WeatherService/customization/WeatherServiceProperties.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var IoTFCommon = (typeof window !== "undefined" ? window['IoTFCommon'] : typeof global !== "undefined" ? global['IoTFCommon'] : null);

var RPT = React.PropTypes;
var InputField = IoTFCommon.InputField;
var Label = IoTFCommon.Label;

var styles = {
  container: {},
  table: {
    width: "100%"
  }

};

var WeatherServiceProperties = React.createClass({
  displayName: 'WeatherServiceProperties',


  propTypes: {
    location: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      location: "Rottenburg"
    };
  },

  getInitialState: function getInitialState() {
    return {
      location: this.props.location
    };
  },

  onLocationChanged: function onLocationChanged(value) {
    this.setState({
      location: value
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
                  { label: 'Location', theme: this.props.theme },
                  React.createElement(InputField, { theme: this.props.theme, onChange: this.onLocationChanged, initialValue: this.state.location })
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

module.exports = WeatherServiceProperties;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["/Users/frank/Documents/Projects/SampleCards/modules/Modules.jsx"])("/Users/frank/Documents/Projects/SampleCards/modules/Modules.jsx")
});
//# sourceMappingURL=SampleCards.js.map
