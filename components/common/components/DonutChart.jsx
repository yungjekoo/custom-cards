var React = require('react');
var ReactDOM = require('react-dom');
var c3 = require('c3');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');


var styles = {
    container:{
        width: "100%",
        height: "100%",
        margin: "0 auto"
    }
};

var DonutChart = React.createClass({
  propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
        data: RPT.array,
        names: RPT.object,
        title: RPT.string,
        unit: RPT.string,
        label: RPT.number,
        width: RPT.number,
        height: RPT.number,
        focus: RPT.string,
        revert: RPT.bool,
        click: RPT.string,
        onOver: RPT.func,
        onOut: RPT.func
  },

  getDefaultProps: function() {
    return {
            data: [],
            names: {}
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
            onmouseover: function (d, i) {
            	if (self.props.onOver) {
            		self.props.onOver(d,i);
            	}
            },
            onmouseout: function (d, i) {
            	if (self.props.onOut) {
            		self.props.onOut(d,i);
            	}
           	},
            type: "donut",
            columns: this.props.data
          },
          donut: {
              title: this.props.title, // cannot be removed
              label: {
                show: false
              },
              expand: true,
              width: 15
          },
          legend: {
            show: false
          },
          color: {
            pattern: colors
          },
          tooltip: {
          	show: false
          }
        };

        this.graph = c3.generate(
          config
        );

        dom.appendChild(this.graph.element);

        this.setTitle();
      }
    },

    setTitle: function(text) {
      if (this.props.data) {
        var count = 0;
        for (var i in this.props.data) {
          var item = this.props.data[i];
          count += item[1];
        }

        if (count != Math.round(count)) {
          count = count.toFixed(2);
        }

        var label = d3.select('#'+ this.id + ' text.c3-chart-arcs-title');

        label.text('');
        label.selectAll("*").remove();//html(''); // remove existant text

        if (text !== undefined) {
	        label.insert('tspan').text(text).attr('dy', 0).attr('x', 0).attr('class', "donutMain").attr('fill', this.props.theme.normal);
	        label.insert('tspan').text(this.props.unit).attr('dy', 20).attr('x', 0).attr('class', "donutMinor").attr('fill', this.props.theme.normal);
        } else {
	        label.insert('tspan').text(count).attr('dy', 0).attr('x', 0).attr('class', "donutMain").attr('fill', this.props.theme.normal);
	        label.insert('tspan').text("Total").attr('dy', -25).attr('x', 0).attr('class', "donutMinor").attr('fill', '#899399');
	        label.insert('tspan').text(this.props.unit).attr('dy', 45).attr('x', 0).attr('class', "donutMinor").attr('fill', this.props.theme.normal);
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
        this.setTitle();
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
      var self = this;

      this.graph.load({
        columns: self.props.data
      });

        this.graph.data.names(this.props.names);

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
  	var self = this;
    // do not repaint for user interaction, otherwise the animation won't work
    if (nextProps.focus || nextProps.label) {
      if (nextProps.focus) {
      	this.focussed = true;
        this.focus(nextProps.focus);
      }
      if (nextProps.label) {
      	this.focussed = true;
      	self.setTitle(nextProps.label);
      }
      return false;
    } else if (this.focussed) {
    	this.focussed = false;
    	this.revert();
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
    this.checkIfPropsChanged(prevProps, this.props);
  },

  checkIfPropsChanged: function(a, b) {
    // Check if we have to remove an item. This fails in some situations if we use the normal
    // unload method. Therefore we just redraw the whole thing.
    var currentData = this.graph.data();
    for (var i in currentData) {
      var item = currentData[i];
      var found = false;
      for (var t in this.props.data) {
        var dataItem = this.props.data[t];
        if (dataItem[0] == item.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.createGraph();
        return;
      }
    }

  	if (JSON.stringify(a.theme) != JSON.stringify(b.theme) ||
  		a.unit != b.unit ||
  		a.precision != b.precision ||
  		a.width != b.width ||
  		a.height != b.height) {
	      this.createGraph();
	 }
	},

  render: function() {
        if (!this.id) {
          this.id = "X" + Math.round(Math.random()*1000000);
        }
        var style = Object.assign({}, styles.container, {width: this.props.width + "px", height: this.props.height + "px"}, this.props.style?this.props.style:{});
        return (
          <div id={this.id} style={style}/>
        );
  }
});

module.exports = DonutChart;
