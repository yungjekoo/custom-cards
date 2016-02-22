var React = require('react');
var RPT = React.PropTypes;

var styles = {
    imageWrapper:{
        width:"inherit",
        height:"inherit"
    },
    imageError:{
        height: "100%",
        width:"100%",
        display: "table"
    },
    imageErrorText:{
        display:"table-cell",
        verticalAlign:"middle",
        textAlign:"center"
    }
};

// TODO Called IoTImage because of Namespace conflicts -> Fix this
var Image = React.createClass({
	propTypes: {
		url: RPT.string,
        width: RPT.number,
        height: RPT.number,
        style: RPT.object,
        onError: RPT.func
	},

	getDefaultProps: function() {
		return {
		};
	},

	getInitialState: function() {
		return {
		  url: this.props.url?this.props.url:"",
          width: this.props.width?this.props.width+"px":"",
          height: this.props.height?this.props.height+"px":"",
          error:false
		};
	},
    
    componentWillReceiveProps: function(props) {
        this.setState({error:false});
        console.log(props.url);
        this.setState({url:props.url});
       if(this.state.width !== props.width){
            this.setState({width:props.width});
        }
        if(this.state.height !== props.height){
             this.setState({height:props.height});
        }
	},
    
    handleError: function(e){
        if (typeof this.props.onError === 'function') {
            this.props.onError(e.target.value);
        }
        else{
            this.setState({error:true});
        }
    },
    
    onLoad: function(e){
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(e);
        }
    },

	render: function() {
        var errorMsg ="";
        
        var image = <img width={this.state.width} height={this.state.height} src={this.state.url} onError={this.handleError} onLoad={this.onLoad} style={this.props.style}/>;
        
        if(this.state.error&&this.state.url!==""){
            errorMsg = <div style={styles.imageError}><span style={styles.imageErrorText}>No image available</span></div>;
            image = "";
        }
        
		return (
            <div style={styles.imageWrapper}>
            {image}
            {errorMsg}
            </div>
		);
	}
});

module.exports = Image;
