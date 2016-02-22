var React = require('react');
var CardAction = require('../../common/components/CardAction.jsx');
var Actions = require('../dashboard/Actions.jsx');
var RPT = React.PropTypes;

/**
* Empty component as placeholder as long as it is not defined. Shows the gear icon.
*/
var styles = {
	container: {
		paddingTop: "30px"
	}
};

var EmptyComponent = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},

	render: function() {
		var self = this;
		var action = function() {
			Actions.showDialog({
				id: self.props.wrapper.id,
				action: 'selectCard'
			});
		};
		return (
			<div style={styles.container}><CardAction icon='settings' size='70' action={action}>{this.props.actionText}</CardAction></div>
		);
	}
});

module.exports = EmptyComponent;
