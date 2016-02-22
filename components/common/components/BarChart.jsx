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

var BarChart = React.createClass({
  propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
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

  getDefaultProps: function() {
    return {
            data: [],
            names: {},
            horizontal: false,
            unit: "",
            precision: 0
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
            type : "bar",
            x: 'x',
            columns:
                [
                  names,
                  data
                ],
            color: function(inColor, data) {
                if(data.index !== undefined) {
                  return colors[data.index%colors.length];
                }
                return inColor;
            },
            labels: {
              format: function (v, id, i, j) {
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

        this.graph = c3.generate(
          config
        );

        dom.appendChild(this.graph.element);
      }
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
        var names = ['x'];
        var data = ['value'];
        for (var i = 0; i < this.props.data.length; i++) {
          var item = this.props.data[i];
          names.push(this.props.names[item[0]]);
          data.push(item[1]);
        }

        var container = ReactDOM.findDOMNode(this);
        var width = this.props.width?this.props.width:container.offsetWidth;
        var height = this.props.height?this.props.height:container.offsetHeight;
        if (this.width != width || this.height != height) {
            this.width = width;
            this.height = height;
            this.graph.resize({height: this.height, width: this.width});
        }

        self.graph.load({
            columns: [
                names,
                data
            ]
        });
    }
  },

  componentWillUnmount: function() {
    this.destroyGraph();
  },

  checkIfPropsChanged: function(a, b) {
  	if (JSON.stringify(a.theme) != JSON.stringify(b.theme) ||
  		a.type != b.type ||
  		a.horizontal != b.horizontal ||
  		a.unit != b.unit ||
  		a.precision != b.precision ||
  		a.width != b.width ||
  		a.height != b.height) {
	      this.createGraph();
	}
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.updateGraph();
    this.checkIfPropsChanged(prevProps, this.props);
  },

  render: function() {
        if (!this.id) {
          this.id = "X" + Math.round(Math.random()*1000000);
        }
        var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
        return (
          <div className="barChart" id={this.id} style={style}/>
        );
  }
});

module.exports = BarChart;
