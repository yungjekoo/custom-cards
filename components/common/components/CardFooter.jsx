var React = require('react');
var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "40px",
		border: "1px solid",
		borderColor: "transparent",
		position: "absolute",
		bottom: "0px",
		left: "0px"
	}
};

var CardFooter = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function() {
        styles.container.borderTopColor = this.props.theme.border;
        styles.container.backgroundColor = this.props.theme.content;

		var style = Object.assign({}, styles.container);
		return (
			<div style={style} >{this.props.children}</div>
		);
	}
});

module.exports = CardFooter;
