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

var MessageViewer = React.createClass({
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
      messages: []
    }
  },

  componentDidMount: function() {
    MaintenanceStore.listen(this.onUpdate);
    MaintenanceStore.Actions.observeMessages();
  },

  onUpdate: function(payload) {
    if (this.isMounted()) {
      if (payload.message) {
        if (!this.count) {
          this.count = 0;
        }
        payload.message.count = this.count++;
        this.state.messages.splice(0,0,payload.message);
        while (this.state.messages.length > 100) {
          this.state.messages.pop();
        }
        this.setState(this.state.messages);
      }
    }
  },

  componentWillUnmount: function() {
    MaintenanceStore.Actions.stopObservingMessages();
  },

  render: function() {
  	var self = this;

    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    return (
      <div style={style}>
        <div style={styles.scroller}>
          {this.state.messages.map(function(item) {
            var time = (new Date(item.timestamp));
            return  <div key={item.count} style={styles.entry}>
                      <span style={styles.timestamp}>{time.toTimeString().split(" ")[0]}</span>
                      <span style={styles.device}>{item.device}</span>
                      <span style={styles.event}>{item.event}</span>
                    </div>
          })}
        </div>
      </div>
    )
  }
});

module.exports = MessageViewer;
