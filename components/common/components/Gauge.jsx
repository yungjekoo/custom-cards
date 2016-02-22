var d3 = require('d3');
var React = require('react');
var ReactDOM = require('react-dom');
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

	getDefaultProps: function() {
		return {
			minDegree: 45,
			maxDegree: 315,
			min: 0,
			max: 100,
			needle: false
		};
	},

	componentDidMount: function() {
		// create for the first time
		this.createSVG();
	},

	createSVG: function() {
		this.destroySVG();

		var self = this;

		var dom = ReactDOM.findDOMNode(this);
		// var dom = document.createElement("div");
		// root.appendChild(dom);

		this.width = this.props.width?this.props.width:container.offsetWidth;
		this.height = this.props.height?this.props.height:container.offsetHeight;
		var pi = Math.PI * 2;
		var radius = Math.min(this.width, this.height) / 2;
		var startAngle = this.props.minDegree/360*pi - pi/2;
		var endAngle = this.props.maxDegree/360*pi - pi/2;

		var group = d3
			.select(dom)
			.append('svg')
			.attr('width', +this.width)
			.attr('height', +this.height)
			.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
			.attr('preserveAspectRatio', 'xMinYMin meet')
			.append("g")
			.attr("transform", "translate(" + this.width / 2 + "," + this.height / 2  + ")");

		// the scale to show the full range
		var scaleArc = d3.svg.arc()
			.innerRadius(radius-40)
			.outerRadius(radius-25)
			.startAngle(startAngle)
			.endAngle(endAngle);

		var scale = group.append("path")
			.attr("fill", this.props.theme.minor)
			.attr("d", scaleArc);

		// the value segment
		this.valueSegment = group.append("path")
			.datum({endAngle: 0, startAngle: 0})
			.attr("fill", this.props.theme.normal);

		// the textual value
		this.label = group.append("svg:text")
				.attr("dy", "-10px")
				.attr("text-anchor", "middle")
				.attr("font-size", "40px")
				.attr("font-weight", "200")
				.attr("fill",this.props.theme.normal);

		// the unit indicator
		if (this.props.unit) {
			var unit = group.append("svg:text")
					.attr("dy", "20px")
					.attr("text-anchor", "middle")
					.attr("font-size", "16px")
					.attr("font-weight", "200")
					.attr("fill",this.props.theme.minor)
					.text(this.props.unit);
		}

		// threshold indicator
		var tickSteps = (this.props.maxDegree - this.props.minDegree)/100;
		var range = this.props.max - this.props.min;

		for (var i = 0; i <= 100; i++) {
			var line = group.append("svg:line")
							.attr("x1", this.width/2-20)
							.attr("x2", this.width/2-10)
							.attr("y1", 0)
							.attr("y2", 0)
							.attr("stroke-width","2");

			if (this.props.lowerThresholdMeaning && this.props.lowerThresholdMeaning != "NONE" && i <= (this.props.lowerThreshold-this.props.min)/range*100) {
				line.attr("stroke", this.props.theme[this.props.lowerThresholdMeaning]);
			} else if (this.props.middleThresholdMeaning && this.props.middleThresholdMeaning != "NONE" && i > (this.props.lowerThreshold-this.props.min)/range*100 && i < (this.props.upperThreshold-this.props.min)/range*100) {
				line.attr("stroke", this.props.theme[this.props.middleThresholdMeaning]);
			} else if (this.props.upperThresholdMeaning && this.props.upperThresholdMeaning != "NONE" && i >= (this.props.upperThreshold-this.props.min)/range*100) {
				line.attr("stroke", this.props.theme[this.props.upperThresholdMeaning]);
			} else {
				line.attr("stroke", this.props.theme.minor);
			}

			line.attr("transform", "rotate(" + (this.props.minDegree + tickSteps*i + 90) + ")");

		}

		this.updateSVG();
	 },

	 destroySVG: function() {
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

	updateSVG: function() {
		// handle precision
		var value = this.props.value?this.props.value:0;

		if (this.props.precision !== undefined) {
			value = value.toFixed(this.props.precision);
		}
		var pi = Math.PI * 2;

		var radius = Math.min(this.width, this.height) / 2;
		var startAngle = this.props.minDegree/360*pi - pi/2;
		var endAngle = this.props.maxDegree/360*pi - pi/2;
		var val = (value - this.props.min)/(this.props.max - this.props.min);
		val = val*(endAngle-startAngle) + startAngle;
		val = Math.min(val, endAngle);
		val = Math.max(val, startAngle);
		
		var arc, arcTween;

		this.label.text(value);

		if (this.props.needle) {
			// show only a simple tick
			arc = d3.svg.arc()
				.innerRadius(radius-50)
				.outerRadius(radius-25);

			arcTween = function(transition, newAngle) {
				transition.attrTween("d", function(d) {
					if (d) {
						var interpolate = d3.interpolate(d.endAngle, newAngle);
						return function(t) {
							var val = interpolate(t);
							d.endAngle = val;
							d.startAngle = val-0.05;
							return arc(d);
						};
					}
				});
			};
		} else {
			// show the full segment
			arc = d3.svg.arc()
				.innerRadius(radius-40)
				.outerRadius(radius-25)
				.startAngle(startAngle);

			arcTween = function(transition, newAngle) {
				transition.attrTween("d", function(d) {
					if (d) {
						var interpolate = d3.interpolate(d.endAngle, newAngle);
						return function(t) {
							d.endAngle = interpolate(t);
							return arc(d);
						};
					}
				});
			};
		}

		this.valueSegment.transition()
			.duration(750)
			.call(arcTween, val);
	},

	componentWillUnmount: function() {
		this.destroySVG();
	},

	componentDidUpdate: function(prevProps, prevState) {
		this.updateSVG();
		this.checkIfPropsChanged(prevProps, this.props);
	},

      checkIfPropsChanged: function(a, b) {
		if (JSON.stringify(a.theme) != JSON.stringify(b.theme) ||
			a.min != b.min ||
			a.max != b.max||
			a.unit != b.unit||
			a.lowerThresholdMeaning != b.lowerThresholdMeaning ||
			a.middleThresholdMeaning != b.middleThresholdMeaning ||
			a.upperThresholdMeaning != b.upperThresholdMeaning ||
			a.lowerThreshold != b.lowerThreshold ||
			a.upperThreshold != b.upperThreshold ||
			a.unit != b.unit ||
	  		a.min != b.min ||
	  		a.max != b.max ||
			a.precision != b.precision ||
			a.width != b.width ||
			a.height != b.height) {
			this.createSVG();
		}
	},

	render: function() {
        var style = Object.assign({}, styles.container, {width: this.props.width + "px", height: this.props.height + "px"}, this.props.style?this.props.style:{});
		return (
			<div style={style}>
			</div>
		);
	}
});

module.exports = Gauge;
