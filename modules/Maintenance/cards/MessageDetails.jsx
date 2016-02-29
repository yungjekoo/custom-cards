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
    fontSize: "14px",
    backgroundColor: "#EEEEEE",
    padding: "2px 10px",
    margin: "1px"
  },
  scroller: {

  }
}

var MessageDetails = React.createClass({
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
        this.setState({
          message: payload.message
        });
      }
    }
  },

  componentWillUnmount: function() {
    MaintenanceStore.Actions.stopObservingMessages();
  },

  constructMessage: function(message) {
    var self = this;

    var result = "";
    if (message != null && typeof message === 'object') {
      var keys = Object.keys(message);
      result =  <div style={styles.entry}>
                      {keys.map(function(key) {
                        return <div style={styles.entry}>{key}: {self.constructMessage(message[key])}</div>
                      })}
                    </div>
    } else {
      result = message;
    }
    return result;
  },

  render: function() {
  	var self = this;

    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

    if (this.state && this.state.message) {
      var message = this.constructMessage(this.state.message.data);

      var time = (new Date(this.state.message.timestamp));

      return (
        <div style={style}>
          <div style={styles.scroller}>
            <div style={styles.entry}><b>Time:</b> {time.toTimeString().split(" ")[0]}</div>
            <div style={styles.entry}><b>Device:</b> {this.state.message.device}</div>
            <div style={styles.entry}><b>Event:</b> {this.state.message.event}</div>
            <p></p>
            {message}
          </div>
        </div>
      )
    } else {
      return (<div/>)
    }
  }
});

module.exports = MessageDetails;
