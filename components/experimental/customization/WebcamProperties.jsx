var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;

var WebcamProperties = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object,
		frequency: RPT.number,
	    url: RPT.string
	},

	getDefaultProps: function() {
		return {
			frequency: 5,
		  	url: null
		};
	},

	getInitialState: function() {
		return {
			frequency: this.props.frequency,
			url: this.props.url !== undefined?this.props.url:null
		};
	},

	onUrlChanged: function(value) {
		this.setState({
		  url: value
		});
	},

	onFrequencyChanged: function(value) {
		this.setState({
		  frequency: value
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
				<DialogTab id="Source selection" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_SOURCESEL_Webcam")}>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_URL_Webcam")} theme={this.props.theme}>
	                    <InputField theme={this.props.theme} onChange={this.onUrlChanged} initialValue={this.state.url}></InputField>
	                </Label>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_UPDATEFREQ_Webcam")} theme={this.props.theme}>
	                    <InputField theme={this.props.theme} onChange={this.onFrequencyChanged} initialValue={this.state.frequency}></InputField>
	                </Label>
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = WebcamProperties;
