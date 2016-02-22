var React = require('react');
var RPT = React.PropTypes;

var styles = {
	cardDescription: {
		color: "#323232",
		fontSize: "12px",
		padding: "5px 20px",
		height: "30px"
	}
};

var CardDescription = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function() {
        styles.cardDescription.color=this.props.theme?this.props.theme.text:styles.cardDescription.color;
        
		var style = Object.assign({}, styles.cardDescription, this.props.style?this.props.style:{});
		return (
			<div style={style} >{this.props.children}</div>
		);
	}
});

module.exports = CardDescription;
