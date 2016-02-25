var React = require('react');
var IoTFCommon = require('IoTFCommon');
var LoadIndicator = IoTFCommon.LoadIndicator;
var HelloWorldStore = require('../stores/HelloWorldStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
	backgroundSize: "100%",
	backgroundRepeat: "no-repeat"
  },
  counter: {
  	fontSize: "60px",
  	textAlign: "center",
  	width: "100%",
  	paddingTop: "20px"
  }
}

var HelloWorld = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string,
    helloColor: RPT.number
  },

  getDefaultProps: function() {
    return {
    	helloColor: 0
    };
  },

  getInitialState: function() {
    return {
    	message: "n/a",
    	count: -1
    }
  },

  componentDidMount: function() {
    HelloWorldStore.listen(this.onUpdate);
    HelloWorldStore.Actions.sayHello("Hi there!");
  },

  onUpdate: function(payload) {
    if (this.isMounted()) {
      if (payload.helloMessage || payload.helloCount !== undefined) {
        var model = {};
        if (payload.helloMessage) {
          model.message = payload.helloMessage;
        }
        if (payload.helloCount) {
          model.count = payload.helloCount;
        }
        this.setState(model);
      }
    }
  },

  render: function() {
  	var self = this;
    if (this.state.message && this.state.count > -1) {

      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
      style = Object.assign(style, {color: this.props.theme.schemes[this.props.helloColor].normal});

      if (this.props.wrapper.width > 2) {
        // we could link to the kitty image in the resource folder but the url depends on the location of the package.
        // Therefore we point to the original on the Web.
      	style = Object.assign(style, {backgroundImage: "url('http://wallpaper.pickywallpapers.com/1366x768/little-kitty.jpg')"});
      }

      return (
        <div style={style}>
        	The store says:
        	<div className="helloWorld">
	        	{this.state.message}
        	</div>
        	<div style={styles.counter}>
        	 	{this.state.count}
        	</div>
        </div>
      )
    } else {
      	return (
			<div style={styles.style}>
				<LoadIndicator theme={this.props.theme} useDataPoints={false}/>
			</div>
		)
    }
  }
});

module.exports = HelloWorld;
