var React = require('react');
var RPT = React.PropTypes;
var SimpleText = require('../../common/components/SimpleText.jsx');

/*
 *  Simple text card
 *
 */

var styles = {
    container:{
         fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
        margin: "0 20px 20px",
        paddingTop: "20px"
    }
};


var SimpleTextCard = React.createClass({

	propTypes: {
        theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		content: RPT.string,
		fontSize: RPT.string,
        alignment: RPT.string,
        alignmentsHeader: RPT.string
	},

	getDefaultProps: function() {
		return {
            
		};
	},

	getInitialState: function() {
		return {
            value:""
		};
	},

	componentWillMount: function() {
        
	},

	onUpdate: function(payload) {
        
	},
    
    componentWillUpdate:function(payload){
         var wrapper = this.props.wrapper;
        if(wrapper.height == 1){
           styles.container.paddingTop = "10px";
        }
        else{
            styles.container.paddingTop = "20px";
        }
    },

	render: function() {
       
         var wrapper = this.props.wrapper;
        if(wrapper.height == 1){
           styles.container.paddingTop = "10px";
        }
        else{
            styles.container.paddingTop = "20px";
        }
        
		return (
			<div style={styles.container}>
                <SimpleText theme={this.props.theme} fontSize={this.props.fontSize} alignment={this.props.alignment} >{this.props.content}</SimpleText>
            </div>
        );
	}
});

module.exports = SimpleTextCard;
