var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var $ = require('jquery');
var moment = require('moment');

var DashboardDialog = require('../../Dialog/Dialog.jsx');
var Dialog = DashboardDialog.Dialog;
var DialogTab = DashboardDialog.DialogTab;
var DialogButtons = DashboardDialog.DialogButtons;
var Section = require('../../common/components/Section.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var Button = require('../../common/components/Button.jsx');
/*var Messages = require('../../Dashboard/nls/Messages');*/
var IconLink = require('../../common/components/IconLink.jsx');
var Icon = require('../../common/components/Icon.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var existingRoles = [];

var styles = {
    sectionText: {
        marginBottom: "40px"
    },

    addPermText: {
        color: "#5c91cc",
        fontWeight: "700",
        textTransform: "none",
        fontSize: "14px"
    },

    detailLabel: {
        float: "left",
        fontSize: "15px",
        paddingTop: "10px",
        width: "50%",
        wordWrap: "break-word"
    },

    detailData: {
        float: "left",
        fontSize: "15px",
        paddingTop: "10px",
        fontWeight: "bold",
        width: "50%",
        wordWrap: "break-word"
    },

    detailDataSelect: {
        float: "left",
        width: "45%",
        paddingTop: "5px",
        fontWeight: "bold"
    },
    
    itemlist: {
        paddingTop: "15px",
        paddingLeft: "40px",
        paddingRight: "40px"
    },

    itemlistDelete: {
        float: "right",
        cursor: "pointer"
    },
    
    boldText:{
        fontWeight: "bold"
    },
    
    detailTable: {
        width: "100%",
        borderCollapse: "initial"
    }
};

var Item = React.createClass({
      render: function() {
        return (
          <div style={styles.itemlist}>
            <span>{this.props.value}</span>
            <span style={styles.itemlistDelete} onClick={this.props.onClickClose}><Icon icon="delete" color="#333333" size="18" theme={this.props.theme}/></span>
          </div>
        );
      }
    });
module.exports = Item;


var DialogAAAUserDetails = React.createClass({

    propTypes: {
        theme: RPT.object.isRequired,
        nls: RPT.object,
        member: RPT.object,
        style: RPT.object,
        url: RPT.string,
        visible: RPT.bool.isRequired,
        scaleToFill:RPT.string
    },

    getDefaultProps: function() {
        return {
            member: {
                roles:[], 
                roleText:'', 
                email:'', 
                invitedBy:'', 
                orgId:'', 
                firstName:'', 
                lastName:'', 
                displayName:'', 
                comment:'', 
                status:1, 
                owner:false, 
                realmName:'', 
                issuer:'', 
                lastLogin:'', 
                dateAdded:'', 
                lastUpdate:'',
                expiresAt:''
            },
            defaultRoles: [{
                defaultDescription:'',
                defaultName:'',
                descriptionNlsLabel:'', 
                domainsList:[], 
                lastUpdate: '', 
                modifiable: false, 
                nameNlsLabel:'', 
                organization:'', 
                status: 1, 
                uid:''
            }]
        };
    },
    
    apiRequestUpdateRoles: function(){
        var self = this;
        var roleData = {
            roles: existingRoles,
        };
        var roleDataJson = JSON.stringify(roleData);
        
        $.ajax({
            url: window.location.origin+"/api/v0002/authorization/apikeys/{apiKey}/roles",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: roleDataJson,
            beforeSend:function(){
            // this is where I append a loading image
            },
            success:function(data){
            // successful request; do something with the data
            },
            error:function(){
            // failed request; give feedback to user
            }   
        });
    },
    
    
    apiRequestGetApiKey: function(){
        var self=this;
        var requestURL = window.location.origin+"/api/v0002/authorization/apikeys/";
        var request = $.get(requestURL)
          .done(function(response) {
            console.log( "success" + response.toString() );
          })
          .fail(function() {
            console.log( "error" );  
          });
    },
    
    
    getInitialState: function() {
        return {
            roleItems: []
        }; 
    },

    componentDidMount: function(){
      this.apiRequestGetApiKey();  
    },
    
    componentWillReceiveProps: function(newProps) {  
        existingRoles = newProps.member.roles.map(function(element){
            if (element.orgId){
                delete element.orgId;
            }
            return element;
        });
        
        var roleNlsLabels = newProps.member.roleText.split(", ").map(function(label){ 
            return {value: label};                                                                              
            });
            this.setState({
                roleItems: roleNlsLabels
            });   
    },

 
    onClose: function(){
        if(this.props.emitter){
          this.props.emitter.emit("ReactDialog.Close", {
            value: 'DialogAAAUseDetails'
          });
        }
        
        this.setState({
            roleItems: []
        });
    },
    
    onSubmit: function(){
        if(this.props.emitter){
            this.props.emitter.emit("ReactDialog.Submit", {
              value: 'DialogAAAUseDetails'
            });
            this.props.emitter.emit("ReactDialog.Close", {
              value: 'DialogAAAUseDetails'
            });
        }
        this.apiRequestUpdateRoles();
        this.setState({
            roleItems: []
        });
    },
    
    // Role - handling Start
    
    onRoleChange: function(value) {
        this.setState({
          roleValue: value
        });
    },
     
    addRoleItem: function() {
        var roleItems = this.state.roleItems;  
        var i;
        var checkExistRoles = false;
            
        for (i = 0; i<existingRoles.length; i++) {
            if (existingRoles[i].uid == this.state.roleValue.uid){
                checkExistRoles = true;
            }
        }
            
        if (this.state.roleValue && !checkExistRoles){
            existingRoles.push({
                uid:this.state.roleValue.uid
            });
            roleItems.push({
              value: this.state.roleValue.nameNlsLabel
            });  
            this.setState({
              roleItems: roleItems,
              roleValue: "",
            });
        }
    },
      
    removeRoleItem: function(index) {
	    existingRoles.splice(index, 1);  
        this.state.roleItems.splice(index, 1);
        this.setState({
          roleItems: this.state.roleItems
        });
    },
    
     // Role - handling End

    render: function() {
            
        var roleOption = this.props.defaultRoles.map(function(role){
            return (
                <Option value={role}>{role.nameNlsLabel}</Option>
            )
        });
        
        var statusOfAccess =  "";

        if (this.props.member.status == 1) {
          statusOfAccess = "Access allowed" 
        }
        else {
          statusOfAccess = "Access denied"
        }

        var roleItems = this.state.roleItems.map(function(roleItem, index) {
          return (
            <Item
            key={index}
            value={roleItem.value}
            onClickClose={this.removeRoleItem.bind(this, index)}
            /> );
        }.bind(this));


        var dialogTitle = "User ID: " + this.props.member.email;

        if (this.props.visible ) {
            return(
                <Dialog title={dialogTitle} theme={this.props.theme} nls={this.props.nls} onCancel={this.onClose} onSubmit={this.onSubmit}>
                    <DialogTab id="details" theme={this.props.theme} label="Details" status={'active'}>
                            <Section headingSection="User Details">
                                    <div>
                                        These are details of the user such as email adress and name information.
                                    </div>              
                                    <table style={styles.detailTable}>
                                        <tr>
                                            <td style={styles.detailLabel}>User</td>
                                            <td style={styles.detailData}>{this.props.member.email}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Email</td>
                                            <td style={styles.detailData}>{this.props.member.email}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Added on</td>
                                            <td style={styles.detailData}>{moment(this.props.member.dateAdded).format('MMM Do YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Added by</td>
                                            <td style={styles.detailData}>{this.props.member.invitedBy}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Last Login</td>
                                            <td style={styles.detailData}>{moment(this.props.member.lastLogin).format('MMM Do YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Last Update</td>
                                            <td style={styles.detailData}>{moment(this.props.member.lastUpdate).format('MMM Do YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Expiry</td>
                                            <td style={styles.detailData}>{moment(this.props.member.expiresAt).format('MMM Do YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Status</td>
                                            <td style={styles.detailData}>{statusOfAccess}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Organization ID</td>
                                            <td style={styles.detailData}>{this.props.member.orgId}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Authentication Provider</td>
                                            <td style={styles.detailData}>{this.props.member.realmName}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Display Name</td>
                                            <td style={styles.detailData}>{this.props.member.displayName}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>First Name</td>
                                            <td style={styles.detailData}>{this.props.member.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Last Name</td>
                                            <td style={styles.detailData}>{this.props.member.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.detailLabel}>Comment</td>
                                            <td style={styles.detailData}>{this.props.member.comment}</td>
                                        </tr>
                                    </table>

                            </Section>
                    </DialogTab>
                    <DialogTab id="permissions" theme={this.props.theme} status={'active'} label="Permissions" isSubmitTab={true}>
                            <Section headingSection="Permissions">
                                <div>
                                    <h3>Role</h3>
                                </div>
                                <Label label='Change roles for your user from predefined list' theme={this.props.theme}>
                                    <Select onChange={this.onRoleChange} theme={this.props.theme}>
                                        {roleOption}
                                    </Select>
                                    <Button onClick={this.addRoleItem} text={'Add Roles'}>
                                    </Button>
                                </Label>
                                <div style={styles.boldText}>
                                  Assigned Roles:
                                </div>
                                <div>
                                    {roleItems}
                                </div>      
                            </Section>
                    </DialogTab>
                </Dialog>
            );
    } else {
      return (<div/>);
    }
  }
});

module.exports = DialogAAAUserDetails;
