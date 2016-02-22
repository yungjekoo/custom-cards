var React = require('react');

var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');

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
  scroller: {
  	width: "100%",
  	position: "absolute",
  	top: 0,
  	left: 0,
  	transition: "top 0.5s ease"
  },
  floor: {
  	width: "110px",
  	fontSize: "60px",
  	fontWeight: 100,
  	textAlign: "center",
  	verticalAlign: "middle",
  	lineHeight: "120px",
  	transition: "fontSize 1s ease"
  },
  highlight: {
  	position: "absolute",
  	width: "100%",
  	height: "120px",
  	opacity: 0.5,
  	transition: "bottom 1s ease"
  },
  cabin: {
  	position: "absolute",
  	height: "100px",
  	width: "60px",
  	fontWeight: 200,
  	border: "3px solid grey",
  	backgroundColor: "white",
  	left: "120px",
  	transition: "bottom 1s ease",
  	verticalAlign: "middle",
  	textAlign: "center",
  	fontSize: "24px",
  	lineHeight: "normal",
  	paddingTop: "20px"
  },
  weightBar: {
  	position: "absolute",
  	width: "100%",
  	height: "0px",
  	bottom: "0px",
  	left: "0px",
  	transition: "height 1s ease",
  	overflow: "hidden"
  },
  weightBarContainer: {
  	height: "100px",
  	width: "100%",
  	position: "absolute",
  	bottom: "-2px",
  	lineHeight: "normal",
  	paddingTop: "20px"
  },
  scale: {
  	position: "absolute",
  	top: "60px",
  	bottom: "60px",
  	width: "20px",
  	right: "13px"
  },
  scaleAxis: {
  	height: "100%",
  	position: "absolute",
  	left: "9px",
  	borderLeft: "3px solid grey"
  },
  tick: {
  	fontSize: "20px",
  	lineHeight: "20px",
  	backgroundColor: "white",
  	width: "30px",
  	position: "absolute",
  	padding: "4px 0px",
  	textAlign: "center",
  	left: "-5px"
  },
  simpleTick: {
  	borderBottom: "3px solid grey",
  	width: "9px",
  	position: "absolute",
  	left: "5px"
  },
  heightLabel: {
  	position: "absolute",
  	fontSize: "20px",
  	lineHeight: "30px",
  	height: "30px",
  	right: "48px",
  	width: "65px",
  	textAlign: "right",
  	paddingRight: "0px",
  	transition: "bottom 1s ease"
  },
  labelText: {
  	width: "100%",
  	height: "100%",
  	position: "absolute"
  },
  pointer: {
  	width: "20px",
  	height: "20px",
  	transform: "rotate(45deg)",
  	right: "-10px",
  	top: "6px",
  	position: "absolute"
  }
}

var Elevator = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    minFloor: RPT.number,
    maxFloor: RPT.number,
    minHeight: RPT.number,
    maxHeight: RPT.number,
    capacity: RPT.number,
    floor: RPT.string,
    height: RPT.string,
    weight: RPT.string
  },

  getDefaultProps: function() {
    return {
      plots: [],
      data: {}
    };
  },

  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function() {
    this.sub = IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var model = {};

    model = this.addData(payload, "floor", model);
    model = this.addData(payload, "height", model);
    model = this.addData(payload, "weight", model);

	if (Object.keys(model).length > 0) {
		model.timestamp = new Date().getTime();
		var self = this;
		setTimeout(function() {
			self.setState(model);
		},1);
	}
  },

  getPlot: function(type) {
  	var prop = this.props[type];
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot.id == prop) {
        return plot;
      }
    }
    return null;
  },

  addData: function(payload, type, model) {
    var plot = this.getPlot(type);

  	if (plot) {
  		if (payload.deviceEvent
  		    && payload.deviceEvent.deviceId == plot.device
  		    && payload.deviceEvent.eventType == plot.event) {

        var property = IoTFDeviceStore.normalizeProperty(plot.property);
        var obj = payload.deviceEvent.data[property];

  		  if (obj !== undefined) {
  	   		model[type] = obj;
  		  }
  		}
    }

    return model;
  },

  render: function() {
  	var self = this;
    if (this.state.floor !== undefined ||
    	this.state.height !== undefined ||
    	this.state.weight !== undefined) {

      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

  		// create array of floor names
  		var floors = [];
  		var floorPlot = this.getPlot("floor");
  		var floorMin = floorPlot.min !== undefined?floorPlot.min:0;
  		var floorMax = floorPlot.max !== undefined?floorPlot.max:5;
  		for (var i = floorMax; i >= floorMin; i-- ) {
  			floors.push("" + i);
  		}
  		var currentFloor = this.state.floor !== undefined?this.state.floor-floorMin:floorMin;
  		var highlight = Object.assign({}, styles.highlight, {backgroundColor: this.props.theme.light, bottom: 120*currentFloor + "px"});

  		// prepare height scale and cabin
  		var scale = [];
  		var heightPlot = this.getPlot("height");
  		var heightMin = Math.floor(heightPlot.min !== undefined?heightPlot.min:0);
  		var heightMax = Math.floor(heightPlot.max !== undefined?heightPlot.max:20);
  		for (var i = heightMax; i >= heightMin; --i ) {
 			scale.push(i);
  		}
  		var currentHeight = this.state.height !== undefined?this.state.height-heightMin:heightMin;
  		var heightFactor = 120/((heightMax - heightMin)/(floorMax - floorMin));
  		var cabin = Object.assign({}, styles.cabin, {borderColor: this.props.theme.normal, backgroundColor: this.props.theme.content, color: this.props.theme.major, bottom: heightFactor*currentHeight+10 + "px"});
  		var label = Object.assign({}, styles.heightLabel, {backgroundColor: this.props.theme.light, color: this.props.theme.content, bottom: heightFactor*currentHeight+40 + "px"});
  		var labelText = Object.assign({}, styles.labelText, {backgroundColor: this.props.theme.light});
  		var pointer = Object.assign({}, styles.pointer, {backgroundColor: this.props.theme.light});

  		// prepare weight indicator
  		var weight = [];
  		var weightPlot = this.getPlot("weight");
  		var weightMin = 0;
  		var weightMax = weightPlot.max !== undefined?weightPlot.max:2000;
  		var currentWeight = (this.state.weight/weightMax)*100;
  		var weightBar = Object.assign({}, styles.weightBar, {backgroundColor: this.props.theme.normal, color: this.props.theme.content, height: currentWeight + "px"});

  		var contentHeight = (floorMax - floorMin)*120;
  		var containerHeight = this.props.wrapper.realHeight;

  		var top = Math.min(contentHeight - currentFloor*120, contentHeight - (heightFactor*currentHeight));
  		var bottom = Math.max(contentHeight - currentFloor*120 + 120, contentHeight - (heightFactor*currentHeight+120));

  		var scrollPos = this.scrollPos?this.scrollPos:0;
  		if (bottom + scrollPos > containerHeight) {
			scrollPos = -(bottom - containerHeight);
  		} else if (top + scrollPos < 0) {
  			scrollPos = 0 - top;
  		}
  		this.scrollPos = scrollPos;
  		var scroller = Object.assign({}, styles.scroller, {top: scrollPos + "px"});

      return (
        <div style={style}>
        	<div style={scroller}>
        		<div style={styles.scale}>
        			<div style={styles.scaleAxis}>
        			</div>
        			{scale.map(function(item) {
        				if (item%5 == 0) {
					  		var tick = Object.assign({}, styles.tick, {backgroundColor: self.props.theme.content, color: self.props.theme.minor, bottom: heightFactor*item-20 + "px"});
	        				return (
	        					<div key={item} style={tick}>
	        					{item}
	        					</div>
	        					)
        				} else {
					  		var tick = Object.assign({}, styles.simpleTick, {borderColor: self.props.theme.minor, bottom: heightFactor*item-10 + "px"});
	        				return (
	        					<div key={item} style={tick}>
	        					</div>
	        					)
        				}
        			})}
        		</div>
        		<div style={highlight}>
        		</div>
        		<div style={styles.floors}>
        			{floors.map(function(item) {
        				var floor = Object.assign({}, styles.floor, (""+self.state.floor == item)?{fontSize: "100px"}:{});
        				return (
        					<div key={item} style={floor}>
        						{item}
        					</div>
        					)
        			})}
        		</div>
        		<div style={cabin}>
    				{this.state.weight} kg
        			<div style={weightBar}>
        				<div style={styles.weightBarContainer}>
	        				{this.state.weight} kg
        				</div>
        			</div>
        		</div>
        		<div style={label}>
        			<div style={pointer}>
        			</div>
        			<div style={labelText}>
	        			{this.state.height} m
        			</div>
        		</div>
        	</div>
        </div>
      )

    } else {
      if (!this.props.floor || !this.props.height || !this.props.weight) {
        return <div style={styles.empty}>No all data point defined</div>
      } else {
      	return (
		    	<div style={styles.empty}>
			    	<LoadIndicator theme={this.props.theme} useDataPoints={true}/>
		    	</div>
      		)
      }
    }
  }
});

module.exports = Elevator;
