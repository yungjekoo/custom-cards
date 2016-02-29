var Reflux = require('reflux');
var DashboardStore = IoTFComponents.Dashboard.DashboardStore;
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;

var Actions = Reflux.createActions([
  'backupDashboard',
  'restoreDashboard',
  'startLogging',
  'stopLogging',
  'observeMessages',
  'stopObservingMessages'
]);

var MaintenanceStore = Reflux.createStore({

  Actions: Actions,

  buffer: [],
  pointer: 0,
  threshold: 500,

  init: function() {
    this.listenTo(Actions.backupDashboard, this.onBackupDashboard);
    this.listenTo(Actions.restoreDashboard, this.onRestoreDashboard);
    this.listenTo(Actions.startLogging, this.onStartLogging);
    this.listenTo(Actions.stopLogging, this.onStopLogging);
    this.listenTo(Actions.observeMessages, this.onObserveMessages);
    this.listenTo(Actions.stopObservingMessages, this.onStopObservingMessages);
  },

  onBackupDashboard: function() {
    var dashboards = DashboardStore.dashboards;
    var json = JSON.stringify(dashboards);

    this.trigger({
      dashboards: json
    });
  },

  onRestoreDashboard: function(payload) {
    var ds = DashboardStore;
    var content = payload.content;
    try {
      var obj = JSON.parse(content)
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

      ds.trigger({components: ds.getComponents(), dashboard: ds.dashboard});
      ds.storeDashboard();
    } catch(e) {
      this.trigger({
        error: "Restore failed"
      });
    }
  },

  onObserveMessages: function() {
    var self = this;
    IoTFDeviceStore.setMessageObserver(function(device, event, data, timestamp) {
      self.trigger({message: {
        device: device,
        event: event,
        data: data,
        timestamp: timestamp
      }})
    });
  },

  onStopObservingMessages: function() {
    IoTFDeviceStore.setMessageObserver(null);
  },

  onStartLogging: function() {
    var self = this;
    this.buffer = [];
    this.pointer = 0;

    console.orgLog = console.log;
    console.log = function(obj) {
      self.storeInBuffer(obj);
      console.orgLog(obj);
    };

    console.orgInfo = console.info;
    console.info = function(obj) {
      self.storeInBuffer(obj);
      console.orgInfo(obj);
    };

    console.orgWarn = console.warn;
    console.warn = function(obj) {
      self.storeInBuffer(obj);
      console.orgWarn(obj);
    };

    console.orgError = console.error;
    console.error = function(obj) {
      self.storeInBuffer(obj);
      console.orgError(obj);
    };
  },

  onStopLogging: function() {
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

  storeInBuffer: function(obj) {
    this.buffer[this.pointer] = obj;
    this.pointer++;
    if (this.pointer > this.threshold - 1) {
      this.pointer = 0;
    }
    this.trigger({
      log: obj
    });
  },

  getBufferAsString: function() {
    var text = "";
    var counter = 0;
    for (var i = this.pointer; counter < this.threshold; i--) {
      if (i < 0) {
        i = this.threshold-1;
      }
      var line = this.buffer[i];
      counter++;
      if (line) {
        text += line + "\r\n";
      }
    }
    return text;
  },


});

module.exports = MaintenanceStore;
