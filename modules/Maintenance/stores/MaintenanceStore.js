var Reflux = require('reflux');
var DashboardStore = IoTFComponents.Dashboard.DashboardStore;
var IoTFDeviceStore = IoTFCommon.IoTFDeviceStore;

var Actions = Reflux.createActions([
  'backupDashboard',
  'restoreDashboard',
  'startLogging',
  'stopLogging',
  'downloadLog',
  'observeMessages',
  'stopObservingMessages'
]);

var MaintenanceStore = Reflux.createStore({

  Actions: Actions,

  init: function() {
    this.listenTo(Actions.backupDashboard, this.onBackupDashboard);
    this.listenTo(Actions.restoreDashboard, this.onRestoreDashboard);
    this.listenTo(Actions.startLogging, this.onStartLogging);
    this.listenTo(Actions.stopLogging, this.onStopLogging);
    this.listenTo(Actions.downloadLog, this.onDownloadLog);
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
    this.trigger({
    });
  },

  onStopLogging: function() {
    this.trigger({
    });
  },

  onDownloadLog: function() {
    this.trigger({
    });
  }

});

module.exports = MaintenanceStore;
