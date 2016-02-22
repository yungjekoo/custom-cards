var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var $ = require('jquery');

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
var IconLink = require('../../common/components/IconLink.jsx');
var Icon = require('../../common/components/Icon.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var re_email = require('../../Dashboard/util/regex-email');
var SwitchBtn = require('../../common/components/SwitchBtn.jsx');

var existingMails = [];
var existingRoles = [];
var roleResponse = {roles:[]};
var defaultRoles = [];
var orgId = "";
var user = "";

var styles = {
    sectionLine:  {
        clear: "both",
        marginBottom: "15px",
        paddingBottom: "15px",
        borderBottom:"2px solid",
        borderColor:"#ededed"
    },

    addPermText: {
        color: "#5c91cc",
        fontWeight: "700",
        textTransform: "none",
        fontSize: "14px"
    },

    btnImport: {
        float: "none"
    },

    textImport: {
        marginRight: "20px",
        display: "inline"
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


var DialogAddMember = React.createClass({

    propTypes: {
        theme: RPT.object.isRequired,
        nls: RPT.object,
        style: RPT.object,
        url: RPT.string,
        visible: RPT.bool.isRequired,
        scaleToFill:RPT.string,
        onSubmit: RPT.func
    },

    getInitialState: function() {
        return {
            noneExpireDate: this.props.noneExpireDate?this.props.noneExpireDate:null,
            items: [],
            roleItems: [],
            visibleInviteMember: true,
        };
    },

    onaddPermChange: function() {
    },

    // Email - handling Start
    
    handleChange: function(value) {
        this.setState({
          inputValue: value
        });
    },

    removeItem: function(index) {
      existingMails.splice(index, 1);
        this.state.items.splice(index, 1);
        this.setState({
          items: this.state.items
        });
    },
    
    addItem: function() {
        var items = this.state.items;
        var checkExistMails = existingMails.indexOf(this.state.inputValue) > -1;

        if (this.state.inputValue && this.state.inputValue.match(re_email) && !checkExistMails){
            existingMails.push(this.state.inputValue);
            items.push({
              value: this.state.inputValue
            });
            this.setState({
              items: items,
              inputValue: "",
            });
            this.refs.emailInput.setState({value:''});
        };
    },

    // Email - handling End
    
    // Role - handling Start
    
    onRoleChange: function(value) {
        this.setState({
          roleValue: value
        });
    },
    
    removeRoleItem: function(index) {
	    existingRoles.splice(index, 1);  
        this.state.roleItems.splice(index, 1);
        this.setState({
          roleItems: this.state.roleItems
        });
    },
     
    addRoleItem: function() {
        var roleItems = this.state.roleItems;
        var checkExistRoles = existingRoles.indexOf(this.state.roleValue.uid) > -1;
            
        if (this.state.roleValue && !checkExistRoles){
            existingRoles.push(this.state.roleValue.uid);
            roleItems.push({
              value: this.state.roleValue.nameNlsLabel
            });  
            this.setState({
              roleItems: roleItems,
              roleValue: "",
            });
        };
    },
    
    // Role - handling End


    editEmailText: function() {
    },
    
    onAddOrInvite: function(value) {
        this.setState({
            visibleInviteMember: value
        });
    },
    
    onClose: function(){
        if(this.props.emitter){
            this.props.emitter.emit("ReactDialog.Close", {
                value: 'DialogAddMember'
            });
            this.setState({
                items: []
            });
            this.setState({
                roleItems: []
            });
            console.log(event);
        }
    },
    
    checkRoleRequest: function(response){
        roleResponse = response;
        defaultRoles = roleResponse.roles;
        if(this.props.emitter){
            this.props.emitter.emit("ReactDialog.StoreRoles", defaultRoles);
        }
    },
    
    apiRequestGetRoles: function() {
        var self = this;
        var requestURL = window.location.origin+"/api/v0002/authorization/roles";
        var request = $.get(requestURL)
            .done(function(response) {
            console.log("success");
            self.checkRoleRequest(response); 
            })
            .fail(function() {
            console.log("error");
            });       
     },    
    
//    apiRequestAdd: function(){
//        var self = this;
//        var add = {
//            orgId: orgId,
//            roles: existingRoles,
//            authProvider: ["facebook"],
//            emails: existingMails,
//            comment: "testComment",
//            expiryDate: null,
//            invitationExpiryDate: null,
//            invitedBy: user,
//            status: 1
//        };
//        var addJson = JSON.stringify(add);
//        
//        $.ajax({
//            url: window.location.origin+"/api/v0002/authentication/user/registration/multiple",
//            type: 'post',
//            dataType: 'json',
//            contentType: 'application/json',
//            data: addJson,
//            beforeSend:function(){
//            // this is where I append a loading image
//            },
//            success:function(data){
//            // successful request; do something with the data
//            },
//            error:function(){
//            // failed request; give feedback to user
//            }   
//        });
//    },
    
    apiRequestAdd: function(){
        var self = this;
        var add = {
            uniqueSecurityName: "uniqueName",
            realmName: "IBM",
            owner: false,
            firstName: "FirstName",
            lastName: "LastName",
            displayName: "Name",
            issuer: "IBM",
            roles: existingRoles,
            emails: existingMails,
            comment: "testComment",
            expiresAt: null,
            invitedBy: user,
            status: 1
        };
        var addJson = JSON.stringify(add);
        
        $.ajax({
            url: window.location.origin+"/api/v0002/authorization/users/multiple",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: addJson,
            beforeSend:function(){
            // this is where I append a loading image
            },
            success:function(data){
            // successful request; do something with the data
                if(this.props.emitter){
                    this.props.emitter.emit("ReactDialog.Submit", {
                    value: 'DialogAddMember'
                    }); 
                } 
            },
            error:function(){
            // failed request; give feedback to user
            }   
        });
    },
                                        
    apiRequestInvite: function(){
        var self=this;
        var invite = {
            orgId: orgId,
            roles: existingRoles,
            authProvider: [],
            emails: existingMails,
            comment: "testComment",
            expiryDate: null,
            invitationExpiryDate: null,
            invitedBy: user,
            status: 1
        };
        var inviteJson = JSON.stringify(invite);

        $.ajax({
            url: window.location.origin+"/api/v0002/authentication/user/invites/register/multiple",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: inviteJson,
            beforeSend:function(){
            // this is where I append a loading image
            },
            success:function(data){
                if(this.props.emitter){
                    this.props.emitter.emit("ReactDialog.Submit", {
                    value: 'DialogAddMember'
                    }); 
                } 
            },
            error:function(){
            // failed request; give feedback to user
            },   
        });
    },                                    

    onSubmit: function(){ 
        if (this.state.visibleInviteMember){
            this.apiRequestInvite();
        }
        
        if (!this.state.visibleInviteMember){
            this.apiRequestAdd();
        }       
        
        existingMails = [];
        existingRoles = [];
        
        this.setState({
                items: []
            });
        this.setState({
                roleItems: []
            });
        
        if(this.props.emitter){
            this.props.emitter.emit("ReactDialog.Close", {
                value: 'DialogAddMember'
            });  
        }  
    },
    
    getDefaultProps: function() {
        return {
            orgId: "",
            user: ""
        };
    },
    
    componentDidMount() {
        orgId = this.props.orgId;
        user = this.props.user;
    },

    componentWillMount() {
        this.apiRequestGetRoles();
    },
    
    
    render: function() {
        
        var roleOption = roleResponse.roles.map(function(role){
            return (
                <Option value={role}>{role.nameNlsLabel}</Option>
            )
        });
        
        
        var items = this.state.items.map(function(item, index) {
            return (
                <Item
                key={index}
                value={item.value}
                onClickClose={this.removeItem.bind(this, index)}
                /> );
            }.bind(this));
        
        var roleItems = this.state.roleItems.map(function(roleItem, index) {
          return (
            <Item
            key={index}
            value={roleItem.value}
            onClickClose={this.removeRoleItem.bind(this, index)}
            /> );
        }.bind(this));
        
              
        var addMember = '';
        var inviteMember = '';
        var inviteTab = false;
        var addTab = true;
        
        if (this.state.visibleInviteMember){
           inviteMember = <div>
                    <Section headingSection="Invite member(s) via Email adress">
                        <Label label='Email adress' theme={this.props.theme}>
                            <InputField type='email' onChange={this.handleChange} ref="emailInput" placeholder='Enter the Email Adress' theme={this.props.theme}>
                            </InputField>
                            <Button onClick={this.addItem} text={'Add Another'}>
                            </Button>
                        </Label>
                        <div style={styles.boldText}>
                          To be added:
                        </div>
                        <div>
                            {items}
                        </div>
                    </Section>
                </div> 
            inviteTab = true
            addTab = false
        }
        
        if (!this.state.visibleInviteMember){
           addMember = <div>
                    <Section headingSection="Add member(s) via Email adress as member name">
                        <Label label='Email adress' theme={this.props.theme}>
                            <InputField type='email' onChange={this.handleChange} ref="emailInput" placeholder='Enter the Email Adress' theme={this.props.theme}>
                            </InputField>
                            <Button onClick={this.addItem} text={'Add Another'}>
                            </Button>
                        </Label>
                        <div style={styles.boldText}>
                          To be added:
                        </div>
                        <div>
                            {items}
                        </div>
                    </Section>
                </div>
            inviteTab = false
            addTab = true
        }

    if (this.props.visible ) {
      return(
        <Dialog title="Add member(s)" theme={this.props.theme} nls={this.props.nls} onCancel={this.onClose} onSubmit={this.onSubmit}>
            <DialogTab id="assignPerm" theme={this.props.theme} status={'active'} label="Assign permissions">
                <Section headingSection="Assign permissions">
                    <div>
                        <h3>Role</h3>
                    </div>
                    <Label label='Choose roles for your user(s) from predefined list' theme={this.props.theme}>
                        <Select onChange={this.onRoleChange} theme={this.props.theme}>
                            {roleOption}
                        </Select>
                        <Button onClick={this.addRoleItem} text={'Add Roles'}>
                        </Button>
                    </Label>
                    <div style={styles.boldText}>
                      To be added
                    </div>
                    <div>
                        {roleItems}
                    </div>      
                </Section>
            </DialogTab>

            <DialogTab id="userToAdd" theme={this.props.theme} isSubmitTab={addTab} status={'active'} label="Choose guest(s) to add">        
                <Section headingSection="Choose wether you want to invite or add member(s)">
                    <SwitchBtn theme={this.props.theme} onChange={this.onAddOrInvite} initialValue={!!this.state.visibleInviteMember} trueText="Invite following member(s)" falseText="Add following member(s)" ></SwitchBtn><br/>
                            {addMember}
                            {inviteMember}
                </Section>
            </DialogTab>
         <DialogTab id="emailTemplate" theme={this.props.theme} isSubmitTab={inviteTab} status={'disabled'} label="Edit Email invitation">
                    <Section headingSection="Preview of Email invitation">
                        EMAIL PREVIEW
                        <br/>
                     {/*<Button onClick={this.editEmailText} text={'Edit text'}>
                        </Button>*/}
                    </Section>
                    {/*<Section headingSection="Edit Email invitation">
                    </Section>*/}
            </DialogTab>
        </Dialog>
      );
    } else {
      return (<div/>);
    }
  }
});

module.exports = DialogAddMember;
