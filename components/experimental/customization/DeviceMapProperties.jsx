var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;

var DeviceMapProperties = React.createClass({

	propTypes: {
		type: RPT.object,
		style: RPT.object,
		nls: RPT.object,
        theme: RPT.object.isRequired
	},

	getDefaultProps: function() {
		return {
		  parameters: {}
		};
	},

	getInitialState: function() {
		return {
			type: this.props.type !== undefined?this.props.type:"MAP"
		};
	},

	componentDidMount: function() {
	},

	onTypeChanged: function(value) {
		this.setState({
		  min: value
		});
	},

	onUpdate: function(state) {
		var updatedState = Object.assign({},this.state, state);
		this.setState(updatedState);
	},
    
	render: function() {
		var newProps = Object.assign({}, this.props, this.state);
		return (
			<CustomizationDialog {...newProps} onUpdate={this.onUpdate}>
				<DialogTab id="TypeSelection" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_TYPESEL_DeviceMap")}>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_TYPE_DeviceMap")} theme={this.props.theme}>
	                    <InputField theme={this.props.theme} onChange={this.onTypeChanged} initialValue={this.state.type}></InputField>
	                </Label>
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = DeviceMapProperties;
