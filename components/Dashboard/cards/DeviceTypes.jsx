var React = require('react');

var IoTFUsageStore = require('../../common/stores/IoTFUsageStore.js');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var DonutChartComponent = require('../../common/components/DonutChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');
var Utils = require('../dashboard/DashboardUtils');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');
var Button = require('../../common/components/Button.jsx');
var Actions = require('../dashboard/Actions.jsx');

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

var DeviceTypes = React.createClass({
  propTypes: {
      theme: RPT.object.isRequired,
      style: RPT.object,
      nls: RPT.object,
      wrapper: RPT.object
  },

  getInitialState: function() {
    return {
      data: null
    };
  },

  componentDidMount: function() {
    this.sub = IoTFUsageStore.listen(this.onUpdate);
    IoTFUsageStore.Actions.fetchDeviceTypes();
  },

  componentWillUnmount: function() {
    if (this.sub) {
      this.sub();
    }
  },

  onUpdate: function(payload) {
    var model = {};
    if (payload.deviceTypes) {
      model.data = payload.deviceTypes;
    }
    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onLegendClick: function(id) {
    this.setState({
      click: id,
      focus: undefined
    });
    Actions.notify({
    	deviceType: id
    });
  },

  onAddDevice: function() {
  	Actions.notify({
  		action: "CREATE_DEVICE"
  	})
  },

  onLegendFocus: function(id) {
    this.setState({
      focus: id,
      selected: id,
      click: undefined
    });
  },

  onLegendRevert: function(id) {
    this.setState({
      click: undefined,
      selected: undefined,
      focus: undefined
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
          itemLimit = 3;
        } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 3) {
          itemLimit = 6;
        } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 4) {
          itemLimit = 9;
        }

        var names = {};
        var data = [];

        var count = 0;
        for (var i in this.state.data) {
          var item = this.state.data[i];
          data.push([item.deviceType, item.count]);
          count += item.count;
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
        if (itemLimit && data.length > itemLimit) {
          var othersLabel = this.props.nls.resolve("Other");
          var others = 0;
          for (var i = itemLimit - 1; i < data.length; i++) {
            var item = data[i];
            others += item[1];
          }
          data.splice(itemLimit-1, data.length - itemLimit + 1);
          var newItem = [];
          newItem[0] = othersLabel;
          newItem[1] = Math.round(others);
          data.push(newItem);
        }

        var title = this.props.nls.resolve("DeviceTypesTitle");
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
        if (this.props.wrapper.height == 4 || this.props.wrapper.width == 4) {
          var legendStyle = styles.legend;
          if (this.props.wrapper.width == 4 && this.props.wrapper.height < 4) {
            legendStyle = Object.assign({}, styles.legend, styles.wideCardLegend);
          } else if (this.props.wrapper.width == 4 && this.props.wrapper.height == 4){
            legendStyle = Object.assign({}, styles.legend, styles.wideHighCardLegend);
          }


            legend = <div style={legendStyle}>
                <div style={Object.assign({}, styles.legendTitle, {color: this.props.theme.minor})}>{this.props.nls.resolve("DeviceTypeLegendTitle")}</div>
                {data.map(function(entry) {
                  var deviceType = entry[0];
                  var count = entry[1];

              colorCounter++;

              var legendEntry = styles.legendEntry;
              if (deviceType == self.state.selected) {
	              legendEntry = Object.assign({}, styles.legendEntry, {fontWeight: "bold"});
              }

              return 	<div key={deviceType} style={legendEntry} onClick={function() {self.onLegendClick(deviceType);}} onMouseOver={function() {self.onLegendFocus(deviceType);}} onMouseOut={function() {self.onLegendRevert(deviceType);}}>
                        <div style={Object.assign({}, styles.legendDot, {backgroundColor: colors[colorCounter%(colors.length - 1)]})}>
                          {""}
                        </div>
                        <div style={Object.assign({}, styles.legendValue, {color: colors[colorCounter%(colors.length - 1)]})}>
                          {count}
                        </div>
                        <div style={styles.legendLabel}>
                          {deviceType}
                        </div>
                      </div>;
                })}
              </div>;

        } else if (this.state.selected) {
          var type = null;
          for (var j in this.state.data) {
            var entry = this.state.data[j];
            if (entry.deviceType == this.state.selected) {
              type = entry;
              break;
            }
          }

              legend = <div style={styles.simpleLegend}>
                        {type.deviceType}
                  </div>;

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
            title={title}
            height={height}
            width={width}
                  focus={this.state.focus}
                  click={this.state.click}
                  onOver={this.onOver}
                  onOut = {this.onOut}
                  label={this.state.label}
                  unit="devices"
                  style={chartStyle}
          >
          </DonutChartComponent>
          {legend}
          </div>;

      } else {
        return  <div style={styles.waiting}>
            	{this.props.nls["NoDevicesAdded"]}
            	<div/>
            	<Button theme={this.props.theme} text={this.props.nls["AddDevice"]} onClick={this.onAddDevice}/>
            </div>
      }

    } else {
      return  <div style={styles.waiting}>
            <LoadIndicator theme={this.props.theme} />
          </div>;
    }
  }
});

module.exports = DeviceTypes;
