var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;

var StaticChartProperties = React.createClass({

	propTypes: {
	    min: RPT.string,
	    max: RPT.string,
	    device: RPT.string,
	    property: RPT.string,
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
			min: this.props.min !== undefined?this.props.min:0,
			max: this.props.max !== undefined?this.props.max:100,
			device: this.props.device?this.props.device:null,
			property: this.props.property?this.props.property:null
		};
	},

	componentDidMount: function() {
	},

	onMinChanged: function(value) {
		this.setState({
		  min: value
		});
	},

	onMaxChanged: function(value) {
		this.setState({
		  max: value
		});
	},

	onDeviceChanged: function(value) {
		this.setState({
		  device: value
		});
	},

	onPropertyChanged: function(value) {
		this.setState({
		  property: value
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
				<DialogTab id="Data selection" theme={this.props.theme} label="Data selection">
	                <Label label='Mininum value' theme={this.props.theme}>
	                    <InputField onChange={this.onMinChanged} initialValue={this.state.min}></InputField>
	                </Label>
	                <Label label='Maximum value' theme={this.props.theme}>
	                    <InputField onChange={this.onMaxChanged} initialValue={this.state.max}></InputField>
	                </Label>
	                <Label label='Device ID' theme={this.props.theme} >
	                    <InputField onChange={this.onDeviceChanged} initialValue={this.state.device}></InputField>
	                </Label>
	                <Label label='Property name' theme={this.props.theme} >
	                    <InputField onChange={this.onPropertyChanged} initialValue={this.state.property}></InputField>
	                </Label>                
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = StaticChartProperties;
