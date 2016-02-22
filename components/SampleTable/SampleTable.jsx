var React = require('react');

var RPT = React.PropTypes;

var SampleTable = React.createClass({

	propTypes: {
		data: RPT.array,
		nls: RPT.object,
		emitter: RPT.object
	},

	getDefaultProps: function() {
		return {
			data: [
				{
					id: "ABC",
					value: 123,
					name: "Peter"
				},
				{
					id: "DEF",
					value: 456,
					name: "Fernando"
				},
				{
					id: "GHI",
					value: 789,
					name: "Henrietta"
				}
			],
			strings: ["header", "footer"]
		};
	},

	getInitialState: function() {
		return {
			strings: {
				"header": "",
				"footer": ""
			}
		};
	},

	handleNLS: function(strings) {
		this.setState(strings);
		this.render();
	},

	componentWillMount: function() {
		this.props.nls.resolve("SampleTable", this.props.strings, this.handleNLS);
	},

	_mouseOver: function(event) {
		this.props.emitter.emit("SampleTable.MouseOverData", {
			value: event.target.innerHTML
		});
		console.log(event);
	},

	render: function() {
		var rows = this.props.data;
		var self = this;
		return (
			<div>
				<h3>{this.state.strings.header}</h3>
				<table className="deviceTable">
					<tbody>
						<tr>
							{Object.keys(rows[0]).map(function(key) {
								return (<th key={key}>{key}</th>);
							})}
						</tr>
						{rows.map(function(row) {
							return (<tr key={row.id}>
								{Object.keys(row).map(function(key) {
									return (<td key={key} onMouseOver={self._mouseOver}>{row[key]}</td>);
								})}
							</tr>);
						})}
					</tbody>
				</table>
				<h5>{this.state.strings.footer}</h5>
			</div>
		);
	}
});

module.exports = SampleTable;
