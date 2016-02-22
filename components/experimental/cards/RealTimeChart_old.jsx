var d3 = require('d3');
var React = require('react');
var ReactDOM = require('react-dom');
var Dygraph = require('dygraphs');
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');

/**
* Realtime chart
*/
var styles = {
	container: {
		height: "100%",
		width: "100%",
		color: "black"
	}
};

var RealTimeChart = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object,
		demo: RPT.bool,
		plots: RPT.array,
		range: RPT.number,
		autoscroll: RPT.bool,
		overview: RPT.bool
	},

	getDefaultProps: function() {
		return {
			plots: [],
			range: 60,
			autoscroll: true,
			overview: true
		};
	},

	componentDidMount: function() {
		IoTFDeviceStore.listen(this.onUpdate);
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot) {
				IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
			}
		}

		this.data = [];

		// create for the first time
		this.createGraph();

		var self = this;

		if (this.props.demo) {
			setInterval(function() {
				self.updateGraph([
					(new Date().getTime()),
					Math.round(Math.random()*(100 - (-100)) + -100)
				]);
			}, 1000);
		}

		if (this.props.autoscroll) {
			this.startScrolling();
		} else {
			this.stopScrolling();
		}
	},

	onUpdate: function(payload) {
		var data = [];
		var found = false;
		var count = 0;
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot) {
				//console.debug("checking ", plot.event, " against ", payload.deviceEvent.eventType);
				if (payload.deviceEvent &&
						payload.deviceEvent.deviceId == plot.device &&
						payload.deviceEvent.eventType == plot.event) {

					//console.debug("match");
					var obj = Object.assign({}, payload.deviceEvent.data);
					var propertyPieces = plot.property.split(".");
					for (var j in propertyPieces) {
						var piece = propertyPieces[j];
						obj = obj[piece];
						if (obj === undefined) {
							break;
						}
					}
					//console.log(obj);

					if (obj !== undefined) {
						//console.debug("matched property!");
						data[count++] = obj;
						found = true;
					} else {
						//console.debug("didn't match property");
						data[count++] = null;
					}
				} else {
					//console.debug("no match");
					data[count++] = null;
				}
			}
		}
		if (found) {
			data.unshift(new Date());
			//console.debug("onUpdate is adding data: ", data);
			this.updateGraph(data);
		}
	},

	createGraph: function() {
		console.debug("RealTimeChart::createGraph()");
		this.destroyGraph();

		this.stopScrolling();
		if (this.props.autoscroll) {
			this.startScrolling();
		}

		var container = ReactDOM.findDOMNode(this);

		var dom = document.createElement("div");
		dom.style.height = "100%";
		container.appendChild(dom);

		var width = dom.offsetWidth;
		var height = dom.offsetHeight;

		this.width = width;
		this.height = height;

		if (Object.keys(this.props.plots).length > 0) {
			var labels = ['Time'];
			var fakeEntry = [];
			fakeEntry.push(new Date());
			this.data.push(fakeEntry);

			dgConfig = {
				showRoller: false,
				animatedZooms: true,
				labels: labels,
				legend: "always",
				showLabelsOnHighlight: true,
				connectSeparatedPoints: true,
				ylabel: "",
				includeZero: true,
				fillGraph: false,
				strokeWidth: 2,
				drawPoints: true,
				stepPlot: false,
				stackedGraph: this.props.stacked,
				showRangeSelector: this.props.overview,
				highlightCircleSize: 6,
				highlightSeriesOpts: {
					strokeWidth: 3,
					strokeBorderWidth: 1,
					highlightCircleSize: 5
				}
			};

			var plot;
			for (var i in this.props.plots) {
				console.debug("RealTimeChart loading data: ", this.props.plots[i]);
				plot = this.props.plots[i];
				if (plot) {
					labels.push(plot.label);
					fakeEntry.push(null);
					var colorIndex = 0;
					if (plot.color !== undefined && plot.color < this.props.theme.chart.length) {
						colorIndex = plot.color;
					}
					var color = this.props.theme.chart[colorIndex];

					dgConfig[plot.label] = {
						includeZero: plot.includeZero,
						fillGraph: plot.area,
						strokeWidth: plot.line?1:0,
						drawPoints: plot.dots,
						stepPlot: plot.steps,
						color: color
					};
				}
			}

			dgConfig.labels = labels;

			plot = this.props.plots[Object.keys(this.props.plots)[0]];
			this.graph = new Dygraph(
				dom,
				this.data,
				dgConfig
			);
		}
	},

	 startScrolling: function() {
			this.stopScrolling();
		 var self = this;
			this.scrollInterval = setInterval(function() {
				self.adjustWindow();
			}, this.props.range);
	},

	 stopScrolling: function() {
		if (this.scrollInterval) {
			clearInterval(this.scrollInterval);
		}
	},

	 adjustWindow: function() {
		 if (this.graph) {
			this.graph.updateOptions({'dateWindow': [new Date(new Date().getTime() - this.props.range*1000), new Date()]});
		 }
	 },

	 destroyGraph: function() {
		var dom = ReactDOM.findDOMNode(this);
		while (dom.firstChild) {
			dom.removeChild(dom.firstChild);
		}
	 },

	updateGraph: function(payload) {
		this.data.push(payload);
		if (this.graph) {
			console.debug("updateGraph", this.data);
			this.graph.updateOptions({'file': this.data});
		}
	},

	componentWillUnmount: function() {
		this.stopScrolling();
		this.destroyGraph();
	},

	componentDidUpdate: function(prevProps, prevState) {
		this.createGraph();
	},

	onEnter: function() {
		this.stopScrolling();
	},

	onLeave: function() {
		if (this.props.autoscroll) {
			this.startScrolling();
		}
	},

	render: function() {
		var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
		return (
			<div style={style} onMouseOver={this.onEnter} onMouseOut={this.onLeave}/>
		);
	}
});

module.exports = RealTimeChart;
