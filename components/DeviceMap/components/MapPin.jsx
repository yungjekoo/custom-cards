var React = require('react');
var RPT = React.PropTypes;
//var ol = require('openlayers');

/**
* Pin in a map
*/
var styles = {
	container: {
		height: "100%",
		width: "100%"
	}
};

var MapPin = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		icon: RPT.string,
		id: RPT.string,
		lng: RPT.number,
		lat: RPT.number,
		payload: RPT.object
	},

	getDefaultProps: function() {
		return {
			icon: "../resources/images/LocationGrey-30px.png"
		};
	},

	render: function() {
		var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
		return (
			<div style={style}/>
		);
	}
});

module.exports = MapPin;
