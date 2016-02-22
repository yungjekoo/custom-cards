var React = require('react');
var ReactDOM = require('react-dom');
var c3 = require('c3');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');


var styles = {
    container:{
        width: "100%",
        height: "100%"
    }
};

var LineChart = React.createClass({
  propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
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

  getDefaultProps: function() {
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

    getInitialState: function() {
      return {
        data: this.props.initialData?this.props.initialData:[]
      };
    },

    componentDidMount: function() {
      this.createGraph();
    },

     startScrolling: function() {
        this.stopScrolling();
       var self = this;
        this.scrollInterval = setInterval(function() {
          self.adjustWindow();
        }, 1000);
    },

     stopScrolling: function() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval);
      }
    },

     adjustWindow: function() {
       if (this.graph) {
        this.graph.axis.max({
          x: new Date()
        });
        if (this.props.threshold) {
        	var startDate = new Date((new Date()).getTime() - this.props.threshold * 1000);
	        this.graph.axis.min({
	          x: startDate
	        });
        }
        var end = new Date(new Date().getTime() - this.props.range*1000);
        var start = new Date();
        this.graph.internal.config.axis_x_tick_values = this.generateTickValues(end, start);
        this.graph.zoom(
          [end, start]
        );
       }
     },


    createGraph: function() {
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

      this.width = this.props.width?this.props.width:container.offsetWidth;
      this.height = this.props.height?this.props.height:container.offsetHeight;

      var colors = this.props.theme.palette;

      if (this.width > 0 && this.height > 0) {

        dom.style.width = this.width + "px";
        dom.style.height = this.height + "px";

        var now = new Date();
        var before = new Date(now.getTime() - 1000*this.props.range);
        var zoomStart = now;
        var zoomEnd = before;

        var keys = [];
        var colorMap = {};
        var names = {};
        for (var i in this.props. plots) {
          var plot = this.props.plots[i];
          keys.push(plot.id);
          colorMap[plot.id] = colors[i%colors.length];
          names[plot.id] = plot.label;
        }

        var config = {
          size: {
              width: this.width,
              height: this.height
          },
          padding: {
            left: this.props.small?0:50,
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
            type : this.props.steps?"step":"area",
            json: [this.state.data],
            x: 'timestamp',
            keys: {
              x: 'timestamp',
              value: keys
            },
            groups: this.props.stacked?[keys]:undefined,
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

        this.graph = c3.generate(
          config
        );

        dom.appendChild(this.graph.element);

		this.beautifyLegend();
      }
    },

    beautifyLegend: function() {
		//<rect class="c3-legend-item-tile" x="22.75" y="0" width="10" height="10" style="pointer-events: none; fill: rgb(186, 143, 247);"></rect>

        var tiles = d3.selectAll('#'+ this.id + ' .c3-legend-item-tile');
        tiles.attr('rx', 7).attr('ry', 7);

    },

    generateTickValues: function(end, start) {
    	// range in seconds
    	var range = (start.getTime() - end.getTime())/1000;
    	var leftEnd = end.getTime()/1000;
    	// depending on size, show 2 or 5 ticks
    	var steps = range/(this.props.small?2:5);

    	var breakpoints = [1,5,15,60,300,1800,3600,10800,21600,86400];

    	for (var i in breakpoints) {
    		var breakpoint = breakpoints[i];
	    	if (steps < breakpoint) {
	    		steps = breakpoint;
	    		leftEnd = Math.floor(leftEnd/breakpoint)*breakpoint;
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

   destroyGraph: function() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
   },

  updateGraph: function() {
    var self = this;
    if (!this.graph) {
        this.createGraph();
    }
    if (this.graph) {
        var container = ReactDOM.findDOMNode(this);
        var width = this.props.width?this.props.width:container.offsetWidth;
        var height = this.props.height?this.props.height:container.offsetHeight;
        if (this.width != width || this.height != height) {
            this.width = width;
            this.height = height;
            this.graph.resize({height: this.height, width: this.width});
        }


        var keys = [];
        for (var i in this.props. plots) {
          keys.push(this.props.plots[i].id);
        }

        this.state.data.push(this.props.data);

        var data
        if (this.props.threshold) {
        	var startDate = (new Date()).getTime() - this.props.threshold * 1000;
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

  componentWillUnmount: function() {
    this.destroyGraph();
  },

  componentDidUpdate: function(prevProps, prevState) {
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
        if (!this.id) {
          this.id = "X" + Math.round(Math.random()*1000000);
        }
        return (
          <div id={this.id} className="lineChart" style={style}  onMouseOver={this.onEnter} onMouseOut={this.onLeave}/>
        );
  }
});

module.exports = LineChart;
