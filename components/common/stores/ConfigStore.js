var Reflux = require('reflux');
var $ = require('jquery');
var Const = require('../../Dashboard/util/Const');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var Actions = Reflux.createActions([
  'getConfigs',
  'getConfig',
  'createConfig',
  'updateConfig'
]);

var ConfigStore = Reflux.createStore({

  Actions: Actions,

  init: function() {
    this.listenTo(Actions.getConfigs, this.onGetConfigs);
    this.listenTo(Actions.getConfig, this.onGetConfig);
    this.listenTo(Actions.createConfig, this.onCreateConfig);
    this.listenTo(Actions.updateConfig, this.onUpdateConfig);
  },

  onGetConfigs: function() {

    var url = Utils.getSettings('configRepositoryURL') + "/configs";
    var user = Utils.getSettings('configRepositoryUser');
    var password = Utils.getSettings('configRepositoryPassword');

    var self = this;
    $.ajax({
      method: "GET",
      dataType: "json",
      url: url,
      username: user,
      password: password,
      crossDomain: true,
      timeout: 10000,
      success: function(data) {
        self.handleConfigs(data);
      },
      error: function(data) {
        self.trigger({configs: null, error: "Error!"});
      }
    });
  },

  onGetConfig: function(payload) {

    var name = payload.name;
    var lastChange = payload.lastChange?payload.lastChange:0;

    var url = Utils.getSettings('configRepositoryURL') + "/configs/" + name + "?lastChange=" + lastChange;
    var user = Utils.getSettings('configRepositoryUser');
    var password = Utils.getSettings('configRepositoryPassword');

    var self = this;
    $.ajax({
      method: "GET",
      dataType: "json",
      url: url,
      username: user,
      password: password,
      crossDomain: true,
      timeout: 10000,
      success: function(data) {
        self.trigger({configs: null, config: data, error: null});
      },
      error: function(xhr, text, error) {
        if (xhr.status == 404) {
          // does not exist yet -> ignore and wait till somebody saves it
          self.trigger({configs: null, config: null, error: null});
        } else if (xhr.status == 409) {
          // The local version is newer -> overwrite the server version
          self.onUpdateConfig(payload);
        }
      }
    });
  },

  onCreateConfig: function(payload) {
    var name = payload.name;
    var data = payload.data;
    var lastChange = payload.lastChange;

    var url = Utils.getSettings('configRepositoryURL') + "/configs/" + name + "?lastChange=" + lastChange;
    var user = Utils.getSettings('configRepositoryUser');
    var password = Utils.getSettings('configRepositoryPassword');

    var self = this;
    $.ajax({
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: url,
      data: JSON.stringify(data),
      username: user,
      password: password,
      crossDomain: true,
      timeout: 10000,
      success: function(data) {
        // store latest timestamp
        payload.data.configTimestamp = data.lastChanged;
        self.trigger({configs: null, config: payload.data, error: null});
      },
      error: function(xhr, text, error) {
        if (xhr.status == 409) {
          // a config already exists
          if (xhr.responseJSON.lastChanged > data.configTimestamp) {
            // remote is newer -> reload
            self.onLoadConfig(payload);
          } else if (xhr.responseJSON.lastChanged < data.configTimestamp) {
            self.onUpdateConfig(payload);
          }
        } else if (xhr.status == 400 || xhr.status == 500) {
          self.trigger({configs: null, config: null, error: error});
        } else {
          self.trigger({configs: null, config: null, error: error});
        }
      }
    });
  },

  onUpdateConfig: function(payload) {
    var name = payload.name;
    var data = payload.data;
    var lastChange = payload.lastChange;

    var url = Utils.getSettings('configRepositoryURL') + "/configs/" + name + "?lastChange=" + lastChange;
    var user = Utils.getSettings('configRepositoryUser');
    var password = Utils.getSettings('configRepositoryPassword');

    var self = this;
    $.ajax({
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: url,
      data: JSON.stringify(data),
      username: user,
      password: password,
      crossDomain: true,
      timeout: 10000,
      success: function(data) {
        // store latest timestamp
        payload.data.configTimestamp = data.lastChanged;
        self.trigger({configs: null, config: payload.data, error: null});
      },
      error: function(xhr, text, error) {
        if (xhr.status == 404 || xhr.status == 415) {
          // does not exist yet -> create it
          self.onCreateConfig(payload);
        } else if (xhr.status == 409) {
          // remote config is newer -> reload it
          self.onLoadConfig(payload);
        } else if (xhr.status == 400 || xhr.status == 500) {
          self.trigger({configs: null, config: null, error: error});
        } else {
          self.trigger({configs: null, config: null, error: error});
        }
      }
    });
  },

  handleConfigs: function(configs) {
    this.trigger({configs: configs, error: null});
  },

  handleConfig: function(config) {
    this.trigger({config: config, error: null});
  }

});

module.exports = ConfigStore;
