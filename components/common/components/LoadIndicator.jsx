var React = require('react');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
}

var LoadIndicator = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		wait: RPT.number,
		useDataPoints: RPT.bool
	},

	getDefaultProps: function() {
		return {
			wait: 30,
			useDataPoints: false
		};
	},

	getInitialState: function() {
		return {
			counter: this.props.wait
		}
	},

	componentDidMount: function() {
		this.startCounter();
	},

	startCounter: function() {
		var self = this;
		setTimeout(function() {
			var counter = self.state.counter;
			if (counter > 0 && self.isMounted()) {
				self.setState({
					counter: counter-1
				});
				self.startCounter();
			}
		}, 1000);
	},

	render: function() {
		var text = "";
		if (this.state) {
			if (this.state.counter <= 0) {
				if (this.props.useDataPoints) {
					text =  (<div>
				                <span>
									No messages for the specified data point(s) received.
				                </span>
							</div>)
				} else {
					text =  <div>
              <span>
									No data received. Check if the service is accessible.
								</span>
							</div>
				}
			} else {
				text = "Loading " + ((this.state.counter%3 - 2 == 0)?":":".") + ((this.state.counter%3 - 1 == 0)?":":".") + ((this.state.counter%3 == 0)?":":".") ;
			}
		}
		return (
			<div>
				{text}
			</div>
		)
	}
});

module.exports = LoadIndicator;
