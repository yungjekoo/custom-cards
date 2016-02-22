var React = require('react');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
	container: {
		cursor: "pointer"
	},
	action: {
		verticalAlign: "middle",
		margin: "4px"
	},
	label: {
		marginLeft: "5px"
	}
};

var IconLink = React.createClass({
	propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
		icon: RPT.string,
		color: RPT.string,
		size: RPT.number,
		action: RPT.func
	},

	getDefaultProps: function() {
		return {
		  size: 24
          // color default is set in componentWillMount
		};
	},

	onClick: function() {
		if (this.props.action) {
			this.props.action();
		}
	},

    componentWillMount:function(){
		// TODO: this should be state.  props can't change
        //this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.major||"#5a5a5a";
    },

  	render: function() {
  		var styleContainer = Object.assign({}, this.props.style, styles.container);
        var linkLabel = Object.assign({}, styles.label, {
            lineHeight: this.props.size+"px",
            color: this.props.color
        });

	    return (
	    	<div style={styleContainer} onClick={this.onClick}>
                <Icon icon={this.props.icon}
                    color={this.props.color}
                    size={this.props.size}
                    style={{verticalAlign:"middle"}}
                    theme={this.props.theme}
                >
                </Icon>
                <span style={linkLabel}>
                    {this.props.children}
                </span>
	    	</div>
	    );
	}
});

module.exports = IconLink;
