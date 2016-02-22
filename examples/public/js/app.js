(function(){


  $(function() {
      FastClick.attach(document.body);
  });

  // A list of the languages for which we supply a message file. These values must
  // match exactly the suffixes of the message files eg messages-pt-br.json.
  var supportedLanguages = ['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'pt-br', 'zh-hans', 'zh-hant'];

  function Translation(){
  }

  function TranslationProvider($translateProvider, $translatePartialLoaderProvider){

    this.setup = function(path){
      path = path || 'nls';

      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: path + '/{part}/messages-{lang}.json'
      })
      .registerAvailableLanguageKeys(
        // A list of the languages for which we supply a message file
        supportedLanguages,
        {
          // A map of language variants to languages in the above list. There should be a
          // wildcard entry in this list for each language we support that has variants.
          'de_*' : 'de',
          'en_*' : 'en',
          'es_*' : 'es',
          'fr_*' : 'fr',
          'it_*' : 'it',
          'ja_*' : 'ja',
          'ko_*' : 'ko',
          'pt_*' : 'pt-br',
          'pt'   : 'pt-br',
          'zh_CN': 'zh-hans',
          'zh_HK': 'zh-hant',
          'zh_TW': 'zh-hant',
          'zh_*' : 'zh-hans',
          'zh'   : 'zh-hans',
          // Fall back to English if the language is neither in the above list nor matched by
          // an entry in this map.
          '*'    : 'en'
        })
      .fallbackLanguage('en') // Fall back to English for keys that are missing in a message file
      .determinePreferredLanguage();
    };

    this.addNLSFolder = function(folder){
      $translatePartialLoaderProvider.addPart(folder);
    };

    this.$get = [function translationFactory() {
      return new Translation();
    }];
  }

  angular
    .module('iotui.common.TranslationProvider', ['pascalprecht.translate'])
    .provider('translation', TranslationProvider)
    .constant('SUPPORTED_LANGUAGES', supportedLanguages);
}());

var myApp = angular.module('myApp', ['react', 'iotui.common.TranslationProvider', 'pascalprecht.translate', 'ngPromiseExtras'])

.config( function myAppConfig ( translationProvider ) {
  "nginject";
  translationProvider.setup();
  // Repeat this line for each subdirectory of /nls that contains message files
  translationProvider.addNLSFolder('react-modules');
});

merge = function() {
  var res = {};
  for (var i = 0; i < arguments.length; ++i) {
    if (arguments[i]) {
      Object.assign(res, arguments[i]);
    }
  }
  return res;
}

var defaultTheme = {
  "canvas": "#142a36",
  "lightText": "#F7F7F7",
  "border": "#E6E6E6",
  "title": "#F7F7F7",
  "titleText": "#899399",
  "content": "#FDFDFD",
  "major": "#2E3636",
  "minor": "#899399",
  "accent": "#4581E0",
  "good": "#8CD210",
  "bad": "#FF5050",
  "font": "'Helvetica Neue',HelveticaNeue,Helvetica,'Segoe UI',Segoe,Calibri,Roboto,'Droid Sans','Arial Unicode MS',Arial,sans-serif",
  "logo": "/assets/dashboard/iot.jpg",

  "light": "#c7c7c7",
  "normal": "#959595",
  "dark": "#5a5a5a",

  "chart": ["#5596E6", "#4178BE", "#325C80", "#264A60", "#1D3649", "#323c3c", "#3c4646", "#5a6464", "#6d7777", "#959f9f"],

  "schemes": [
    { // green
      "name": 0,
      "light": "#c8d2d2",
      "normal": "#8cd211",
      "dark": "#4b8400"
    }
  ]
}

var oldNLS = {
  resolve: function(key) {
    var result = oldNLS[key];
    if (result === undefined) {
      return key;
    } else {
      return result;
    }
  },

  // Customization wizard
  "CUST_DATASET_name": 'Name',
  "CUST_DATASET_event": 'Event',
  "CUST_DATASET_property": 'Property',
  "CUST_DATASET_type": 'Type',
  "CUST_DATASET_unit": 'Unit',
  "CUST_DATASET_minValue": 'Min',
  "CUST_DATASET_maxValue": 'Max',
  "CUST_DATASET_precision": 'Precision',
  "CUST_DATASET_add": 'Connect new data set',
  "SearchDataSource": "Search for data sources using the filter",
  "DeviceID": "Device ID",
  "DeviceType": "Device Type",
  "Settings": "Settings",
  "SourceData": "Card source data",
  "SourceDataExpl": "Specify the data source for the card",
  "ConnectDataSet": "Connect data set",
  "AddPlot": "Add plot",
  "CardType": "Card preview",
  "CardTypeExpl": "Select the card size and specify additional information",
  "CardInformation": "Card information",
  "CardInformationExpl": "Enter title and description of the card",
  "Gallery": "Card type",
  "GalleryExpl": "Select card type",

  // Usage cards
  "ThisMonth": "This month",
  "PreviousMonth": "Previous month",
  "Time": "Time",
  "DevicesNow": "Currently registered",
  "DevicesThisMonth": "This month (daily average)",
  "DevicesPreviousMonth": "Previous month (daily average)",
  "DevicesConnected": "Devices connected",
  "StorageToday": "Storage used today",
  "StorageUsed": "Storage used",
  "DataToday": "Data traffic consumed today",
  "DataConsumed": "Data consumed",
  "DeviceTypeLegendTitle": "Types",
  "DeviceTypesTitle": "registered devices",
  "Other": "Other",

  // Cards
  "Value": "Value",

  // Gallery titles and descriptions
  //    Usage cards
  "COMP_TITLE_DeviceTypes": "Device types",
  "COMP_DESC_DeviceTypes": "A pie chart to display number of devices per device type",
  "COMP_TITLE_UsageDevice": "Registered devices",
  "COMP_DESC_UsageDevice": "Usage statistic for registered charts",
  "COMP_TITLE_UsageData": "Data consumption",
  "COMP_DESC_UsageData": "Usage statistic for data consumption",
  "COMP_TITLE_UsageStorage": "Storage consumption",
  "COMP_DESC_UsageStorage": "Usage statistic for storage consumption",
  "COMP_TITLE_HorizontalLine": "Separator",
  "COMP_DESC_HorizontalLine": "A horizontal separator to structure and group the dashboard",

  //    Device cards
  "COMP_TITLE_RealTimeChart": "Realtime chart",
  "COMP_DESC_RealTimeChart": "A realtime chart to display time series information",

  "COMP_TITLE_BarChart": "Bar chart",
  "COMP_DESC_BarChart": "Horizontal or vertical bar chart to display the current value of data points",
  "COMP_TITLE_DonutChart": "Donut chart",
  "COMP_DESC_DonutChart": "Donut chart to visualize the proportion data points",
  "COMP_TITLE_Value": "Value",
  "COMP_DESC_Value": "Display the value of one or more data points as text, table or chart",
  "COMP_TITLE_Gauge": "Gauge",
  "COMP_DESC_Gauge": "Visualizes the value of a single data point in a range",

  // Customization
  "Horizontal": "Horizontal",
  "DataPoint": "Data point",
  "LowerThreshold": "Lower threshold",
  "UpperThreshold": "Upper threshold",
  "Middle": "Middle",
  "WindowSize": "Window size",
  "KeepDataFor": "Keep data for",
  "Stacked": "Stacked",
  "Steps": "Steps",
  "EnableAutoscroll": "Enable autoscroll",
  "ShowOverview": "Show overview",


  "YES": "Yes",
  "NO": "No",
  "Next": "Next",
  "Back": "Back",
  "Select": "Select",
  "Submit": "Submit",
  "ChangeType": "Change type",
  "Remove": "Remove",
  "Cancel": "Cancel",
  "Save": "Save",
  "Create": "Create",
  "CardTitle": "Title",
  "CardDescription": "Description",
  "DashboardTitle": "Dashboard title",
  "ColorScheme": "Color scheme",
  "Color":"Color",
  "Target":"Target",
  "MinValue":"Mininum value",
  "MaxValue":"Maximum value",
  "MinDegree":"Mininum degree",
  "MaxDegree":"Maximum degree",
  "Precision":"Precision",
  "Unit":"Unit",
  "CreateDashboardPage_TITLE": "Create a new dashboard",
  "CreateDashboardPage_DESC": "Specify a name for the new dashboard. You can add cards to the dashboard after it has been created.",
  "NoOptionsFound":"No matching options",

  "type_string": "Text",
  "type_integer": "Number",
  "type_float": "Float",
  "type_boolean": "Boolean",

   "THRESHOLD_NONE": "n/a",
   "THRESHOLD_GOOD": "good",
   "THRESHOLD_FAIR": "fair",
   "THRESHOLD_CRITICAL": "critical",

   // WeatherService
  "SUN": "Sunday",
  "MON": "Monday",
  "TUE": "Tuesday",
  "WED": "Wednesday",
  "THU": "Thursday",
  "FRI": "Friday",
  "SAT": "Saturday",

  "High": "High",
  "Low": "Low",

  "NoDevicesAdded": "No devices have been added.​",
  "AddDevice": "Add Device"
};

myApp.controller('AppController', ['$rootScope', '$scope', '$http', '$q', '$translate', function($rootScope, $scope, $http, $q, $translate) {
  $scope.SampleTableProps = {
    //results: ["value A", "value B", "value C"]
    nls: {
      resolve: function(component, keys, callback) {
        var translates = [];
        var keysArray = [];
        for (var i in keys) {
          translates.push($translate("react-modules."+component+"."+keys[i]));
          keysArray.push(keys[i]);
        }
        return $q.allSettled(translates)
          .then(function(results){
            var res = { strings: {} };
            for (var i = 0; i < results.length; i++) {
              res.strings[keysArray[i]] = results[i].value;
            }
            callback(res);
          });
      }
    },
    emitter: {
      emit: function(key, value) {
        console.log("emitter.emit", key, value);
        $rootScope.$emit(key, value);
      }
    }
  };
  $scope.sampleTableMouseOverData = "";

  $rootScope.$on("SampleTable.MouseOverData", function(evt, data) {
    console.log(data);
    $scope.sampleTableMouseOverData = data.value;
    $scope.$apply();
  });

  $rootScope.$on("ReactDialog.Close", function(evt, data) {
    console.log(data);
    $scope.AAADialogAddMemberProps = false;
    $scope.AAADialogUserDetailsProps = false;
    $scope.$apply();
  });

  $scope.AAADialogAddMemberProps = {
    theme: defaultTheme,
    nls: oldNLS,
    visible: false,
    emitter: {
      emit: function(key, value) {
        console.log("emitter.emit", key, value);
        $rootScope.$emit(key, value);
      }
    }
  };

  $scope.AAADialogUserDetailsProps = {
    theme: defaultTheme,
    nls: oldNLS,
    visible: false,
    emitter: {
      emit: function(key, value) {
        console.log("emitter.emit", key, value);
        $rootScope.$emit(key, value);
      }
    }
  };

  $scope.triggerDashboard = function(action) {
  	IoTFComponents.Dashboard.callAction(action);
  };
  $rootScope.$on("Dashboard.inEditMode", function(evt, data) {
  	$scope.showEdit = data;
  	$scope.$apply();
  });
  $rootScope.$on("Dashboard.notification", function(evt, data) {
  	console.log("#############################");
  	console.log(evt);
  	console.log(data);
  	// do something
  });
  $scope.loadConfig = function(configURL, dashboardURL) {
    // Specify your test config and dashboard here
    if (configURL) {
    $.ajax({
        url: configURL,
        async: false,
        dataType: 'json',
        success: function (response) {
        $scope.DashboardProps.dashboardConfig = response;
        }
    });
    }
    if (dashboardURL) {
    $.ajax({
        url: dashboardURL,
        async: false,
        dataType: 'json',
        success: function (response) {
        $scope.DashboardProps.defaultDashboard = response;
        }
    });
    }
  };
  $scope.DashboardProps = {
    auth: {
      //org: UserService.getSelectedOrganization().id,
      //ltpa: $cookies.get('LtpaToken2')

      // org: "jgccc5",
      // apiKey: "a-jgccc5-tkutlvvnem",
      // apiToken: "YfqMJVD18qcH@ispr0",

      org: "6qkzjf",
      domain: "internetofthings.ibmcloud.com",   // or "hou02-1.test.internetofthings.ibmcloud.com"
      apiKey: "a-6qkzjf-3egnjdo5qy",
      apiToken: "CW-aWx_sGeFGc&F?ls",


    },
    nls: oldNLS,
    emitter: {
      emit: function(key, value) {
        console.log("emitter.emit", key, value);
        $rootScope.$emit(key, value);
      }
    },
    experimental: true

  };
}]);

myApp.value('Dashboard', window.Dashboard);
myApp.value('SampleTable', window.SampleTable);
