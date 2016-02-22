var Actions = require('./Actions.jsx');
var $ = require('jquery');
var Reflux = require('reflux');
var ReactGridLayout = require('react-grid-layout');
var RGLUtil = require('react-grid-layout/build/utils');
var config = require('./config/DashboardConfig.json');
var defaultDashboards = require('./config/Dashboards.json');
//var ConfigStore = require('../../common/stores/ConfigStore');
var Utils = require('./DashboardUtils');

// TODO Dynamic require does not work currently because of browserify. We add all components here until
// we have a solution
window.IoTCards = {};
window.IoTCustomization = {};

IoTCards.Gauge = require('../cards/Gauge.jsx');
IoTCards.UsageDeviceCard = require('../cards/UsageDeviceCard.jsx');
IoTCards.UsageDataCard = require('../cards/UsageDataCard.jsx');
IoTCards.UsageStorageCard = require('../cards/UsageStorageCard.jsx');
IoTCards.DeviceTypes = require('../cards/DeviceTypes.jsx');
IoTCards.BarChart = require('../cards/BarChart.jsx');
IoTCards.DonutChart = require('../cards/DonutChart.jsx');
IoTCards.Value = require('../cards/Value.jsx');
IoTCards.RealTimeChart = require('../cards/RealTimeChart.jsx');
IoTCards.HorizontalLine = require('../cards/HorizontalLine.jsx');


IoTCustomization.RealTimeChartProperties = require('../customization/RealTimeChartProperties.jsx');
IoTCustomization.BarChartProperties = require('../customization/BarChartProperties.jsx');
IoTCustomization.GaugeProperties = require('../customization/GaugeProperties.jsx');
IoTCustomization.SingleValueProperties = require('../customization/SingleValueProperties.jsx');


var DashboardStore = Reflux.createStore({
  configName: "MyDashboardConfig",
  config: null,
  dashboard: null,
  history: null,
  breakpoint: "lg",
  emptyDashboard: {
      "name": "NewDashboard",
      "label": "New Dashboard",
      "icon": "res/images/icons/smarterHome()/gs7.png",
      "image": "res/images/groups/default.jpg",
      "thumb": "res/images/groups/smarterHome()/g7.png",
      "hidden": false,
      "type": "TILE",
      "locked": false,
      "preset": false,
      "layouts": {
        "xxl": [
        ],
        "xl": [
        ],
        "lg": [
        ],
        "md": [
        ],
        "sm": [
        ]
      },
      "components": [
      ]
  },

  getBreakpoint: function() {
    return this.breakpoint;
  },

  setDashboardConfig: function(temp) {
    config = temp;
  },

  setDefaultDashboard: function(temp) {
    defaultDashboards = temp;
  },

  setEmitter: function(emitter) {
    this.externalEmitter = emitter;
  },

  getConfig: function() {
    return config;
  },

  init: function() {
    this.history = [];

    // listen to config store
    //ConfigStore.listen(this.onRemoteConfig);


    // listen to actions
    this.listenTo(Actions.loadConfig, this.onLoadConfig);
    this.listenTo(Actions.loadDashboard, this.onLoadDashboard);
    this.listenTo(Actions.getComponents, this.onGetComponents);
    this.listenTo(Actions.storeLayouts, this.onStoreLayouts);
    this.listenTo(Actions.undo, this.onUndo);
    this.listenTo(Actions.expandCard, this.onExpandCard);
    this.listenTo(Actions.shrinkCard, this.onShrinkCard);
    this.listenTo(Actions.setBreakpoint, this.onSetBreakpoint);
    this.listenTo(Actions.customAction, this.onCustomAction);
    this.listenTo(Actions.addComponent, this.onAddComponent);
    this.listenTo(Actions.moveComponent, this.onMoveComponent);
    this.listenTo(Actions.showDialog, this.onShowDialog);
    this.listenTo(Actions.configureComponent, this.onConfigureComponent);
    this.listenTo(Actions.getCategories, this.onGetCategories);
    this.listenTo(Actions.closeDialog, this.onCloseDialog);
    this.listenTo(Actions.getComponent, this.onGetComponent);
    this.listenTo(Actions.removeComponent, this.onRemoveComponent);
    this.listenTo(Actions.notify, this.onNotify);
    this.listenTo(Actions.navigateRoute, this.onNavigateRoute);
    this.listenTo(Actions.addDashboard, this.onAddDashboard);
    this.listenTo(Actions.removeDashboard, this.onRemoveDashboard);
    this.listenTo(Actions.changeCardSize, this.onChangeCardSize);

    this.listenTo(Actions.submitSSOData, this.onSubmitSSOData);

    this.listenTo(Actions.showDialogAAAUserDetails, this.onShowDialogAAAUserDetails);
    this.listenTo(Actions.showDialogAddMember, this.onShowDialogAddMember);

    // set initial experimental mode
    this.experimental = false;
  },

  isExperimentalMode: function(){
    return this.experimental;
  },

  setExperimentalMode: function(mode){
    this.experimental = mode;
  },

  getTheme: function() {
    return config.theme;
  },

  getDashboards: function() {
    var list = [];
    if (this.dashboards) {
      list = this.dashboards.dashboards;
    }
    return list;
  },

  getDashboard: function() {
    return this.dashboard;
  },

  getSettings: function(key) {
    if (this.dashboards && this.dashboards.settings) {
      return this.dashboards.settings[key];
    } else {
      return null;
    }
  },

  getMainSettings: function(name) {
    var settings = this.config.settings;
    if (settings) {
      var value = settings[name];
      return value;
    }
  },


  getEmptyDashboard: function() {
    return Object.assign({}, JSON.parse(JSON.stringify(this.emptyDashboard)), {name: this.createUUID()});
  },

  getLayoutForElement: function(dashboard, layout, id) {
    //if (!dashboard || !layout || !id) throw new Error("Error");
    var temp = dashboard.layouts[layout];
    for (var i in temp) {
      var item = temp[i];
      if (item.i == id) {
        return item;
      }
    }
  },

  onCustomAction: function(payload) {
    alert(payload);
  },

  onNotify: function(payload) {
    if (this.externalEmitter) {
    this.externalEmitter.emit("Dashboard.notification", payload);
    }
    this.trigger({notification: payload});
  },

  onNavigateRoute: function(payload) {
    alert("Routing to: " + payload);
  },

  onLoadConfig: function() {
    if (!this.config) {
      this.config = config;
    }

    // Get config name from config file
    var newConfigName = this.getMainSettings("configName");
    if (newConfigName) {
      this.configName = newConfigName;
    }

    // Get version name from config file
    var configVersion = this.getMainSettings("configVersion");
    if (configVersion !== undefined) {
      this.configName = this.configName + "#" + configVersion;
    }

    this.trigger({config: this.config});
  },

  onLoadDashboard: function(target) {
    this.cleanup();

    // Load the full set of dashboards
    if (!this.dashboards) {
      if (global.localStorage) {
        try {
          this.dashboards = JSON.parse(global.localStorage.getItem('Dashboard_' + this.configName));
        } catch(e) {}
      }
      if (this.dashboards) {
        // if there is a new default dashboard, take it
        if (defaultDashboards.configTimestamp > this.dashboards.configTimestamp) {
          this.dashboards = null;
        }
      }
      if (!this.dashboards) {
        this.dashboards = defaultDashboards;
      }

      // Start with the local dashboard but check if there is a new remote dashboard
    /*
      ConfigStore.Actions.getConfig({
        name: this.configName, // hardcoded name for the time being
        data: this.dashboards,
        lastChange: this.dashboards?this.dashboards.configTimestamp:0
      });
    */
    }

    var dashboard = this.dashboards.dashboards[0];

    // Find the right dashboard
    var name = null;
    if (target) {
      name = target;
    } else if (!name && this.dashboards.settings && this.dashboards.settings.defaultDashboard) {
      name = this.dashboards.settings.defaultDashboard;
    }

    if (name) {
      var temp = this.getDashboardByName(name);
      if (temp) {
        dashboard = temp;
      }
    }

    this.dashboard = dashboard;

    this.trigger({components: this.getComponents(), dashboard: this.dashboard});
  },

  onRemoteConfig: function(payload) {
    if (payload.error) {
      console.log("Error loading remote config: " + payload.error);
    } else if (payload.configs) {

    } else if (payload.config) {
      // current dashboard name
      var target = this.dashboard?this.dashboard.name:null;

      // HACK: Disable this to overwrite the remote dashboard with the local copy
      if (false) {
        this.dashboards = payload.config;
        this.dashboard = this.dashboards[0];
      } else {
        this.dashboards.configTimestamp = payload.config.configTimestamp;
      }


      var name = null;

      if (target) {
        name = target;
      } else if (!name && this.dashboards.settings && this.dashboards.settings.defaultDashboard) {
        name = this.dashboards.settings.defaultDashboard;
      }

      if (name) {
        var temp = this.getDashboardByName(name);
        if (temp) {
          dashboard = temp;
        }
      }

      this.dashboard = dashboard;

      this.trigger({components: this.getComponents(), dashboard: this.dashboard});
    }
  },

  onUndo: function() {
    if (this.history.length > 1) {
      this.history.pop();
      this.dashboard = JSON.parse(this.history[this.history.length-1]);
      this.storeDashboard();
      this.trigger({components: this.getComponents(), dashboard: this.dashboard, history: this.history.length});
    }
  },

  onSave: function() {
    // FLM: No longer needed since we have auto-save
    //this.persistDashboard();
  },

  onAddDashboard: function(payload) {
    this.addDashboard(payload.dashboard);
    this.dashboard = payload.dashboard;
    this.onCloseDialog();
    this.onLoadDashboard(this.dashboard.name);
    this.onAddComponent(null,{type:"Value",params:{
        "component": "Value",
        "title": "New Card",
        "size": {
          "sm": 0,
          "md": 0,
          "lg": 0,
          "xl": 0,
          "xxl": 0
        }

    }});
    this.storeDashboard();
  },


  onRemoveDashboard: function() {
    this.removeDashboardByName(this.dashboard.name);
    this.dashboard = this.dashboards.dashboards[0];
    this.onLoadDashboard(this.dashboard.name);
    this.storeDashboard();
  },

  getComponent: function(id) {
    for (var i in this.dashboard.components) {
      var component = this.dashboard.components[i];
      if (component.id == id) {
        return component;
      }
    }
    return null;
  },

  onMoveComponent: function(payload){
    var layouts, components, container = null;

    var elementLayout = this.getLayoutForElement(this.dashboard, 'sm', payload.id);

    var layout = this.dashboard.layouts['sm']

    var successor = {};
    var predecessor = {};
    var targetOffset = 0;
    var elementPositions = {};

    for (var componentKey in layout) {
      var component = layout[componentKey];
      elementPositions[component.i]= componentKey;
      if (component.y-elementLayout.y > 0) {
        if(successor.y === undefined || component.y < successor.y){
          successor = component;
        }
      }
      else if(component.y-elementLayout.y < 0){
        if(predecessor.y === undefined || component.y > predecessor.y){
          predecessor = component;
        }
      }
    }

    if(predecessor.y !== undefined && payload.direction === 'up'){
      layout[elementPositions[payload.id]].y = predecessor.y;
      layout[elementPositions[predecessor.i]].y = layout[elementPositions[payload.id]].y+elementLayout.h;
    }
    if(successor.y !== undefined && payload.direction === 'down'){
      layout[elementPositions[successor.i]].y = elementLayout.y;
      layout[elementPositions[payload.id]].y = layout[elementPositions[successor.i]].y+successor.h;
    }

    var cardGap = 25; // look in react grid layout
    targetOffset = payload.direction === 'up' ? ($('#'+predecessor.i).outerHeight())*(-1) - cardGap : $('#'+successor.i).outerHeight() + cardGap;

    var docMiddle = $(window).height()/4;

    console.log('targetOffset',$('#'+predecessor.i));

    this.dashboard.layouts['sm'] = layout;

    this.trigger({components: this.getComponents(), dashboard: this.dashboard});

    $('html, body').animate({
        scrollTop: $('#'+payload.id).offset().top + targetOffset - docMiddle
    }, 500);
  },


  onAddComponent: function(parent,payload) {
    var layouts, components, container = null;

    if (parent) {
      container = this.getComponent(parent);
      components = container.parameters.components;
      layouts = container.parameters.layouts;
    } else {
      layouts = this.dashboard.layouts;
      components = this.dashboard.components;
    }

    // get empty component
    var definition = this.getComponentDefinitionForType(payload.type);

    var uuid = this.createUUID();
    // add component to all layouts
    for (var breakpoint in layouts) {
      var layout = layouts[breakpoint];
      if (layout) {
        var newEntry = {};
        newEntry.w = definition.sizes[0][0];
        newEntry.h = definition.sizes[0][1];
        newEntry.x = 0;
        newEntry.y = 0;
        newEntry.i = uuid;
        layout.unshift(newEntry);
        layout = RGLUtil.compact(layout, true);
        layouts[breakpoint] = layout;
      }
    }

    var compParams = Object.assign({}, {
        "size": {
          "sm": 0,
          "md": 0,
          "lg": 0,
          "xl": 0,
          "xxl": 0
        }
      }, payload.parameters);
    // add component to dashboard
    var entry = {
      "id": uuid,
      "type": definition.name,
      "parameters":compParams
    };
    components.unshift(entry);

    // handle size preset
    if (payload.size) {
      entry.parameters.size[this.breakpoint] = payload.size;
      var size = definition.sizes[payload.size];
      var layoutEntry = this.getLayoutForElement(this.dashboard, this.breakpoint, entry.id);
      layoutEntry.w = size[0];
      layoutEntry.h = size[1];

    var layout = this.dashboard.layouts[this.breakpoint];
    layout = RGLUtil.compact(layout, true);
    this.dashboard.layouts[this.breakpoint] = layout;
    }

    this.trigger({components: this.getComponents(), dashboard: this.dashboard, history: this.history.length, dialog:'none'});
  },

  onShowDialog: function(payload) {
    if (payload.action == "addPage") {
      this.trigger({dialog: {
        dialog: "PageCustomization",
        id: null
      }});
    } else if (payload.action == "modifyPage") {
      this.trigger({dialog: {
        dialog: "PageCustomization",
        id: payload.id
      }});
    } else if (payload.action == "modifyCard" && payload.type) {
      console.log(payload.type);
      this.trigger({dialog: {
        dialog: "ComponentCustomization",
        type: payload.type,
        action: payload.action,
        id: payload.id
      }});
    } else if (payload.action == "addCard" || (payload.action == "modifyCard" && !payload.type)) {
      this.trigger({dialog: {
        dialog: "ComponentCustomization",
        type: 'Value',
        action: payload.action,
        id: payload.id
      }});
    }
  },


    /////////  AAA UI Part Start /////////

  onShowDialogAddMember: function(payload) {
    this.trigger({dialog: {
        dialog: "DialogAddMember",
        type: payload.type,
        action: payload.action,
        id: payload.id
      }});
  },

  onSubmitAddMemberData: function(dataAddMember) {
      console.log(dataAddMember, "AddMember");
      console.log("you have submit the AddMember");
  },

  onShowDialogAAAUserDetails: function(payload) {
    this.trigger({dialog: {
        dialog: "DialogAAAUserDetails",
        type: payload.type,
        action: payload.action,
        id: payload.id
      }});
  },

  onSubmitAAAUserDetailsData: function(dataAAAUserDetails) {
      console.log(dataAAAUserDetails, "AAAUserDetails");
      console.log("you have submit the AAAUserDetails");
  },

    /////////  AAA UI Part End /////////


  onConfigureComponent: function(payload) {
    var components = this.dashboard.components;
    for (var i in components) {
      var component = components[i];
      if (component.id == payload.id) {
        if (payload.type) {
          var oldType = component.type;
          component.type = payload.type;
          if (payload.parameters) {
            if (payload.noReplace) {
              // only slight changes without full knowledge of the parameters block
              component.parameters = Object.assign(component.parameters, payload.parameters);
            } else {
              // full replacement (default)
              component.parameters = payload.parameters;
            }
          }
          var definition = this.getComponentDefinitionForType(payload.type);
          var layout;

          // reset to default sizes when type changes
          if (oldType != payload.type) {
            for (var breakpoint in this.dashboard.layouts) {
              layout = this.dashboard.layouts[breakpoint];
              if (layout) {
                for (var j in layout) {
                  var model = layout[j];
                  if (model.j == payload.id) {
                    model.w = definition.sizes[0][0];
                    model.h = definition.sizes[0][1];
                    break;
                  }
                }
                layout = RGLUtil.compact(layout, true);
                this.dashboard.layouts[breakpoint] = layout;
              }
            }
            component.parameters.size = {
              "sm": 0,
              "md": 0,
              "lg": 0,
              "xl": 0,
              "xxl": 0
            };
          }

          if (payload.size !== undefined) {
            component.parameters.size[this.breakpoint] = payload.size;
            var size = definition.sizes[payload.size];
            var layoutEntry = this.getLayoutForElement(this.dashboard, this.breakpoint, component.id);
            layoutEntry.w = size[0];
            layoutEntry.h = size[1];
            layout = this.dashboard.layouts[this.breakpoint];
            layout = RGLUtil.compact(layout, true);
            this.dashboard.layouts[this.breakpoint] = layout;
          }

        }
      }
    }

    this.trigger({components: this.getComponents(), dashboard: this.dashboard, history: this.history.length, dialog: 'none'});
    this.storeDashboard();
  },



  onSetBreakpoint: function(breakpoint) {
    this.breakpoint = breakpoint;
    this.cleanup();
  },

  onChangeCardSize: function(id, dimensions) {
    var layout = this.dashboard.layouts[this.breakpoint];
  var model;
    for (var i in layout) {
      model = layout[i];
      if (model.i == id) {
        layout.splice(i,1);
        layout.unshift(model);
        break;
      }
    }

    if (dimensions.width) {model.w = dimensions.width;}
    if (dimensions.height) {model.h = dimensions.height;}

    layout = RGLUtil.compact(layout, true);
    this.dashboard.layouts[this.breakpoint] = layout;

    this.trigger({dashboard: this.dashboard});
    this.storeDashboard();
  },

  changeSize: function(id, wrap, dir) {
    var layout = this.dashboard.layouts[this.breakpoint];
    var model = null;
    for (var i in layout) {
      model = layout[i];
      if (model.i == id) {
        break;
      }
    }

    var component = this.getComponent(id);
    var definition = this.getComponentDefinitionForType(component.type);

    if (!component.parameters.size || component.parameters.size.lg === undefined) {
      component.parameters.size = {
        "sm": 0,
        "md": 0,
        "lg": 0,
        "xl": 0,
        "xxl": 0
      }
    }
    var size = component.parameters.size[this.breakpoint];
    size = size + dir;
    if (size >= definition.sizes.length) {
      if (wrap) {
        size = 0;
      } else {
        return;
      }
    }
    if (size < 0) {
      if (wrap) {
        size = definition.sizes.length - 1;
      } else {
        return;
      }
    }
    var tupel = definition.sizes[size];

    model.w = tupel[0];
    model.h = tupel[1];
    var maxWidth = Utils.getCapability("cols")[this.breakpoint];
    if (model.w > maxWidth) {
      size = 0;
      tupel = definition.sizes[size];
      model.w = tupel[0];
      model.h = tupel[1];
    }
    if (model.x + model.w > maxWidth) {
      model.x = maxWidth - model.w;
    }

    component.parameters.size[this.breakpoint] = size;

    layout = RGLUtil.compact(layout, true);
    this.dashboard.layouts[this.breakpoint] = layout;

    this.trigger({dashboard: this.dashboard});
    this.storeDashboard();
  },

  onExpandCard: function(id, wrap) {
    this.changeSize(id, wrap, 1);
  },

  onShrinkCard: function(id, wrap) {
    this.changeSize(id, wrap, -1);
  },

  persistDashboard: function() {
  //   console.log("persist dashboard");
  //   var text = JSON.stringify(this.dashboards);

  //   if (global.localStorage) {
  //     global.localStorage.setItem('Dashboard_' + this.configName, text);
  //   }

  //   // store the config in the remote store
  // /*
  //   ConfigStore.Actions.updateConfig({
  //     name: this.configName, // hardcoded name for the time being
  //     data: this.dashboards,
  //     lastChange: this.dashboards?this.dashboards.configTimestamp:0
  //   });
  // */

  //   this.cleanup();
  //   this.history.push(text);

  //   this.trigger({history: this.history.length});
  },

  getDashboardByName: function(name) {
    var dashboard = null;
    if (this.dashboards) {
      for (var i = 0; i < this.dashboards.dashboards.length; i++) {
        var temp = this.dashboards.dashboards[i];
        if (temp.name == name) {
          dashboard = temp;
          break;
        }
      }
    }

    return dashboard;
  },

  removeDashboardByName: function(name) {
    if (this.dashboards) {
      for (var i = 0; i < this.dashboards.dashboards.length; i++) {
        var temp = this.dashboards.dashboards[i];
        if (temp.name == name) {
          this.dashboards.dashboards.splice(i,1);
          break;
        }
      }
    }
  },

  addDashboard: function(dashboard) {
    this.dashboards.dashboards.push(dashboard);
  },

  cleanup: function() {
    this.history = [];
  },

  storeDashboard: function() {
    console.log("store dashboard");
    var text = JSON.stringify(this.dashboard);
    var oldText = "";
    if (this.history.length > 0) {
      oldText = this.history[this.history.length-1];
    }
    if (oldText != text) {
      this.history.push(text);

      this.trigger({history: this.history.length});
    }
    // persist
  if (global.localStorage) {
    // make sure we have the changes in the set of dashboards
      this.removeDashboardByName(this.dashboard.name);
      this.addDashboard(this.dashboard);
    var fullDashboard = JSON.stringify(this.dashboards);
    global.localStorage.setItem('Dashboard_' + this.configName, fullDashboard);
  }

  },

  onStoreLayouts: function(layouts) {
    this.dashboard.layouts = layouts;
    this.storeDashboard();



    this.trigger({dashboard: this.dashboard});
  },

  onGetComponents: function() {
    var components = this.getComponents();
    this.trigger({components: components, dashboard: this.dashboard});
  },

  getComponents: function() {
    var components = [];
    if (this.config && this.dashboard) {
      for (var i in this.dashboard.components) {
        var compInDashboard = this.dashboard.components[i];
        var definition = this.getComponentDefinitionForType(compInDashboard.type);
        var component = this.prepareComponent(definition, compInDashboard);
        components.push(component);
      }
    }

    return components;
  },

  onRemoveComponent: function(payload) {
    if (this.config && this.dashboard) {
      for (var i in this.dashboard.components) {
        var compInDashboard = this.dashboard.components[i];
        if (compInDashboard.id == payload.id) {
          // remove from components
          this.dashboard.components.splice(i,1);
          // remove from layout
          for (var breakpoint in this.dashboard.layouts) {
            var layout = this.dashboard.layouts[breakpoint];
            if (layout) {
              for (var t in layout) {
                var compInLayout = layout[t];
                if (compInLayout.i == payload.id) {
                  layout.splice(t,1);
                  break;
                }
              }
              layout = RGLUtil.compact(layout, true);
              this.dashboard.layouts[breakpoint] = layout;
            }
          }
          break;
        }
      }
    }

    this.trigger({components: this.getComponents(), dashboard: this.dashboard, history: this.history.length, dialog: "none"});

  },

  onGetComponent: function(payload) {
    var id = payload.id;
    var type = payload.type;
    var component = this.getComponentDefinitionForType(type);

    if (!id) {
      // create empty component
      var comp = {
        type:"Value",
        parameters:{
          "component": "Value",
          "title": "New Card",
          "size": {
            "sm": 0,
            "md": 0,
            "lg": 0,
            "xl": 0,
            "xxl": 0
          }
        }
      };

      component = this.prepareComponent(component, comp);
      component.parameters.component = type;
    } else {
      // get component
      if (this.config && this.dashboard) {
        for (var i in this.dashboard.components) {
          var compInDashboard = this.dashboard.components[i];
          if (compInDashboard.id == id) {
            component = this.prepareComponent(component, compInDashboard);
            component.parameters.component = type;
            break;
          }
        }
      }
    }


    this.trigger({component: component});
  },

  onGetCategories: function() {
    var categories = {};
    for (var i in this.config.components) {
      var component = this.config.components[i];
      if (component.extends) {
        var parent = this.getComponentDefinitionForType(component.extends);
        component = Object.assign({}, parent, component);
      }
      var category = component.category;
      if (category != "Hidden") {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(component);
        // TODO Check access authorization here
      }
    }
    this.trigger({categories: categories});
  },

  onCloseDialog: function() {
    this.trigger({dialog: 'none'});
  },

  getComponentDefinitionForType: function(type) {
    if (this.config && type) {
      var components = this.config.components;
      for (var i in components) {
        var component = components[i];
        if (component.name == type) {
          if (component.extends) {
            var parent = this.getComponentDefinitionForType(component.extends);
            component = Object.assign({}, parent, component);
          }
          return component;
        }
      }
    } else {
      return null;
    }
  },

  /**
  * Merges the component definition with the infromatReturns the layout information for a single component
  * @param  {Object}  definition Component definition from the global DashboardConfig
  * @param  {Object}  instance   Component from the dashboard instance
  * @return {Object}  merged comopnent information
  */
  prepareComponent: function(definition, instance) {
    var temp = {
      "parameters": Object.assign({},definition.parameters, instance.parameters),
      "id": instance.id
    };
    return Object.assign({},definition, temp);
  },

  // create a unique rfc4122 conform UUID
  createUUID: function() {
    var dec2hex = [];
    for (var i=0; i<=15; i++) {
      dec2hex[i] = i.toString(16);
    }

    var uuid = '';
    for (var j=1; j<=36; j++) {
      if (j===9 || j===14 || j===19 || j===24) {
        uuid += '-';
      } else if (j===15) {
        uuid += 4;
      } else if (j===20) {
        uuid += dec2hex[(Math.random()*4|0 + 8)];
      } else {
        uuid += dec2hex[(Math.random()*15|0)];
      }
    }
    return uuid;
  }

});

module.exports = DashboardStore;
