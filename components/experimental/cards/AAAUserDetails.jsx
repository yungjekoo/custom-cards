var React = require('react');
var CardAction = require('../../common/components/CardAction.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardTitle = require('../../common/components/CardTitle.jsx');
var CardDescription = require('../../common/components/CardDescription.jsx');
var Actions = require('../dashboard/Actions.jsx');
var AAAStore = require('../../AAA/stores/AAAStore');
var RPT = React.PropTypes;

var styles = {
  container: {
    paddingTop: "20px",
        textAlign: "center"
  }
};

var AAAUserDetails = React.createClass({


    componentDidMount: function() {
        AAAStore.listen(this.onUpdate);
        AAAStore.Actions.connect();
    },

  propTypes: {
    theme: RPT.object.isRequired,
        nls: RPT.object,
    style: RPT.object,
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
        var ssoData = this.state.data;

    var action = function() {
      Actions.showDialogAAAUserDetails({
        id: self.props.wrapper.id,
        action: 'initial'
      });
    };

    return (
             <div style={styles.container}>
                <CardDescription theme={this.props.theme}>
                    User list and detail dialog
                </CardDescription>

                <CardSection theme={this.props.theme}>
                    <CardAction icon={this.props.actionIcon} action={action}>{this.props.actionText}
                    </CardAction>
                </CardSection>
            </div>
    );
  }
});

module.exports = AAAUserDetails;
