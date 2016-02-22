var React = require('react');
var RPT = React.PropTypes;
var $ = require('jquery');

var styles = {
	container: {
		cursor: "pointer",
        postion: "fixed"
	},

    tooltipContentArrow: {
        position: "fixed",
        width: "0",
        height: "0",
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "5px solid black"
},

    tooltipContent:{
        zIndex: "2000",
        border: "2px",
        borderStyle: "solid",
        borderColor: "#AEB8B8",
        padding: "10px",
        /*position: "fixed",*/
        marginTop: "25px",
        position: "absolute",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "normal",
        background: "#5596E6",
        textAlign: "center"
	}
};


var Tooltip = React.createClass({
	propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired
	},

    getInitialState: function () {
        return {hover: false};
    },

    mouseOver: function (event) {
        this.setState({hover: true});
        /*this.setState({posX: event.clientX+"px"});
        this.setState({posY: event.clientY+"px"});*/
    },

    mouseOut: function () {
        this.setState({hover: false});
    },

    getDefaultProps: function() {
        return {
            tTipDisplay: "none",
            tTipHoverDisplay: "inherit",
            tooltipText: "MyTooltip"
        };
	},

    componentWillMount:function(){
		// TODO: fix this, props is static
        //this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.text||"#5a5a5a";
    },

  	render: function() {

     var tooltipText = this.props.tooltipText;
  		var tooltipContent = Object.assign({}, styles.tooltipContent, {
                display: this.props.tTipDisplay
        },this.props.style,this.props.theme);

        if (this.state.hover){
            tooltipContent = Object.assign({}, styles.tooltipContent, {
                display: this.props.tTipHoverDisplay,
                left: this.state.posX,
                top: this.state.posY
            },this.props.style,this.props.theme);
        }

        return (
               <span style={styles.container}>
                    <span onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
                        {this.props.children}
                    </span>
                        <span style={tooltipContent}> {this.props.tooltipText}
                        </span>
               </span>
	    );
	}
});

module.exports = Tooltip;
