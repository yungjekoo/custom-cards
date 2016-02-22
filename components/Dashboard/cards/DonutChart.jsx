var React = require('react');

var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var DonutChartComponent = require('../../common/components/DonutChart.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var CardTable = require('../../common/components/CardTable.jsx');
var Utils = require('../dashboard/DashboardUtils');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  chart: {
    marginTop: "15px"
  },
  legend: {
    position: "relative",
      padding: "10px 20px",
      boxSizing: "border-box",
      height: "130px",
      overflow: "hidden"
     },
  legendEntry: {
    height: "30px",
    width: "250px",
    float: "left",
    position: "relative",
    whiteSpace: "nowrap",
    cursor: "pointer"
  },
  legendDot:{
    height: "22px",
      minWidth: "22px",
      borderRadius: "17px",
      backgroundColor: "blue",
      display: "inline-block",
      top: "4px",
      left: "0px",
      color: "white",
      lineHeight: "22px",
      textAlign: "center",
      padding: "3px",
      position: "absolute"
     },
  legendLabel: {
      display: "block",
      position: "relative",
      lineHeight: "30px",
      fontSize: "16px",
      marginLeft: "40px",
      textOverflow: "ellipsis",
      overflow: "hidden"
    },
  legendValue: {
      display: "block",
      position: "relative",
      lineHeight: "30px",
      fontSize: "16px",
      textAlign: "right",
      float: "right"
    },
    waiting: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: "20px"
    },
    legendTitle: {
      fontSize: "16px",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      marginBottom: "10px"
    },
    simpleLegend: {
      display: "block",
      position: "relative",
      lineHeight: "22px",
      fontSize: "16px",
      textAlign: "center"
    },
    wideCardChart: {
      float: "left",
      margin: "10px 50px"
    },
    wideHighCardChart: {
      float: "left",
      margin: "20px 10px"
    },
    wideCardLegend: {
      height: "220px",
      width: "300px",
      top: "3px"
    },
    wideHighCardLegend: {
      height: "310px",
      width: "300px",
      top: "12px"
    }
};

var DonutChart = React.createClass({
  propTypes: {
      theme: RPT.object.isRequired,
      style: RPT.object,
      nls: RPT.object,
      wrapper: RPT.object,
      demo: RPT.bool,
      plots: RPT.array,
      type: RPT.string,
      title: RPT.string
  },

      getDefaultProps: function() {
      return {
              "plots": []
      };

    },

    getInitialState: function() {
      return {
              data: [],
              names: {}
      };
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
    var found = false;
    var data = this.state.data;
    var names = Object.assign({}, this.state.names);

    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent &&
            payload.deviceEvent.deviceId == plot.device &&
            payload.deviceEvent.eventType == plot.event) {

          var property = IoTFDeviceStore.normalizeProperty(plot.property);
          var obj = payload.deviceEvent.data[property];

          if (obj !== undefined) {
            var newData = [plot.id, obj];
            var replaced = false;
            for (var t in data) {
              if (data[t][0] == plot.id) {
                data.splice(t,1, newData);
                replaced = true;
                break;
              }
            }
            if (!replaced) {
              data.push(newData);
            }
            names[plot.id] = plot.label;
            found = true;
          }
        }


      }
    }

    if (found) {
      this.setState({
        data: data,
        names: names
      });
    }
  },

  onLegendClick: function(id) {
    this.setState({
      click: id,
      focus: undefined
    });
  },

  onLegendFocus: function(id) {
    this.setState({
      focus: id,
      selected: id
    });
  },

  onLegendRevert: function(id) {
    this.setState({
      focus: undefined,
      selected: undefined
    });
  },

  onOver: function(d,i) {
    this.setState({
      label: d.value,
      selected: d.id
    });
  },

  onOut: function(d,i) {
    this.setState({
      label: undefined,
      selected: undefined
    });
  },

  render: function() {
    var self = this;
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    if (this.state.data) {
      if (this.state.data.length > 0) {
        var colors = this.props.theme.palette;

        // limit the number of visible items depending on the size
        var itemLimit = null;
        if (this.props.wrapper.width == 2 && this.props.wrapper.height == 3) {
          itemLimit = null;
        } else if (this.props.wrapper.width == 2 && this.props.wrapper.height == 4) {
          itemLimit = 4;
        } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 3) {
          itemLimit = 7;
        } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 4) {
          itemLimit = 10;
        }

        var names = Object.assign({}, this.state.names);
        // convert into real array and sort
        var data = [];
        for (var i in this.state.data) {
          data.push(this.state.data[i]);
        }

        var sort = function(a,b) {
          if (a.length == 2 && b.length == 2) {
            if (a[1] > b[1]) {
              return -1;
            } else if (a[1] < b[1]) {
              return 1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        }
        data.sort(sort);

        // finally limit to the number of visible items
        // create a fake plot to simplify handling of the others entry
        var othersPlot = {
          precision: 0,
          unit: ""
        }
        if (itemLimit && data.length > itemLimit) {
          othersPlot.label = this.props.nls.resolve("Other") + " (" + (data.length - itemLimit + 1) + ")";
          var others = 0;
          for (var i = itemLimit - 1; i < data.length; i++) {
            var item = data[i];
            others += item[1];
          }
          data.splice(itemLimit-1, data.length - itemLimit + 1);
          var newItem = [];
          newItem[0] = "others";
          newItem[1] = Math.round(others);
          data.push(newItem);
          names["others"] = othersPlot.label;
        }

        var colorCounter = -1;

        styles.legendLabel.color = this.props.theme.minor;

        var width = this.props.wrapper.realWidth;
        var height = this.props.wrapper.realHeight;
        if (this.props.wrapper.width == 2) {
          width = 180;
          height = 180;
        } else if (this.props.wrapper.height == 3) {
          width = 220;
          height = 220;
        } else {
          width = 300;
          height = 300;
        }

        var legend = "";
        var plot = null;
        if (this.props.wrapper.height == 4 || this.props.wrapper.width == 4) {
          var legendStyle = styles.legend;
          if (this.props.wrapper.width == 4 && this.props.wrapper.height < 4) {
            legendStyle = Object.assign({}, styles.legend, styles.wideCardLegend);
          } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 4){
            legendStyle = Object.assign({}, styles.legend, styles.wideHighCardLegend);
          }
            legend =  <div style={legendStyle}>
                {data.map(function(entry) {
                  var value = entry[1];
                  var id = entry [0];
                  var plot = null;
                  if (id != "others") {
                    for (var i = 0; i < self.props.plots.length; i++) {
                      plot = self.props.plots[i];
                      if (id == plot.id) {
                        // try to catch unit and precision from other plots
                        if (plot.unit) othersPlot.unit = plot.unit;
                        // we just round the value since we do not have an accurate precision for the accumulated value
                        //if (plot.precision !== undefined) othersPlot.precision = plot.precision;
                        break;
                      }
                    }
                  } else {
                    plot = othersPlot;
                  }

                  if (plot.precision !== undefined) {
                    value = value.toFixed(plot.precision);
                  }

                  colorCounter++;
                  var legendEntry = styles.legendEntry;
                  if (id == self.state.selected) {
    	              legendEntry = Object.assign({}, styles.legendEntry, {fontWeight: "bold"});
                  }
                  return 	<div key={id} style={legendEntry} onClick={function() {self.onLegendClick(id);}} onMouseOver={function() {self.onLegendFocus(id);}} onMouseOut={function() {self.onLegendRevert(id);}}>
                            <div style={Object.assign({}, styles.legendDot, {backgroundColor: colors[colorCounter%(colors.length - 1)]})}>
                              {""}
                            </div>
                            <div style={Object.assign({}, styles.legendValue, {color: colors[colorCounter%(colors.length - 1)]})}>
                              {value} {plot.unit}
                            </div>
                            <div style={styles.legendLabel}>
                              {plot.label}
                            </div>
                          </div>;
                })}
              </div>;
        } else if (this.state.selected) {
          plot = null;
          for (var j in this.props.plots) {
            plot = this.props.plots[j];
            if (plot.id == this.state.selected) {
              plot = plot;
              break;
            }
          }

              legend = <div style={styles.simpleLegend}>
                        {plot.label}
                  </div>;

        }

        // find unit
        var unit = "";
        for (var k in this.props.plots) {
          plot = this.props.plots[k];
          if (plot.unit) {
            unit = plot.unit;
            break;
          }
        }

        var chartStyle = styles.chart;
        if (this.props.wrapper.width == 4 && this.props.wrapper.height < 4) {
          chartStyle = Object.assign({}, styles.chart, styles.wideCardChart);
        } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 4){
          chartStyle = Object.assign({}, styles.chart, styles.wideHighCardChart);
        }

        return <div style={style}>
          <DonutChartComponent
            theme={this.props.theme}
            data={data}
            names={names}
            type={this.props.type}
            title={this.props.title}
            height={height}
            width={width}
                  focus={this.state.focus}
                  onOver={this.onOver}
                  onOut = {this.onOut}
                  label={this.state.label}
                  unit={unit}
                  style={chartStyle}
          >
          </DonutChartComponent>
          {legend}
          </div>;
      } else {
        return  <div style={styles.waiting}>
              <LoadIndicator theme={this.props.theme} useDataPoints={true}/>
            </div>
      }

    } else {
      return  <div style={styles.waiting}>
            <LoadIndicator theme={this.props.theme} useDataPoints={true}/>
          </div>;
    }
  }
});

module.exports = DonutChart;
