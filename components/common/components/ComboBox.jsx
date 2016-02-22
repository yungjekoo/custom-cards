/*global require, module*/
var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var InputField = require('./InputField.jsx');
var Option =require('./Option.jsx');

var styles = {
	container:{
		display:"block",
		width:"100%"
	},
	inputField:{
		width: "100%",
		boxSizing: "border-box"
	},
	optionsContainer:{
		position:"relative",
		WebkitTransition: "all .2s ease-in-out",
		transition: "all .2s ease-in-out",
		overflowX:"auto",
		maxHeight: "200px",
		overflow: "auto",
		zIndex: "1000"
	},
	emptyOption:{
		padding:"6px"
	}
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Combobox-component
//

var ComboBox = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		onChange: RPT.func,
		initialValue: RPT.string,
		placeholderNoItems: RPT.string
	},

	getDefaultProps: function () {
	  return {
		placeholderNoItems: ""
	  };

	},

	getInitialState: function() {
		return {
			input: this.props.initialValue||"",
			hasInput: this.props.initialValue!=="",
			filteredChildren: [],
			isOpen:false
		};
	},

	componentWillMount:function(){
		this.chidrenAttachSelect();
	},


	componentDidMount:function(){
		this.chidrenAttachSelect();
		this.filterChildren(this.state.input);
		this.updateOptionsSize();
	},

	componentDidReceiveProps:function(){
		this.chidrenAttachSelect();
		this.filterChildren(this.state.input);
	},

	updateOptionsSize:function(){
		if (this.refs.comboBox) {
			var newWidth = ReactDOM.findDOMNode(this.refs.comboBox).offsetWidth;
			styles.optionsContainer.width = newWidth;
		}
	},

	componentWillUpdate:function(){
		this.updateOptionsSize();
	},

	chidrenAttachSelect:function(){
		var self = this;
		var childrenWithSelect = [];
		React.Children.forEach(this.props.children,function(child){
			var childWithSelect = React.cloneElement(child, {onSelect:self.onSelect});
			childrenWithSelect.push(childWithSelect);
		});
		this.setState({
			children: childrenWithSelect
		})
	},

	filterChildren: function(comp){
		var filteredChildren = [];

		React.Children.forEach(this.state.children,function(child){
			if (child) {
				if(child.props && (child.props.children.startsWith(comp)||child.props.value.startsWith(comp))){
					filteredChildren.push(child);
				   }
			}
		});
		this.setState({filteredChildren:filteredChildren});
		return filteredChildren;
	},

	handleInput: function(value){
		if(value === "" ){
			this.setState({hasInput:false,input:value,isOpen:true});
		}
		else{
			this.setState({hasInput:true,input:value,isOpen:true});
		}
		this.chidrenAttachSelect();
		this.filterChildren(value);
		this.onChange(value);
	},

	onSelect:function(value,label,event){
		this.setState({input:label,hasInput:true,isOpen:false});
		 this.onChange(label);
	},

	onFocus: function(){
		this.setState({isOpen:true});
		this.chidrenAttachSelect()
		this.filterChildren(this.state.input);
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	},

	onBlur: function(){
	   this.setState({isOpen:false});
	   this.onChange(this.state.input);
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	},

	onChange:function(value){
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	},

	renderInputField: function(){
		return <InputField style={styles.inputField} containerStyle={{width:"100%"}} theme={this.props.theme} initialValue={this.props.initialValue} value={this.state.input} onChange={this.handleInput} onFocus={this.onFocus} onBlur={this.onBlur}></InputField>;
	},

	renderChildren: function(){
		var children = "";

		var optionsContainer = Object.assign({},styles.optionsContainer,this.props.optionsContainerStyle);

		if(this.state.hasInput){
			if(this.state.filteredChildren.length!==0){
				console.log(this.state.filteredChildren);
				children = this.state.filteredChildren;
			}
			else{
				children = this.props.placeholderNoItems !== '' ? <Option value={null} theme={this.props.theme} style={styles.emptyOption} onSelect={function(){}} disabled={true}>{this.props.placeholderNoItems}</Option> : '';
			}
		}
		else{
			children= this.state.children;
		}
		var lastIndex = Array.isArray(children)?children.length-1:null;
		var childrenElement =  children !== '' ? <div style={optionsContainer}>{React.Children.map(children,function(child,idx){
									var currProps = {};
									if(lastIndex&&lastIndex==idx){
										currProps= {lastChild:true,firstChild:false};
									}
									else if(idx===0){
										currProps= {lastChild:false,firstChild:true};
									}
									else{
										currProps= {lastChild:false,firstChild:false};
									}
									var newChild = React.cloneElement(child,currProps);
									return newChild;
								})}</div> : '';

		return childrenElement;
	},

	render: function() {

		var containerStyle = Object.assign({},styles.container,this.props.style);
		return (
			<div ref="comboBox" style={containerStyle}>
				{this.renderInputField()}
				{this.state.isOpen?this.renderChildren():""}
			</div>
		);
	}
});

module.exports = ComboBox;
