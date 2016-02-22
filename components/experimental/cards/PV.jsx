var React = require('react');
var RPT = React.PropTypes;
var DeviceStore = require('../../common/stores/DeviceStore');

var styles = {
	container: {
		overflow: "scroll",
		height: "100%"
	},
	table: {
		margin: "10px"
	}
};

var PV = React.createClass({

	propTypes: {
		min: RPT.string,
		max: RPT.string,
		device: RPT.string,
		property: RPT.string
	},

	getDefaultProps: function() {
		return {
		};
	},

	getInitialState: function() {
		return {

		};
	},

	componentDidMount: function() {
	    DeviceStore.listen(this.onUpdate);
	    DeviceStore.Actions.connect();
	},

	onUpdate: function(payload) {
		if (payload.device = "26877") {
			this.setState({model: payload.model});
		}
	},

	render: function() {
		var data = "";
		var lines = [];
		if (this.state.model) {
			for (var property in this.state.model) {
				lines.push(<tr><td>{Messages.resolve(property)}</td><td>{this.state.model[property]}</td></tr>);
			}
		}
		return (
			<div style={styles.container}>
				<table style={styles.table}><tbody>
				{lines.map(function(result) {
					return result;
				})}
				</tbody></table>
			</div>
		);
	}
});

module.exports = PV;
