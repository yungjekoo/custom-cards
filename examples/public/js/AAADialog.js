!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.AAADialog=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = _dereq_('../../common/components/InputField.jsx');
var DialogComponent = _dereq_('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = _dereq_('../../common/components/Section.jsx');
var Actions = _dereq_('../../Dashboard/dashboard/Actions.jsx');
var InputField = _dereq_('../../common/components/InputField.jsx');
var Label = _dereq_('../../common/components/Label.jsx');
var Image = _dereq_('../../common/components/Image.jsx');
var ButtonText = _dereq_('../../common/components/ButtonText.jsx');
/*var Messages = require('../../Dashboard/nls/Messages');*/
var IconLink = _dereq_('../../common/components/IconLink.jsx');
var Table = _dereq_('../../common/components/Table.jsx');
var UserStore = _dereq_('../../common/stores/UserStore');
var Select = _dereq_('../../common/components/Select.jsx');
var Option = _dereq_('../../common/components/Option.jsx');

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
        width: "35%",
        paddingTop: "15px"
    },

    detailData: {
        float: "left",
        fontSize: "15px",
        width: "65%",
        paddingTop: "15px",
        fontWeight: "bold"
    },

    detailDataSelect: {
        float: "left",
        width: "45%",
        paddingTop: "5px",
        fontWeight: "bold"
    }

};

var DialogAAAUserDetails = React.createClass({
    displayName: 'DialogAAAUserDetails',

    propTypes: {
        metaData: RPT.array,
        fakeData: RPT.array,
        theme: RPT.object.isRequired,
        nls: RPT.object,
        style: RPT.object,
        url: RPT.string,
        scaleToFill: RPT.string
    },

    getInitialState: function getInitialState() {
        return {
            columns: this.props.columns ? this.props.columns : ["name", "mail", "avatar"],
            data: this.props.fakeData,
            clientID: this.props.clientID ? this.props.clientID : null,
            clientSecret: this.props.clientSecret ? this.props.clientSecret : null,
            issuerIdentifier: this.props.issuerIdentifier ? this.props.issuerIdentifier : null
        };
    },

    componentDidMount: function componentDidMount() {
        UserStore.listen(this.onUpdate);
        UserStore.Actions.connect();
    },

    onClientIDChanged: function onClientIDChanged(value) {
        this.setState({
            clientID: value
        });
    },

    onClientSecretChanged: function onClientSecretChanged(value) {
        this.setState({
            clientSecret: value
        });
    },

    onIssuerIdentifierChanged: function onIssuerIdentifierChanged(value) {
        this.setState({
            issuerIdentifier: value
        });
    },

    submitData: function submitData() {
        var dataAAAUserDetails = { clientData: [{ clientID: "1", clientSecret: "secr", issuerIdentifier: "identi" }] };
        dataAAAUserDetails.clientData.push({ clientID: this.state.clientID, clientSecret: this.state.clientSecret, issuerIdentifier: this.state.issuerIdentifier });
        console.log("AAAUserDetails Submit Button clicked");
        Actions.submitAAAUserDetailsData(dataUserDetails);
        Actions.closeDialog();
    },
    cancel: function cancel() {
        console.log("AAAUserDetails Cancel Button clicked");
        Actions.closeDialog();
    },

    onUpdate: function onUpdate(payload) {
        console.log("PAYLOAD", payload);
        if (payload.users) {
            this.setState({ data: payload.users });
        }
    },

    render: function render() {

        var fakeData = this.props.fakeData || [];
        var metaData = this.props.metaData || [];

        return React.createElement(
            Dialog,
            { title: 'User ID: Marcia Smith', theme: this.props.theme },
            React.createElement(
                DialogTab,
                { id: 'userDetails', theme: this.props.theme, label: 'Details' },
                React.createElement(
                    Section,
                    { headingSection: 'User Details' },
                    React.createElement(
                        'div',
                        null,
                        'These are details of the user such as email adress and name information.'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'User ID'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        'Marcia Smith'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Email adress'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        'mSmith@acme.com'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Added on'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        '21st Nov 2015'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Added by'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        'sally@acme.com'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Role'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        'User'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Status'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        'expired'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Authent. provider'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailData },
                        'Facebook'
                    ),
                    React.createElement(
                        'div',
                        { style: styles.detailLabel },
                        'Expiry'
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            Select,
                            { style: styles.detailDataSelect, onChange: this.onRoleChange },
                            React.createElement(
                                Option,
                                { value: '1', selected: true },
                                'Never'
                            ),
                            React.createElement(
                                Option,
                                { value: '2' },
                                'Ever'
                            )
                        )
                    )
                ),
                React.createElement(
                    Section,
                    { headingSection: 'Permissions' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h3',
                            null,
                            'Role'
                        )
                    ),
                    React.createElement(
                        Select,
                        { onChange: this.onRoleChange },
                        React.createElement(
                            Option,
                            { value: '1', selected: true },
                            'Admin'
                        ),
                        React.createElement(
                            Option,
                            { value: '2' },
                            'Operator'
                        ),
                        React.createElement(
                            Option,
                            { value: '3' },
                            'User'
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'h3',
                            null,
                            'Resource group'
                        )
                    ),
                    React.createElement(
                        Select,
                        { onChange: this.onGroupChange },
                        React.createElement(
                            Option,
                            { value: '1', selected: true },
                            'Default'
                        ),
                        React.createElement(
                            Option,
                            { value: '2' },
                            'Create new'
                        )
                    ),
                    React.createElement('div', { style: styles.sectionLine }),
                    React.createElement(
                        'div',
                        { style: styles.addPermText },
                        React.createElement(
                            IconLink,
                            { theme: this.props.theme, action: this.onaddPermChange, size: '20', color: '#5c91cc', icon: 'add-circle-outline' },
                            ' Add another permission for this user'
                        )
                    )
                )
            ),
            React.createElement(
                DialogButtons,
                null,
                React.createElement(ButtonText, { text: 'Confirm Changes', onClick: this.submitData })
            )
        );
    }
});

module.exports = DialogAAAUserDetails;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":7,"../../common/components/ButtonText.jsx":13,"../../common/components/Dialog.jsx":14,"../../common/components/IconLink.jsx":16,"../../common/components/Image.jsx":17,"../../common/components/InputField.jsx":18,"../../common/components/Label.jsx":19,"../../common/components/Option.jsx":20,"../../common/components/Section.jsx":22,"../../common/components/Select.jsx":23,"../../common/components/Table.jsx":24,"../../common/stores/UserStore":26}],2:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;

var InputField = _dereq_('../../common/components/InputField.jsx');
var DashboardDialog = _dereq_('../../common/components/Dialog.jsx');
var Dialog = DashboardDialog.Dialog;
var DialogTab = DashboardDialog.DialogTab;
var DialogButtons = DashboardDialog.DialogButtons;
var Section = _dereq_('../../common/components/Section.jsx');
var Actions = _dereq_('../../Dashboard/dashboard/Actions.jsx');
var InputField = _dereq_('../../common/components/InputField.jsx');
var Label = _dereq_('../../common/components/Label.jsx');
var Image = _dereq_('../../common/components/Image.jsx');
var ButtonText = _dereq_('../../common/components/ButtonText.jsx');
var IconLink = _dereq_('../../common/components/IconLink.jsx');
var Icon = _dereq_('../../common/components/Icon.jsx');
/*var Messages = require('../../Dashboard/nls/Messages');*/
var Select = _dereq_('../../common/components/Select.jsx');
var Option = _dereq_('../../common/components/Option.jsx');
var Tooltip = _dereq_('../../common/components/Tooltip.jsx');

var styles = {
    sectionLine: {
        clear: "both",
        marginBottom: "15px",
        paddingBottom: "15px",
        borderBottom: "2px solid",
        borderColor: "#ededed"
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
    }
};

var Item = React.createClass({
    displayName: 'Item',

    render: function render() {
        return React.createElement(
            'div',
            { style: styles.itemlist },
            React.createElement(
                'span',
                null,
                this.props.value
            ),
            React.createElement(
                'span',
                { style: styles.itemlistDelete, onClick: this.props.onClickClose },
                React.createElement(Icon, { icon: 'delete', color: '#333333', size: '18', theme: this.props.theme })
            )
        );
    }
});
module.exports = Item;

var DialogAddMember = React.createClass({
    displayName: 'DialogAddMember',

    propTypes: {
        theme: RPT.object.isRequired,
        nls: RPT.object,
        style: RPT.object,
        url: RPT.string,
        visible: RPT.bool.isRequired,
        scaleToFill: RPT.string
    },

    getInitialState: function getInitialState() {
        return {
            noneExpireDate: this.props.noneExpireDate ? this.props.noneExpireDate : null,
            items: []
        };
    },

    onaddPermChange: function onaddPermChange() {},

    addItem: function addItem() {
        var items = this.state.items;
        items.push({
            value: this.state.inputValue
        });

        this.setState({
            items: items,
            value: ' '
        });
    },

    handleChange: function handleChange(value) {
        this.setState({
            inputValue: value
        });
    },

    removeItem: function removeItem(index) {
        this.state.items.splice(index, 1);

        this.setState({
            items: this.state.items
        });
    },

    next: function next() {
        var parent = ReactDOM.findDOMNode(this).parentNode;
        this.setState({
            activeTab: "userToAdd"
        });
    },

    getDefaultProps: function getDefaultProps() {
        return {
            tooltipText: "more style required?"
        };
    },

    onClose: function onClose() {
        if (this.props.emitter) {
            this.props.emitter.emit("ReactDialog.Close", {
                value: 'DialogAddMember'
            });
            console.log(event);
        }
    },

    render: function render() {

        var items = this.state.items.map(function (item, index) {
            return React.createElement(Item, {
                key: index,
                value: item.value,
                onClickClose: this.removeItem.bind(this, index)
            });
        }.bind(this));

        if (this.props.visible) {
            return React.createElement(
                Dialog,
                { title: 'Add member(s)', theme: this.props.theme, nls: this.props.nls, onCancel: this.onClose },
                React.createElement(
                    DialogTab,
                    { theme: this.props.theme, status: 'active', label: 'Assign permissions' },
                    React.createElement(
                        Section,
                        { headingSection: 'Assign permissions' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h3',
                                null,
                                'Role  ',
                                React.createElement(
                                    Tooltip,
                                    { tooltipText: this.props.tooltipText },
                                    React.createElement(Icon, { theme: this.props.theme, size: '20', color: '#5c91cc', icon: 'info' })
                                )
                            ),
                            'Choose a role for your user(s) from predefined list'
                        ),
                        React.createElement(
                            Select,
                            { onChange: this.onRoleChange },
                            React.createElement(
                                Option,
                                { value: '1', selected: true },
                                'Admin'
                            ),
                            React.createElement(
                                Option,
                                { value: '2' },
                                'Operator'
                            ),
                            React.createElement(
                                Option,
                                { value: '3' },
                                'User'
                            )
                        )
                    )
                ),
                React.createElement(
                    DialogTab,
                    { id: 'userToAdd', theme: this.props.theme, isSubmitTab: true, status: 'disabled', label: 'Choose guest(s) to add' },
                    React.createElement(
                        Section,
                        { headingSection: 'Invite member via Email adress' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                Label,
                                { label: 'Email adress', theme: this.props.theme },
                                React.createElement(InputField, { type: 'text', onChange: this.handleChange, placeholder: 'Enter the Email Adress' }),
                                React.createElement(ButtonText, { isPrimary: true, onClick: this.addItem, text: 'Add Another' })
                            ),
                            React.createElement(
                                'div',
                                { style: styles.sectionLine },
                                ' Add multiple members at a time by adding multiple email adresses or importing from .cav or .xls file.'
                            ),
                            'To be added',
                            React.createElement(
                                'div',
                                null,
                                items
                            )
                        )
                    )
                )
            );
        } else {
            return React.createElement('div', null);
        }
    }
});

module.exports = DialogAddMember;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":7,"../../common/components/ButtonText.jsx":13,"../../common/components/Dialog.jsx":14,"../../common/components/Icon.jsx":15,"../../common/components/IconLink.jsx":16,"../../common/components/Image.jsx":17,"../../common/components/InputField.jsx":18,"../../common/components/Label.jsx":19,"../../common/components/Option.jsx":20,"../../common/components/Section.jsx":22,"../../common/components/Select.jsx":23,"../../common/components/Tooltip.jsx":25}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = _dereq_('../../common/components/InputField.jsx');
var DialogComponent = _dereq_('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = _dereq_('../../common/components/Section.jsx');
var Actions = _dereq_('../../Dashboard/dashboard/Actions.jsx');
var InputField = _dereq_('../../common/components/InputField.jsx');
var Label = _dereq_('../../common/components/Label.jsx');
var Image = _dereq_('../../common/components/Image.jsx');
var ButtonText = _dereq_('../../common/components/ButtonText.jsx');
/*var Messages = require('../nls/Messages');*/

var styles = {
    sectionText: {
        marginBottom: "40px"
    },
    ssoImg: {
        marginTop: "40px"
    }
};

var DialogConfigSSO = React.createClass({
    displayName: 'DialogConfigSSO',

    propTypes: {
        theme: RPT.object.isRequired,
        nls: RPT.object,
        style: RPT.object,
        url: RPT.string,
        scaleToFill: RPT.string
    },

    getInitialState: function getInitialState() {
        return {
            clientID: this.props.clientID ? this.props.clientID : null,
            clientSecret: this.props.clientSecret ? this.props.clientSecret : null,
            issuerIdentifier: this.props.issuerIdentifier ? this.props.issuerIdentifier : null
        };
    },

    onClientIDChanged: function onClientIDChanged(value) {
        this.setState({
            clientID: value
        });
    },

    onClientSecretChanged: function onClientSecretChanged(value) {
        this.setState({
            clientSecret: value
        });
    },

    onIssuerIdentifierChanged: function onIssuerIdentifierChanged(value) {
        this.setState({
            issuerIdentifier: value
        });
    },

    submitData: function submitData() {
        var ssoData = { clientData: { clientID: this.state.clientID, clientSecret: this.state.clientSecret, issuerIdentifier: this.state.issuerIdentifier } };
        Actions.submitSSOData(ssoData);
        Actions.closeDialog();
    },
    cancel: function cancel() {
        console.log("SSO Cancel Button clicked");
        Actions.closeDialog();
    },

    render: function render() {

        return React.createElement(
            Dialog,
            { title: this.props.nls.resolve('DialogConfigSSODialog_Heading'), theme: this.props.theme },
            React.createElement(
                DialogTab,
                { id: 'About', theme: this.props.theme, label: 'About' },
                React.createElement(Section, { headingSection: 'About' })
            ),
            React.createElement(
                DialogTab,
                { id: 'General', theme: this.props.theme, label: 'General' },
                React.createElement(Section, { headingSection: 'General' })
            ),
            React.createElement(
                DialogTab,
                { id: 'Usage', theme: this.props.theme, label: 'Usage' },
                React.createElement(Section, { headingSection: 'Usage' })
            ),
            React.createElement(
                DialogTab,
                { id: 'SSOConfiguration', theme: this.props.theme, label: 'Authentication config' },
                React.createElement(
                    Section,
                    { headingSection: this.props.nls.resolve('DialogConfigSSODialog_HeadingSection1') },
                    React.createElement(
                        'div',
                        { style: styles.sectionText },
                        ' ',
                        this.props.nls.resolve('DialogConfigSSODialog_HeadingSection1_Text')
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            Label,
                            { label: 'Client ID', theme: this.props.theme },
                            React.createElement(InputField, { onChange: this.onClientIDChanged, placeholder: 'Enter Client ID here', initialValue: this.state.clientID })
                        ),
                        React.createElement(
                            Label,
                            { label: 'Client Secret', theme: this.props.theme },
                            React.createElement(InputField, { onChange: this.onClientSecretChanged, type: 'password', placeholder: 'Enter Secret ID here', initialValue: this.state.clientSecret })
                        ),
                        React.createElement(
                            Label,
                            { label: 'Issuer Identifier', theme: this.props.theme },
                            React.createElement(InputField, { onChange: this.onIssuerIdentifierChanged, placeholder: 'Enter Issuer Identifier here', initialValue: this.state.issuerIdentifier })
                        )
                    ),
                    React.createElement(Image, { style: styles.ssoImg, theme: this.props.theme, url: "../config/resources/images/ThumbTest.jpeg", width: "120", height: "250", onLoad: this.imageOnLoad })
                )
            ),
            React.createElement(
                DialogButtons,
                null,
                React.createElement(ButtonText, { text: 'Submit', onClick: this.submitData }),
                React.createElement(ButtonText, { text: 'Cancel', onClick: this.cancel })
            )
        );
    }
});

module.exports = DialogConfigSSO;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":7,"../../common/components/ButtonText.jsx":13,"../../common/components/Dialog.jsx":14,"../../common/components/Image.jsx":17,"../../common/components/InputField.jsx":18,"../../common/components/Label.jsx":19,"../../common/components/Section.jsx":22}],4:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = _dereq_('../../common/components/InputField.jsx');
var DialogComponent = _dereq_('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = _dereq_('../../common/components/Section.jsx');
var Actions = _dereq_('../../Dashboard/dashboard/Actions.jsx');
var InputField = _dereq_('../../common/components/InputField.jsx');
var Label = _dereq_('../../common/components/Label.jsx');
var Image = _dereq_('../../common/components/Image.jsx');
var ButtonText = _dereq_('../../common/components/ButtonText.jsx');
/*var Messages = require('../nls/Messages');*/

var styles = {
  sectionText: {
    marginBottom: "40px"
  },
  loginImg: {
    cursor: "pointer",
    padding: "0px 20px 20px 0px",
    float: "left"
  }
};

var DialogLogin = React.createClass({
  displayName: 'DialogLogin',

  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object,
    url: RPT.string,
    scaleToFill: RPT.string
  },

  getInitialState: function getInitialState() {
    return {
      clientID: this.props.clientID ? this.props.clientID : null,
      clientSecret: this.props.clientSecret ? this.props.clientSecret : null,
      issuerIdentifier: this.props.issuerIdentifier ? this.props.issuerIdentifier : null
    };
  },

  componentDidMount: function componentDidMount() {},

  onClientIDChanged: function onClientIDChanged(value) {
    this.setState({
      clientID: value
    });
  },

  onClientSecretChanged: function onClientSecretChanged(value) {
    this.setState({
      clientSecret: value
    });
  },

  onloginImg: function onloginImg() {
    window.alert("Link to extern Authentication");
  },

  submitData: function submitData() {
    var dataLogin = { clientData: [{ clientID: "1", clientSecret: "secr", issuerIdentifier: "identi" }] };
    dataLogin.clientData.push({ clientID: this.state.clientID, clientSecret: this.state.clientSecret });
    console.log("Login Submit Button clicked");
    Actions.submitLoginData(dataSSO);
    Actions.closeDialog();
  },
  cancel: function cancel() {
    console.log("Login Cancel Button clicked");
    Actions.closeDialog();
  },

  render: function render() {

    return React.createElement(
      Dialog,
      { title: 'Log in to IoT Foundation', theme: this.props.theme },
      React.createElement(
        DialogTab,
        { id: 'Login', theme: this.props.theme, label: 'Login' },
        React.createElement(
          Section,
          { headingSection: 'Tell us your organization ID' },
          React.createElement(
            'div',
            { style: styles.sectionText },
            ' Please enter and submit your organization ID or choose one of the other sign up methods.'
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              Label,
              { label: 'Organization ID', theme: this.props.theme },
              React.createElement(InputField, { onChange: this.onOrganizationIdChanged, placeholder: 'Organization ID', initialValue: this.state.organizationId })
            )
          ),
          React.createElement(
            'div',
            { style: styles.sectionText },
            '  ',
            React.createElement(
              'a',
              { href: 'https://www.ibm.com/html/' },
              'Can‘t remember organization ID?'
            )
          )
        ),
        React.createElement(
          Section,
          { headingSection: 'Choose other sign up method' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { href: 'https://www.ibm.com/html/' },
              React.createElement(Image, { style: styles.loginImg, theme: this.props.theme, url: "../config/resources/images/ThumbTest.jpeg", width: "150", height: "80", onLoad: this.imageOnLoad, onClick: this.onloginImg })
            ),
            React.createElement(
              'a',
              { href: 'https://www.ibm.com/html/' },
              React.createElement(Image, { style: styles.loginImg, theme: this.props.theme, url: "../config/resources/images/ThumbTest.jpeg", width: "150", height: "80", onLoad: this.imageOnLoad })
            ),
            React.createElement(
              'a',
              { href: 'https://www.ibm.com/html/' },
              React.createElement(Image, { style: styles.loginImg, theme: this.props.theme, url: "../config/resources/images/ThumbTest.jpeg", width: "150", height: "80", onLoad: this.imageOnLoad })
            ),
            React.createElement(
              'a',
              { href: 'https://www.ibm.com/html/' },
              React.createElement(Image, { style: styles.loginImg, theme: this.props.theme, url: "../config/resources/images/ThumbTest.jpeg", width: "150", height: "80", onLoad: this.imageOnLoad })
            )
          )
        )
      ),
      React.createElement(
        DialogButtons,
        null,
        React.createElement(ButtonText, { text: 'Submit', onClick: this.submitData }),
        React.createElement(ButtonText, { text: 'Cancel', onClick: this.cancel })
      )
    );
  }
});

module.exports = DialogLogin;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":7,"../../common/components/ButtonText.jsx":13,"../../common/components/Dialog.jsx":14,"../../common/components/Image.jsx":17,"../../common/components/InputField.jsx":18,"../../common/components/Label.jsx":19,"../../common/components/Section.jsx":22}],5:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = _dereq_('../../common/components/InputField.jsx');
var DialogComponent = _dereq_('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = _dereq_('../../common/components/Section.jsx');
var Actions = _dereq_('../../Dashboard/dashboard/Actions.jsx');
var InputField = _dereq_('../../common/components/InputField.jsx');
var Label = _dereq_('../../common/components/Label.jsx');
var Image = _dereq_('../../common/components/Image.jsx');
var ButtonText = _dereq_('../../common/components/ButtonText.jsx');
/*var Messages = require('../../nls/Messages');*/

var styles = {
  sectionText: {
    marginBottom: "40px"
  },
  orgImg: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

var DialogSSOSignIn = React.createClass({
  displayName: 'DialogSSOSignIn',

  propTypes: {
    theme: RPT.object.isRequired,
    nls: RPT.object,
    style: RPT.object,
    url: RPT.string,
    scaleToFill: RPT.string
  },

  getInitialState: function getInitialState() {
    return {
      clientID: this.props.clientID ? this.props.clientID : null,
      clientPw: this.props.clientPw ? this.props.clientPw : null
    };
  },

  componentDidMount: function componentDidMount() {},

  onClientPwChanged: function onClientPwChanged(value) {
    this.setState({
      clientPw: value
    });
  },

  onEmailAdressChanged: function onEmailAdressChanged(value) {
    this.setState({
      clientID: value
    });
  },

  submitData: function submitData() {
    var dataSSOSignIn = { clientData: [{ clientID: "myEmail@IoT.com", clientPw: "password" }] };
    dataSSOSignIn.clientData.push({ clientID: this.state.clientID, clientPw: this.state.clientPw });
    console.log("SSO SignIn Button clicked");
    Actions.submitSSOSignInData(dataSSOSignIn);
    Actions.closeDialog();
  },

  cancel: function cancel() {
    console.log("SSO SignIn Cancel Button clicked");
    Actions.closeDialog();
  },

  render: function render() {

    return React.createElement(
      Dialog,
      { title: 'ACME Sign In', theme: this.props.theme },
      React.createElement(
        DialogTab,
        { id: 'ACMESignIn', theme: this.props.theme, label: 'ACME Sign In' },
        React.createElement(Image, { style: styles.orgImg, theme: this.props.theme, url: "../config/resources/images/ThumbTest.jpeg", width: "230", height: "120", onLoad: this.imageOnLoad }),
        React.createElement(
          'div',
          { style: styles.sectionText },
          ' ',
          this.props.nls.resolve('DialogLoginDialog_HeadingSection1_Text')
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            Label,
            { label: 'Email adress', theme: this.props.theme },
            React.createElement(InputField, { onChange: this.onEmailAdressChanged, placeholder: 'Email adress', initialValue: this.state.clientID })
          ),
          React.createElement(
            Label,
            { label: 'Password', theme: this.props.theme },
            React.createElement(InputField, { type: 'password', onChange: this.onClientPwChanged, placeholder: 'Password', initialValue: this.state.clientPw })
          )
        ),
        React.createElement(
          'div',
          null,
          '  ',
          React.createElement(
            'a',
            { href: 'https://www.ibm.com/html/' },
            'Can‘t remember my Password?'
          )
        )
      ),
      React.createElement(
        DialogButtons,
        null,
        React.createElement(ButtonText, { text: 'Submit', onClick: this.submitData }),
        React.createElement(ButtonText, { text: 'Cancel', onClick: this.cancel })
      )
    );
  }
});

module.exports = DialogSSOSignIn;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":7,"../../common/components/ButtonText.jsx":13,"../../common/components/Dialog.jsx":14,"../../common/components/Image.jsx":17,"../../common/components/InputField.jsx":18,"../../common/components/Label.jsx":19,"../../common/components/Section.jsx":22}],6:[function(_dereq_,module,exports){
'use strict';

var AAADialog = {};
AAADialog.UserDetails = _dereq_('./dialogs/DialogAAAUserDetails.jsx');
AAADialog.AddMember = _dereq_('./dialogs/DialogAddMember.jsx');
AAADialog.ConfigSSO = _dereq_('./dialogs/DialogConfigSSO.jsx');
AAADialog.Login = _dereq_('./dialogs/DialogLogin.jsx');
AAADialog.SSOSignIn = _dereq_('./dialogs/DialogSSOSignIn.jsx');

module.exports = AAADialog;

},{"./dialogs/DialogAAAUserDetails.jsx":1,"./dialogs/DialogAddMember.jsx":2,"./dialogs/DialogConfigSSO.jsx":3,"./dialogs/DialogLogin.jsx":4,"./dialogs/DialogSSOSignIn.jsx":5}],7:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

module.exports = Reflux.createActions(['loadConfig', 'loadDashboard', 'getComponents', 'storeLayouts', 'undo', 'expandCard', 'shrinkCard', 'setBreakpoint', 'customAction', 'save', 'restore', 'addComponent', 'showDialogConfigSSO', 'showDialogSSOSignIn', 'showDialogAAAUserDetails', 'showDialogAddMember', 'showDialogLogin', 'submitSSOSignInData', 'submitAAAUserDetailsData', 'submitAddMemberData', 'submitLoginData', 'submitSSOData', 'showDialog', 'showConfigureComponent', 'configureComponent', 'getCategories', 'closeDialog', 'getComponent', 'deviceUpdated', 'removeComponent', 'notify', 'navigateRoute', 'addDashboard', 'removeDashboard', 'changeCardSize']);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(_dereq_,module,exports){
'use strict';

var config = _dereq_('./config/DashboardConfig.json');

var DashboardUtils = {

  // create a unique rfc4122 conform UUID
  createUUID: function createUUID() {
    var dec2hex = [];
    for (var i = 0; i <= 15; i++) {
      dec2hex[i] = i.toString(16);
    }

    var uuid = '';
    for (var i = 1; i <= 36; i++) {
      if (i === 9 || i === 14 || i === 19 || i === 24) {
        uuid += '-';
      } else if (i === 15) {
        uuid += 4;
      } else if (i === 20) {
        uuid += dec2hex[Math.random() * 4 | 0 + 8];
      } else {
        uuid += dec2hex[Math.random() * 15 | 0];
      }
    }
    return uuid;
  },

  setDashboardConfig: function setDashboardConfig(temp) {
    config = temp;
  },

  getCapability: function getCapability(name) {
    var caps = config.capabilities;
    if (caps) {
      var value = caps[name];
      if (value === undefined) {
        // not set defaults to true
        value = true;
      }
      return value;
    }
  },

  getSettings: function getSettings(name) {
    var settings = config.settings;
    if (settings) {
      var value = settings[name];
      return value;
    }
  },

  getDefaultChartColors: function getDefaultChartColors() {
    var result = config.theme.palette;
    return result;
  }

};

module.exports = DashboardUtils;

},{"./config/DashboardConfig.json":9}],9:[function(_dereq_,module,exports){
module.exports={
  "theme": {
    "canvas": "#142a36",
    "lightText": "#F7F7F7",
    "border": "#E6E6E6",
    "title": "#F7F7F7",
    "titleText": "#899399",
    "content": "#FDFDFD",
    "major": "#2E3636",
    "minor": "#899399",
    "accent": "#4581E0",
    "good": "#8CD210",
    "bad": "#FF5050",
    "font": "'Helvetica Neue',HelveticaNeue,Helvetica,'Segoe UI',Segoe,Calibri,Roboto,'Droid Sans','Arial Unicode MS',Arial,sans-serif",
    "logo": "/assets/dashboard/iot.jpg",

    "light": "#c7c7c7",
    "normal": "#959595",
    "dark": "#5a5a5a",

    "chart": ["#5596E6", "#4178BE", "#325C80", "#264A60", "#1D3649", "#323c3c", "#3c4646", "#5a6464", "#6d7777", "#959f9f"],

    "schemes": [
      { // green
        "name": 0,
        "light": "#c8d2d2",
        "normal": "#8cd211",
        "dark": "#4b8400"
      }
    ]
  },

  "capabilities": {
    "multipleDashboards": false,
    "multiplePages": false,
    "useOldDialogs": false,
    "breakpoints": {"lg": 1200, "md": 996, "sm": 480},
    "cols": {"lg": 3, "md": 2, "sm": 1},
    "rowHeight": 120,
    "margin": [30,30]
  },

  "settings": {
    "configRepositoryURL": "http://configrepositoryservice.mybluemix.net/rest",
//    "configRepositoryURL": "http://dashboard-repository.mybluemix.net/rest",
    "configRepositoryUser": "admin",
    "configRepositoryPassword": "admin"
  },

  "components": [
    {
      "name": "DeviceTypes",
      "displayName": "COMP_TITLE_DeviceTypes",
      "description": "COMP_DESC_DeviceTypes",
      "category": "Basic",
      "require": ["../cards/DeviceTypes.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "sticky": true,
      "parameters" : {
        "component": "DeviceTypes",
        "title": "Device types"
      }
    },
    {
      "name": "UsageDeviceCard",
      "displayName": "COMP_TITLE_UsageDevice",
      "description": "COMP_DESC_UsageDevice",
      "category": "Basic",
      "require": ["../cards/UsageDeviceCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3],[3,5]],
      "sticky": true,
      "parameters" : {
        "component": "UsageDeviceCard",
        "title": "Device connections"
      }
    },
    {
      "name": "UsageDataCard",
      "displayName": "COMP_TITLE_UsageData",
      "description": "COMP_DESC_UsageData",
      "category": "Basic",
      "require": ["../cards/UsageDataCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3],[3,5]],
      "sticky": true,
      "parameters" : {
        "component": "UsageDataCard",
        "title": "Data consumed"
      }
    },
    {
      "name": "UsageStorageCard",
      "displayName": "COMP_TITLE_UsageStorage",
      "description": "COMP_DESC_UsageStorage",
      "category": "Basic",
      "require": ["../cards/UsageStorageCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3],[3,5]],
      "sticky": true,
      "parameters" : {
        "component": "UsageStorageCard",
        "title": "Storage consumed"
      }
    },
    {
      "name": "HorizontalLine",
      "displayName": "COMP_TITLE_HorizontalLine",
      "description": "COMP_DESC_HorizontalLine",
      "category": "Basic",
      "require": ["../cards/HorizontalLine.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,1],[2,1],[3,1]],
      "sticky": true,
      "parameters" : {
        "component": "HorizontalLine",
        "title": "Separator"
      }
    },

    {
      "name": "RealTimeChart",
      "displayName": "COMP_TITLE_RealTimeChart",
      "description": "COMP_DESC_RealTimeChart",
      "thumbnail" : "/assets/dashboard/line-graph2.svg",
      "category": "Devices",
      "require": ["../cards/RealTimeChart.jsx", "../customization/RealTimeChartProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5],[3,6]],
      "parameters" : {
        "component": "RealTimeChart",
        "title": "Real time chart",
        "autoscroll": true
      },
      "customization": "RealTimeChartProperties"
    },
    {
      "name": "BarChart",
      "displayName": "COMP_TITLE_StaticChart",
      "description": "COMP_DESC_StaticChart",
      "thumbnail" : "/assets/dashboard/line-graph.svg",
      "category": "Devices",
      "require": ["../cards/BarChart.jsx", "../customization/BarChartProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "BarChart",
        "title": "Bar chart"
      },
      "customization": "BarChartProperties"
    },
    {
      "name": "DonutChart",
      "displayName": "COMP_TITLE_StaticChart",
      "description": "COMP_DESC_StaticChart",
      "thumbnail" : "/assets/dashboard/pie-chart.svg",
      "category": "Devices",
      "require": ["../cards/DonutChart.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "DonutChart",
        "title": "Donut chart"
      }
    },
    {
      "name": "Value",
      "displayName": "COMP_TITLE_ValueLabel",
      "description": "COMP_DESC_ValueLabel",
      "thumbnail" : "/assets/dashboard/text-based.svg",
      "category": "Devices",
      "require": ["../cards/Value.jsx", "../customization/GaugeProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3],[3,5]],
      "parameters" : {
       "title":"",
        "component": "Value",
        "title": "Value"
      },
      "customization": "SingleValueProperties"
    },
    {
      "name": "Gauge",
      "displayName": "COMP_TITLE_Gauge",
      "description": "COMP_DESC_Gauge",
      "thumbnail" : "/assets/dashboard/gauge.svg",
      "category": "Devices",
      "require": ["../cards/Gauge.jsx", "../customization/GaugeProperties.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,6]],
      "parameters" : {
        "component": "Gauge",
        "title": "Gauge"
      },
      "customization": "GaugeProperties"
    },


    {
      "name": "EmptyComponent",
      "displayName": "COMP_TITLE_EmptyComponent",
      "description": "Placeholder for a new component",
      "category": "Hidden",
      "require": ["../cards/EmptyComponent.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,2]],
      "parameters" : {
        "component": "EmptyComponent",
        "title": "New Card",
        "size": {
          "sm": 0,
          "md": 0,
          "lg": 0
        }
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },
    {
      "name": "TestComponent",
      "displayName": "COMP_TITLE_TestComponent",
      "description": "COMP_DESC_TestComponent",
      "thumbnail" : "config/resources/images/ThumbTest.jpeg",
      "category": "Test",
      "require": ["../cards/TestComponent.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
      "parameters" : {
        "component": "TestComponent",
        "title": "Test component",
        "value": "Test value"
      }
    },
    {
      "name": "UserDetails",
      "displayName": "COMP_TITLE_UserDetails",
      "description": "COMP_DESC_UserDetails",
      "thumbnail" : "config/resources/images/ThumbUserDetails.jpeg",
      "category": "Test",
      "require": ["../cards/UserDetails.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
        "component": "UserDetails",
        "title": "User details"
      }
    },
    {
      "name": "Container",
      "displayName": "COMP_TITLE_Container",
      "description": "COMP_DESC_Container",
      "thumbnail" : "config/resources/images/ThumbContainer.png",
      "category": "Test",
      "require": ["../cards/Container.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,6],[3,6]],
      "parameters" : {
        "component": "Container",
        "title": "Container",
        "layouts": {
          "lg": [
          ],
          "md": [
          ],
          "sm": [
          ]
        },
        "components": [
        ]
      }
    },
    {
      "name": "CheckBox",
      "displayName": "COMP_TITLE_CheckBox",
      "description": "COMP_DESC_CheckBox",
      "thumbnail" : "config/resources/images/ThumbTest.jpeg",
      "category": "Test",
      "require": ["../../common/components/CheckBox.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
        "component": "CheckBox",
        "title": "CheckBox"
      }
    },
    {
      "name": "SimpleTextCard",
      "displayName": "COMP_TITLE_SimpleText",
      "description": "COMP_DESC_SimpleText",
      "thumbnail" : "config/resources/images/ThumbSimpleText.png",
      "category": "Test",
      "require": ["../cards/SimpleTextCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "SimpleTextCard",
        "content":"",
        "fontSize":"16px",
          "fontSizeList":"FONT_SIZE_LIST",
        "alignments": "TEXT_ALIGN_LIST",
        "alignmentsHeader":"TEXT_ALIGN_LIST_HEADER"
      }
    },
    {
      "name": "PushButtonCard",
      "displayName": "COMP_TITLE_PushButtonCard",
      "description": "COMP_DESC_PushButtonCard",
      "thumbnail" : "config/resources/images/ThumbPushButton.png",
      "category": "Test",
      "require": ["../cards/PushButtonCard.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "PushButtonCard",
        "content":"",
        "fontSize":"16px"
      }
    },
    {
      "name": "DashboardLink",
      "displayName": "COMP_TITLE_DashboardLink",
      "description": "COMP_DESC_DashboardLink",
      "thumbnail" : "config/resources/images/ThumbDashboardLink.png",
      "category": "Test",
      "require": ["../cards/DashboardLink.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "DashboardLink",
        "content":"",
        "fontSize":"16px"
      }
    },
    {
      "name": "RouterLink",
      "displayName": "COMP_TITLE_RouterLink",
      "description": "COMP_DESC_RouterLink",
      "thumbnail" : "config/resources/images/ThumbRouterLink.png",
      "category": "Test",
      "require": ["../cards/RouterLink.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "RouterLink",
        "content":"",
        "fontSize":"16px"
      }
    },
    {
      "name": "ImageCard",
      "displayName": "COMP_TITLE_Image",
      "description": "COMP_DESC_Image",
      "thumbnail" : "config/resources/images/ThumbImage.png",
      "category": "Miscellaneous",
      "require": ["../cards/ImageCard.jsx"],
      "wrapper": "Test",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "ImageCard",
          "scaleToFill":"1",
          "scaleOptions":"IMAGE_SCALE_OPTIONS",
          "url":""
      }
    },
    {
      "name": "SimpleSlider",
      "displayName": "COMP_TITLE_SimpleSlider",
      "description": "COMP_DESC_SimpleSlider",
      "thumbnail" : "config/resources/images/ThumbValueLabel.png",
      "category": "Test",
      "require": ["../cards/SimpleSlider.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,3]],
      "parameters" : {
       "title":"",
        "component": "SimpleSlider",
        "description":"",
        "unit":"",
        "availableUnits": "UNITS",
        "unitListHeader":"UNITS_HEADER"
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },
    {
      "name": "DeviceMap",
      "displayName": "COMP_TITLE_DeviceMap",
      "description": "COMP_DESC_DeviceMap",
      "thumbnail" : "config/resources/images/ThumbDeviceMap.png",
      "category": "Test",
      "require": ["../cards/DeviceMap.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[1,5],[2,5],[3,5]],
      "parameters" : {
        "component": "DeviceMap",
        "title": "Device map",
        "type": "MAP",
        "demo": true,
        "showMyLocation": false

      }
    },
    {
      "name": "PVProduction",
      "displayName": "COMP_TITLE_PV_PRODUCTION",
      "description": "COMP_DESC_PV_SAMPLE",
      "thumbnail" : "config/resources/images/ThumbGauge.png",
      "category": "SmarterHome",
      "require": ["../cards/Gauge.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,6]],
      "parameters" : {
        "component": "Gauge",
        "title": "Current Production",
        "device": "26877",
        "property": "26877-PAC",
        "min": 0,
        "max": 6000,
        "unit": "Watt",
        "minDegree" : 45,
        "maxDegree" : 315
      }
    },
    {
      "name": "PVPower",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_POWER",
      "parameters" : {
        "component": "Gauge",
        "title": "Current Consumption",
        "device": "26877",
        "property": "26877-POWER",
        "min": 0,
        "max": 8000,
        "unit": "Watt",
        "needle": false,
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PVUAC",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_UAC",
      "parameters" : {
        "component": "Gauge",
        "title": "AC voltage",
        "device": "26877",
        "property": "26877-UAC",
        "min": 230,
        "max": 250,
        "precision": 1,
        "unit": "Volt",
        "needle": true,
        "minDegree" : 90,
        "maxDegree" : 270
      },
    },
    {
      "name": "PVIAC",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_IAC",
      "parameters" : {
        "component": "Gauge",
        "title": "AC current",
        "device": "26877",
        "property": "26877-IAC",
        "min": 0,
        "max": 30,
        "precision": 1,
        "unit": "Ampere",
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PVUDC",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_UDC",
      "parameters" : {
        "component": "Gauge",
        "title": "DC voltage",
        "device": "26877",
        "property": "26877-UDC",
        "min": 0,
        "max": 600,
        "unit": "Volt",
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PVIDC",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_IDC",
      "parameters" : {
        "component": "Gauge",
        "title": "DC current",
        "device": "26877",
        "property": "26877-IDC",
        "min": 0,
        "max": 20,
        "precision": 1,
        "unit": "Ampere",
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PVFAC",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_FAC",
      "parameters" : {
        "component": "Gauge",
        "title": "AC Frequency",
        "device": "26877",
        "property": "26877-FAC",
        "min": 49.8,
        "max": 50.2,
        "precision": 2,
        "unit": "Hertz",
        "needle": true,
        "minDegree" : 90,
        "maxDegree" : 270
      },
    },
    {
      "name": "PVUACL1",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_UACL1",
      "parameters" : {
        "component": "Gauge",
        "title": "AC L1 voltage",
        "device": "26877",
        "property": "26877-UAC_L1",
        "min": 230,
        "max": 250,
        "precision": 1,
        "unit": "Volt",
        "needle": true,
        "minDegree" : 90,
        "maxDegree" : 270
      },
    },
    {
      "name": "PVIACL1",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_IACL1",
      "parameters" : {
        "component": "Gauge",
        "title": "AC L1 current",
        "device": "26877",
        "property": "26877-IAC_L1",
        "min": 0,
        "max": 10,
        "precision": 1,
        "unit": "Ampere",
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PVUACL2",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_UACL2",
      "parameters" : {
        "component": "Gauge",
        "title": "AC L2 voltage",
        "device": "26877",
        "property": "26877-UAC_L2",
        "min": 230,
        "max": 250,
        "precision": 1,
        "unit": "Volt",
        "needle": true,
        "minDegree" : 90,
        "maxDegree" : 270
      },
    },
    {
      "name": "PVIACL2",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_IACL2",
      "parameters" : {
        "component": "Gauge",
        "title": "AC L2 current",
        "device": "26877",
        "property": "26877-IAC_L2",
        "min": 0,
        "max": 10,
        "precision": 1,
        "unit": "Ampere",
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PVUACL3",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_UACL3",
      "parameters" : {
        "component": "Gauge",
        "title": "AC L3 voltage",
        "device": "26877",
        "property": "26877-UAC_L3",
        "min": 230,
        "max": 250,
        "precision": 1,
        "unit": "Volt",
        "needle": true,
        "minDegree" : 90,
        "maxDegree" : 270
      },
    },
    {
      "name": "PVIACL3",
      "extends": "PVProduction",
      "displayName": "COMP_TITLE_PV_IACL3",
      "parameters" : {
        "component": "Gauge",
        "title": "AC L3 current",
        "device": "26877",
        "property": "26877-IAC_L3",
        "min": 0,
        "max": 10,
        "precision": 1,
        "unit": "Ampere",
        "minDegree" : 45,
        "maxDegree" : 315
      },
    },
    {
      "name": "PV",
      "displayName": "COMP_TITLE_PV",
      "description": "COMP_DESC_PV",
      "thumbnail" : "config/resources/images/ThumbPV.png",
      "category": "SmarterHome",
      "require": ["../cards/PV.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,6],[3,10]],
      "parameters" : {
        "component": "PV"
      }
    },
    {
      "name": "WebcamMunic1",
      "displayName": "COMP_TITLE_Webcam",
      "description": "COMP_DESC_Webcam",
      "thumbnail" : "config/resources/images/ThumbWebcam1.png",
      "category": "Test",
      "require": ["../cards/Webcam.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5],[3,7]],
      "parameters" : {
        "component": "Webcam",
        "title": "Webcam Marienplatz 1",
        "url": "http://blog.muenchen.de/marienplatzcam/marienplatzgross001.jpg",
        "frequency": 5
      },
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },
    {
      "name": "WebcamMunic2",
      "displayName": "COMP_TITLE_Webcam",
      "description": "COMP_DESC_Webcam",
      "thumbnail" : "config/resources/images/ThumbWebcam2.png",
      "category": "Test",
      "require": ["../cards/Webcam.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5],[3,7]],
      "parameters" : {
        "component": "Webcam",
        "title": "Webcam Marienplatz 2",
        "url": "http://kaufhaus.ludwigbeck.de/manual/webcam/1sec.jpg",
        "frequency": 5
      },
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },
    {
      "name": "TableUser",
      "displayName": "COMP_TITLE_UserTable",
      "description": "COMP_DESC_UserTable",
      "thumbnail" : "config/resources/images/ThumbTable.png",
      "category": "Test",
      "require": ["../cards/TableUser.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
    "parameters" : {

        "component": "TableUser",
        "title": "TableUser",

        "metaData":  [
               {
                "columnName": "action",
                "customComponent": "../../common/components/TableDetailBtn",
                "displayName": "Action",
                "order": 6
              },
                {
                "columnName": "avatar",
                "customComponent": "../../common/components/TableImage",
                "displayName": "Avatar",
                "order": 5
              },
                 {
                "columnName": "id",
                "visible": true,
                "locked": false,
                "order": 1,
                "displayName": "ID"
              },
                {
                "columnName": "name",
                "visible": true,
                "locked": false,
                "order": 2,
                "displayName": "Name"
              },
                {
                "columnName": "descrip",
                "visible": true,
                "locked": false,
                "order": 3,
                "displayName": "Description"
              },
                {
                "columnName": "mail",
                "visible": true,
                "locked": false,
                "order": 4,
                "displayName": "Email"
              },
        ],

        "fakeData" : [
                {
                "id": "",
                "name": "loading data",
                "descrip": "",
                "mail": "",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
                },
        ],
      },

      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },
    {
      "name": "UserCardTable",
      "displayName": "COMP_TITLE_UserCardTable",
      "description": "COMP_DESC_UserCardTable",
      "thumbnail" : "config/resources/images/ThumbVCardList.png",
      "category": "Test",
      "require": ["../cards/UserCardTable.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
        "parameters" : {

        "metaData":  [
           {
            "columnName": "action",
            "customComponent": "../../common/components/TableDetailBtn",
            "displayName": "Action",
            "order": 6
          },
            {
            "columnName": "avatar",
            "customComponent": "../../common/components/TableImage",
            "displayName": "Avatar",
            "order": 5
          },
             {
            "columnName": "id",
            "visible": true,
            "locked": false,
            "order": 1,
            "displayName": "ID"
          },
            {
            "columnName": "name",
            "visible": true,
            "locked": false,
            "order": 2,
            "displayName": "Name"
          },
            {
            "columnName": "descrip",
            "visible": true,
            "locked": false,
            "order": 3,
            "displayName": "Description"
          },
            {
            "columnName": "mail",
            "visible": true,
            "locked": false,
            "order": 4,
            "displayName": "Email"
          },
        ],

            "fakeData" : [
            {
            "id": "",
            "name": "loading",
            "descrip": "loading",
            "mail": "loading",
            "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
            },
        ],

        "component": "UserCardTable",
        "title": "User vCard list",
          },
          "customization": null,
          "authorization": [{
            "function": "DeviceManagement",
            "operation": ["AddDevice","ModifyDevice"]
          }],
          "inbound": [{
            "from": "/sh/alerts/filterByDevice",
            "to": "device-id"
          }],
          "outbound": [{
            "from": "maximo-asset-condition-selected",
            "to": "maximo/asset/condition"
          }]
        },


    {
      "name": "ConfigSSO",
      "displayName": "COMP_TITLE_AAA_SSO",
      "description": "COMP_DESC_AAA_SSO",
      "thumbnail" : "../config/resources/images/ThumbTest.jpeg",
      "category": "AAA",
      "require": ["../cards/ConfigSSO.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
      "parameters" : {
        "component": "ConfigSSO",
        "actionText": "Configure SSO",
        "actionIcon": "settings",
        "title": "Configure SSO Service",
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },

    {
      "name": "AddMember",
      "displayName": "COMP_TITLE_AAA_AddMember",
      "description": "COMP_DESC_AAA_AddMember",
      "thumbnail" : "../config/resources/images/ThumbTest.jpeg",
      "category": "AAA",
      "require": ["../cards/AddMember.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
      "parameters" : {
        "component": "AddMember",
        "actionText": "Add Member",
        "actionIcon": "add-circle-outline",
        "title": "Add Member"
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },

    {
      "name": "Login",
      "displayName": "COMP_TITLE_AAA_Login",
      "description": "COMP_DESC_AAA_Login",
      "thumbnail" : "../config/resources/images/ThumbTest.jpeg",
      "category": "AAA",
      "require": ["../cards/Login.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
      "parameters" : {
        "component": "Login",
        "actionText": "Log In",
        "actionIcon": "lock",
        "title": "Log In"
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },

     {
      "name": "AAAUserDetails",
      "displayName": "COMP_TITLE_AAA_AAAUserDetails",
      "description": "COMP_DESC_AAA_AAAUserDetails",
      "thumbnail" : "../config/resources/images/ThumbTest.jpeg",
      "category": "AAA",
      "require": ["../cards/AAAUserDetails.jsx","../cards/TableUser.jsx","../../common/components/TableDetailBtn.jsx","../../common/components/TableImage.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
      "parameters" : {
        "component": "AAAUserDetails",
        "actionText": "Show members",
        "actionIcon": "add-circle-outline",
        "title": "Member List & Details",
           "metaData":  [
               {
                "columnName": "action",
                "customComponent": "../components/TableDetailBtn.jsx",
                "displayName": "Action",
                "order": 6
              },
                 {
                "columnName": "id",
                "visible": true,
                "locked": false,
                "order": 1,
                "displayName": "ID"
              },
                {
                "columnName": "name",
                "visible": true,
                "locked": false,
                "order": 2,
                "displayName": "Name"
              },
                {
                "columnName": "descrip",
                "visible": true,
                "locked": false,
                "order": 3,
                "displayName": "Description"
              },
                {
                "columnName": "mail",
                "visible": true,
                "locked": false,
                "order": 4,
                "displayName": "Email"
              },
        ],

        "fakeData" : [
                {
                "id": "",
                "name": "loading data",
                "descrip": "",
                "mail": "",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
                },
        ],
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },

    {
      "name": "SSOSignIn",
      "displayName": "COMP_TITLE_AAA_SSOSignIn",
      "description": "COMP_DESC_AAA_SSOSignIn",
      "thumbnail" : "../config/resources/images/ThumbTest.jpeg",
      "category": "AAA",
      "require": ["../cards/SSOSignIn.jsx"],
      "wrapper": "ReactWrapper",
      "sizes": [[1,3],[2,5]],
      "parameters" : {
        "component": "SSOSignIn",
        "actionText": "ACME Sign In",
        "actionIcon": "lock",
        "title": "ACME Sign In",
      },
      "customization": null,
      "authorization": [{
        "function": "DeviceManagement",
        "operation": ["AddDevice","ModifyDevice"]
      }],
      "inbound": [{
        "from": "/sh/alerts/filterByDevice",
        "to": "device-id"
      }],
      "outbound": [{
        "from": "maximo-asset-condition-selected",
        "to": "maximo/asset/condition"
      }]
    },

  ]}

},{}],10:[function(_dereq_,module,exports){
"use strict";

var Const = {
  "CONNECTED": "CONNECTED",
  "DISCONNECTED": "DISCONNECTED",
  "PAUSED": "PAUSED"
};

module.exports = Const;

},{}],11:[function(_dereq_,module,exports){
'use strict';

var Utils = {

  // create a unique rfc4122 conform UUID
  createUUID: function createUUID() {
    var dec2hex = [];
    for (var i = 0; i <= 15; i++) {
      dec2hex[i] = i.toString(16);
    }

    var uuid = '';
    for (var i = 1; i <= 36; i++) {
      if (i === 9 || i === 14 || i === 19 || i === 24) {
        uuid += '-';
      } else if (i === 15) {
        uuid += 4;
      } else if (i === 20) {
        uuid += dec2hex[Math.random() * 4 | 0 + 8];
      } else {
        uuid += dec2hex[Math.random() * 15 | 0];
      }
    }
    return uuid;
  }

};

module.exports = Utils;

},{}],12:[function(_dereq_,module,exports){
"use strict";

//
// Regular Expression for URL validation
//
// Author: Diego Perini
// Updated: 2010/12/05
// License: MIT
//
// Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// the regular expression composed & commented
// could be easily tweaked for RFC compliance,
// it was expressly modified to fit & satisfy
// these test for an URL shortener:
//
//   http://mathiasbynens.be/demo/url-regex
//
// Notes on possible differences from a standard/generic validation:
//
// - utf-8 char class take in consideration the full Unicode range
// - TLDs have been made mandatory so single names like "localhost" fails
// - protocols have been restricted to ftp, http and https only as requested
//
// Changes:
//
// - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
//   first and last IP address of each class is considered invalid
//   (since they are broadcast/network addresses)
//
// - Added exclusion of private, reserved and/or local networks ranges
//
// - Made starting path slash optional (http://example.com?foo=bar)
//
// - Allow a dot (.) at the end of hostnames (http://example.com.)
//
// Compressed one-line versions:
//
// Javascript version
//
// /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
//
// PHP version
//
// _^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]-*)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]-*)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$_iuS
//
var re_weburl = new RegExp("^" +
// protocol identifier
"(?:(?:https?|ftp)://)" +
// user:pass authentication
"(?:\\S+(?::\\S*)?@)?" + "(?:" +
// IP address exclusion
// private & local networks
"(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
// IP address dotted notation octets
// excludes loopback network 0.0.0.0
// excludes reserved space >= 224.0.0.0
// excludes network & broacast addresses
// (first & last IP address of each class)
"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
// host name
"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
// domain name
"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
// TLD identifier
"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
// TLD may end with dot
"\\.?" + ")" +
// port number
"(?::\\d{2,5})?" +
// resource path
"(?:[/?#]\\S*)?" + "$", "i");

module.exports = re_weburl;

},{}],13:[function(_dereq_,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
  componentButtonText: {
    textAlign: "center",
    display: "inline-block",
    padding: "14px 35px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    fontSize: "15px",
    borderStyle: "solid",
    borderWidth: "2px"
  }
};

var ButtonText = React.createClass({
  displayName: "ButtonText",

  propTypes: {
    style: RPT.object,
    theme: RPT.object,
    text: RPT.string,
    cursor: RPT.string,
    width: RPT.number,
    disabled: RPT.bool,
    onClick: RPT.func,
    isPrimary: RPT.bool,

    textColor: RPT.string,
    textHoverActiveColor: RPT.string,
    textPressColor: RPT.string,

    bgColor: RPT.string,
    bgHoverColor: RPT.string,
    bgPressColor: RPT.string,

    borderColor: RPT.string,
    borderHoverColor: RPT.string,
    borderPressColor: RPT.string
  },

  getInitialState: function getInitialState() {
    return { hover: false };
  },

  mouseOver: function mouseOver() {
    this.setState({ hover: true });
  },

  mouseOut: function mouseOut() {
    this.setState({ hover: false });
  },

  mouseDown: function mouseDown() {
    this.setState({ press: true });
  },

  mouseUp: function mouseUp() {
    this.setState({ press: false });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== undefined) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  },

  componentWillMount: function componentWillMount() {
    if (this.props.disabled) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      textColor: "#5596E6",
      textHoverColor: "#4178BE",
      bgColor: "",
      borderColor: "#5596E6",
      borderHoverColor: "#4178BE",

      textPrimaryColor: "#fff",
      textPrimaryHoverColor: "#fff",
      bgPrimaryColor: "#5596E6",
      bgPrimaryHoverColor: "#4178BE",
      borderPrimaryColor: "#5596E6",
      borderPrimaryHoverColor: "#4178BE",

      text: "BUTTON",
      minWidth: "140px",
      minHeight: "50px",
      btnCursor: "pointer",
      onClick: function onClick() {},
      isPrimary: false
    };
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function render() {
    var stateStyle = {};

    stateStyle.width = this.props.width;

    if (this.props.isPrimary) {
      if (this.state.hover || this.state.press) {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgPrimaryHoverColor;
        stateStyle.color = this.props.textPrimaryHoverColor;
        stateStyle.borderColor = this.props.borderPrimaryHoverColor;
      } else {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgPrimaryColor;
        stateStyle.color = this.props.textPrimaryColor;
        stateStyle.borderColor = this.props.borderPrimaryColor;
      }
    } else {
      if (this.state.hover || this.state.press) {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgHoverColor;
        stateStyle.color = this.props.textHoverColor;
        stateStyle.borderColor = this.props.borderHoverColor;
      } else {
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgColor;
        stateStyle.color = this.props.textColor;
        stateStyle.borderColor = this.props.borderColor;
        stateStyle.width = this.props.width;
      }
    }

    if (this.state.disabled) {
      stateStyle.cursor = 'no-drop';
      stateStyle.backgroundColor = '';
      stateStyle.color = '#AEB8B8';
      stateStyle.borderColor = '#f4f4f4';
    };

    var styleBtn = Object.assign({}, styles.componentButtonText, stateStyle, this.props.style);

    return React.createElement(
      "a",
      null,
      " ",
      React.createElement(
        "div",
        { style: styleBtn, onClick: this.onClick, onMouseOver: this.mouseOver, onMouseOut: this.mouseOut, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp },
        this.props.text,
        " ",
        this.props.disabled,
        " "
      ),
      " "
    );
  }
});

module.exports = ButtonText;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Actions = _dereq_('../../Dashboard/dashboard/Actions.jsx');
var DashboardUtils = _dereq_('../../Dashboard/dashboard/DashboardUtils');
var Utils = _dereq_('../../Dashboard/util/Utils.js');
var Icon = _dereq_('./Icon.jsx');
var Section = _dereq_('./Section.jsx');
var ButtonText = _dereq_('./ButtonText.jsx');
var Portal = _dereq_('./Portal.jsx');

var RPT = React.PropTypes;

var styles = {
  backdrop: {
    backgroundColor: 'rgba(21,41,53,0.3)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px'
  },
  container: {
    width: '800px',
    height: '700px',
    fontSize: '14px',
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    color: '#333333',
    background: 'white',
    margin: '0 auto',
    top: '40px',
    position: 'relative',
    overflow: 'hidden'
  },
  content: {
    width: '480px',
    height: '100%',
    float: 'right',
    paddingRight: '35px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  navigationContainer: {
    width: '250px',
    height: '100%',
    backgroundColor: 'whitesmoke',
    float: 'left',
    paddingTop: '50px',
    overflowY: 'scroll'
  },
  tabs: {
    width: '250px',
    height: '100%',
    backgroundColor: 'whitesmoke',
    float: 'left',
    paddingTop: '50px',
    overflowY: 'auto'
  },
  header: {
    width: '100%',
    paddingTop: '50px',
    paddingBottom: '20px'
  },
  title: {
    fontSize: '28px'
  },
  description: {
    fontSize: '12px',
    color: 'silver'
  },
  canvas: {
    width: '100%',
    overflowY: 'auto',
    marginBottom: '100px'
  },
  buttons: {
    width: '100%',
    height: '100px',
    bottom: '0px',
    position: 'absolute',
    textAlign: 'right'
  },
  cancel: {
    position: 'absolute',
    right: '30px',
    top: '20px',
    zIndex: 1
  },
  tabContainer: {
    marginBottom: '40px'
  },
  tab: {
    padding: '20px 20px',
    fontSize: '14px',
    fontWeight: '700',
    borderLeft: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    color: '#637888'
  },
  subTab: {
    fontWeight: '200',
    margin: '20px 0px',
    fontSize: '12px'
  },
  tabText: {
    marginRight: '24px'
  },
  tabCancel: {},
  activeTab: {
    borderLeft: "8px solid #4581e0",
    color: "#4581e0"
  },
  closeBtnContainer: {
    position: 'absolute',
    top: '15px',
    right: '15px'

  },
  wizTabContainer: {},
  wizTab: {
    color: '#0D1111', // Cool Grey 90
    padding: '20px 20px 20px 20px',
    fontWeight: '500',
    fontSize: '14px',
    textDecoration: 'none',
    background: '0 0',
    borderLeft: '8px solid transparent',
    outline: '0',
    display: 'inline-block',
    cursor: 'pointer'
  },
  wizTabIcon: {
    display: 'inline-block',
    fill: '#AEB8B8' // Cool Grey 30
  },
  wizTabDisabled: {
    cursor: 'no-drop'
  },
  wizControlContainer: {
    boxSizing: 'border-box',
    bottom: '0',
    width: '15%',
    padding: '40px 0 40px 0',
    position: 'fixed'
  },
  horizontalLine: {
    borderTop: '2px solid #FFF',
    marginTop: '20px',
    marginBottom: '20px'
  },
  wizBtn: {
    color: '#FFF',
    padding: '4px 20px 4px 20px',
    fontWeight: '700',
    fontSize: '13px',
    textDecoration: 'none',
    background: '0 0',
    border: 'none',
    outline: '0',
    cursor: 'pointer',
    display: 'inline-block'
  },
  wizBtnRight: {
    float: 'right'
  },
  wizBtnDisabled: {
    color: '#637888',
    cursor: 'no-drop'
  },
  tabTitle: {
    fontSize: "18px",
    fontWeight: "500",
    borderBottom: "1px solid silver",
    paddingBottom: "20px",
    marginBottom: "20px"
  },
  tabDescription: {
    fontSize: "13px"
  }
};

var stylesOld = {
  backdrop: {
    backgroundColor: 'rgba(21,41,53,.6);',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    border: '1px solid rgba(0,0,0,.2)'
  },
  dialoglFade: {
    WebkitTransform: 'translate(0,-25%)',
    MsTransform: 'translate(0,-25%)',
    transform: 'translate(0,-25%)',
    WebkitTransition: '-webkit-transform .3s ease-out',
    MozTransition: '-moz-transform .3s ease-out',
    Otransition: '-o-transform .3s ease-out',
    transition: 'transform .3s ease-out'
  },
  outerContainer: {
    backgroundColor: 'rgba(21,41,53,.9)',
    height: '100%',
    overflow: 'auto',
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif'
  },
  innerContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '1300px',
    boxSizing: 'border-box'
  },
  columnContainer: {
    position: 'relative',
    minHeight: '1px',
    paddingLeft: '15px',
    paddingRight: '15px',
    float: 'left',
    width: '100%',
    boxSizing: 'border-box'
  },
  mainContentContainer: {
    width: '66.66666667%',
    float: 'left',
    position: 'relative',
    minHeight: '1px',
    paddingLeft: '15px',
    paddingRight: '15px',
    boxSizing: 'border-box'
  },
  navigationContainer: {
    width: '16.66666667%',
    float: 'left',
    position: 'relative',
    minHeight: '1px',
    paddingLeft: '15px',
    paddingRight: '15px',
    boxSizing: 'border-box'
  },
  mainContent: {
    background: '#F9F9F9 none repeat scroll 0 0',
    paddingLeft: '50px',
    paddingRight: '50px',
    minHeight: '99vh',
    height: 'auto!important',
    position: 'relative',
    boxSizing: 'border-box'
  },
  tabs: {
    width: '250px',
    height: '100%',
    backgroundColor: 'whitesmoke',
    float: 'left',
    paddingTop: '50px',
    overflowY: 'auto'
  },
  header: {
    width: '100%',
    paddingTop: '50px',
    paddingBottom: '20px',
    borderBottom: '2px solid lightgray'
  },
  title: {
    fontSize: '20px'
  },
  description: {
    fontSize: '12px',
    color: 'silver'
  },
  canvas: {
    width: '100%',
    overflowY: 'auto',
    marginBottom: '100px',
    paddingTop: '20px',
    height: '100%'
  },
  buttons: {
    width: '100%',
    height: '100px',
    textAlign: 'right'
  },
  cancel: {
    position: 'relative',
    right: '0px',
    top: '0px',
    zIndex: 1
  },
  navigationTabContainer: {
    top: '150px',
    position: 'fixed'
  },
  tabContainer: {
    marginBottom: '40px'
  },
  tab: {
    padding: '4px 20px',
    fontSize: '13px',
    fontWeight: '700',
    borderLeft: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    color: '#637888'
  },
  tabText: {
    marginRight: '24px'
  },
  tabCancel: {},
  activeTab: {
    borderLeft: '2px solid #FFF',
    color: '#FFF'
  },
  closeBtnContainer: {
    position: 'fixed',
    top: '50px'
  },
  wizTabContainer: {
    marginBottom: '2rem'
  },
  wizTab: {
    color: '#637888',
    padding: '4px 20px 4px 20px',
    fontWeight: '700',
    fontSize: '13px',
    textDecoration: 'none',
    background: '0 0',
    border: 'none',
    outline: '0',
    display: 'inline-block',
    cursor: 'pointer'
  },
  wizTabIcon: {
    display: 'inline-block',
    fill: '#637888'
  },
  wizTabDisabled: {
    cursor: 'no-drop'
  },
  wizControlContainer: {
    boxSizing: 'border-box',
    bottom: '0',
    width: '15%',
    padding: '40px 0 40px 0',
    position: 'fixed'
  },
  horizontalLine: {
    borderTop: '2px solid #FFF',
    marginTop: '20px',
    marginBottom: '20px'
  },
  wizBtn: {
    color: '#FFF',
    padding: '4px 20px 4px 20px',
    fontWeight: '700',
    fontSize: '13px',
    textDecoration: 'none',
    background: '0 0',
    border: 'none',
    outline: '0',
    cursor: 'pointer',
    display: 'inline-block'
  },
  wizBtnRight: {
    float: 'right'
  },
  wizBtnDisabled: {
    color: '#637888',
    cursor: 'no-drop'
  }
};

var useOldDialog = DashboardUtils.getCapability('useOldDialogs');

var Dialog = {};

var Tab = React.createClass({
  displayName: 'Tab',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    id: RPT.string,
    active: RPT.bool,
    onClick: RPT.func,
    status: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      id: Utils.createUUID()
    };
  },

  getInitialState: function getInitialState() {
    return {
      hover: false,
      status: this.props.status
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.setState({ status: props.status });
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  },

  onRemove: function onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
  },

  onMouseOver: function onMouseOver() {
    this.setState({
      hover: true
    });
  },

  onMouseOut: function onMouseOut() {
    this.setState({
      hover: false
    });
  },

  render: function render() {
    var style = {};
    var statusIcon = '';
    var statusIconStyle = useOldDialog ? stylesOld.wizTabIcon : styles.wizTabIcon;
    if (this.state.status) {
      style = useOldDialog ? stylesOld.wizTab : styles.wizTab;
      var wizTabStatusStyle = {};
      var wizTabStatusStyleOld = {};
      if (this.state.status === 'active') {
        wizTabStatusStyle = styles.activeWizTab;
        wizTabStatusStyleOld = stylesOld.activeWizTab;
      }
      if (this.state.status === 'complete') {
        wizTabStatusStyle = styles.completeWizTab;
        wizTabStatusStyleOld = stylesOld.completeWizTab;
        statusIcon = React.createElement(Icon, { icon: "check", size: 15, theme: this.props.theme, style: statusIconStyle });
      }
      if (this.state.status === 'disabled') {
        wizTabStatusStyle = styles.disabledWizTab;
        wizTabStatusStyleOld = stylesOld.disabledWizTab;
        var disableStyle = useOldDialog ? stylesOld.wizTabDisabled : styles.disabledTab;
        statusIconStyle = Object.assign({}, statusIconStyle, disableStyle);
        style = Object.assign({}, style, disableStyle);
      }
      if (useOldDialog) {
        if (this.state.status !== 'disabled' && (this.props.active || this.state.hover)) {
          style = Object.assign({}, style, wizTabStatusStyleOld, { color: '#0D1111' }); // Cool Grey 90
        }
      } else {
          if (this.props.active) {
            style = Object.assign({}, style, wizTabStatusStyle, styles.activeTab); // Cool Grey 90
          }
        }
    } else {
        style = useOldDialog ? stylesOld.tab : styles.tab;
        if (useOldDialog) {
          if (this.props.active || this.state.hover) {
            style = Object.assign({}, style, stylesOld.activeTab);
          }
        } else {
          if (this.props.active || this.state.hover) {
            style = Object.assign({}, style, styles.activeTab);
          }
        }
      }

    var textStyle = {};
    var remove = '';
    // Check if it is a wizard tab
    if (this.state.status) {
      if (useOldDialog) {
        return React.createElement(
          'div',
          { style: stylesOld.wizTabContainer },
          React.createElement(
            'div',
            { style: style, key: this.props.id, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, onClick: this.onClick },
            React.createElement(
              'span',
              { style: textStyle },
              this.props.children
            ),
            statusIcon,
            remove
          )
        );
      } else {
        var tabStyle = styles.wizTabContainer;
        if (this.props.subtab) {
          tabStyle = Object.assign({}, tabStyle, { marginTop: "-20px" });
          style = Object.assign({}, style, styles.subTab, {
            padding: '5px 0px 5px ' + (20 + 20 * this.props.subtab) + 'px'
          });
        }
        return React.createElement(
          'div',
          { style: tabStyle },
          React.createElement(
            'div',
            { style: style, key: this.props.id, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, onClick: this.onClick },
            React.createElement(
              'span',
              { style: textStyle },
              this.props.children
            ),
            statusIcon,
            remove
          )
        );
      }
    } else {
      if (this.props.onRemove) {
        var iconStyle = styles.tabCancel;
        if (this.state.hover) {
          iconStyle = Object.assign({}, iconStyle, { opacity: 1 });
        }
        textStyle = styles.tabText;
        remove = React.createElement(Icon, { icon: 'delete', style: iconStyle, onClick: this.onRemove, color: '#333333', size: '18', theme: this.props.theme });
      }
      if (useOldDialog) {
        return React.createElement(
          'div',
          { style: stylesOld.tabContainer },
          React.createElement(
            'div',
            { style: style, key: this.props.id, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, onClick: this.onClick },
            React.createElement(
              'span',
              { style: textStyle },
              this.props.children
            ),
            remove
          )
        );
      } else {
        return React.createElement(
          'div',
          { style: styles.tabContainer },
          React.createElement(
            'div',
            { style: style, key: this.props.id, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, onClick: this.onClick },
            React.createElement(
              'span',
              { style: textStyle },
              this.props.children
            ),
            remove
          )
        );
      }
    }
  }
});

var ButtonsOld = React.createClass({
  displayName: 'ButtonsOld',

  propTypes: {
    style: RPT.object,
    theme: RPT.object,
    text: RPT.string,
    cursor: RPT.string,
    width: RPT.number,
    disabled: RPT.bool,
    onClick: RPT.func,
    isPrimary: RPT.bool,

    textColor: RPT.string,
    textHoverActiveColor: RPT.string,
    textPressColor: RPT.string,

    bgColor: RPT.string,
    bgHoverColor: RPT.string,
    bgPressColor: RPT.string,

    borderColor: RPT.string,
    borderHoverColor: RPT.string,
    borderPressColor: RPT.string
  },

  getInitialState: function getInitialState() {
    return { hover: false };
  },

  mouseOver: function mouseOver() {
    this.setState({ hover: true });
  },

  mouseOut: function mouseOut() {
    this.setState({ hover: false });
  },

  mouseDown: function mouseDown() {
    this.setState({ press: true });
  },

  mouseUp: function mouseUp() {
    this.setState({ press: false });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== undefined) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  },

  componentWillMount: function componentWillMount() {
    if (this.props.disabled) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      oldStyle: {
        display: 'inline-block',
        fontWeight: '400',
        textAlign: 'center',
        verticalAlign: 'middle',
        cursor: 'pointer',
        backgroundImage: 'none',
        whiteSpace: 'nowrap',
        padding: '6px 12px',
        fontSize: '14px',
        lineHeight: '1.42857143',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
        borderRadius: '2px',
        border: '1px solid #152935',
        background: '#fff',
        color: '#152935',
        paddingLeft: '30px',
        paddingRight: '30px',
        marginTop: '50px',
        marginBottom: '50px'
      }
    };
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function render() {
    var stateStyle = {};

    stateStyle.width = this.props.width;

    if (this.state.disabled) {
      stateStyle.cursor = 'no-drop';
      stateStyle.backgroundColor = '';
      stateStyle.color = '#AEB8B8';
      stateStyle.borderColor = '#f4f4f4';
    };

    styleBtn = Object.assign({}, this.props.oldStyle, stateStyle, this.props.style);
    return React.createElement(
      'a',
      null,
      ' ',
      React.createElement(
        'div',
        { style: styleBtn, onClick: this.onClick, onMouseOver: this.mouseOver, onMouseOut: this.mouseOut, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp },
        this.props.text,
        ' ',
        this.props.disabled,
        ' '
      ),
      ' '
    );
  }
});

var ButtonTab = React.createClass({
  displayName: 'ButtonTab',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    onClick: RPT.func,
    id: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: 'Label',
      id: Utils.createUUID()
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      { style: styles.tab, onClick: this.props.onClick },
      this.props.children
    );
  }
});

var DialogTab = React.createClass({
  displayName: 'DialogTab',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    description: RPT.string,
    onClick: RPT.func,
    selected: RPT.bool,
    id: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: 'Label',
      id: Utils.createUUID()
    };
  },

  render: function render() {
    var header = "";

    if (this.props.label) {
      var description = "";
      if (this.props.description) {
        description = React.createElement(
          'div',
          { style: Object.assign(styles.tabDescription, { color: this.props.theme.minor }) },
          this.props.description
        );
      }
      header = React.createElement(
        'div',
        { style: Object.assign(styles.tabTitle, { color: this.props.theme.major, borderColor: this.props.theme.minor }) },
        this.props.label,
        description
      );
    }
    return React.createElement(
      'div',
      null,
      header,
      this.props.children
    );
  }
});

var DialogButtons = React.createClass({
  displayName: 'DialogButtons',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.children
    );
  }
});

var Dialog = React.createClass({
  displayName: 'Dialog',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    nls: RPT.object,
    onSubmit: RPT.func
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  componentWillMount: function componentWillMount() {
    var mql = window.matchMedia("(min-width: 800px)");
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged: function mediaQueryChanged(payload) {
    console.log('MediaQueryChanged', payload);
  },

  getInitialState: function getInitialState() {
    var tabs = this.getTabs();
    return {
      activeTab: tabs.length > 0 ? tabs[0].props.id : null,
      useOldDialog: DashboardUtils.getCapability('useOldDialogs')
    };
  },

  onCancel: function onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    Actions.closeDialog();
  },

  onTabClicked: function onTabClicked(id) {
    this.setActiveTab(id);
  },

  setActiveTab: function setActiveTab(id) {
    this.setState({
      activeTab: id
    });
  },

  activateNextTab: function activateNextTab() {
    var self = this;
    var setActive = false;
    var nextID = null;
    React.Children.forEach(this.props.children, function (child) {
      if (setActive && child.type.displayName === 'DialogTab') {
        nextID = child.props.id;
        setActive = false;
      } else {
        child.props.id === self.state.activeTab ? setActive = true : null;
      }
    });
    nextID !== null ? self.setActiveTab(nextID) : null;
  },

  activatePreviousTab: function activatePreviousTab() {
    var self = this;
    var foundID = false;
    var previousID = null;
    React.Children.forEach(this.props.children, function (child) {
      if (child.props.id === self.state.activeTab) {
        foundID = true;
      }
      if (!foundID && child.type.displayName === 'DialogTab') {
        previousID = child.props.id;
      }
    });
    previousID !== null ? self.setActiveTab(previousID) : null;
  },

  getTabs: function getTabs() {
    var dialogTabs = [];
    var children = [];
    React.Children.forEach(this.props.children, function (child) {
      children.push(child);
    });
    for (var i in children) {
      var tab = children[i];
      if (tab.type.displayName == 'DialogTab' || tab.type.displayName == 'WizardTab') {
        dialogTabs.push(tab);
      }
    }
    return dialogTabs;
  },

  getButtonTabs: function getButtonTabs() {
    var buttonTabs = [];
    var children = [];
    React.Children.forEach(this.props.children, function (child) {
      children.push(child);
    });
    for (var i in children) {
      var tab = children[i];
      if (tab.type.displayName == 'ButtonTab') {
        buttonTabs.push(tab);
      }
    }
    return buttonTabs;
  },

  getButtons: function getButtons() {
    var dialogButtons = null;
    var children = [];
    React.Children.forEach(this.props.children, function (child) {
      children.push(child);
    });
    for (var i in children) {
      var buttons = children[i];
      if (buttons.type.displayName == 'DialogButtons') {
        if (useOldDialog) {
          var newBtns = [];
          React.Children.forEach(buttons.props.children, function (btn) {
            var currBtn = React.createElement(ButtonsOld, btn.props);
            newBtns.push(currBtn);
          });
          return newBtns;
        } else {
          return buttons;
        }
      }
    }
  },

  onSubmit: function onSubmit() {
    this.props.onSubmit ? this.props.onSubmit() : null;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // find selected tab
    var active = null;

    React.Children.forEach(nextProps.children, function (child) {
      if (child.props.selected) {
        active = child.props.id;
      }
    });

    if (active) {
      this.setState({
        activeTab: active
      });
    }
  },

  render: function render() {
    var self = this;
    var isWizard = false;
    var dialogTabs = this.getTabs();
    var activeTab = this.state.activeTab;
    // check if there is an empty plot -> focus it
    for (var i in dialogTabs) {
      tab = dialogTabs[i];
      if (tab.props.selected) {
        activeTab = tab.props.id;
      }
    }

    // focus the selected
    var tab = '';
    for (var i in dialogTabs) {
      tab = dialogTabs[i];
      if (tab.props.id == activeTab) {
        break;
      }
    }

    var isSubmitTab = tab.props.isSubmitTab == true ? true : false;

    var dialogButtons = this.getButtons();
    var buttonTabs = this.getButtonTabs();

    if (this.state.useOldDialog) {
      var btnRightStyle = Object.assign({}, stylesOld.wizBtn, stylesOld.wizBtnRight);
      var nextBtn = React.createElement(
        'div',
        { style: btnRightStyle },
        'Next'
      );
      var backBtn = React.createElement(
        'div',
        { style: stylesOld.wizBtn },
        'Back'
      );
      var styleBackdrop = Object.assign({}, stylesOld.backdrop, stylesOld.dialogFade);
      var tabSections = '';
      var wizController = '';

      var dialogTabHandles = dialogTabs.map(function (tab) {
        tab.props.status ? isWizard = true : '';
        return React.createElement(
          Tab,
          { key: tab.props.id, onRemove: tab.props.onRemove, subtab: tab.props.subtab, onClick: self.onTabClicked, active: tab.props.id == activeTab, theme: self.props.theme, id: tab.props.id, status: tab.props.status },
          tab.props.label
        );
      });
      if (isWizard) {
        tab = React.createElement(
          Section,
          { headingSection: tab.props.label },
          tab
        );
        wizController = React.createElement(
          'div',
          { style: stylesOld.wizControlContainer },
          React.createElement('div', { style: stylesOld.horizontalLine }),
          backBtn,
          nextBtn
        );
      } else {
        tab = '';
        tabSections = dialogTabs.map(function (currtab) {
          return React.createElement(
            Section,
            { headingSection: currtab.props.label },
            currtab
          );
        });
      }

      return React.createElement(
        'div',
        { style: stylesOld.backdrop },
        React.createElement(
          'div',
          { style: stylesOld.outerContainer },
          React.createElement(
            'div',
            { style: stylesOld.innerContainer },
            React.createElement(
              'div',
              { style: stylesOld.columnContainer },
              React.createElement(
                'div',
                { style: stylesOld.navigationContainer },
                React.createElement(
                  'div',
                  { style: stylesOld.navigationTabContainer },
                  dialogTabHandles,
                  buttonTabs.map(function (currTab) {
                    return currTab;
                  })
                )
              ),
              React.createElement(
                'div',
                { style: stylesOld.mainContentContainer },
                React.createElement(
                  'div',
                  { style: stylesOld.mainContent },
                  React.createElement(
                    'div',
                    { style: styles.header },
                    React.createElement(
                      'div',
                      { style: styles.title },
                      this.props.title
                    ),
                    React.createElement(
                      'div',
                      { style: styles.description },
                      this.props.description
                    )
                  ),
                  React.createElement(
                    'div',
                    { style: styles.canvas },
                    tab,
                    tabSections
                  ),
                  React.createElement(
                    'div',
                    { style: stylesOld.buttons },
                    dialogButtons
                  )
                )
              ),
              React.createElement(
                'div',
                { style: stylesOld.navigationContainer },
                React.createElement(
                  'div',
                  { style: stylesOld.closeBtnContainer },
                  React.createElement(Icon, { icon: 'highlight-remove', style: stylesOld.cancel, onClick: this.onCancel, color: '#FFF', size: '32', theme: this.props.theme })
                ),
                wizController
              )
            )
          )
        )
      );
    } else {
      var wizController = '';
      var dialogTabHandles = dialogTabs.map(function (tab) {
        tab.props.status ? isWizard = true : '';
        return React.createElement(
          Tab,
          { key: tab.props.id, onRemove: tab.props.onRemove, subtab: tab.props.subtab, onClick: self.onTabClicked, active: tab.props.id == activeTab, theme: self.props.theme, id: tab.props.id, status: tab.props.status },
          tab.props.label
        );
      });
      if (isWizard) {
        wizController = React.createElement(
          'div',
          null,
          React.createElement(
            DialogButtons,
            null,
            React.createElement(ButtonText, { onClick: self.activatePreviousTab, text: self.props.nls.resolve('Back') }),
            isSubmitTab ? React.createElement(ButtonText, { isPrimary: true, onClick: self.onSubmit, text: self.props.nls.resolve('Submit') }) : React.createElement(ButtonText, { isPrimary: true, onClick: self.activateNextTab, text: self.props.nls.resolve('Next') })
          )
        );
      }
      return React.createElement(
        'div',
        { style: styles.backdrop },
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { style: styles.container },
              React.createElement(
                'div',
                { style: styles.navigationContainer },
                React.createElement(
                  'div',
                  { style: styles.navigationTabContainer },
                  dialogTabHandles,
                  buttonTabs.map(function (currTab) {
                    return currTab;
                  })
                )
              ),
              React.createElement(
                'div',
                { style: styles.content },
                React.createElement(
                  'div',
                  { style: styles.closeBtnContainer },
                  React.createElement(Icon, { icon: 'highlight-remove', style: stylesOld.cancel, onClick: this.onCancel, color: '#000', size: '25', theme: this.props.theme })
                ),
                React.createElement(
                  'div',
                  { style: styles.header },
                  React.createElement(
                    'div',
                    { style: styles.title },
                    this.props.title
                  ),
                  React.createElement(
                    'div',
                    { style: styles.description },
                    this.props.description
                  )
                ),
                React.createElement(
                  'div',
                  { style: styles.canvas },
                  tab
                ),
                React.createElement(
                  'div',
                  { style: styles.buttons },
                  wizController
                )
              )
            )
          )
        )
      );
    }
  }
});

Dialog.Dialog = Dialog;
Dialog.DialogTab = DialogTab;
Dialog.DialogButtons = DialogButtons;
Dialog.ButtonTab = ButtonTab;

module.exports = Dialog;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":7,"../../Dashboard/dashboard/DashboardUtils":8,"../../Dashboard/util/Utils.js":11,"./ButtonText.jsx":13,"./Icon.jsx":15,"./Portal.jsx":21,"./Section.jsx":22}],15:[function(_dereq_,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
  icon: {
    verticalAlign: "middle",
    cursor: "pointer"
  }
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Icon-component
//

var Icon = React.createClass({
  displayName: "Icon",

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    icon: RPT.string.isRequired,
    color: RPT.string,
    size: RPT.number,
    onClick: RPT.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 24,
      onClick: function onClick() {}
    };
  },

  renderGraphic: function renderGraphic() {
    // see list of icons: http://dmfrancisco.github.io/react-icons/
    switch (this.props.icon) {
      case 'style/images/line-graph.svg':
        return React.createElement(
          "g",
          { id: "Page-1-Copy", fill: "#3C3C3B" },
          React.createElement("path", { d: "M12.94,18 L17.939,18 L17.939,11.118 L12.94,11.118 L12.94,18 Z M13.94,12.118 L16.94,12.118 L16.94,17.001 L13.94,17.001 L13.94,12.118 Z", id: "Fill-1" }),
          React.createElement("path", { d: "M6.47,18 L11.469,18 L11.469,17 L6.47,17 L6.47,18 Z", id: "Fill-2" }),
          React.createElement("path", { d: "M6.47,15.686 L11.469,15.686 L11.469,14.686 L6.47,14.686 L6.47,15.686 Z", id: "Fill-3" }),
          React.createElement("path", { d: "M6.47,13.372 L11.469,13.372 L11.469,12.372 L6.47,12.372 L6.47,13.372 Z", id: "Fill-4" }),
          React.createElement("path", { d: "M6.47,11.058 L11.469,11.058 L11.469,10.058 L6.47,10.058 L6.47,11.058 Z", id: "Fill-5" }),
          React.createElement("path", { d: "M6.47,8.744 L11.469,8.744 L11.469,7.743 L6.47,7.743 L6.47,8.744 Z", id: "Fill-6" }),
          React.createElement("path", { d: "M0,18 L5,18 L5,0.069 L0,0.069 L0,18 Z", id: "Fill-7" })
        );
      case 'style/images/gauge.svg':
        return React.createElement(
          "g",
          { id: "Page-1-+-Fill-6", transform: "translate(641.000000, 4762.000000)" },
          React.createElement("g", { id: "Page-1", transform: "translate(14.500000, 13.000000)" }),
          React.createElement("path", { d: "M17.52,9.988 C21.043,10.324 23.799,13.29 23.799,16.901 C23.799,20.737 20.688,23.847 16.852,23.847 C13.479,23.847 10.67,21.444 10.04,18.256 L5,18.256 C5.674,24.208 10.72,28.835 16.852,28.835 C23.443,28.835 28.786,23.492 28.786,16.901 C28.786,10.535 23.799,5.349 17.52,5 L17.52,9.988 Z", id: "Fill-6", fill: "#3C3C3B", transform: "translate(16.893000, 16.917500) rotate(-135.000000) translate(-16.893000, -16.917500) " }),
          React.createElement("path", { d: "M15.3574,28 L18.6434,28 L17.0004,13.214 L15.3574,28 Z", id: "Fill-4", fill: "#3C3C3B" })
        );
      case 'style/images/pie-chart.svg':
        return React.createElement(
          "g",
          { id: "Page-1", transform: "translate(577.000000, 4767.000000)" },
          React.createElement("path", { d: "M4.988,11.421 C5.273,8.332 7.577,5.831 10.57,5.25 L10.57,0.21 C4.818,0.849 0.314,5.576 0,11.421 L4.988,11.421 Z", id: "Fill-1" }),
          React.createElement("path", { d: "M12.5703,5.1529 C16.0933,5.4889 18.8493,8.4549 18.8493,12.0659 C18.8493,15.9019 15.7383,19.0119 11.9023,19.0119 C8.5293,19.0119 5.7203,16.6089 5.0903,13.4209 L0.0503,13.4209 C0.7243,19.3729 5.7703,23.9999 11.9023,23.9999 C18.4933,23.9999 23.8363,18.6569 23.8363,12.0659 C23.8363,5.6999 18.8493,0.5139 12.5703,0.1649 L12.5703,5.1529 Z", id: "Fill-6" })
        );
      case 'style/images/scatter-chart.svg':
        return React.createElement(
          "g",
          { id: "Group", transform: "translate(781.000000, 4767.000000)" },
          React.createElement("rect", { id: "Rectangle-115-Copy-4", x: "18", y: "11", width: "4", height: "4", rx: "4" }),
          React.createElement("rect", { id: "Rectangle-115-Copy-8", x: "23", y: "4", width: "7", height: "7", rx: "4" }),
          React.createElement("rect", { id: "Rectangle-115-Copy-5", x: "8", y: "5", width: "6", height: "6", rx: "4" }),
          React.createElement("rect", { id: "Rectangle-115-Copy-6", x: "9", y: "16", width: "6", height: "6", rx: "4" }),
          React.createElement("rect", { id: "Rectangle-115-Copy-7", x: "0", y: "16", width: "5", height: "5", rx: "4" }),
          React.createElement("rect", { id: "Rectangle-115-Copy-4", x: "17", y: "0", width: "4", height: "4", rx: "4" })
        );
      case 'style/images/text-based.svg':
        return React.createElement(
          "g",
          { id: "Create-Card-Modal", transform: "translate(-926.000000, -4769.000000)", "font-size": "22", "font-family": "Times", fill: "#3C3C3B", "font-weight": "normal" },
          React.createElement(
            "text",
            { id: "A" },
            React.createElement(
              "tspan",
              { x: "926", y: "4785" },
              "A"
            )
          )
        );
      case 'check':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" })
        );
      case 'search':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" })
        );
      case 'dots':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
        );
      case 'arrow-drop-up':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7 14l5-5 5 5z" })
        );
      case 'arrow-drop-down':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7 10l5 5 5-5z" })
        );
      case 'check':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" })
        );
      case 'more-vert':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
        );
      case 'delete':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12h-12v12zm13-15h-3.5l-1-1h-5l-1 1h-3.5v2h14v-2z" })
        );
      case 'fullscreen-exit':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M5 16h3v3h2v-5h-5v2zm3-8h-3v2h5v-5h-2v3zm6 11h2v-3h3v-2h-5v5zm2-11v-3h-2v5h5v-2h-3z" })
        );
      case 'highlight-remove':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M14.59 8l-2.59 2.59-2.59-2.59-1.41 1.41 2.59 2.59-2.59 2.59 1.41 1.41 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59-1.41-1.41zm-2.59-6c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        );
      case 'fullscreen':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M7 14h-2v5h5v-2h-3v-3zm-2-4h2v-3h3v-2h-5v5zm12 7h-3v2h5v-5h-2v3zm-3-12v2h3v3h2v-5h-5z" })
        );
      case 'remove':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M19 13h-14v-2h14v2z" })
        );
      case 'undo':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6l-3.6-3.6v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78c-1.39-4.19-5.32-7.22-9.97-7.22z" })
        );
      case 'settings':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65c-.03-.24-.24-.42-.49-.42h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" })
        );
      case 'add-circle-outline':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        );
      case 'save':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M17 3h-12c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-12l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10h-10v-4h10v4z" })
        );
      case 'restore':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M13 3c-4.97 0-9 4.03-9 9h-3l3.89 3.89.07.14 4.04-4.03h-3c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42c1.63 1.63 3.87 2.64 6.36 2.64 4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08v-4.25h-1.5z" })
        );
      case 'add-circle-outline':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
        );
      case 'apps':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M4 8h4v-4h-4v4zm6 12h4v-4h-4v4zm-6 0h4v-4h-4v4zm0-6h4v-4h-4v4zm6 0h4v-4h-4v4zm6-10v4h4v-4h-4zm-6 4h4v-4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" })
        );
      case 'info':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M11 17h2v-6h-2v6zm1-15c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v-2h-2v2z" })
        );
      case 'apps':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M4 8h4v-4h-4v4zm6 12h4v-4h-4v4zm-6 0h4v-4h-4v4zm0-6h4v-4h-4v4zm6 0h4v-4h-4v4zm6-10v4h4v-4h-4zm-6 4h4v-4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" })
        );
      case 'dashboard':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M3 13h8v-10h-8v10zm0 8h8v-6h-8v6zm10 0h8v-10h-8v10zm0-18v6h8v-6h-8z" })
        );
      case 'grade':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81 6.63-7.19.61 5.46 4.73-1.64 7.03z" })
        );
      case 'lock':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M18 8h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9h-6.2v-2c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" })
        );
      case 'location':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })
        );
      case 'play-arrow':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M8 5v14l11-7z" })
        );
      case 'circle-filled':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" })
        );
      case 'sync':
        return React.createElement(
          "g",
          null,
          React.createElement("path", { d: "M12 4v-3l-4 4 4 4v-3c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46c.78-1.23 1.24-2.69 1.24-4.26 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8l-1.46-1.46c-.78 1.23-1.24 2.69-1.24 4.26 0 4.42 3.58 8 8 8v3l4-4-4-4v3z" })
        );
    }
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  componentWillMount: function componentWillMount() {
    // If there is no color specified take the theme color or (if the theme is absent) a default color
    // TODO: this should be state.  props can't change
    //this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.title||"#5a5a5a";
  },

  render: function render() {

    var styleIcon = Object.assign({}, styles.icon, {
      fill: this.props.color,
      width: this.props.size,
      height: this.props.size
    }, this.props.style);

    return React.createElement(
      "span",
      null,
      React.createElement(
        "svg",
        { viewBox: "0 0 24 24",
          preserveAspectRatio: "xMidYMid meet",
          fit: true,
          style: styleIcon,
          onClick: this.onClick },
        this.renderGraphic()
      )
    );
  }
});

module.exports = Icon;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = _dereq_('./Icon.jsx');

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
	displayName: 'IconLink',

	propTypes: {
		style: RPT.object,
		theme: RPT.object.isRequired,
		icon: RPT.string,
		color: RPT.string,
		size: RPT.number,
		action: RPT.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			size: 24
			// color default is set in componentWillMount
		};
	},

	onClick: function onClick() {
		if (this.props.action) {
			this.props.action();
		}
	},

	componentWillMount: function componentWillMount() {
		// TODO: this should be state.  props can't change
		//this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.major||"#5a5a5a";
	},

	render: function render() {
		var styleContainer = Object.assign({}, this.props.style, styles.container);
		var linkLabel = Object.assign({}, styles.label, {
			lineHeight: this.props.size + "px",
			color: this.props.color
		});

		return React.createElement(
			'div',
			{ style: styleContainer, onClick: this.onClick },
			React.createElement(Icon, { icon: this.props.icon,
				color: this.props.color,
				size: this.props.size,
				style: { verticalAlign: "middle" },
				theme: this.props.theme
			}),
			React.createElement(
				'span',
				{ style: linkLabel },
				this.props.children
			)
		);
	}
});

module.exports = IconLink;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":15}],17:[function(_dereq_,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
    imageWrapper: {
        width: "inherit",
        height: "inherit"
    },
    imageError: {
        height: "100%",
        width: "100%",
        display: "table"
    },
    imageErrorText: {
        display: "table-cell",
        verticalAlign: "middle",
        textAlign: "center"
    }
};

// TODO Called IoTImage because of Namespace conflicts -> Fix this
var Image = React.createClass({
    displayName: "Image",

    propTypes: {
        url: RPT.string,
        width: RPT.number,
        height: RPT.number,
        style: RPT.object,
        onError: RPT.func
    },

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    getInitialState: function getInitialState() {
        return {
            url: this.props.url ? this.props.url : "",
            width: this.props.width ? this.props.width + "px" : "",
            height: this.props.height ? this.props.height + "px" : "",
            error: false
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(props) {
        this.setState({ error: false });
        console.log(props.url);
        this.setState({ url: props.url });
        if (this.state.width !== props.width) {
            this.setState({ width: props.width });
        }
        if (this.state.height !== props.height) {
            this.setState({ height: props.height });
        }
    },

    handleError: function handleError(e) {
        if (typeof this.props.onError === 'function') {
            this.props.onError(e.target.value);
        } else {
            this.setState({ error: true });
        }
    },

    onLoad: function onLoad(e) {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(e);
        }
    },

    render: function render() {
        var errorMsg = "";

        var image = React.createElement("img", { width: this.state.width, height: this.state.height, src: this.state.url, onError: this.handleError, onLoad: this.onLoad, style: this.props.style });

        if (this.state.error && this.state.url !== "") {
            errorMsg = React.createElement(
                "div",
                { style: styles.imageError },
                React.createElement(
                    "span",
                    { style: styles.imageErrorText },
                    "No image available"
                )
            );
            image = "";
        }

        return React.createElement(
            "div",
            { style: styles.imageWrapper },
            image,
            errorMsg
        );
    }
});

module.exports = Image;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(_dereq_,module,exports){
(function (global){
'use strict';

/*global require, module */
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var re_weburl = _dereq_('../../Dashboard/util/regex-weburl');

var styles = {
  field: {
    border: 'none',
    borderBottom: '3px solid #9EAAA9',
    boxShadow: 'none!important',
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '42px',
    padding: '8px 0px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
    outline: 'none',
    lineHeight: '1.42857143',
    boxSizing: 'border-box',
    WebkitTransition: 'all .2s ease-in-out',
    transition: 'all .2s ease-in-out',
    backgroundColor: 'inherit'
  },
  fieldContainer: {
    width: '100%',
    float: 'left'
  },
  validationWarning: {
    position: 'relative',
    top: '-25px',
    textAlign: 'right',
    height: '0px',
    paddingRight: '10px'
  },
  after: {
    clear: 'both'
  }

};

var InputField = React.createClass({
  displayName: 'InputField',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    containerStyle: RPT.object,
    onChange: RPT.func,
    onSubmit: RPT.func,
    initialValue: RPT.string,
    placeholder: RPT.string,
    readOnly: RPT.bool,
    min: RPT.bool,
    max: RPT.bool,
    type: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialValue: '',
      type: 'text',
      style: { label: {} },
      readOnly: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.initialValue || '',
      isValid: true
    };
  },

  validateType: function validateType(value) {
    var currType = this.props.type || 'text';
    var isValid = true;

    switch (currType) {
      case 'url':
        isValid = value.match(re_weburl) !== null;
    }

    return isValid;
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    props.value ? this.setState({ value: props.value }) : null;
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
    this.setState({ isValid: this.validateType(event.target.value) });
  },

  handleSubmit: function handleSubmit(event) {
    if (event.key == "Enter") {
      if (this.props.onSubmit) {
        this.props.onSubmit(event.target.value);
      }
    }
  },

  handleOnFocus: function handleOnFocus(event) {
    this.setState({
      hasFocus: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(event.target.value);
    }
  },

  handleClick: function handleClick(event) {
    this.setState({
      hasFocus: true
    });
    if (this.props.onClick) {
      this.props.onClick(event.target.value);
    }
  },

  handleOnBlur: function handleOnBlur(event) {
    this.setState({
      hasFocus: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value);
    }
  },

  render: function render() {
    var warning = this.state.isValid ? '' : React.createElement(
      'div',
      { style: styles.validationWarning },
      '!'
    );
    if (this.state.hasFocus) {
      styles.field.borderColor = '#4581E0';
    } else {
      styles.field.borderColor = '#9EAAA9';
    }

    var inputStyle = Object.assign({}, styles.field, this.props.style);

    var containerStyle = Object.assign({}, styles.fieldContainer, this.props.containerStyle);

    var inputField = React.createElement('input', { type: this.props.type, min: this.props.min, max: this.props.max, style: inputStyle, name: 'field', value: this.state.value, readOnly: this.props.readOnly, onKeyDown: this.handleSubmit, onChange: this.handleChange, onFocus: this.handleOnFocus, onClick: this.handleClick, onBlur: this.handleOnBlur, placeholder: this.props.placeholder });

    return React.createElement(
      'div',
      { style: styles.formElement },
      React.createElement(
        'div',
        { style: containerStyle },
        inputField,
        warning
      ),
      React.createElement('div', { style: styles.after })
    );
  }
});

module.exports = InputField;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/regex-weburl":12}],19:[function(_dereq_,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {

  container: {
    marginBottom: "15px",
    boxSizing: "border-box",
    clear: "both"
  },
  childContainer: {},
  label: {
    textAlign: "left",
    paddingRight: "15px",
    paddingTop: "7px",
    display: "inline-block",
    fontSize: "13px",
    color: "#9EAAA9"
  }

};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Label-component
//

var Label = React.createClass({
  displayName: "Label",

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    label: RPT.string,
    labelFor: RPT.string,
    customContainerStyle: RPT.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      label: ""
    };
  },

  getInitialState: function getInitialState() {
    return {
      hasFocus: false
    };
  },

  componentWillMount: function componentWillMount() {
    this.updateTheme();
  },

  onFocus: function onFocus(e) {
    this.setState({ hasFocus: true });
  },

  onBlur: function onBlur(e) {
    this.setState({ hasFocus: false });
  },

  updateTheme: function updateTheme() {
    styles.label.color = this.state.hasFocus ? "#4581E0" : "#9EAAA9";
    styles.label.color = styles.label.color ? styles.label.color : this.props.theme && this.props.theme.title || "#323232";
  },

  render: function render() {
    var self = this;
    this.updateTheme();
    var styleLabel = Object.assign({}, styles.label, this.props.style);
    var styleContainer = Object.assign({}, styles.container, this.props.customContainerStyle);
    return React.createElement(
      "div",
      { style: styleContainer },
      React.createElement(
        "label",
        { style: styleLabel, htmlFor: this.props.labelFor },
        this.props.label
      ),
      React.createElement(
        "div",
        { style: styles.childContainer },
        React.Children.map(this.props.children, function (child, idx) {
          // TODO: can't modify props
          //child.props.onFocus=self.onFocus;
          //child.props.onBlur=self.onBlur;
          return child;
        })
      )
    );
  }
});

module.exports = Label;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = _dereq_('./Icon.jsx');

var styles = {
    optionContainer: {
        borderStyle: "solid",
        padding: "10px",
        fontSize: "14px",
        borderRightWidth: "2px",
        borderLeftWidth: "2px",
        borderColor: "#E7E7E7",
        backgroundColor: "",
        color: "",
        cursor: "pointer",
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box"
    },
    selectionTickContainer: {
        display: "inline",
        float: "right"
    },
    selectionTick: {}
};

var Option = React.createClass({
    displayName: 'Option',

    propTypes: {
        theme: RPT.object,
        style: RPT.object,
        value: RPT.string,
        selected: RPT.bool,
        disabled: RPT.bool,
        onSelect: RPT.func,
        onClick: RPT.func,
        lastChild: RPT.bool
    },

    getInitialState: function getInitialState() {
        return {
            hover: false,
            disabled: this.props.disabled || false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            selected: false,
            theme: { "light": "#c7c7c7",
                "title": "#323232",
                "dark": "#5a5a5a" }
        };
    },

    componentWillMount: function componentWillMount() {
        styles.optionContainer.borderColor = "#E7E7E7";
    },

    mouseOver: function mouseOver() {
        this.setState({ hover: true });
    },

    mouseOut: function mouseOut() {
        this.setState({ hover: false });
    },

    handleMouseDown: function handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.state.disabled) {
            if (typeof this.props.children == "string" && this.props.children !== "") {

                this.props.onSelect(this.props.value, this.props.children, event);
                this.props.onClick ? this.props.onClick() : null;
            } else {
                this.props.onSelect(this.props.value, event);
            }
        }
    },

    render: function render() {

        if (this.props.lastChild == true) {
            styles.optionContainer.borderBottomWidth = "2px";
            styles.optionContainer.borderTopWidth = "0px";
        } else if (this.props.firstChild == true) {
            styles.optionContainer.borderTopWidth = "1px";
            styles.optionContainer.borderBottomWidth = "0px";
        } else {
            styles.optionContainer.borderTopWidth = "0px";
            styles.optionContainer.borderBottomWidth = "0px";
        }

        var option = "";

        if (!this.state.disabled) {
            styles.optionContainer.cursor = "pointer";
            if (this.state.hover || this.props.selected) {
                styles.optionContainer.backgroundColor = "#4581E0";
                styles.optionContainer.color = "#FFFFFF";
                styles.selectionTick.color = "#FFFFFF";
                styles.optionContainer.borderColor = "#4581E0";
            } else {
                styles.optionContainer.backgroundColor = "#F7F7F7";
                styles.optionContainer.color = this.props.theme.major;
                styles.selectionTick.color = this.props.theme.title;
                styles.optionContainer.borderColor = "#E7E7E7";
            }
        } else {
            styles.optionContainer.backgroundColor = "#F9F9F9";
            styles.optionContainer.color = this.props.theme.minor;
            styles.optionContainer.cursor = "default";
        }

        var selectionTick = this.props.selected ? React.createElement(
            'div',
            { style: styles.selectionTickContainer },
            React.createElement(Icon, { theme: this.props.theme, icon: 'check', color: styles.selectionTick.color, size: 12 }),
            ' '
        ) : "";

        var containerStyle = Object.assign({}, styles.optionContainer, this.props.style);
        if (this.props.onSelect !== undefined) {
            option = React.createElement(
                'div',
                { onMouseDown: this.handleMouseDown, style: containerStyle,
                    onMouseOver: this.mouseOver, onMouseOut: this.mouseOut
                },
                this.props.children,
                selectionTick
            );
        } else {
            option = React.createElement(
                'option',
                { value: this.props.value, selected: this.props.selected },
                this.props.children
            );
        }

        return option;
    }
});

module.exports = Option;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":15}],21:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var RPT = React.PropTypes;

var styles = {};

var Portal = React.createClass({
  displayName: 'Portal',

  componentDidMount: function componentDidMount() {
    this.popup = document.createElement("div");
    this.popup.style.position = 'relative';
    this.popup.style.zIndex = '9999';
    document.body.style.overflow = 'hidden';
    document.body.appendChild(this.popup);
    this._child = ReactDOM.render(this.props.children, this.popup);;
  },

  componentDidUpdate: function componentDidUpdate() {
    if (!this._child) return;
    this._child.setState({});
  },

  componentWillUnmount: function componentWillUnmount() {
    React.unmountComponentAtNode(this.popup);
    document.body.style.overflow = 'auto';
    document.body.removeChild(this.popup);
  },

  render: function render() {
    return null;
  }

});

module.exports = Portal;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],22:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var RPT = React.PropTypes;

var styles = {
  sectionWrapper: {
    clear: "both",
    marginBottom: '40px'
  },

  headingSection: {
    color: "#5c91cc",
    fontWeight: "700",
    display: "inline-block",
    textTransform: "none",
    fontSize: "14px",
    marginTop: "20px",
    marginBottom: '10px'
  },

  hr: {
    borderTop: '1px solid #eee',
    boxSizing: 'content-box',
    height: '3px',
    backgroundColor: '#4983c6',
    marginTop: '10px',
    borderStyle: 'solid',
    marginBottom: '25px',
    border: '0px'
  }

};

var Section = React.createClass({
  displayName: 'Section',

  propTypes: {},

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  getInitialState: function getInitialState() {
    return {};
  },

  componentDidUpdate: function componentDidUpdate() {},

  render: function render() {

    var headingSection = "";

    headingSection = React.createElement(
      'div',
      null,
      this.props.headingSection
    );

    return React.createElement(
      'div',
      { style: styles.sectionWrapper },
      React.createElement(
        'div',
        { style: styles.headingSection },
        headingSection
      ),
      React.createElement('hr', { style: styles.hr }),
      React.createElement(
        'div',
        null,
        this.props.children
      )
    );
  }
});
module.exports = Section;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],23:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var InputField = _dereq_('./InputField.jsx');
var Icon = _dereq_('./Icon.jsx');

var styles = {
  selectBox: {
    cursor: 'pointer'
  },
  optionsContainer: {
    position: 'relative',
    WebkitTransition: 'all .2s ease-in-out',
    transition: 'all .2s ease-in-out',
    minWidth: '100%',
    zIndex: '10'
  },
  iconContainer: {
    position: 'relative',
    top: '-30px',
    float: 'right',
    outlineWidth: '0px !important'
  },
  inputField: {
    width: '100%',
    cursor: 'pointer'
  },
  after: {
    //clear: 'both'
  }
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Select-component
//

var SelectBox = React.createClass({
  displayName: 'SelectBox',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    onChange: RPT.func,
    label: RPT.string,
    initialValue: RPT.string,
    value: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialValue: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      value: this.props.value || null
    };
  },

  componentDidMount: function componentDidMount() {
    this.updateInput(this.props.value);
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.updateInput(props.value);
  },

  onSelect: function onSelect(value, label, event) {
    this.setState({ input: label, isOpen: false, value: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  onFocus: function onFocus() {
    this.setState({ isOpen: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  },

  onBlur: function onBlur() {
    this.setState({ isOpen: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },

  updateInput: function updateInput(newVal) {
    var self = this;
    React.Children.forEach(this.props.children, function (child) {
      if (newVal === child.props.value) {
        self.setState({ input: child.props.children, value: newVal });
      }
    });
  },

  handleChange: function handleChange(event) {},

  renderInputField: function renderInputField() {
    return React.createElement(InputField, { readOnly: true, style: styles.inputField, containerStyle: { width: '100%', cursor: 'pointer' }, theme: this.props.theme, initialValue: this.props.initialValue, value: this.state.input, onFocus: this.onFocus, onClick: this.onFocus, onBlur: this.onBlur });
  },

  renderChildren: function renderChildren() {
    var self = this;
    var children = this.props.children;
    var lastIndex = Array.isArray(children) ? children.length - 1 : null;
    var childrenElement = React.createElement(
      'div',
      { style: styles.optionsContainer },
      React.Children.map(children, function (child, idx) {
        var currProps = {};
        if (lastIndex && lastIndex === idx) {
          currProps = { lastChild: true, firstChild: false };
        } else if (idx === 0) {
          currProps = { lastChild: false, firstChild: true };
        } else {
          currProps = { lastChild: false, firstChild: false };
        }

        if (self.state.value === child.props.value) {
          currProps.selected = true;
        } else {
          currProps.selected = false;
        }

        currProps.onSelect = self.onSelect;
        var newChild = React.cloneElement(child, currProps);
        return newChild;
      })
    );

    return childrenElement;
  },

  render: function render() {
    var selectBox = Object.assign({}, styles.selectBox, this.props.style);
    return React.createElement(
      'div',
      { style: selectBox },
      this.renderInputField(),
      React.createElement(
        'div',
        { style: styles.iconContainer, contentEditable: true, onBlur: this.onBlur },
        React.createElement(Icon, { icon: "arrow-drop-down", size: 15, theme: this.props.theme, onClick: this.onFocus })
      ),
      this.state.isOpen ? this.renderChildren() : '',
      React.createElement('div', { style: styles.after })
    );
  }
});

module.exports = SelectBox;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":15,"./InputField.jsx":18}],24:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Griddle = (typeof window !== "undefined" ? window['Griddle'] : typeof global !== "undefined" ? global['Griddle'] : null); // component based on http://griddlegriddle.github.io/Griddle/index.html
var Icon = _dereq_('./IconLink.jsx');

var RPT = React.PropTypes;

var Table = React.createClass({
  displayName: 'Table',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    device: RPT.string,
    property: RPT.string,
    unit: RPT.string,
    wrapper: RPT.object,

    columns: RPT.array,
    columnMetadata: RPT.array,
    rowMetadata: RPT.array,
    metadataColumns: RPT.array,
    resultsPerPage: RPT.string,
    initialSort: RPT.string,
    customRowComponentClassName: RPT.string,
    settingsText: RPT.string,
    filterPlaceholderText: RPT.string,
    nextText: RPT.string,
    previousText: RPT.string,
    maxRowsText: RPT.string,
    showFilter: RPT.bool,
    showSettings: RPT.bool,
    useCustomRowComponent: RPT.bool,
    useGriddleIcons: RPT.bool,
    customRowComponent: RPT.func,
    showPager: RPT.bool,
    useFixedHeader: RPT.bool,
    enableInfiniteScroll: RPT.bool,
    bodyHeight: RPT.number,
    paddingHeight: RPT.number,
    rowHeight: RPT.number,
    useFixedLayout: RPT.bool,
    isSubGriddle: RPT.bool,
    enableSort: RPT.bool,
    onRowClick: RPT.func,
    noDataMessage: RPT.string,
    enableToggleCustom: RPT.bool,
    results: RPT.array,
    settingsIconComponent: RPT.string
  },

  render: function render() {
    var settingsIcon = React.createElement(Icon, { theme: this.props.theme, size: '20', color: '#5a5a5a', icon: 'settings' });
    return React.createElement(
      'div',
      null,
      React.createElement(Griddle, {
        useGriddleStyles: false,

        columns: this.props.columns,
        columnMetadata: this.props.columnMetadata,
        rowMetadata: this.props.rowMetadata,
        resultsPerPage: this.props.resultsPerPage,
        initialSort: this.props.initialSort,
        customRowComponentClassName: this.props.customRowComponentClassName,
        settingsText: this.props.settingsText,
        filterPlaceholderText: this.props.filterPlaceholderText,
        metadataColumns: this.props.metadataColumns,
        showFilter: this.props.showFilter,
        showSettings: this.props.showSettings,
        useCustomRowComponent: this.props.useCustomRowComponent,
        useGriddleIcons: this.props.useGriddleIcons,
        customRowComponent: this.props.customRowComponent,
        showPager: this.props.showPager,
        useFixedHeader: this.props.useFixedHeader,
        enableInfiniteScroll: this.props.enableInfiniteScroll,
        bodyHeight: this.props.bodyHeight,
        infiniteScrollLoadTreshold: this.props.infiniteScrollLoadTreshold,
        useFixedLayout: this.props.useFixedLayout,
        isSubGriddle: this.props.isSubGriddle,
        enableSort: this.props.enableSort,
        onRowClick: this.props.onRowClick,
        noDataMessage: this.props.noDataMessage,
        enableToggleCustom: this.props.enableToggleCustom,
        results: this.props.results // Used if all results are already loaded.
        , settingsIconComponent: settingsIcon,
        nextText: this.props.nextText,
        previousText: this.props.previousText,
        maxRowsText: this.props.maxRowsText
      })
    );
  }
});

module.exports = Table;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./IconLink.jsx":16}],25:[function(_dereq_,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var styles = {
    container: {
        cursor: "pointer",
        postion: "fixed"
    },

    tooltipContentArrow: {
        position: "fixed",
        width: "0",
        height: "0",
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "5px solid black"
    },

    tooltipContent: {
        zIndex: "2000",
        border: "2px",
        borderStyle: "solid",
        borderColor: "#AEB8B8",
        padding: "10px",
        /*position: "fixed",*/
        marginTop: "25px",
        position: "absolute",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "normal",
        background: "#5596E6",
        textAlign: "center"
    }
};

var Tooltip = React.createClass({
    displayName: 'Tooltip',

    propTypes: {
        style: RPT.object,
        theme: RPT.object.isRequired
    },

    getInitialState: function getInitialState() {
        return { hover: false };
    },

    mouseOver: function mouseOver(event) {
        this.setState({ hover: true });
        /*this.setState({posX: event.clientX+"px"});
        this.setState({posY: event.clientY+"px"});*/
    },

    mouseOut: function mouseOut() {
        this.setState({ hover: false });
    },

    getDefaultProps: function getDefaultProps() {
        return {
            tTipDisplay: "none",
            tTipHoverDisplay: "inherit",
            tooltipText: "MyTooltip"
        };
    },

    componentWillMount: function componentWillMount() {
        // TODO: fix this, props is static
        //this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.text||"#5a5a5a";
    },

    render: function render() {

        var tooltipText = this.props.tooltipText;
        var tooltipContent = Object.assign({}, styles.tooltipContent, {
            display: this.props.tTipDisplay
        }, this.props.style, this.props.theme);

        if (this.state.hover) {
            tooltipContent = Object.assign({}, styles.tooltipContent, {
                display: this.props.tTipHoverDisplay,
                left: this.state.posX,
                top: this.state.posY
            }, this.props.style, this.props.theme);
        };

        return React.createElement(
            'span',
            { style: styles.container },
            React.createElement(
                'span',
                { onMouseEnter: this.mouseOver, onMouseLeave: this.mouseOut },
                this.props.children
            ),
            React.createElement(
                'span',
                { style: tooltipContent },
                ' ',
                this.props.tooltipText
            )
        );
    }
});

module.exports = Tooltip;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],26:[function(_dereq_,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var Const = _dereq_('../../Dashboard/util/Const');

var Actions = Reflux.createActions(['connect', 'disconnect', 'pause', 'resume']);

var UserStore = Reflux.createStore({

  Actions: Actions,

  device: "26877",

  state: Const.DISCONNECTED,

  mockUser: [{
    "id": 0,
    "name": "Jon Doe",
    "descrip": "Jon from above",
    "mail": "jondoe@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg"
  }, {
    "id": 1,
    "name": "Sally Bond",
    "descrip": "from 3 Etage",
    "mail": "sallymally@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
  }, {
    "id": 2,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
  }, {
    "id": 2,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
  }, {
    "id": 3,
    "name": "Ben Looper",
    "descrip": "Ben from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
  }, {
    "id": 4,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
  }, {
    "id": 5,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
  }, {
    "id": 6,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
  }, {
    "id": 7,
    "name": "Molly Sue Schmidt",
    "descrip": "with blond hairs",
    "mail": "MollyKane@IoT.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mtnmissy/128.jpg"
  }],

  init: function init() {
    this.listenTo(Actions.connect, this.onConnect);
    this.listenTo(Actions.disconnect, this.onDisconnect);
    this.listenTo(Actions.pause, this.onPause);
    this.listenTo(Actions.resume, this.onResume);

    this.trigger({ state: Const.DISCONNECTED });
  },

  onConnect: function onConnect(payload) {
    if (this.state == Const.DISCONNECTED) {
      this.state = Const.CONNECTED;
      this.changeState();
    }
    this.trigger({ users: this.mockUser });
  },

  changeState: function changeState() {
    this.trigger({ state: this.state });
  },

  onDisconnect: function onDisconnect(payload) {
    this.trigger({ state: Const.DISCONNECTED });
  },

  onPause: function onPause(payload) {
    this.trigger({ state: Const.PAUSED });
  },

  onResume: function onResume(payload) {
    this.trigger({ state: Const.CONNECTED });
  }
});

module.exports = UserStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":10}]},{},[6])
(6)
});