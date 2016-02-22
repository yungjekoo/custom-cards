var React = require('react');
var RPT = React.PropTypes;

var styles = {
	cardTitle: {
		fontWeight: "600",
		textTransform: "uppercase",
		color: "#323232"
	}
};

var CardTitle = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function() {
        styles.cardTitle.color= this.props.theme?this.props.theme.title:styles.cardTitle.color;
        var styleContainer = Object.assign({}, styles.cardTitle, this.styles);
        
		return (
			<div style={styles.cardTitle}>{this.props.children}</div>
		);
	}
});

module.exports = CardTitle;
