var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationDialog = require('../dashboard/CustomizationDialog.jsx');
var DashboardDialog = require('../dashboard/DashboardDialog.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var DialogTab = DashboardDialog.DialogTab;

var SimpleTextProperties = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object,
	    content: RPT.string,
	    alignments: RPT.string,
        fontSize:RPT.string
	},

	getDefaultProps: function() {
		return {
		  parameters: {}
		};
	},

	getInitialState: function() {
		return {
			content: this.props.content?this.props.content:null,
			alignments: this.props.alignments?this.props.alignments:null,
            alignment: this.props.alignment?this.props.alignment:"left",
            fontSize:this.props.fontSize?this.props.fontSize:null
		};
	},

	componentDidMount: function() {
	},

	onContentChanged: function(text) {
		this.setState({
		  content: text
		});
	},

	onAlignmentChanged: function(value) {
		this.setState({
		  alignment: value
		});
	},
    
    onFontSizeChanged: function(value){
        this.setState( {
          fontSize:value   
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
				<DialogTab id="Text" theme={this.props.theme} label={this.props.nls.resolve("COMP_TAB_TEXT_SimpleText")}>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_CONTENT_SimpleText")} theme={this.props.theme}>
	                    <InputField theme={this.props.theme} onChange={this.onContentChanged} initialValue={this.state.content}></InputField>
	                </Label>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_ALIGN_SimpleText")} theme={this.props.theme}>
                        <Select theme={this.props.theme} onChange={this.onAlignmentChanged} value={this.state.alignment} >
                            {(JSON.parse(this.props.nls.resolve(this.props.alignments))).map(function(option){
                                return <Option value={option.value}>{option.label}</Option>;
                            })}
                            </Select>
                    </Label>
	                <Label label={this.props.nls.resolve("COMP_CUSTOM_FSIZE_SimpleText")} theme={this.props.theme}>
	                   <Select theme={this.props.theme} onChange={this.onFontSizeChanged} value={this.state.fontSize} >
                            {(JSON.parse(this.props.nls.resolve(this.props.fontSizeList))).map(function(option){
                                return <Option value={option.value}>{option.label}</Option>;
                            })}
                        </Select>
                    </Label>
				</DialogTab>
			</CustomizationDialog>
		);
	}
});

module.exports = SimpleTextProperties;
