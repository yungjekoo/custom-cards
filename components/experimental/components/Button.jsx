var React = require('react');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');


var styles = {
    content:{
        cursor:"pointer"
    }
};

var Button = React.createClass({
	propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
        label:RPT.string,
        size:RPT.number,
        color:RPT.string,
        icon:RPT.string,
        onClick:RPT.func
	},

	getDefaultProps: function() {
		return {
            size:24,
            color:"#5a5a5a",
            onClick:function(){}
		};
	},
    
    onClick: function() {
		if (this.props.onClick) {
			this.props.onClick();
		}
	},

	render: function() {
        var styleContainer = Object.assign({}, styles.content, this.props.style);
        
        var icon ="";
        var button ="";

        if(this.props.icon){
            icon = <Icon size={this.props.size} 
                         color={this.props.color} 
                         icon={this.props.icon}  
                         style={styleContainer} 
                         onClick={this.onClick}
                         theme={this.props.theme}
                         />;
        }
        
        button = <div>
                    {icon}
                    {this.props.label}
                    {this.props.children}
                 </div>;
        
		return (
            <div>
                {button}
            </div>
		);
	}
});

module.exports = Button;
