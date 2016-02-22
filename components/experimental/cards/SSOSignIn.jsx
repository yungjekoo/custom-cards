var React = require('react');
var CardAction = require('../../common/components/CardAction.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardTitle = require('../../common/components/CardTitle.jsx');
var CardDescription = require('../../common/components/CardDescription.jsx');
var Actions = require('../dashboard/Actions.jsx');
var SSOSignInStore = require('../../AAA/stores/SSOSignInStore');
var RPT = React.PropTypes;

var styles = {
  container: {
    paddingTop: "20px",
        textAlign: "center"
  }
};

var SSOSignIn = React.createClass({


    componentDidMount: function() {
        SSOSignInStore.listen(this.onUpdate);
        SSOSignInStore.Actions.connect();
    },

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
        nls: RPT.object,
    type: RPT.string.isRequired,
    wrapper: RPT.object
  },

    getInitialState: function() {
        return {data: []};
    },

    onUpdate:function(payload){
        console.log("PAYLOAD",payload);
        if(payload.clientData){this.setState({data:payload.clientData});}
    },

  render: function() {
    var self = this;
        var ssoSignInData = this.state.data;

    var action = function() {
      Actions.showDialogSSOSignIn({
        id: self.props.wrapper.id,
        action: 'initial'
      });
    };

    return (
             <div style={styles.container}>
                <CardDescription theme={this.props.theme}>
                    SSO Login in ACME Style
                </CardDescription>

                <CardSection theme={this.props.theme}>
                    <CardAction icon={this.props.actionIcon} action={action}>{this.props.actionText}
                    </CardAction>
                </CardSection>
            </div>
    );
  }
});

module.exports = SSOSignIn;
