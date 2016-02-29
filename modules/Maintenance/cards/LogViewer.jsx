var React = require('react');
var IoTFCommon = require('IoTFCommon');
var LoadIndicator = IoTFCommon.LoadIndicator;
var MaintenanceStore = require('../stores/MaintenanceStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    overflow: "scroll"

  },
  entry: {
    fontSize: "12px",
    backgroundColor: "#EEEEEE",
    padding: "2px 10px",
    margin: "1px"
  },
  timestamp: {
    width: "100px",
    display: "inline-block"
  },
  device: {
    width: "150px",
    display: "inline-block"
  },
  event: {
    width: "150px",
    display: "inline-block"
  },
  scroller: {

  }
}

var LogViewer = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string
  },

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
      logEntries: []
    }
  },

  componentDidMount: function() {
    MaintenanceStore.listen(this.onUpdate);
  },

  onUpdate: function(payload) {
    if (this.isMounted()) {
      if (payload.log) {
        if (!this.count) {
          this.count = 0;
        }
        payload.log = {
          log: payload.log,
          count: this.count++
        };
        this.state.logEntries.splice(0,0,payload.log);
        while (this.state.logEntries.length > 100) {
          this.state.logEntries.pop();
        }
        this.setState(this.state.logEntries);
      }
    }
  },

  componentWillUnmount: function() {
  },

  render: function() {
  	var self = this;

    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    if (this.state && this.state.logEntries && this.state.logEntries.length > 0) {
      return (
        <div style={style}>
          <div style={styles.scroller}>
            {this.state.logEntries.map(function(item) {
              return  <div key={item.count} style={styles.entry}>
                        {item.log}
                      </div>
            })}
          </div>
        </div>
      )
    } else {
      return (<div style={style}>Start logging in maintenance card</div>)
    }
  }
});

module.exports = LogViewer;
