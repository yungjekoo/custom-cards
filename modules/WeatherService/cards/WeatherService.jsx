var React = require('react');
var IoTFCommon = require('IoTFCommon');

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
}

var path = "resources/images/";

var days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

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
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    location: RPT.string
  },

  getDefaultProps: function() {
    return {
      plots: [],
      data: {}
    };
  },

  getInitialState: function() {
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

    }
  },

  componentDidMount: function() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    if (this.props.plots && this.props.plots.length > 0) {
    	var plot = this.props.plots[0];
    	// we just listen for the event since the properties are hardcoded
        IoTFDeviceStore.Actions.startEventWatch(plot.device, plot.event);
    }
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {

    if (this.props.plots && this.props.plots.length > 0) {
      var plot = this.props.plots[0];
      if (payload.deviceEvent
          && payload.deviceEvent.deviceId == plot.device
          && payload.deviceEvent.eventType == plot.event) {

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
          setTimeout(function() {
            self.setState(model);
          },1);
        }
      }
    }


  },

  addData: function(payload, property, model) {
    var property = IoTFDeviceStore.normalizeProperty(property);
    var obj = payload[property];

	  if (obj !== undefined) {
   		model[property] = obj;
	  }

    return model;
  },

	getDayText: function(dayOfWeek) {
		dayOfWeek = dayOfWeek%7;
		var text = this.props.nls.resolve(days[dayOfWeek]);
		return text;
	},

	getContentToday: function() {
		var today = (new Date()).getDay();

		var html = "<table class='shWeatherTodayTable'><tbody>"+
					"<tr>" +
					"<td>" + this.props.nls.resolve("High") + " " + this.state.TodayHigh + "°</td>" +
					"<td rowspan='3'><img class='shWeatherTodayIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>" +
					"<td rowspan='3' class='shWeatherTodayValue'>" + this.state.Temperature + "°</td>" +
					"</tr>" +
					"<tr>" +
					"<td class='shWeatherTodayCity'>" + this.state.Location + "</td>" +
					"</tr>" +
					"<tr>" +
					"<td>" + this.props.nls.resolve("Low") + " " + this.state.TodayLow + "°</td>" +
					"</tr>" +
					"</tbody></table>";

		return html;
	},

	getContentSmall: function() {
		var today = (new Date()).getDay();

		var html = "<table class='shWeatherSmallTable'><tbody>"+
					"<tr>" +
					"<td rowspan='3'><img class='shWeatherSmallIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>" +
					"<td class='shWeatherSmallHighLow'>H: " + this.state.TodayHigh + "°</td>" +
					"</tr>" +
					"<tr>" +
					"<td class='shWeatherSmallValue'>" + this.state.Temperature + "°</td>" +
					"</tr>" +
					"<tr>" +
					"<td class='shWeatherSmallHighLow'>L: " + this.state.TodayLow + "°</td>" +
					"</tr>" +
					"</tbody></table>";

		return html;
	},

	getContentForecast: function() {
		var today = (new Date()).getDay();

		var html =  "<table class='shWeatherForecastTable'><tbody>"+
					"<tr class='shWeatherForecastHeader'>" +
					"<td>" + this.getDayText(today) + "</td>"+
					"<td>" + this.getDayText(today + 1) + "</td>"+
					"<td>" + this.getDayText(today + 2) + "</td>"+
					"</tr>"+
					"<tr>" +
					"<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>"+
					"<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TomorrowIcon] + ".png'></td>"+
					"<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.DATIcon] + ".png'></td>"+
					"</tr>"+
					"<tr>" +
					"<td class='shWeatherForecastHigh'>" + this.state.TodayHigh + "°</td>"+
					"<td class='shWeatherForecastHigh'>" + this.state.TomorrowHigh + "°</td>"+
					"<td class='shWeatherForecastHigh'>" + this.state.DATHigh + "°</td>"+
					"</tr>"+
					"<tr>" +
					"<td class='shWeatherForecastLow'>" + this.state.TodayLow + "°</td>"+
					"<td class='shWeatherForecastLow'>" + this.state.TomorrowLow + "°</td>"+
					"<td class='shWeatherForecastLow'>" + this.state.DATLow + "°</td>"+
					"</tr>"+
					"</tbody></table>";

		return html;
	},

	getContentForecastSmall: function() {
		var today = (new Date()).getDay();

		var html =  "<table class='shWeatherForecastTableSmall'><tbody>"+
					"<tr class='shWeatherForecastHeader'>" +
					"<td>" + this.getDayText(today) + "</td>"+
					"<td>" + this.getDayText(today + 1) + "</td>"+
					"<td>" + this.getDayText(today + 2) + "</td>"+
					"</tr>"+
					"<tr>" +
					"<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TodayIcon] + ".png'></td>"+
					"<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.TomorrowIcon] + ".png'></td>"+
					"<td><img class='shWeatherForecastIcon' src='" + path + iconMap[this.state.DATIcon] + ".png'></td>"+
					"</tr>"+
					"<tr>" +
					"<td class='shWeatherForecastHigh'>" + this.state.TodayHigh + "°</td>"+
					"<td class='shWeatherForecastHigh'>" + this.state.TomorrowHigh + "°</td>"+
					"<td class='shWeatherForecastHigh'>" + this.state.DATHigh + "°</td>"+
					"</tr>"+
					"<tr>" +
					"<td class='shWeatherForecastLow'>" + this.state.TodayLow + "°</td>"+
					"<td class='shWeatherForecastLow'>" + this.state.TomorrowLow + "°</td>"+
					"<td class='shWeatherForecastLow'>" + this.state.DATLow + "°</td>"+
					"</tr>"+
					"</tbody></table>";

		return html;
	},

	getContentDetails: function() {

		var html =  "<table class='shWeatherDetailsTable'><tbody>"+
					"<tr>" +
					"<td rowspan='2' class='shWeatherDetailsIconCell'><img class='shWeatherDetailsIcon' src='" + path + "w20.png'></td>"+
					"<td class='shWeatherDetailsValue'>" + this.state.WindDirection + "</td>"+
					"<td rowspan='2' class='shWeatherDetailsIconCell'><img class='shWeatherDetailsIcon' src='" + path + "w21.png'></td>"+
					"<td class='shWeatherDetailsValue'>" + this.state.Sunset + " h</td>"+
					"<td rowspan='2' class='shWeatherDetailsIconCell'><img class='shWeatherDetailsIcon' src='" + path + "w22.png'></td>"+
					"<td class='shWeatherDetailsValue'>" + this.state.MoonAge + " days</td>"+
					"</tr>"+
					"<tr>" +
					"<td class='shWeatherDetailsValue'>" + this.state.WindSpeed + " km/h</td>"+
					"<td class='shWeatherDetailsValue'>" + this.state.Sunrise + " h</td>"+
					"<td class='shWeatherDetailsValue'>" + this.state.MoonLight + " %</td>"+
					"</tr>"+
					"</tbody></table>";

		return html;
	},

	getContentSideTable: function() {

		var html =  "<table class='shWeatherSideTable'><tbody>"+
					"<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w23.png'><br>" + this.state.Pressure + " mBar</td></tr>"+
					"<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w24.png'><br>" + this.state.Humidity + "</td></tr>"+
					"<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w25.png'><br>" + this.state.DewPoint + " °</td></tr>"+
					"<tr><td class='shWeatherDetailsValue'><img class='shWeatherDetailsIcon' src='" + path + "w26.png'><br>" + this.state.Visibility + " km</td></tr>"+
					"</tbody></table>";

		return html;
	},


  render: function() {
  	var self = this;
    if (this.state !== undefined) {

      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

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
			html = "<table class='shWeatherForecastBaseTabel'><tbody><tr><td>" + this.getContentToday() + "</td><td valign='bottom' rowspan='3' class='shWeatherDetailsSide'>" + this.getContentSideTable() + "</td></tr>" +
					"<tr><td colspan='2'></td></tr>" +
					"<tr><td>" + this.getContentForecast() + "</td><td></td></tr>"+
					"<tr><td colspan='2'>" + this.getContentDetails() + "</td></tr>"+
					"<tbody></table>";
		}

		return (<div style={style} dangerouslySetInnerHTML={{__html: html}}/>)


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
      	return (
		    	<div style={styles.empty}>
			    	<LoadIndicator theme={this.props.theme} useDataPoints={true}/>
		    	</div>
      		)
    }
  }
});

module.exports = WeatherService;
