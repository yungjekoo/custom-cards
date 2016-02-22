var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var Image = require('../../common/components/Image.jsx');

/**
* Card to show a simple image.
*/
var marginTop = 0;
var marginRight = 0;
var marginLeft = 0;
var marginBottom = 0;
var paddingTop= 0;
var cardTitle = 32;

var styles = {
		container:{
				fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
				margin: marginTop+" "+marginRight+"px " +marginBottom+"px ",
				paddingTop: paddingTop+"px",
				height: "100%"
		},
		imgScale:{
		maxWidth:"100%",
			 maxHeight:"100%"
		}
};


var ImageCard = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		url: RPT.string,
		scaleToFill: RPT.number
	},

	getDefaultProps: function() {
		return {
						width:null,
						height:null
		};
	},

	getInitialState: function() {
		return {
						width:this.props.width,
						height:this.props.height,
						scaleToFill:this.props.scaleToFill
		};
	},

		componentWillMount:function(){

		},

	componentDidMount: function() {
				var parent = ReactDOM.findDOMNode(this).parentNode;
				styles.container.height=parent.clientHeight-paddingTop-cardTitle-marginBottom+"px";
				this.setState({didMount:true});
	},


		componentWillReceiveProps: function(props) {
				var parent = ReactDOM.findDOMNode(this).parentNode;
				this.setState({scaleToFill:props.scaleToFill});
				styles.container.height=parent.clientHeight-paddingTop-cardTitle-marginBottom+"px";
	},

		componentDidUpdate: function(){
				if(this.image){
						this.imageOnLoad();
				}
		},

		imageOnLoad:function(e){

				if(this.state.scaleToFill==="1"){
						this.node = ReactDOM.findDOMNode(this);
						this.image=this.image?this.image:e.target;
						this.imgHeight =this.imgHeight?this.imgHeight:this.image.naturalHeight;
						this.imgWidth = this.imgWidth?this.imgWidth:this.image.naturalWidth;
						this.height = this.node.offsetHeight;
						this.width = this.node.offsetWidth;
						var factor = Math.max(this.height/this.imgHeight, this.width/this.imgWidth);
						if(this.state.width!==Math.ceil(this.imgWidth*factor)+ "px"||
							 this.state.height!==Math.ceil(this.imgHeight*factor) + "px"
							){
								this.setState({width:Math.ceil(this.imgWidth*factor) + "px"});
								this.setState({height:Math.ceil(this.imgHeight*factor) + "px"});
						}
				}
				else{
						if (this.state.width!=="") {this.setState({width:""});}
						if (this.state.height!=="") {this.setState({height:""});}
				}
				this.image=this.image?this.image:e.target;
		},

	render: function() {
			 var imageScale = this.props.scaleToFill==="1"?{}:styles.imgScale;
		return (
			<div style={styles.container}>
								<Image theme={this.props.theme} url={this.props.url} style={imageScale} width={this.state.width} height={this.state.height} onLoad={this.imageOnLoad}></Image>
						</div>
				);
	}
});

module.exports = ImageCard;
