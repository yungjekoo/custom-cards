var React = require('react');
var RPT = React.PropTypes;

var styles = {
    content:{
        textOverflow: "ellipsis"
    }
};

// Documentation link: 
// https://github.ibm.com/IoT/dashboard-component/wiki/Text-component
//

var SimpleText = React.createClass({
	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		fontSize: RPT.number,
		alignment: RPT.string
	},

	getDefaultProps: function() {
		return {
		  initialValue: ""
		};
	},

	getInitialState: function() {
		return {
		  value: this.props.initialValue
		};
	},

	render: function() {
        styles.content.fontSize = this.props.fontSize;
        styles.content.textAlign = this.props.alignment;
        styles.content.color=this.props.theme?this.props.theme.text:"";
        
        var styleContainer = Object.assign({}, styles.content, this.props.style);
        
		return (
			<div style={styleContainer}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = SimpleText;
