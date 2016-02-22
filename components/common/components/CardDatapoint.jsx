var React = require('react');
var RPT = React.PropTypes;

var styles = {
	value: {
		fontSize: "30px",
		fontWeight: "300",
		lineHeight: "30px",
		color: "#325C80"
	},
	unit: {
		fontSize: "14px",
		color: "#6D7777",
		display: "block",
		marginBottom: "10px",
		fontWeight: "300",
		letterSpacing: "0.3px"
	},
	minor: {
		fontSize: "22px"
	}
};

var CardDatapoint = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		unit: RPT.string,
		minor: RPT.bool
	},

	render: function() {

        styles.unit.color=this.props.theme.minor;
        styles.value.color=this.props.theme.major;

		var style = Object.assign({}, this.props.style?this.props.style:{});
		var styleValue = Object.assign({}, styles.value, this.props.minor?styles.minor:{});

		return (
			<div style={style}>
				<div style={styleValue}>
					{this.props.children}
				</div>
				<div style={styles.unit}>
					{this.props.unit}
				</div>
			</div>
		);
	}
});

module.exports = CardDatapoint;
