var React = require('react');
var CardAction = require('../../common/components/CardAction.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDescription = require('../../common/components/CardDescription.jsx');
var Actions = require('../dashboard/Actions.jsx');
var RPT = React.PropTypes;

var styles = {
	container: {
		paddingTop: "20px",
        textAlign: "center"
	}
};  

var Login = React.createClass({


	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},
 
	render: function() {
        var myVar = setInterval(getLoginData, 300);
		var self = this;
        
        var getLoginData = function() {     
        var url = "/sso";
        $.getJSON(url, function(loginData){
            console.log(loginData);
            });
        };
        
		var action = function() {
			Actions.showDialogLogin({
				id: self.props.wrapper.id,
				action: 'initial'
			});
		};
        
		return (
            <div style={styles.container}>
                <CardDescription theme={this.props.theme}>
                    Login for IoTF UI
                </CardDescription>
                <div></div>
                <CardSection theme={this.props.theme}>
                <CardAction icon={this.props.actionIcon} action={action}>{this.props.actionText}
                </CardAction></CardSection>
            </div>
		);
	}
});

module.exports = Login;
