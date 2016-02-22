var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var DialogTab = DashboardDialog.DialogTab;

var PushButtonProperties = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
        icon:RPT.string,
        subtext:RPT.string
	},

	getDefaultProps: function() {
		return {
		  subtext:""
		};
	},

	getInitialState: function() {
		return {
            icon:this.props.icon?this.props.icon:null,
            subtext:this.props.subtext?this.props.subtext:""
		};
	},

	componentDidMount: function() {
	},

	onIconChanged: function(icon) {
		this.setState({
		  icon: icon
		});
	},
    
    onSubtextChanged: function(text) {
		this.setState({
		  subtext: text
		});
	},

	onUpdate: function(state) {
		var updatedState = Object.assign({},this.state, state);
		this.setState(updatedState);
	},
    
	render: function() {
		var newProps = Object.assign({}, this.props, this.state);
		var icons = JSON.parse(this.props.nls.resolve("ICONS"));
        var header = JSON.parse(this.props.nls.resolve("ICON_LIST_HEADER"));
        var selection = <Select onChange={this.onIconChanged} value={this.state.icon}>
                      {icons.map(function(icon) {
                        return <Option value={icon.value}>{icon.value}</Option>;
                      })}
                    </Select>;
        return (
			<CustomizationDialog {...newProps} onUpdate={this.onUpdate}>
				<DialogTab id="Button configuration" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_BTNCONF_PushButtonCard")}>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_ICON_PushButtonCard")} theme={this.props.theme}>
	                    {selection}
	                </Label>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_SUBTEXT_PushButtonCard")} theme={this.props.theme}>
	                    <InputField theme={this.props.theme} onChange={this.onSubtextChanged} initialValue={this.state.subtext}></InputField>
	                </Label>
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = PushButtonProperties;
