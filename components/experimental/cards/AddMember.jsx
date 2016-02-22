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

var AddMember = React.createClass({


  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    type: RPT.string.isRequired,
    wrapper: RPT.object
  },

  render: function() {
        var myVar = setInterval(getAddMemberData, 300);
    var self = this;

        var getAddMemberData = function() {
        var url = "/sso";
        $.getJSON(url, function(addMemberData){
            console.log(addMemberData);
            });
        };

    var action = function() {
      Actions.showDialogAddMember({
        id: self.props.wrapper.id,
        action: 'initial'
      });
    };

    return (
            <div style={styles.container}>
                <CardDescription theme={this.props.theme}>                              Add Member Dialog
                </CardDescription>
                <div></div>
                <CardSection theme={this.props.theme}>
                <CardAction icon={this.props.actionIcon} action={action}>{this.props.actionText}
                </CardAction></CardSection>
            </div>
    );
  }
});

module.exports = AddMember;
