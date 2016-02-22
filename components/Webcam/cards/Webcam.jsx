var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;

var styles = {
	container: {
		height: "100%"
	},
	image: {
	}
};

// http://kaufhaus.ludwigbeck.de/manual/webcam/1sec.jpg
// http://blog.muenchen.de/marienplatzcam/marienplatzgross001.jpg
// http://mymielke.no-ip.biz:8091/snapshot.cgi?user=ibm&pwd=1911


var Webcam = React.createClass({
	propTypes: {
	    theme: RPT.object.isRequired,
	    style: RPT.object,
	    nls: RPT.object,
	    wrapper: RPT.object,
		frequency: RPT.number,
		url: RPT.string
	},

	getDefaultProps: function() {
		return {
			frequency: 5,
			url: "http://kaufhaus.ludwigbeck.de/manual/webcam/1sec.jpg"
		};
	},

	getInitialState: function() {
		return {
			url: null
		};
	},

	componentDidMount: function() {
		this.load();
	},

  componentWillUnmount: function() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  },

	load: function() {
		var time = (new Date()).getTime();
		var separator = (this.props.url.indexOf('?') > -1)?"&":"?";
		var url = this.props.url + separator +"nocache=" + time;
		this.setState({
			url: url,
			time: time
		});
	},

	reload: function(event) {
		if (this.node) {
			this.height = this.node.offsetHeight - 32;
			this.width = this.node.offsetWidth;
			var image = event.target;
			this.imgHeight = image.naturalHeight;
			this.imgWidth = image.naturalWidth;

			var factor = Math.max(this.height/this.imgHeight, this.width/this.imgWidth);
			image.style.width = Math.ceil(this.imgWidth*factor) + "px";
			image.style.height = Math.ceil(this.imgHeight*factor) + "px";
		}

		if (this.timeout) {
			return;
		}
		var self = this;
		var time = (new Date()).getTime();
		if (this.state.time <= time - this.props.frequency*1000) {
			this.load();
		} else {
			this.timeout = setTimeout(function() {
				self.timeout = null;
				self.load();
			}, this.props.frequency*1000-(time-this.state.time));
		}
	},

	setContainer: function(ref) {
		if (ref) {
			this.node = ReactDOM.findDOMNode(ref);
		}
	},

	render: function() {
		if (this.state.url) {
			return (
				<div style={styles.container} ref={this.setContainer}>
					<img style={styles.image} onLoad={this.reload} src={this.state.url}/>
				</div>
			);
		} else {
			return (<div>Loading...</div>);
		}
	}
});

module.exports = Webcam;
