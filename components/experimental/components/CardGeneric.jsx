var React = require('react');

var CardSection = require('./CardSection.jsx');
var CardDatapoint = require('./CardDatapoint.jsx');
var CardDescription = require('./CardDescription.jsx');
var CardAction = require('./CardAction.jsx');

var RPT = React.PropTypes;

var styles = {
	container: {
		fontSize: "14px",
		fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
		width: "100%"
	}
};

var CardGeneric = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		description: RPT.string,
		value: RPT.string,
		unit: RPT.string,
		action: RPT.string,
		actionText: RPT.string,
		actionIcon: RPT.string,
		style: RPT.object
	},

	render: function() {
		var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});

		var description = "";
		var data = "";
		var action = "";
		var first = true;
		if (this.props.description) {
			description = <CardDescription theme={this.props.theme}>{this.props.description}</CardDescription>;
		}
		if (this.props.value !== undefined && this.props.unit) {
			data = <CardSection theme={this.props.theme} first={first}><CardDatapoint theme={this.props.theme} unit={this.props.unit}>{this.props.value}</CardDatapoint></CardSection>;
			first = false;
		}
		if (this.props.action && (this.props.actionIcon || this.props.actionText)) {
			action = <CardSection theme={this.props.theme} first={first}><CardAction theme={this.props.theme} icon={this.props.actionIcon} action={this.props.action}>{this.props.actionText}</CardAction></CardSection>;
			first = false;
		}
		return (
			<div style={style}>{description}{data}{action}</div>
		);
	}
});

module.exports = CardGeneric;
