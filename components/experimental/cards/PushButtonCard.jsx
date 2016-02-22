var React = require('react');
var RPT = React.PropTypes;
var Button = require('../../common/components/Button.jsx');
var SimpleText = require('../../common/components/SimpleText.jsx');

/*
 *  Push button card
 *
 */

var paddingTop = "20px";

var styles = {
    container:{
         fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
        textAlign:"center",
        margin: "0 20px 20px",
		paddingTop: paddingTop
    },
    subtext:{
    }
};


var PushButtonCard = React.createClass({

	propTypes: {
        theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
        subtext:RPT.string,
        action:RPT.func,
        icon:RPT.string
	},

	getDefaultProps: function() {
		return {
            text:"",
            icon:"restore",
            subtext:"",
            action:function(){alert("Not implemented yet");}
		};
	},

	getInitialState: function() {
		return {
            size:128,
            subtextSize:14
		};
	},

	componentWillMount: function() {
       this.scaleIcon(this.props); 
	},
    
    componentWillReceiveProps:function(props){
        this.scaleIcon(props);
    },
    
    scaleIcon: function(props){
        var subtextOff = props.subtext?10:0;
         if(props.wrapper.height==1||props.wrapper.width==1){
            this.setState({size:48-subtextOff,
                           subtextSize:14});
            styles.container.paddingTop="0px";
        }        
        else if(props.wrapper.height==2||props.wrapper.width==2){
            this.setState({size:128-subtextOff*3,
                           subtextSize:14});
            styles.container.paddingTop=paddingTop;
            styles.subtext.fontSize="14px";
        }
        else if(props.wrapper.height==3||props.wrapper.width==3){
            this.setState({size:210-subtextOff*3,
                           subtextSize:24});
            styles.container.paddingTop=paddingTop;
            styles.subtext.fontSize="24px";
        }
    },
    
    onClick: function() {
		if (this.props.action) {
			this.props.action();
		}
	},

	render: function() {
        
		return (
			<div style={styles.container}>
               <Button 
                    icon={this.props.icon} 
                    size={this.state.size}
                    onClick={this.onClick}
                    theme={this.props.theme}
                >
               </Button>
                <SimpleText theme={this.props.theme} fontSize={this.state.subtextSize}>{this.props.subtext}</SimpleText>
            </div>
        );
	}
});

module.exports = PushButtonCard;
