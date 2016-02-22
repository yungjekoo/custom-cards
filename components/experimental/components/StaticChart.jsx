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

var StaticChart = React.createClass({
  propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
        data: RPT.array,
        names: RPT.object,
        type: RPT.string,
        title: RPT.string,
        horizontal: RPT.bool,
        width: RPT.number,
        height: RPT.number,
        focus: RPT.string,
        revert: RPT.string,
        click: RPT.string
  },

  getDefaultProps: function() {
    return {
            data: [],
            names: {},
            type: "bar",
            horizontal: false
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

        var config = {
          size: {
              width: this.width,
              height: this.height
          },
          data: {
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); },
            type : this.props.type
          },
          donut: {
              title: this.props.title,
              label: {
                format: function (value, ratio) { return value; }
              },
              expand: true
          },
          bar: {
            width: {
              ratio: 0.9,
              zerobased: false
            }
          }
        };

        if (!this.props.horizontal) {
          config.data.columns = this.props.data;
          config.color = {
                  pattern: colors
          };
          if (this.props.type == "donut") {
            config.legend = {
              show: false
            };
          }
        } else {
          var names = ['x'];
          var data = ['value'];
          for (var i in this.props.data) {
            var item = this.props.data[i];
            names.push(this.props.names[item[0]]);
            data.push(item[1]);
          }

          config.padding = {
            left: 100,
            bottom: 30
          };
          config.data = {
            x: 'x',
            columns:
                [
                  names,
                  data
                ],
            type: this.props.type,
            color: function(inColor, data) {
                if(data.index !== undefined) {
                  return colors[data.index%colors.length];
                }
                return inColor;
            }
          };
          config.axis = {
              rotated: true,
              x: {
                  type: 'category'
              },
              y: {
                show: false
              }
          };
          config.tooltip = {
              grouped: false
          };
          config.legend = {
            show: false
          };
          config.data.labels = true;
        }

        this.graph = c3.generate(
          config
        );

        dom.appendChild(this.graph.element);

        this.setTitle();
      }
    },

    setTitle: function() {
      if (this.props.data) {
        var count = 0;
        for (var i in this.props.data) {
          var item = this.props.data[i];
          count += item[1];
        }

        if (count != Math.round(count)) {
          count = count.toFixed(2);
        }
        if (this.props.type == "donut") {
          var label = d3.select('#'+ this.id + ' text.c3-chart-arcs-title');

          label.html(''); // remove existant text
          label.insert('tspan').text(count).attr('dy', -10).attr('x', 0).attr('class', "donutMain").attr('fill', '#2E3636');
          label.insert('tspan').text(this.props.title).attr('dy', 30).attr('x', 0).attr('class', "donutMinor").attr('fill', '#899399');
        }
      }
    },

    focus: function(id) {
      if (this.graph) {
        this.graph.focus(id);
      }
    },

    click: function(id) {
      if (this.graph) {
        this.graph.click(id);
      }
    },

    revert: function(id) {
      if (this.graph) {
        this.graph.revert();
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
    if (!this.graph) {
        this.createGraph();
    }
    if (this.graph) {
        if (this.props.horizontal) {
          var names = ['x'];
          var data = ['value'];
          for (var i in this.props.data) {
            var item = this.props.data[i];
            names.push(this.props.names[item[0]]);
            data.push(item[1]);
          }
          this.graph.load({
              columns: [
                  names,
                  data
              ]
          });
        } else {
          this.graph.load({
              columns: this.props.data
          });

          this.graph.data.names(this.props.names);
        }

        var container = ReactDOM.findDOMNode(this);
        var width = this.props.width?this.props.width:container.offsetWidth;
        var height = this.props.height?this.props.height:container.offsetHeight;
        if (this.width != width || this.height != height) {
            this.width = width;
            this.height = height;
            this.graph.resize({height: this.height, width: this.width});
        }

        this.setTitle();
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // do not repaint for user interaction, otherwise the animation won't work
    if (nextProps.focus || nextProps.click || nextProps.revert) {
      if (nextProps.focus) {
        this.focus(nextProps.focus);
      }
      if (nextProps.click) {
        this.click(nextProps.click);
      }
      if (nextProps.revert) {
        this.revert(nextProps.revert);
      }
      return false;
    } else {
      return true;
    }
  },

  componentWillUnmount: function() {
    this.destroyGraph();
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.updateGraph();
  },

  render: function() {
        if (!this.id) {
          this.id = "X" + Math.round(Math.random()*1000000);
        }
        var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
        return (
          <div id={this.id} style={style}/>
        );
  }
});

module.exports = StaticChart;
