var React = require('react');
var RPT = React.PropTypes;

var styles = {
	container: {
		float: "left",
		width: "50%"
	},
	value: {
		fontSize: "13px",
		fontWeight: "bold",
		textAlign: "left",
		paddingLeft: "30px"
	},
	title: {
		fontSize: "13px",
		fontWeight: "normal",
	    letterSpacing: "0.5px",
	    textTransform: "uppercase",
		paddingLeft: "30px",
		opacity: 0.5,
		marginTop: "5px"
	}
};

var CardFooterDatapoint = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		unit: RPT.string,
		title: RPT.string
	},

	render: function() {
        
        styles.title.color=this.props.theme.minor;
        styles.value.color=this.props.theme.minor;
        
		var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
        
		return (
			<div style={style}>
				<div style={styles.title}>
					{this.props.title}
				</div>
				<div style={styles.value}>
					{this.props.children} {this.props.unit}
				</div>
			</div>
		);
	}
});

module.exports = CardFooterDatapoint;
