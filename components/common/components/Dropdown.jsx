var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var Option =require('./Option.jsx');
var Portal =require('./Portal.jsx');

var styles = {
	containerStyle:{

	},
	dropboxWrapper:{
		position:"absolute"
	},
	dropboxContainer:{
		minWidth: "160px",
		position: "fixed"
	}
};

var Dropdown = React.createClass({

  propTypes: {
	theme: RPT.object.isRequired,
	style: RPT.object
  },

	getDefaultProps:function(){
		return {
			topCorrection:0,
			leftCorrection:0
		};
	},

	getInitialState:function(){
		return{
			isOpen:false,
			left:"0px",
			top:"0px"
		};
	},

	componentDidMount: function componentDidMount() {
		document.addEventListener('click', this.handleClickOutside, true);
		console.log($(ReactDOM.findDOMNode(this.refs.trigger).children[0]));
		var nodeOffsetPos = $(ReactDOM.findDOMNode(this.refs.trigger).children[0]).offset();
		var nodeOffsetDim = $(ReactDOM.findDOMNode(this.refs.trigger).children[0])[0].offsetHeight;
		this.setState({left:nodeOffsetPos.left+"px",top:(nodeOffsetPos.top+nodeOffsetDim-$(window).scrollTop())+"px"});
	},

	componentWillUnmount: function componentWillUnmount() {
	  document.removeEventListener('click', this.handleClickOutside, true);
	},

	handleClickOutside: function handleClickOutside(e) {
		this.setState({isOpen:false});
	},

	onClick:function(event){
		this.setState({isOpen:!this.state.isOpen});
	},

  render: function() {
		var self = this;
		var containerStyle = Object.assign({},styles.containerStyle,this.props.style);
		styles.dropboxWrapper.left = this.state.left;
		styles.dropboxWrapper.top = this.state.top;

		styles.dropboxWrapper.fontFamily = this.props.theme.font;

		var lastIndex = Array.isArray(this.props.children)?this.props.children.length-1:null;
		var options =<Portal >
						<div style={styles.dropboxWrapper}>
							<div style={styles.dropboxContainer}>{this.state.isOpen?React.Children.map(this.props.children,function(child,idx){
									if(idx!== 0){
										var currProps = {};
										if(lastIndex&&lastIndex==idx){
											currProps= {onSelect:self.props.onSelect?self.props.onSelect:function(){},lastChild:true,firstChild:false};
										}
										else if(idx==1){
											currProps= {onSelect:self.props.onSelect?self.props.onSelect:function(){},lastChild:false,firstChild:true};
										}
										else{
											currProps= {onSelect:self.props.onSelect?self.props.onSelect:function(){},lastChild:false,firstChild:false};
										}
										var newChild = React.cloneElement(child,currProps);
										return newChild;
									}
									else{
										return null;
									}
								}):null}</div>
						</div>
					</Portal>;
	return (
	  <div style={containerStyle}>
				<div style={containerStyle} ref="trigger" onClick={this.onClick} >{this.props.children[0]||this.props.children}</div>
				{this.state.isOpen?options:null}
	  </div>
	);
  }
});

module.exports = Dropdown;
