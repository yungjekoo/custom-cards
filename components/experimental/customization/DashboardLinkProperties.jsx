var React = require('react');
var RPT = React.PropTypes;
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;

var DashboardLinkProperties = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
        target:RPT.string
	},

	getDefaultProps: function() {
		return {
		  target: null
		};
	},

	getInitialState: function() {
		return {
            target:this.props.target?this.props.target:null
		};
	},

	onTargetChanged: function(target) {
		this.setState({
		  target: target
		});
	},

	onUpdate: function(state) {
		var updatedState = Object.assign({},this.state, state);
		this.setState(updatedState);
	},
    
	render: function() {
        console.log("THIS PROPS TARGET",this.props);
		var newProps = Object.assign({}, this.props, this.state);
		// TODO this class is referenced in DashboardStore, therefore require does not work
		var DashboardStore = require('../dashboard/DashboardStore');
		var dashboards = DashboardStore.getDashboards();

		var self = this;
	    var selection = (<Select onChange={this.onTargetChanged} dummy={self.state.target} value={self.state.target}>
	      {dashboards.map(function(option) {
	        return (<Option value={option.name}>{option.label}</Option>);
	      })}
	    </Select>);

        return (
			<CustomizationDialog {...newProps} onUpdate={this.onUpdate}>
				<DialogTab id="TargetSelection" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_TARGET_DashboardLink")}>
	                <Label label={this.props.nls.resolve("Target")} theme={this.props.theme}>
	            	   {selection}
	                </Label>
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = DashboardLinkProperties;
