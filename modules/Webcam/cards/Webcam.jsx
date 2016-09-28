/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Frank Leo Mielke - Initial Contribution
*****************************************************************************/
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

  componentWillReceiveProps: function(props) {
    if (props.url != this.state.url) {
      this.setState({
        url: props.url
      })
    }
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
