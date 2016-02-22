var React = require('react');
var ReactDOM = require('react-dom');
var c3 = require('c3');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var LoadIndicator = require('./LoadIndicator.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');


var styles = {
    container:{
      position: "relative",
      width: "100%",
      height: "270px"
    }
};

var CardLineChart = React.createClass({
  propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
        data: RPT.array,
        showRange: RPT.bool,
        unit: RPT.string,
        width: RPT.number,
        height: RPT.number
  },

  getDefaultProps: function() {
    return {
            data: []
    };
  },

    componentDidMount: function() {
      this.createGraph();
    },

    createGraph: function() {
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

        if (this.props.data && this.props.data.length > 0) {

          var today = new Date();
          var weekAgo = new Date(today.getTime() - 1000*60*60*24*7);
          var zoomStart = today.toISOString().split("T")[0];
          var zoomEnd = weekAgo.toISOString().split("T")[0];

        	var colorMap = {'total': colors[0]};

          var config = {
            size: {
                width: this.width,
                height: this.height
            },
            data: {
              type : "area",
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

          this.graph = c3.generate(
            config
          );

          dom.appendChild(this.graph.element);

        }
      }
    },

   destroyGraph: function() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
   },

  componentWillUnmount: function() {
    this.destroyGraph();
  },

  componentDidUpdate: function() {
    this.createGraph();
  },

  render: function() {
        var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

        style.borderLeftColor = this.props.theme.border;

        if (this.props.data && this.props.data.length > 0) {
	        return (
	          <div className="lineChart" style={style}/>
	        );
        } else {
	        return (
	          <LoadIndicator theme={this.props.theme} />
	        );
        }
  }
});

module.exports = CardLineChart;
