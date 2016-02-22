var React = require('react');
var RPT = React.PropTypes;

var styles = {
	cardSection: {
		margin: "0 20px 20px",
		paddingTop: "20px",
		borderTop: "2px solid",
        borderColor: "#e5e5e5",
		first: {
			borderTop: null
		}
	}
};

var CardSection = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		first: RPT.bool
	},

	render: function() {
        styles.cardSection.borderColor= this.props.theme?this.props.theme.text:styles.cardSection.borderColor;
        
		var style = Object.assign({}, styles.cardSection, this.props.first && styles.cardSection.first);
		return (
			<div style={style} >{this.props.children}</div>
		);
	}
});

module.exports = CardSection;
