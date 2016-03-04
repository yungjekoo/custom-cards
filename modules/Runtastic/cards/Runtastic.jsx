var React = require('react');
var IoTFCommon = require('IoTFCommon');

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
}

var Runtastic = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array
  },

  getDefaultProps: function() {
    return {
      plots: [],
      data: {}
    };
  },

  getInitialState: function() {
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

  render: function() {
  	var self = this;
    if (this.state["date"]) {

      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

		var html = "";
		var height = this.props.wrapper.height;
		var width = this.props.wrapper.width;


		var seconds = Math.floor(this.state["duration"]/1000);
		var hours = Math.floor(seconds/3600);
		seconds = seconds - hours*3600;
		var minutes = Math.floor(seconds/60);
		seconds = seconds - minutes*60;

    var dateString = this.state["date"];
    // handle messed up date format (missing leading 0 for hours below 10)
    var tokens = dateString.split("T");
    dateString = tokens[0] + "T" + ((tokens[1].length < 8)?"0":"") + tokens[1];

		var dateObj = new Date(dateString);

		var main = 	<div>
						<CardDatapoint theme={this.props.theme} unit="Start time">
							{dateObj.toLocaleString().replace(","," ")}
			            </CardDatapoint>
						<CardDatapoint theme={this.props.theme} unit="Distance">
							{this.state["distance"]} m
			            </CardDatapoint>
						<CardDatapoint theme={this.props.theme} unit="Duration">
							{hours} h {minutes} m {seconds} s
			            </CardDatapoint>
					</div>

		var paceSeconds = this.state["pace"];
		var paceMinutes = Math.floor(paceSeconds);
		paceSeconds = Math.floor((paceSeconds - paceMinutes)*60);

		var sub = 	<div>
						<CardDatapoint theme={this.props.theme} unit="Pace">
							{paceMinutes} m {paceSeconds} s per km
			            </CardDatapoint>
						<CardDatapoint theme={this.props.theme} unit="Speed">
							{this.state["speed"].toFixed(2)} km/h
			            </CardDatapoint>
					</div>

		if (height == 3 && width == 2) {

            return (
             	<div style={style}>
             		{main}
            	</div>
            )
		} else if (height == 4 && width == 4) {
			var mapUrl = "http:" + this.state["map"];
			mapUrl = mapUrl.replace("width=50","width=300");
			mapUrl = mapUrl.replace("height=70","height=280");
			return (
             	<div style={style}>
             		{main}
             		{sub}
					<img style={styles.map} src={mapUrl}/>
            	</div>
			)
		} else {
			return (
             	<div style={style}>
             		{main}
            	</div>
			)
		}

    } else {
      	return (
		    	<div style={styles.empty}>
			    	<LoadIndicator theme={this.props.theme} useDataPoints={true}/>
		    	</div>
      		)
    }
  }
});

module.exports = Runtastic;
