var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;

var TestProperties = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object,
        value:RPT.string
	},

	getDefaultProps: function() {
		return {
		  value: null
		};
	},

	getInitialState: function() {
		return {
            value:this.props.value?this.props.value:""
		};
	},

	onValueChanged: function(value) {
		this.setState({
		  value: value
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
				<DialogTab id="Test" theme={this.props.theme} label="Test">
	                <Label label='Test' theme={this.props.theme}>
	                    <InputField onChange={this.onValueChanged} initialValue={this.state.value}></InputField>
	                </Label>
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = TestProperties;
