var React = require('react');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
	container: {
		fontSize: "12px",
		width: "100%",
		boxShadow: "0px 1px 1px rgba(192, 192, 192, 0.5)",
	    height: "40px",
	    lineHeight: "40px",
	    paddingLeft: "10px"
   	}
};

var CardIndicator = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		condition: RPT.string
	},

	render: function() {
		styles.container.color = this.props.theme.least;
		var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
		return (
			<div style={style} >
                <Icon icon={this.props.condition}
                    color={this.props.theme[this.props.condition]}
                    size={24}
                    style={{verticalAlign:"middle", marginRight: "10px"}}
                    theme={this.props.theme}
                >
                </Icon>
				{this.props.children}
			</div>
		);
	}
});

module.exports = CardIndicator;
