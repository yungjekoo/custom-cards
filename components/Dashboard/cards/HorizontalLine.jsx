var React = require('react');
var RPT = React.PropTypes;

/**
* Simple horizontal line to organize cards
*/

var HorizontalLine = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		type: RPT.string,
		wrapper: RPT.object
	},

	render: function() {
		var self = this;
		var style = {
			backgroundColor: this.props.theme.normal,
			height: "10px"
		};
		return (
			<div style={style}>
			</div>
		);
	}
});

module.exports = HorizontalLine;
