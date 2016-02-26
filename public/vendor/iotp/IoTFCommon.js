(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.IoTFCommon = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js":[function(require,module,exports){
'use strict';

var config = require('./config/DashboardConfig.json');

var DashboardUtils = {

  // create a unique rfc4122 conform UUID
  createUUID: function createUUID() {
    var dec2hex = [];
    for (var i = 0; i <= 15; i++) {
      dec2hex[i] = i.toString(16);
    }

    var uuid = '';
    for (var j = 1; j <= 36; j++) {
      if (j === 9 || j === 14 || j === 19 || j === 24) {
        uuid += '-';
      } else if (j === 15) {
        uuid += 4;
      } else if (j === 20) {
        uuid += dec2hex[Math.random() * 4 | 0 + 8];
      } else {
        uuid += dec2hex[Math.random() * 15 | 0];
      }
    }
    return uuid;
  },

  setDashboardConfig: function setDashboardConfig(temp) {
    config = temp;
  },

  getCapability: function getCapability(name) {
    var caps = config.capabilities;
    if (caps) {
      var value = caps[name];
      if (value === undefined) {
        // not set defaults to true
        value = true;
      }
      return value;
    }
  },

  getSettings: function getSettings(name) {
    var settings = config.settings;
    if (settings) {
      var value = settings[name];
      return value;
    }
  },

  getDefaultChartColors: function getDefaultChartColors() {
    var result = config.theme.palette;
    return result;
  }

};

module.exports = DashboardUtils;

},{"./config/DashboardConfig.json":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/config/DashboardConfig.json"}],"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/config/DashboardConfig.json":[function(require,module,exports){
module.exports={
  "theme": {
    "canvas": "#142a36",
    "lightText": "#F7F7F7",
    "border": "#142a36",
    "title": "#E6E6E6",
    "titleText": "#F7F7F7",
    "textOnCanvas": "#F7F7F7",
    "content": "#FDFDFD",
    "major": "#2E3636",
    "minor": "#899399",
    "least": "#a9acac",
    "accent": "#4581E0",
    "GOOD": "#8CD210",
    "FAIR": "#899399",
    "CRITICAL": "#FF5050",
    "font": "'Helvetica Neue',HelveticxfaNeue,Helvetica,'Segoe UI',Segoe,Calibri,Roboto,'Droid Sans','Arial Unicode MS',Arial,sans-serif",
    "logo": "/assets/dashboard/iot.jpg",

    "light": "#c7c7c7",
    "normal": "#959595",
    "dark": "#5a5a5a",

    "palette": ["#5596E6", "#4178BE", "#325C80", "#264A60", "#1D3649", "#323c3c", "#3c4646", "#5a6464", "#6d7777", "#959f9f"],

    "schemes": [
      {
        "name": 0,
        "light": "#9855D4",
        "normal": "#704199",
        "dark": "#311a41",
        "palette": ["#ba8FF7", "#9855D4", "#734098", "#562f72", "#412356", "#311a41"]
      },
      {
        "name": 1,
        "light": "#db2780",
        "normal": "#9e215f",
        "dark": "#3a0B2E",
        "palette": ["#ff3ca0", "#db2780", "#a6266e", "#7c1c58", "#601146", "#3a0B2E"]
      },
      {
        "name": 2,
        "light": "#00bfa0",
        "normal": "#068375",
        "dark": "#012b22",
        "palette": ["#41d6c3", "#00b4a0", "#008571", "#006d5d", "#005448", "#012b22"]
      },
      {
        "name": 3,
        "light": "#4178be",
        "normal": "#33598a",
        "dark": "#152935",
        "palette": ["#5596e6", "#4178be", "#325c80", "#264a60", "#1d3649", "#152935"]
      },
      {
        "name": 4,
        "light": "#00aec9",
        "normal": "#067f92",
        "dark": "#002e36",
        "palette": ["#00b3cf", "#00aec9", "#007182", "#005b69", "#00454f", "#002e36"]
      }
    ]
  },

  "capabilities": {
    "multipleDashboards": false,
    "multiplePages": false,
    "useOldDialogs": false,
    "showControls": false,
    "breakpoints": {"xxl": 1649, "xl": 1324, "lg": 999, "md": 674, "sm": 349},
    "cols": {"xxl": 10, "xl": 8, "lg": 6, "md": 4, "sm": 2},
    "rowHeight": 105,
    "margin": [25,25]
  },

  "settings": {
    "configRepositoryURL": "http://configrepositoryservice.mybluemix.net/rest",
    "configRepositoryUser": "admin",
    "configRepositoryPassword": "admin",
    "configName": "MyDashboardConfig"
  },

  "components": [
    {
      "name": "DeviceTypes",
      "displayName": "COMP_TITLE_DeviceTypes",
      "description": "COMP_DESC_DeviceTypes",
      "category": "Usage",
      "cardType": "NO_DATAPOINTS",
      "thumbnail": "device-types",
      "require": ["../cards/DeviceTypes.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,3],[2,4],[4,3],[4,4]],
      "sticky": false,
      "showRefresh": true,
      "parameters" : {
        "component": "DeviceTypes",
        "title": "Device types"
      }
    },
    {
      "name": "UsageDeviceCard",
      "displayName": "COMP_TITLE_UsageDevice",
      "description": "COMP_DESC_UsageDevice",
      "category": "Usage",
      "cardType": "NO_DATAPOINTS",
      "thumbnail": "connected-devices",
      "require": ["../cards/UsageDeviceCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,1],[2,2],[2,3],[3,4],[4,4]],
      "sticky": false,
      "showRefresh": true,
      "parameters" : {
        "component": "UsageDeviceCard",
        "title": "Device connections"
      }
    },
    {
      "name": "UsageDataCard",
      "displayName": "COMP_TITLE_UsageData",
      "description": "COMP_DESC_UsageData",
      "category": "Usage",
      "cardType": "NO_DATAPOINTS",
      "thumbnail": "traffic-consumption",
      "require": ["../cards/UsageDataCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,1],[2,2],[2,3],[3,4],[4,4]],
      "sticky": false,
      "showRefresh": true,
      "parameters" : {
        "component": "UsageDataCard",
        "title": "Data consumed"
      }
    },
    {
      "name": "UsageStorageCard",
      "displayName": "COMP_TITLE_UsageStorage",
      "description": "COMP_DESC_UsageStorage",
      "category": "Usage",
      "cardType": "NO_DATAPOINTS",
      "thumbnail": "storage-consumption",
      "require": ["../cards/UsageStorageCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,1],[2,2],[2,3],[3,4],[4,4]],
      "sticky": false,
      "showRefresh": true,
      "parameters" : {
        "component": "UsageStorageCard",
        "title": "Storage consumed"
      }
    },
    {
      "name": "HorizontalLine",
      "displayName": "COMP_TITLE_HorizontalLine",
      "description": "COMP_DESC_HorizontalLine",
      "category": "Basic",
      "cardType": "NO_DATAPOINTS",
      "thumbnail": "horizontal-seperator",
      "require": ["../cards/HorizontalLine.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,1],[3,1],[4,1],[6,1],[8,1]],
      "sticky": false,
      "parameters" : {
        "component": "HorizontalLine",
        "title": "Separator"
      }
    },

    {
      "name": "RealTimeChart",
      "displayName": "COMP_TITLE_RealTimeChart",
      "description": "COMP_DESC_RealTimeChart",
      "thumbnail" : "line-chart",
      "category": "Devices",
      "cardType": "",
      "require": ["../cards/RealTimeChart.jsx", "../customization/RealTimeChartProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,3],[2,4],[3,4],[4,4]],
      "parameters" : {
        "component": "RealTimeChart",
        "title": "Real time chart",
        "autoscroll": true
      },
      "customization": "RealTimeChartProperties"
    },
    {
      "name": "BarChart",
      "displayName": "COMP_TITLE_BarChart",
      "description": "COMP_DESC_BarChart",
      "thumbnail" : "bar-chart",
      "category": "Devices",
      "cardType": "",
      "require": ["../cards/BarChart.jsx", "../customization/BarChartProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,3],[3,3],[4,4]],
      "parameters" : {
       "title":"",
        "component": "BarChart",
        "title": "Bar chart"
      },
      "customization": "BarChartProperties"
    },
    {
      "name": "DonutChart",
      "displayName": "COMP_TITLE_DonutChart",
      "description": "COMP_DESC_DonutChart",
      "thumbnail" : "pie-chart",
      "category": "Devices",
      "cardType": "",
      "require": ["../cards/DonutChart.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,3],[2,4],[4,3],[4,4]],
      "parameters" : {
       "title":"",
        "component": "DonutChart",
        "title": "Donut chart"
      }
    },
    {
      "name": "Value",
      "displayName": "COMP_TITLE_Value",
      "description": "COMP_DESC_Value",
      "thumbnail" : "text-based",
      "category": "Devices",
      "cardType": "",
      "require": ["../cards/Value.jsx", "../customization/GaugeProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,1],[2,2],[2,3],[3,4],[4,4]],
      "parameters" : {
       "title":"",
        "component": "Value",
        "title": "Value"
      },
      "customization": "SingleValueProperties"
    },
    {
      "name": "Gauge",
      "displayName": "COMP_TITLE_Gauge",
      "description": "COMP_DESC_Gauge",
      "thumbnail" : "gauge",
      "category": "Devices",
      "cardType": "",
      "require": ["../cards/Gauge.jsx", "../customization/GaugeProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[2,1],[2,4],[4,4]],
      "parameters" : {
        "component": "Gauge",
        "title": "Gauge"
      },
      "customization": "GaugeProperties"
    }

  ]}

},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/Const.js":[function(require,module,exports){
"use strict";

var Const = {
  "CONNECTED": "CONNECTED",
  "DISCONNECTED": "DISCONNECTED",
  "PAUSED": "PAUSED",

  // card type tags (use as comma separated list)
  "NO_DATAPOINTS": "NO_DATAPOINTS", // Do not show data set definition (e.g. usage cards)
  "SINGLE_DATAPOINT": "SINGLE_DATAPOINT", // Only one data point can be defined (not used yet)
  "EVENT_ONLY": "EVENT_ONLY", // Do not show property field in data point definition (e.g. weather service)
  "SPECIFIC": "SPECIFIC" // Select properties with a special meaning (e.g. elevator)
};

module.exports = Const;

},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/regex-email.js":[function(require,module,exports){
"use strict";

//
// Regular Expression for URL validation
//
// Author: Diego Perini
// Updated: 2010/12/05
// License: MIT
//
// Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// the regular expression composed & commented
// could be easily tweaked for RFC compliance,
// it was expressly modified to fit & satisfy
// these test for an URL shortener:
//
//   http://mathiasbynens.be/demo/url-regex
//
// Notes on possible differences from a standard/generic validation:
//
// - utf-8 char class take in consideration the full Unicode range
// - TLDs have been made mandatory so single names like "localhost" fails
// - protocols have been restricted to ftp, http and https only as requested
//
// Changes:
//
// - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
//   first and last IP address of each class is considered invalid
//   (since they are broadcast/network addresses)
//
// - Added exclusion of private, reserved and/or local networks ranges
//
// - Made starting path slash optional (http://example.com?foo=bar)
//
// - Allow a dot (.) at the end of hostnames (http://example.com.)
//
// Compressed one-line versions:
//
// Javascript version
//
// /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
//
// PHP version
//
// _^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]-*)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]-*)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$_iuS
//
var re_weburl = new RegExp(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/);

module.exports = re_weburl;

},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/regex-weburl.js":[function(require,module,exports){
"use strict";

//
// Regular Expression for URL validation
//
// Author: Diego Perini
// Updated: 2010/12/05
// License: MIT
//
// Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// the regular expression composed & commented
// could be easily tweaked for RFC compliance,
// it was expressly modified to fit & satisfy
// these test for an URL shortener:
//
//   http://mathiasbynens.be/demo/url-regex
//
// Notes on possible differences from a standard/generic validation:
//
// - utf-8 char class take in consideration the full Unicode range
// - TLDs have been made mandatory so single names like "localhost" fails
// - protocols have been restricted to ftp, http and https only as requested
//
// Changes:
//
// - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
//   first and last IP address of each class is considered invalid
//   (since they are broadcast/network addresses)
//
// - Added exclusion of private, reserved and/or local networks ranges
//
// - Made starting path slash optional (http://example.com?foo=bar)
//
// - Allow a dot (.) at the end of hostnames (http://example.com.)
//
// Compressed one-line versions:
//
// Javascript version
//
// /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
//
// PHP version
//
// _^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]-*)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]-*)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$_iuS
//
var re_weburl = new RegExp("^" +
// protocol identifier
"(?:(?:https?|ftp)://)" +
// user:pass authentication
"(?:\\S+(?::\\S*)?@)?" + "(?:" +
// IP address exclusion
// private & local networks
"(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
// IP address dotted notation octets
// excludes loopback network 0.0.0.0
// excludes reserved space >= 224.0.0.0
// excludes network & broacast addresses
// (first & last IP address of each class)
"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
// host name
"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
// domain name
"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
// TLD identifier
"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
// TLD may end with dot
"\\.?" + ")" +
// port number
"(?::\\d{2,5})?" +
// resource path
"(?:[/?#]\\S*)?" + "$", "i");

module.exports = re_weburl;

},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/common.jsx":[function(require,module,exports){
'use strict';

var IoTFCommon = {};

// Stores
IoTFCommon.ConfigStore = require('./stores/ConfigStore.js');
IoTFCommon.IoTFAuthStore = require('./stores/IoTFAuthStore.js');
IoTFCommon.IoTFDeviceStore = require('./stores/IoTFDeviceStore.js');
IoTFCommon.IoTFUsageStore = require('./stores/IoTFUsageStore.js');

// Common components
IoTFCommon.Accordion = require('./components/Accordion.jsx');
IoTFCommon.BarChart = require('./components/BarChart.jsx');
IoTFCommon.Button = require('./components/Button.jsx');
IoTFCommon.CardDatapoint = require('./components/CardDatapoint.jsx');
IoTFCommon.CardFooter = require('./components/CardFooter.jsx');
IoTFCommon.CardFooterDatapoint = require('./components/CardFooterDatapoint.jsx');
IoTFCommon.CardIndicator = require('./components/CardIndicator.jsx');
IoTFCommon.CardGalleryItem = require('./components/CardGalleryItem.jsx');
IoTFCommon.CardLineChart = require('./components/CardLineChart.jsx');
IoTFCommon.CardTable = require('./components/CardTable.jsx');
IoTFCommon.CheckBox = require('./components/CheckBox.jsx');
IoTFCommon.ColorSelection = require('./components/ColorSelection.jsx');
IoTFCommon.ComboBox = require('./components/ComboBox.jsx');
IoTFCommon.DonutChart = require('./components/DonutChart.jsx');
IoTFCommon.Dropdown = require('./components/Dropdown.jsx');
IoTFCommon.GalleryAccordion = require('./components/GalleryAccordion.jsx');
IoTFCommon.Gauge = require('./components/Gauge.jsx');
IoTFCommon.Icon = require('./components/Icon.jsx');
IoTFCommon.IconLink = require('./components/IconLink.jsx');
IoTFCommon.Image = require('./components/Image.jsx');
IoTFCommon.InputField = require('./components/InputField.jsx');
IoTFCommon.Label = require('./components/Label.jsx');
IoTFCommon.LineChart = require('./components/LineChart.jsx');
IoTFCommon.LoadIndicator = require('./components/LoadIndicator.jsx');
IoTFCommon.Option = require('./components/Option.jsx');
IoTFCommon.Portal = require('./components/Portal.jsx');
IoTFCommon.SearchField = require('./components/SearchField.jsx');
IoTFCommon.Section = require('./components/Section.jsx');
IoTFCommon.Select = require('./components/Select.jsx');
IoTFCommon.SwitchBtn = require('./components/SwitchBtn.jsx');

module.exports = IoTFCommon;

},{"./components/Accordion.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Accordion.jsx","./components/BarChart.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/BarChart.jsx","./components/Button.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Button.jsx","./components/CardDatapoint.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardDatapoint.jsx","./components/CardFooter.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardFooter.jsx","./components/CardFooterDatapoint.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardFooterDatapoint.jsx","./components/CardGalleryItem.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardGalleryItem.jsx","./components/CardIndicator.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardIndicator.jsx","./components/CardLineChart.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardLineChart.jsx","./components/CardTable.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardTable.jsx","./components/CheckBox.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CheckBox.jsx","./components/ColorSelection.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/ColorSelection.jsx","./components/ComboBox.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/ComboBox.jsx","./components/DonutChart.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/DonutChart.jsx","./components/Dropdown.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Dropdown.jsx","./components/GalleryAccordion.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/GalleryAccordion.jsx","./components/Gauge.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Gauge.jsx","./components/Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx","./components/IconLink.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/IconLink.jsx","./components/Image.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Image.jsx","./components/InputField.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/InputField.jsx","./components/Label.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Label.jsx","./components/LineChart.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/LineChart.jsx","./components/LoadIndicator.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/LoadIndicator.jsx","./components/Option.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Option.jsx","./components/Portal.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Portal.jsx","./components/SearchField.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/SearchField.jsx","./components/Section.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Section.jsx","./components/Select.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Select.jsx","./components/SwitchBtn.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/SwitchBtn.jsx","./stores/ConfigStore.js":"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/ConfigStore.js","./stores/IoTFAuthStore.js":"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFAuthStore.js","./stores/IoTFDeviceStore.js":"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFDeviceStore.js","./stores/IoTFUsageStore.js":"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFUsageStore.js"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Accordion.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {

    container: {
        marginBottom: "15px",
        boxSizing: "border-box",
        clear: "both",
        cursor: "pointer"
    },
    canvas: {
        paddingLeft: "20px"
    },
    title: {
        height: "24px",
        padding: "5px 0px",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px"
    },
    icon: {
        float: "right"
    }

};

var Accordion = React.createClass({
    displayName: 'Accordion',

    propTypes: {
        theme: RPT.object.isRequired,
        style: RPT.object,
        id: RPT.string,
        label: RPT.string,
        onRemove: RPT.func,
        onExpand: RPT.func,
        expanded: RPT.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: "",
            expanded: false
        };
    },

    componentWillMount: function componentWillMount() {},

    componentDidMount: function componentDidMount(payload) {},

    onRemove: function onRemove() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.id);
        }
        return false;
    },

    onToggle: function onToggle() {
        if (this.props.onExpand) {
            this.props.onExpand(!this.props.expanded ? this.props.id : null);
        }
    },

    render: function render() {
        var canvas = "";
        if (this.props.expanded) {
            canvas = React.createElement(
                'div',
                { style: styles.canvas },
                this.props.children
            );
        }

        return React.createElement(
            'div',
            { style: styles.container },
            React.createElement(
                'div',
                { style: styles.title, onClick: this.onToggle },
                this.props.label,
                React.createElement(Icon, { style: styles.icon, theme: this.props.theme, size: 20, color: this.props.theme.major, icon: 'delete', onClick: this.onRemove })
            ),
            canvas
        );
    }
});

module.exports = Accordion;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/BarChart.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var BarChart = React.createClass({
  displayName: 'BarChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    names: RPT.object,
    type: RPT.string,
    title: RPT.string,
    horizontal: RPT.bool,
    unit: RPT.string,
    precision: RPT.number,
    small: RPT.bool,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      names: {},
      horizontal: false,
      unit: "",
      precision: 0
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var names = ['x'];
      var data = ['value'];
      for (var i in this.props.data) {
        var item = this.props.data[i];
        names.push(this.props.names[item[0]]);
        data.push(item[1]);
      }

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        data: {
          type: "bar",
          x: 'x',
          columns: [names, data],
          color: function color(inColor, data) {
            if (data.index !== undefined) {
              return colors[data.index % colors.length];
            }
            return inColor;
          },
          labels: {
            format: function format(v, id, i, j) {
              if (self.props.precision) {
                v = v.toFixed(self.props.precision);
              }
              return v + " " + self.props.unit;
            }
          }
        },
        transition: {
          duration: 200
        },
        axis: {
          rotated: this.props.horizontal,
          x: {
            type: 'category'
          },
          y: {
            show: !this.props.small
          }
        },
        tooltip: {
          grouped: false
        },
        legend: {
          show: false
        },
        padding: {
          left: 0,
          bottom: 0,
          right: 0,
          top: 0
        },
        bar: {
          width: {
            ratio: 0.7,
            zerobased: false
          }
        }
      };

      if (this.props.horizontal || this.props.small) {
        config.padding = {
          left: 100,
          bottom: 0,
          right: 0,
          top: 0
        };
      } else {
        config.padding = {
          left: 0,
          bottom: 10,
          right: 0,
          top: 0
        };
      }

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    var self = this;
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      var names = ['x'];
      var data = ['value'];
      for (var i = 0; i < this.props.data.length; i++) {
        var item = this.props.data[i];
        names.push(this.props.names[item[0]]);
        data.push(item[1]);
      }

      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      self.graph.load({
        columns: [names, data]
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  checkIfPropsChanged: function checkIfPropsChanged(a, b) {
    if (JSON.stringify(a.theme) != JSON.stringify(b.theme) || a.type != b.type || a.horizontal != b.horizontal || a.unit != b.unit || a.precision != b.precision || a.width != b.width || a.height != b.height) {
      this.createGraph();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.updateGraph();
    this.checkIfPropsChanged(prevProps, this.props);
  },

  render: function render() {
    if (!this.id) {
      this.id = "X" + Math.round(Math.random() * 1000000);
    }
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement('div', { className: 'barChart', id: this.id, style: style });
  }
});

module.exports = BarChart;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js","./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Button.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
  componentButtonText: {
    textAlign: "center",
    display: "inline-block",
    padding: "14px 35px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    fontSize: "15px",
    borderStyle: "solid",
    borderWidth: "2px"
  }
};

var ButtonText = React.createClass({
  displayName: "ButtonText",

  propTypes: {
    style: RPT.object,
    theme: RPT.object,
    text: RPT.string,
    cursor: RPT.string,
    width: RPT.number,
    disabled: RPT.bool,
    onClick: RPT.func,
    isPrimary: RPT.bool,

    textColor: RPT.string,
    textHoverActiveColor: RPT.string,
    textPressColor: RPT.string,

    bgColor: RPT.string,
    bgHoverColor: RPT.string,
    bgPressColor: RPT.string,

    borderColor: RPT.string,
    borderHoverColor: RPT.string,
    borderPressColor: RPT.string
  },

  getInitialState: function getInitialState() {
    return { hover: false };
  },

  mouseOver: function mouseOver() {
    this.setState({ hover: true });
  },

  mouseOut: function mouseOut() {
    this.setState({ hover: false });
  },

  mouseDown: function mouseDown() {
    this.setState({ press: true });
  },

  mouseUp: function mouseUp() {
    this.setState({ press: false });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== undefined) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  },

  componentWillMount: function componentWillMount() {
    if (this.props.disabled) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      textColor: "#5596E6",
      textHoverColor: "#4178BE",
      bgColor: "",
      borderColor: "#5596E6",
      borderHoverColor: "#4178BE",

      textPrimaryColor: "#fff",
      textPrimaryHoverColor: "#fff",
      bgPrimaryColor: "#5596E6",
      bgPrimaryHoverColor: "#4178BE",
      borderPrimaryColor: "#5596E6",
      borderPrimaryHoverColor: "#4178BE",

      text: "BUTTON",
      minWidth: "140px",
      minHeight: "50px",
      btnCursor: "pointer",
      onClick: function onClick() {},
      isPrimary: false
    };
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function render() {
    var stateStyle = {};

    stateStyle.width = this.props.width;

    if (this.props.isPrimary) {
      if (this.state.hover || this.state.press) {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgPrimaryHoverColor;
        stateStyle.color = this.props.textPrimaryHoverColor;
        stateStyle.borderColor = this.props.borderPrimaryHoverColor;
      } else {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgPrimaryColor;
        stateStyle.color = this.props.textPrimaryColor;
        stateStyle.borderColor = this.props.borderPrimaryColor;
      }
    } else {
      if (this.state.hover || this.state.press) {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgHoverColor;
        stateStyle.color = this.props.textHoverColor;
        stateStyle.borderColor = this.props.borderHoverColor;
      } else {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgColor;
        stateStyle.color = this.props.textColor;
        stateStyle.borderColor = this.props.borderColor;
        stateStyle.width = this.props.width;
      }
    }

    if (this.state.disabled) {
      stateStyle.cursor = 'no-drop';
      stateStyle.backgroundColor = '';
      stateStyle.color = '#AEB8B8';
      stateStyle.borderColor = '#f4f4f4';
    }

    var styleBtn = Object.assign({}, styles.componentButtonText, stateStyle, this.props.style);
    var linkStyle = { textDecoration: 'none !important' };

    return React.createElement(
      "a",
      { style: linkStyle },
      " ",
      React.createElement(
        "div",
        { style: styleBtn, onClick: this.onClick, onMouseOver: this.mouseOver, onMouseOut: this.mouseOut, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp },
        this.props.text,
        " ",
        this.props.disabled,
        " "
      ),
      " "
    );
  }
});

module.exports = ButtonText;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardDatapoint.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	value: {
		fontSize: "30px",
		fontWeight: "300",
		lineHeight: "30px",
		color: "#325C80"
	},
	unit: {
		fontSize: "14px",
		color: "#6D7777",
		display: "block",
		marginBottom: "10px",
		fontWeight: "300",
		letterSpacing: "0.3px"
	},
	minor: {
		fontSize: "22px"
	}
};

var CardDatapoint = React.createClass({
	displayName: "CardDatapoint",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		unit: RPT.string,
		minor: RPT.bool
	},

	render: function render() {

		styles.unit.color = this.props.theme.minor;
		styles.value.color = this.props.theme.major;

		var style = Object.assign({}, this.props.style ? this.props.style : {});
		var styleValue = Object.assign({}, styles.value, this.props.minor ? styles.minor : {});

		return React.createElement(
			"div",
			{ style: style },
			React.createElement(
				"div",
				{ style: styleValue },
				this.props.children
			),
			React.createElement(
				"div",
				{ style: styles.unit },
				this.props.unit
			)
		);
	}
});

module.exports = CardDatapoint;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardFooter.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "40px",
		border: "1px solid",
		borderColor: "transparent",
		position: "absolute",
		bottom: "0px",
		left: "0px"
	}
};

var CardFooter = React.createClass({
	displayName: "CardFooter",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function render() {
		styles.container.borderTopColor = this.props.theme.border;
		styles.container.backgroundColor = this.props.theme.content;

		var style = Object.assign({}, styles.container);
		return React.createElement(
			"div",
			{ style: style },
			this.props.children
		);
	}
});

module.exports = CardFooter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardFooterDatapoint.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	container: {
		float: "left",
		width: "50%"
	},
	value: {
		fontSize: "13px",
		fontWeight: "bold",
		textAlign: "left",
		paddingLeft: "30px"
	},
	title: {
		fontSize: "13px",
		fontWeight: "normal",
		letterSpacing: "0.5px",
		textTransform: "uppercase",
		paddingLeft: "30px",
		opacity: 0.5,
		marginTop: "5px"
	}
};

var CardFooterDatapoint = React.createClass({
	displayName: "CardFooterDatapoint",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		unit: RPT.string,
		title: RPT.string
	},

	render: function render() {

		styles.title.color = this.props.theme.minor;
		styles.value.color = this.props.theme.minor;

		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		return React.createElement(
			"div",
			{ style: style },
			React.createElement(
				"div",
				{ style: styles.title },
				this.props.title
			),
			React.createElement(
				"div",
				{ style: styles.value },
				this.props.children,
				" ",
				this.props.unit
			)
		);
	}
});

module.exports = CardFooterDatapoint;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardGalleryItem.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Icon = require('./Icon.jsx');

var RPT = React.PropTypes;

var styles = {
  cardContainer: {
    width: '145px',
    height: '115px',
    float: 'left',
    marginRight: '5px',
    marginTop: '10px',
    backgroundColor: '#F5F5F5',
    padding: '5px',
    position: 'relative',
    overflow: 'hidden'
  },
  selectedCard: {
    borderTop: '2px solid',
    borderBottom: '2px solid'
  },
  clickingLayer: {
    width: '100%',
    display: 'block',
    height: '100%',
    position: 'absolute',
    zIndex: '10'
  },
  cardDescriptionToggle: {
    marginRight: '5px',
    position: 'absolute',
    right: '0px',
    width: '25px',
    height: '25px',
    textAlign: 'center',
    display: 'block',
    top: '3px'
  },
  cardTitle: {
    position: 'absolute',
    bottom: '0px',
    marginBottom: '5px'
  },
  cardThumb: {
    alignSelf: 'center'
  },
  thumbContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    opacity: '1',
    MozTransition: 'all 0.5s ease',
    WebkitTransition: 'all 0.5s ease',
    OTransition: 'all 0.5s ease',
    transition: 'all 0.5s ease'
  },
  cardDescription: {
    height: '100%',
    overflow: 'hidden',
    fontSize: '12px',
    paddingTop: '20px',
    position: 'absolute',
    bottom: '-75px',
    MozTransition: 'all 0.5s ease',
    WebkitTransition: 'all 0.5s ease',
    OTransition: 'all 0.5s ease',
    transition: 'all 0.5s ease'
  }
};

var CardGalleryItem = React.createClass({
  displayName: 'CardGalleryItem',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    item: RPT.object.isRequired,
    nls: RPT.object,
    onClick: RPT.func,
    selected: RPT.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      item: {}
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.setState({
      selected: props.selected
    });
  },

  getInitialState: function getInitialState() {
    return {
      hoverInfo: false,
      selected: this.props.selected
    };
  },

  onMouseOver: function onMouseOver() {
    this.setState({
      hoverInfo: true
    });
  },

  onMouseOut: function onMouseOut(e) {
    this.setState({
      hoverInfo: false
    });
  },

  onTouch: function onTouch(e) {
    //this.closeInfoLater(); // auto close after 10s
    this.setState({
      hoverInfo: !this.state.hoverInfo
    });
  },

  onClick: function onClick(e) {
    if (e.target.className !== 'infoTrigger') {
      if (this.props.onClick) {
        this.props.onClick(this.props.item);
      }
      this.setState({
        selected: true
      });
    }
  },

  closeInfoLater: function closeInfoLater() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    var self = this;
    this.closeTimer = setTimeout(function () {
      self.onMouseOut();
      self.closeTimer = null;
    }, 10000);
  },

  componentDidMount: function componentDidMount() {

    if (this.props.selected) {
      var newPos = $(this.refs.galleryItem).position().top - 160 > 0 ? $(this.refs.galleryItem).position().top - 160 : 0;
      $($(this.refs.galleryItem).scrollParent()).scrollTop(newPos);
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, PrevState) {
    if (this.state.hoverInfo) {
      //$(this.refs.descriptionText).ellipsis();
    } else {}
  },

  render: function render() {
    var description = '';
    var cardTitle = this.props.item.displayName;
    var containerStyle = styles.cardContainer;
    var thumbContainerStyle = '';
    var infoColor = this.props.theme.light;

    if (this.state.selected) {
      containerStyle = Object.assign({}, containerStyle, styles.selectedCard, { borderColor: this.props.theme.accent });
    } else {
      containerStyle = styles.cardContainer;
    }

    var descriptionText = this.props.nls.resolve(this.props.item.description);
    if (!description) {
      descriptionText = this.props.item.description;
    }

    if (this.state.hoverInfo) {
      description = React.createElement(
        'div',
        { style: Object.assign({}, styles.cardDescription, { bottom: '0' }) },
        this.props.nls.resolve(cardTitle),
        React.createElement('br', null),
        this.props.nls.resolve(this.props.item.description)
      );
      thumbContainerStyle = Object.assign({}, styles.thumbContainer, { opacity: '0.01', height: '0%' });
      infoColor = "#3C3C3B";
    } else {
      description = React.createElement(
        'div',
        { style: Object.assign({}, styles.cardDescription, { bottom: '-75px' }) },
        this.props.nls.resolve(cardTitle),
        React.createElement('br', null),
        this.props.nls.resolve(this.props.item.description)
      );
      thumbContainerStyle = styles.thumbContainer;
    }

    return React.createElement(
      'div',
      { id: this.props.item.name, style: containerStyle, onClick: this.onClick, ref: 'galleryItem' },
      React.createElement(
        'div',
        { style: styles.cardDescriptionToggle },
        React.createElement(
          'a',
          { className: 'infoTrigger', tabIndex: '1', href: 'javascript:void(0)' },
          React.createElement('div', { className: 'infoTrigger', style: styles.clickingLayer, onClick: this.onTouch, onMouseEnter: this.onMouseOver, onBlur: this.onMouseOut, onMouseLeave: this.onMouseOut })
        ),
        React.createElement(Icon, { theme: this.props.theme, color: infoColor, icon: 'info' })
      ),
      React.createElement(
        'div',
        { style: thumbContainerStyle },
        React.createElement(
          'div',
          { style: styles.cardThumb },
          React.createElement(Icon, { theme: this.props.theme, color: '#3C3C3B', icon: this.props.item.thumbnail, size: 50 })
        )
      ),
      React.createElement(
        'div',
        { ref: 'descriptionText' },
        description
      )
    );
  }
});

module.exports = CardGalleryItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardIndicator.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
	container: {
		fontSize: "12px",
		width: "100%",
		boxShadow: "0px 1px 1px rgba(192, 192, 192, 0.5)",
		height: "40px",
		lineHeight: "40px",
		paddingLeft: "10px"
	}
};

var CardIndicator = React.createClass({
	displayName: 'CardIndicator',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		condition: RPT.string
	},

	render: function render() {
		styles.container.color = this.props.theme.least;
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
		return React.createElement(
			'div',
			{ style: style },
			React.createElement(Icon, { icon: this.props.condition,
				color: this.props.theme[this.props.condition],
				size: 24,
				style: { verticalAlign: "middle", marginRight: "10px" },
				theme: this.props.theme
			}),
			this.props.children
		);
	}
});

module.exports = CardIndicator;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardLineChart.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var LoadIndicator = require('./LoadIndicator.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "270px"
  }
};

var CardLineChart = React.createClass({
  displayName: 'CardLineChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    showRange: RPT.bool,
    unit: RPT.string,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: []
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      if (this.props.data && this.props.data.length > 0) {

        var today = new Date();
        var weekAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7);
        var zoomStart = today.toISOString().split("T")[0];
        var zoomEnd = weekAgo.toISOString().split("T")[0];

        var colorMap = { 'total': colors[0] };

        var config = {
          size: {
            width: this.width,
            height: this.height
          },
          data: {
            type: "area",
            json: this.props.data,
            x: 'date',
            keys: {
              x: 'date',
              value: ['total']
            },
            colors: colorMap
          },
          axis: {
            x: {
              type: "timeseries",
              extent: [zoomEnd, zoomStart]
            },
            y: {
              label: this.props.unit
            }
          },
          grid: {
            x: {
              show: true
            },
            y: {
              show: true
            }
          },
          point: {
            r: 4,
            focus: {
              expand: {
                enabled: true,
                r: 6
              }
            }
          },
          legend: {
            hide: true
          },
          padding: {
            left: 50,
            bottom: 0,
            right: 0,
            top: 0
          }

        };

        if (this.props.showRange) {
          config.subchart = {
            show: true,
            size: {
              height: 30
            }
          };
        }

        this.graph = c3.generate(config);

        dom.appendChild(this.graph.element);
      }
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.createGraph();
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    style.borderLeftColor = this.props.theme.border;

    if (this.props.data && this.props.data.length > 0) {
      return React.createElement('div', { className: 'lineChart', style: style });
    } else {
      return React.createElement(LoadIndicator, { theme: this.props.theme });
    }
  }
});

module.exports = CardLineChart;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js","./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx","./LoadIndicator.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/LoadIndicator.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CardTable.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    position: "relative",
    overflow: "hidden",
    fontSize: "14px"
  },
  table: {
    width: "100%"
  },
  headerRow: {
    borderBottom: "3px solid grey"
  },
  headerCell: {
    textAlign: "left",
    padding: "11px 7px 11px 0px"
  },
  row: {
    fontWeight: "300"
  },
  cell: {
    padding: "11px 7px 11px 0px"
  }
};

var CardTable = React.createClass({
  displayName: 'CardTable',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    header: RPT.array,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      header: [],
      data: []
    };
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {}, { width: this.props.width + 'px' });

    styles.headerRow.borderColor = this.props.theme.light;
    styles.cell.color = this.props.theme.minor;

    var data = this.props.data;
    var header = this.props.header;

    var self = this;

    var count = 0;

    return React.createElement(
      'div',
      { style: style },
      React.createElement(
        'table',
        { style: styles.table },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            { style: styles.headerRow },
            header.map(function (item) {
              return React.createElement(
                'th',
                { key: count++, style: styles.headerCell },
                item
              );
            })
          )
        ),
        React.createElement(
          'tbody',
          null,
          data.map(function (row) {
            return React.createElement(
              'tr',
              { key: count++, style: styles.row },
              row.map(function (cell) {
                return React.createElement(
                  'td',
                  { key: count++, style: styles.cell },
                  cell
                );
              })
            );
          })
        )
      )
    );
  }
});

module.exports = CardTable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js","./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/CheckBox.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var RPT = React.PropTypes;

var styles = {
  circle: {
    width: "16px",
    height: "16px",
    background: "#5596E6",
    MozBorderRadius: "50px",
    WebkitBorderRadius: "50px",
    borderRadius: "50px",
    float: "left",
    cursor: "pointer"
  },
  checkmark: {
    display: "inline-block",
    width: "22px",
    height: "22px",
    MsTransform: "rotate(45deg)",
    WebkitTransform: "rotate(45deg)",
    transform: "rotate(45deg)"
  },
  checkmarkBack: {
    position: "absolute",
    width: "2px",
    height: "9px",
    backgroundColor: "#ffffff",
    left: "7px",
    top: "6px"
  },
  checkmarkSeat: {
    position: "absolute",
    width: "4px",
    height: "2px",
    backgroundColor: "#ffffff",
    left: "4px",
    top: "13px"
  },
  inactiveCB: {
    width: "16px",
    height: "16px",
    background: "transparent",
    border: "2px solid",
    borderColor: "#AEB8B8",
    MozBorderRadius: "50px",
    WebkitBorderRadius: "50px",
    borderRadius: "50px",
    float: "left",
    cursor: "pointer",
    boxSizing: 'border-box'
  },
  hoverCB: {
    borderColor: "#5596E6"
  }
};

var CheckBox = React.createClass({
  displayName: "CheckBox",

  propTypes: {
    checked: RPT.bool,
    id: RPT.string,
    name: RPT.string,
    onChange: RPT.func,
    style: RPT.object,
    theme: RPT.object.isRequired,
    value: RPT.string
  },

  getInitialState: function getInitialState() {
    return {
      checked: this.props.checked
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      checked: false,
      id: Math.random().toString(),
      //labelRight: true,
      name: "checkBoxName"
    };
  },

  handleChange: function handleChange(event) {
    this.setState({
      checked: !this.state.checked
    });
    if (this.props.onChange) {
      this.props.onChange(!this.state.checked);
    }
  },

  hoverCB: function hoverCB(event) {
    this.setState({
      hovered: true
    });
  },

  noHoverCB: function noHoverCB(event) {
    this.setState({
      hovered: false
    });
  },

  render: function render() {
    var outerStyle = Object.assign({}, this.props.style);
    var inactiveCB = {};
    console.log(inactiveCB);
    if (this.state.hovered) {
      inactiveCB = Object.assign({}, styles.inactiveCB, styles.hoverCB);
    } else {
      inactiveCB = styles.inactiveCB;
    }
    var checkBoxChecked = React.createElement(
      "div",
      { onClick: this.handleChange, style: styles.circle },
      React.createElement(
        "span",
        { style: styles.checkmark },
        React.createElement("span", { style: styles.checkmarkBack }),
        React.createElement("span", { style: styles.checkmarkSeat })
      )
    );
    var checkBoxInactive = React.createElement("div", { onClick: this.handleChange, style: inactiveCB });
    var output = this.state.checked ? React.createElement(
      "div",
      null,
      checkBoxChecked
    ) : React.createElement(
      "div",
      null,
      checkBoxInactive
    );
    return React.createElement(
      "div",
      { onMouseOver: this.hoverCB, onMouseOut: this.noHoverCB, style: outerStyle },
      output
    );
  }
});

module.exports = CheckBox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/ColorSelection.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
  container: {
    marginBottom: "15px",
    boxSizing: "border-box"
  },
  colorTile: {
    margin: "5px",
    width: "24px",
    height: "24px",
    display: "inline-block",
    verticalAlign: "middle",
    fontSize: "20px",
    textAlign: "center"
  },
  tiles: {
    display: "block",
    width: "100%",
    float: "left"
  },
  after: {
    clear: "both"
  }
};

var ColorSelection = React.createClass({
  displayName: "ColorSelection",

  propTypes: {
    onChange: RPT.func,
    initialSelection: RPT.number,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialSelection: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      selection: this.props.initialSelection
    };
  },

  // componentWillReceiveProps: function(nextProps) {
  // 	if (nextProps.initialSelection !== undefined) {
  // 		this.setState({
  // 			selection: nextProps.initialSelection
  // 		});
  // 	}

  // },

  onSelect: function onSelect(id) {
    this.setState({
      selection: id
    });
    if (this.props.onChange) {
      this.props.onChange(id);
    }
  },

  render: function render() {
    var self = this;
    var schemes = this.props.theme.schemes;
    var tiles = schemes.map(function (scheme) {
      var style = Object.assign({}, styles.colorTile, {
        backgroundColor: scheme.normal,
        //borderTop: "4px solid " + scheme.dark,
        color: scheme.text
      });
      if (self.state.selection == scheme.name) {
        style.outline = "5px solid " + scheme.dark;
      }

      return React.createElement("div", { style: style, key: scheme.name, onClick: function onClick() {
          self.onSelect(scheme.name);
        } });
    });

    return React.createElement(
      "div",
      { style: styles.container },
      React.createElement(
        "div",
        { name: "tiles", style: styles.tiles },
        tiles.map(function (result) {
          return result;
        })
      ),
      React.createElement("div", { style: styles.after })
    );
  }
});

module.exports = ColorSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/ComboBox.jsx":[function(require,module,exports){
(function (global){
'use strict';

/*global require, module*/
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var InputField = require('./InputField.jsx');
var Option = require('./Option.jsx');

var styles = {
	container: {
		display: "block",
		width: "100%"
	},
	inputField: {
		width: "100%",
		boxSizing: "border-box"
	},
	optionsContainer: {
		position: "relative",
		WebkitTransition: "all .2s ease-in-out",
		transition: "all .2s ease-in-out",
		overflowX: "auto",
		maxHeight: "200px",
		overflow: "auto",
		zIndex: "1000"
	},
	emptyOption: {
		padding: "6px"
	}
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Combobox-component
//

var ComboBox = React.createClass({
	displayName: 'ComboBox',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		onChange: RPT.func,
		initialValue: RPT.string,
		placeholderNoItems: RPT.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			placeholderNoItems: ""
		};
	},

	getInitialState: function getInitialState() {
		return {
			input: this.props.initialValue || "",
			hasInput: this.props.initialValue !== "",
			filteredChildren: [],
			isOpen: false
		};
	},

	componentWillMount: function componentWillMount() {
		this.chidrenAttachSelect();
	},

	componentDidMount: function componentDidMount() {
		this.chidrenAttachSelect();
		this.filterChildren(this.state.input);
		this.updateOptionsSize();
	},

	componentDidReceiveProps: function componentDidReceiveProps() {
		this.chidrenAttachSelect();
		this.filterChildren(this.state.input);
	},

	updateOptionsSize: function updateOptionsSize() {
		if (this.refs.comboBox) {
			var newWidth = ReactDOM.findDOMNode(this.refs.comboBox).offsetWidth;
			styles.optionsContainer.width = newWidth;
		}
	},

	componentWillUpdate: function componentWillUpdate() {
		this.updateOptionsSize();
	},

	chidrenAttachSelect: function chidrenAttachSelect() {
		var self = this;
		var childrenWithSelect = [];
		React.Children.forEach(this.props.children, function (child) {
			var childWithSelect = React.cloneElement(child, { onSelect: self.onSelect });
			childrenWithSelect.push(childWithSelect);
		});
		this.setState({
			children: childrenWithSelect
		});
	},

	filterChildren: function filterChildren(comp) {
		var filteredChildren = [];

		React.Children.forEach(this.state.children, function (child) {
			if (child) {
				if (child.props && (child.props.children.startsWith(comp) || child.props.value.startsWith(comp))) {
					filteredChildren.push(child);
				}
			}
		});
		this.setState({ filteredChildren: filteredChildren });
		return filteredChildren;
	},

	handleInput: function handleInput(value) {
		if (value === "") {
			this.setState({ hasInput: false, input: value, isOpen: true });
		} else {
			this.setState({ hasInput: true, input: value, isOpen: true });
		}
		this.chidrenAttachSelect();
		this.filterChildren(value);
		this.onChange(value);
	},

	onSelect: function onSelect(value, label, event) {
		this.setState({ input: label, hasInput: true, isOpen: false });
		this.onChange(label);
	},

	onFocus: function onFocus() {
		this.setState({ isOpen: true });
		this.chidrenAttachSelect();
		this.filterChildren(this.state.input);
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	},

	onBlur: function onBlur() {
		this.setState({ isOpen: false });
		this.onChange(this.state.input);
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	},

	onChange: function onChange(value) {
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	},

	renderInputField: function renderInputField() {
		return React.createElement(InputField, { style: styles.inputField, containerStyle: { width: "100%" }, theme: this.props.theme, initialValue: this.props.initialValue, value: this.state.input, onChange: this.handleInput, onFocus: this.onFocus, onBlur: this.onBlur });
	},

	renderChildren: function renderChildren() {
		var children = "";

		var optionsContainer = Object.assign({}, styles.optionsContainer, this.props.optionsContainerStyle);

		if (this.state.hasInput) {
			if (this.state.filteredChildren.length !== 0) {
				console.log(this.state.filteredChildren);
				children = this.state.filteredChildren;
			} else {
				children = this.props.placeholderNoItems !== '' ? React.createElement(
					Option,
					{ value: null, theme: this.props.theme, style: styles.emptyOption, onSelect: function onSelect() {}, disabled: true },
					this.props.placeholderNoItems
				) : '';
			}
		} else {
			children = this.state.children;
		}
		var lastIndex = Array.isArray(children) ? children.length - 1 : null;
		var childrenElement = children !== '' ? React.createElement(
			'div',
			{ style: optionsContainer },
			React.Children.map(children, function (child, idx) {
				var currProps = {};
				if (lastIndex && lastIndex == idx) {
					currProps = { lastChild: true, firstChild: false };
				} else if (idx === 0) {
					currProps = { lastChild: false, firstChild: true };
				} else {
					currProps = { lastChild: false, firstChild: false };
				}
				var newChild = React.cloneElement(child, currProps);
				return newChild;
			})
		) : '';

		return childrenElement;
	},

	render: function render() {

		var containerStyle = Object.assign({}, styles.container, this.props.style);
		return React.createElement(
			'div',
			{ ref: 'comboBox', style: containerStyle },
			this.renderInputField(),
			this.state.isOpen ? this.renderChildren() : ""
		);
	}
});

module.exports = ComboBox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./InputField.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/InputField.jsx","./Option.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Option.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/DonutChart.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%",
    margin: "0 auto"
  }
};

var DonutChart = React.createClass({
  displayName: 'DonutChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    names: RPT.object,
    title: RPT.string,
    unit: RPT.string,
    label: RPT.number,
    width: RPT.number,
    height: RPT.number,
    focus: RPT.string,
    revert: RPT.bool,
    click: RPT.string,
    onOver: RPT.func,
    onOut: RPT.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      names: {}
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        data: {
          onclick: function onclick(d, i) {
            console.log("onclick", d, i);
          },
          onmouseover: function onmouseover(d, i) {
            if (self.props.onOver) {
              self.props.onOver(d, i);
            }
          },
          onmouseout: function onmouseout(d, i) {
            if (self.props.onOut) {
              self.props.onOut(d, i);
            }
          },
          type: "donut",
          columns: this.props.data
        },
        donut: {
          title: this.props.title, // cannot be removed
          label: {
            show: false
          },
          expand: true,
          width: 15
        },
        legend: {
          show: false
        },
        color: {
          pattern: colors
        },
        tooltip: {
          show: false
        }
      };

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);

      this.setTitle();
    }
  },

  setTitle: function setTitle(text) {
    if (this.props.data) {
      var count = 0;
      for (var i in this.props.data) {
        var item = this.props.data[i];
        count += item[1];
      }

      if (count != Math.round(count)) {
        count = count.toFixed(2);
      }

      var label = d3.select('#' + this.id + ' text.c3-chart-arcs-title');

      label.text('');
      label.selectAll("*").remove(); //html(''); // remove existant text

      if (text !== undefined) {
        label.insert('tspan').text(text).attr('dy', 0).attr('x', 0).attr('class', "donutMain").attr('fill', this.props.theme.normal);
        label.insert('tspan').text(this.props.unit).attr('dy', 20).attr('x', 0).attr('class', "donutMinor").attr('fill', this.props.theme.normal);
      } else {
        label.insert('tspan').text(count).attr('dy', 0).attr('x', 0).attr('class', "donutMain").attr('fill', this.props.theme.normal);
        label.insert('tspan').text("Total").attr('dy', -25).attr('x', 0).attr('class', "donutMinor").attr('fill', '#899399');
        label.insert('tspan').text(this.props.unit).attr('dy', 45).attr('x', 0).attr('class', "donutMinor").attr('fill', this.props.theme.normal);
      }
    }
  },

  focus: function focus(id) {
    if (this.graph) {
      this.graph.focus(id);
    }
  },

  click: function click(id) {
    if (this.graph) {
      this.graph.click(id);
    }
  },

  revert: function revert(id) {
    if (this.graph) {
      this.graph.revert();
      this.setTitle();
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      var self = this;

      this.graph.load({
        columns: self.props.data
      });

      this.graph.data.names(this.props.names);

      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      this.setTitle();
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var self = this;
    // do not repaint for user interaction, otherwise the animation won't work
    if (nextProps.focus || nextProps.label) {
      if (nextProps.focus) {
        this.focussed = true;
        this.focus(nextProps.focus);
      }
      if (nextProps.label) {
        this.focussed = true;
        self.setTitle(nextProps.label);
      }
      return false;
    } else if (this.focussed) {
      this.focussed = false;
      this.revert();
      return false;
    } else {
      return true;
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.updateGraph();
    this.checkIfPropsChanged(prevProps, this.props);
  },

  checkIfPropsChanged: function checkIfPropsChanged(a, b) {
    // Check if we have to remove an item. This fails in some situations if we use the normal
    // unload method. Therefore we just redraw the whole thing.
    var currentData = this.graph.data();
    for (var i in currentData) {
      var item = currentData[i];
      var found = false;
      for (var t in this.props.data) {
        var dataItem = this.props.data[t];
        if (dataItem[0] == item.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.createGraph();
        return;
      }
    }

    if (JSON.stringify(a.theme) != JSON.stringify(b.theme) || a.unit != b.unit || a.precision != b.precision || a.width != b.width || a.height != b.height) {
      this.createGraph();
    }
  },

  render: function render() {
    if (!this.id) {
      this.id = "X" + Math.round(Math.random() * 1000000);
    }
    var style = Object.assign({}, styles.container, { width: this.props.width + "px", height: this.props.height + "px" }, this.props.style ? this.props.style : {});
    return React.createElement('div', { id: this.id, style: style });
  }
});

module.exports = DonutChart;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js","./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Dropdown.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var Option = require('./Option.jsx');
var Portal = require('./Portal.jsx');

var styles = {
	containerStyle: {},
	dropboxWrapper: {
		position: "absolute"
	},
	dropboxContainer: {
		minWidth: "160px",
		position: "fixed"
	}
};

var Dropdown = React.createClass({
	displayName: 'Dropdown',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	getDefaultProps: function getDefaultProps() {
		return {
			topCorrection: 0,
			leftCorrection: 0
		};
	},

	getInitialState: function getInitialState() {
		return {
			isOpen: false,
			left: "0px",
			top: "0px"
		};
	},

	componentDidMount: function componentDidMount() {
		document.addEventListener('click', this.handleClickOutside, true);
		console.log($(ReactDOM.findDOMNode(this.refs.trigger).children[0]));
		var nodeOffsetPos = $(ReactDOM.findDOMNode(this.refs.trigger).children[0]).offset();
		var nodeOffsetDim = $(ReactDOM.findDOMNode(this.refs.trigger).children[0])[0].offsetHeight;
		this.setState({ left: nodeOffsetPos.left + "px", top: nodeOffsetPos.top + nodeOffsetDim - $(window).scrollTop() + "px" });
	},

	componentWillUnmount: function componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside, true);
	},

	handleClickOutside: function handleClickOutside(e) {
		this.setState({ isOpen: false });
	},

	onClick: function onClick(event) {
		this.setState({ isOpen: !this.state.isOpen });
	},

	render: function render() {
		var self = this;
		var containerStyle = Object.assign({}, styles.containerStyle, this.props.style);
		styles.dropboxWrapper.left = this.state.left;
		styles.dropboxWrapper.top = this.state.top;

		styles.dropboxWrapper.fontFamily = this.props.theme.font;

		var lastIndex = Array.isArray(this.props.children) ? this.props.children.length - 1 : null;
		var options = React.createElement(
			Portal,
			null,
			React.createElement(
				'div',
				{ style: styles.dropboxWrapper },
				React.createElement(
					'div',
					{ style: styles.dropboxContainer },
					this.state.isOpen ? React.Children.map(this.props.children, function (child, idx) {
						if (idx !== 0) {
							var currProps = {};
							if (lastIndex && lastIndex == idx) {
								currProps = { onSelect: self.props.onSelect ? self.props.onSelect : function () {}, lastChild: true, firstChild: false };
							} else if (idx == 1) {
								currProps = { onSelect: self.props.onSelect ? self.props.onSelect : function () {}, lastChild: false, firstChild: true };
							} else {
								currProps = { onSelect: self.props.onSelect ? self.props.onSelect : function () {}, lastChild: false, firstChild: false };
							}
							var newChild = React.cloneElement(child, currProps);
							return newChild;
						} else {
							return null;
						}
					}) : null
				)
			)
		);
		return React.createElement(
			'div',
			{ style: containerStyle },
			React.createElement(
				'div',
				{ style: containerStyle, ref: 'trigger', onClick: this.onClick },
				this.props.children[0] || this.props.children
			),
			this.state.isOpen ? options : null
		);
	}
});

module.exports = Dropdown;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Option.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Option.jsx","./Portal.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Portal.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/GalleryAccordion.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {

  container: {
    marginBottom: '15px',
    boxSizing: 'border-box',
    clear: 'both',
    cursor: 'pointer'
  },
  canvas: {
    MozTransition: 'all 0.25s ease',
    WebkitTransition: 'all 0.25s ease',
    OTransition: 'all 0.25s ease',
    transition: 'all 0.25s ease',
    height: '131px',
    overflow: 'hidden'
  },
  title: {
    height: '24px',
    padding: '5px 0px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px'
  },
  icon: {
    float: 'right'
  },
  toggleCtrlContainer: {
    clear: 'both',
    float: 'right',
    marginRight: '20px'
  }

};

var ITEMS_PER_ROW = 3;

var GalleryAccordion = React.createClass({
  displayName: 'GalleryAccordion',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    id: RPT.string,
    label: RPT.string,
    onRemove: RPT.func,
    onExpand: RPT.func,
    expanded: RPT.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: ''
    };
  },

  getInitialState: function getInitialState() {
    var expandedStatus = false;
    for (var i = 0; i < this.props.children.length; i++) {
      if (this.props.selected === this.props.children[i].props.item.name && i >= ITEMS_PER_ROW) {
        expandedStatus = true;
      }
    }
    return {
      expanded: this.props.expanded || expandedStatus ? true : false
    };
  },

  componentWillMount: function componentWillMount() {
    for (var i = 0; i < this.props.children.length; i++) {
      if (this.props.selected === this.props.children[i].props.item.name && i >= ITEMS_PER_ROW) {
        this.setState({ expanded: true });
      }
    }
  },
  componentDidMount: function componentDidMount() {
    this.componentDidUpdate();
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.expanded) {
      $(this.refs.cardCanvas).css('height', $(this.refs.cardCanvas)[0].scrollHeight);
    } else {
      $(this.refs.cardCanvas).css('height', '130px');
    }
  },
  componentDidReceiveProps: function componentDidReceiveProps() {
    this.setState({
      selected: this.props.selected
    });
  },

  onRemove: function onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
    return false;
  },

  onToggle: function onToggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function render() {
    var self = this;
    var canvas = '';
    var toggleCtrl = '';
    var childCount = ITEMS_PER_ROW;
    if (this.state.expanded) {
      canvas = this.props.children;
      toggleCtrl = React.createElement(
        'div',
        { style: styles.toggleCtrlContainer },
        React.createElement(
          'a',
          { onClick: self.onToggle, href: 'javascript:void(0)' },
          'Show less'
        )
      );
    } else {
      var i = 0;
      canvas = this.props.children.filter(function (child) {
        if (i < childCount) {
          i++;
          return true;
        } else {
          i++;
          toggleCtrl = React.createElement(
            'div',
            { style: styles.toggleCtrlContainer },
            React.createElement(
              'a',
              { onClick: self.onToggle, href: 'javascript:void(0)' },
              'Show more'
            )
          );
          return false;
        }
      });
    }

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'div',
        { style: styles.title },
        this.props.label
      ),
      React.createElement(
        'div',
        { style: styles.canvas, ref: 'cardCanvas' },
        canvas
      ),
      toggleCtrl
    );
  }
});

module.exports = GalleryAccordion;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Gauge.jsx":[function(require,module,exports){
(function (global){
'use strict';

var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null);
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;

/**
* Flexible gauge.
*/
var styles = {
	container: {
		height: "100%",
		width: "100%",
		margin: "0 auto"
	}
};

var Gauge = React.createClass({
	displayName: 'Gauge',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		value: RPT.number,
		minDegree: RPT.number,
		maxDegree: RPT.number,
		min: RPT.number,
		max: RPT.number,
		precision: RPT.number,
		needle: RPT.bool,
		unit: RPT.string,
		label: RPT.number,
		width: RPT.number,
		height: RPT.number,
		lowerThresholdMeaning: RPT.string,
		middleThresholdMeaning: RPT.string,
		upperThresholdMeaning: RPT.string,
		lowerThreshold: RPT.number,
		upperThreshold: RPT.number
	},

	getDefaultProps: function getDefaultProps() {
		return {
			minDegree: 45,
			maxDegree: 315,
			min: 0,
			max: 100,
			needle: false
		};
	},

	componentDidMount: function componentDidMount() {
		// create for the first time
		this.createSVG();
	},

	createSVG: function createSVG() {
		this.destroySVG();

		var self = this;

		var dom = ReactDOM.findDOMNode(this);
		// var dom = document.createElement("div");
		// root.appendChild(dom);

		this.width = this.props.width ? this.props.width : container.offsetWidth;
		this.height = this.props.height ? this.props.height : container.offsetHeight;
		var pi = Math.PI * 2;
		var radius = Math.min(this.width, this.height) / 2;
		var startAngle = this.props.minDegree / 360 * pi - pi / 2;
		var endAngle = this.props.maxDegree / 360 * pi - pi / 2;

		var group = d3.select(dom).append('svg').attr('width', +this.width).attr('height', +this.height).attr('viewBox', '0 0 ' + this.width + ' ' + this.height).attr('preserveAspectRatio', 'xMinYMin meet').append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

		// the scale to show the full range
		var scaleArc = d3.svg.arc().innerRadius(radius - 40).outerRadius(radius - 25).startAngle(startAngle).endAngle(endAngle);

		var scale = group.append("path").attr("fill", this.props.theme.minor).attr("d", scaleArc);

		// the value segment
		this.valueSegment = group.append("path").datum({ endAngle: 0, startAngle: 0 }).attr("fill", this.props.theme.normal);

		// the textual value
		this.label = group.append("svg:text").attr("dy", "-10px").attr("text-anchor", "middle").attr("font-size", "40px").attr("font-weight", "200").attr("fill", this.props.theme.normal);

		// the unit indicator
		if (this.props.unit) {
			var unit = group.append("svg:text").attr("dy", "20px").attr("text-anchor", "middle").attr("font-size", "16px").attr("font-weight", "200").attr("fill", this.props.theme.minor).text(this.props.unit);
		}

		// threshold indicator
		var tickSteps = (this.props.maxDegree - this.props.minDegree) / 100;
		var range = this.props.max - this.props.min;

		for (var i = 0; i <= 100; i++) {
			var line = group.append("svg:line").attr("x1", this.width / 2 - 20).attr("x2", this.width / 2 - 10).attr("y1", 0).attr("y2", 0).attr("stroke-width", "2");

			if (this.props.lowerThresholdMeaning && this.props.lowerThresholdMeaning != "NONE" && i <= (this.props.lowerThreshold - this.props.min) / range * 100) {
				line.attr("stroke", this.props.theme[this.props.lowerThresholdMeaning]);
			} else if (this.props.middleThresholdMeaning && this.props.middleThresholdMeaning != "NONE" && i > (this.props.lowerThreshold - this.props.min) / range * 100 && i < (this.props.upperThreshold - this.props.min) / range * 100) {
				line.attr("stroke", this.props.theme[this.props.middleThresholdMeaning]);
			} else if (this.props.upperThresholdMeaning && this.props.upperThresholdMeaning != "NONE" && i >= (this.props.upperThreshold - this.props.min) / range * 100) {
				line.attr("stroke", this.props.theme[this.props.upperThresholdMeaning]);
			} else {
				line.attr("stroke", this.props.theme.minor);
			}

			line.attr("transform", "rotate(" + (this.props.minDegree + tickSteps * i + 90) + ")");
		}

		this.updateSVG();
	},

	destroySVG: function destroySVG() {
		var dom = ReactDOM.findDOMNode(this);
		var children = dom.childNodes;
		for (var i in children) {
			var child = children[i];
			if (child.tagName === 'svg') {
				dom.removeChild(child);
				break;
			}
		}
	},

	updateSVG: function updateSVG() {
		// handle precision
		var value = this.props.value ? this.props.value : 0;

		if (this.props.precision !== undefined) {
			value = value.toFixed(this.props.precision);
		}
		var pi = Math.PI * 2;

		var radius = Math.min(this.width, this.height) / 2;
		var startAngle = this.props.minDegree / 360 * pi - pi / 2;
		var endAngle = this.props.maxDegree / 360 * pi - pi / 2;
		var val = (value - this.props.min) / (this.props.max - this.props.min);
		val = val * (endAngle - startAngle) + startAngle;
		val = Math.min(val, endAngle);
		val = Math.max(val, startAngle);

		var arc, arcTween;

		this.label.text(value);

		if (this.props.needle) {
			// show only a simple tick
			arc = d3.svg.arc().innerRadius(radius - 50).outerRadius(radius - 25);

			arcTween = function arcTween(transition, newAngle) {
				transition.attrTween("d", function (d) {
					if (d) {
						var interpolate = d3.interpolate(d.endAngle, newAngle);
						return function (t) {
							var val = interpolate(t);
							d.endAngle = val;
							d.startAngle = val - 0.05;
							return arc(d);
						};
					}
				});
			};
		} else {
			// show the full segment
			arc = d3.svg.arc().innerRadius(radius - 40).outerRadius(radius - 25).startAngle(startAngle);

			arcTween = function arcTween(transition, newAngle) {
				transition.attrTween("d", function (d) {
					if (d) {
						var interpolate = d3.interpolate(d.endAngle, newAngle);
						return function (t) {
							d.endAngle = interpolate(t);
							return arc(d);
						};
					}
				});
			};
		}

		this.valueSegment.transition().duration(750).call(arcTween, val);
	},

	componentWillUnmount: function componentWillUnmount() {
		this.destroySVG();
	},

	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		this.updateSVG();
		this.checkIfPropsChanged(prevProps, this.props);
	},

	checkIfPropsChanged: function checkIfPropsChanged(a, b) {
		if (JSON.stringify(a.theme) != JSON.stringify(b.theme) || a.min != b.min || a.max != b.max || a.unit != b.unit || a.lowerThresholdMeaning != b.lowerThresholdMeaning || a.middleThresholdMeaning != b.middleThresholdMeaning || a.upperThresholdMeaning != b.upperThresholdMeaning || a.lowerThreshold != b.lowerThreshold || a.upperThreshold != b.upperThreshold || a.unit != b.unit || a.min != b.min || a.max != b.max || a.precision != b.precision || a.width != b.width || a.height != b.height) {
			this.createSVG();
		}
	},

	render: function render() {
		var style = Object.assign({}, styles.container, { width: this.props.width + "px", height: this.props.height + "px" }, this.props.style ? this.props.style : {});
		return React.createElement('div', { style: style });
	}
});

module.exports = Gauge;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
  icon: {
    verticalAlign: "middle",
    cursor: "pointer"
  }
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Icon-component
//

var Icon = React.createClass({
  displayName: "Icon",

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    icon: RPT.string.isRequired,
    color: RPT.string,
    size: RPT.number,
    onClick: RPT.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 24,
      onClick: function onClick() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      viewportCorrection: this.getViewportCorrection()
    };
  },

  getViewportCorrection: function getViewportCorrection() {
    switch (this.props.icon) {
      case 'delete':
        // trashicon from design team
        return { x: -3 };
      case 'fullscreen':
        // fullscreen icon from design team
        return { y: -2 };
      case 'refresh':
        // fullscreen icon from design team
        return { x: -4 };
      case 'bar-chart':
        return { y: -1, width: 19, height: 19 };
      case 'traffic-consumption':
        return { y: -1, width: 19, height: 19 };
      case 'device-types':
        return { y: -0.75, width: 21, height: 21 };
      case 'elevator':
        return { y: -5 };
      case 'horizontal-seperator':
        return { y: -9 };
      case 'line-chart':
        return { y: -5 };
      case 'line-graph2':
        return { width: 28, height: 15 };
      case 'pie-chart':
        return { width: 21, height: 21 };
      case 'text-based':
        return { x: 0, y: 0, width: 16, height: 16 };
      //case 'gauge':
      //    return {x:5, y:5};
      case 'weatherService':
        return { y: -3, width: 26, height: 26 };
    }
  },

  renderGraphic: function renderGraphic() {
    // see list of icons: http://dmfrancisco.github.io/react-icons/
    switch (this.props.icon) {
      case 'line-graph':
        return React.createElement(
          "g",
          { id: "Page-1-Copy" },
          React.createElement("path", { d: "M12.94,18 L17.939,18 L17.939,11.118 L12.94,11.118 L12.94,18 Z M13.94,12.118 L16.94,12.118 L16.94,17.001 L13.94,17.001 L13.94,12.118 Z", id: "Fill-1" }),
          React.createElement("path", { d: "M6.47,18 L11.469,18 L11.469,17 L6.47,17 L6.47,18 Z", id: "Fill-2" }),
          React.createElement("path", { d: "M6.47,15.686 L11.469,15.686 L11.469,14.686 L6.47,14.686 L6.47,15.686 Z", id: "Fill-3" }),
          React.createElement("path", { d: "M6.47,13.372 L11.469,13.372 L11.469,12.372 L6.47,12.372 L6.47,13.372 Z", id: "Fill-4" }),
          React.createElement("path", { d: "M6.47,11.058 L11.469,11.058 L11.469,10.058 L6.47,10.058 L6.47,11.058 Z", id: "Fill-5" }),
          React.createElement("path", { d: "M6.47,8.744 L11.469,8.744 L11.469,7.743 L6.47,7.743 L6.47,8.744 Z", id: "Fill-6" }),
          React.createElement("path", { d: "M0,18 L5,18 L5,0.069 L0,0.069 L0,18 Z", id: "Fill-7" })
        );
      case 'gauge':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-9", transform: "translate(3.000000, 3.000000)" },
            React.createElement("path", { d: "M2.4863,13.0507 C-0.4697,10.0947 -0.4697,5.3017 2.4863,2.3457 C5.4423,-0.6103 10.2353,-0.6103 13.1913,2.3457 C16.1473,5.3017 16.1473,10.0947 13.1913,13.0507", id: "Stroke-76", stroke: "#3C3C3B", strokeWidth: "5" }),
            React.createElement("path", { d: "M7.8388,18.0507 C9.2198,18.0507 10.3388,16.9317 10.3388,15.5507 C10.3388,14.1697 9.2198,13.0507 7.8388,13.0507 C6.4578,13.0507 5.3388,14.1697 5.3388,15.5507 C5.3388,16.9317 6.4578,18.0507 7.8388,18.0507", id: "Fill-78", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M7.8388,15.5507 L7.8388,6.5897", id: "Stroke-80", stroke: "#3C3C3B" })
          )
        );
      case 'bar-chart':
        return React.createElement(
          "g",
          { id: "Group-7", transform: "translate(2.000000, 0.000000)" },
          React.createElement("path", { d: "M0.9889,0.0854 L0.9889,17.9264", id: "Stroke-63", stroke: "#3C3C3B", strokeWidth: "5" }),
          React.createElement("path", { d: "M16.339,12.661 L11.339,12.661 L11.339,17.926 L16.339,17.926 L16.339,12.661 Z M15.339,16.926 L12.339,16.926 L12.339,13.661 L15.339,13.661 L15.339,16.926 Z", id: "Fill-64", fill: "#3C3C3B" }),
          React.createElement("path", { d: "M7.3215,17.9264 L7.3215,16.9114", id: "Stroke-65", stroke: "#3C3C3B", strokeWidth: "5" }),
          React.createElement("path", { d: "M7.3215,15.8014 L7.3215,14.7864", id: "Stroke-66", stroke: "#3C3C3B", strokeWidth: "5" }),
          React.createElement("path", { d: "M7.3215,13.6764 L7.3215,12.6614", id: "Stroke-67", stroke: "#3C3C3B", strokeWidth: "5" }),
          React.createElement("path", { d: "M7.3215,11.5514 L7.3215,10.5364", id: "Stroke-68", stroke: "#3C3C3B", strokeWidth: "5" }),
          React.createElement("path", { d: "M7.3215,9.4264 L7.3215,8.4114", id: "Stroke-69", stroke: "#3C3C3B", strokeWidth: "5" })
        );
      case 'connected-devices':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-3" },
            React.createElement("path", { d: "M12.5798,15.8594 C13.9608,15.8594 15.0798,14.7404 15.0798,13.3594 C15.0798,11.9784 13.9608,10.8594 12.5798,10.8594 C11.1988,10.8594 10.0798,11.9784 10.0798,13.3594 C10.0798,14.7404 11.1988,15.8594 12.5798,15.8594", id: "Fill-20", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M12.5801,17.8594 C10.0991,17.8594 8.0801,15.8404 8.0801,13.3594 C8.0801,10.8784 10.0991,8.8594 12.5801,8.8594 C15.0611,8.8594 17.0801,10.8784 17.0801,13.3594 C17.0801,15.8404 15.0611,17.8594 12.5801,17.8594 L12.5801,17.8594 Z", id: "Stroke-21", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M20.0798,5.8594 C21.4608,5.8594 22.5798,4.7404 22.5798,3.3594 C22.5798,1.9784 21.4608,0.8594 20.0798,0.8594 C18.6988,0.8594 17.5798,1.9784 17.5798,3.3594 C17.5798,4.7404 18.6988,5.8594 20.0798,5.8594", id: "Fill-22", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.5798,10.8594 C3.9608,10.8594 5.0798,9.7404 5.0798,8.3594 C5.0798,6.9784 3.9608,5.8594 2.5798,5.8594 C1.1988,5.8594 0.0798,6.9784 0.0798,8.3594 C0.0798,9.7404 1.1988,10.8594 2.5798,10.8594", id: "Fill-23", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.1246,8.3594 L8.5076,11.4384", id: "Stroke-24", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M20.0798,3.3594 L15.3188,9.8994", id: "Stroke-25", stroke: "#3C3C3B" })
          )
        );
      case 'device-types':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-2", transform: "translate(0.000000, 1.000000)" },
            React.createElement("path", { d: "M18.988,18.976 L0.5,18.976 L0.5,0.488 L18.988,0.488 L18.988,18.976 Z", id: "Stroke-13", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M2.3746,2.2473 L3.6136,2.2473", id: "Stroke-15", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M4.1246,2.2473 L5.3636,2.2473", id: "Stroke-16", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M15.8746,2.2473 L17.1136,2.2473", id: "Stroke-17", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M14.7683,9.9819 C14.7683,12.7569 12.5193,15.0059 9.7443,15.0059 C6.9693,15.0059 4.7203,12.7569 4.7203,9.9819 C4.7203,7.2069 6.9693,4.9579 9.7443,4.9579 C12.5193,4.9579 14.7683,7.2069 14.7683,9.9819", id: "Fill-18", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M6.3668,9.9819 C6.3668,8.1169 7.8788,6.6039 9.7438,6.6039", id: "Stroke-19", stroke: "#FFFFFF" })
          )
        );
      case 'horizontal-seperator':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement("path", { d: "M0.2509,3.3819 L21.1429,3.3819", id: "Stroke-58", stroke: "#3C3C3B", strokeWidth: "5" })
        );
      case 'line-chart':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-6" },
            React.createElement("path", { d: "M8.5723,14.9209 C9.9533,14.9209 11.0723,13.8019 11.0723,12.4209 C11.0723,11.0399 9.9533,9.9209 8.5723,9.9209 C7.1913,9.9209 6.0723,11.0399 6.0723,12.4209 C6.0723,13.8019 7.1913,14.9209 8.5723,14.9209", id: "Fill-26", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M15.0627,5.5368 C16.4437,5.5368 17.5627,4.4178 17.5627,3.0368 C17.5627,1.6558 16.4437,0.5368 15.0627,0.5368 C13.6817,0.5368 12.5627,1.6558 12.5627,3.0368 C12.5627,4.4178 13.6817,5.5368 15.0627,5.5368", id: "Fill-27", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M20.936,10.6948 C22.317,10.6948 23.436,9.5758 23.436,8.1948 C23.436,6.8138 22.317,5.6948 20.936,5.6948 C19.555,5.6948 18.436,6.8138 18.436,8.1948 C18.436,9.5758 19.555,10.6948 20.936,10.6948", id: "Fill-28", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.6535,7.2864 C4.0345,7.2864 5.1535,6.1674 5.1535,4.7864 C5.1535,3.4054 4.0345,2.2864 2.6535,2.2864 C1.2725,2.2864 0.1535,3.4054 0.1535,4.7864 C0.1535,6.1674 1.2725,7.2864 2.6535,7.2864", id: "Fill-29", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.6535,4.7864 L8.5725,12.4204 L15.0625,3.0724 L20.9365,8.1944", id: "Stroke-30", stroke: "#3C3C3B" })
          )
        );
      case 'overview':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group", stroke: "#3C3C3B" },
            React.createElement("path", { d: "M13.3303,13.0401 C10.5043,15.8661 5.9223,15.8661 3.0953,13.0401 C0.2693,10.2141 0.2693,5.6321 3.0953,2.8051 C5.9223,-0.0209 10.5043,-0.0209 13.3303,2.8051 C16.1563,5.6321 16.1563,10.2141 13.3303,13.0401 L13.3303,13.0401 Z", id: "Stroke-59" }),
            React.createElement("path", { d: "M3.0956,13.0401 L13.3306,2.8051", id: "Stroke-60" }),
            React.createElement("path", { d: "M3.0956,2.8055 L13.3306,13.0405", id: "Stroke-61" }),
            React.createElement("path", { d: "M10.8447,10.5545 C8.0187,13.3805 4.5487,14.4935 3.0957,13.0405 C1.6417,11.5865 2.7547,8.1175 5.5807,5.2905 C8.4077,2.4645 11.8767,1.3515 13.3307,2.8055 C14.7837,4.2585 13.6707,7.7285 10.8447,10.5545 L10.8447,10.5545 Z", id: "Stroke-62" })
          )
        );
      case 'pie-chart':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-8", transform: "translate(0.000000, -2.000000)" },
            React.createElement("path", { d: "M10.7812,4.6677 C14.9622,4.6677 18.3512,8.0567 18.3512,12.2377 C18.3512,16.4177 14.9622,19.8067 10.7812,19.8067 C6.6002,19.8067 3.2112,16.4177 3.2112,12.2377", id: "Stroke-70", stroke: "#3C3C3B", strokeWidth: "5" }),
            React.createElement("path", { d: "M9.5314,0.5909 L9.5314,9.7879", id: "Fill-71", fill: "#3C3C3B" }),
            React.createElement(
              "g",
              { id: "Group-75", transform: "translate(0.000000, 1.000000)" },
              React.createElement(
                "mask",
                { id: "mask-2", fill: "white" },
                React.createElement("use", { href: "#path-1" })
              ),
              React.createElement("g", { id: "Clip-74" }),
              React.createElement("path", { d: "M3.2116,11.2372 C3.2116,7.0562 6.6006,3.6672 10.7816,3.6672", id: "Stroke-73", stroke: "#3C3C3B", strokeWidth: "5", mask: "url(#mask-2)" })
            )
          )
        );
      case 'line-graph2':
        return React.createElement(
          "g",
          { id: "Group" },
          React.createElement("path", { d: "M19.6049314,1 L8.39641356,12.2071729 L3.58565424,7.39641356 L2,7.98206781 L8.39641356,14.3771365 L19.6049314,3.16996358 L24.4156907,7.98206781 L26.0013449,7.39641356 L19.6049314,1 Z", id: "Page-1" }),
          React.createElement("circle", { id: "Oval-10-Copy", cx: "8.5", cy: "12.5", r: "2.5" }),
          React.createElement("circle", { id: "Oval-10-Copy-2", cx: "19.5", cy: "2.5", r: "2.5" }),
          React.createElement("circle", { id: "Oval-10-Copy-3", cx: "25.5", cy: "7.5", r: "2.5" }),
          React.createElement("circle", { id: "Oval-10", cx: "2.5", cy: "7.5", r: "2.5" })
        );
      case 'storage-consumption':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-4" },
            React.createElement("path", { d: "M18.08,5.107 L0.744,5.107 L0.744,0.107 L18.08,0.107 L18.08,5.107 Z", id: "Fill-31", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.0424,2.6068 L3.2814,2.6068", id: "Stroke-32", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M3.7924,2.6068 L5.0314,2.6068", id: "Stroke-33", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M15.5424,2.6068 L16.7814,2.6068", id: "Stroke-34", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M18.08,9.197 L0.744,9.197 L0.744,6.197 L18.08,6.197 L18.08,9.197 Z", id: "Fill-35", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.0424,7.697 L3.2814,7.697", id: "Stroke-36", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M3.7924,7.697 L5.0314,7.697", id: "Stroke-37", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M15.5424,7.697 L16.7814,7.697", id: "Stroke-38", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M18.08,15.287 L0.744,15.287 L0.744,10.287 L18.08,10.287 L18.08,15.287 Z", id: "Fill-39", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M2.0424,12.7873 L3.2814,12.7873", id: "Stroke-40", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M3.7924,12.7873 L5.0314,12.7873", id: "Stroke-41", stroke: "#FFFFFF" }),
            React.createElement("path", { d: "M15.5424,12.7873 L16.7814,12.7873", id: "Stroke-42", stroke: "#FFFFFF" })
          )
        );
      case 'text-based':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", "fill-rule": "evenodd" },
          React.createElement("path", { d: "M10.2511681,9.97622275 L7.7465479,4.01586084 L5.27363179,9.97622275 L10.2511681,9.97622275 Z M0.909040527,15.535 L0.909040527,15.1439833 C1.46562557,15.0805749 1.88305809,14.8692167 2.16135061,14.5099023 C2.43964313,14.1505879 2.91696049,13.1748174 3.59331699,11.5825614 L8.1058605,0.96170376 L8.5285812,0.96170376 L13.9182702,13.2311722 C14.2775846,14.0484363 14.5646795,14.5539347 14.7795636,14.7476827 C14.9944477,14.9414306 15.355518,15.0735295 15.8627854,15.1439833 L15.8627854,15.535 L10.3568482,15.535 L10.3568482,15.1439833 C10.9909325,15.0876203 11.3995584,15.0189289 11.5827383,14.937907 C11.7659182,14.8568851 11.8575067,14.6578561 11.8575067,14.340814 C11.8575067,14.2351333 11.8222804,14.0484335 11.7518266,13.7807091 C11.6813728,13.5129846 11.5827389,13.2311736 11.4559221,12.9352677 L10.5576406,10.8533682 L4.89318315,10.8533682 C4.32955273,12.2694896 3.99314087,13.1342971 3.88393748,13.4478165 C3.77473408,13.761336 3.7201332,14.0096819 3.7201332,14.1928618 C3.7201332,14.5592215 3.86808397,14.8128514 4.16398994,14.953759 C4.34716983,15.0383036 4.69238828,15.1017111 5.19965566,15.1439833 L5.19965566,15.535 L0.909040527,15.535 Z", id: "A" })
        );
      case 'traffic-consumption':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-5", transform: "translate(0.000000, 1.000000)" },
            React.createElement("path", { d: "M0.6431,4.3771 L5.8771,4.3771", id: "Stroke-43", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M17.5295,4.1658 L17.8035,4.4398 L14.8365,7.4068", id: "Stroke-44", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M14.8365,1.4728 L17.5295,4.1658", id: "Stroke-45", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M5.7998,10.0021 L1.7398,10.0021", id: "Stroke-46", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M4.2269,12.9064 L1.2599,9.9394 L4.2269,6.9724", id: "Stroke-47", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M18.5091,10.0021 L8.7401,10.0021", id: "Stroke-48", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M8.8832,11.9352 C8.5252,10.6882 8.3002,8.9172 8.3002,6.9462 C8.3002,4.9752 8.5252,3.2042 8.8832,1.9572", id: "Stroke-49", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M7.6331,0.1129 C6.6201,0.1129 5.8001,3.1719 5.8001,6.9459 C5.8001,10.7199 6.6201,13.7799 7.6331,13.7799", id: "Stroke-50", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M8.8832,11.9352 C9.2112,13.0762 9.6492,13.7792 10.1332,13.7792 C11.1452,13.7792 11.9662,10.7202 11.9662,6.9462 C11.9662,3.1722 11.1452,0.1132 10.1332,0.1132 C9.6492,0.1132 9.2112,0.8162 8.8832,1.9572", id: "Stroke-51", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M8.8832,1.9573 C8.5252,3.2043 8.3002,4.9753 8.3002,6.9463 C8.3002,8.9173 8.5252,10.6883 8.8832,11.9353", id: "Stroke-52", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M10.1331,0.1129 L7.6331,0.1129", id: "Stroke-53", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M10.1331,13.7796 L7.6331,13.7796", id: "Stroke-54", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M8.6431,4.3771 L17.8031,4.4391", id: "Stroke-55", stroke: "#3C3C3B" }),
            React.createElement("path", { d: "M8.6939,11.6981 C8.6609,11.6841 8.6269,11.6701 8.5939,11.6561 C8.5899,11.6631 8.5859,11.6701 8.5819,11.6771 C8.6239,11.6791 8.6529,11.6941 8.6939,11.6981", id: "Fill-56", fill: "#3C3C3B" }),
            React.createElement("path", { d: "M8.7032,12.0734 L8.7032,12.0734 C8.1662,10.7214 7.8712,8.9004 7.8712,6.9464 C7.8712,4.9924 8.1662,3.1714 8.7032,1.8194 L8.7032,1.8194 C9.0092,1.0464 9.3792,0.4804 9.8072,0.1134 L7.6402,0.1134 L7.6402,0.3034 L7.6402,0.6134 C7.1062,0.6134 5.8002,2.8324 5.8002,6.9464 C5.8002,11.0604 7.1062,13.2794 7.6402,13.2794 L7.6402,13.4864 L7.6402,13.7794 L9.8072,13.7794 C9.3792,13.4124 9.0092,12.8464 8.7032,12.0734", id: "Fill-57", fill: "#3C3C3B" })
          )
        );
      case 'Usage':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M19.35 10.04c-.68-3.45-3.71-6.04-7.35-6.04-2.89 0-5.4 1.64-6.65 4.04-3.01.32-5.35 2.87-5.35 5.96 0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zm-.35 7.96h-13c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71c.66-2.31 2.77-4 5.29-4 3.04 0 5.5 2.46 5.5 5.5v.5h1.5c1.66 0 3 1.34 3 3s-1.34 3-3 3z" })
        );
      case 'Alert':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M14.4 6l-.4-2h-9v17h2v-7h5.6l.4 2h7v-10z" })
        );
      case 'Basic':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M19.35 10.04c-.68-3.45-3.71-6.04-7.35-6.04-2.89 0-5.4 1.64-6.65 4.04-3.01.32-5.35 2.87-5.35 5.96 0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zm-.35 7.96h-13c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71c.66-2.31 2.77-4 5.29-4 3.04 0 5.5 2.46 5.5 5.5v.5h1.5c1.66 0 3 1.34 3 3s-1.34 3-3 3z" })
        );
      case 'Alert':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M14.4 6l-.4-2h-9v17h2v-7h5.6l.4 2h7v-10z" })
        );
      case 'Devices':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M15 9h-6v6h6v-6zm-2 4h-2v-2h2v2zm8-2v-2h-2v-2c0-1.1-.9-2-2-2h-2v-2h-2v2h-2v-2h-2v2h-2c-1.1 0-2 .9-2 2v2h-2v2h2v2h-2v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6h-10v-10h10v10z" })
        );
      case 'Sample':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M11.99 2c-5.52 0-9.99 4.48-9.99 10s4.47 10 9.99 10c5.53 0 10.01-4.48 10.01-10s-4.48-10-10.01-10zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5h-10.22c.8 2.04 2.78 3.5 5.11 3.5z" })
        );
      case 'Custom':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M20.5 11h-1.5v-4c0-1.1-.9-2-2-2h-4v-1.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5v1.5h-4c-1.1 0-1.99.9-1.99 2v3.8h1.49c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7h-1.5v3.8c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7v1.5h3.8c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z" })
        );
      case 'Test':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M14.4 6l-.4-2h-9v17h2v-7h5.6l.4 2h7v-10z" })
        );
      case 'camera':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9.4 10.5l4.77-8.26c-.7-.15-1.42-.24-2.17-.24-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zm12.14-1.5c-.92-2.92-3.15-5.26-6-6.34l-3.66 6.34h9.66zm.26 1h-7.49l.29.5 4.76 8.25c1.64-1.78 2.64-4.14 2.64-6.75 0-.69-.07-1.35-.2-2zm-13.26 2l-3.9-6.75c-1.63 1.78-2.64 4.14-2.64 6.75 0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34l3.66-6.34h-9.66zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z" })
        );
      case 'map':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M20.5 3l-.16.03-5.34 2.07-6-2.1-5.64 1.9c-.21.07-.36.25-.36.48v15.12c0 .28.22.5.5.5l.16-.03 5.34-2.07 6 2.1 5.64-1.9c.21-.07.36-.25.36-.48v-15.12c0-.28-.22-.5-.5-.5zm-5.5 16l-6-2.11v-11.89l6 2.11v11.89z" })
        );
      case 'CRITICAL':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm5 13.59l-1.41 1.41-3.59-3.59-3.59 3.59-1.41-1.41 3.59-3.59-3.59-3.59 1.41-1.41 3.59 3.59 3.59-3.59 1.41 1.41-3.59 3.59 3.59 3.59z" })
        );
      case 'GOOD':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" })
        );
      case 'FAIR':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" })
        );
      case 'radio-button-on':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" })
        );
      case 'check':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" })
        );
      case 'search':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" })
        );
      case 'dots':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
        );
      case 'arrow-drop-up':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7 14l5-5 5 5z" })
        );
      case 'arrow-drop-down':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7 10l5 5 5-5z" })
        );
      case 'check':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" })
        );
      case 'more-vert':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
        );
      case 'delete':
        // trashicon from design team
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M4.46428571,1.5 L10.4166667,1.5 L10.4166667,0 L4.46428571,0 L4.46428571,1.5 Z M0,2.24985 L0,5.99985 L0.744047619,5.99985 L0.744047619,20.99985 L14.1369048,20.99985 L14.1369048,5.99985 L14.8809524,5.99985 L14.8809524,2.24985 L0,2.24985 Z M2.23214286,7.49985 L12.6488095,7.49985 L12.6488095,19.49985 L2.23214286,19.49985 L2.23214286,7.49985 Z M3.7202381,18 L4.46428571,18 L4.46428571,8.99925 L3.7202381,8.99925 L3.7202381,18 Z M5.95238095,18 L6.69642857,18 L6.69642857,8.99925 L5.95238095,8.99925 L5.95238095,18 Z M8.18452381,18 L8.92857143,18 L8.92857143,8.99925 L8.18452381,8.99925 L8.18452381,18 Z M10.4166667,18 L11.1607143,18 L11.1607143,8.99925 L10.4166667,8.99925 L10.4166667,18 Z" })
        );
      case 'fullscreen-exit':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M5 16h3v3h2v-5h-5v2zm3-8h-3v2h5v-5h-2v3zm6 11h2v-3h3v-2h-5v5zm2-11v-3h-2v5h5v-2h-3z" })
        );
      case 'highlight-remove':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M14.59 8l-2.59 2.59-2.59-2.59-1.41 1.41 2.59 2.59-2.59 2.59 1.41 1.41 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59-1.41-1.41zm-2.59-6c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        );
      case 'fullscreen':
        // fullscreen icon from design team
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M0,-0.0002375 L0,3.16722083 L0,18.9997625 L24,18.9997625 L24,-0.0002375 L0,-0.0002375 Z M1.6,4.7497625 L22.4,4.7497625 L22.4,17.4164292 L1.6,17.4164292 L1.6,4.7497625 Z M14.1656,14.0180417 L19.2,9.03608333 L19.2,12.6666667 L20.8,12.6666667 L20.8,6.33333333 L14.4,6.33333333 L14.4,7.91666667 L18.0688,7.91666667 L13.0344,12.898625 L14.1656,14.0180417 Z" })
        );
      case 'remove':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M19 13h-14v-2h14v2z" })
        );
      case 'undo':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6l-3.6-3.6v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78c-1.39-4.19-5.32-7.22-9.97-7.22z" })
        );
      case 'settings':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M11,14 C9.345,14 8,12.657 8,11 C8,9.343 9.345,8 11,8 C12.655,8 14,9.343 14,11 C14,12.657 12.655,14 11,14 M19.433,11 C19.433,10.549 19.388,10.11 19.319,9.678 L22,7.333 L19.723,3.595 L16.526,4.639 C15.762,3.975 14.877,3.449 13.909,3.092 L13.2,0 L8.8,0 L8.091,3.092 C7.123,3.449 6.238,3.975 5.474,4.64 L2.277,3.595 L0,7.333 L2.68,9.679 C2.612,10.11 2.567,10.549 2.567,11 C2.567,11.451 2.612,11.89 2.68,12.321 L0,14.667 L2.278,18.405 L5.474,17.36 C6.238,18.025 7.123,18.551 8.091,18.908 L8.8,22 L13.2,22 L13.909,18.908 C14.877,18.551 15.762,18.025 16.526,17.361 L19.722,18.405 L22,14.667 L19.319,12.322 C19.388,11.89 19.433,11.451 19.433,11" })
        );
      case 'add-circle-outline':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        );
      case 'save':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M17 3h-12c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-12l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10h-10v-4h10v4z" })
        );
      case 'restore':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M13 3c-4.97 0-9 4.03-9 9h-3l3.89 3.89.07.14 4.04-4.03h-3c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42c1.63 1.63 3.87 2.64 6.36 2.64 4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08v-4.25h-1.5z" })
        );
      case 'add-circle-outline':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        );
      case 'apps':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M4 8h4v-4h-4v4zm6 12h4v-4h-4v4zm-6 0h4v-4h-4v4zm0-6h4v-4h-4v4zm6 0h4v-4h-4v4zm6-10v4h4v-4h-4zm-6 4h4v-4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" })
        );
      case 'arrow-down':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" })
        );
      case 'arrow-up':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" })
        );
      case 'info':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M11 17h2v-6h-2v6zm1-15c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v-2h-2v2z" })
        );
      case 'apps':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M4 8h4v-4h-4v4zm6 12h4v-4h-4v4zm-6 0h4v-4h-4v4zm0-6h4v-4h-4v4zm6 0h4v-4h-4v4zm6-10v4h4v-4h-4zm-6 4h4v-4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" })
        );
      case 'dashboard':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M3 13h8v-10h-8v10zm0 8h8v-6h-8v6zm10 0h8v-10h-8v10zm0-18v6h8v-6h-8z" })
        );
      case 'grade':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81 6.63-7.19.61 5.46 4.73-1.64 7.03z" })
        );
      case 'lock':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M18 8h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9h-6.2v-2c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" })
        );
      case 'location':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })
        );
      case 'play-arrow':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M8 5v14l11-7z" })
        );
      case 'circle-filled':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" })
        );
      case 'sync':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 4v-3l-4 4 4 4v-3c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46c.78-1.23 1.24-2.69 1.24-4.26 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8l-1.46-1.46c-.78 1.23-1.24 2.69-1.24 4.26 0 4.42 3.58 8 8 8v3l4-4-4-4v3z" })
        );
      case 'refresh':
        // refresh icon from design team
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M8.88679436,20.5188676 C4.80331235,20.5188676 1.48113239,17.1966876 1.48113239,13.1132056 C1.48113239,9.02972363 4.80331235,5.70754368 8.88679436,5.70754368 L13.7641633,5.70754368 L10.5849126,8.88679436 L11.6320732,9.93395496 L16.5990507,4.96697748 L11.6320732,0 L10.5849126,1.0471606 L13.7641633,4.22641128 L8.88679436,4.22641128 C3.98646784,4.22641128 0,8.21287912 0,13.1132056 C0,18.0135322 3.98646784,22 8.88679436,22 C11.260309,22 13.491635,21.0757734 15.1704985,19.3969098 L14.1233379,18.3497492 C12.7244084,19.7486788 10.8648467,20.5188676 8.88679436,20.5188676" })
        );

      // for demos
      case 'elevator':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "#3C3C3B", fill: "none", strokeWidth: "1", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-11" },
            React.createElement("path", { d: "M23.477,12.633 L8.609,12.633 L8.609,0.508 L23.477,0.508 L23.477,12.633 Z", id: "Stroke-5" }),
            React.createElement("path", { d: "M16.0428,12.633 L16.0428,0.508", id: "Stroke-6" }),
            React.createElement("path", { d: "M3.3297,10.0326 L3.3297,3.9696", id: "Stroke-7" }),
            React.createElement("path", { d: "M0.4254,6.4563 L3.3924,3.4893 L6.3594,6.4563", id: "Stroke-8" }),
            React.createElement("path", { d: "M28.7559,3.4895 L28.7559,9.5525", id: "Stroke-9" }),
            React.createElement("path", { d: "M31.6602,7.0658 L28.6932,10.0328 L25.7262,7.0658", id: "Stroke-10", s: true })
          )
        );
      case 'weatherService':
        return React.createElement(
          "g",
          { id: "Page-1", stroke: "none", strokeWidth: "1", "fill-rule": "evenodd" },
          React.createElement(
            "g",
            { id: "Group-10" },
            React.createElement("path", { d: "M19.5047,5.8701 C19.4827,5.8701 19.4627,5.8731 19.4407,5.8731 C19.0467,3.0931 16.6637,0.9531 13.7747,0.9531 C11.5457,0.9531 9.6187,2.2281 8.6707,4.0861 C8.2977,4.0211 7.9167,3.9811 7.5257,3.9811 C3.8387,3.9811 0.8507,6.9691 0.8507,10.6561 C0.8507,14.3421 3.8387,17.3311 7.5257,17.3311 L19.5047,17.3311 C22.6697,17.3311 25.2347,14.7651 25.2347,11.6001 C25.2347,8.4361 22.6697,5.8701 19.5047,5.8701 L19.5047,5.8701 Z", id: "Stroke-11" })
          )
        );
      case 'sport':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M14 3.8c.99 0 1.8-.81 1.8-1.8 0-1-.81-1.8-1.8-1.8-1 0-1.8.81-1.8 1.8s.8 1.8 1.8 1.8zm.12 6.2h4.88v-1.8h-3.62l-2-3.33c-.3-.5-.84-.83-1.46-.83-.17 0-.34.03-.49.07l-5.43 1.69v5.2h1.8v-3.67l2.11-.66-3.91 15.33h1.8l2.87-8.11 2.33 3.11v5h1.8v-6.41l-2.49-4.54.73-2.87 1.08 1.82z" })
        );
    }
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  componentWillMount: function componentWillMount() {
    // If there is no color specified take the theme color or (if the theme is absent) a default color
    // TODO: this should be state.  props can't change
    //this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.title||"#5a5a5a";
  },

  render: function render() {

    var styleIcon = Object.assign({}, styles.icon, {
      fill: this.props.color,
      width: this.props.size,
      height: this.props.size
    }, this.props.style);

    var viewport = Object.assign({}, { x: 0, y: 0, width: 24, height: 24 }, this.state.viewportCorrection);

    return React.createElement(
      "span",
      { onClick: this.onClick },
      React.createElement(
        "svg",
        { viewBox: viewport.x + ' ' + viewport.y + ' ' + viewport.width + ' ' + viewport.height,
          preserveAspectRatio: "xMidYMid meet",
          fit: true,
          style: styleIcon
        },
        this.renderGraphic()
      )
    );
  }
});

module.exports = Icon;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/IconLink.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
	container: {
		cursor: "pointer"
	},
	action: {
		verticalAlign: "middle",
		margin: "4px"
	},
	label: {
		marginLeft: "5px"
	}
};

var IconLink = React.createClass({
	displayName: 'IconLink',

	propTypes: {
		style: RPT.object,
		theme: RPT.object.isRequired,
		icon: RPT.string,
		color: RPT.string,
		size: RPT.number,
		action: RPT.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			size: 24
			// color default is set in componentWillMount
		};
	},

	onClick: function onClick() {
		if (this.props.action) {
			this.props.action();
		}
	},

	componentWillMount: function componentWillMount() {
		// TODO: this should be state.  props can't change
		//this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.major||"#5a5a5a";
	},

	render: function render() {
		var styleContainer = Object.assign({}, this.props.style, styles.container);
		var linkLabel = Object.assign({}, styles.label, {
			lineHeight: this.props.size + "px",
			color: this.props.color
		});

		return React.createElement(
			'div',
			{ style: styleContainer, onClick: this.onClick },
			React.createElement(Icon, { icon: this.props.icon,
				color: this.props.color,
				size: this.props.size,
				style: { verticalAlign: "middle" },
				theme: this.props.theme
			}),
			React.createElement(
				'span',
				{ style: linkLabel },
				this.props.children
			)
		);
	}
});

module.exports = IconLink;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Image.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
    imageWrapper: {
        width: "inherit",
        height: "inherit"
    },
    imageError: {
        height: "100%",
        width: "100%",
        display: "table"
    },
    imageErrorText: {
        display: "table-cell",
        verticalAlign: "middle",
        textAlign: "center"
    }
};

// TODO Called IoTImage because of Namespace conflicts -> Fix this
var Image = React.createClass({
    displayName: "Image",

    propTypes: {
        url: RPT.string,
        width: RPT.number,
        height: RPT.number,
        style: RPT.object,
        onError: RPT.func
    },

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    getInitialState: function getInitialState() {
        return {
            url: this.props.url ? this.props.url : "",
            width: this.props.width ? this.props.width + "px" : "",
            height: this.props.height ? this.props.height + "px" : "",
            error: false
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(props) {
        this.setState({ error: false });
        console.log(props.url);
        this.setState({ url: props.url });
        if (this.state.width !== props.width) {
            this.setState({ width: props.width });
        }
        if (this.state.height !== props.height) {
            this.setState({ height: props.height });
        }
    },

    handleError: function handleError(e) {
        if (typeof this.props.onError === 'function') {
            this.props.onError(e.target.value);
        } else {
            this.setState({ error: true });
        }
    },

    onLoad: function onLoad(e) {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(e);
        }
    },

    render: function render() {
        var errorMsg = "";

        var image = React.createElement("img", { width: this.state.width, height: this.state.height, src: this.state.url, onError: this.handleError, onLoad: this.onLoad, style: this.props.style });

        if (this.state.error && this.state.url !== "") {
            errorMsg = React.createElement(
                "div",
                { style: styles.imageError },
                React.createElement(
                    "span",
                    { style: styles.imageErrorText },
                    "No image available"
                )
            );
            image = "";
        }

        return React.createElement(
            "div",
            { style: styles.imageWrapper },
            image,
            errorMsg
        );
    }
});

module.exports = Image;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/InputField.jsx":[function(require,module,exports){
(function (global){
'use strict';

/*global require, module */
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var re_weburl = require('../../Dashboard/util/regex-weburl');
var re_email = require('../../Dashboard/util/regex-email');

var styles = {
  field: {
    border: 'none',
    borderBottom: '3px solid #9EAAA9',
    boxShadow: 'none!important',
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '42px',
    //  padding: '8px 0px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
    outline: 'none',
    lineHeight: '1.42857143',
    boxSizing: 'border-box',
    WebkitTransition: 'all .2s ease-in-out',
    transition: 'all .2s ease-in-out',
    backgroundColor: 'inherit'
  },
  fieldContainer: {
    width: '100%',
    float: 'left'
  },
  validationWarning: {
    position: 'relative',
    top: '-25px',
    textAlign: 'right',
    height: '0px',
    paddingRight: '10px'
  },
  after: {
    clear: 'both'
  }

};

var InputField = React.createClass({
  displayName: 'InputField',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    containerStyle: RPT.object,
    onChange: RPT.func,
    onSubmit: RPT.func,
    initialValue: RPT.string,
    placeholder: RPT.string,
    readOnly: RPT.bool,
    min: RPT.number,
    max: RPT.number,
    type: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialValue: '',
      type: 'text',
      style: { label: {} },
      readOnly: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.initialValue !== undefined ? this.props.initialValue : '',
      isValid: true
    };
  },

  validateType: function validateType(value) {
    var currType = this.props.type || 'text';
    var isValid = true;

    switch (currType) {
      case 'url':
        isValid = value.match(re_weburl) !== null;
      case 'email':
        isValid = value.match(re_email) !== null;
    }
    return isValid;
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({ value: props.value });
    }
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
    this.setState({ isValid: this.validateType(event.target.value) });
  },

  handleSubmit: function handleSubmit(event) {
    if (event.key == "Enter") {
      if (this.props.onSubmit) {
        this.props.onSubmit(event.target.value);
      }
    }
  },

  handleOnFocus: function handleOnFocus(event) {
    this.setState({
      hasFocus: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(event.target.value);
    }
  },

  handleClick: function handleClick(event) {
    this.setState({
      hasFocus: true
    });
    if (this.props.onClick) {
      this.props.onClick(event.target.value);
    }
  },

  handleOnBlur: function handleOnBlur(event) {
    this.setState({
      hasFocus: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value);
    }
  },

  render: function render() {
    var warning = this.state.isValid ? '' : React.createElement(
      'div',
      { style: styles.validationWarning },
      '!'
    );
    if (this.state.hasFocus) {
      styles.field.borderColor = '#4581E0';
    } else {
      styles.field.borderColor = '#9EAAA9';
    }
    if (!this.state.isValid && !this.state.hasFocus) {
      styles.field.borderColor = '#d10e0e';
    }

    var inputStyle = Object.assign({}, styles.field, this.props.style);

    var containerStyle = Object.assign({}, styles.fieldContainer, this.props.containerStyle);

    var inputField = React.createElement('input', { type: this.props.type, min: this.props.min, max: this.props.max, style: inputStyle, name: 'field', value: this.state.value, readOnly: this.props.readOnly, onKeyDown: this.handleSubmit, onChange: this.handleChange, onFocus: this.handleOnFocus, onClick: this.handleClick, onBlur: this.handleOnBlur, placeholder: this.props.placeholder });

    return React.createElement(
      'div',
      { style: styles.formElement },
      React.createElement(
        'div',
        { style: containerStyle },
        inputField,
        warning
      ),
      React.createElement('div', { style: styles.after })
    );
  }
});

module.exports = InputField;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/regex-email":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/regex-email.js","../../Dashboard/util/regex-weburl":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/regex-weburl.js"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Label.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {

  container: {
    marginBottom: "15px",
    boxSizing: "border-box",
    clear: "both"
  },
  childContainer: {},
  label: {
    textAlign: "left",
    paddingRight: "15px",
    paddingTop: "7px",
    display: "inline-block",
    fontSize: "13px",
    color: "#9EAAA9"
  }

};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Label-component
//

var Label = React.createClass({
  displayName: "Label",

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    label: RPT.string,
    labelFor: RPT.string,
    customContainerStyle: RPT.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: ""
    };
  },

  getInitialState: function getInitialState() {
    return {
      hasFocus: false
    };
  },

  componentWillMount: function componentWillMount() {
    this.updateTheme();
  },

  onFocus: function onFocus(e) {
    this.setState({ hasFocus: true });
  },

  onBlur: function onBlur(e) {
    this.setState({ hasFocus: false });
  },

  updateTheme: function updateTheme() {
    styles.label.color = this.state.hasFocus ? "#4581E0" : "#9EAAA9";
    styles.label.color = styles.label.color ? styles.label.color : this.props.theme && this.props.theme.title || "#323232";
  },

  render: function render() {
    var self = this;
    this.updateTheme();
    var styleLabel = Object.assign({}, styles.label, this.props.style);
    var styleContainer = Object.assign({}, styles.container, this.props.customContainerStyle);
    return React.createElement(
      "div",
      { style: styleContainer },
      React.createElement(
        "label",
        { style: styleLabel, htmlFor: this.props.labelFor },
        this.props.label
      ),
      React.createElement(
        "div",
        { style: styles.childContainer },
        React.Children.map(this.props.children, function (child, idx) {
          // TODO: can't modify props
          //child.props.onFocus=self.onFocus;
          //child.props.onBlur=self.onBlur;
          return child;
        })
      )
    );
  }
});

module.exports = Label;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/LineChart.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var LineChart = React.createClass({
  displayName: 'LineChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.object,
    initialData: RPT.object,
    plots: RPT.array,
    title: RPT.string,
    range: RPT.number,
    autoscroll: RPT.bool,
    stacked: RPT.bool,
    steps: RPT.bool,
    threshold: RPT.number,
    overview: RPT.bool,
    legend: RPT.bool,
    small: RPT.bool,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: {},
      plots: [],
      range: 60,
      threshold: 300,
      autoscroll: true,
      overview: true,
      stacked: false,
      steps: false,
      legend: true,
      small: false

    };
  },

  getInitialState: function getInitialState() {
    return {
      data: this.props.initialData ? this.props.initialData : []
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  startScrolling: function startScrolling() {
    this.stopScrolling();
    var self = this;
    this.scrollInterval = setInterval(function () {
      self.adjustWindow();
    }, 1000);
  },

  stopScrolling: function stopScrolling() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  },

  adjustWindow: function adjustWindow() {
    if (this.graph) {
      this.graph.axis.max({
        x: new Date()
      });
      if (this.props.threshold) {
        var startDate = new Date(new Date().getTime() - this.props.threshold * 1000);
        this.graph.axis.min({
          x: startDate
        });
      }
      var end = new Date(new Date().getTime() - this.props.range * 1000);
      var start = new Date();
      this.graph.internal.config.axis_x_tick_values = this.generateTickValues(end, start);
      this.graph.zoom([end, start]);
    }
  },

  createGraph: function createGraph() {
    if (this.props.autoscroll) {
      this.startScrolling();
    } else {
      this.stopScrolling();
    }

    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var now = new Date();
      var before = new Date(now.getTime() - 1000 * this.props.range);
      var zoomStart = now;
      var zoomEnd = before;

      var keys = [];
      var colorMap = {};
      var names = {};
      for (var i in this.props.plots) {
        var plot = this.props.plots[i];
        keys.push(plot.id);
        colorMap[plot.id] = colors[i % colors.length];
        names[plot.id] = plot.label;
      }

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        padding: {
          left: this.props.small ? 0 : 50,
          bottom: 0,
          right: 0,
          top: 0
        },
        // padding: {
        //   left: this.props.small?20:50,
        //   bottom: 20,
        //   right: 20,
        //   top: 20
        // },
        data: {
          type: this.props.steps ? "step" : "area",
          json: [this.state.data],
          x: 'timestamp',
          keys: {
            x: 'timestamp',
            value: keys
          },
          groups: this.props.stacked ? [keys] : undefined,
          colors: colorMap,
          names: names
          //            xFormat: '%Y-%m-%d %H:%M:%S'
        },
        line: {
          connectNull: true,
          step: {
            type: 'step-after'
          }
        },
        axis: {
          x: {
            type: "timeseries",
            extent: [zoomEnd, zoomStart],
            tick: {
              values: this.generateTickValues(zoomEnd, zoomStart),
              format: '%H:%M:%S',
              culling: {
                max: 3
              },
              fit: true
            },
            min: before,
            show: true
          },
          y: {
            show: !this.props.small
          }
        },
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        point: {
          r: 4,
          focus: {
            expand: {
              enabled: true,
              r: 6
            }
          },
          show: !this.props.stacked // seems not to work with stacked
        },
        transition: {
          duration: 0
        },
        legend: {
          hide: !this.props.legend
        }
      };

      if (this.props.overview) {
        config.subchart = {
          show: true,
          size: {
            height: 30
          }
        };
      }

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);

      this.beautifyLegend();
    }
  },

  beautifyLegend: function beautifyLegend() {
    //<rect class="c3-legend-item-tile" x="22.75" y="0" width="10" height="10" style="pointer-events: none; fill: rgb(186, 143, 247);"></rect>

    var tiles = d3.selectAll('#' + this.id + ' .c3-legend-item-tile');
    tiles.attr('rx', 7).attr('ry', 7);
  },

  generateTickValues: function generateTickValues(end, start) {
    // range in seconds
    var range = (start.getTime() - end.getTime()) / 1000;
    var leftEnd = end.getTime() / 1000;
    // depending on size, show 2 or 5 ticks
    var steps = range / (this.props.small ? 2 : 5);

    var breakpoints = [1, 5, 15, 60, 300, 1800, 3600, 10800, 21600, 86400];

    for (var i in breakpoints) {
      var breakpoint = breakpoints[i];
      if (steps < breakpoint) {
        steps = breakpoint;
        leftEnd = Math.floor(leftEnd / breakpoint) * breakpoint;
        break;
      }
    }

    var values = [];
    var date = leftEnd;
    for (var j = 0; j < 5; j++) {
      var newDate = new Date(leftEnd * 1000);
      values.push(newDate);
      leftEnd = leftEnd + steps;
    }
    return values;
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    var self = this;
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      var keys = [];
      for (var i in this.props.plots) {
        keys.push(this.props.plots[i].id);
      }

      this.state.data.push(this.props.data);

      var data;
      if (this.props.threshold) {
        var startDate = new Date().getTime() - this.props.threshold * 1000;
        while (this.state.data.length > 0) {
          var item = this.state.data[0];
          if (!item.timestamp || item.timestamp < startDate) {
            this.state.data.shift();
          } else {
            break;
          }
        }
      }
      self.graph.load({
        json: this.state.data,
        keys: {
          x: "timestamp",
          value: keys
        }
      });

      this.beautifyLegend();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var oldProps = Object.assign({}, this.props);
    var newProps = Object.assign({}, prevProps);
    oldProps.data = null;
    newProps.data = null;
    if (JSON.stringify(oldProps) != JSON.stringify(newProps)) {
      this.createGraph();
      this.updateGraph();
    } else {
      this.updateGraph();
    }
  },

  onEnter: function onEnter() {
    this.stopScrolling();
  },

  onLeave: function onLeave() {
    if (this.props.autoscroll) {
      this.startScrolling();
    }
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    if (!this.id) {
      this.id = "X" + Math.round(Math.random() * 1000000);
    }
    return React.createElement('div', { id: this.id, className: 'lineChart', style: style, onMouseOver: this.onEnter, onMouseOut: this.onLeave });
  }
});

module.exports = LineChart;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js","./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/LoadIndicator.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {};

var LoadIndicator = React.createClass({
	displayName: 'LoadIndicator',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		wait: RPT.number,
		useDataPoints: RPT.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			wait: 30,
			useDataPoints: false
		};
	},

	getInitialState: function getInitialState() {
		return {
			counter: this.props.wait
		};
	},

	componentDidMount: function componentDidMount() {
		this.startCounter();
	},

	startCounter: function startCounter() {
		var self = this;
		setTimeout(function () {
			var counter = self.state.counter;
			if (counter > 0 && self.isMounted()) {
				self.setState({
					counter: counter - 1
				});
				self.startCounter();
			}
		}, 1000);
	},

	render: function render() {
		var text = "";
		if (this.state) {
			if (this.state.counter <= 0) {
				if (this.props.useDataPoints) {
					text = React.createElement(
						'div',
						null,
						React.createElement(
							'span',
							null,
							'No messages for the specified data point(s) received.'
						)
					);
				} else {
					text = React.createElement(
						'div',
						null,
						React.createElement(
							'span',
							null,
							'No data received. Check if the service is accessible.'
						)
					);
				}
			} else {
				text = "Loading " + (this.state.counter % 3 - 2 == 0 ? ":" : ".") + (this.state.counter % 3 - 1 == 0 ? ":" : ".") + (this.state.counter % 3 == 0 ? ":" : ".");
			}
		}
		return React.createElement(
			'div',
			null,
			text
		);
	}
});

module.exports = LoadIndicator;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Option.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
    optionContainer: {
        borderStyle: "solid",
        padding: "10px",
        fontSize: "14px",
        borderRightWidth: "2px",
        borderLeftWidth: "2px",
        borderColor: "#E7E7E7",
        backgroundColor: "",
        color: "",
        cursor: "pointer",
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box"
    },
    selectionTickContainer: {
        display: "inline",
        float: "right"
    },
    selectionTick: {}
};

var Option = React.createClass({
    displayName: 'Option',

    propTypes: {
        theme: RPT.object,
        style: RPT.object,
        value: RPT.string,
        selected: RPT.bool,
        disabled: RPT.bool,
        onSelect: RPT.func,
        onClick: RPT.func,
        lastChild: RPT.bool
    },

    getInitialState: function getInitialState() {
        return {
            hover: false,
            disabled: this.props.disabled || false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            selected: false,
            theme: {
                "light": "#c7c7c7",
                "title": "#323232",
                "dark": "#5a5a5a"
            }
        };
    },

    componentWillMount: function componentWillMount() {
        styles.optionContainer.borderColor = "#E7E7E7";
    },

    mouseOver: function mouseOver() {
        this.setState({ hover: true });
    },

    mouseOut: function mouseOut() {
        this.setState({ hover: false });
    },

    handleMouseDown: function handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.state.disabled) {
            if (typeof this.props.children == "string" && this.props.children !== "") {

                this.props.onSelect(this.props.value, this.props.children, event);
                if (this.props.onClick) {
                    this.props.onClick();
                }
            } else {
                this.props.onSelect(this.props.value, event);
            }
        }
    },

    render: function render() {

        if (this.props.lastChild === true) {
            styles.optionContainer.borderBottomWidth = "2px";
            styles.optionContainer.borderTopWidth = "0px";
        } else if (this.props.firstChild === true) {
            styles.optionContainer.borderTopWidth = "1px";
            styles.optionContainer.borderBottomWidth = "0px";
        } else {
            styles.optionContainer.borderTopWidth = "0px";
            styles.optionContainer.borderBottomWidth = "0px";
        }

        var option = "";

        if (!this.state.disabled) {
            styles.optionContainer.cursor = "pointer";
            if (this.state.hover || this.props.selected) {
                styles.optionContainer.backgroundColor = "#4581E0";
                styles.optionContainer.color = "#FFFFFF";
                styles.selectionTick.color = "#FFFFFF";
                styles.optionContainer.borderColor = "#4581E0";
            } else {
                styles.optionContainer.backgroundColor = "#F7F7F7";
                styles.optionContainer.color = this.props.theme.major;
                styles.selectionTick.color = this.props.theme.title;
                styles.optionContainer.borderColor = "#E7E7E7";
            }
        } else {
            styles.optionContainer.backgroundColor = "#F9F9F9";
            styles.optionContainer.color = this.props.theme.minor;
            styles.optionContainer.cursor = "default";
        }

        var selectionTick = this.props.selected ? React.createElement(
            'div',
            { style: styles.selectionTickContainer },
            React.createElement(Icon, { theme: this.props.theme, icon: 'check', color: styles.selectionTick.color, size: 12 }),
            ' '
        ) : "";

        var containerStyle = Object.assign({}, styles.optionContainer, this.props.style);
        if (this.props.onSelect !== undefined) {
            option = React.createElement(
                'div',
                { onMouseDown: this.handleMouseDown, style: containerStyle,
                    onMouseOver: this.mouseOver, onMouseOut: this.mouseOut
                },
                this.props.children,
                selectionTick
            );
        } else {
            option = React.createElement(
                'option',
                { value: this.props.value, selected: this.props.selected },
                this.props.children
            );
        }

        return option;
    }
});

module.exports = Option;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Portal.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var RPT = React.PropTypes;

var styles = {};

var Portal = React.createClass({
  displayName: 'Portal',

  componentDidMount: function componentDidMount() {
    this.popup = document.createElement("div");
    this.popup.style.position = 'relative';
    this.popup.style.zIndex = '9999';
    document.body.style.overflow = 'hidden';
    document.body.appendChild(this.popup);
    this._child = ReactDOM.render(this.props.children, this.popup);
  },

  componentDidUpdate: function componentDidUpdate() {
    if (!this._child) {
      return;
    }
    this._child.setState({});
  },

  componentWillUnmount: function componentWillUnmount() {
    React.unmountComponentAtNode(this.popup);
    document.body.style.overflow = 'auto';
    document.body.removeChild(this.popup);
  },

  render: function render() {
    return null;
  }

});

module.exports = Portal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/SearchField.jsx":[function(require,module,exports){
(function (global){
'use strict';

/*global require, module */
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var re_weburl = require('../../Dashboard/util/regex-weburl');
var Icon = require('./Icon.jsx');

var styles = {
  field: {
    border: 'none',
    borderBottom: '3px solid #9EAAA9',
    boxShadow: 'none!important',
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '35px',
    padding: '8px 0px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
    outline: 'none',
    lineHeight: '1.42857143',
    boxSizing: 'border-box',
    WebkitTransition: 'all .2s ease-in-out',
    transition: 'all .2s ease-in-out',
    backgroundColor: '#EFEFEF',
    borderColor: 'transparent',
    paddingLeft: "10px"

  },
  fieldContainer: {
    width: '100%',
    float: 'left'
  },
  validationWarning: {
    position: 'relative',
    top: '-25px',
    textAlign: 'right',
    height: '0px',
    paddingRight: '10px'
  },
  after: {
    clear: 'both'
  },
  formElement: {
    paddingLeft: "40px",
    position: "relative"
  },
  icon: {
    position: "absolute",
    top: "8px",
    left: "8px"
  }

};

var SearchField = React.createClass({
  displayName: 'SearchField',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    onChange: RPT.func,
    onSubmit: RPT.func,
    initialValue: RPT.string,
    placeholder: RPT.string,
    readOnly: RPT.bool,
    type: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialValue: '',
      type: 'text',
      style: { label: {} },
      readOnly: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.initialValue || '',
      isValid: true
    };
  },

  validateType: function validateType(value) {
    var currType = this.props.type || 'text';
    var isValid = true;

    switch (currType) {
      case 'url':
        isValid = value.match(re_weburl) !== null;
    }

    return isValid;
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({ value: props.value });
    }
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
    this.setState({ isValid: this.validateType(event.target.value) });
  },

  handleSubmit: function handleSubmit(event) {
    if (event.key == "Enter") {
      if (this.props.onSubmit) {
        this.props.onSubmit(event.target.value);
      }
    }
  },

  handleClick: function handleClick(event) {
    this.setState({
      hasFocus: true
    });
    if (this.props.onClick) {
      this.props.onClick(event.target.value);
    }
  },

  render: function render() {
    var warning = this.state.isValid ? '' : React.createElement(
      'div',
      { style: styles.validationWarning },
      '!'
    );

    var inputStyle = Object.assign({}, styles.field, this.props.style);

    var containerStyle = Object.assign({}, styles.fieldContainer, this.props.containerStyle);

    var inputField = React.createElement('input', { type: this.props.type, style: inputStyle, name: 'field', value: this.state.value, readOnly: this.props.readOnly, onKeyDown: this.handleSubmit, onChange: this.handleChange, onFocus: this.handleOnFocus, onClick: this.handleClick, onBlur: this.handleOnBlur, placeholder: this.props.placeholder });

    return React.createElement(
      'div',
      { style: styles.formElement },
      React.createElement(Icon, { theme: this.props.theme, color: this.props.theme.accent, icon: 'search', size: 24, style: styles.icon }),
      React.createElement(
        'div',
        { style: containerStyle },
        inputField,
        warning
      ),
      React.createElement('div', { style: styles.after })
    );
  }
});

module.exports = SearchField;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/regex-weburl":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/regex-weburl.js","./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Section.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var RPT = React.PropTypes;

var styles = {
  sectionWrapper: {
    clear: "both",
    marginBottom: '40px'
  },

  headingSection: {
    color: "#5c91cc",
    fontWeight: "700",
    display: "inline-block",
    textTransform: "none",
    fontSize: "14px",
    marginTop: "20px",
    marginBottom: '10px'
  },

  hr: {
    borderTop: '1px solid #eee',
    boxSizing: 'content-box',
    height: '3px',
    backgroundColor: '#4983c6',
    marginTop: '10px',
    borderStyle: 'solid',
    marginBottom: '25px',
    border: '0px'
  }

};

var Section = React.createClass({
  displayName: 'Section',

  propTypes: {},

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  getInitialState: function getInitialState() {
    return {};
  },

  componentDidUpdate: function componentDidUpdate() {},

  render: function render() {

    var headingSection = "";

    headingSection = React.createElement(
      'div',
      null,
      this.props.headingSection
    );

    return React.createElement(
      'div',
      { style: styles.sectionWrapper },
      React.createElement(
        'div',
        { style: styles.headingSection },
        headingSection
      ),
      React.createElement('hr', { style: styles.hr }),
      React.createElement(
        'div',
        null,
        this.props.children
      )
    );
  }
});
module.exports = Section;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Select.jsx":[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var RPT = React.PropTypes;
var InputField = require('./InputField.jsx');
var Icon = require('./Icon.jsx');

var styles = {
  selectBox: {
    cursor: 'pointer',
    position: 'relative'
  },
  optionsContainer: {
    position: 'absolute',
    minWidth: '100%',
    zIndex: '99999999'
  },
  iconContainer: {
    position: 'relative',
    top: '-30px',
    float: 'right',
    outlineWidth: '0px !important'
  },
  inputField: {
    width: '100%',
    cursor: 'pointer'
  },
  after: {
    //clear: 'both'
  }
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Select-component
//

var SelectBox = React.createClass({
  displayName: 'SelectBox',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    onChange: RPT.func,
    label: RPT.string,
    initialValue: RPT.string,
    value: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialValue: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      value: this.props.value || null
    };
  },

  componentDidMount: function componentDidMount() {
    this.updateInput(this.props.value);
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.updateInput(props.value);
  },

  onSelect: function onSelect(value, label, event) {
    this.setState({ input: label, isOpen: false, value: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  toggleOptionsContainer: function toggleOptionsContainer() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  onFocus: function onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  },

  onBlur: function onBlur() {
    //this.setState({ isOpen: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },

  updateInput: function updateInput(newVal) {
    var self = this;
    React.Children.forEach(this.props.children, function (child) {
      if (newVal === child.props.value) {
        self.setState({ input: child.props.children, value: newVal });
      }
    });
  },

  handleChange: function handleChange(event) {},

  renderInputField: function renderInputField() {
    return React.createElement(InputField, { readOnly: true, style: styles.inputField, containerStyle: { width: '100%', cursor: 'pointer' }, theme: this.props.theme, initialValue: this.props.initialValue, value: this.state.input, onFocus: this.onFocus, onClick: this.toggleOptionsContainer, onBlur: this.onBlur });
  },

  renderChildren: function renderChildren() {
    var self = this;
    var children = this.props.children;
    var lastIndex = Array.isArray(children) ? children.length - 1 : null;
    var childrenElement = React.Children.map(children, function (child, idx) {
      var currProps = {};
      if (lastIndex && lastIndex === idx) {
        currProps = { lastChild: true, firstChild: false };
      } else if (idx === 0) {
        currProps = { lastChild: false, firstChild: true };
      } else {
        currProps = { lastChild: false, firstChild: false };
      }

      if (self.state.value === child.props.value) {
        currProps.selected = true;
      } else {
        currProps.selected = false;
      }

      currProps.onSelect = self.onSelect;
      var newChild = React.cloneElement(child, currProps);
      return newChild;
    });

    return React.createElement(
      'div',
      { style: styles.optionsContainer },
      React.createElement(
        ReactCSSTransitionGroup,
        { transitionName: 'actionIcons', transitionEnterTimeout: 500, transitionLeaveTimeout: 500 },
        childrenElement
      )
    );
  },

  render: function render() {
    var selectBox = Object.assign({}, styles.selectBox, this.props.style);
    return React.createElement(
      'div',
      { style: selectBox },
      this.renderInputField(),
      React.createElement(
        'a',
        { style: styles.iconContainer, tabIndex: '1', onBlur: this.onBlur, href: 'javascript:void(0)' },
        React.createElement(Icon, { icon: "arrow-drop-down", size: 15, theme: this.props.theme, onClick: this.toggleOptionsContainer })
      ),
      this.state.isOpen ? this.renderChildren() : '',
      React.createElement('div', { style: styles.after })
    );
  }
});

module.exports = SelectBox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/Icon.jsx","./InputField.jsx":"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/InputField.jsx"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/components/SwitchBtn.jsx":[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
    container: {
        paddingTop: "5px"
    },
    switchBtn: {
        position: "relative",
        border: "3px solid",
        borderColor: " #4581E0",
        width: "48px",
        float: "left",
        backgroundColor: "#4581E0",
        borderRadius: "13px",
        webkitTransition: "all .15s ease-out",
        mozTransition: "all .15s ease-out",
        msTransition: "all .15s ease-out",
        oTransition: "all .15s ease-out",
        transition: "all .15s ease-out"
    },
    label: {},
    toggleElement: {
        display: "block",
        webkitTransition: "left .15s ease-out",
        mozTransition: "left .15s ease-out",
        msTransition: "left .15s ease-out",
        oTransition: "left .15s ease-out",
        transition: "left .15s ease-out",
        width: "20px",
        height: "20px",
        backgroundColor: "white",
        position: "relative",
        borderRadius: "10px"
    },
    falseState: {
        left: "23px"
    },
    trueState: {
        left: "0px"
    },
    stateText: {
        lineHeight: "24px",
        marginLeft: "15px"
    }
};

var SwitchBtn = React.createClass({
    displayName: "SwitchBtn",

    propTypes: {
        theme: RPT.object.isRequired,
        style: RPT.object,
        initialValue: RPT.bool,
        value: RPT.bool,
        trueText: RPT.string,
        falseText: RPT.string,
        label: RPT.string
    },

    getInitialState: function getInitialState() {
        return {
            value: this.props.initialValue
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            initialValue: true,
            onChange: function onChange() {},
            trueText: "On",
            falseText: "Off"
        };
    },

    toggleState: function toggleState() {
        var toggleState = this.state.value;
        this.setState({ value: !toggleState });
        this.props.onChange(!toggleState);
    },

    componentWillMount: function componentWillMount() {
        // Apply theme colors here
        var theme = this.props.theme;
        styles.stateText.color = theme ? theme.major : "#323232";
    },

    render: function render() {
        var toggleStateStyle = this.state.value ? styles.trueState : styles.falseState;
        var toggleElementStyle = Object.assign({}, styles.toggleElement, toggleStateStyle);
        var toggleSwitchStyle = Object.assign({}, styles.switchBtn, this.state.value ? {} : { backgroundColor: this.props.theme.minor, borderColor: this.props.theme.minor });
        var text = "";
        if (this.props.trueText !== "" && this.props.falseText !== "") {
            text = this.state.value ? this.props.trueText : this.props.falseText;
        } else {
            text = "";
        }

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { style: styles.container },
                React.createElement(
                    "div",
                    { style: toggleSwitchStyle, onClick: this.toggleState },
                    React.createElement("div", { style: toggleElementStyle })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "span",
                        { style: styles.stateText },
                        text
                    )
                )
            )
        );
    }
});

module.exports = SwitchBtn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/ConfigStore.js":[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Const = require('../../Dashboard/util/Const');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var Actions = Reflux.createActions(['getConfigs', 'getConfig', 'createConfig', 'updateConfig']);

var ConfigStore = Reflux.createStore({

  Actions: Actions,

  init: function init() {
    this.listenTo(Actions.getConfigs, this.onGetConfigs);
    this.listenTo(Actions.getConfig, this.onGetConfig);
    this.listenTo(Actions.createConfig, this.onCreateConfig);
    this.listenTo(Actions.updateConfig, this.onUpdateConfig);
  },

  onGetConfigs: function onGetConfigs() {

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
      success: function success(data) {
        self.handleConfigs(data);
      },
      error: function error(data) {
        self.trigger({ configs: null, error: "Error!" });
      }
    });
  },

  onGetConfig: function onGetConfig(payload) {

    var name = payload.name;
    var lastChange = payload.lastChange ? payload.lastChange : 0;

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
      success: function success(data) {
        self.trigger({ configs: null, config: data, error: null });
      },
      error: function error(xhr, text, _error) {
        if (xhr.status == 404) {
          // does not exist yet -> ignore and wait till somebody saves it
          self.trigger({ configs: null, config: null, error: null });
        } else if (xhr.status == 409) {
          // The local version is newer -> overwrite the server version
          self.onUpdateConfig(payload);
        }
      }
    });
  },

  onCreateConfig: function onCreateConfig(payload) {
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
      success: function success(data) {
        // store latest timestamp
        payload.data.configTimestamp = data.lastChanged;
        self.trigger({ configs: null, config: payload.data, error: null });
      },
      error: function error(xhr, text, _error2) {
        if (xhr.status == 409) {
          // a config already exists
          if (xhr.responseJSON.lastChanged > data.configTimestamp) {
            // remote is newer -> reload
            self.onLoadConfig(payload);
          } else if (xhr.responseJSON.lastChanged < data.configTimestamp) {
            self.onUpdateConfig(payload);
          }
        } else if (xhr.status == 400 || xhr.status == 500) {
          self.trigger({ configs: null, config: null, error: _error2 });
        } else {
          self.trigger({ configs: null, config: null, error: _error2 });
        }
      }
    });
  },

  onUpdateConfig: function onUpdateConfig(payload) {
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
      success: function success(data) {
        // store latest timestamp
        payload.data.configTimestamp = data.lastChanged;
        self.trigger({ configs: null, config: payload.data, error: null });
      },
      error: function error(xhr, text, _error3) {
        if (xhr.status == 404 || xhr.status == 415) {
          // does not exist yet -> create it
          self.onCreateConfig(payload);
        } else if (xhr.status == 409) {
          // remote config is newer -> reload it
          self.onLoadConfig(payload);
        } else if (xhr.status == 400 || xhr.status == 500) {
          self.trigger({ configs: null, config: null, error: _error3 });
        } else {
          self.trigger({ configs: null, config: null, error: _error3 });
        }
      }
    });
  },

  handleConfigs: function handleConfigs(configs) {
    this.trigger({ configs: configs, error: null });
  },

  handleConfig: function handleConfig(config) {
    this.trigger({ config: config, error: null });
  }

});

module.exports = ConfigStore;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/dashboard/DashboardUtils.js","../../Dashboard/util/Const":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/Const.js"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFAuthStore.js":[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var Actions = Reflux.createActions(['setAuth', 'getAuth']);

var IoTFAuthStore = Reflux.createStore({

	Actions: Actions,

	auth: {
		ltpa: null,
		org: null,
		domain: null,
		apiKey: null,
		apiToken: null
	},

	init: function init() {
		var self = this;
		this.listenTo(Actions.setAuth, function (a, b, c, d, e) {
			self.onSetAuth(a, b, c, d, e);
		});
	},

	getAuth: function getAuth() {
		return this.auth;
	},

	onSetAuth: function onSetAuth(org, ltpa, domain, apiKey, apiToken) {
		if (org) {
			this.auth.org = org;
		};
		if (ltpa) {
			this.auth.ltpa = ltpa;
		};
		if (domain) {
			this.auth.domain = domain;
		};
		if (apiKey) {
			this.auth.apiKey = apiKey;
		};
		if (apiToken) {
			this.auth.apiToken = apiToken;
		};
		this.trigger(this.auth);
	}
});

module.exports = IoTFAuthStore;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFDeviceStore.js":[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
//var ibmiotf = require('ibmiotf');
var mqtt = (typeof window !== "undefined" ? window['Messaging'] : typeof global !== "undefined" ? global['Messaging'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Const = require('../../Dashboard/util/Const');
var IoTFAuthStore = require('./IoTFAuthStore.js');

var Actions = Reflux.createActions(['fetchDevice', 'fetchDevices', 'startDeviceWatch', 'stopDeviceWatch', 'loadDeviceHistory', 'startPropertyWatch', 'stopPropertyWatch', 'startEventWatch', 'stopEventWatch']);

var State = {
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED"
};

var IoTFDeviceStore = Reflux.createStore({

  client: null,

  // keep track of watched objects
  watches: {
    devices: [],
    properties: []
  },

  deviceTypes: {},

  cache: {},

  historianRequests: [],

  historianRequestDelay: 100, // in millis

  lastValueInterval: 24 * 60 * 60 * 1000, // look up last value in previous 24 hours

  Actions: Actions,

  auth: {},

  state: State.DISCONNECTED,

  init: function init() {
    IoTFAuthStore.listen(this.onAuth);
    this.listenTo(Actions.fetchDevice, this.onFetchDevice);
    this.listenTo(Actions.fetchDevices, this.onFetchDevices);
    this.listenTo(Actions.startDeviceWatch, this.onStartDeviceWatch);
    this.listenTo(Actions.stopDeviceWatch, this.onStopDeviceWatch);
    this.listenTo(Actions.startPropertyWatch, this.onStartPropertyWatch);
    this.listenTo(Actions.stopPropertyWatch, this.onStopPropertyWatch);
    this.listenTo(Actions.startEventWatch, this.onStartEventWatch);
    this.listenTo(Actions.stopEventWatch, this.onStopEventWatch);
  },

  onAuth: function onAuth(payload) {
    console.log("Retrieving auth:");
    this.auth = {
      ltpa: payload.ltpa !== null ? encodeURIComponent(payload.ltpa) : null,
      org: encodeURIComponent(payload.org),
      apiKey: payload.apiKey !== null ? encodeURIComponent(payload.apiKey) : null,
      apiToken: payload.apiToken !== null ? encodeURIComponent(payload.apiToken) : null
    };

    // auth was updated
    this.initClient();
    this.connectClient();
  },

  initClient: function initClient() {
    var auth = IoTFAuthStore.getAuth();
    var randomNumber = Math.floor(Math.random() * 90000) + 10000;
    var clientId = 'a:' + auth.org + ':ptl' + randomNumber;

    var host = auth.org + ".messaging." + auth.domain;

    var port = 443;

    this.client = new window.Messaging.Client(host, port, clientId);

    var self = this;

    this.client.onMessageArrived = function (message) {
      if (message && message.payloadString !== "") {
        console.log("MQTT Client: Message Arrived on topic " + message.destinationName);

        var topic = message.destinationName;
        var typeId = topic.split("/")[2];
        var deviceId = topic.split("/")[4];
        var evtType = topic.split("/")[6];

        var data = JSON.parse(message.payloadString);

        // add to cache an flatten the structure
        var props = self.addToCache(deviceId, evtType, data, new Date().getTime());

        var payload = {};
        var timestamp = null;

        var keys = Object.keys(props);
        for (var i in keys) {
          var entry = props[keys[i]];
          payload[keys[i]] = entry.value;
          timestamp = entry.timestamp;
        }

        self.trigger({
          deviceEvent: {
            deviceId: deviceId,
            eventType: evtType,
            data: payload,
            timestamp: new Date(timestamp).toISOString()
          }
        });
      }
    };

    this.client.onConnectionLost = function (responseObj) {
      console.log("MQTT Client: Connection lost", responseObj);
      self.state = State.DISCONNECTED;
      setTimeout(function () {
        console.log("MQTT Client: Reconnecting...");
        self.connectClient();
      }, 100);
    };
  },

  connectClient: function connectClient() {
    var auth = IoTFAuthStore.getAuth();
    var self = this;
    var options = {
      onSuccess: function onSuccess() {
        self.state = State.CONNECTED;
        console.log("MQTT Client: Successfully opened a connection to the MQTT broker");
        self.handlePendingSubscribes();
      },
      onFailure: function onFailure(error) {
        console.log("MQTT Client: An error occured whilst trying to open a connection to the MQTT broker");
        self.state = State.DISCONNECTED;
      },
      useSSL: true,
      cleanSession: true
    };

    if (auth.ltpa) {
      options.userName = "use-ltpa-token";
      options.password = auth.ltpa;
    } else if (auth.apiKey) {
      options.userName = auth.apiKey;
      options.password = auth.apiToken;
    } else {
      throw new Error("No LTPA token or API key defined for connection");
    }

    this.client.connect(options);
  },

  onFetchDevice: function onFetchDevice() {
    // fetch device data
  },

  onFetchDevices: function onFetchDevices() {
    var deviceUrl = "/api/v0002/bulk/devices";
    var opts = {
      url: deviceUrl,
      contentType: "application/json"
    };

    if (this.auth.apiKey !== null) {
      // if running as localhost
      opts.url += "?org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
    }

    //console.log(opts);
    var self = this;
    $.ajax(opts).done(function (response) {
      //console.log(response);
      try {
        if (response.meta && response.meta.total_rows) {
          self.trigger({
            devices: response.results
          });
        } else {
          // handle bad result?
        }
      } catch (e) {
        console.error(e);
      }
    }).fail(function (response) {
      console.error(response);
    });
  },

  handlePendingSubscribes: function handlePendingSubscribes() {
    // handle subscribes that happened before connect
    var topic;
    for (var i in this.watches.devices) {
      topic = "iot-2/type/+/id/" + this.watches.devices[i] + "/evt/+/fmt/json";
      console.debug("subscribing to " + topic);
      this.client.subscribe(topic);
    }

    for (var j in this.watches.properties) {
      var deviceId = this.watches.properties[j].split("_|_")[0];
      var event = this.watches.properties[j].split("_|_")[1];
      topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
      console.debug("subscribing to " + topic);
      this.client.subscribe(topic);
    }
  },

  /**
  * Returns the cache object.
  */
  getCache: function getCache() {
    return this.cache ? this.cache : {};
  },

  /**
  * Get the last value and timestamp for a property from the cache
  */
  getFromCache: function getFromCache(device, event, property) {
    var cache = this.getCache();
    var obj = cache[device];
    if (obj) {
      obj = obj[event];
      if (obj) {
        if (property) {
          return obj[property];
        } else {
          return obj;
        }
      }
    }
    return null;
  },

  /**
  * Caches all devices, events and property names to have something to prefill comboboxes.
  * Use this also to have the last value without extra query.
  */
  addToCache: function addToCache(device, event, data, timestamp) {
    if (!this.cache[device]) {
      this.cache[device] = {};
    }
    if (!this.cache[device][event]) {
      this.cache[device][event] = {};
    }
    var obj = this.cache[device][event];
    var props = this.generateListOfProperties(data, null, timestamp);
    if (props) {
      Object.assign(obj, props);
    }
    return props;
  },

  /*
  * Creates a flattened list of properties for the event data. Used for caching.
  */
  generateListOfProperties: function generateListOfProperties(data, prefix, timestamp) {
    var result = {};
    if (prefix) {
      prefix = prefix + ".";
    } else {
      prefix = "";
    }
    if (prefix == "d." || prefix == "g.") {
      prefix = "";
    }
    for (var i in data) {
      var item = data[i];
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == "object") {
        Object.assign(result, this.generateListOfProperties(item, prefix + i, timestamp));
      } else if (item !== undefined) {
        result[prefix + i] = {
          value: item,
          timestamp: timestamp
        };
      }
    }
    return result;
  },

  /*
  * Device watch will trigger when any message is received from the device.
  */
  onStartDeviceWatch: function onStartDeviceWatch(deviceId) {
    console.debug("onStartDeviceWatch -- ", deviceId);
    var topic = "iot-2/type/+/id/" + deviceId + "/evt/+/fmt/json";
    if (this.watches.devices.indexOf(deviceId) == -1) {
      this.watches.devices.push(deviceId);

      // is there already a connection? -> subscribe right away
      if (this.state == State.CONNECTED) {
        this.client.subscribe(topic);
      }

      // TODO Query history for full device
    }
  },

  /**
  * Strips of a leading d. or g. prefix. This is necessary since the historian returns the property names without prefix.
  * Therefore we have to normalize it.
  */
  normalizeProperty: function normalizeProperty(property) {
    var hasPrefix = property.indexOf("d.") === 0 || property.indexOf("g.") === 0;
    if (hasPrefix) {
      property = property.substring(2);
    }
    return property;
  },

  /**
  * Same as normalizeProperty for the full payload of an MQTT message.
  */
  normalizePayload: function normalizePayload(payload) {
    if (payload && payload.d) {
      payload = payload.d;
    } else if (payload && payload.g) {
      payload = payload.g;
    }

    return payload;
  },

  /**
  * Unsubscribes from device watch.
  */
  onStopDeviceWatch: function onStopDeviceWatch(deviceId) {
    console.debug("onStopDeviceWatch -- ", deviceId);
    var topic = "iot-2/type/+/id/" + deviceId + "/evt/+/fmt/json";
    this.client.unsubscribe(topic);
    delete this.watches.devices[this.watches.devices.indexOf(deviceId)];
  },

  /**
  * Event watch will trigger when a specific event is received from the device.
  */
  onStartEventWatch: function onStartEventWatch(deviceId, event) {
    this.onStartPropertyWatch(deviceId, event, null);
  },

  /**
  * Unsubscribes from event watch.
  */
  onStopEventWatch: function onStopEventWatch(deviceId, event, property) {
    this.onStartPropertyWatch(deviceId, event, null);
  },

  /**
  * Checks if we are already watching this property.
  */
  isWatching: function isWatching(device, event, property) {
    return this.watches.properties.indexOf(device + "_|_" + event + "_|_" + property) > -1;
  },

  /**
  * Checks if we already have a watch for this event since subscription is always on event level.
  * Counts the number of property watches for that event.
  */
  isWatchingEvent: function isWatchingEvent(device, event) {
    var count = 0;
    for (var i in this.watches.properties) {
      if (this.watches.properties[i].split("_|_")[0] === device && this.watches.properties[i].split("_|_")[1] === event) {
        count++;
      }
    }
    return count;
  },

  /**
  * Add an entry in the list of watched properties.
  */
  addWatch: function addWatch(device, event, property) {
    this.watches.properties.push(device + "_|_" + event + "_|_" + property);
  },

  /**
  * Gets the device type for a device. This is necessary to make a historian request.
  * Therefore we handle multiple request in a list of callback.
  */
  getDeviceType: function getDeviceType(device, callback) {
    var self = this;

    // check if we have it in cache
    if (this.deviceTypes[device]) {
      var obj = this.deviceTypes[device];
      // We have an entry for this device type. This can be the deviceType itself or an array of
      // callbacks because others are already waiting for it.
      if ($.isArray(obj)) {
        // Add the callback to the list.
        obj.push(callback);
      } else {
        // we already have a value -> return it
        callback(obj);
      }
      return;
    } else {
      // create an array of callback to handle multiple requestors
      this.deviceTypes[device] = [callback];
    }

    // handle callbacks for all requests
    var deliverDeviceType = function deliverDeviceType(deviceType) {
      var obj = self.deviceTypes[device];
      // set the value
      self.deviceTypes[device] = deviceType;

      // call the callbacks
      for (var i in obj) {
        obj[i](deviceType);
      }
    };

    // we do not have it in cache -> make a request
    // get credentials for historian request
    var auth = IoTFAuthStore.getAuth();
    auth = {
      ltpa: encodeURIComponent(auth.ltpa),
      org: encodeURIComponent(auth.org),
      apiKey: encodeURIComponent(auth.apiKey),
      apiToken: encodeURIComponent(auth.apiToken)
    };

    var deviceUrl = "/api/v0002/bulk/devices?deviceId=" + device;
    var opts = {
      url: deviceUrl,
      contentType: "application/json"
    };
    if (auth.apiKey != null) {
      // if running as localhost
      opts.url += "&org=" + auth.org + "&apiKey=" + auth.apiKey + "&apiToken=" + auth.apiToken;
    }
    var self = this;

    console.debug("getDeviceType -- ", device);

    $.ajax(opts).done(function (response) {
      try {
        if (response.results && response.results[0] && response.results[0].typeId) {
          var typeId = response.results[0].typeId;
          deliverDeviceType(typeId);
        } else {
          // handle bad result?
          deliverDeviceType(null);
        }
      } catch (e) {
        console.error(e);
        deliverDeviceType(null);
      }
    }).fail(function (response) {
      console.error(response);
      deliverDeviceType(null);
    });
  },

  /**
  * Publishes the values in the cache for this property. Returns false if nothing found.
  */
  publishCachedValues: function publishCachedValues(deviceId, event, property) {
    var data = this.getFromCache(deviceId, event, property);

    // Currently all calls are event calls without property

    if (property) {
      // This is a single property watch. Send only this property.
      if (data && data.value !== undefined) {
        var payload = {};
        payload[property] = data.value;
        this.trigger({
          deviceEvent: {
            deviceId: deviceId,
            eventType: event,
            data: payload,
            timestamp: new Date(data.timestamp).toISOString()
          }
        });
        return true;
      }
    } else {
      // This is an event watch. Send a payload for the whole event
      if (data) {
        payload = {};
        var timestamp = null;

        var keys = Object.keys(data);
        for (var i in keys) {
          var entry = data[keys[i]];
          payload[keys[i]] = entry.value;
          timestamp = entry.timestamp;
        }
        this.trigger({
          deviceEvent: {
            deviceId: deviceId,
            eventType: event,
            data: payload,
            timestamp: new Date(timestamp).toISOString()
          }
        });
        return true;
      }
    }
    return false;
  },

  /**
  * Property Watch will trigger when a specific property (JSON) on an event is received from the device.
  * Used for property and event watch.
  */
  onStartPropertyWatch: function onStartPropertyWatch(deviceId, event, property) {
    console.debug("onStartPropertyWatch -- ", deviceId, event, property);
    var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";

    // remove d. and g. prefix
    if (property) {
      property = this.normalizeProperty(property);
    }

    // check before we modify the list of watches
    var alreadyWatchingEvent = this.isWatchingEvent(deviceId, event);

    // this is the first time somebody is subscribing for that property
    if (!this.isWatching(deviceId, event, property)) {
      this.addWatch(deviceId, event, property);

      // only subscribe if we are the first property watch to match this event
      if (this.isWatchingEvent(deviceId, event) === 1) {
        // is there already a connection? -> subscribe right away
        if (this.state == State.CONNECTED) {
          this.client.subscribe(topic);
        }
      }
    }

    // check if someone already requested that event
    if (alreadyWatchingEvent > 0) {
      // Somebody already subscribed for this property.
      // Option 1: We find something in cache
      // Option 2: There is nothing in cache, but there must be an inflight historian request -> just wait and do nothing

      // check if we find historic values in cache
      this.publishCachedValues(deviceId, event);
      return;
    } else {
      // This is the first request for this event. Make it an event request to avoid duplicate historian calls.
      property = null;
    }

    // TODO Avoid duplicate historian calls for multiple properties of an event

    // call historian API to fetch last value for this event

    // get credentials for historian request
    var auth = IoTFAuthStore.getAuth();
    auth = {
      ltpa: encodeURIComponent(auth.ltpa),
      org: encodeURIComponent(auth.org),
      apiKey: encodeURIComponent(auth.apiKey),
      apiToken: encodeURIComponent(auth.apiToken)
    };

    var self = this;
    this.getDeviceType(deviceId, function (deviceType) {
      // get the last 100 messages of that event to get the latest values
      var now = new Date().getTime();
      var historianUrl = "/api/v0002/historian/types/" + deviceType + "/devices/" + deviceId + "?evt_type=" + event + "&start=" + (now - self.lastValueInterval) + "&end=" + now;
      var opts = {
        url: historianUrl,
        contentType: "application/json"
      };
      if (auth.apiKey != null) {
        // if running as localhost
        opts.url += "&org=" + auth.org + "&apiKey=" + auth.apiKey + "&apiToken=" + auth.apiToken;
      }

      console.debug(" -> query historian -- ", deviceId, event, property);

      // Queue the requests to avoid having 50 request at a time. This would result in slow interaction and
      // delayed image loading
      self.queueHistorianRequests(opts);
    });
  },

  /**
  * Do not send all historian requests at a time. Images would not load for seconds and UI would be slow.
  */
  queueHistorianRequests: function queueHistorianRequests(opts) {
    var self = this;
    this.historianRequests.push(opts);
    if (!this.historianTimer) {
      this.historianTimer = setTimeout(function () {
        self.historianTimer = null;
        self.performHistorianRequest();
      }, this.historianRequestDelay);
    }
  },

  performHistorianRequest: function performHistorianRequest() {
    var self = this;
    if (this.historianRequests.length > 0) {
      if (!this.historianTimer) {
        this.historianTimer = setTimeout(function () {
          self.historianTimer = null;
          self.performHistorianRequest();
        }, this.historianRequestDelay);
      }

      var opts = this.historianRequests.shift();
      $.ajax(opts).done(function (response) {
        try {
          if (response.events) {

            // add result to cache, beginning with oldest to the newest event
            var items = response.events;
            var deviceId = null;
            var event = null;
            for (var i = items.length - 1; i >= 0; i--) {
              var item = items[i];
              deviceId = item.device_id;
              event = item.evt_type;
              self.addToCache(item.device_id, item.evt_type, item.evt, item.timestamp["$date"]);
            }

            self.publishCachedValues(deviceId, event);
          } else {
            // handle bad result?
          }
        } catch (e) {
          console.error(e);
        }
      }).fail(function (response) {
        console.error(response);
      });
    }
  },

  onStopPropertyWatch: function onStopPropertyWatch(deviceId, event, property) {
    console.debug("onStopPropertyWatch -- ", deviceId, event, property);
    delete this.watches.properties[this.watches.properties.indexOf(deviceId + "_|_" + event + "_|_" + property)];

    // only unsubscribe if there are no other properties watched on this event,
    // or if the event is being watched separately
    for (var i in this.watches.properties) {
      if (this.watches.properties[i].split("_|_")[0] === deviceId && this.watches.properties[i].split("_|_")[1] === event) {
        return;
      }
    }

    var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
    console.debug("unsubscribing from " + topic);
    this.client.unsubscribe(topic);
  }
});

module.exports = IoTFDeviceStore;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/Const.js","./IoTFAuthStore.js":"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFAuthStore.js"}],"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFUsageStore.js":[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Const = require('../../Dashboard/util/Const');
var IoTFAuthStore = require('./IoTFAuthStore.js');

var Actions = Reflux.createActions(['fetchDeviceCount', 'fetchDataTrafficUsage', 'fetchActiveDeviceUsage', 'fetchHistoricalDataUsage', 'fetchDeviceTypes']);

var IoTFUsageStore = Reflux.createStore({

	Actions: Actions,

	state: Const.DISCONNECTED,

	auth: {

		// org: encodeURIComponent("6qkzjf"),
		// apiKey: encodeURIComponent("a-6qkzjf-3egnjdo5qy"),
		// apiToken: encodeURIComponent("CW-aWx_sGeFGc&F?ls")

		// org: "jgccc5",
		// apiKey: "a-jgccc5-tkutlvvnem",
		// apiToken: "YfqMJVD18qcH@ispr0"

	},

	init: function init() {
		var self = this;
		this.listenTo(Actions.fetchDeviceTypes, this.onFetchDeviceTypes);
		this.listenTo(Actions.fetchDeviceCount, this.onFetchDeviceCount);
		this.listenTo(Actions.fetchDataTrafficUsage, this.onFetchDataTrafficUsage);
		this.listenTo(Actions.fetchActiveDeviceUsage, this.onFetchActiveDeviceUsage);
		this.listenTo(Actions.fetchHistoricalDataUsage, this.onFetchHistoricalDataUsage);

		IoTFAuthStore.listen(function (payload) {
			console.log("Retrieving auth:");
			self.auth = {
				ltpa: payload.ltpa !== null ? encodeURIComponent(payload.ltpa) : null,
				domain: encodeURIComponent(payload.domain),
				org: encodeURIComponent(payload.org),
				apiKey: payload.apiKey !== null ? encodeURIComponent(payload.apiKey) : null,
				apiToken: payload.apiToken !== null ? encodeURIComponent(payload.apiToken) : null
			};
			console.log(self.auth);
		});
	},

	onFetchDeviceCount: function onFetchDeviceCount() {
		//var deviceUrl = "https://" + IoTFCredentials.org + ".internetofthings.ibmcloud.com/";
		var opts = {
			url: "/api/v0002/bulk/devices",
			contentType: "application/json"
		};
		if (this.auth.apiKey !== null && this.auth.domain && this.auth.domain.match("internetofthings") === null) {
			// if running as localhost
			opts.url += "?org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		} else if (this.auth.ltpa === null && this.auth.apiKey !== null && this.auth.apiToken !== null) {
			opts.headers = {
				"Authorization": "Basic " + btoa(this.auth.apiKey + ":" + this.auth.apiToken)
			};
		}
		console.log(opts);
		var self = this;
		$.ajax(opts).done(function (response) {
			console.log(response);
			try {
				if (response.meta && response.meta.total_rows) {
					self.trigger({
						deviceCount: response.meta.total_rows
					});
				} else {
					// handle bad result?
				}
			} catch (e) {
				console.error(e);
			}
		}).fail(function (response) {
			console.error(response);
		});
	},

	onFetchDeviceTypes: function onFetchDeviceTypes() {
		//var deviceUrl = "https://" + IoTFCredentials.org + ".internetofthings.ibmcloud.com/";
		var opts = {
			url: "/api/v0001/device-types",
			contentType: "application/json"
		};
		console.log("DOMAIN", this.auth.domain);
		console.log("AUTH", this.auth);
		//		if (this.auth.apiKey !== null && this.auth.domain && this.auth.domain.match("internetofthings") === null) {
		if (this.auth.apiKey !== null && location.hostname.match("internetofthings") === null) {
			// if running as localhost
			opts.url += "?org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		} else if (this.auth.ltpa === null && this.auth.apiKey !== null && this.auth.apiToken !== null) {
			opts.headers = {
				"Authorization": "Basic " + btoa(this.auth.apiKey + ":" + this.auth.apiToken)
			};
		}
		console.log(opts);
		var self = this;

		var sortDeviceTypes = function sortDeviceTypes(a, b) {
			if (!a || !b) {
				return 0;
			}
			if (a.count < b.count) {
				return 1;
			}
			if (a.count > b.count) {
				return -1;
			}
		};

		$.ajax(opts).done(function (response) {
			console.log(response);
			try {
				response.sort(sortDeviceTypes);
				self.trigger({
					deviceTypes: response
				});
			} catch (e) {
				console.error(e);
			}
		}).fail(function (response) {
			console.error(response);
		});
	},

	onFetchDataTrafficUsage: function onFetchDataTrafficUsage() {
		console.debug("IoTFUsageStore::onFetchDataTrafficUsage");

		var today = new Date();
		var offset = -today.getTimezoneOffset(); // convert to UTC
		today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0 + offset, -1);
		var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0 + offset);
		var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0 + offset, 0);
		var rangeStart = lastMonthStart.toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		// FLM: This API does not show sensible values
		// var lastMonthOpts = {
		// 	url: "/api/v0002/usage/data-traffic?start="+lastMonthStart+"&end="+lastMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ dataTrafficUsageLastMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	lastMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		// var thisMonthOpts = {
		// 	url: "/api/v0002/usage/data-traffic?start="+thisMonthStart+"&end="+thisMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ dataTrafficUsageThisMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	thisMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		//$.ajax(lastMonthOpts);
		//$.ajax(thisMonthOpts);

		var rangeOpts = {
			url: "/api/v0002/usage/data-traffic?start=" + rangeStart + "&end=" + rangeEnd + "&detail=true",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						var days = response.days;
						var sumThisMonth = 0;
						var sumLastMonth = 0;
						var todaysConsumption = 0;
						for (var i in days) {
							var date = new Date(days[i].date);
							var offset = -date.getTimezoneOffset(); // convert to UTC
							date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0 + offset, 0);

							var day = days[i];
							if (lastMonthStart <= date && thisMonthStart > date) {
								sumLastMonth += day.total;
							} else if (thisMonthStart <= date && today >= date) {
								sumThisMonth += day.total;
							}
							// handle todays entry
							if (i == days.length - 1) {
								todaysConsumption = day.total;
							}

							days[i].total = parseFloat((day.total / 1048576).toFixed(3));
						}
						// consumption this month
						sumThisMonth = sumThisMonth / 1048576;
						sumLastMonth = sumLastMonth / 1048576;
						todaysConsumption = todaysConsumption / 1048576;
						self.trigger({
							dataTrafficUsageDetails: days,
							dataTrafficUsageThisMonth: sumThisMonth.toFixed(1) + " MB",
							dataTrafficUsageLastMonth: sumLastMonth.toFixed(1) + " MB",
							dataTrafficUsageToday: todaysConsumption.toFixed(1) + " MB"
						});
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			rangeOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		$.ajax(rangeOpts);
	},

	onFetchActiveDeviceUsage: function onFetchActiveDeviceUsage() {
		console.debug("IoTFUsageStore::onFetchActiveDeviceUsage");

		var today = new Date();
		var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split("T")[0];
		var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
		var thisMonthEnd = today.toISOString().split("T")[0];
		var rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		var lastMonthOpts = {
			url: "/api/v0002/usage/active-devices?start=" + lastMonthStart + "&end=" + lastMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						self.trigger({ activeDeviceUsageLastMonth: response.average.toFixed(1) });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey !== null) {

			// if running as localhost
			lastMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var thisMonthOpts = {
			url: "/api/v0002/usage/active-devices?start=" + thisMonthStart + "&end=" + thisMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						self.trigger({ activeDeviceUsageThisMonth: response.average.toFixed(1) });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			thisMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var rangeOpts = {
			url: "/api/v0002/usage/active-devices?start=" + rangeStart + "&end=" + rangeEnd + "&detail=true",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						self.trigger({ activeDeviceUsageDetails: response.days });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			rangeOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		console.log(lastMonthOpts, thisMonthOpts);

		$.ajax(lastMonthOpts);
		$.ajax(thisMonthOpts);
		$.ajax(rangeOpts);
	},

	onFetchHistoricalDataUsage: function onFetchHistoricalDataUsage() {
		console.debug("IoTFUsageStore::onFetchActiveDeviceUsage");

		var today = new Date();
		var offset = -today.getTimezoneOffset(); // convert to UTC
		today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0 + offset, -1);
		var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0 + offset);
		var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0 + offset, 0);
		var rangeStart = lastMonthStart.toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		// var lastMonthOpts = {
		// 	url: "/api/v0002/usage/historical-data?start="+lastMonthStart+"&end="+lastMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ historicalDataUsageLastMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	lastMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		// var thisMonthOpts = {
		// 	url: "/api/v0002/usage/historical-data?start="+thisMonthStart+"&end="+thisMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ historicalDataUsageThisMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	thisMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		// $.ajax(lastMonthOpts);
		// $.ajax(thisMonthOpts);

		var rangeOpts = {
			url: "/api/v0002/usage/historical-data?start=" + rangeStart + "&end=" + rangeEnd + "&detail=true",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						var days = response.days;
						var valueThisMonth = 0;
						var valueLastMonth = 0;
						var todaysConsumption = 0;
						var lastValue = 0;
						for (var i in days) {
							var date = new Date(days[i].date);
							var offset = -date.getTimezoneOffset(); // convert to UTC
							date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0 + offset, 0);

							var day = days[i];
							if (lastMonthStart <= date && thisMonthStart > date) {
								if (day.total > valueLastMonth) {
									valueLastMonth = day.total;
								}
							} else if (thisMonthStart <= date && today >= date) {
								if (day.total > valueThisMonth) {
									valueThisMonth = day.total;
								}
							}
							// handle todays entry
							if (i == days.length - 1) {
								todaysConsumption = day.total - lastValue;
								if (todaysConsumption < 0) {
									todaysConsumption = 0;
								}
								if (date.getDate() == 1) {
									todaysConsumption = day.total;
								}
							}
							lastValue = day.total;
							days[i].total = parseFloat((day.total / 1024).toFixed(3));
						}
						// consumption this month
						valueThisMonth = valueThisMonth / 1024;
						valueLastMonth = valueLastMonth / 1024;
						todaysConsumption = todaysConsumption / 1024;

						self.trigger({
							historicalDataUsageDetails: days,
							historicalDataUsageThisMonth: valueThisMonth.toFixed(1) + " MB",
							historicalDataUsageLastMonth: valueLastMonth.toFixed(1) + " MB",
							dataUsageToday: todaysConsumption.toFixed(1) + " MB"
						});
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			rangeOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		$.ajax(rangeOpts);
	}
});

module.exports = IoTFUsageStore;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":"/Users/frank/Documents/Projects/IOTFoundation/components/Dashboard/util/Const.js","./IoTFAuthStore.js":"/Users/frank/Documents/Projects/IOTFoundation/components/common/stores/IoTFAuthStore.js"}]},{},["/Users/frank/Documents/Projects/IOTFoundation/components/common/common.jsx"])("/Users/frank/Documents/Projects/IOTFoundation/components/common/common.jsx")
});
//# sourceMappingURL=IoTFCommon.js.map
