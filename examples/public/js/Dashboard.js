!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Dashboard=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = require('../../common/components/InputField.jsx');
var DialogComponent = require('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = require('../../common/components/Section.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
/*var Messages = require('../../Dashboard/nls/Messages');*/
var IconLink = require('../../common/components/IconLink.jsx');
var Table = require('../../common/components/Table.jsx');
var UserStore = require('../../common/stores/UserStore');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

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

    onRowClick: function onRowClick(row) {
        window.alert("Member details" + this.props.rowData.name);
    },

    render: function render() {

        var fakeData = this.props.fakeData || [];
        var metaData = this.props.metaData || [];

        return React.createElement(
            Dialog,
            { title: 'User ID: Marcia Smith', theme: this.props.theme },
            React.createElement(
                DialogTab,
                { id: 'membertable', theme: this.props.theme, label: 'Member list' },
                React.createElement(
                    'div',
                    { style: styles },
                    React.createElement(Table, {

                        resultsPerPage: this.state.responsiveResultsPerPage,

                        settingsText: "",
                        onRowClick: this.onRowClick,
                        enableInfiniteScroll: false,
                        bodyHeight: this.state.height,
                        results: this.state.data,
                        columnMetadata: metaData,
                        showFilter: false,
                        showSettings: false,
                        maxRowsText: "",
                        isSubGriddle: false,
                        useFixedLayout: true,
                        columns: this.state.columns
                    })
                )
            ),
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
},{"../../Dashboard/dashboard/Actions.jsx":41,"../../common/components/ButtonText.jsx":61,"../../common/components/Dialog.jsx":74,"../../common/components/IconLink.jsx":77,"../../common/components/Image.jsx":78,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Section.jsx":87,"../../common/components/Select.jsx":88,"../../common/components/Table.jsx":92,"../../common/stores/UserStore":102}],2:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;

var InputField = require('../../common/components/InputField.jsx');
var DashboardDialog = require('../../common/components/Dialog.jsx');
var Dialog = DashboardDialog.Dialog;
var DialogTab = DashboardDialog.DialogTab;
var DialogButtons = DashboardDialog.DialogButtons;
var Section = require('../../common/components/Section.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
var IconLink = require('../../common/components/IconLink.jsx');
var Icon = require('../../common/components/Icon.jsx');
/*var Messages = require('../../Dashboard/nls/Messages');*/
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var Tooltip = require('../../common/components/Tooltip.jsx');

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
  }
};

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
      noneExpireDate: this.props.noneExpireDate ? this.props.noneExpireDate : null
    };
  },

  onaddPermChange: function onaddPermChange() {},

  onRoleChange: function onRoleChange() {},

  onGroupChange: function onGroupChange() {},

  componentDidMount: function componentDidMount() {},

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

  render: function render() {

    if (this.props.visible) {
      return React.createElement(
        Dialog,
        { title: 'Add member(s)', theme: this.props.theme, nls: this.props.nls },
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
                React.createElement(InputField, { onChange: this.onClientIDChanged, placeholder: 'sally@acme.com', initialValue: this.state.clientID }),
                React.createElement(ButtonText, { text: 'Add Another', onClick: this.addAnother })
              ),
              React.createElement(
                'div',
                { style: styles.sectionLine },
                ' Add multiple members at a time by adding multiple email adresses or importing from .cav or .xls file.'
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'div',
                  { style: styles.textImport },
                  'Import'
                ),
                React.createElement(ButtonText, { style: styles.btnImport, text: 'Browse files', onClick: this.addAnother })
              ),
              React.createElement(
                'div',
                null,
                'TO DO - To be added (choosen emails list with delete symbol)'
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
},{"../../Dashboard/dashboard/Actions.jsx":41,"../../common/components/ButtonText.jsx":61,"../../common/components/Dialog.jsx":74,"../../common/components/Icon.jsx":76,"../../common/components/IconLink.jsx":77,"../../common/components/Image.jsx":78,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Section.jsx":87,"../../common/components/Select.jsx":88,"../../common/components/Tooltip.jsx":95}],3:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = require('../../common/components/InputField.jsx');
var DialogComponent = require('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = require('../../common/components/Section.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
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
},{"../../Dashboard/dashboard/Actions.jsx":41,"../../common/components/ButtonText.jsx":61,"../../common/components/Dialog.jsx":74,"../../common/components/Image.jsx":78,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Section.jsx":87}],4:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = require('../../common/components/InputField.jsx');
var DialogComponent = require('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = require('../../common/components/Section.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
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
},{"../../Dashboard/dashboard/Actions.jsx":41,"../../common/components/ButtonText.jsx":61,"../../common/components/Dialog.jsx":74,"../../common/components/Image.jsx":78,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Section.jsx":87}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var InputField = require('../../common/components/InputField.jsx');
var DialogComponent = require('../../common/components/Dialog.jsx');
var Dialog = DialogComponent.Dialog;
var DialogTab = DialogComponent.DialogTab;
var DialogButtons = DialogComponent.DialogButtons;
var Section = require('../../common/components/Section.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
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
},{"../../Dashboard/dashboard/Actions.jsx":41,"../../common/components/ButtonText.jsx":61,"../../common/components/Dialog.jsx":74,"../../common/components/Image.jsx":78,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Section.jsx":87}],6:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CardAction = require('../../common/components/CardAction.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardTitle = require('../../common/components/CardTitle.jsx');
var CardDescription = require('../../common/components/CardDescription.jsx');
var Actions = require('../dashboard/Actions.jsx');
var AAAStore = require('../../common/stores/AAAStore');
var RPT = React.PropTypes;

var styles = {
    container: {
        paddingTop: "20px",
        textAlign: "center"
    }
};

var AAAUserDetails = React.createClass({
    displayName: 'AAAUserDetails',

    componentDidMount: function componentDidMount() {
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

    getInitialState: function getInitialState() {
        return { data: [] };
    },

    onUpdate: function onUpdate(payload) {
        console.log("PAYLOAD", payload);
        if (payload.clientData) {
            this.setState({ data: payload.clientData });
        }
    },

    render: function render() {
        var self = this;
        var ssoData = this.state.data;

        var action = function action() {
            Actions.showDialogAAAUserDetails({
                id: self.props.wrapper.id,
                action: 'initial'
            });
        };

        return React.createElement(
            'div',
            { style: styles.container },
            React.createElement(
                CardDescription,
                { theme: this.props.theme },
                'User list and detail dialog'
            ),
            React.createElement(
                CardSection,
                { theme: this.props.theme },
                React.createElement(
                    CardAction,
                    { icon: this.props.actionIcon, action: action },
                    this.props.actionText
                )
            )
        );
    }
});

module.exports = AAAUserDetails;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../../common/components/CardDescription.jsx":64,"../../common/components/CardSection.jsx":68,"../../common/components/CardTitle.jsx":70,"../../common/stores/AAAStore":96,"../dashboard/Actions.jsx":41}],7:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
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
  displayName: 'AddMember',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    type: RPT.string.isRequired,
    wrapper: RPT.object
  },

  render: function render() {
    var myVar = setInterval(getAddMemberData, 300);
    var self = this;

    var getAddMemberData = function getAddMemberData() {
      var url = "/sso";
      $.getJSON(url, function (addMemberData) {
        console.log(addMemberData);
      });
    };

    var action = function action() {
      Actions.showDialogAddMember({
        id: self.props.wrapper.id,
        action: 'initial'
      });
    };

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        CardDescription,
        { theme: this.props.theme },
        '                              Add Member Dialog'
      ),
      React.createElement('div', null),
      React.createElement(
        CardSection,
        { theme: this.props.theme },
        React.createElement(
          CardAction,
          { icon: this.props.actionIcon, action: action },
          this.props.actionText
        )
      )
    );
  }
});

module.exports = AddMember;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../../common/components/CardDescription.jsx":64,"../../common/components/CardSection.jsx":68,"../dashboard/Actions.jsx":41}],8:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var BarChartComponent = require('../../common/components/BarChart.jsx');

/**
* Static chart
*/
var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var BarChart = React.createClass({
  displayName: 'BarChart',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    title: RPT.string,
    horizontal: RPT.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      "plots": []
    };
  },

  getInitialState: function getInitialState() {
    return {
      data: [],
      names: {},
      unit: "",
      precision: 0
    };
  },

  componentDidMount: function componentDidMount() {
    IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  onUpdate: function onUpdate(payload) {
    var found = false;
    var data = this.state.data;
    var names = Object.assign({}, this.state.names);
    var unit = null;
    var precision = 0;

    // get first unit
    for (var i in this.props.plots) {
      if (this.props.plots[i].unit) {
        unit = this.props.plots[i].unit;
      }
      if (this.props.plots[i].precision) {
        precision = this.props.plots[i].precision;
      }
    }

    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

          var obj = Object.assign({}, payload.deviceEvent.data);
          var propertyPieces = plot.property.split(".");
          for (var i in propertyPieces) {
            var piece = propertyPieces[i];
            obj = obj[piece];
            if (obj === undefined) {
              break;
            }
          }
          //console.log(obj);

          if (obj !== undefined) {
            var newData = [plot.id, obj];
            var replaced = false;
            for (var t in data) {
              if (data[t][0] == plot.id) {
                data.splice(t, 1, newData);
                replaced = true;
                break;
              }
            }
            if (!replaced) {
              data.push(newData);
            }
            names[plot.id] = plot.label;
            found = true;
          }
        }
      }
    }
    if (found) {
      this.setState({
        data: data,
        names: names,
        unit: unit,
        precision: precision
      });
    }
  },

  render: function render() {
    // line
    // spline
    // step
    // area
    // area-spline
    // area-step
    // bar
    // scatter
    // pie
    // donut
    // gauge

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement(
      'div',
      { style: style },
      React.createElement(BarChartComponent, {
        theme: this.props.theme,
        data: this.state.data,
        names: this.state.names,
        title: this.props.title,
        horizontal: this.props.horizontal,
        unit: this.state.unit,
        precision: this.state.precision,
        height: this.props.wrapper.realHeight,
        width: this.props.wrapper.realWidth
      })
    );
  }
});

module.exports = BarChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/BarChart.jsx":59,"../../common/stores/IoTFDeviceStore":99}],9:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CardAction = require('../../common/components/CardAction.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardTitle = require('../../common/components/CardTitle.jsx');
var CardDescription = require('../../common/components/CardDescription.jsx');
var Actions = require('../dashboard/Actions.jsx');
var AAAStore = require('../../common/stores/AAAStore');
var RPT = React.PropTypes;

var styles = {
    container: {
        paddingTop: "20px",
        textAlign: "center"
    }
};

var ConfigSSO = React.createClass({
    displayName: 'ConfigSSO',

    componentDidMount: function componentDidMount() {
        AAAStore.listen(this.onUpdate);
        AAAStore.Actions.connect();
    },

    propTypes: {
        theme: RPT.object.isRequired,
        style: RPT.object,
        nls: RPT.object,
        type: RPT.string.isRequired,
        wrapper: RPT.object
    },

    getInitialState: function getInitialState() {
        return { data: [] };
    },

    onUpdate: function onUpdate(payload) {
        console.log("PAYLOAD", payload);
        if (payload.clientData) {
            this.setState({ data: payload.clientData });
        }
    },

    render: function render() {
        var self = this;
        var ssoData = this.state.data;

        var action = function action() {
            Actions.showDialogConfigSSO({
                id: self.props.wrapper.id,
                action: 'initial'
            });
        };

        return React.createElement(
            'div',
            null,
            React.createElement(
                CardSection,
                { theme: this.props.theme, first: true },
                React.createElement(
                    'div',
                    null,
                    'ID: ',
                    ssoData.clientID
                ),
                React.createElement(
                    'div',
                    null,
                    'Secret: ',
                    ssoData.clientSecret
                ),
                React.createElement(
                    'div',
                    null,
                    'Identifier: ',
                    ssoData.issuerIdentifier
                ),
                '                  '
            ),
            React.createElement(
                CardSection,
                { theme: this.props.theme },
                React.createElement(
                    CardAction,
                    { icon: this.props.actionIcon, action: action },
                    this.props.actionText
                )
            )
        );
    }
});

module.exports = ConfigSSO;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../../common/components/CardDescription.jsx":64,"../../common/components/CardSection.jsx":68,"../../common/components/CardTitle.jsx":70,"../../common/stores/AAAStore":96,"../dashboard/Actions.jsx":41}],10:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var ReactGridLayout = (typeof window !== "undefined" ? window['ReactGridLayout'] : typeof global !== "undefined" ? global['ReactGridLayout'] : null);
var Actions = require('../dashboard/Actions.jsx');

/**
* Container to organize cards
*/

var styles = {
	container: {
		backgroundColor: "gray",
		height: "100%"
	},
	component: {
		fontSize: "14px",
		fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		overflow: "visible"
	},
	inner: {
		position: "relative",
		top: "-30px",
		left: "-30px"
	}
};

var Container = React.createClass({
	displayName: 'Container',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},

	componentDidMount: function componentDidMount() {},

	onGridMounted: function onGridMounted(grid) {
		this.grid = grid;
	},

	onLayoutChange: function onLayoutChange(components, pack) {
		// find max height
		var maxHeight = 0;
		var maxWidth = 0;

		for (var i in components) {
			var item = components[i];
			maxHeight = Math.max(maxHeight, item.y + item.h);
			maxWidth = Math.max(maxWidth, item.x + item.w);
		}
		console.log("MaxHeight: " + maxHeight);

		if (pack) {
			this.requestCardResize(maxHeight + 1);
		} else {
			// only enlarge to avoid flickering
			if (this.props.wrapper.height - 1 < maxHeight) {
				this.requestCardResize(maxHeight + 1);
			}
		}
	},

	requestCardResize: function requestCardResize(height) {
		if (this.resizeDelay) {
			clearTimeout(this.resizeDelay);
		}
		var self = this;
		this.resizeDelay = setTimeout(function () {
			Actions.changeCardSize(self.props.wrapper.id, {
				height: height
			});
		}, 1);
	},

	onLayoutChangeDynamically: function onLayoutChangeDynamically(layout, oldL, l, placeholder, e) {
		// var allCards = [];
		// allCards.concat(layout);
		// allCards.push(placeholder);

		// this.onLayoutChange(allCards);
	},

	onEnlargeCard: function onEnlargeCard() {
		Actions.changeCardSize(this.props.wrapper.id, {
			height: this.props.wrapper.height + 2
		});
	},

	onPackCard: function onPackCard(layout) {
		this.onLayoutChange(layout, true);
	},

	handleMouseOver: function handleMouseOver(e) {
		console.log("over");
	},

	handleMouseOut: function handleMouseOut(e) {
		console.log("out");
	},

	getLayoutForElement: function getLayoutForElement(id) {
		var layout = this.props.layouts[this.props.wrapper.layout];
		for (var i in layout) {
			var item = layout[i];
			if (item.i == id) {
				return item;
			}
		}
	},

	render: function render() {
		var self = this;
		var inner = Object.assign({}, styles.inner, { height: this.props.wrapper.realHeight + 30 + "px", width: this.props.wrapper.realWidth + 60 + "px" });
		var container = Object.assign({}, styles.container, { height: this.props.wrapper.realHeight + "px", width: this.props.wrapper.realWidth + "px" });

		return React.createElement(
			'div',
			{ style: container },
			React.createElement(
				'div',
				{ style: inner,
					onMouseOver: this.handleMouseOver,
					onMouseOut: this.handleMouseOut
				},
				React.createElement(
					ReactGridLayout,
					{
						ref: this.onGridMounted,
						height: this.props.wrapper.realHeight + 30,
						width: this.props.wrapper.realWidth + 60,
						cols: this.props.wrapper.width,
						className: 'layout',
						rowHeight: 120,
						margin: [30, 30],
						layout: this.props.layouts.lg,
						verticalCompact: false,
						autoSize: true,
						isDraggable: true,
						isResizable: true,
						onDrag: this.onLayoutChangeDynamically,
						onResize: this.onLayoutChangeDynamically,
						onDragStart: this.onEnlargeCard,
						onResizeStart: this.onEnlargeCard,
						onDragStop: this.onPackCard,
						onResizeStop: this.onPackCard
					},
					this.props.components.map(function (result) {
						var layout = self.getLayoutForElement(result.id);
						//var theme = self.mergeSchemeIntoTheme(self.props.theme, result.parameters.scheme);
						return React.createElement(
							'div',
							{ key: result.id, style: styles.item },
							React.createElement(ReactWrapper, { theme: self.props.theme, nls: self.props.nls, id: result.id, inbound: result.inbound, outbound: result.outbound, parameters: result.parameters, type: result.name, layout: self.props.wrapper.layout, width: layout.w, height: layout.h })
						);
					})
				)
			)
		);
	}
});

module.exports = Container;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dashboard/Actions.jsx":41}],11:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var PushButtonCard = require('./PushButtonCard.jsx');
var Actions = require('../dashboard/Actions.jsx');

//Link to documentation:
//https://github.ibm.com/IoT/dashboard-component/wiki/Dashboard-link-card
//

/**
* Show an icon and a text on the card. Links to another dashboard on click.
*/
var DashboardLink = React.createClass({
  displayName: 'DashboardLink',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    subtext: RPT.string,
    target: RPT.string,
    icon: RPT.string,
    wrapper: RPT.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      text: "",
      icon: "apps",
      subtext: "",
      target: null
    };
  },

  onClick: function onClick() {
    if (this.props.target) {
      Actions.loadDashboard(this.props.target);
      Actions.getComponents();
    }
  },

  render: function render() {

    return React.createElement(PushButtonCard, {
      icon: this.props.icon,
      subtext: this.props.subtext,
      action: this.onClick,
      wrapper: this.props.wrapper,
      theme: this.props.theme
    });
  }
});

module.exports = DashboardLink;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dashboard/Actions.jsx":41,"./PushButtonCard.jsx":21}],12:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Map = require('../../common/components/Map.jsx');
var MapPin = require('../../common/components/MapPin.jsx');

/**
* Map to show device location
*/
var styles = {
	container: {
		height: "100%",
		width: "100%"
	}
};

var DeviceMap = React.createClass({
	displayName: 'DeviceMap',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object,
		showMyLocation: RPT.bool,
		demo: RPT.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			showMyLocation: true
		};
	},

	getInitialState: function getInitialState() {
		return {
			model: []
		};
	},

	componentDidMount: function componentDidMount() {
		if (this.props.demo) {
			var self = this;
			var createDemoData = function createDemoData() {
				var model = [];
				for (var i = 0; i < 5; i++) {
					var item = {
						id: i,
						lng: Math.random() * 0.001 - 0.0005 + 11.575642,
						lat: Math.random() * 0.001 - 0.0005 + 48.137294
					};
					model.push(item);
				}
				self.setState({ model: model });
			};
			setInterval(function () {
				createDemoData();
			}, 5000);
			createDemoData();
		}
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
		return React.createElement(
			Map,
			{ width: this.props.wrapper.realWidth, height: this.props.wrapper.realHeight, showMyLocation: this.props.showMyLocation },
			this.state.model.map(function (pin) {
				return React.createElement(MapPin, { lng: pin.lng, lat: pin.lat, id: pin.id, payload: pin.payload, icon: pin.icon });
			})
		);
	}
});

module.exports = DeviceMap;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Map.jsx":82,"../../common/components/MapPin.jsx":83}],13:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var IoTFUsageStore = require('../../common/stores/IoTFUsageStore.js');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var DonutChartComponent = require('../../common/components/DonutChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');
var Utils = require('../dashboard/DashboardUtils');

var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "100%",
		position: "relative"
	},
	legend: {
		height: "100%",
		position: "absolute",
		top: "0px",
		right: "0px",
		padding: "20px 10px",
		boxSizing: "border-box"
	},
	legendEntry: {
		height: "35px",
		width: "200px",
		float: "left",
		position: "relative"
	},
	legendDot: {
		height: "22px",
		minWidth: "22px",
		borderRadius: "17px",
		backgroundColor: "blue",
		display: "inline-block",
		color: "white",
		lineHeight: "22px",
		textAlign: "center",
		padding: "3px"
	},
	legendLabel: {
		display: "inline-block",
		position: "absolute",
		left: "50px",
		lineHeight: "22px",
		fontSize: "16px"
	},
	waiting: {
		width: "100%",
		height: "100%",
		position: "relative",
		padding: "20px"
	},
	legendTitle: {
		fontSize: "16px",
		letterSpacing: "0.5px",
		textTransform: "uppercase",
		marginBottom: "10px"
	}
};

var DeviceTypes = React.createClass({
	displayName: 'DeviceTypes',

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object
	},

	getInitialState: function getInitialState() {
		return {
			data: []
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFUsageStore.listen(this.onUpdate);
		IoTFUsageStore.Actions.fetchDeviceTypes();
	},

	onUpdate: function onUpdate(payload) {
		//console.debug("DeviceTypes::onUpdate(" + JSON.stringify(payload) + ")");

		var model = {};
		if (payload.deviceTypes) {
			model.data = payload.deviceTypes;
		}
		if (Object.keys(model).length > 0) {
			this.setState(model);
		}
	},

	onLegendClick: function onLegendClick(id) {
		this.setState({
			click: id,
			focus: undefined,
			revert: undefined
		});
	},

	onLegendFocus: function onLegendFocus(id) {
		this.setState({
			focus: id,
			click: undefined,
			revert: undefined
		});
	},

	onLegendRevert: function onLegendRevert(id) {
		this.setState({
			revert: id,
			click: undefined,
			focus: undefined
		});
	},

	render: function render() {
		var self = this;
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		if (this.state.data) {
			if (this.state.data.length > 0) {
				var colors = this.props.theme.palette;
				var names = {};
				var data = [];

				var count = 0;
				for (var i in this.state.data) {
					var item = this.state.data[i];
					data.push([item.deviceType, item.count]);
					count += item.count;
				}

				var title = this.props.nls.resolve("DeviceTypesTitle");
				var colorCounter = 0;

				styles.legendLabel.color = this.props.theme.minor;

				return React.createElement(
					'div',
					{ style: style },
					React.createElement(DonutChartComponent, {
						theme: this.props.theme,
						data: data,
						names: names,
						title: title,
						height: this.props.wrapper.realHeight,
						width: this.props.wrapper.realHeight,
						focus: this.state.focus,
						revert: !this.state.focus,
						click: this.state.click
					}),
					React.createElement(
						'div',
						{ style: Object.assign({}, styles.legend, { width: this.props.wrapper.realWidth - this.props.wrapper.realHeight + "px" }) },
						React.createElement(
							'div',
							{ style: Object.assign({}, styles.legendTitle, { color: this.props.theme.minor }) },
							this.props.nls.resolve("DeviceTypeLegendTitle")
						),
						this.state.data.map(function (entry) {
							return React.createElement(
								'div',
								{ key: entry.deviceType, style: styles.legendEntry, onClick: function onClick() {
										self.onLegendClick(entry.deviceType);
									}, onMouseOver: function onMouseOver() {
										self.onLegendFocus(entry.deviceType);
									}, onMouseOut: function onMouseOut() {
										self.onLegendRevert(entry.deviceType);
									} },
								React.createElement(
									'div',
									{ style: Object.assign({}, styles.legendDot, { backgroundColor: colors[colorCounter++ % (colors.length - 1)] }) },
									entry.count
								),
								React.createElement(
									'div',
									{ style: styles.legendLabel },
									entry.deviceType
								)
							);
						})
					)
				);
			} else {
				return React.createElement('div', { style: styles.waiting });
			}
		} else {
			return React.createElement(
				'div',
				{ style: styles.waiting },
				'Loading...'
			);
		}
	}
});

module.exports = DeviceTypes;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardDatapoint.jsx":63,"../../common/components/CardFooter.jsx":65,"../../common/components/CardFooterDatapoint.jsx":66,"../../common/components/CardSection.jsx":68,"../../common/components/CardTable.jsx":69,"../../common/components/DonutChart.jsx":75,"../../common/stores/IoTFUsageStore.js":100,"../dashboard/DashboardUtils":48}],14:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var DonutChartComponent = require('../../common/components/DonutChart.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var CardTable = require('../../common/components/CardTable.jsx');
var Utils = require('../dashboard/DashboardUtils');

var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "100%",
		position: "relative"
	},
	legend: {
		height: "100%",
		position: "absolute",
		top: "0px",
		right: "0px",
		padding: "20px 10px",
		boxSizing: "border-box"
	},
	legendEntry: {
		height: "35px",
		width: "200px",
		float: "left",
		position: "relative"
	},
	legendDot: {
		height: "22px",
		minWidth: "22px",
		borderRadius: "17px",
		backgroundColor: "blue",
		display: "inline-block",
		color: "white",
		lineHeight: "22px",
		textAlign: "center",
		padding: "3px"
	},
	legendLabel: {
		display: "inline-block",
		position: "absolute",
		left: "50px",
		lineHeight: "22px",
		fontSize: "16px"
	},
	waiting: {
		width: "100%",
		height: "100%",
		position: "relative",
		padding: "20px"
	},
	legendTitle: {
		fontSize: "16px",
		letterSpacing: "0.5px",
		textTransform: "uppercase",
		marginBottom: "10px"
	}
};

var DonutChart = React.createClass({
	displayName: 'DonutChart',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object,
		demo: RPT.bool,
		plots: RPT.array,
		type: RPT.string,
		title: RPT.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			"plots": []
		};
	},

	getInitialState: function getInitialState() {
		return {
			data: [],
			names: {}
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFDeviceStore.listen(this.onUpdate);
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot) {
				IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
			}
		}
	},

	onUpdate: function onUpdate(payload) {
		var found = false;
		var data = this.state.data;
		var names = Object.assign({}, this.state.names);

		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot) {
				if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

					var obj = Object.assign({}, payload.deviceEvent.data);
					var propertyPieces = plot.property.split(".");
					for (var i in propertyPieces) {
						var piece = propertyPieces[i];
						obj = obj[piece];
						if (obj === undefined) {
							break;
						}
					}
					//console.log(obj);

					if (obj !== undefined) {
						var newData = [plot.id, obj];
						var replaced = false;
						for (var t in data) {
							if (data[t][0] == plot.id) {
								data.splice(t, 1, newData);
								replaced = true;
								break;
							}
						}
						if (!replaced) {
							data.push(newData);
						}
						names[plot.id] = plot.label;
						found = true;
					}
				}
			}
		}
		if (found) {
			this.setState({
				data: data,
				names: names
			});
		}
	},

	onLegendClick: function onLegendClick(id) {
		this.setState({
			click: id,
			focus: undefined,
			revert: undefined
		});
	},

	onLegendFocus: function onLegendFocus(id) {
		this.setState({
			focus: id,
			click: undefined,
			revert: undefined
		});
	},

	onLegendRevert: function onLegendRevert(id) {
		this.setState({
			revert: id,
			click: undefined,
			focus: undefined
		});
	},

	render: function render() {
		var self = this;
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		if (this.state.data) {
			if (this.state.data.length > 0) {
				var colors = this.props.theme.palette;
				var names = {};
				var data = [];

				var count = 0;
				for (var i in this.state.data) {
					var item = this.state.data[i];
					data.push([item.deviceType, item.count]);
					count += item.count;
				}

				var title = this.props.nls.resolve("DeviceTypesTitle");
				var colorCounter = 0;

				styles.legendLabel.color = this.props.theme.minor;

				return React.createElement(
					'div',
					{ style: style },
					React.createElement(DonutChartComponent, {
						theme: this.props.theme,
						data: this.state.data,
						names: this.state.names,
						type: this.props.type,
						title: this.props.title,
						horizontal: this.props.horizontal,
						height: this.props.wrapper.realHeight,
						width: this.props.wrapper.realHeight,
						focus: this.state.focus,
						revert: !this.state.focus,
						click: this.state.click
					}),
					React.createElement(
						'div',
						{ style: Object.assign({}, styles.legend, { width: this.props.wrapper.realWidth - this.props.wrapper.realHeight + "px" }) },
						this.props.plots.map(function (entry) {
							return React.createElement(
								'div',
								{ key: entry.id, style: styles.legendEntry, onClick: function onClick() {
										self.onLegendClick(entry.id);
									}, onMouseOver: function onMouseOver() {
										self.onLegendFocus(entry.id);
									}, onMouseOut: function onMouseOut() {
										self.onLegendRevert(entry.id);
									} },
								React.createElement(
									'div',
									{ style: Object.assign({}, styles.legendDot, { backgroundColor: colors[colorCounter++ % (colors.length - 1)] }) },
									""
								),
								React.createElement(
									'div',
									{ style: styles.legendLabel },
									entry.label
								)
							);
						})
					)
				);
			} else {
				return React.createElement('div', { style: styles.waiting });
			}
		} else {
			return React.createElement(
				'div',
				{ style: styles.waiting },
				'Loading...'
			);
		}
	}
});

module.exports = DonutChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardDatapoint.jsx":63,"../../common/components/CardFooter.jsx":65,"../../common/components/CardFooterDatapoint.jsx":66,"../../common/components/CardSection.jsx":68,"../../common/components/CardTable.jsx":69,"../../common/components/DonutChart.jsx":75,"../../common/stores/IoTFDeviceStore":99,"../dashboard/DashboardUtils":48}],15:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
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
	displayName: 'EmptyComponent',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},

	render: function render() {
		var self = this;
		var action = function action() {
			Actions.showDialog({
				id: self.props.wrapper.id,
				action: 'selectCard'
			});
		};
		return React.createElement(
			'div',
			{ style: styles.container },
			React.createElement(
				CardAction,
				{ icon: 'settings', size: '70', action: action },
				this.props.actionText
			)
		);
	}
});

module.exports = EmptyComponent;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../dashboard/Actions.jsx":41}],16:[function(require,module,exports){
(function (global){
'use strict';

var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null);
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');

/**
* Flexible gauge.
*/
var styles = {
	container: {
		height: "100%",
		width: "100%"
	}
};

var Gauge = React.createClass({
	displayName: 'Gauge',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object,
		demo: RPT.bool,
		minDegree: RPT.number,
		maxDegree: RPT.number,
		plots: RPT.array,
		major: RPT.string,
		needle: RPT.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			plots: [],
			minDegree: 45,
			maxDegree: 315,
			needle: false
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFDeviceStore.listen(this.onUpdate);
		if (this.props.device) {
			IoTFDeviceStore.Actions.startDeviceWatch(this.props.device);
		}

		// create for the first time
		this.createSVG();

		if (this.props.demo) {
			// var self = this;
			// setInterval(function() {
			//   self.updateSVG(Math.round(Math.random()*(self.props.max - self.props.min) + self.props.min))
			// }, 1000);
		}
	},

	getPlot: function getPlot() {
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot.id == this.props.major) {
				return plot;
			}
		}
		// fallback
		if (this.props.plots.length > 0) {
			return this.props.plots[0];
		} else {
			return null;
		}
	},

	onUpdate: function onUpdate(payload) {
		//console.log("onUpdate", payload.deviceEvent.deviceId, payload.deviceEvent.eventType, this.props);
		if (this.props.plots && this.props.plots.length > 0) {
			var plot = this.getPlot();

			if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

				var obj = payload.deviceEvent.data;
				var propertyPieces = plot.property.split(".");

				//console.log(propertyPieces);
				for (var i in propertyPieces) {
					var piece = propertyPieces[i];
					obj = obj[piece];
					if (obj === undefined) {
						break;
					}
				}
				//console.log(obj);

				if (obj !== undefined) {
					this.value = obj;
					this.updateSVG(obj);
				}
			}
		}
	},

	createSVG: function createSVG() {
		this.destroySVG();

		if (this.props.plots && this.props.plots.length > 0) {
			var plot = this.getPlot();

			var dom = ReactDOM.findDOMNode(this);
			var width = dom.offsetWidth;
			var height = dom.offsetHeight;
			this.width = width;
			this.height = height;
			var pi = Math.PI * 2;
			var radius = Math.min(width, height) / 2;
			var startAngle = this.props.minDegree / 360 * pi - pi / 2;
			var endAngle = this.props.maxDegree / 360 * pi - pi / 2;

			var self = this;

			var group = d3.select(dom).append('svg').attr('width', +width).attr('height', +height).attr('viewBox', '0 0 ' + width + ' ' + height).attr('preserveAspectRatio', 'xMinYMin meet').append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			// the scale to show the full range
			var scaleArc = d3.svg.arc().innerRadius(radius * 0.7).outerRadius(radius * 0.9).startAngle(startAngle).endAngle(endAngle);

			var scale = group.append("path").attr("fill", this.props.theme.light).attr("d", scaleArc);

			// the value segment
			this.valueSegment = group.append("path").datum({ endAngle: 0, startAngle: 0 }).attr("fill", this.props.theme.normal);

			// the textual value
			this.label = group.append("svg:text").attr("dy", "0em").attr("text-anchor", "middle").attr("font-size", radius * 0.4 + "px").attr("font-weight", "100").attr("fill", this.props.theme.text);

			// the unit indicator
			if (this.props.unit) {
				var unit = group.append("svg:text").attr("dy", radius * 0.3 + "px").attr("text-anchor", "middle").attr("font-size", radius * 0.15 + "px").attr("font-weight", "100").attr("fill", this.props.theme.text).text(plot.unit);
			}

			var value = this.value ? this.value : 0;
			this.updateSVG(value);
		}
	},

	destroySVG: function destroySVG() {
		var dom = ReactDOM.findDOMNode(this);
		var children = dom.childNodes;
		for (var i in children) {
			var child = children[i];
			if (child.tagName === 'svg') {
				dom.removeChild(child);
				break;
			}
		}
	},

	updateSVG: function updateSVG(value) {
		if (this.props.plots && this.props.plots.length > 0) {
			var plot = this.getPlot();
			var min = plot.min ? plot.min : 0;
			var max = plot.max ? plot.max : 100;

			var width = this.width;
			var height = this.height;

			// handle precision
			if (plot.precision !== undefined) {
				value = value.toFixed(plot.precision);
			}
			var pi = Math.PI * 2;

			var radius = Math.min(width, height) / 2;
			var startAngle = this.props.minDegree / 360 * pi - pi / 2;
			var endAngle = this.props.maxDegree / 360 * pi - pi / 2;
			var val = (value - min) / (max - min);
			val = val * (endAngle - startAngle) + startAngle;
			val = Math.min(val, endAngle);
			val = Math.max(val, startAngle);

			this.label.text(value);

			if (this.props.needle) {
				// show only a simple tick
				var arc = d3.svg.arc().innerRadius(radius * 0.6).outerRadius(radius * 1);

				var arcTween = function arcTween(transition, newAngle) {
					transition.attrTween("d", function (d) {
						if (d) {
							var interpolate = d3.interpolate(d.endAngle, newAngle);
							return function (t) {
								var val = interpolate(t);
								d.endAngle = val;
								d.startAngle = val - 0.05;
								return arc(d);
							};
						}
					});
				};
			} else {
				// show the full segment
				var arc = d3.svg.arc().innerRadius(radius * 0.7).outerRadius(radius * 0.9).startAngle(startAngle);

				var arcTween = function arcTween(transition, newAngle) {
					transition.attrTween("d", function (d) {
						if (d) {
							var interpolate = d3.interpolate(d.endAngle, newAngle);
							return function (t) {
								d.endAngle = interpolate(t);
								return arc(d);
							};
						}
					});
				};
			}

			this.valueSegment.transition().duration(750).call(arcTween, val);
		}
	},

	componentWillUnmount: function componentWillUnmount() {
		this.destroySVG();
	},

	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		this.createSVG();
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
		return React.createElement('div', { style: style });
	}
});

module.exports = Gauge;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/stores/IoTFDeviceStore":99}],17:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

/**
* Simple horizontal line to organize cards
*/

var HorizontalLine = React.createClass({
	displayName: "HorizontalLine",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		type: RPT.string,
		wrapper: RPT.object
	},

	render: function render() {
		var self = this;
		var style = {
			backgroundColor: this.props.theme.normal,
			height: "10px"
		};
		return React.createElement("div", { style: style });
	}
});

module.exports = HorizontalLine;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var Image = require('../../common/components/Image.jsx');

/**
* Card to show a simple image.
*/
var marginTop = 0;
var marginRight = 0;
var marginLeft = 0;
var marginBottom = 0;
var paddingTop = 0;
var cardTitle = 32;

var styles = {
		container: {
				fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
				margin: marginTop + " " + marginRight + "px " + marginBottom + "px ",
				paddingTop: paddingTop + "px",
				height: "100%"
		},
		imgScale: {
				maxWidth: "100%",
				maxHeight: "100%"
		}
};

var ImageCard = React.createClass({
		displayName: 'ImageCard',

		propTypes: {
				theme: RPT.object.isRequired,
				style: RPT.object,
				nls: RPT.object,
				url: RPT.string,
				scaleToFill: RPT.number
		},

		getDefaultProps: function getDefaultProps() {
				return {
						width: null,
						height: null
				};
		},

		getInitialState: function getInitialState() {
				return {
						width: this.props.width,
						height: this.props.height,
						scaleToFill: this.props.scaleToFill
				};
		},

		componentWillMount: function componentWillMount() {},

		componentDidMount: function componentDidMount() {
				var parent = ReactDOM.findDOMNode(this).parentNode;
				styles.container.height = parent.clientHeight - paddingTop - cardTitle - marginBottom + "px";
				this.setState({ didMount: true });
		},

		componentWillReceiveProps: function componentWillReceiveProps(props) {
				var parent = ReactDOM.findDOMNode(this).parentNode;
				this.setState({ scaleToFill: props.scaleToFill });
				styles.container.height = parent.clientHeight - paddingTop - cardTitle - marginBottom + "px";
		},

		componentDidUpdate: function componentDidUpdate() {
				if (this.image) {
						this.imageOnLoad();
				}
		},

		imageOnLoad: function imageOnLoad(e) {

				if (this.state.scaleToFill === "1") {
						this.node = ReactDOM.findDOMNode(this);
						this.image = this.image ? this.image : e.target;
						this.imgHeight = this.imgHeight ? this.imgHeight : this.image.naturalHeight;
						this.imgWidth = this.imgWidth ? this.imgWidth : this.image.naturalWidth;
						this.height = this.node.offsetHeight;
						this.width = this.node.offsetWidth;
						var factor = Math.max(this.height / this.imgHeight, this.width / this.imgWidth);
						if (this.state.width !== Math.ceil(this.imgWidth * factor) + "px" || this.state.height !== Math.ceil(this.imgHeight * factor) + "px") {
								this.setState({ width: Math.ceil(this.imgWidth * factor) + "px" });
								this.setState({ height: Math.ceil(this.imgHeight * factor) + "px" });
						}
				} else {
						this.state.width !== "" ? this.setState({ width: "" }) : "";
						this.state.height !== "" ? this.setState({ height: "" }) : "";
				}
				this.image = this.image ? this.image : e.target;
		},

		render: function render() {
				var imageScale = this.props.scaleToFill === "1" ? {} : styles.imgScale;
				return React.createElement(
						'div',
						{ style: styles.container },
						React.createElement(Image, { theme: this.props.theme, url: this.props.url, style: imageScale, width: this.state.width, height: this.state.height, onLoad: this.imageOnLoad })
				);
		}
});

module.exports = ImageCard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Image.jsx":78}],19:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
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
  displayName: 'Login',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    type: RPT.string.isRequired,
    wrapper: RPT.object
  },

  render: function render() {
    var myVar = setInterval(getLoginData, 300);
    var self = this;

    var getLoginData = function getLoginData() {
      var url = "/sso";
      $.getJSON(url, function (loginData) {
        console.log(loginData);
      });
    };

    var action = function action() {
      Actions.showDialogLogin({
        id: self.props.wrapper.id,
        action: 'initial'
      });
    };

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        CardDescription,
        { theme: this.props.theme },
        'Login for IoTF UI'
      ),
      React.createElement('div', null),
      React.createElement(
        CardSection,
        { theme: this.props.theme },
        React.createElement(
          CardAction,
          { icon: this.props.actionIcon, action: action },
          this.props.actionText
        )
      )
    );
  }
});

module.exports = Login;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../../common/components/CardDescription.jsx":64,"../../common/components/CardSection.jsx":68,"../dashboard/Actions.jsx":41}],20:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var DeviceStore = require('../../common/stores/DeviceStore');

var styles = {
	container: {
		overflow: "scroll",
		height: "100%"
	},
	table: {
		margin: "10px"
	}
};

var PV = React.createClass({
	displayName: 'PV',

	propTypes: {
		min: RPT.string,
		max: RPT.string,
		device: RPT.string,
		property: RPT.string
	},

	getDefaultProps: function getDefaultProps() {
		return {};
	},

	getInitialState: function getInitialState() {
		return {};
	},

	componentDidMount: function componentDidMount() {
		DeviceStore.listen(this.onUpdate);
		DeviceStore.Actions.connect();
	},

	onUpdate: function onUpdate(payload) {
		if (payload.device = "26877") {
			this.setState({ model: payload.model });
		}
	},

	render: function render() {
		var data = "";
		var lines = [];
		if (this.state.model) {
			for (var property in this.state.model) {
				lines.push(React.createElement(
					'tr',
					null,
					React.createElement(
						'td',
						null,
						Messages.resolve(property)
					),
					React.createElement(
						'td',
						null,
						this.state.model[property]
					)
				));
			}
		}
		return React.createElement(
			'div',
			{ style: styles.container },
			React.createElement(
				'table',
				{ style: styles.table },
				React.createElement(
					'tbody',
					null,
					lines.map(function (result) {
						return result;
					})
				)
			)
		);
	}
});

module.exports = PV;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/stores/DeviceStore":97}],21:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Button = require('../../common/components/Button.jsx');
var SimpleText = require('../../common/components/SimpleText.jsx');

/*
 *  Push button card
 *
 */

var paddingTop = "20px";

var styles = {
  container: {
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    textAlign: "center",
    margin: "0 20px 20px",
    paddingTop: paddingTop
  },
  subtext: {}
};

var PushButtonCard = React.createClass({
  displayName: 'PushButtonCard',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    subtext: RPT.string,
    action: RPT.func,
    icon: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      text: "",
      icon: "restore",
      subtext: "",
      action: function action() {
        alert("Not implemented yet");
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      size: 128,
      subtextSize: 14
    };
  },

  componentWillMount: function componentWillMount() {
    this.scaleIcon(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.scaleIcon(props);
  },

  scaleIcon: function scaleIcon(props) {
    var subtextOff = props.subtext ? 10 : 0;
    if (props.wrapper.height == 1 || props.wrapper.width == 1) {
      this.setState({ size: 48 - subtextOff,
        subtextSize: 14 });
      styles.container.paddingTop = "0px";
    } else if (props.wrapper.height == 2 || props.wrapper.width == 2) {
      this.setState({ size: 128 - subtextOff * 3,
        subtextSize: 14 });
      styles.container.paddingTop = paddingTop;
      styles.subtext.fontSize = "14px";
    } else if (props.wrapper.height == 3 || props.wrapper.width == 3) {
      this.setState({ size: 210 - subtextOff * 3,
        subtextSize: 24 });
      styles.container.paddingTop = paddingTop;
      styles.subtext.fontSize = "24px";
    }
  },

  onClick: function onClick() {
    if (this.props.action) {
      this.props.action();
    }
  },

  render: function render() {

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(Button, {
        icon: this.props.icon,
        size: this.state.size,
        onClick: this.onClick,
        theme: this.props.theme
      }),
      React.createElement(
        SimpleText,
        { theme: this.props.theme, fontSize: this.state.subtextSize },
        this.props.subtext
      )
    );
  }
});

module.exports = PushButtonCard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Button.jsx":60,"../../common/components/SimpleText.jsx":89}],22:[function(require,module,exports){
(function (global){
'use strict';

var d3 = (typeof window !== "undefined" ? window['d3'] : typeof global !== "undefined" ? global['d3'] : null);
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var LineChart = require('../../common/components/LineChart.jsx');

/**
* Realtime chart
*/
var styles = {
	container: {
		height: "100%",
		width: "100%",
		color: "black"
	}
};

var RealTimeChart = React.createClass({
	displayName: 'RealTimeChart',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object,
		demo: RPT.bool,
		plots: RPT.array,
		range: RPT.number,
		autoscroll: RPT.bool,
		overview: RPT.bool,
		stacked: RPT.bool,
		steps: RPT.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			plots: [],
			range: 60,
			autoscroll: true,
			overview: true,
			stacked: false,
			steps: false
		};
	},

	getInitialState: function getInitialState() {
		return {
			data: {}
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFDeviceStore.listen(this.onUpdate);
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot) {
				IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
			}
		}

		var self = this;

		// if (this.props.demo) {
		// 	setInterval(function() {
		// 		self.updateGraph([
		// 			(new Date().getTime()),
		// 			Math.round(Math.random()*(100 - (-100)) + -100)
		// 		]);
		// 	}, 1000);
		// }
	},

	onUpdate: function onUpdate(payload) {
		console.debug("RealTimeChart::onUpdate", payload);
		var data = { timestamp: new Date().getTime() };
		var found = false;
		var count = 0;
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot) {
				if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

					var obj = Object.assign({}, payload.deviceEvent.data);
					var propertyPieces = plot.property.split(".");
					for (var i in propertyPieces) {
						var piece = propertyPieces[i];
						obj = obj[piece];
						if (obj === undefined) {
							break;
						}
					}

					if (obj !== undefined) {
						data[plot.id] = obj;
						found = true;
					}
				}
			}
		}
		if (found) {
			console.debug("onUpdate is adding data: ", data);
			this.setState({
				data: data
			});
		}
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
		return React.createElement(
			'div',
			{ style: style, onMouseOver: this.onEnter, onMouseOut: this.onLeave },
			React.createElement(LineChart, {
				theme: this.props.theme,
				data: this.state.data,
				plots: this.props.plots,
				height: this.props.wrapper.realHeight,
				width: this.props.wrapper.realWidth,
				overview: this.props.overview,
				range: this.props.range,
				autoscroll: this.props.autoscroll,
				stacked: this.props.stacked,
				steps: this.props.steps
			})
		);
	}
});

module.exports = RealTimeChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/LineChart.jsx":81,"../../common/stores/IoTFDeviceStore":99}],23:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var PushButtonCard = require('./PushButtonCard.jsx');
var Actions = require('../dashboard/Actions.jsx');

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Router-link
//

/**
* Show an icon and a text on the card. Links to another route of the application outside of the dashboard.
*/
var RouterLink = React.createClass({
  displayName: 'RouterLink',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    subtext: RPT.string,
    target: RPT.string,
    icon: RPT.string,
    wrapper: RPT.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      text: "",
      icon: "dashboard",
      subtext: "",
      target: null
    };
  },

  onClick: function onClick() {
    if (this.props.target) {
      Actions.navigateRoute(this.props.target);
    }
  },

  render: function render() {

    return React.createElement(PushButtonCard, {
      icon: this.props.icon,
      subtext: this.props.subtext,
      action: this.onClick,
      wrapper: this.props.wrapper,
      theme: this.props.theme
    });
  }
});

module.exports = RouterLink;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dashboard/Actions.jsx":41,"./PushButtonCard.jsx":21}],24:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CardAction = require('../../common/components/CardAction.jsx');
var CardSection = require('../../common/components/CardSection.jsx');
var CardTitle = require('../../common/components/CardTitle.jsx');
var CardDescription = require('../../common/components/CardDescription.jsx');
var Actions = require('../dashboard/Actions.jsx');
var SSOSignInStore = require('../../common/stores/SSOSignInStore');
var RPT = React.PropTypes;

var styles = {
    container: {
        paddingTop: "20px",
        textAlign: "center"
    }
};

var SSOSignIn = React.createClass({
    displayName: 'SSOSignIn',

    componentDidMount: function componentDidMount() {
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

    getInitialState: function getInitialState() {
        return { data: [] };
    },

    onUpdate: function onUpdate(payload) {
        console.log("PAYLOAD", payload);
        if (payload.clientData) {
            this.setState({ data: payload.clientData });
        }
    },

    render: function render() {
        var self = this;
        var ssoSignInData = this.state.data;

        var action = function action() {
            Actions.showDialogSSOSignIn({
                id: self.props.wrapper.id,
                action: 'initial'
            });
        };

        return React.createElement(
            'div',
            { style: styles.container },
            React.createElement(
                CardDescription,
                { theme: this.props.theme },
                'SSO Login in ACME Style'
            ),
            React.createElement(
                CardSection,
                { theme: this.props.theme },
                React.createElement(
                    CardAction,
                    { icon: this.props.actionIcon, action: action },
                    this.props.actionText
                )
            )
        );
    }
});

module.exports = SSOSignIn;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../../common/components/CardDescription.jsx":64,"../../common/components/CardSection.jsx":68,"../../common/components/CardTitle.jsx":70,"../../common/stores/SSOSignInStore":101,"../dashboard/Actions.jsx":41}],25:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var DeviceStore = require('../../common/stores/DeviceStore');
var CardTitle = require('../../common/components/CardTitle.jsx');

/*
 *  Simple Slider component
 *
 */

var styles = {
	container: {
		cardContainer: {
			fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
			margin: "0 20px 20px",
			paddingTop: "20px"
		},
		labelContainer: {
			width: "100%",
			height: "100%",
			display: "table",
			textAlign: "center"
		},
		cardLabel: {
			verticalAlign: "middle",
			display: "table-cell"
		},
		cardValue: {
			whiteSpace: "pre",
			fontSize: "160px",
			// fontSize: "4vw",
			fontWeight: "400"
		},
		cardUnit: {
			fontSize: "14px",
			paddingLeft: "10px",
			fontWeight: "normal"
		}
	}
};

var wrapperOld = {};
var fontFitSize = null;

var SimpleSlider = React.createClass({
	displayName: 'SimpleSlider',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		device: RPT.string,
		property: RPT.string,
		unit: RPT.string,
		wrapper: RPT.object
	},

	getDefaultProps: function getDefaultProps() {
		return {};
	},

	getInitialState: function getInitialState() {
		return {
			value: "",
			cardFontSize: styles.container.cardValue.fontSize
		};
	},

	componentDidUpdate: function componentDidUpdate(payload) {
		this.scaleFont();
		var wrapper = this.props.wrapper;

		if (wrapper.height == 1) {
			styles.container.cardContainer.paddingTop = "3px";
			styles.container.cardUnit.fontSize = "14px";
		} else {
			styles.container.cardContainer.paddingTop = "20px";
			styles.container.cardUnit.fontSize = "19px";
		}
	},

	scaleFont: function scaleFont(ref) {
		var self = this;
		var node = null;
		if (!ref) {
			node = self.node;
		} else {
			node = ReactDOM.findDOMNode(ref);
			self.node = node;
		}
		if (!node) {
			return;
		}
		var container = node.parentNode;
		var valLabel = node.children[1].children[0].children;
		var valWidth = valLabel[0].offsetWidth + valLabel[1].offsetWidth;
		var valHeight = valLabel[0].offsetHeight;
		var offsetWidth = 30;
		var offsetHeight = container.offsetHeight * 0.5;
		var numbString = styles.container.cardValue.fontSize;
		numbString = numbString.slice(0, numbString.length - 2);
		var sizeFont = parseInt(numbString);

		var containerMinHeight = container.offsetHeight <= 57 ? 57 : container.offsetHeight;

		if (container.offsetWidth - offsetWidth < valWidth || containerMinHeight - offsetHeight < valHeight) {

			this.setState({
				cardFontSize: sizeFont - 5
			});
			styles.container.cardValue.fontSize = this.state.cardFontSize + "px";
		} else if (container.offsetWidth - offsetWidth > valWidth + 5 && containerMinHeight - offsetHeight > valHeight + 5) {

			this.setState({
				cardFontSize: sizeFont + 2
			});
			styles.container.cardValue.fontSize = this.state.cardFontSize + "px";
		}
	},

	render: function render() {
		var data = "";
		var unit = "";
		var name = "";
		var label = this.props.nls.resolve("COMP_INIT_LABEL_SimpleSlider");

		if (this.state.value !== "") {
			if (this.props.property === null || this.props.device === null || this.state.value == undefined) {
				label = this.props.nls.resolve("COMP_CHECK_CONFIG_LABEL_SimpleSlider");
				unit = "";
			} else {
				label = this.state.value;
				unit = this.props.unit;
				name = this.props.nls.resolve(this.props.property);
			}
		}

		return React.createElement(
			'div',
			{ style: styles.container.cardContainer, ref: this.scaleFont },
			React.createElement(
				CardTitle,
				{ theme: this.props.theme },
				name
			),
			React.createElement(
				'div',
				{ style: styles.container.labelContainer },
				React.createElement('input', { id: 'simpleSlider', type: 'range', min: '0', max: '1000', step: '10' })
			)
		);
	}
});

module.exports = SimpleSlider;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardTitle.jsx":70,"../../common/stores/DeviceStore":97}],26:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var SimpleText = require('../../common/components/SimpleText.jsx');

/*
 *  Simple text card
 *
 */

var styles = {
  container: {
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    margin: "0 20px 20px",
    paddingTop: "20px"
  }
};

var SimpleTextCard = React.createClass({
  displayName: 'SimpleTextCard',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    content: RPT.string,
    fontSize: RPT.string,
    alignment: RPT.string,
    alignmentsHeader: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  getInitialState: function getInitialState() {
    return {
      value: ""
    };
  },

  componentWillMount: function componentWillMount() {},

  onUpdate: function onUpdate(payload) {},

  componentWillUpdate: function componentWillUpdate(payload) {
    var wrapper = this.props.wrapper;
    if (wrapper.height == 1) {
      styles.container.paddingTop = "10px";
    } else {
      styles.container.paddingTop = "20px";
    }
  },

  render: function render() {

    var wrapper = this.props.wrapper;
    if (wrapper.height == 1) {
      styles.container.paddingTop = "10px";
    } else {
      styles.container.paddingTop = "20px";
    }

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        SimpleText,
        { theme: this.props.theme, fontSize: this.props.fontSize, alignment: this.props.alignment },
        this.props.content
      )
    );
  }
});

module.exports = SimpleTextCard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/SimpleText.jsx":89}],27:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var StaticChartComponent = require('../../common/components/StaticChart.jsx');

/**
* Static chart
*/
var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var StaticChart = React.createClass({
  displayName: 'StaticChart',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    demo: RPT.bool,
    plots: RPT.array,
    type: RPT.string,
    title: RPT.string,
    horizontal: RPT.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      "plots": [],
      "type": "bar"
    };
  },

  getInitialState: function getInitialState() {
    return {
      data: [],
      names: {}
    };
  },

  componentDidMount: function componentDidMount() {
    IoTFDeviceStore.listen(this.onUpdate);
    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
      }
    }
  },

  onUpdate: function onUpdate(payload) {
    var found = false;
    var data = this.state.data;
    var names = Object.assign({}, this.state.names);

    for (var i in this.props.plots) {
      var plot = this.props.plots[i];
      if (plot) {
        if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

          var obj = Object.assign({}, payload.deviceEvent.data);
          var propertyPieces = plot.property.split(".");
          for (var i in propertyPieces) {
            var piece = propertyPieces[i];
            obj = obj[piece];
            if (obj === undefined) {
              break;
            }
          }
          //console.log(obj);

          if (obj !== undefined) {
            var newData = [plot.id, obj];
            var replaced = false;
            for (var t in data) {
              if (data[t][0] == plot.id) {
                data.splice(t, 1, newData);
                replaced = true;
                break;
              }
            }
            if (!replaced) {
              data.push(newData);
            }
            names[plot.id] = plot.label;
            found = true;
          }
        }
      }
    }
    if (found) {
      this.setState({
        data: data,
        names: names
      });
    }
  },

  render: function render() {
    // line
    // spline
    // step
    // area
    // area-spline
    // area-step
    // bar
    // scatter
    // pie
    // donut
    // gauge

    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement(
      'div',
      { style: style },
      React.createElement(StaticChartComponent, {
        theme: this.props.theme,
        data: this.state.data,
        names: this.state.names,
        type: this.props.type,
        title: this.props.title,
        horizontal: this.props.horizontal,
        height: this.props.wrapper.realHeight,
        width: this.props.wrapper.realWidth
      })
    );
  }
});

module.exports = StaticChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/StaticChart.jsx":90,"../../common/stores/IoTFDeviceStore":99}],28:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Table = require('../../common/components/Table.jsx');
var TableDetailBtn = require('../../common/components/TableDetailBtn.jsx');
var TableImage = require('../../common/components/TableImage.jsx');
var UserStore = require('../../common/stores/UserStore');
var Actions = require('../dashboard/Actions.jsx');

var RPT = React.PropTypes;

var styles = {};

var TableUser = React.createClass({
  displayName: 'TableUser',

  propTypes: {
    nls: RPT.object,
    metaData: RPT.array,
    fakeData: RPT.array
  },

  getInitialState: function getInitialState() {
    return {
      responsiveResultsPerPage: this.props.responsiveResultsPerPage ? this.props.responsiveResultsPerPage : 3,
      height: this.props.height ? this.props.height : 200,
      columns: this.props.columns ? this.props.columns : ["name", "mail", "avatar", "action"],
      data: this.props.fakeData };
  },

  // initial fakeDate with "loading" attributes
  // needed to fix bug: non displayed data before resize table
  componentDidMount: function componentDidMount() {
    UserStore.listen(this.onUpdate);
    UserStore.Actions.connect();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.wrapper.height !== nextProps.wrapper.height) {
      var heightOfTable = nextProps.style.height.substring(0, nextProps.style.height.length - 2);
      var heightOfTableNum = Number(heightOfTable);
      this.state.responsiveResultsPerPage = (heightOfTableNum - 130) / 70;
    };
  },

  onUpdate: function onUpdate(payload) {
    if (payload.users) {
      this.setState({ data: payload.users });
    }
  },

  render: function render() {
    var fakeData = this.props.fakeData || [];
    var metaData = this.props.metaData || [];
    metaData[0].customComponent = TableDetailBtn;
    metaData[1].customComponent = TableImage;
    var wrapper = this.props.wrapper;

    return React.createElement(
      'div',
      { style: styles },
      React.createElement(Table, {

        resultsPerPage: this.state.responsiveResultsPerPage,

        settingsText: "",
        enableInfiniteScroll: false,
        bodyHeight: this.state.height,
        results: this.state.data,
        columnMetadata: metaData,
        showFilter: true,
        showSettings: true,
        maxRowsText: "",
        isSubGriddle: false,
        useFixedLayout: true,
        columns: this.state.columns
      })
    );
  }
});

module.exports = TableUser;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Table.jsx":92,"../../common/components/TableDetailBtn.jsx":93,"../../common/components/TableImage.jsx":94,"../../common/stores/UserStore":102,"../dashboard/Actions.jsx":41}],29:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var ReactGridLayout = (typeof window !== "undefined" ? window['ReactGridLayout'] : typeof global !== "undefined" ? global['ReactGridLayout'] : null);

/**
* Blank component to test lower level content.
*/
var styles = {
	container: {
		paddingTop: "30px"
	},
	component: {
		backgroundColor: "silver",
		color: "black"
	}
};

var TestComponent = React.createClass({
	displayName: 'TestComponent',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},

	onChange: function onChange(value) {
		alert(value);
	},

	render: function render() {
		var self = this;
		return React.createElement(
			'div',
			{ style: styles.container },
			React.createElement(
				ReactGridLayout,
				{
					cols: 3,
					className: 'layout',
					rowHeight: 100,
					verticalCompact: true,
					autoSize: true,
					isDraggable: true,
					isResizable: true
				},
				React.createElement(
					'div',
					{ style: styles.component, key: 1, _grid: { x: 0, y: 0, w: 1, h: 2 } },
					'1'
				),
				React.createElement(
					'div',
					{ style: styles.component, key: 2, _grid: { x: 1, y: 0, w: 1, h: 2 } },
					'2'
				),
				React.createElement(
					'div',
					{ style: styles.component, key: 3, _grid: { x: 2, y: 0, w: 1, h: 2 } },
					'3'
				)
			)
		);
	}
});

module.exports = TestComponent;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Select.jsx":88}],30:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var IoTFUsageStore = require('../../common/stores/IoTFUsageStore.js');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var CardLineChart = require('../../common/components/CardLineChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');

var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "100%",
		position: "relative"
	}
};

var UsageDataCard = React.createClass({
	displayName: 'UsageDataCard',

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object
	},

	getInitialState: function getInitialState() {
		return {
			today: 0,
			details: [],
			dataTrafficUsageThisMonth: 0,
			dataTrafficUsageLastMonth: 0
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFUsageStore.listen(this.onUpdate);
		IoTFUsageStore.Actions.fetchDataTrafficUsage();
	},

	onUpdate: function onUpdate(payload) {
		var model = {};
		if (payload.dataTrafficUsageThisMonth !== undefined) {
			model.dataTrafficUsageThisMonth = payload.dataTrafficUsageThisMonth;
		}
		if (payload.dataTrafficUsageLastMonth !== undefined) {
			model.dataTrafficUsageLastMonth = payload.dataTrafficUsageLastMonth;
		}
		if (payload.dataTrafficUsageDetails) {
			var details = payload.dataTrafficUsageDetails;
			if (details.length > 0) {
				var today = details[details.length - 1].total;
				today = Math.round(today / 1000) + " MB";
				model.today = today;
			}
			model.details = details;
		}

		if (Object.keys(model).length > 0) {
			this.setState(model);
		}
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		var chart = "";
		var table = "";
		if (this.props.wrapper.width > 2) {
			chart = React.createElement(CardLineChart, {
				theme: this.props.theme,
				data: this.state.details,
				height: 400,
				width: this.props.wrapper.realWidth - 500,
				showRange: true
			});
		}
		if (this.props.wrapper.width == 2) {
			var data = [];
			var details = this.state.details;
			for (var i = details.length - 1; i >= 0 && i > details.length - 4; i--) {
				var line = details[i];
				var entry = [line.date, line.total + " MB"];
				data.push(entry);
			}
			table = React.createElement(CardTable, {
				theme: this.props.theme,
				data: data,
				header: [this.props.nls.resolve("Time"), this.props.nls.resolve("DataConsumed")],
				height: 300,
				width: this.props.wrapper.realWidth - 500
			});
		}
		return React.createElement(
			'div',
			{ style: style },
			React.createElement(
				CardDatapoint,
				{ theme: this.props.theme, unit: this.props.nls.resolve("DataToday") },
				this.state.today
			),
			chart,
			table,
			React.createElement(
				CardFooter,
				{ theme: this.props.theme },
				React.createElement(
					CardFooterDatapoint,
					{ theme: this.props.theme, title: this.props.nls.resolve("ThisMonth"), unit: this.props.nls.resolve("DataThisMonth") },
					this.state.dataTrafficUsageThisMonth
				),
				React.createElement(
					CardFooterDatapoint,
					{ theme: this.props.theme, title: this.props.nls.resolve("PreviousMonth"), unit: this.props.nls.resolve("DataPreviousMonth") },
					this.state.dataTrafficUsageLastMonth
				)
			)
		);
	}
});

module.exports = UsageDataCard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardDatapoint.jsx":63,"../../common/components/CardFooter.jsx":65,"../../common/components/CardFooterDatapoint.jsx":66,"../../common/components/CardLineChart.jsx":67,"../../common/components/CardSection.jsx":68,"../../common/components/CardTable.jsx":69,"../../common/stores/IoTFUsageStore.js":100}],31:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var IoTFUsageStore = require('../../common/stores/IoTFUsageStore.js');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var CardLineChart = require('../../common/components/CardLineChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');

var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "100%",
		position: "relative"
	}
};

var UsageDeviceCard = React.createClass({
	displayName: 'UsageDeviceCard',

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object
	},

	getInitialState: function getInitialState() {
		return {
			deviceCount: 0,
			details: [],
			devicesCreatedThisMonth: 0,
			devicesCreatedPreviousMonth: 0
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFUsageStore.listen(this.onUpdate);
		IoTFUsageStore.Actions.fetchDeviceCount();
		IoTFUsageStore.Actions.fetchActiveDeviceUsage();
	},

	onUpdate: function onUpdate(payload) {
		var model = {};
		if (payload.deviceCount) {
			model.deviceCount = payload.deviceCount;
		}
		if (payload.activeDeviceUsageThisMonth) {
			model.devicesCreatedThisMonth = payload.activeDeviceUsageThisMonth;
		}
		if (payload.activeDeviceUsageLastMonth) {
			model.devicesCreatedPreviousMonth = payload.activeDeviceUsageLastMonth;
		}
		if (payload.activeDeviceUsageDetails) {
			var details = payload.activeDeviceUsageDetails;
			if (details.length > 0) {
				var today = details[details.length - 1].total;
				model.today = today;
			}
			model.details = details;
		}

		if (Object.keys(model).length > 0) {
			this.setState(model);
		}
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		var chart = "";
		var table = "";
		if (this.props.wrapper.width > 2) {
			chart = React.createElement(CardLineChart, {
				theme: this.props.theme,
				data: this.state.details,
				height: 400,
				width: this.props.wrapper.realWidth - 500,
				showRange: true
			});
		}
		if (this.props.wrapper.width == 2) {
			var data = [];
			var details = this.state.details;
			for (var i = details.length - 1; i >= 0 && i > details.length - 4; i--) {
				var line = details[i];
				var entry = [line.date, line.total];
				data.push(entry);
			}
			table = React.createElement(CardTable, {
				theme: this.props.theme,
				data: data,
				header: [this.props.nls.resolve("Time"), this.props.nls.resolve("DevicesConnected")],
				height: 300,
				width: this.props.wrapper.realWidth - 500
			});
		}

		return React.createElement(
			'div',
			{ style: style },
			React.createElement(
				CardDatapoint,
				{ theme: this.props.theme, unit: this.props.nls.resolve("DevicesNow") },
				this.state.deviceCount
			),
			chart,
			table,
			React.createElement(
				CardFooter,
				{ theme: this.props.theme },
				React.createElement(
					CardFooterDatapoint,
					{ theme: this.props.theme, title: this.props.nls.resolve("ThisMonth"), unit: this.props.nls.resolve("DevicesThisMonth") },
					this.state.devicesCreatedThisMonth
				),
				React.createElement(
					CardFooterDatapoint,
					{ theme: this.props.theme, title: this.props.nls.resolve("PreviousMonth"), unit: this.props.nls.resolve("DevicesPreviousMonth") },
					this.state.devicesCreatedPreviousMonth
				)
			)
		);
	}
});

module.exports = UsageDeviceCard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardDatapoint.jsx":63,"../../common/components/CardFooter.jsx":65,"../../common/components/CardFooterDatapoint.jsx":66,"../../common/components/CardLineChart.jsx":67,"../../common/components/CardSection.jsx":68,"../../common/components/CardTable.jsx":69,"../../common/stores/IoTFUsageStore.js":100}],32:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var IoTFUsageStore = require('../../common/stores/IoTFUsageStore.js');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var CardLineChart = require('../../common/components/CardLineChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');

var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "100%",
		position: "relative"
	}
};

var UsageStorageCard = React.createClass({
	displayName: 'UsageStorageCard',

	propTypes: {
		theme: RPT.object.isRequired,
		nls: RPT.object,
		style: RPT.object
	},

	getInitialState: function getInitialState() {
		return {
			today: 0,
			details: [],
			historicalDataUsageThisMonth: 0,
			historicalDataUsageLastMonth: 0
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFUsageStore.listen(this.onUpdate);
		IoTFUsageStore.Actions.fetchHistoricalDataUsage();
	},

	onUpdate: function onUpdate(payload) {
		var model = {};
		if (payload.historicalDataUsageThisMonth) {
			model.historicalDataUsageThisMonth = payload.historicalDataUsageThisMonth;
		}
		if (payload.historicalDataUsageLastMonth) {
			model.historicalDataUsageLastMonth = payload.historicalDataUsageLastMonth;
		}
		if (payload.historicalDataUsageDetails) {
			var details = payload.historicalDataUsageDetails;
			if (details.length > 0) {
				var today = details[details.length - 1].total - details[details.length - 2].total;
				today = today.toFixed(3) + " MB";
				model.today = today;
			}
			model.details = details;
		}

		if (Object.keys(model).length > 0) {
			this.setState(model);
		}
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		var chart = "";
		var table = "";
		if (this.props.wrapper.width > 2) {
			chart = React.createElement(CardLineChart, {
				theme: this.props.theme,
				data: this.state.details,
				height: 400,
				width: this.props.wrapper.realWidth - 500,
				showRange: true
			});
		}
		if (this.props.wrapper.width == 2) {
			var data = [];
			var details = this.state.details;
			for (var i = details.length - 1; i >= 0 && i > details.length - 4; i--) {
				var line = details[i];
				var entry = [line.date, line.total + " MB"];
				data.push(entry);
			}
			table = React.createElement(CardTable, {
				theme: this.props.theme,
				data: data,
				header: [this.props.nls.resolve("Time"), this.props.nls.resolve("StorageUsed")],
				height: 300,
				width: this.props.wrapper.realWidth - 500
			});
		}

		return React.createElement(
			'div',
			{ style: style },
			React.createElement(
				CardDatapoint,
				{ theme: this.props.theme, unit: this.props.nls.resolve("StorageToday") },
				this.state.today
			),
			chart,
			table,
			React.createElement(
				CardFooter,
				{ theme: this.props.theme },
				React.createElement(
					CardFooterDatapoint,
					{ theme: this.props.theme, title: this.props.nls.resolve("ThisMonth"), unit: this.props.nls.resolve("StorageThisMonth") },
					this.state.historicalDataUsageThisMonth
				),
				React.createElement(
					CardFooterDatapoint,
					{ theme: this.props.theme, title: this.props.nls.resolve("PreviousMonth"), unit: this.props.nls.resolve("StoragePreviousMonth") },
					this.state.historicalDataUsageLastMonth
				)
			)
		);
	}
});

module.exports = UsageStorageCard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardDatapoint.jsx":63,"../../common/components/CardFooter.jsx":65,"../../common/components/CardFooterDatapoint.jsx":66,"../../common/components/CardLineChart.jsx":67,"../../common/components/CardSection.jsx":68,"../../common/components/CardTable.jsx":69,"../../common/stores/IoTFUsageStore.js":100}],33:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var Table = require('../../common/components/Table.jsx');
var TableDetailBtn = require('../../common/components/TableDetailBtn.jsx');
var TableImage = require('../../common/components/TableImage.jsx');
var Icon = require('../../common/components/IconLink.jsx');
var UserStore = require('../../common/stores/UserStore');
var Actions = require('../dashboard/Actions.jsx');

var RPT = React.PropTypes;

var styles = {
	container: {
		float: "left",
		width: "100%",
		height: "100%",
		color: "black"
	},

	vCard: {
		cursor: "pointer",
		float: "left",
		paddingLeft: "10px",
		paddingRight: "10px",
		paddingBottom: "10px",
		paddingTop: "10px",
		marginLeft: "15px",
		minHeight: "100px",
		width: "185px", // should be adaptive
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		marginBottom: "1rem",
		color: "black"
	},

	name: {
		fontSize: "medium",
		textTransform: "uppercase",
		color: "#323232"
	},

	avatar: {
		borderRadius: "50%",
		float: "left",
		marginRight: "10px",
		marginBottom: "10px"
	},

	infos: {
		float: "left",
		paddingTop: "5px",
		width: "100%",
		borderTop: "1px solid #000000"
	}
};

var TableCustomView = React.createClass({
	displayName: 'TableCustomView',

	getDefaultProps: function getDefaultProps() {
		return {
			"data": {}
		};
	},

	clickDetailsBtn: function clickDetailsBtn(event) {
		var data = Object.assign({}, this.props.data);
		Actions.notify({ user: data });
	},

	componentDidMount: function componentDidMount() {},

	render: function render() {

		return React.createElement(
			'div',
			{ style: styles.vCard, onClick: this.clickDetailsBtn },
			React.createElement(
				'div',
				null,
				' ',
				React.createElement(
					'span',
					null,
					React.createElement('img', { style: styles.avatar, src: this.props.data.avatar, width: '40', height: '40', alt: 'Avatar' })
				),
				React.createElement(
					'span',
					{ style: styles.name },
					this.props.data.name
				)
			),
			React.createElement(
				'div',
				{ style: styles.infos },
				React.createElement(
					'div',
					null,
					this.props.data.mail
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'small',
						null,
						this.props.data.descrip
					)
				)
			)
		);
	}
});

var UserCardTable = React.createClass({
	displayName: 'UserCardTable',

	propTypes: {
		nls: RPT.object,
		metaData: RPT.array,
		fakeData: RPT.array
	},

	getInitialState: function getInitialState() {
		return {
			responsiveResultsPerPage: this.props.responsiveResultsPerPage ? this.props.responsiveResultsPerPage : 4,
			height: this.props ? this.props.height : 200,
			width: this.props ? this.props.width : 200,
			data: this.props.fakeData
		};
	},

	componentDidMount: function componentDidMount() {
		var parent = ReactDOM.findDOMNode(this).parentNode;
		this.setState({ didMount: true });
		UserStore.listen(this.onUpdate);
		UserStore.Actions.connect();
	},

	componentDidUpdate: function componentDidUpdate(props, state) {
		if (this.state.width !== ReactDOM.findDOMNode(this).parentNode.offsetWidth) {
			this.setState({ width: ReactDOM.findDOMNode(this).parentNode.offsetWidth });
		};
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var parent = ReactDOM.findDOMNode(this).parentNode;

		if (this.props.wrapper.height !== nextProps.wrapper.height || this.props.wrapper.width !== nextProps.wrapper.width) {
			var heightOfTable = nextProps.style.height.substring(0, nextProps.style.height.length - 2);
			this.state.heightOfTable = Number(heightOfTable);
			this.state.responsiveResultsPerPage = Math.floor((heightOfTable - 70) / 136) * Math.floor(parent.clientWidth / 230);
		};
	},

	onUpdate: function onUpdate(payload) {
		if (payload.users) {
			this.setState({ data: payload.users });
		}
	},

	render: function render() {
		var metaData = this.props.metaData || [];
		var wrapper = this.props.wrapper;

		return React.createElement(
			'div',
			{ style: styles.container },
			React.createElement(Table, {
				resultsPerPage: this.state.responsiveResultsPerPage,
				bodyHeight: this.state.height,
				settingsText: "",
				noDataMessage: "",
				enableInfiniteScroll: false,
				results: this.state.data,
				columnMetadata: metaData,
				showFilter: true,
				showSettings: false,
				useCustomRowComponent: true,
				customRowComponent: TableCustomView,
				enableToggleCustom: true,
				customRowComponentClassName: "vCardsWrapper"
			})
		);
	}
});

module.exports = UserCardTable;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/IconLink.jsx":77,"../../common/components/Table.jsx":92,"../../common/components/TableDetailBtn.jsx":93,"../../common/components/TableImage.jsx":94,"../../common/stores/UserStore":102,"../dashboard/Actions.jsx":41}],34:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	container: {
		height: "100%",
		width: "100%",
		padding: "20px"
	},
	section: {
		borderLeft: "5px solid silver",
		display: "inline-block",
		marginLeft: "10px",
		paddingLeft: "10px",
		verticalAlign: "top"
	},
	id: {
		fontSize: "40px",
		backgroundColor: "silver",
		lineHeight: "50px",
		height: "50px",
		width: "50px",
		textAlign: "center",
		borderRadius: "50%",
		display: "inline-block",
		verticalAlign: "top"
	},
	name: {
		fontSize: "40px"
	},
	description: {
		fontSize: "15px"
	},
	mail: {
		fontSize: "15px"
	},
	avatar: {
		width: "120px",
		height: "120px",
		borderRadius: "50%",
		verticalAlign: "top",
		marginLeft: "20px",
		marginTop: "20px"
	}
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/User-details-card
//

var UserDetails = React.createClass({
	displayName: "UserDetails",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object
	},

	getDefaultProps: function getDefaultProps() {
		return {};
	},

	getInitialState: function getInitialState() {
		return {};
	},

	componentDidMount: function componentDidMount() {
		// TODO Any way to properly handle circular requires?
		var self = this;
		var DashboardStore = require('../dashboard/DashboardStore');
		DashboardStore.listen(self.onNotify);
	},

	onNotify: function onNotify(payload) {
		if (payload.notification && payload.notification.user) {
			this.setState({ model: payload.notification.user });
		}
	},

	render: function render() {
		if (this.state.model) {
			return React.createElement(
				"div",
				{ style: styles.container },
				React.createElement(
					"div",
					{ style: styles.id },
					this.state.model.id
				),
				React.createElement(
					"div",
					{ style: styles.section },
					React.createElement(
						"div",
						{ style: styles.name },
						this.state.model.name
					),
					React.createElement(
						"div",
						{ style: styles.description },
						this.state.model.descrip
					),
					React.createElement(
						"div",
						{ style: styles.mail },
						this.state.model.mail
					)
				),
				React.createElement("img", { style: styles.avatar, src: this.state.model.avatar })
			);
		} else {
			var message = this.props.nls.resolve("CARD_USERDETAIL_placeholder");
			return React.createElement(
				"div",
				{ style: styles.container },
				message
			);
		}
	}
});

module.exports = UserDetails;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dashboard/DashboardStore":47}],35:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var CardSection = require('../../common/components/CardSection.jsx');
var CardDatapoint = require('../../common/components/CardDatapoint.jsx');
var CardFooter = require('../../common/components/CardFooter.jsx');
var CardFooterDatapoint = require('../../common/components/CardFooterDatapoint.jsx');
var LineChart = require('../../common/components/LineChart.jsx');
var CardTable = require('../../common/components/CardTable.jsx');

var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "100%",
		position: "relative"
	},
	empty: {
		padding: "20px"
	},
	chart: {
		position: "absolute",
		top: "50px",
		right: "60px",
		border: "1px solid",
		borderColor: "transparent"
	}
};

var Value = React.createClass({
	displayName: 'Value',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		nls: RPT.object,
		wrapper: RPT.object,
		demo: RPT.bool,
		major: RPT.string,
		plots: RPT.array
	},

	getDefaultProps: function getDefaultProps() {
		return {
			plots: [],
			data: {}
		};
	},

	getInitialState: function getInitialState() {
		return {
			value: null,
			data: []
		};
	},

	componentDidMount: function componentDidMount() {
		IoTFDeviceStore.listen(this.onUpdate);
		var plot = this.getPlot();
		if (plot) {
			IoTFDeviceStore.Actions.startPropertyWatch(plot.device, plot.event, plot.property);
		}
	},

	getPlot: function getPlot() {
		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			if (plot.id == this.props.major) {
				return plot;
			}
		}
		// fallback
		if (this.props.plots.length > 0) {
			return this.props.plots[0];
		} else {
			return null;
		}
	},

	onUpdate: function onUpdate(payload) {
		console.debug("Value::onUpdate", payload);
		var data = { timestamp: new Date().getTime() };
		var value = null;
		var found = false;
		var count = 0;
		var plot = this.getPlot();
		if (plot) {
			if (payload.deviceEvent && payload.deviceEvent.deviceId == plot.device && payload.deviceEvent.eventType == plot.event) {

				var obj = Object.assign({}, payload.deviceEvent.data);
				var propertyPieces = plot.property.split(".");
				for (var i in propertyPieces) {
					var piece = propertyPieces[i];
					obj = obj[piece];
					if (obj === undefined) {
						break;
					}
				}

				if (obj !== undefined) {
					data[plot.id] = obj;
					value = obj;
					found = true;
				}
			}
		}
		if (found) {
			console.debug("onUpdate is adding data: ", data);
			var allData = this.state.data;
			allData.push(data);
			this.setState({
				data: allData,
				value: value
			});
		}
	},

	render: function render() {
		var plot = this.getPlot();
		if (plot && this.state.value !== null) {
			var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

			var chart = "";
			var table = "";
			if (this.props.wrapper.width > 2) {
				if (this.state.data.length > 0) {
					var data = this.state.data[this.state.data.length - 1];
					chart = React.createElement(LineChart, {
						theme: this.props.theme,
						data: data,
						initialData: this.state.data,
						plots: this.props.plots,
						height: 400,
						width: this.props.wrapper.realWidth - 500,
						overview: true,
						range: 600,
						autoscroll: true,
						stacked: false,
						steps: false,
						legend: false,
						style: Object.assign({}, styles.chart, { height: 400, width: this.props.wrapper.realWidth - 500, borderLeftColor: this.props.theme.minor })
					});
				}
			}
			if (this.props.wrapper.width == 2) {
				var data = [];
				var details = this.state.data;
				for (var i = details.length - 1; i >= 0 && i > details.length - 4; i--) {
					var line = details[i];
					var value = line[plot.id];
					value = plot.precision !== undefined ? value.toFixed(plot.precision) : value;
					var entry = [new Date(line.timestamp).toLocaleString(), value + " " + (plot.unit ? plot.unit : "")];
					data.push(entry);
				}
				table = React.createElement(CardTable, {
					theme: this.props.theme,
					data: data,
					header: [this.props.nls.resolve("Time"), this.props.nls.resolve("Value")],
					height: 300,
					width: this.props.wrapper.realWidth - 500
				});
			}

			return React.createElement(
				'div',
				{ style: style },
				React.createElement(
					CardDatapoint,
					{ theme: this.props.theme, unit: plot.label },
					plot.precision !== undefined ? this.state.value.toFixed(plot.precision) : this.state.value,
					plot.unit ? " " + plot.unit : ""
				),
				chart,
				table
			);
		} else {
			if (!plot) {
				return React.createElement(
					'div',
					{ style: styles.empty },
					'No data point defined'
				);
			} else {
				return React.createElement(
					'div',
					{ style: styles.empty },
					'Loading...'
				);
			}
		}
	}
});

module.exports = Value;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardDatapoint.jsx":63,"../../common/components/CardFooter.jsx":65,"../../common/components/CardFooterDatapoint.jsx":66,"../../common/components/CardSection.jsx":68,"../../common/components/CardTable.jsx":69,"../../common/components/LineChart.jsx":81,"../../common/stores/IoTFDeviceStore":99}],36:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;

var styles = {
	container: {
		height: "100%"
	},
	image: {}
};

// http://kaufhaus.ludwigbeck.de/manual/webcam/1sec.jpg
// http://blog.muenchen.de/marienplatzcam/marienplatzgross001.jpg
// http://mymielke.no-ip.biz:8091/snapshot.cgi?user=ibm&pwd=1911

var Webcam = React.createClass({
	displayName: 'Webcam',

	propTypes: {
		nls: RPT.object,
		frequency: RPT.number,
		url: RPT.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			frequency: 5,
			url: ""
		};
	},

	getInitialState: function getInitialState() {
		return {
			url: null
		};
	},

	componentDidMount: function componentDidMount() {
		this.load();
	},

	load: function load() {
		var time = new Date().getTime();
		var separator = this.props.url.indexOf('?') > -1 ? "&" : "?";
		var url = this.props.url + separator + "nocache=" + time;
		this.setState({
			url: url,
			time: time
		});
	},

	reload: function reload(event) {
		if (this.node) {
			this.height = this.node.offsetHeight - 32;
			this.width = this.node.offsetWidth;
			var image = event.target;
			this.imgHeight = image.naturalHeight;
			this.imgWidth = image.naturalWidth;

			var factor = Math.max(this.height / this.imgHeight, this.width / this.imgWidth);
			image.style.width = Math.ceil(this.imgWidth * factor) + "px";
			image.style.height = Math.ceil(this.imgHeight * factor) + "px";
		}

		if (this.timeout) {
			return;
		}
		var self = this;
		var time = new Date().getTime();
		if (this.state.time <= time - this.props.frequency * 1000) {
			this.load();
		} else {
			this.timeout = setTimeout(function () {
				self.timeout = null;
				self.load();
			}, this.props.frequency * 1000 - (time - this.state.time));
		}
	},

	setContainer: function setContainer(ref) {
		if (ref) {
			this.node = ReactDOM.findDOMNode(ref);
		}
	},

	render: function render() {
		if (this.state.url) {
			return React.createElement(
				'div',
				{ style: styles.container, ref: this.setContainer },
				React.createElement('img', { style: styles.image, onLoad: this.reload, src: this.state.url })
			);
		} else {
			return React.createElement(
				'div',
				null,
				'Loading...'
			);
		}
	}
});

module.exports = Webcam;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],37:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
	container: {},
	table: {
		width: "100%"
	}

};

var BarChartProperties = React.createClass({
	displayName: 'BarChartProperties',

	propTypes: {
		horizontal: RPT.bool,
		nls: RPT.object,
		style: RPT.object,
		theme: RPT.object.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			horizontal: false
		};
	},

	getInitialState: function getInitialState() {
		return {
			horizontal: this.props.horizontal
		};
	},

	onHorizontalChanged: function onHorizontalChanged(value) {
		this.setState({
			horizontal: value
		});
	},

	onUpdate: function onUpdate(state) {
		var state = Object.assign({}, this.state, state);
		this.setState(state);
	},

	render: function render() {
		var self = this;
		var newProps = Object.assign({}, this.props, this.state);

		return React.createElement(
			'div',
			{ style: Object.assign({}, styles.container, this.props.style) },
			React.createElement(
				'table',
				{ style: styles.table },
				React.createElement(
					'tbody',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement(
								Label,
								{ label: 'Horizontal', theme: this.props.theme },
								React.createElement(Switch, { theme: this.props.theme, onChange: this.onHorizontalChanged, initialValue: !!this.state.horizontal, trueText: 'Yes', falseText: 'No' })
							)
						)
					)
				)
			)
		);
	}
});

module.exports = BarChartProperties;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Select.jsx":88,"../dashboard/DashboardUtils.js":48}],38:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
  container: {},
  table: {
    width: "100%"
  },

  thresholdLabel: {
    top: "8px",
    position: "relative"
  },
  thresholdLabelLeft: {
    position: "relative",
    marginRight: "10px"
  },
  thresholdLabelRight: {
    position: "relative",
    marginLeft: "10px"
  },
  thresholdInput: {
    display: "inline-block",
    width: "50px",
    height: "24px"
  },
  thresholdInputField: {
    textAlign: "right"
  },
  tableData: {
    verticalAlign: "top"
  }

};

var GaugeProperties = React.createClass({
  displayName: 'GaugeProperties',

  propTypes: {
    major: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  meanings: ["NONE", "GOOD", "FAIR", "CRITICAL"],

  getDefaultProps: function getDefaultProps() {
    return {
      major: null,
      lowerThresholdMeaning: "NONE",
      middleThresholdMeaning: "NONE",
      upperThresholdMeaning: "NONE"
    };
  },

  getInitialState: function getInitialState() {
    var plot = this.getPlot();
    return {
      major: plot.id,
      lowerThresholdMeaning: this.props.lowerThresholdMeaning ? this.props.lowerThresholdMeaning : "NONE",
      middleThresholdMeaning: this.props.middleThresholdMeaning ? this.props.middleThresholdMeaning : "NONE",
      upperThresholdMeaning: this.props.upperThresholdMeaning ? this.props.upperThresholdMeaning : "NONE",
      lowerThreshold: this.props.lowerThreshold !== undefined ? this.props.lowerThreshold : plot.min,
      upperThreshold: this.props.upperThreshold !== undefined ? this.props.upperThreshold : plot.max
    };
  },

  getPlot: function getPlot() {
    if (this.state) {
      for (var i in this.props.plots) {
        var plot = this.props.plots[i];
        if (plot.id == this.state.major) {
          return plot;
        }
      }
    }
    // fallback
    if (this.props.plots.length > 0) {
      return this.props.plots[0];
    } else {
      return null;
    }
  },

  initThresholds: function initThresholds(plotId) {
    var plot = this.getPlot();
    this.setState({
      lowerThreshold: this.props.min,
      upperThreshold: this.props.max,
      lowerThresholdMeaning: this.props.lowerThresholdMeaning,
      middleThresholdMeaning: this.props.middleThresholdMeaning,
      upperThresholdMeaning: this.props.upperThresholdMeaning
    });
  },

  onMajorChanged: function onMajorChanged(value) {
    this.setState({
      major: value
    });
    this.initThresholds();
  },

  onLowerThresholdChanged: function onLowerThresholdChanged(value) {
    value = parseFloat(value);
    this.setState({
      lowerThreshold: value
    });
  },

  onUpperThresholdChanged: function onUpperThresholdChanged(value) {
    value = parseFloat(value);
    this.setState({
      upperThreshold: value
    });
  },

  onLowerThresholdBlur: function onLowerThresholdBlur(value) {
    value = parseFloat(value);
    var plot = this.getPlot();
    if (value < plot.min) value = plot.min;
    if (value > plot.max) value = plot.max;
    if (value > this.state.upperThreshold) value = this.state.upperThreshold;
    this.setState({
      lowerThreshold: value
    });
  },

  onUpperThresholdBlur: function onUpperThresholdBlur(value) {
    value = parseFloat(value);
    var plot = this.getPlot();
    if (value > plot.max) value = plot.max;
    if (value < plot.min) value = plot.min;
    if (value < this.state.lowerThreshold) value = this.state.lowerThreshold;
    this.setState({
      upperThreshold: value
    });
  },

  onLowerThresholdMeaningChanged: function onLowerThresholdMeaningChanged(value) {
    this.setState({
      lowerThresholdMeaning: value
    });
  },

  onMiddleThresholdMeaningChanged: function onMiddleThresholdMeaningChanged(value) {
    this.setState({
      middleThresholdMeaning: value
    });
  },

  onUpperThresholdMeaningChanged: function onUpperThresholdMeaningChanged(value) {
    this.setState({
      upperThresholdMeaning: value
    });
  },

  onUpdate: function onUpdate(state) {
    var state = Object.assign({}, this.state, state);
    this.setState(state);
  },

  render: function render() {
    var self = this;

    var newProps = Object.assign({}, this.props, this.state);
    var range = parseInt(this.state.range);
    var plot = this.getPlot();

    if (this.state && plot.min !== undefined && plot.max !== undefined) {
      return React.createElement(
        'div',
        { style: Object.assign({}, styles.container, this.props.style) },
        React.createElement(
          'table',
          { style: styles.table },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '2' },
                React.createElement(
                  Label,
                  { label: 'Data point', theme: this.props.theme },
                  React.createElement(
                    Select,
                    { onChange: this.onMajorChanged, value: plot.id },
                    this.props.plots.map(function (item) {
                      return React.createElement(
                        Option,
                        { value: item.id, selected: plot.id == item.id },
                        item.label
                      );
                    })
                  )
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { style: styles.tableData },
                React.createElement(
                  Label,
                  { label: 'Lower threshold', theme: this.props.theme },
                  React.createElement(
                    'span',
                    { style: styles.thresholdLabelLeft },
                    plot.min,
                    ' ',
                    plot.unit,
                    ' to '
                  ),
                  React.createElement(
                    'div',
                    { style: styles.thresholdInput },
                    React.createElement(InputField, { style: styles.thresholdInputField, theme: this.props.theme, type: 'number', min: plot.min, max: plot.max, onChange: this.onLowerThresholdChanged, onBlur: this.onLowerThresholdBlur, value: this.state.lowerThreshold, initialValue: this.state.lowerThreshold })
                  ),
                  React.createElement(
                    'span',
                    { style: styles.thresholdLabelRight },
                    ' ',
                    plot.unit
                  )
                )
              ),
              React.createElement(
                'td',
                null,
                React.createElement(
                  Select,
                  { onChange: this.onLowerThresholdMeaningChanged, value: self.state.lowerThresholdMeaning },
                  this.meanings.map(function (item) {
                    return React.createElement(
                      Option,
                      { value: item, selected: self.state.lowerThresholdMeaning == item },
                      self.props.nls.resolve("THRESHOLD_" + item)
                    );
                  })
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { style: styles.tableData },
                React.createElement(
                  Label,
                  { label: 'Middle', theme: this.props.theme },
                  React.createElement(
                    'span',
                    { style: styles.thresholdLabel },
                    this.state.lowerThreshold,
                    ' ',
                    plot.unit,
                    ' to ',
                    this.state.upperThreshold,
                    ' ',
                    plot.unit
                  )
                )
              ),
              React.createElement(
                'td',
                null,
                React.createElement(
                  Select,
                  { onChange: this.onMiddleThresholdMeaningChanged, value: self.state.middleThresholdMeaning },
                  this.meanings.map(function (item) {
                    return React.createElement(
                      Option,
                      { value: item, selected: self.state.middleThresholdMeaning == item },
                      self.props.nls.resolve("THRESHOLD_" + item)
                    );
                  })
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { style: styles.tableData },
                React.createElement(
                  Label,
                  { label: 'Upper threshold', theme: this.props.theme },
                  React.createElement(
                    'div',
                    { style: styles.thresholdInput },
                    React.createElement(InputField, { style: styles.thresholdInputField, theme: this.props.theme, type: 'number', min: plot.min, max: plot.max, onChange: this.onUpperThresholdChanged, onBlur: this.onUpperThresholdBlur, value: this.state.upperThreshold, initialValue: this.state.upperThreshold })
                  ),
                  React.createElement(
                    'span',
                    { style: styles.thresholdLabelRight },
                    ' ',
                    plot.unit,
                    ' to ',
                    plot.max,
                    ' ',
                    plot.unit
                  )
                )
              ),
              React.createElement(
                'td',
                null,
                React.createElement(
                  Select,
                  { onChange: this.onUpperThresholdMeaningChanged, value: self.state.upperThresholdMeaning },
                  this.meanings.map(function (item) {
                    return React.createElement(
                      Option,
                      { value: item, selected: self.state.upperThresholdMeaning == item },
                      self.props.nls.resolve("THRESHOLD_" + item)
                    );
                  })
                )
              )
            )
          )
        )
      );
    } else {
      return React.createElement(
        'div',
        { style: Object.assign({}, styles.container, this.props.style) },
        React.createElement(
          'table',
          { style: styles.table },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '2' },
                React.createElement(
                  Label,
                  { label: 'Data point', theme: this.props.theme },
                  React.createElement(
                    Select,
                    { onChange: this.onMajorChanged, value: plot.id },
                    this.props.plots.map(function (item) {
                      return React.createElement(
                        Option,
                        { value: item.id, selected: plot.id == item.id },
                        item.label
                      );
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }
});

module.exports = GaugeProperties;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Select.jsx":88,"../dashboard/DashboardUtils.js":48}],39:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var Swtich = require('../../common/components/Switch.jsx');

var styles = {
	container: {},
	table: {
		width: "100%"
	}

};

var RealTimeChartProperties = React.createClass({
	displayName: 'RealTimeChartProperties',

	propTypes: {
		range: RPT.number,
		autoscroll: RPT.bool,
		overview: RPT.bool,
		stacked: RPT.bool,
		steps: RPT.bool,
		nls: RPT.object,
		style: RPT.object,
		theme: RPT.object.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			range: 60,
			autoscroll: true,
			overview: true,
			stacked: false,
			steps: false
		};
	},

	getInitialState: function getInitialState() {
		return {
			range: this.props.range,
			autoscroll: this.props.autoscroll,
			overview: this.props.overview,
			stacked: this.props.stacked,
			steps: this.props.steps
		};
	},

	componentDidMount: function componentDidMount() {},

	onRangeChanged: function onRangeChanged(value) {
		this.setState({
			range: value
		});
	},

	onAutoscrollChanged: function onAutoscrollChanged(value) {
		this.setState({
			autoscroll: value
		});
	},

	onOverviewChanged: function onOverviewChanged(value) {
		this.setState({
			overview: value
		});
	},

	onStackedChanged: function onStackedChanged(value) {
		this.setState({
			stacked: value
		});
	},

	onStepsChanged: function onStepsChanged(value) {
		this.setState({
			steps: value
		});
	},

	onUpdate: function onUpdate(state) {
		var state = Object.assign({}, this.state, state);
		this.setState(state);
	},

	render: function render() {
		var self = this;
		var newProps = Object.assign({}, this.props, this.state);
		var range = parseInt(this.state.range);

		return React.createElement(
			'div',
			{ style: Object.assign({}, styles.container, this.props.style) },
			React.createElement(
				'table',
				{ style: styles.table },
				React.createElement(
					'tbody',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement(
								Label,
								{ label: 'Range', theme: this.props.theme },
								React.createElement(
									Select,
									{ onChange: this.onRangeChanged, value: "" + range },
									React.createElement(
										Option,
										{ value: '60', selected: range == 60 },
										'1 minute'
									),
									React.createElement(
										Option,
										{ value: '300', selected: range == 300 },
										'5 minutes'
									),
									React.createElement(
										Option,
										{ value: '600', selected: range == 600 },
										'10 minutes'
									),
									React.createElement(
										Option,
										{ value: '900', selected: range == 900 },
										'15 minutes'
									),
									React.createElement(
										Option,
										{ value: '1800', selected: range == 1800 },
										'30 minutes'
									),
									React.createElement(
										Option,
										{ value: '3600', selected: range == 3600 },
										'60 minutes'
									)
								)
							)
						),
						React.createElement('td', null)
					),
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement(
								Label,
								{ label: 'Stacked', theme: this.props.theme },
								React.createElement(Switch, { theme: this.props.theme, onChange: this.onStackedChanged, initialValue: !!this.state.stacked, trueText: 'Yes', falseText: 'No' })
							)
						),
						React.createElement(
							'td',
							null,
							React.createElement(
								Label,
								{ label: 'Steps', theme: this.props.theme },
								React.createElement(Switch, { theme: this.props.theme, onChange: this.onStepsChanged, initialValue: !!this.state.steps, trueText: 'Yes', falseText: 'No' })
							)
						)
					),
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							React.createElement(
								Label,
								{ label: 'Enable autoscroll', theme: this.props.theme },
								React.createElement(Switch, { theme: this.props.theme, onChange: this.onAutoscrollChanged, initialValue: !!this.state.autoscroll, trueText: 'Yes', falseText: 'No' })
							)
						),
						React.createElement(
							'td',
							null,
							React.createElement(
								Label,
								{ label: 'Show overview', theme: this.props.theme },
								React.createElement(Switch, { theme: this.props.theme, onChange: this.onOverviewChanged, initialValue: !!this.state.overview, trueText: 'Yes', falseText: 'No' })
							)
						)
					)
				)
			)
		);
	}
});

module.exports = RealTimeChartProperties;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Select.jsx":88,"../../common/components/Switch.jsx":91,"../dashboard/DashboardUtils.js":48}],40:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
  container: {},
  table: {
    width: "100%"
  }

};

var SingleValueProperties = React.createClass({
  displayName: 'SingleValueProperties',

  propTypes: {
    major: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      major: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      major: this.props.major
    };
  },

  onMajorChanged: function onMajorChanged(value) {
    this.setState({
      major: value
    });
  },

  onUpdate: function onUpdate(state) {
    var state = Object.assign({}, this.state, state);
    this.setState(state);
  },

  render: function render() {
    var self = this;
    var newProps = Object.assign({}, this.props, this.state);
    var range = parseInt(this.state.range);

    return React.createElement(
      'div',
      { style: Object.assign({}, styles.container, this.props.style) },
      React.createElement(
        'table',
        { style: styles.table },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              null,
              React.createElement(
                Label,
                { label: 'Data point', theme: this.props.theme },
                React.createElement(
                  Select,
                  { onChange: this.onMajorChanged, value: self.props.major },
                  this.props.plots.map(function (item) {
                    return React.createElement(
                      Option,
                      { value: item.id, selected: self.props.major == item.id },
                      item.label
                    );
                  })
                )
              )
            ),
            React.createElement('td', null)
          )
        )
      )
    );
  }
});

module.exports = SingleValueProperties;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/Select.jsx":88,"../dashboard/DashboardUtils.js":48}],41:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

module.exports = Reflux.createActions(['loadConfig', 'loadDashboard', 'getComponents', 'storeLayouts', 'undo', 'expandCard', 'shrinkCard', 'setBreakpoint', 'customAction', 'save', 'restore', 'addComponent', 'showDialogConfigSSO', 'showDialogSSOSignIn', 'showDialogAAAUserDetails', 'showDialogAddMember', 'showDialogLogin', 'submitSSOSignInData', 'submitAAAUserDetailsData', 'submitAddMemberData', 'submitLoginData', 'submitSSOData', 'showDialog', 'showConfigureComponent', 'configureComponent', 'getCategories', 'closeDialog', 'getComponent', 'deviceUpdated', 'removeComponent', 'notify', 'navigateRoute', 'addDashboard', 'removeDashboard', 'changeCardSize']);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var DashboardStore = require('./DashboardStore');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var Actions = require('./Actions.jsx');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var IconLink = require('../../common/components/IconLink.jsx');
var CardAction = require('../../common/components/CardAction.jsx');
var ColorSelection = require('../../common/components/ColorSelection.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');
var CustomizationWizard = require('./CustomizationWizard.jsx');

var RPT = React.PropTypes;

var ComponentCustomization = React.createClass({
  displayName: 'ComponentCustomization',

  propTypes: {
    id: RPT.string,
    action: RPT.string,
    type: RPT.string,
    style: RPT.object,
    nls: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      id: null,
      type: name,
      action: null
    };
  },

  getInitialState: function getInitialState() {
    return {};
  },

  componentDidMount: function componentDidMount() {
    DashboardStore.listen(this.onModelUpdate);
    IoTFDeviceStore.listen(this.onModelUpdate);
    IoTFDeviceStore.Actions.fetchDevices();
    console.log(this.props.id, this.props.type);
    Actions.getComponent({ id: this.props.id, type: this.props.type });
    Actions.getCategories();
  },

  onModelUpdate: function onModelUpdate(payload) {
    var model = {};
    if (payload.component) {
      model.component = payload.component;
      if (!this.state.devices || this.state.devices.length == 0) {
        model.devices = this.createDeviceListForPlots(payload.component);
      }
    }
    if (payload.devices) {
      var devices = this.setSelectionInDevices(payload.devices);
      model.devices = devices;
    }
    if (payload.categories) {
      model.categories = payload.categories;
    }
    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onChangeType: function onChangeType(type) {
    Actions.getComponent({ id: this.props.id, type: type.name });
  },

  onSubmit: function onSubmit() {
    var parameters = Object.assign({}, this.state.component.parameters, this.customElement.state);
    var payload = {
      id: this.props.id,
      type: this.state.component.name,
      parameters: parameters
    };
    console.log("WRAPPER PAYLOAD", payload);
    //Actions.configureComponent(payload);
  },

  onCustomMounted: function onCustomMounted(element) {
    this.customElement = element;
  },

  setSelectionInDevices: function setSelectionInDevices(devices) {
    var result = [];
    var dataSets = this.state.component.parameters.plots ? this.state.component.parameters.plots : [];
    for (var i in devices) {
      var device = devices[i];
      var found = false;
      for (var t in dataSets) {
        var dSet = dataSets[t];
        if (dSet.device == device.deviceId) {
          result.push({ id: device.deviceId, type: device.typeId, active: true });
          found = true;
          break;
        }
      }
      if (!found) {
        result.push({ id: device.deviceId, type: device.typeId, active: false });
      }
    }
    return result;
  },

  // create a device list before we have the result of the devices call
  createDeviceListForPlots: function createDeviceListForPlots(component) {
    if (!component) component = this.state.component;
    var result = [];
    var dataSets = component.parameters.plots ? component.parameters.plots : [];
    for (var i in dataSets) {
      var device = dataSets[i];
      var found = result.filter(function (item) {
        return item.id == device.id;
      });
      if (found.length == 0) {
        result.push({ id: device.device, type: "", active: true });
      }
    }
    return result;
  },

  render: function render() {

    var self = this;
    var component = null;
    if (this.state.component) {
      var component = this.state.component;
      var customization = "";

      var customization = CustomizationWizard;

      customization = React.createElement(customization, Object.assign({}, { component: component }, { devices: this.state.devices, onChangeType: this.onChangeType, categories: this.state.categories, scheme: component.parameters.scheme, title: component.parameters.title, id: this.props.id, onSubmit: this.onSubmit, onCancel: this.onCancel, ref: this.onCustomMounted, nls: this.props.nls, theme: this.props.theme }));

      return customization;
    } else {
      return React.createElement('div', null);
      //return (<DashboardDialog theme={this.props.theme}>No components found</DashboardDialog>);
    }
  }
});

module.exports = ComponentCustomization;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/CardAction.jsx":62,"../../common/components/ColorSelection.jsx":72,"../../common/components/IconLink.jsx":77,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/stores/IoTFDeviceStore":99,"./Actions.jsx":41,"./CustomizationWizard.jsx":44,"./DashboardStore":47}],43:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Actions = require('./Actions.jsx');
var DashboardStore = require('./DashboardStore');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var CardAction = require('../../common/components/CardAction.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');

var RPT = React.PropTypes;

var styles = {
  component: {
    borderTop: "1px solid lightgrey",
    marginTop: "10px",
    marginBottom: "10px",
    clear: "both",
    overflow: "auto",
    cursor: "pointer"
  },
  componentNoLine: {
    marginTop: "10px",
    marginBottom: "10px",
    clear: "both",
    overflow: "auto",
    cursor: "pointer"
  },
  componentHeader: {
    fontSize: "18px",
    marginTop: "5px",
    marginBottom: "5px",
    float: "left"
  },
  componentDescription: {
    fontSize: "14px",
    clear: "left"
  },
  componentThumbnail: {
    width: "120px",
    marginBottom: "15px",
    marginTop: "15px",
    float: "right",
    marginLeft: "20px"
  },
  componentCustomization: {
    clear: "both"
  }
};

var ComponentSelection = React.createClass({
  displayName: 'ComponentSelection',

  propTypes: {
    id: RPT.string,
    action: RPT.string,
    style: RPT.object,
    nls: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      id: null,
      action: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      categories: null
    };
  },

  componentWillMount: function componentWillMount() {
    var DashboardStore = require('./DashboardStore');
    DashboardStore.listen(this.onModelUpdate);
    Actions.getCategories();
  },

  onModelUpdate: function onModelUpdate(payload) {
    var model = {};
    if (payload.categories) model.categories = payload.categories;
    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onCancel: function onCancel() {
    Actions.closeDialog();
  },

  onRemove: function onRemove() {
    Actions.removeComponent({
      id: this.props.id
    });
  },

  onSelect: function onSelect(component) {
    if (component.customization) {
      Actions.showDialog({
        id: this.props.id,
        type: component.name,
        action: 'modifyCard'
      });
    } else {
      var parameters = Object.assign({}, component.parameters);
      var payload = {
        id: this.props.id,
        type: component.name,
        parameters: parameters
      };
      Actions.configureComponent(payload);
    }
  },

  render: function render() {
    var DashboardDialog = require('../../common/components/Dialog.jsx');
    var Dialog = DashboardDialog.Dialog;
    var DialogButtons = DashboardDialog.DialogButtons;
    var DialogTab = DashboardDialog.DialogTab;

    var self = this;
    if (this.state.categories) {
      var headlines = Object.keys(this.state.categories);
      var compSelectionTitle = this.props.nls.resolve("COMP_SEL_Title");
      var compSelectionDescription = this.props.nls.resolve("COMP_SEL_Desc");

      return React.createElement(
        Dialog,
        { theme: this.props.theme, title: compSelectionTitle, description: compSelectionDescription },
        headlines.map(function (category) {
          return React.createElement(
            DialogTab,
            { id: category, theme: self.props.theme, label: category, cancel: self.props.nls.resolve('Cancel'), submit: self.props.nls.resolve('Submit'), key: category },
            self.state.categories[category].map(function (component, index) {
              return React.createElement(
                'div',
                { onClick: function onClick() {
                    self.onSelect(component);
                  }, style: index == 0 ? styles.componentNoLine : styles.component, key: index },
                React.createElement(
                  'div',
                  { style: styles.componentHeader },
                  self.props.nls.resolve(component.displayName)
                ),
                React.createElement('img', { style: styles.componentThumbnail, src: component.thumbnail }),
                React.createElement(
                  'div',
                  { style: styles.componentDescription },
                  self.props.nls.resolve(component.description)
                )
              );
            })
          );
        }),
        React.createElement(
          DialogButtons,
          null,
          React.createElement(ButtonText, { onClick: self.onRemove, text: this.props.nls.resolve('Remove'), key: 'Remove' }),
          React.createElement(ButtonText, { onClick: self.onCancel, text: this.props.nls.resolve('Cancel'), key: 'Cancel' })
        )
      );
    } else {
      return React.createElement('div', null);
      //return (<DashboardDialog theme={this.props.theme}>No components found</DashboardDialog>);
    }
  }
});

module.exports = ComponentSelection;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/ButtonText.jsx":61,"../../common/components/CardAction.jsx":62,"../../common/components/Dialog.jsx":74,"./Actions.jsx":41,"./DashboardStore":47}],44:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactWrapper = require('./ReactWrapper.jsx');
var DashboardStore = require('./DashboardStore');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var Actions = require('./Actions.jsx');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var IconLink = require('../../common/components/IconLink.jsx');
var CardAction = require('../../common/components/CardAction.jsx');
var DashboardDialog = require('../../common/components/Dialog.jsx');
var Dialog = DashboardDialog.Dialog;
var DialogTab = DashboardDialog.DialogTab;
var ButtonTab = DashboardDialog.ButtonTab;
var DialogButtons = DashboardDialog.DialogButtons;
var ColorSelection = require('../../common/components/ColorSelection.jsx');
var InputField = require('../../common/components/InputField.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var ComboBox = require('../../common/components/ComboBox.jsx');
var CheckBox = require('../../common/components/CheckBox.jsx');
var Utils = require('../util/Utils.js');
var SearchField = require('../../common/components/SearchField.jsx');
var Accordion = require('../../common/components/Accordion.jsx');
var Icon = require('../../common/components/Icon.jsx');

var RPT = React.PropTypes;

var styles = {
  componentHeader: {
    fontSize: "18px",
    marginTop: "5px",
    marginBottom: "5px",
    float: "left"
  },
  componentDescription: {
    fontSize: "14px",
    clear: "left"
  },
  componentThumbnail: {
    width: "120px",
    marginBottom: "15px",
    marginTop: "15px",
    float: "right",
    marginLeft: "20px"
  },
  inlineButtons: {
    clear: "both",
    marginBottom: "15px"
  },
  td: {
    padding: "5px 30px 5px 5px"
  },
  th: {
    padding: "5px 30px 5px 5px",
    textAlign: "left"
  },
  headerTr: {},
  twoFieldContainer: {
    position: "relative"
  },
  twoFieldsLeft: {
    width: "45%"
  },
  twoFieldsRight: {
    width: "45%",
    position: "absolute",
    right: "0px",
    top: "0px"
  },
  typeSelectionContainer: {
    width: "100%",
    height: "74px",
    whiteSpace: "nowrap"
  },
  typeSelectionTile: {
    width: "64px",
    height: "64px",
    position: "relative",
    padding: "16px",
    float: "left",
    boxSizing: "border-box",
    margin: "5px",
    border: "1px solid #EFEFEF",
    transition: "background 0.3s ease",
    cursor: "pointer"
  },
  typeSelectionImage: {
    width: "32px",
    height: "32px",
    display: "block",
    position: "relative",
    transition: "background 0.3s ease"
  },
  typeSelectionMarker: {
    position: "relative",
    bottom: "-1px",
    transition: "opacity 0.3s ease"
  },
  cardPreviewSeparator: {
    borderTop: "3px solid blue",
    width: "585px",
    position: "absolute",
    left: "-35px",
    height: "340px",
    backgroundColor: "whitesmoke"
  },
  cardPreview: {
    width: "100%",
    height: "280px",
    position: "relative",
    overflow: "auto"
  },
  previewContainer: {
    transformOrigin: "0% 0%",
    position: "relative",
    outlineOffset: "20px"
  },
  previewCover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    top: 0,
    left: 0
  },
  customFieldsContainer: {
    width: "470px",
    padding: "10px"
  },
  cardTabContainer: {
    borderBottom: "1px solid silver",
    fontSize: "16px",
    margin: "10px 0px",
    cursor: "pointer",
    position: "relative"
  },
  cardTab: {
    padding: "10px",
    display: "inline-block"
  },
  cardTabSelected: {
    borderBottom: "3px solid blue",
    color: "blue"
  },
  cardTabCheckmark: {
    marginLeft: "10px"
  }

};

var CustomizationWizard = React.createClass({
  displayName: 'CustomizationWizard',

  propTypes: {
    id: RPT.string,
    component: RPT.object,
    categories: RPT.object,
    onSubmit: RPT.func,
    onChangeType: RPT.func,
    onUpdate: RPT.func,
    scheme: RPT.number,
    title: RPT.string,
    style: RPT.object,
    nls: RPT.object,
    theme: RPT.object.isRequired,
    devices: RPT.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      id: null,
      title: "",
      scheme: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      title: this.props.title,
      description: this.props.component.parameters.description,
      color: this.props.component.parameters.color,
      component: this.props.component,
      plots: this.props.component.parameters.plots || [],
      devices: this.props.devices ? this.props.devices : [],
      categories: this.props.categories,
      cardTab: "0"
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    props.devices ? this.setState({ devices: props.devices }) : null;
    props.categories ? this.setState({ categories: props.categories }) : null;
    var component = Object.assign({}, this.state.component);
    // clear the customization
    component.customization = undefined;
    Object.assign(component, props.component);
    component.parameters.plots = this.state.plots;
    this.setState({ component: component });
    props.component.parameters.color ? this.setState({ color: props.component.parameters.color }) : null;
  },

  onChangeType: function onChangeType(name) {
    this.props.onChangeType(name);
  },

  onSubmit: function onSubmit() {
    var parameters = Object.assign({}, this.state.component.parameters, { title: this.state.title, description: this.state.description, color: this.state.color, plots: this.state.plots });
    if (this.customElement) {
      parameters = Object.assign({}, parameters, this.customElement.state);
    }
    var size = 0;
    if (this.state.previewSelect) {
      for (var i in this.state.component.sizes) {
        if (this.state.component.sizes[i] == this.state.previewSelect) {
          size = i;
          break;
        }
      }
    }
    var payload = {
      id: this.props.id,
      type: parameters.component,
      parameters: parameters,
      size: parseInt(size)
    };
    if (this.props.id === null) {
      Actions.addComponent(null, payload);
    } else {
      Actions.configureComponent(payload);
    }
  },

  onParamUpdate: function onParamUpdate(update) {
    var newParams = Object.assign({}, this.state.component.parameters, update);
    var newComp = Object.assign({}, this.state.component, { parameters: newParams });
    this.setState({ component: newComp });
  },

  onTitleChanged: function onTitleChanged(newTitle) {
    this.onParamUpdate({ title: newTitle });
    this.setState({
      title: newTitle
    });
    if (this.props.onUpdate) {
      this.props.onUpdate({ title: title });
    }
  },

  onDescriptionChanged: function onDescriptionChanged(desc) {
    this.onParamUpdate({ description: desc });
    this.setState({
      description: desc
    });
    if (this.props.onUpdate) {
      this.props.onUpdate({ desc: desc });
    }
  },

  onSchemeChanged: function onSchemeChanged(color) {
    this.onParamUpdate({ color: color });
    this.setState({
      color: color
    });
    if (this.props.onUpdate) {
      this.props.onUpdate({ color: color });
    }
  },

  onCardTypeChanged: function onCardTypeChanged(newCompType) {
    this.props.onChangeType(newCompType);
    this.onParamUpdate({ component: newCompType.name });
    if (this.props.onUpdate) {
      this.props.onUpdate({ cardType: newCompType });
    }
  },

  onDataSetChange: function onDataSetChange(payload) {
    var dataSets = this.state.plots;
    var newSets = [];
    dataSets.forEach(function (dSet) {
      if (dSet.id === payload.id) {
        newSet = Object.assign({}, dSet);
        newSet[payload.type] = payload.value;
        newSets.push(newSet);
      } else {
        newSets.push(dSet);
      }
    });
    this.setState({ plots: newSets });
  },

  onAddPlot: function onAddPlot(type) {
    var currPlots = this.state.plots;
    var emptyPlot = {
      "id": Utils.createUUID(),
      "device": type,
      "event": "",
      "property": "",
      "unit": "",
      "type": "string",
      "label": "New DataSet"
    };
    this.setState({
      plots: currPlots.concat([emptyPlot]),
      expandedDataPoint: emptyPlot.id
    });
  },

  onRemovePlot: function onRemovePlot(id) {
    var plots = this.state.plots;
    for (var i = 0; i < plots.length; i++) {
      var plot = plots[i];
      if (plot.id == id) {
        plots.splice(i, 1);
        this.setState({
          plots: plots
        });
      }
    }
  },

  onDeviceSelection: function onDeviceSelection(dev) {
    console.log("TODO", dev);
  },

  changeDeviceSourceStatus: function changeDeviceSourceStatus(name, val) {
    var newSources = this.state.devices.map(function (dev) {
      if (dev.id === name) {
        dev.active = val;
        return dev;
      } else {
        return dev;
      }
    });
    this.setState({ devices: newSources });
  },

  onDataSourceSearchChanged: function onDataSourceSearchChanged(value) {
    this.setState({
      dataSetFilter: value
    });
  },

  onExpand: function onExpand(id) {
    this.setState({
      expandedDataPoint: id
    });
  },

  generatePreviewComponent: function generatePreviewComponent(size) {
    var card = "";
    if (this.state.component) {
      var result = this.state.component;
      var layout = {
        width: size[0],
        height: size[1]
      };
      card = React.createElement(ReactWrapper, { theme: this.props.theme, nls: this.props.nls, id: result.id, parameters: result.parameters, sticky: true, type: result.name, layout: 'lg', width: layout.w, height: layout.h });
    }
    return card;
  },

  onPreviewSelect: function onPreviewSelect(size) {},

  onCustomMounted: function onCustomMounted(element) {
    this.customElement = element;
  },

  applyTheme: function applyTheme() {
    var theme = this.props.theme;
    Object.assign(styles.cardTabContainer, { borderBottomColor: theme.minor });
    Object.assign(styles.cardTabSelected, { borderBottomColor: theme.accent }, { color: theme.accent });
    Object.assign(styles.cardPreviewSeparator, { borderTopColor: theme.accent });
  },

  render: function render() {
    this.applyTheme();
    var self = this;
    var cardTitle = this.state.title;
    var cardDescription = this.state.description;
    var description = "";
    var plots = [{ id: 'No data points yet' }];
    var cardType = '';
    var colorScheme = this.state.color;

    if (this.state.component) {
      if (this.state.component.parameters) {
        description = this.state.component.parameters.description;
        plots = this.state.plots;
        cardType = this.state.component.name;
        colorScheme = this.state.component.parameters.color;
        // make sure we have the plots assigend if this is a new card
        this.state.component.parameters.plots = this.state.plots;
      }

      var cardTypes = [];
      if (this.state.categories) {
        cardTypes = this.state.categories.Devices;
      }

      var devices = this.state.devices;
      var filteredDevices = this.state.devices.filter(function (item) {
        return !self.state.dataSetFilter || item.id.toLowerCase().indexOf(self.state.dataSetFilter.toLowerCase()) > -1;
      });

      // handle custom fields per card type
      var component = this.state.component;
      if (component.customization) {
        var customization = IoTCustomization;
        var componentTokens = component.customization.split(".");
        for (var i in componentTokens) {
          customization = customization[componentTokens[i]];
        }
        customization = React.createElement(customization, Object.assign({}, component.parameters, { ref: this.onCustomMounted, nls: this.props.nls, theme: this.props.theme, style: styles.customFieldsContainer }));
      } else {
        customization = "";
        this.customElement = undefined;
      }

      var cardTabs = [];
      if (customization) {
        cardTabs.push({
          id: "###SETTINGS###",
          label: "Settings",
          onClick: function onClick() {
            self.setState({
              cardTab: "###SETTINGS###"
            });
          }
        });
      }
      for (var i in component.sizes) {
        var size = component.sizes[i];
        var label = "Preview ";
        if (size[0] == 1) {
          label += "S";
        } else if (size[0] == 2) {
          label += "M";
        } else if (size[0] > 2) {
          label += "L";
        }
        var getOnClick = function getOnClick(i) {
          return function () {
            self.setState({
              cardTab: i
            });
          };
        };

        cardTabs.push({
          id: i,
          label: label,
          size: size,
          onClick: getOnClick(i)
        });
      }

      var highlight = self.state.previewSelect;
      if (!highlight) {
        highlight = component.sizes[component.parameters.size["lg"]];
      }

      return React.createElement(
        Dialog,
        { theme: this.props.theme, title: 'Create Card', nls: this.props.nls, active: 'General', onSubmit: self.onSubmit },
        React.createElement(
          DialogTab,
          { id: 'General', theme: self.props.theme, label: 'Card information', description: 'Enter title and description of the card', status: 'active' },
          React.createElement(
            Label,
            { label: this.props.nls.resolve('CardTitle'), theme: this.props.theme },
            React.createElement(InputField, { theme: this.props.theme, onChange: this.onTitleChanged, initialValue: cardTitle })
          ),
          React.createElement(
            Label,
            { label: this.props.nls.resolve('CardDescription'), theme: this.props.theme },
            React.createElement(InputField, { theme: this.props.theme, onChange: this.onDescriptionChanged, initialValue: cardDescription })
          ),
          React.createElement(
            Label,
            { label: this.props.nls.resolve('ColorScheme'), theme: this.props.theme },
            React.createElement(ColorSelection, { theme: this.props.theme, onChange: this.onSchemeChanged, initialSelection: colorScheme })
          )
        ),
        React.createElement(
          DialogTab,
          { id: 'CardSourceData', theme: self.props.theme, label: 'Card source data', description: 'Specify the data source for the card', status: 'disabled' },
          React.createElement(
            Label,
            { label: this.props.nls.resolve('SearchDataSource'), theme: this.props.theme },
            React.createElement(SearchField, { theme: this.props.theme, onChange: this.onDataSourceSearchChanged })
          ),
          React.createElement(
            'table',
            null,
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement('th', { style: styles.th }),
                React.createElement(
                  'th',
                  { style: styles.th },
                  this.props.nls.resolve("DeviceID")
                ),
                React.createElement(
                  'th',
                  { style: styles.th },
                  this.props.nls.resolve("DeviceType")
                )
              ),
              filteredDevices.map(function (option) {
                var updateSourceUse = function updateSourceUse(isUsed) {
                  if (isUsed) {
                    self.changeDeviceSourceStatus(option.id, true);
                  } else {
                    self.changeDeviceSourceStatus(option.id, false);
                  }
                };
                return React.createElement(
                  'tr',
                  { key: option.id },
                  React.createElement(
                    'td',
                    { style: styles.td },
                    React.createElement(CheckBox, { checked: option.active, onChange: updateSourceUse })
                  ),
                  React.createElement(
                    'td',
                    { style: styles.td },
                    option.id
                  ),
                  React.createElement(
                    'td',
                    { style: styles.td },
                    option.type
                  )
                );
              })
            )
          )
        ),
        devices.map(function (dev) {
          if (dev.active) {
            var dSetCount = 0;
            var onAddPlot = function onAddPlot() {
              self.onAddPlot(dev.id);
            };
            return React.createElement(
              DialogTab,
              { subtab: 1, status: 'active', key: dev.id, id: dev.id, onRemove: self.onRemovePlot, theme: self.props.theme, nls: self.props.nls, label: dev.id, description: "Connect data set" },
              plots !== undefined ? plots.map(function (item) {
                var name = item.label ? item.label : '';
                var event = item.event ? item.event : '';
                var property = item.property ? item.property : '';
                var type = item.type ? item.type : 'string';
                var unit = item.unit ? item.unit : '';
                var minVal = item.min ? item.min : '';
                var maxVal = item.max ? item.max : '';
                var precision = item.precision ? item.precision : '';

                var onNameChange = function onNameChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'label', value: newVal });
                };
                var onEventChange = function onEventChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'event', value: newVal });
                };
                var onPropertyChange = function onPropertyChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'property', value: newVal });
                };
                var onTypeChange = function onTypeChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'type', value: newVal });
                };
                var onUnitChange = function onUnitChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'unit', value: newVal });
                };
                var onMinValChange = function onMinValChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'min', value: parseFloat(newVal) });
                };
                var onMaxValChange = function onMaxValChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'max', value: parseFloat(newVal) });
                };
                var onPrecisionChange = function onPrecisionChange(newVal) {
                  self.onDataSetChange({ id: item.id, type: 'precision', value: parseInt(newVal) });
                };
                if (dev.id === item.device) {
                  var minMaxElement = "";
                  var precisionElement = "";
                  var unitElement = "";

                  if (type == "integer" || type == "float") {
                    minMaxElement = React.createElement(
                      'div',
                      { style: styles.twoFieldContainer },
                      React.createElement(
                        'div',
                        { style: styles.twoFieldsLeft },
                        React.createElement(
                          Label,
                          { style: styles.twoFields, label: self.props.nls.resolve('CUST_DATASET_minValue'), theme: self.props.theme },
                          React.createElement(InputField, { type: 'number', theme: self.props.theme, onChange: onMinValChange, initialValue: minVal })
                        )
                      ),
                      React.createElement(
                        'div',
                        { style: styles.twoFieldsRight },
                        React.createElement(
                          Label,
                          { style: styles.twoFields, label: self.props.nls.resolve('CUST_DATASET_maxValue'), theme: self.props.theme },
                          React.createElement(InputField, { type: 'number', theme: self.props.theme, onChange: onMaxValChange, initialValue: maxVal })
                        )
                      )
                    );
                  }
                  if (type == "float") {
                    precisionElement = React.createElement(
                      Label,
                      { label: self.props.nls.resolve('CUST_DATASET_precision'), theme: self.props.theme },
                      React.createElement(InputField, { type: 'number', theme: self.props.theme, onChange: onPrecisionChange, initialValue: precision })
                    );
                  }
                  if (type != "boolean") {
                    unitElement = React.createElement(
                      Label,
                      { label: self.props.nls.resolve('CUST_DATASET_unit'), theme: self.props.theme },
                      React.createElement(
                        ComboBox,
                        { theme: self.props.theme, onChange: onUnitChange, initialValue: unit },
                        React.createElement(
                          Option,
                          { value: '°C', theme: self.props.theme },
                          '°C'
                        ),
                        React.createElement(
                          Option,
                          { value: '°F', theme: self.props.theme },
                          '°F'
                        ),
                        React.createElement(
                          Option,
                          { value: '%', theme: self.props.theme },
                          '%'
                        ),
                        React.createElement(
                          Option,
                          { value: 'Hz', theme: self.props.theme },
                          'Hz'
                        ),
                        React.createElement(
                          Option,
                          { value: 'A', theme: self.props.theme },
                          'A'
                        ),
                        React.createElement(
                          Option,
                          { value: 'V', theme: self.props.theme },
                          'V'
                        ),
                        React.createElement(
                          Option,
                          { value: 'W', theme: self.props.theme },
                          'W'
                        ),
                        React.createElement(
                          Option,
                          { value: 'VA', theme: self.props.theme },
                          'VA'
                        ),
                        React.createElement(
                          Option,
                          { value: 'Wh', theme: self.props.theme },
                          'Wh'
                        ),
                        React.createElement(
                          Option,
                          { value: 'kWh', theme: self.props.theme },
                          'kWh'
                        ),
                        React.createElement(
                          Option,
                          { value: '°', theme: self.props.theme },
                          '°'
                        ),
                        React.createElement(
                          Option,
                          { value: 's', theme: self.props.theme },
                          's'
                        ),
                        React.createElement(
                          Option,
                          { value: 'min', theme: self.props.theme },
                          'min'
                        ),
                        React.createElement(
                          Option,
                          { value: 'h', theme: self.props.theme },
                          'h'
                        ),
                        React.createElement(
                          Option,
                          { value: 'd', theme: self.props.theme },
                          'd'
                        ),
                        React.createElement(
                          Option,
                          { value: 'Ohm', theme: self.props.theme },
                          'Ohm'
                        ),
                        React.createElement(
                          Option,
                          { value: 'lx', theme: self.props.theme },
                          'lx'
                        ),
                        React.createElement(
                          Option,
                          { value: 'bar', theme: self.props.theme },
                          'bar'
                        ),
                        React.createElement(
                          Option,
                          { value: 'm', theme: self.props.theme },
                          'm'
                        ),
                        React.createElement(
                          Option,
                          { value: 'gallon', theme: self.props.theme },
                          'gallon'
                        ),
                        React.createElement(
                          Option,
                          { value: 'rpm', theme: self.props.theme },
                          'rpm'
                        ),
                        React.createElement(
                          Option,
                          { value: 'ppm', theme: self.props.theme },
                          'ppm'
                        ),
                        React.createElement(
                          Option,
                          { value: 'km/h', theme: self.props.theme },
                          'km/h'
                        ),
                        React.createElement(
                          Option,
                          { value: 'mbar', theme: self.props.theme },
                          'mbar'
                        ),
                        React.createElement(
                          Option,
                          { value: 'mm', theme: self.props.theme },
                          'mm'
                        ),
                        React.createElement(
                          Option,
                          { value: 'hPa', theme: self.props.theme },
                          'hPa'
                        )
                      )
                    );
                  }
                  return React.createElement(
                    Accordion,
                    { theme: self.props.theme, key: item.id, id: item.id, label: name, onRemove: self.onRemovePlot, onExpand: self.onExpand, expanded: self.state.expandedDataPoint == item.id },
                    React.createElement(
                      'div',
                      null,
                      React.createElement(
                        Label,
                        { label: self.props.nls.resolve('CUST_DATASET_name'), theme: self.props.theme },
                        React.createElement(InputField, { theme: self.props.theme, onChange: onNameChange, initialValue: name })
                      ),
                      React.createElement(
                        Label,
                        { label: self.props.nls.resolve('CUST_DATASET_event'), theme: self.props.theme },
                        React.createElement(InputField, { theme: self.props.theme, onChange: onEventChange, initialValue: event })
                      ),
                      React.createElement(
                        Label,
                        { label: self.props.nls.resolve('CUST_DATASET_property'), theme: self.props.theme },
                        React.createElement(InputField, { theme: self.props.theme, onChange: onPropertyChange, initialValue: property })
                      ),
                      React.createElement(
                        'div',
                        { style: styles.twoFieldContainer },
                        React.createElement(
                          'div',
                          { style: styles.twoFieldsLeft },
                          React.createElement(
                            Label,
                            { label: self.props.nls.resolve('CUST_DATASET_type'), theme: self.props.theme },
                            React.createElement(
                              Select,
                              { onChange: onTypeChange, value: type },
                              React.createElement(
                                Option,
                                { value: "string" },
                                self.props.nls.resolve('type_string')
                              ),
                              React.createElement(
                                Option,
                                { value: "integer" },
                                self.props.nls.resolve('type_integer')
                              ),
                              React.createElement(
                                Option,
                                { value: "float" },
                                self.props.nls.resolve('type_float')
                              ),
                              React.createElement(
                                Option,
                                { value: "boolean" },
                                self.props.nls.resolve('type_boolean')
                              )
                            )
                          )
                        ),
                        React.createElement(
                          'div',
                          { style: styles.twoFieldsRight },
                          unitElement
                        )
                      ),
                      minMaxElement,
                      React.createElement(
                        'div',
                        { style: styles.twoFieldsLeft },
                        precisionElement
                      )
                    )
                  );
                } else {
                  return React.createElement('div', null);
                }
              }) : '',
              React.createElement(
                IconLink,
                { id: 'AddPlot', action: onAddPlot, theme: self.props.theme, color: self.props.theme.accent, icon: 'add-circle-outline' },
                self.props.nls.resolve('CUST_DATASET_add')
              )
            );
          } else {
            return React.createElement('div', null);
          }
        }),
        React.createElement(
          DialogTab,
          { isSubmitTab: true, id: 'CardType', theme: self.props.theme, label: 'Card type & preview', description: 'Select the card type and specify additional information', status: 'disabled' },
          React.createElement(
            'div',
            { style: styles.typeSelectionContainer },
            cardTypes.map(function (item) {
              return React.createElement(
                'div',
                { style: Object.assign({}, styles.typeSelectionTile, item.name == cardType ? { backgroundColor: self.props.theme.accent } : {}), onClick: function onClick() {
                    self.onCardTypeChanged(item);
                  } },
                React.createElement('img', { style: Object.assign({}, styles.typeSelectionImage), src: item.thumbnail }),
                React.createElement(Icon, { style: Object.assign({}, styles.typeSelectionMarker, item.name == cardType ? { opacity: 1 } : { opacity: 0 }), icon: "arrow-drop-up", size: 32, color: self.props.theme.accent, theme: self.props.theme })
              );
            })
          ),
          React.createElement('div', { style: styles.cardPreviewSeparator }),
          React.createElement(
            'div',
            { style: Object.assign({}, styles.cardTabContainer) },
            cardTabs.map(function (tab) {
              var checkmark = "";
              if (highlight == tab.size && tab.id != "###SETTINGS###") {
                checkmark = React.createElement(Icon, { style: styles.cardTabCheckmark, icon: 'check', color: self.props.theme.accent, size: '16', theme: self.props.theme });
              }
              return React.createElement(
                'div',
                { onClick: tab.onClick, style: Object.assign({}, styles.cardTab, self.state.cardTab == tab.id ? styles.cardTabSelected : {}) },
                tab.label,
                checkmark
              );
            })
          ),
          React.createElement(
            'div',
            { style: Object.assign({}, styles.cardPreview, { borderColor: this.props.theme.accent }) },
            cardTabs.map(function (tab) {
              if (self.state.cardTab == tab.id) {
                if (tab.id == "###SETTINGS###") {
                  if (customization) {
                    return customization;
                  }
                } else {
                  var sizeIndex = 0;
                  if (parseInt(tab.id) < component.sizes.length) {
                    sizeIndex = tab.id;
                  }
                  var size = component.sizes[sizeIndex];
                  var height = size[1] * 120;
                  var width = size[0] * 120 * 4;
                  var factor = Math.min(1, 450 / width);
                  factor = Math.min(factor, 270 / height);
                  var style = Object.assign({}, styles.previewContainer, { transform: 'scale(' + factor + ')', width: width + 'px', height: height + 'px' });

                  var onPreviewSelect = function onPreviewSelect() {
                    self.onPreviewSelect(size);
                    self.setState({
                      previewSelect: size
                    });
                  };
                  if (highlight == size) {
                    //style = Object.assign(style, {outline: '10px solid ' + self.props.theme.accent});
                  } else {
                      style = Object.assign(style, { outline: 'none' });
                    }
                  return React.createElement(
                    'div',
                    { style: style },
                    self.generatePreviewComponent(size),
                    React.createElement('div', { style: styles.previewCover, onClick: onPreviewSelect })
                  );
                }
              }
            })
          )
        )
      );
    } else {
      return React.createElement('div', null);
    }
  }
});

module.exports = CustomizationWizard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Accordion.jsx":58,"../../common/components/ButtonText.jsx":61,"../../common/components/CardAction.jsx":62,"../../common/components/CheckBox.jsx":71,"../../common/components/ColorSelection.jsx":72,"../../common/components/ComboBox.jsx":73,"../../common/components/Dialog.jsx":74,"../../common/components/Icon.jsx":76,"../../common/components/IconLink.jsx":77,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"../../common/components/Option.jsx":84,"../../common/components/SearchField.jsx":86,"../../common/components/Select.jsx":88,"../../common/stores/IoTFDeviceStore":99,"../util/Utils.js":56,"./Actions.jsx":41,"./DashboardStore":47,"./ReactWrapper.jsx":50}],45:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ResponsiveReactGridLayout = (typeof window !== "undefined" ? window['ReactGridLayout'] : typeof global !== "undefined" ? global['ReactGridLayout'] : null).Responsive;

var DashboardStore = require('./DashboardStore');
var Utils = require('./DashboardUtils');
var ReactWrapper = require('./ReactWrapper.jsx');
var Actions = require('./Actions.jsx');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var RPT = React.PropTypes;

/*
 *  Dashboard component
 *
 */
var styles = {
  canvas: {
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    color: "#EDEDED"
  },
  container: {
    backgroundColor: "#0d1111",
    width: "100%",
    height: "100%"
  },
  loading: {
    fontSize: "28px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    padding: "20px"
  }
};

var DashboardCanvas = React.createClass({
  displayName: 'DashboardCanvas',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    nls: RPT.object
  },

  applyTheme: function applyTheme() {
    var t = this.props.theme;
    if (t) {
      styles.canvas.fontFamily = t.font;
      styles.canvas.color = t.major;
      styles.canvas.backgroundColor = t.canvas;
      styles.container.backgroundColor = t.canvas;
      styles.loading.fontFamily = t.font;
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  getInitialState: function getInitialState() {
    return {
      config: null,
      dashboard: null,
      components: null,
      layout: "lg"
    };
  },

  componentDidMount: function componentDidMount() {
    var self = this;

    this.breakpoints = Utils.getCapability("breakpoints");
    this.cols = Utils.getCapability("cols");
    this.rowHeight = Utils.getCapability("rowHeight");
    this.margin = Utils.getCapability("margin");

    DashboardStore.listen(this.onModelUpdate), Actions.loadConfig();
    Actions.loadDashboard();
  },

  onModelUpdate: function onModelUpdate(payload) {
    var model = {};
    if (payload.config) model.config = payload.config;
    if (payload.dashboard) model.dashboard = payload.dashboard;
    if (payload.components) model.components = payload.components;

    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onBreakpointChange: function onBreakpointChange(breakpoint) {
    console.log("Breakpoint changed: " + breakpoint);
    Actions.setBreakpoint(breakpoint);
    this.setState({
      layout: breakpoint
    });
  },

  onLayoutChange: function onLayoutChange(currentLayout, allLayouts) {
    console.log("Layout changed");
    Actions.storeLayouts(allLayouts);
  },

  onResizeStop: function onResizeStop(payload) {
    console.log("Size changed");
    console.log(payload);
  },

  onGridMounted: function onGridMounted(grid) {
    //Actions.setBreakpoint(grid.state.breakpoint);
  },

  mergeSchemeIntoTheme: function mergeSchemeIntoTheme(theme, schemeName) {
    var scheme = {};
    schemeName = schemeName ? schemeName : 0;
    if (theme.schemes.length > schemeName) {
      scheme = theme.schemes[schemeName];
    }

    return Object.assign({}, theme, scheme);
  },

  onDrag: function onDrag(layout, oldL, l, placeholder, e) {
    // console.log(layout, oldL, l, placeholder, e);
    // var x = e.layerX;
    // var y = e.layerY;
    //console.log(l);
  },

  render: function render() {
    this.applyTheme();

    var node = null;
    var self = this;
    if (this.state.components) {
      var layouts = this.state.dashboard.layouts;
      node = React.createElement(
        ResponsiveReactGridLayout,
        {
          style: styles.canvas,
          ref: this.onGridMounted,
          breakpoints: this.breakpoints,
          cols: this.cols,
          className: 'layout',
          layouts: layouts,
          rowHeight: this.rowHeight,
          margin: this.margin,
          verticalCompact: true,
          autoSize: true,
          onBreakpointChange: this.onBreakpointChange,
          onLayoutChange: this.onLayoutChange,
          onResizeStop: this.onResizeStop,
          isDraggable: true,
          isResizable: false,
          onDrag: this.onDrag,
          draggableHandle: '.wrapper-title'
        },
        this.state.components.map(function (result) {
          var layout = DashboardStore.getLayoutForElement(self.state.dashboard, self.state.layout, result.id);

          // adapt the theme to reflect the color scheme of the card
          var theme = self.mergeSchemeIntoTheme(self.props.theme, result.parameters.scheme);
          return React.createElement(
            'div',
            { key: result.id, style: styles.container },
            React.createElement(ReactWrapper, { theme: theme, nls: self.props.nls, id: result.id, inbound: result.inbound, outbound: result.outbound, parameters: result.parameters, sticky: result.sticky, type: result.name, layout: self.state.layout, width: layout.w, height: layout.h })
          );
        })
      );
    } else {
      node = React.createElement(
        'div',
        { style: styles.loading },
        'Loading...'
      );
    }
    return node;
  }
});

module.exports = DashboardCanvas;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Actions.jsx":41,"./DashboardStore":47,"./DashboardUtils":48,"./ReactWrapper.jsx":50}],46:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var DashboardStore = require('./DashboardStore');
var Utils = require('./DashboardUtils');
var Actions = require('./Actions.jsx');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var IconLink = require('../../common/components/IconLink.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var RPT = React.PropTypes;

/*
 *  Dashboard component
 *
 */
var styles = {
  container: {
    fontSize: "14px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    color: "#e0e0e0",
    backgroundColor: "transparent",
    margin: "10px 10px 0px 10px",
    padding: "10px",
    position: "relative",
    zIndex: "10"
  },

  actions: {
    float: "right",
    marginLeft: "20px"
  },

  actionContainer: {
    position: "absolute",
    top: "0px",
    right: "10px"
  },
  pageContainer: {
    position: "absolute",
    top: "0px",
    left: "10px"
  },

  selection: {
    width: "300px",
    float: "right",
    marginLeft: "20px",
    position: "relative",
    top: "-10px"
  }
};

var DashboardControl = React.createClass({
  displayName: 'DashboardControl',

  propTypes: {
    organization: RPT.string,
    configurable: RPT.bool,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  applyTheme: function applyTheme() {
    var t = this.props.theme;
    if (t) {
      styles.container.fontFamily = t.font;
      styles.container.color = t.lightText;
      styles.container.backgroundColor = t.content;
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      organization: "Unkown",
      configurable: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      history: 0
    };
  },

  componentDidMount: function componentDidMount() {
    DashboardStore.listen(this.onModelUpdate);
  },

  onModelUpdate: function onModelUpdate(payload) {
    var model = {};
    if (payload.history) model.history = payload.history;
    if (payload.dashboard) model.dashboard = payload.dashboard;
    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onUndo: function onUndo() {
    Actions.undo();
  },

  onRestore: function onRestore() {
    Actions.restore();
  },

  onSave: function onSave() {
    Actions.save();
  },

  onAddDashboard: function onAddDashboard() {
    Actions.showDialog({
      id: null,
      action: 'modifyPage'
    });
  },

  onRemoveDashboard: function onRemoveDashboard() {
    Actions.removeDashboard();
  },

  onAdd: function onAdd() {
    //Actions.addComponent();
    Actions.showDialog({
      id: null,
      action: 'addCard'
    });
  },

  onDashboardChange: function onDashboardChange(value) {
    Actions.loadDashboard(value);
    Actions.getComponents();
  },

  render: function render() {
    var node = null;
    var self = this;
    var undo = "";
    var configure = "";
    var save = "";
    var restore = "";
    var add = "";
    var addDashboard = "";
    var removeDashboard = "";
    var selection = "";

    if (this.state.history > 1) {
      undo = React.createElement(
        IconLink,
        { theme: this.props.theme, color: this.props.theme.lightText, icon: 'undo', size: 24, style: styles.actions, action: this.onUndo },
        'Undo'
      );
      save = React.createElement(
        IconLink,
        { theme: this.props.theme, color: this.props.theme.lightText, icon: 'save', size: 24, style: styles.actions, action: this.onSave },
        'Save'
      );
      restore = React.createElement(
        IconLink,
        { theme: this.props.theme, color: this.props.theme.lightText, icon: 'restore', size: 24, style: styles.actions, action: this.onRestore },
        'Restore'
      );
    }
    if (this.props.configurable) {
      configure = React.createElement(
        IconLink,
        { theme: this.props.theme, color: this.props.theme.lightText, icon: 'settings', size: 24, style: styles.actions, action: this.onConfigure },
        'Configure dashboard'
      );
      add = React.createElement(
        IconLink,
        { theme: this.props.theme, color: this.props.theme.lightText, icon: 'add-circle-outline', size: 24, style: styles.actions, action: this.onAdd },
        'Add card'
      );
    }

    var dashboards = DashboardStore.getDashboards();
    var self = this;

    if (Utils.getCapability("multiplePages")) {
      selection = React.createElement(
        Select,
        { theme: this.props.theme, onChange: this.onDashboardChange, dummy: self.state.dashboard, value: self.state.dashboard ? self.state.dashboard.name : null },
        dashboards.map(function (option) {
          return React.createElement(
            Option,
            { key: option.name, value: option.name },
            option.label
          );
        })
      );

      addDashboard = React.createElement(
        IconLink,
        { theme: this.props.theme, color: this.props.theme.lightText, icon: 'add-circle-outline', size: 24, style: styles.actions, action: this.onAddDashboard },
        'Add page'
      );
      if (dashboards.length > 1 && this.state.dashboard && DashboardStore.getSettings("defaultDashboard") != this.state.dashboard.name) {
        removeDashboard = React.createElement(
          IconLink,
          { theme: this.props.theme, color: this.props.theme.lightText, icon: 'delete', size: 24, style: styles.actions, action: this.onRemoveDashboard },
          'Remove page'
        );
      }
    }

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'div',
        { style: styles.actionContainer },
        save,
        restore,
        undo,
        add
      ),
      React.createElement(
        'div',
        { style: styles.pageContainer },
        React.createElement(
          'div',
          { style: styles.selection },
          selection
        ),
        removeDashboard,
        addDashboard
      ),
      this.props.children
    );
  }
});

module.exports = DashboardControl;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/IconLink.jsx":77,"../../common/components/Option.jsx":84,"../../common/components/Select.jsx":88,"./Actions.jsx":41,"./DashboardStore":47,"./DashboardUtils":48}],47:[function(require,module,exports){
(function (global){
'use strict';

var Actions = require('./Actions.jsx');
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var ReactGridLayout = (typeof window !== "undefined" ? window['ReactGridLayout'] : typeof global !== "undefined" ? global['ReactGridLayout'] : null);
var RGLUtil = (typeof window !== "undefined" ? window['ReactGridLayoutUtils'] : typeof global !== "undefined" ? global['ReactGridLayoutUtils'] : null);
var config = require('./config/DashboardConfig.json');
var defaultDashboards = require('./config/Dashboards.json');
//var ConfigStore = require('../../common/stores/ConfigStore');
var Utils = require('./DashboardUtils');

// TODO Dynamic require does not work currently because of browserify. We add all components here until
// we have a solution
window.IoTCards = {};
window.IoTCustomization = {};

IoTCards.Gauge = require('../cards/Gauge.jsx');
IoTCards.UsageDeviceCard = require('../cards/UsageDeviceCard.jsx');
IoTCards.UsageDataCard = require('../cards/UsageDataCard.jsx');
IoTCards.UsageStorageCard = require('../cards/UsageStorageCard.jsx');
IoTCards.DeviceTypes = require('../cards/DeviceTypes.jsx');
IoTCards.BarChart = require('../cards/BarChart.jsx');
IoTCards.DonutChart = require('../cards/DonutChart.jsx');
IoTCards.Value = require('../cards/Value.jsx');

IoTCards.StaticChart = require('../cards/StaticChart.jsx');
IoTCards.EmptyComponent = require('../cards/EmptyComponent.jsx');
IoTCards.Webcam = require('../cards/Webcam.jsx');
IoTCards.SimpleTextCard = require('../cards/SimpleTextCard.jsx');
IoTCards.ImageCard = require('../cards/ImageCard.jsx');
IoTCards.SimpleSlider = require('../cards/SimpleSlider.jsx');
IoTCards.UserCardTable = require('../cards/UserCardTable.jsx');
IoTCards.TableUser = require('../cards/TableUser.jsx');
IoTCards.PushButtonCard = require('../cards/PushButtonCard.jsx');
IoTCards.DashboardLink = require('../cards/DashboardLink.jsx');
IoTCards.RouterLink = require('../cards/RouterLink.jsx');
IoTCards.DeviceMap = require('../cards/DeviceMap.jsx');
IoTCards.TestComponent = require('../cards/TestComponent.jsx');
IoTCards.HorizontalLine = require('../cards/HorizontalLine.jsx');
IoTCards.UserDetails = require('../cards/UserDetails.jsx');
IoTCards.RealTimeChart = require('../cards/RealTimeChart.jsx');
IoTCards.ConfigSSO = require('../cards/ConfigSSO.jsx');
IoTCards.AddMember = require('../cards/AddMember.jsx');
IoTCards.Login = require('../cards/Login.jsx');
IoTCards.SSOSignIn = require('../cards/SSOSignIn.jsx');
IoTCards.AAAUserDetails = require('../cards/AAAUserDetails.jsx');
IoTCards.Container = require('../cards/Container.jsx');
IoTCards.PV = require('../cards/PV.jsx');

IoTCustomization.RealTimeChartProperties = require('../customization/RealTimeChartProperties.jsx');
IoTCustomization.BarChartProperties = require('../customization/BarChartProperties.jsx');
IoTCustomization.GaugeProperties = require('../customization/GaugeProperties.jsx');
IoTCustomization.SingleValueProperties = require('../customization/SingleValueProperties.jsx');

var DashboardStore = Reflux.createStore({
  configName: "MyTestConfig114",
  config: null,
  dashboard: null,
  history: null,
  backupLayout: null,
  breakpoint: "lg",
  emptyDashboard: {
    "name": "NewDashboard",
    "label": "New Dashboard",
    "icon": "res/images/icons/smarterHome()/gs7.png",
    "image": "res/images/groups/default.jpg",
    "thumb": "res/images/groups/smarterHome()/g7.png",
    "hidden": false,
    "type": "TILE",
    "locked": false,
    "preset": false,
    "layouts": {
      "lg": [],
      "md": [],
      "sm": []
    },
    "components": []
  },

  setDashboardConfig: function setDashboardConfig(temp) {
    config = temp;
  },

  setDefaultDashboard: function setDefaultDashboard(temp) {
    defaultDashboards = temp;
  },

  getConfig: function getConfig() {
    return config;
  },

  init: function init() {
    this.history = [];

    // listen to config store
    //ConfigStore.listen(this.onRemoteConfig);

    // listen to actions
    this.listenTo(Actions.loadConfig, this.onLoadConfig);
    this.listenTo(Actions.loadDashboard, this.onLoadDashboard);
    this.listenTo(Actions.getComponents, this.onGetComponents);
    this.listenTo(Actions.storeLayouts, this.onStoreLayouts);
    this.listenTo(Actions.undo, this.onUndo);
    this.listenTo(Actions.expandCard, this.onExpandCard);
    this.listenTo(Actions.shrinkCard, this.onShrinkCard);
    this.listenTo(Actions.setBreakpoint, this.onSetBreakpoint);
    this.listenTo(Actions.customAction, this.onCustomAction);
    this.listenTo(Actions.save, this.onSave);
    this.listenTo(Actions.restore, this.onRestore);
    this.listenTo(Actions.addComponent, this.onAddComponent);
    this.listenTo(Actions.showDialog, this.onShowDialog);
    this.listenTo(Actions.configureComponent, this.onConfigureComponent);
    this.listenTo(Actions.getCategories, this.onGetCategories);
    this.listenTo(Actions.closeDialog, this.onCloseDialog);
    this.listenTo(Actions.getComponent, this.onGetComponent);
    this.listenTo(Actions.removeComponent, this.onRemoveComponent);
    this.listenTo(Actions.notify, this.onNotify);
    this.listenTo(Actions.navigateRoute, this.onNavigateRoute);
    this.listenTo(Actions.addDashboard, this.onAddDashboard);
    this.listenTo(Actions.removeDashboard, this.onRemoveDashboard);
    this.listenTo(Actions.changeCardSize, this.onChangeCardSize);

    this.listenTo(Actions.showDialogConfigSSO, this.onShowDialogConfigSSO);
    this.listenTo(Actions.submitSSOData, this.onSubmitSSOData);

    this.listenTo(Actions.showDialogAAAUserDetails, this.onShowDialogAAAUserDetails);
    //    this.listenTo(Actions.submitAAAUserDetailsData, this.onSubmitAAAUserDetailsData);
    this.listenTo(Actions.showDialogSSOSignIn, this.onShowDialogSSOSignIn);
    this.listenTo(Actions.submitSSOSignInData, this.onSubmitSSOSignInData);
    this.listenTo(Actions.showDialogLogin, this.onShowDialogLogin);
    //    this.listenTo(Actions.submitLoginData, this.onSubmitLoginData);
    this.listenTo(Actions.showDialogAddMember, this.onShowDialogAddMember);
    //    this.listenTo(Actions.submitAddMemberData, this.onSubmitAddMemberData);
  },

  getTheme: function getTheme() {
    return config.theme;
  },

  getDashboards: function getDashboards() {
    var list = [];
    if (this.dashboards) {
      list = this.dashboards.dashboards;
    }
    return list;
  },

  getDashboard: function getDashboard() {
    return this.dashboard;
  },

  getSettings: function getSettings(key) {
    if (this.dashboards && this.dashboards.settings) {
      return this.dashboards.settings[key];
    } else {
      return null;
    }
  },

  getEmptyDashboard: function getEmptyDashboard() {
    return Object.assign({}, JSON.parse(JSON.stringify(this.emptyDashboard)), { name: this.createUUID() });
  },

  getLayoutForElement: function getLayoutForElement(dashboard, layout, id) {
    //if (!dashboard || !layout || !id) throw new Error("Error");
    var temp = dashboard.layouts[layout];
    for (var i in temp) {
      var item = temp[i];
      if (item.i == id) {
        return item;
      }
    }
  },

  onCustomAction: function onCustomAction(payload) {
    alert(payload);
  },

  onNotify: function onNotify(payload) {
    this.trigger({ notification: payload });
  },

  onNavigateRoute: function onNavigateRoute(payload) {
    alert("Routing to: " + payload);
  },

  onLoadConfig: function onLoadConfig() {
    if (!this.config) {
      this.config = config;
    }
    this.trigger({ config: this.config });
  },

  onLoadDashboard: function onLoadDashboard(target) {
    this.history = [];
    this.backupLayout = null;

    // Load the full set of dashboards
    if (!this.dashboards) {
      if (global.localStorage) {
        try {
          this.dashboards = JSON.parse(global.localStorage.getItem('Dashboard_' + this.configName));
        } catch (e) {}
      }
      if (this.dashboards) {
        // if there is a new default dashboard, take it
        if (defaultDashboards.configTimestamp > this.dashboards.configTimestamp) {
          this.dashboards = null;
        }
      }
      if (!this.dashboards) {
        this.dashboards = defaultDashboards;
      }

      // Start with the local dashboard but check if there is a new remote dashboard
      /*
         ConfigStore.Actions.getConfig({
           name: this.configName, // hardcoded name for the time being
           data: this.dashboards,
           lastChange: this.dashboards?this.dashboards.configTimestamp:0
         });
      */
    }

    var dashboard = this.dashboards.dashboards[0];

    // Find the right dashboard
    var name = null;
    if (target) {
      name = target;
    } else if (!name && this.dashboards.settings && this.dashboards.settings.defaultDashboard) {
      name = this.dashboards.settings.defaultDashboard;
    }

    if (name) {
      var temp = this.getDashboardByName(name);
      if (temp) {
        dashboard = temp;
      }
    }

    this.dashboard = dashboard;

    this.onGetComponents();

    this.trigger({ dashboard: this.dashboard });
  },

  onRemoteConfig: function onRemoteConfig(payload) {
    if (payload.error) {
      console.log("Error loading remote config: " + payload.error);
    } else if (payload.configs) {} else if (payload.config) {
      // current dashboard name
      var target = this.dashboard ? this.dashboard.name : null;

      // HACK: Disable this to overwrite the remote dashboard with the local copy
      if (false) {
        this.dashboards = payload.config;
        this.dashboard = this.dashboards[0];
      } else {
        this.dashboards.configTimestamp = payload.config.configTimestamp;
      }

      var name = null;

      if (target) {
        name = target;
      } else if (!name && this.dashboards.settings && this.dashboards.settings.defaultDashboard) {
        name = this.dashboards.settings.defaultDashboard;
      }

      if (name) {
        var temp = this.getDashboardByName(name);
        if (temp) {
          dashboard = temp;
        }
      }

      this.dashboard = dashboard;

      this.onGetComponents();

      this.trigger({ dashboard: this.dashboard });
    }
  },

  onUndo: function onUndo() {
    if (this.history.length > 1) {
      this.history.pop();
      this.dashboard = JSON.parse(this.history[this.history.length - 1]);
      this.onGetComponents();
      this.trigger({ dashboard: this.dashboard, history: this.history.length });
    }
  },

  onSave: function onSave() {
    this.persistDashboard();
  },

  onAddDashboard: function onAddDashboard(payload) {
    this.addDashboard(payload.dashboard);
    this.dashboard = payload.dashboard;
    this.persistDashboard();
    this.onCloseDialog();
    this.onLoadDashboard(this.dashboard.name);
    this.onAddComponent(null, { type: "BarChart", params: {
        "component": "BarChart",
        "title": "New Card",
        "size": {
          "sm": 0,
          "md": 0,
          "lg": 0
        }

      } });
  },

  onRemoveDashboard: function onRemoveDashboard() {
    this.removeDashboardByName(this.dashboard.name);
    this.dashboard = this.dashboards.dashboards[0];
    this.persistDashboard();
    this.onLoadDashboard(this.dashboard.name);
  },

  getComponent: function getComponent(id) {
    for (var i in this.dashboard.components) {
      var component = this.dashboard.components[i];
      if (component.id == id) {
        return component;
      }
    }
    return null;
  },

  onAddComponent: function onAddComponent(parent, payload) {
    var layouts,
        components,
        container = null;

    if (parent) {
      container = this.getComponent(parent);
      components = container.parameters.components;
      layouts = container.parameters.layouts;
    } else {
      layouts = this.dashboard.layouts;
      components = this.dashboard.components;
    }

    // get empty component
    var definition = this.getComponentDefinitionForType(payload.type);
    console.log(definition);
    var uuid = this.createUUID();
    // add component to all layouts
    for (var breakpoint in layouts) {
      var layout = layouts[breakpoint];
      if (layout) {
        var entry = {};
        entry.w = definition.sizes[0][0];
        entry.h = definition.sizes[0][1];
        entry.x = 0;
        entry.y = 0;
        entry.i = uuid;
        layout.unshift(entry);
        layout = RGLUtil.compact(layout, true);
        layouts[breakpoint] = layout;
      }
    }

    var compParams = Object.assign({}, {
      "size": {
        "sm": 0,
        "md": 0,
        "lg": 0
      }
    }, payload.parameters);
    console.log(components);
    // add component to dashboard
    var entry = {
      "id": uuid,
      "type": definition.name,
      "parameters": compParams
    };
    console.log("HERE THE NEW COMPONENT", entry);
    components.unshift(entry);

    // handle size preset
    if (payload.size) {
      entry.parameters.size[this.breakpoint] = payload.size;
      var size = definition.sizes[payload.size];
      var layoutEntry = this.getLayoutForElement(this.dashboard, this.breakpoint, entry.id);
      layoutEntry.w = size[0];
      layoutEntry.h = size[1];
    }

    this.onGetComponents();
    this.trigger({ dashboard: this.dashboard, history: this.history.length, dialog: 'none' });
  },

  onRestore: function onRestore() {
    if (this.history.length > 0) {
      var text = this.history[0];
      this.cleanup();
      this.dashboard = JSON.parse(text);
      this.history.push(text);
      this.onGetComponents();
      this.trigger({ dashboard: this.dashboard, history: this.history.length });
    }
  },

  onShowDialog: function onShowDialog(payload) {
    if (payload.action == "addPage") {
      this.trigger({ dialog: {
          dialog: "PageCustomization",
          id: null
        } });
    } else if (payload.action == "modifyPage") {
      this.trigger({ dialog: {
          dialog: "PageCustomization",
          id: payload.id
        } });
    } else if (payload.action == "modifyCard" && payload.type) {
      console.log(payload.type);
      this.trigger({ dialog: {
          dialog: "ComponentCustomization",
          type: payload.type,
          action: payload.action,
          id: payload.id
        } });
    } else if (payload.action == "addCard" || payload.action == "modifyCard" && !payload.type) {
      this.trigger({ dialog: {
          dialog: "ComponentCustomization",
          type: 'BarChart',
          action: payload.action,
          id: payload.id
        } });
    }
  },

  /////////  AAA UI Part Start /////////

  onShowDialogConfigSSO: function onShowDialogConfigSSO(payload) {
    this.trigger({ dialog: {
        dialog: "DialogConfigSSO",
        type: payload.type,
        action: payload.action,
        id: payload.id
      } });
  },

  onSubmitSSOData: function onSubmitSSOData(dataSSO) {
    console.log(dataSSO, "SSO-Data-Objekt");
    $.ajax({
      url: './sso',
      type: 'POST',
      data: JSON.stringify(dataSSO),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function success(msg) {
        alert(msg);
      }
    });
  },

  onShowDialogAddMember: function onShowDialogAddMember(payload) {
    this.trigger({ dialog: {
        dialog: "DialogAddMember",
        type: payload.type,
        action: payload.action,
        id: payload.id
      } });
  },

  onSubmitAddMemberData: function onSubmitAddMemberData(dataAddMember) {
    console.log(dataAddMember, "AddMember");
    console.log("you have submit the AddMember");
  },

  onShowDialogAAAUserDetails: function onShowDialogAAAUserDetails(payload) {
    this.trigger({ dialog: {
        dialog: "DialogAAAUserDetails",
        type: payload.type,
        action: payload.action,
        id: payload.id
      } });
  },

  onSubmitAAAUserDetailsData: function onSubmitAAAUserDetailsData(dataAAAUserDetails) {
    console.log(dataAAAUserDetails, "AAAUserDetails");
    console.log("you have submit the AAAUserDetails");
  },

  onShowDialogSSOSignIn: function onShowDialogSSOSignIn(payload) {
    this.trigger({ dialog: {
        dialog: "DialogSSOSignIn",
        type: payload.type,
        action: payload.action,
        id: payload.id
      } });
  },

  onSubmitSSOSignInData: function onSubmitSSOSignInData(dataSSOSignIn) {
    console.log(dataSSOSignIn, "SSO-SignIn-Data-Objekt");
    $.ajax({
      url: './ssoSignIn',
      type: 'POST',
      data: JSON.stringify(dataSSOSignIn),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function success(msg) {
        alert(msg);
      }
    });
  },

  onShowDialogLogin: function onShowDialogLogin(payload) {
    this.trigger({ dialog: {
        dialog: "DialogLogin",
        type: payload.type,
        action: payload.action,
        id: payload.id
      } });
  },

  onSubmitLoginData: function onSubmitLoginData(dataLogin) {
    console.log(dataLogin, "Login");
    console.log("you have submit the Login");
  },

  /////////  AAA UI Part End /////////

  onConfigureComponent: function onConfigureComponent(payload) {
    var components = this.dashboard.components;
    for (var i in components) {
      var component = components[i];
      if (component.id == payload.id) {
        if (payload.type) {
          var oldType = component.type;
          component.type = payload.type;
          if (payload.parameters) {
            if (payload.noReplace) {
              // only slight changes without full knowledge of the parameters block
              component.parameters = Object.assign(component.parameters, payload.parameters);
            } else {
              // full replacement (default)
              component.parameters = payload.parameters;
            }
          }
          var definition = this.getComponentDefinitionForType(payload.type);

          // reset to default sizes when type changes
          if (oldType != payload.type) {
            for (var breakpoint in this.dashboard.layouts) {
              var layout = this.dashboard.layouts[breakpoint];
              if (layout) {
                for (var i in layout) {
                  var model = layout[i];
                  if (model.i == payload.id) {
                    model.w = definition.sizes[0][0];
                    model.h = definition.sizes[0][1];
                    break;
                  }
                }
                layout = RGLUtil.compact(layout, true);
                this.dashboard.layouts[breakpoint] = layout;
              }
            }
            component.parameters.size = {
              "sm": 0,
              "md": 0,
              "lg": 0
            };
          }

          // handle size preset
          if (payload.size !== undefined) {
            component.parameters.size[this.breakpoint] = payload.size;
            var size = definition.sizes[payload.size];
            var layoutEntry = this.getLayoutForElement(this.dashboard, this.breakpoint, component.id);
            layoutEntry.w = size[0];
            layoutEntry.h = size[1];
          }
        }
      }
    }

    this.storeDashboard();
    this.onGetComponents();
    this.trigger({ dashboard: this.dashboard, history: this.history.length, dialog: 'none' });
  },

  onSetBreakpoint: function onSetBreakpoint(breakpoint) {
    this.breakpoint = breakpoint;
  },

  onChangeCardSize: function onChangeCardSize(id, dimensions) {
    var layout = this.dashboard.layouts[this.breakpoint];
    for (var i in layout) {
      var model = layout[i];
      if (model.i == id) {
        layout.splice(i, 1);
        layout.unshift(model);
        break;
      }
    }

    if (dimensions.width) model.w = dimensions.width;
    if (dimensions.height) model.h = dimensions.height;

    layout = RGLUtil.compact(layout, true);
    this.dashboard.layouts[this.breakpoint] = layout;

    this.trigger({ dashboard: this.dashboard });
    this.storeDashboard();
  },

  changeSize: function changeSize(id, wrap, dir) {
    var layout = this.dashboard.layouts[this.breakpoint];
    var model = null;
    for (var i in layout) {
      model = layout[i];
      if (model.i == id) {
        break;
      }
    }

    var component = this.getComponent(id);
    var definition = this.getComponentDefinitionForType(component.type);

    if (!component.parameters.size || component.parameters.size.lg === undefined) {
      component.parameters.size = {
        "sm": 0,
        "md": 0,
        "lg": 0
      };
    }
    var size = component.parameters.size[this.breakpoint];
    size = size + dir;
    if (size >= definition.sizes.length) {
      if (wrap) {
        size = 0;
      } else {
        return;
      }
    }
    if (size < 0) {
      if (wrap) {
        size = definition.sizes.length - 1;
      } else {
        return;
      }
    }
    var tupel = definition.sizes[size];

    model.w = tupel[0];
    model.h = tupel[1];
    var maxWidth = Utils.getCapability("cols")[this.breakpoint];
    if (model.w > maxWidth) {
      size = 0;
      tupel = definition.sizes[size];
      model.w = tupel[0];
      model.h = tupel[1];
    }
    if (model.x + model.w > maxWidth) {
      model.x = maxWidth - model.w;
    }

    component.parameters.size[this.breakpoint] = size;

    layout = RGLUtil.compact(layout, true);
    this.dashboard.layouts[this.breakpoint] = layout;

    this.trigger({ dashboard: this.dashboard });
    this.storeDashboard();
  },

  onExpandCard: function onExpandCard(id, wrap) {
    this.changeSize(id, wrap, 1);
  },

  onShrinkCard: function onShrinkCard(id, wrap) {
    this.changeSize(id, wrap, -1);
  },

  persistDashboard: function persistDashboard() {
    console.log("persist dashboard");
    this.removeDashboardByName(this.dashboard.name);
    this.addDashboard(this.dashboard);
    var text = JSON.stringify(this.dashboards);

    if (global.localStorage) {
      global.localStorage.setItem('Dashboard_' + this.configName, text);
    }

    // store the config in the remote store
    /*
       ConfigStore.Actions.updateConfig({
         name: this.configName, // hardcoded name for the time being
         data: this.dashboards,
         lastChange: this.dashboards?this.dashboards.configTimestamp:0
       });
    */

    this.cleanup();
    this.history.push(text);
    this.trigger({ history: this.history.length });
  },

  getDashboardByName: function getDashboardByName(name) {
    var dashboard = null;
    if (this.dashboards) {
      for (var i = 0; i < this.dashboards.dashboards.length; i++) {
        var temp = this.dashboards.dashboards[i];
        if (temp.name == name) {
          dashboard = temp;
          break;
        }
      }
    }

    return dashboard;
  },

  removeDashboardByName: function removeDashboardByName(name) {
    if (this.dashboards) {
      for (var i = 0; i < this.dashboards.dashboards.length; i++) {
        var temp = this.dashboards.dashboards[i];
        if (temp.name == name) {
          this.dashboards.dashboards.splice(i, 1);
          break;
        }
      }
    }
  },

  addDashboard: function addDashboard(dashboard) {
    this.dashboards.dashboards.push(dashboard);
  },

  cleanup: function cleanup() {
    this.history = [];
    this.backupLayout = null;
  },

  storeDashboard: function storeDashboard() {
    console.log("store dashboard");
    var text = JSON.stringify(this.dashboard);
    var oldText = "";
    if (this.history.length > 0) {
      var oldText = this.history[this.history.length - 1];
    }
    if (oldText != text) {
      this.history.push(text);

      this.trigger({ history: this.history.length });
    }
  },

  onStoreLayouts: function onStoreLayouts(layouts) {
    this.dashboard.layouts = layouts;
    this.storeDashboard();

    this.trigger({ dashboard: this.dashboard });
  },

  onGetComponents: function onGetComponents() {
    var components = [];
    if (this.config && this.dashboard) {
      for (var i in this.dashboard.components) {
        var compInDashboard = this.dashboard.components[i];
        var definition = this.getComponentDefinitionForType(compInDashboard.type);
        var component = this.prepareComponent(definition, compInDashboard);
        components.push(component);
      }
    }

    this.loadResources(components);

    this.trigger({ components: components, dashboard: this.dashboard });
  },

  onRemoveComponent: function onRemoveComponent(payload) {
    if (this.config && this.dashboard) {
      for (var i in this.dashboard.components) {
        var compInDashboard = this.dashboard.components[i];
        if (compInDashboard.id == payload.id) {
          // remove from components
          this.dashboard.components.splice(i, 1);
          // remove from layout
          for (var breakpoint in this.dashboard.layouts) {
            var layout = this.dashboard.layouts[breakpoint];
            if (layout) {
              for (var t in layout) {
                var compInLayout = layout[t];
                if (compInLayout.i == payload.id) {
                  layout.splice(t, 1);
                  break;
                }
              }
              layout = RGLUtil.compact(layout, true);
              this.dashboard.layouts[breakpoint] = layout;
            }
          }
          break;
        }
      }
    }

    this.onGetComponents();
    this.trigger({ dashboard: this.dashboard, history: this.history.length, dialog: "none" });
  },

  onGetComponent: function onGetComponent(payload) {
    var id = payload.id;
    var type = payload.type;

    if (!id) {
      // create empty component
      var comp = {
        type: "BarChart",
        parameters: {
          "component": "BarChart",
          "title": "New Card",
          "size": {
            "sm": 0,
            "md": 0,
            "lg": 0
          }
        }
      };
      var component = this.getComponentDefinitionForType(type);
      component = this.prepareComponent(component, comp);
      component.parameters.component = type;
    } else {
      // get component
      var component = this.getComponentDefinitionForType(type);
      if (this.config && this.dashboard) {
        for (var i in this.dashboard.components) {
          var compInDashboard = this.dashboard.components[i];
          if (compInDashboard.id == id) {
            component = this.prepareComponent(component, compInDashboard);
            component.parameters.component = type;
            break;
          }
        }
      }
    }

    this.trigger({ component: component });
  },

  onGetCategories: function onGetCategories() {
    var categories = {};
    for (var i in this.config.components) {
      var component = this.config.components[i];
      if (component.extends) {
        var parent = this.getComponentDefinitionForType(component.extends);
        component = Object.assign({}, parent, component);
      }
      var category = component.category;
      if (category != "Hidden") {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(component);
        // TODO Check access authorization here
      }
    }
    this.trigger({ categories: categories });
  },

  onCloseDialog: function onCloseDialog() {
    this.trigger({ dialog: 'none' });
  },

  getComponentDefinitionForType: function getComponentDefinitionForType(type) {
    if (this.config && type) {
      var components = this.config.components;
      for (var i in components) {
        var component = components[i];
        if (component.name == type) {
          if (component.extends) {
            var parent = this.getComponentDefinitionForType(component.extends);
            component = Object.assign({}, parent, component);
          }
          return component;
        }
      }
    } else {
      return null;
    }
  },

  /**
  * Merges the component definition with the infromatReturns the layout information for a single component
  * @param  {Object}  definition Component definition from the global DashboardConfig
  * @param  {Object}  instance   Component from the dashboard instance
  * @return {Object}  merged comopnent information
  */
  prepareComponent: function prepareComponent(definition, instance) {
    var temp = {
      "parameters": Object.assign({}, definition.parameters, instance.parameters),
      "id": instance.id
    };
    return Object.assign({}, definition, temp);
  },

  loadResources: function loadResources(components) {
    for (var i in components) {
      var component = components[i];
      if (component.require) {
        for (var t in component.require) {
          var temp = component.require[t];
          require(temp);
        }
      }
    }
  },

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

});

module.exports = DashboardStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../cards/AAAUserDetails.jsx":6,"../cards/AddMember.jsx":7,"../cards/BarChart.jsx":8,"../cards/ConfigSSO.jsx":9,"../cards/Container.jsx":10,"../cards/DashboardLink.jsx":11,"../cards/DeviceMap.jsx":12,"../cards/DeviceTypes.jsx":13,"../cards/DonutChart.jsx":14,"../cards/EmptyComponent.jsx":15,"../cards/Gauge.jsx":16,"../cards/HorizontalLine.jsx":17,"../cards/ImageCard.jsx":18,"../cards/Login.jsx":19,"../cards/PV.jsx":20,"../cards/PushButtonCard.jsx":21,"../cards/RealTimeChart.jsx":22,"../cards/RouterLink.jsx":23,"../cards/SSOSignIn.jsx":24,"../cards/SimpleSlider.jsx":25,"../cards/SimpleTextCard.jsx":26,"../cards/StaticChart.jsx":27,"../cards/TableUser.jsx":28,"../cards/TestComponent.jsx":29,"../cards/UsageDataCard.jsx":30,"../cards/UsageDeviceCard.jsx":31,"../cards/UsageStorageCard.jsx":32,"../cards/UserCardTable.jsx":33,"../cards/UserDetails.jsx":34,"../cards/Value.jsx":35,"../cards/Webcam.jsx":36,"../customization/BarChartProperties.jsx":37,"../customization/GaugeProperties.jsx":38,"../customization/RealTimeChartProperties.jsx":39,"../customization/SingleValueProperties.jsx":40,"./Actions.jsx":41,"./DashboardUtils":48,"./config/DashboardConfig.json":52,"./config/Dashboards.json":53}],48:[function(require,module,exports){
'use strict';

var config = require('./config/DashboardConfig.json');

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

},{"./config/DashboardConfig.json":52}],49:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var DashboardStore = require('./DashboardStore');
var Actions = require('./Actions.jsx');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var IconLink = require('../../common/components/IconLink.jsx');
var ButtonText = require('../../common/components/ButtonText.jsx');
var CardAction = require('../../common/components/CardAction.jsx');
var Dialog = require('../../common/components/Dialog.jsx');
var DialogTab = Dialog.DialogTab;
var ColorSelection = require('../../common/components/ColorSelection.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label = require('../../common/components/Label.jsx');

var RPT = React.PropTypes;

var styles = {
  category: {
    marginTop: "50px",
    marginBottom: "40px",
    clear: "both"
  },
  categoryHeader: {
    color: "#152935",
    fontSize: "40px",
    fontWeight: "300"
  },
  component: {
    borderTop: "4px solid #4983c6",
    marginTop: "20px",
    marginLeft: "40px",
    clear: "both"
  },
  componentHeader: {
    fontSize: "24px",
    marginTop: "5px",
    marginBottom: "5px"
  },
  componentDescription: {
    fontSize: "16px"
  },
  componentThumbnail: {
    width: "240px",
    marginBottom: "30px",
    float: "right",
    marginLeft: "20px"
  },
  componentButton: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#1d3649",
    display: "inline-block",
    padding: "10px 40px",
    marginTop: "20px",
    marginRight: "20px",
    cursor: "pointer"
  },
  componentCustomization: {
    clear: "both",
    marginTop: "50px"
  }
};

var PageCustomization = React.createClass({
  displayName: 'PageCustomization',

  propTypes: {
    id: RPT.string,
    action: RPT.string,
    style: RPT.object,
    nls: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      id: null,
      action: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      dashboard: null
    };
  },

  componentWillMount: function componentWillMount() {
    var dashboard = null;
    if (this.props.id) {
      dashboard = DashboardStore.getDashboard(this.props.id);
    } else {
      dashboard = DashboardStore.getEmptyDashboard();
    }
    this.setState({
      dashboard: dashboard
    });
  },

  onSelect: function onSelect(name) {
    var payload = {
      dashboard: this.state.dashboard
    };
    Actions.addDashboard(payload);
  },

  onTitleChanged: function onTitleChanged(name) {
    this.state.dashboard.label = name;
    this.setState({
      dashboard: this.state.dashboard
    });
  },

  render: function render() {

    var self = this;
    var component = null;
    if (this.state.dashboard) {
      var dashboard = this.state.dashboard;

      return React.createElement(
        Dialog,
        { theme: this.props.theme },
        React.createElement(
          DialogTab,
          { id: 'Page customization', theme: self.props.theme, label: 'Page customization', cancel: self.props.nls.resolve('Cancel'), submit: self.props.nls.resolve('Submit'), key: 'Page customization' },
          React.createElement('div', { style: styles.categoryHeader }),
          React.createElement(
            'div',
            { style: styles.component },
            React.createElement(
              'div',
              { style: styles.componentHeader },
              self.props.nls.resolve("CreateDashboardPage_TITLE")
            ),
            React.createElement(
              'div',
              { style: styles.componentDescription },
              self.props.nls.resolve("CreateDashboardPage_DESC")
            ),
            React.createElement(ButtonText, { text: self.props.nls.resolve('Create'), isPrimary: true, onClick: function onClick() {
                self.onSelect();
              } }),
            React.createElement(
              'div',
              { style: styles.componentCustomization },
              React.createElement(
                Label,
                { label: Messages.resolve('DashboardTitle'), theme: this.props.theme },
                React.createElement(InputField, { theme: this.props.theme, onChange: this.onTitleChanged, initialValue: dashboard.label })
              )
            )
          )
        )
      );
    } else {
      return React.createElement(
        Dialog,
        { theme: this.props.theme },
        'No dashboard found'
      );
    }
  }
});

module.exports = PageCustomization;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/ButtonText.jsx":61,"../../common/components/CardAction.jsx":62,"../../common/components/ColorSelection.jsx":72,"../../common/components/Dialog.jsx":74,"../../common/components/IconLink.jsx":77,"../../common/components/InputField.jsx":79,"../../common/components/Label.jsx":80,"./Actions.jsx":41,"./DashboardStore":47}],50:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var WrapperTitle = require('./WrapperTitle.jsx');
var RPT = React.PropTypes;

var styles = {
	container: {
		fontSize: "14px",
		fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		overflow: "hidden",
		borderWidth: "1px",
		borderStyle: "solid",
		position: "relative"
	}
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/React-card-wrapper
//

var ReactWrapper = React.createClass({
	displayName: 'ReactWrapper',

	propTypes: {
		id: RPT.string,
		inbound: RPT.array,
		outbound: RPT.array,
		sticky: RPT.bool,
		type: RPT.string,
		parameters: RPT.object.isRequired,
		layout: RPT.string,
		width: RPT.number,
		height: RPT.number,
		style: RPT.object,
		theme: RPT.object.isRequired,
		nls: RPT.object
	},

	applyTheme: function applyTheme() {
		var t = this.props.theme;
		if (t) {
			styles.container.fontFamily = t.font;
			styles.container.color = t.major;
			styles.container.backgroundColor = t.content;
			styles.container.borderColor = t.border;
		}
	},

	applySchema: function applySchema() {
		if (this.props.parameters.color !== undefined) {
			var scheme = this.props.theme.schemes[this.props.parameters.color % this.props.theme.schemes.length];
			return Object.assign({}, this.props.theme, scheme);
		}
		return this.props.theme;
	},

	getInitialState: function getInitialState() {
		return {
			width: 0,
			height: 0
		};
	},

	componentDidMount: function componentDidMount() {
		window.addEventListener("resize", this.determineDimensions);
		this.determineDimensions();
	},

	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener("resize", this.determineDimensions);
	},

	componentDidUpdate: function componentDidUpdate() {
		this.determineDimensions();
	},

	determineDimensions: function determineDimensions() {
		var self = this;
		setTimeout(function () {
			try {
				var node = ReactDOM.findDOMNode(self);
				var width = node.offsetWidth;
				var height = node.offsetHeight;
				if (self.state.width != width || self.state.height != height) {
					self.setState({
						width: width,
						height: height
					});
				}
			} catch (e) {
				// can happen if component is already removed
			}
		}, 2);
	},

	render: function render() {
		this.applyTheme();
		var theme = this.applySchema();

		var element = null;
		var style = styles.container;

		var component = IoTCards;
		var componentTokens = this.props.parameters.component.split(".");
		for (var i in componentTokens) {
			component = component[componentTokens[i]];
		}

		var component = IoTCards;
		var componentTokens = this.props.parameters.component.split(".");
		for (var i in componentTokens) {
			component = component[componentTokens[i]];
		}

		var title = this.props.parameters.title ? this.props.parameters.title : "";
		if (!this.props.type) {
			element = React.DOM.div(null, "Loading");
		} else {
			if (this.props.theme) {
				style = {};
				Object.assign(style, styles.container);
			}
			var props = {};
			var height = 60;
			if (this.props.parameters.component == "HorizontalLine") {
				height = 120;
				Object.assign(style, styles.container, { "backgroundColor": this.props.theme.background, "borderStyle": "none" });
			}
			if (this.props.parameters.component == "Container") {
				height = 120;
				Object.assign(style, styles.container, { "backgroundColor": this.props.theme.background, "borderStyle": "none" });
			}
			Object.assign(props, this.props.parameters, {
				wrapper: {
					id: this.props.id,
					width: this.props.width,
					height: this.props.height,
					layout: this.props.layout,
					realHeight: this.state.height - height,
					realWidth: this.state.width
				},
				theme: theme,
				nls: this.props.nls,
				style: {
					height: this.state.height - height + "px",
					width: this.state.width + "px"
				}
			});
			console.log("creating element [" + this.props.id + "] with style: ", props.style);
			element = React.createElement(component, props);
		}
		return React.createElement(
			'div',
			{ style: style,
				className: 'react-draggable-active' },
			React.createElement(WrapperTitle, {
				id: this.props.id,
				type: this.props.type,
				theme: theme,
				nls: this.props.nls,
				sticky: this.props.sticky,
				fullSize: this.props.parameters.component == "HorizontalLine" || this.props.parameters.component == "Container",
				container: this.props.parameters.component == "Container",
				title: title }),
			element
		);
	}
});

module.exports = ReactWrapper;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WrapperTitle.jsx":51}],51:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Actions = require('./Actions.jsx');
var Icon = require('../../common/components/Icon.jsx');
var IconLink = require('../../common/components/IconLink.jsx');
var InputField = require('../../common/components/InputField.jsx');
var DashboardStore = require('./DashboardStore.js');
var RPT = React.PropTypes;

var styles = {
	title: {
		fontSize: "16px",
		backgroundColor: "white",
		color: "#323232",
		paddingLeft: "30px",
		height: "60px",
		lineHeight: "60px",
		letterSpacing: "0.5px",
		textTransform: "uppercase",
		fontWeight: "500",
		overflow: "hidden",
		transition: "background-color 0.3s ease",
		cursor: "move"
	},
	fullSize: {
		height: "80px",
		lineHeight: "80px",
		fontSize: "40px",
		fontWeight: "200",
		color: "#ededed",
		backgroundColor: "#FFFFFF",
		borderBottom: "5px solid white",
		marginBottom: "35px"
	},
	actions: {
		float: "right",
		marginLeft: "20px",
		fontSize: "14px"
	},
	actionBox: {
		whiteSpace: "nowrap",
		position: "relative",
		float: "right",
		marginRight: "30px"
	},
	icon: {
		marginLeft: "3px"
	},
	anchor: {
		outline: "none"
	},
	input: {
		position: "absolute",
		backgroundColor: "silver",
		fontWeight: "200",
		color: "#ededed",
		top: 0,
		height: "80px",
		lineHeight: "80px",
		fontSize: "40px"
	}
};

var WrapperTitle = React.createClass({
	displayName: 'WrapperTitle',

	propTypes: {
		title: RPT.string,
		id: RPT.string,
		style: RPT.object,
		theme: RPT.object.isRequired,
		fullSize: RPT.bool,
		container: RPT.bool,
		sticky: RPT.bool
	},

	applyTheme: function applyTheme() {
		var t = this.props.theme;
		if (t) {
			styles.title.backgroundColor = t.title;
			styles.title.color = t.titleText;
			styles.fullSize.color = t.lightText;
			styles.fullSize.borderBottom = "5px solid " + t.border;
			styles.fullSize.backgroundColor = t.canvas;
		}
	},

	getDefaultProps: function getDefaultProps() {
		return {
			fullSize: false
		};
	},

	getInitialState: function getInitialState() {
		return {
			showAction: false
		};
	},

	onAdd: function onAdd() {
		Actions.addComponent(this.props.id);
	},

	toggleActions: function toggleActions() {
		this.setState({
			showActions: !this.state.showActions
		});
	},

	hideActions: function hideActions() {
		this.setState({ showActions: false });
	},

	handleSettings: function handleSettings() {
		this.hideActions();
		if (this.props.fullSize) {
			// edit a horizontal separator directly
			this.setState({
				editFullSize: true
			});
		} else {
			Actions.showDialog({
				id: this.props.id,
				type: this.props.type == "EmptyComponent" ? undefined : this.props.type,
				action: 'modifyCard'
			});
		}
	},

	handleRemove: function handleRemove() {
		Actions.removeComponent({
			id: this.props.id
		});
	},

	handleToggleSize: function handleToggleSize() {
		//this.hideActions();
		Actions.expandCard(this.props.id, true);
	},

	onTitleChanged: function onTitleChanged(value) {
		this.setState({
			editFullSize: false
		});

		var payload = {
			id: this.props.id,
			type: this.props.type,
			parameters: {
				title: value
			},
			noReplace: true // just add the value to the component since we do not have the parameters reference
		};
		Actions.configureComponent(payload);
	},

	render: function render() {
		this.applyTheme();

		var title = styles.title;

		var add = "";
		var element = "";

		if (this.props.title === undefined) {
			element = "Loading...";
		} else {
			if (this.props.fullSize) {
				title = styles.fullSize;
			}
			if (this.props.container) {
				add = React.createElement(
					IconLink,
					{ theme: this.props.theme, color: this.props.theme.accent, icon: 'add-circle-outline', size: '24', style: styles.actions, action: this.onAdd },
					'Add card'
				);
			}
			if (this.state.editFullSize) {
				element = React.createElement(InputField, { style: styles.input, theme: this.props.theme, onSubmit: this.onTitleChanged, initialValue: this.props.title });
			} else {
				element = this.props.title;
			}
		}
		var maximizeIcon = this.state.maximized ? "fullscreen-exit" : "fullscreen";

		var dotsIcon = this.state.showActions ? "highlight-remove" : "dots";

		var settings = "";
		var remove = "";

		if (!this.props.sticky || this.props.fullSize) {
			settings = React.createElement(Icon, { theme: this.props.theme, style: styles.icon, color: this.state.showActions ? this.props.theme.accent : "transparent", icon: 'settings', onClick: this.handleSettings });
		}
		if (!this.props.sticky) {
			remove = React.createElement(Icon, { theme: this.props.theme, style: styles.icon, color: this.state.showActions ? this.props.theme.accent : "transparent", icon: 'delete', onClick: this.handleRemove });
		}
		return React.createElement(
			'div',
			{
				style: title
				//onMouseOut={this.hideActions}
				, className: 'wrapper-title react-draggable-active'
			},
			React.createElement(
				'div',
				{ style: styles.actionBox },
				settings,
				remove,
				React.createElement(Icon, { theme: this.props.theme, style: styles.icon, color: this.state.showActions ? this.props.theme.accent : "transparent", icon: maximizeIcon, onClick: this.handleToggleSize }),
				React.createElement(
					'a',
					{ style: styles.anchor, tabIndex: '1', onBlur: this.hideActions, href: 'javascript:void(0)' },
					React.createElement(Icon, { theme: this.props.theme, style: styles.icon, color: this.props.theme.accent, icon: dotsIcon, onClick: this.toggleActions })
				)
			),
			add,
			React.createElement(
				'span',
				{ style: styles.text, className: 'wrapper-title react-draggable-active' },
				element
			)
		);
	}
});

module.exports = WrapperTitle;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/components/Icon.jsx":76,"../../common/components/IconLink.jsx":77,"../../common/components/InputField.jsx":79,"./Actions.jsx":41,"./DashboardStore.js":47}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
module.exports={
  "settings": {
    "defaultDashboard": "a4027b91-b2b7-4211-a3e1-ad1c472b568a"
  },
  "dashboards": [
    {
      "name": "05c72174-c4d8-4684-bd71-0352a084b3c5",
      "label": "Playground",
      "icon": "res/images/icons/smarterHome()/gs7.png",
      "image": "res/images/groups/default.jpg",
      "thumb": "res/images/groups/smarterHome()/g7.png",
      "hidden": false,
      "type": "TILE",
      "locked": false,
      "preset": false,
      "layouts": {
        "lg": [
          {
            "w": 3,
            "h": 1,
            "x": 0,
            "y": 0,
            "i": "6747eb79-0251-498d-9401-290aa98b4375"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 1,
            "i": "c3c70c76-1b36-416a-997d-2242a5d38318"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 7,
            "i": "d4ba0e17-95d6-400e-800a-108be0b2e88d"
          },
          {
            "w": 2,
            "h": 5,
            "x": 1,
            "y": 6,
            "i": "d01be19e-d70e-4158-92ee-d52730c8dd56"
          },
          {
            "w": 2,
            "h": 5,
            "x": 1,
            "y": 1,
            "i": "57585343-82b0-405a-a00c-b79b12164746"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 4,
            "i": "b2c08d8a-351d-472d-b8b9-38e549943701"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 10,
            "i": "1bb12859-790a-4824-94a8-d545368a50c4"
          }
        ],
        "md": [
          {
            "w": 1,
            "h": 1,
            "x": 0,
            "y": 0,
            "i": "6747eb79-0251-498d-9401-290aa98b4375"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 1,
            "i": "c3c70c76-1b36-416a-997d-2242a5d38318"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 4,
            "i": "d4ba0e17-95d6-400e-800a-108be0b2e88d"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 7,
            "i": "d01be19e-d70e-4158-92ee-d52730c8dd56"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 10,
            "i": "57585343-82b0-405a-a00c-b79b12164746"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 13,
            "i": "b2c08d8a-351d-472d-b8b9-38e549943701"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 16,
            "i": "1bb12859-790a-4824-94a8-d545368a50c4"
          }
        ],
        "sm": [
          {
            "w": 1,
            "h": 1,
            "x": 0,
            "y": 0,
            "i": "6747eb79-0251-498d-9401-290aa98b4375"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 1,
            "i": "c3c70c76-1b36-416a-997d-2242a5d38318"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 4,
            "i": "d4ba0e17-95d6-400e-800a-108be0b2e88d"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 7,
            "i": "d01be19e-d70e-4158-92ee-d52730c8dd56"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 10,
            "i": "57585343-82b0-405a-a00c-b79b12164746"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 13,
            "i": "b2c08d8a-351d-472d-b8b9-38e549943701"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 16,
            "i": "1bb12859-790a-4824-94a8-d545368a50c4"
          }
        ]
      },
      "components": [
        {
          "id": "6747eb79-0251-498d-9401-290aa98b4375",
          "type": "HorizontalLine",
          "parameters": {
            "component": "HorizontalLine",
            "title": "Playground",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 2
            }
          }
        },
        {
          "id": "c3c70c76-1b36-416a-997d-2242a5d38318",
          "type": "UserCardTable",
          "parameters": {
            "metaData": [
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
              }
            ],
            "fakeData": [
              {
                "id": "",
                "name": "loading",
                "descrip": "loading",
                "mail": "loading",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
              }
            ],
            "component": "UserCardTable",
            "title": "User vCard list"
          }
        },
        {
          "id": "d4ba0e17-95d6-400e-800a-108be0b2e88d",
          "type": "TableUser",
          "parameters": {
            "component": "TableUser",
            "title": "TableUser",
            "metaData": [
              {
                "columnName": "action",
                "displayName": "Action",
                "order": 6
              },
              {
                "columnName": "avatar",
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
              }
            ],
            "fakeData": [
              {
                "id": "",
                "name": "loading data",
                "descrip": "",
                "mail": "",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
              }
            ]
          }
        },
        {
          "id": "d01be19e-d70e-4158-92ee-d52730c8dd56",
          "type": "DeviceMap",
          "parameters": {
            "component": "DeviceMap",
            "title": "Device map",
            "type": "MAP",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 2
            }
          }
        },
        {
          "id": "57585343-82b0-405a-a00c-b79b12164746",
          "type": "WebcamMunic2",
          "parameters": {
            "component": "Webcam",
            "title": "Webcam Marienplatz 2",
            "url": "http://kaufhaus.ludwigbeck.de/manual/webcam/1sec.jpg",
            "frequency": 5,
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 1
            }
          }
        },
        {
          "id": "b2c08d8a-351d-472d-b8b9-38e549943701",
          "type": "UserDetails",
          "parameters": {
            "component": "UserDetails",
            "title": "User details"
          }
        }
      ]
    },
    {
      "name": "e8aaac64-3dcb-4de0-b254-009535d56c04",
      "label": "Authorization test",
      "icon": "res/images/icons/smarterHome()/gs7.png",
      "image": "res/images/groups/default.jpg",
      "thumb": "res/images/groups/smarterHome()/g7.png",
      "hidden": false,
      "type": "TILE",
      "locked": false,
      "preset": false,
      "layouts": {
        "lg": [
          {
            "w": 1,
            "h": 3,
            "x": 1,
            "y": 0,
            "i": "4add2c8e-a139-4cb9-9561-a86ca79a3c9c"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 0,
            "i": "36d0974a-0a82-466b-b064-ed1923980a55"
          },
          {
            "w": 1,
            "h": 3,
            "x": 2,
            "y": 0,
            "i": "b2622b76-d76b-4dc4-b2b8-7948ce0e9ddb"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 3,
            "i": "ec884523-3a16-4074-b40d-5ec46934ad82"
          }
        ],
        "md": [
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 0,
            "i": "4add2c8e-a139-4cb9-9561-a86ca79a3c9c"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 3,
            "i": "36d0974a-0a82-466b-b064-ed1923980a55"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 6,
            "i": "b2622b76-d76b-4dc4-b2b8-7948ce0e9ddb"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 9,
            "i": "ec884523-3a16-4074-b40d-5ec46934ad82"
          }
        ],
        "sm": [
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 0,
            "i": "4add2c8e-a139-4cb9-9561-a86ca79a3c9c"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 3,
            "i": "36d0974a-0a82-466b-b064-ed1923980a55"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 6,
            "i": "b2622b76-d76b-4dc4-b2b8-7948ce0e9ddb"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 9,
            "i": "ec884523-3a16-4074-b40d-5ec46934ad82"
          }
        ]
      },
      "components": [
        {
          "id": "4add2c8e-a139-4cb9-9561-a86ca79a3c9c",
          "type": "SSOSignIn",
          "parameters": {
            "component": "SSOSignIn",
            "actionText": "ACME Sign In",
            "actionIcon": "lock",
            "title": "ACME Sign In"
          }
        },
        {
          "id": "36d0974a-0a82-466b-b064-ed1923980a55",
          "type": "Login",
          "parameters": {
            "component": "Login",
            "actionText": "Log In",
            "actionIcon": "lock",
            "title": "Log In"
          }
        },
        {
          "id": "b2622b76-d76b-4dc4-b2b8-7948ce0e9ddb",
          "type": "AddMember",
          "parameters": {
            "component": "AddMember",
            "actionText": "Add Member",
            "actionIcon": "add-circle-outline",
            "title": "Add Member"
          }
        },
        {
          "id": "ec884523-3a16-4074-b40d-5ec46934ad82",
          "type": "ConfigSSO",
          "parameters": {
            "component": "ConfigSSO",
            "actionText": "Configure SSO",
            "actionIcon": "settings",
            "title": "Configure SSO Service"
          }
        }
      ]
    },
    {
      "name": "a4027b91-b2b7-4211-a3e1-ad1c472b568a",
      "label": "Overview",
      "icon": "res/images/icons/smarterHome()/gs7.png",
      "image": "res/images/groups/default.jpg",
      "thumb": "res/images/groups/smarterHome()/g7.png",
      "hidden": false,
      "type": "TILE",
      "locked": false,
      "preset": false,
      "layouts": {
        "lg": [
          {
            "w": 3,
            "h": 1,
            "x": 0,
            "y": 9,
            "i": "c9ad2d50-9685-4a32-9558-a6bb754cc1c7"
          },
          {
            "w": 2,
            "h": 1,
            "x": 0,
            "y": 0,
            "i": "570e15b4-9942-4c64-887d-cca423135ed0"
          },
          {
            "w": 1,
            "h": 3,
            "x": 2,
            "y": 1,
            "i": "aae20d34-a862-467c-95be-76a6eaacab8e"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 1,
            "i": "c0909ede-4a19-418a-9caa-e7b84a833da4"
          },
          {
            "w": 1,
            "h": 3,
            "x": 1,
            "y": 1,
            "i": "34c03b0d-29ae-4d50-8d2c-3d34a07b8d9d"
          },
          {
            "w": 3,
            "h": 5,
            "x": 0,
            "y": 4,
            "i": "5d707e57-4edd-461a-bd72-115d52285488"
          },
          {
            "w": 1,
            "h": 1,
            "x": 2,
            "y": 0,
            "i": "e41039ea-8258-459a-a1dc-286ab639dd9d"
          }
        ],
        "md": [
          {
            "w": 2,
            "h": 1,
            "x": 0,
            "y": 7,
            "i": "c9ad2d50-9685-4a32-9558-a6bb754cc1c7"
          },
          {
            "w": 1,
            "h": 1,
            "x": 0,
            "y": 0,
            "i": "570e15b4-9942-4c64-887d-cca423135ed0"
          },
          {
            "w": 1,
            "h": 3,
            "x": 1,
            "y": 1,
            "i": "aae20d34-a862-467c-95be-76a6eaacab8e"
          },
          {
            "w": 1,
            "h": 3,
            "x": 1,
            "y": 4,
            "i": "c0909ede-4a19-418a-9caa-e7b84a833da4"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 4,
            "i": "34c03b0d-29ae-4d50-8d2c-3d34a07b8d9d"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 1,
            "i": "5d707e57-4edd-461a-bd72-115d52285488"
          },
          {
            "w": 1,
            "h": 1,
            "x": 1,
            "y": 0,
            "i": "e41039ea-8258-459a-a1dc-286ab639dd9d"
          }
        ],
        "sm": [
          {
            "w": 1,
            "h": 1,
            "x": 0,
            "y": 14,
            "i": "c9ad2d50-9685-4a32-9558-a6bb754cc1c7"
          },
          {
            "w": 1,
            "h": 1,
            "x": 0,
            "y": 4,
            "i": "570e15b4-9942-4c64-887d-cca423135ed0"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 1,
            "i": "aae20d34-a862-467c-95be-76a6eaacab8e"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 5,
            "i": "c0909ede-4a19-418a-9caa-e7b84a833da4"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 11,
            "i": "34c03b0d-29ae-4d50-8d2c-3d34a07b8d9d"
          },
          {
            "w": 1,
            "h": 3,
            "x": 0,
            "y": 8,
            "i": "5d707e57-4edd-461a-bd72-115d52285488"
          },
          {
            "w": 1,
            "h": 1,
            "x": 0,
            "y": 0,
            "i": "e41039ea-8258-459a-a1dc-286ab639dd9d"
          }
        ]
      },
      "components": [
        {
          "id": "c9ad2d50-9685-4a32-9558-a6bb754cc1c7",
          "type": "HorizontalLine",
          "parameters": {
            "component": "HorizontalLine",
            "title": "Devices",
            "size": {
              "sm": 0,
              "md": 1,
              "lg": 2
            }
          }
        },
        {
          "id": "570e15b4-9942-4c64-887d-cca423135ed0",
          "type": "HorizontalLine",
          "parameters": {
            "component": "HorizontalLine",
            "title": "Usage",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 1
            }
          }
        },
        {
          "id": "aae20d34-a862-467c-95be-76a6eaacab8e",
          "type": "DeviceTypes",
          "parameters": {
            "title": "Device types",
            "component": "DeviceTypes",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 0
            }
          }
        },
        {
          "id": "c0909ede-4a19-418a-9caa-e7b84a833da4",
          "type": "UsageDeviceCard",
          "parameters": {
            "component": "UsageDeviceCard",
            "title": "Device connections",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 0
            }
          }
        },
        {
          "id": "34c03b0d-29ae-4d50-8d2c-3d34a07b8d9d",
          "type": "UsageDataCard",
          "parameters": {
            "component": "UsageDataCard",
            "title": "Data consumed",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 0
            }
          }
        },
        {
          "id": "5d707e57-4edd-461a-bd72-115d52285488",
          "type": "UsageStorageCard",
          "parameters": {
            "component": "UsageStorageCard",
            "title": "Storage consumed",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 2
            }
          }
        },
        {
          "id": "e41039ea-8258-459a-a1dc-286ab639dd9d",
          "type": "HorizontalLine",
          "parameters": {
            "component": "HorizontalLine",
            "title": "Device statistic",
            "size": {
              "sm": 0,
              "md": 0,
              "lg": 0
            }
          }
        }
      ]
    }
  ],
  "configTimestamp": 1450867585706
}

},{}],54:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var DashboardStore = require('./dashboard/DashboardStore');
var DashboardUtils = require('./dashboard/DashboardUtils');
var DashboardCanvas = require('./dashboard/DashboardCanvas.jsx');
var DashboardControl = require('./dashboard/DashboardControl.jsx');
var ComponentSelection = require('./dashboard/ComponentSelection.jsx');
var CustomizationWizard = require('./dashboard/CustomizationWizard.jsx');
var ComponentCustomization = require('./dashboard/ComponentCustomization.jsx');
var DialogConfigSSO = require('../AAADialog/dialogs/DialogConfigSSO.jsx');
var DialogAAAUserDetails = require('../AAADialog/dialogs/DialogAAAUserDetails.jsx');
var DialogSSOSignIn = require('../AAADialog/dialogs/DialogSSOSignIn.jsx');
var DialogLogin = require('../AAADialog/dialogs/DialogLogin.jsx');
var DialogAddMember = require('../AAADialog/dialogs/DialogAddMember.jsx');
var PageCustomization = require('./dashboard/PageCustomization.jsx');
var IoTFAuthStore = require('../common/stores/IoTFAuthStore.js');

var RPT = React.PropTypes;

var styles = {
  dialogContainer: {
    zIndex: "2000",
    position: "relative"
  },
  canvas: {
    //width: "1440px"
  }
};

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).call(this, props));

    _this.state = {
      strings: {}
    };

    if (props.dashboardConfig) {
      DashboardStore.setDashboardConfig(props.dashboardConfig);
      DashboardUtils.setDashboardConfig(props.dashboardConfig);
    }
    if (props.defaultDashboard) {
      DashboardStore.setDefaultDashboard(props.defaultDashboard);
    }

    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.onModelUpdate = _this.onModelUpdate.bind(_this);
    _this.render = _this.render.bind(_this);
    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.handleNLS = _this.handleNLS.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'handleNLS',
    value: function handleNLS(strings) {
      this.setState(strings);
      this.render();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.strings.length > 0) {
        this.props.nls.resolve("Dashboard", this.props.strings, this.handleNLS);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      DashboardStore.listen(this.onModelUpdate);
      IoTFAuthStore.Actions.setAuth(this.props.auth.org, this.props.auth.ltpa, this.props.auth.apiKey, this.props.auth.apiToken);
    }
  }, {
    key: 'onModelUpdate',
    value: function onModelUpdate(payload) {
      var model = {};
      if (payload.dialog) model.dialog = payload.dialog;
      if (Object.keys(model).length > 0) {
        this.setState(model);
        if (model.dialog == 'none') {
          $('body').css('overflow', 'auto');
        } else {
          $('body').css('overflow', 'hidden');
        }
      }
    }
  }, {
    key: 'onDeviceUpdate',
    value: function onDeviceUpdate(payload) {
      Actions.deviceUpdated(payload);
    }
  }, {
    key: 'render',
    value: function render() {
      var dialog = "";

      var theme = DashboardStore.getTheme();

      if (this.state.dialog) {
        if (this.state.dialog.dialog == "ComponentSelection") {
          dialog = React.createElement(ComponentSelection, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "ComponentCustomization") {
          dialog = React.createElement(ComponentCustomization, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "CustomizationWizard") {
          dialog = React.createElement(ComponentCustomization, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "PageCustomization") {
          dialog = React.createElement(PageCustomization, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "DialogConfigSSO") {
          dialog = React.createElement(DialogConfigSSO, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "DialogLogin") {
          dialog = React.createElement(DialogLogin, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "DialogAddMember") {
          dialog = React.createElement(DialogAddMember, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "DialogAAAUserDetails") {
          dialog = React.createElement(DialogAAAUserDetails, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        } else if (this.state.dialog.dialog == "DialogSSOSignIn") {
          dialog = React.createElement(DialogSSOSignIn, { theme: theme, nls: this.props.nls, id: this.state.dialog.id, type: this.state.dialog.type, action: this.state.dialog.action });
        }
      }

      return React.createElement(
        'div',
        null,
        React.createElement(DashboardControl, { theme: theme, nls: this.props.nls, configurable: true }),
        React.createElement(
          'div',
          { style: styles.canvas },
          React.createElement(DashboardCanvas, { theme: theme, nls: this.props.nls })
        ),
        React.createElement(
          'div',
          { style: styles.dialogContainer },
          dialog
        )
      );
    }
  }]);

  return Dashboard;
}(React.Component);

Dashboard.propTypes = {
  style: RPT.object,
  nls: RPT.object,
  auth: RPT.object
};
Dashboard.defaultProps = {
  strings: []
};

module.exports = Dashboard;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../AAADialog/dialogs/DialogAAAUserDetails.jsx":1,"../AAADialog/dialogs/DialogAddMember.jsx":2,"../AAADialog/dialogs/DialogConfigSSO.jsx":3,"../AAADialog/dialogs/DialogLogin.jsx":4,"../AAADialog/dialogs/DialogSSOSignIn.jsx":5,"../common/stores/IoTFAuthStore.js":98,"./dashboard/ComponentCustomization.jsx":42,"./dashboard/ComponentSelection.jsx":43,"./dashboard/CustomizationWizard.jsx":44,"./dashboard/DashboardCanvas.jsx":45,"./dashboard/DashboardControl.jsx":46,"./dashboard/DashboardStore":47,"./dashboard/DashboardUtils":48,"./dashboard/PageCustomization.jsx":49}],55:[function(require,module,exports){
"use strict";

var Const = {
  "CONNECTED": "CONNECTED",
  "DISCONNECTED": "DISCONNECTED",
  "PAUSED": "PAUSED"
};

module.exports = Const;

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {

    container: {
        marginBottom: "15px",
        boxSizing: "border-box",
        clear: "both",
        cursor: "pointer"
    },
    canvas: {
        paddingLeft: "20px"
    },
    title: {
        height: "24px",
        padding: "5px 0px",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px"
    },
    icon: {
        float: "right"
    }

};

var Accordion = React.createClass({
    displayName: 'Accordion',

    propTypes: {
        theme: RPT.object.isRequired,
        style: RPT.object,
        id: RPT.string,
        label: RPT.string,
        onRemove: RPT.func,
        onExpand: RPT.func,
        expanded: RPT.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: "",
            expanded: false
        };
    },

    componentWillMount: function componentWillMount() {},

    componentDidMount: function componentDidMount(payload) {},

    onRemove: function onRemove() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.id);
        }
        return false;
    },

    onToggle: function onToggle() {
        if (this.props.onExpand) {
            this.props.onExpand(!this.props.expanded ? this.props.id : null);
        }
    },

    render: function render() {
        var canvas = "";
        if (this.props.expanded) {
            canvas = React.createElement(
                'div',
                { style: styles.canvas },
                this.props.children
            );
        }

        return React.createElement(
            'div',
            { style: styles.container },
            React.createElement(
                'div',
                { style: styles.title, onClick: this.onToggle },
                this.props.label,
                React.createElement(Icon, { style: styles.icon, theme: this.props.theme, size: 20, color: this.props.theme.major, icon: 'delete', onClick: this.onRemove })
            ),
            canvas
        );
    }
});

module.exports = Accordion;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":76}],59:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var BarChart = React.createClass({
  displayName: 'BarChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    names: RPT.object,
    type: RPT.string,
    title: RPT.string,
    horizontal: RPT.bool,
    unit: RPT.string,
    precision: RPT.number,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      names: {},
      horizontal: false,
      unit: "",
      precision: 0
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var names = ['x'];
      var data = ['value'];
      for (var i in this.props.data) {
        var item = this.props.data[i];
        names.push(this.props.names[item[0]]);
        data.push(item[1]);
      }

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        data: {
          type: "bar",
          x: 'x',
          columns: [names, data],
          type: "bar",
          color: function color(inColor, data) {
            if (data.index !== undefined) {
              return colors[data.index % colors.length];
            }
            return inColor;
          },
          labels: {
            format: function format(v, id, i, j) {
              if (self.props.precision) {
                v = v.toFixed(self.props.precision);
              }
              return v + " " + self.props.unit;
            }
          }
        },
        transition: {
          duration: 200
        },
        axis: {
          rotated: this.props.horizontal,
          x: {
            type: 'category'
          },
          y: {
            show: false
          }
        },
        tooltip: {
          grouped: false
        },
        legend: {
          show: false
        },
        padding: {
          left: 10,
          bottom: 10,
          right: 10,
          top: 10
        },
        bar: {
          width: {
            ratio: 0.7,
            zerobased: false
          }
        }
      };

      if (this.props.horizontal) {
        config.padding = {
          left: 100,
          bottom: 30,
          right: 10,
          top: 10
        };
      }

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    var self = this;
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      var names = ['x'];
      var data = ['value'];
      for (var i in this.props.data) {
        var item = this.props.data[i];
        names.push(this.props.names[item[0]]);
        data.push(item[1]);
      }

      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      console.log("########################################## Load: " + this.props.title);
      self.graph.load({
        columns: [names, data]
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  checkIfPropsChanged: function checkIfPropsChanged(a, b) {
    if (JSON.stringify(a.theme) != JSON.stringify(b.theme) || a.type != b.type || a.horizontal != b.horizontal || a.unit != b.unit || a.precision != b.precision || a.width != b.width || a.height != b.height) {
      this.createGraph();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.updateGraph();
    this.checkIfPropsChanged(prevProps, this.props);
  },

  render: function render() {
    if (!this.id) {
      this.id = "X" + Math.round(Math.random() * 1000000);
    }
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement('div', { id: this.id, style: style });
  }
});

module.exports = BarChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":48,"./Icon.jsx":76}],60:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
  content: {
    cursor: "pointer"
  }
};

var Button = React.createClass({
  displayName: 'Button',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    size: RPT.number,
    color: RPT.string,
    icon: RPT.string,
    onClick: RPT.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 24,
      color: "#5a5a5a",
      onClick: function onClick() {}
    };
  },

  onClick: function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function render() {
    var styleContainer = Object.assign({}, styles.content, this.props.style);

    var icon = "";
    var button = "";

    if (this.props.icon) {
      icon = React.createElement(Icon, { size: this.props.size,
        color: this.props.color,
        icon: this.props.icon,
        style: styleContainer,
        onClick: this.onClick,
        theme: this.props.theme
      });
    }

    button = React.createElement(
      'div',
      null,
      icon,
      this.props.label,
      this.props.children
    );

    return React.createElement(
      'div',
      null,
      button
    );
  }
});

module.exports = Button;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Icon.jsx":76}],61:[function(require,module,exports){
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
},{}],62:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Actions = require('../../Dashboard/dashboard/Actions.jsx');

var styles = {
  container: {
    cursor: "pointer",
    textAlign: "center",
    color: "#ededed",
    fontSize: "16px",
    paddingLeft: "10px"

  },
  action: {
    verticalAlign: "middle",
    margin: "4px"
  }
};

var CardAction = React.createClass({
  displayName: 'CardAction',

  propTypes: {
    theme: RPT.object.isRequired,
    icon: RPT.string,
    color: RPT.string,
    size: RPT.number,
    action: RPT.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    style: RPT.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 24
    };
  },

  renderGraphic: function renderGraphic() {
    // see list of icons: http://dmfrancisco.github.io/react-icons/
    switch (this.props.icon) {
      case 'undo':
        return React.createElement(
          'g',
          null,
          React.createElement('path', { d: 'M12.5 8c-2.65 0-5.05.99-6.9 2.6l-3.6-3.6v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78c-1.39-4.19-5.32-7.22-9.97-7.22z' })
        );
      case 'settings':
        return React.createElement(
          'g',
          null,
          React.createElement('path', { d: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65c-.03-.24-.24-.42-.49-.42h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' })
        );
      case 'add-circle-outline':
        return React.createElement(
          'g',
          null,
          React.createElement('path', { d: 'M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' })
        );
      case 'highlight-remove':
        return React.createElement(
          'g',
          null,
          React.createElement('path', { d: 'M14.59 8l-2.59 2.59-2.59-2.59-1.41 1.41 2.59 2.59-2.59 2.59 1.41 1.41 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59-1.41-1.41zm-2.59-6c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' })
        );
      case 'lock':
        return React.createElement(
          'g',
          null,
          React.createElement('path', { d: 'M18 8h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9h-6.2v-2c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' })
        );
    }
  },

  onClick: function onClick() {
    if (this.props.action) {
      if (typeof this.props.action === "function") {
        this.props.action();
      } else {
        Actions.customAction(this.props.action);
      }
    }
  },

  render: function render() {

    this.props.color = this.props.color ? this.props.color : this.props.theme && this.props.theme.text || "#ededed";

    styles.container.color = this.props.theme ? this.props.theme.text : styles.container.color;

    var styleContainer = Object.assign({}, styles.container, this.props.style);
    var styleIcon = Object.assign({}, styles.action, {
      fill: this.props.color,
      width: this.props.size,
      height: this.props.size
    });

    return React.createElement(
      'div',
      { onClick: this.onClick, style: styleContainer },
      React.createElement(
        'svg',
        { viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet', fit: true, style: styleIcon },
        this.renderGraphic()
      ),
      React.createElement(
        'span',
        null,
        this.props.children
      )
    );
  }
});

module.exports = CardAction;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":41}],63:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	value: {
		whiteSpace: "pre",
		fontSize: "60px",
		fontWeight: "200",
		color: "#ededed",
		textAlign: "left",
		paddingLeft: "60px",
		paddingTop: "50px"
	},
	unit: {
		color: "#ededed",
		fontSize: "16px",
		paddingLeft: "60px",
		fontWeight: "normal"
	}
};

var CardDatapoint = React.createClass({
	displayName: "CardDatapoint",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		unit: RPT.string
	},

	render: function render() {

		styles.unit.color = this.props.theme.minor;
		styles.value.color = this.props.theme.major;

		var style = Object.assign({}, this.props.style ? this.props.style : {});

		return React.createElement(
			"div",
			{ style: style },
			React.createElement(
				"div",
				{ style: styles.value },
				this.props.children
			),
			React.createElement(
				"div",
				{ style: styles.unit },
				this.props.unit
			)
		);
	}
});

module.exports = CardDatapoint;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],64:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	cardDescription: {
		color: "#323232",
		fontSize: "12px",
		padding: "5px 20px",
		height: "30px"
	}
};

var CardDescription = React.createClass({
	displayName: "CardDescription",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function render() {
		styles.cardDescription.color = this.props.theme ? this.props.theme.text : styles.cardDescription.color;

		var style = Object.assign({}, styles.cardDescription, this.props.style ? this.props.style : {});
		return React.createElement(
			"div",
			{ style: style },
			this.props.children
		);
	}
});

module.exports = CardDescription;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],65:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	container: {
		width: "100%",
		height: "40px",
		border: "1px solid",
		borderColor: "transparent",
		position: "absolute",
		bottom: "0px",
		left: "0px"
	}
};

var CardFooter = React.createClass({
	displayName: "CardFooter",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function render() {
		styles.container.borderTopColor = this.props.theme.border;
		styles.container.backgroundColor = this.props.theme.content;

		var style = Object.assign({}, styles.container);
		return React.createElement(
			"div",
			{ style: style },
			this.props.children
		);
	}
});

module.exports = CardFooter;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],66:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	container: {
		float: "left",
		width: "50%"
	},
	value: {
		fontSize: "13px",
		fontWeight: "bold",
		textAlign: "left",
		paddingLeft: "30px"
	},
	title: {
		fontSize: "13px",
		fontWeight: "normal",
		letterSpacing: "0.5px",
		textTransform: "uppercase",
		paddingLeft: "30px",
		opacity: 0.5,
		marginTop: "5px"
	}
};

var CardFooterDatapoint = React.createClass({
	displayName: "CardFooterDatapoint",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		unit: RPT.string,
		title: RPT.string
	},

	render: function render() {

		styles.title.color = this.props.theme.minor;
		styles.value.color = this.props.theme.minor;

		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

		return React.createElement(
			"div",
			{ style: style },
			React.createElement(
				"div",
				{ style: styles.title },
				this.props.title
			),
			React.createElement(
				"div",
				{ style: styles.value },
				this.props.children,
				" ",
				this.props.unit
			)
		);
	}
});

module.exports = CardFooterDatapoint;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],67:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    position: "absolute",
    top: "50px",
    right: "60px",
    border: "1px solid",
    borderColor: "transparent"
  }
};

var CardLineChart = React.createClass({
  displayName: 'CardLineChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    showRange: RPT.bool,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: []
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      if (this.props.data && this.props.data.length > 0) {

        var today = new Date();
        var weekAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7);
        var zoomStart = today.toISOString().split("T")[0];
        var zoomEnd = weekAgo.toISOString().split("T")[0];

        var config = {
          size: {
            width: this.width,
            height: this.height
          },
          data: {
            type: "area",
            json: this.props.data,
            x: 'date',
            keys: {
              x: 'date',
              value: ['total']
            }
          },
          axis: {
            x: {
              type: "timeseries",
              extent: [zoomEnd, zoomStart]
            }
          },
          grid: {
            x: {
              show: true
            },
            y: {
              show: true
            }
          },
          point: {
            r: 4,
            focus: {
              expand: {
                enabled: true,
                r: 6
              }
            }
          },
          legend: {
            hide: true
          }
        };

        if (this.props.showRange) {
          config.subchart = {
            show: true,
            size: {
              height: 30
            }
          };
        }

        this.graph = c3.generate(config);

        dom.appendChild(this.graph.element);
      } else {
        dom.innerHTML = "Loading...";
        dom.style.padding = "30px";
      }
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.createGraph();
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});

    style.borderLeftColor = this.props.theme.border;

    return React.createElement('div', { style: style });
  }
});

module.exports = CardLineChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":48,"./Icon.jsx":76}],68:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	cardSection: {
		margin: "0 20px 20px",
		paddingTop: "20px",
		borderTop: "2px solid",
		borderColor: "#e5e5e5",
		first: {
			borderTop: null
		}
	}
};

var CardSection = React.createClass({
	displayName: "CardSection",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		first: RPT.bool
	},

	render: function render() {
		styles.cardSection.borderColor = this.props.theme ? this.props.theme.text : styles.cardSection.borderColor;

		var style = Object.assign({}, styles.cardSection, this.props.first && styles.cardSection.first);
		return React.createElement(
			"div",
			{ style: style },
			this.props.children
		);
	}
});

module.exports = CardSection;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],69:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    position: "absolute",
    top: "50px",
    right: "0px",
    border: "1px solid",
    borderColor: "transparent",
    width: "600px",
    height: "170px",
    overflow: "hidden",
    fontSize: "16px",
    paddingLeft: "50px"
  },
  table: {
    width: "100%",
    height: "100%"
  },
  headerRow: {},
  headerCell: {
    textAlign: "left",
    padding: "7px"
  },
  row: {},
  cell: {
    padding: "7px"
  }
};

var CardTable = React.createClass({
  displayName: 'CardTable',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    header: RPT.array,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      header: [],
      data: []
    };
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {}, { width: this.props.width + 'px' });

    style.borderLeftColor = this.props.theme.border;
    styles.cell.color = this.props.theme.minor;

    var data = this.props.data;
    var header = this.props.header;

    var self = this;

    return React.createElement(
      'div',
      { style: style },
      React.createElement(
        'table',
        { style: styles.table },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            { style: styles.headerRow },
            header.map(function (item) {
              return React.createElement(
                'th',
                { style: styles.headerCell },
                item
              );
            })
          )
        ),
        React.createElement(
          'tbody',
          null,
          data.map(function (row) {
            return React.createElement(
              'tr',
              { style: styles.row },
              row.map(function (cell) {
                return React.createElement(
                  'td',
                  { style: styles.cell },
                  cell
                );
              })
            );
          })
        )
      )
    );
  }
});

module.exports = CardTable;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":48,"./Icon.jsx":76}],70:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	cardTitle: {
		fontWeight: "600",
		textTransform: "uppercase",
		color: "#323232"
	}
};

var CardTitle = React.createClass({
	displayName: "CardTitle",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object
	},

	render: function render() {
		styles.cardTitle.color = this.props.theme ? this.props.theme.title : styles.cardTitle.color;
		var styleContainer = Object.assign({}, styles.cardTitle, this.styles);

		return React.createElement(
			"div",
			{ style: styles.cardTitle },
			this.props.children
		);
	}
});

module.exports = CardTitle;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],71:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var RPT = React.PropTypes;

var styles = {
  circle: {
    width: "16px",
    height: "16px",
    background: "#5596E6",
    MozBorderRadius: "50px",
    WebkitBorderRadius: "50px",
    borderRadius: "50px",
    float: "left",
    cursor: "pointer"
  },
  checkmark: {
    display: "inline-block",
    width: "22px",
    height: "22px",
    MsTransform: "rotate(45deg)",
    WebkitTransform: "rotate(45deg)",
    transform: "rotate(45deg)"
  },
  checkmarkBack: {
    position: "absolute",
    width: "2px",
    height: "9px",
    backgroundColor: "#ffffff",
    left: "7px",
    top: "6px"
  },
  checkmarkSeat: {
    position: "absolute",
    width: "4px",
    height: "2px",
    backgroundColor: "#ffffff",
    left: "4px",
    top: "13px"
  },
  inactiveCB: {
    width: "16px",
    height: "16px",
    background: "transparent",
    border: "2px solid #AEB8B8",
    MozBorderRadius: "50px",
    WebkitBorderRadius: "50px",
    borderRadius: "50px",
    float: "left",
    cursor: "pointer",
    boxSizing: 'border-box'
  },
  hoverCB: {
    borderColor: "#5596E6"
  }
};

var CheckBox = React.createClass({
  displayName: "CheckBox",

  propTypes: {
    checked: RPT.bool,
    id: RPT.string,
    name: RPT.string,
    onChange: RPT.func,
    style: RPT.object,
    theme: RPT.object.isRequired,
    value: RPT.string
  },

  getInitialState: function getInitialState() {
    return {
      checked: this.props.checked
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      checked: false,
      id: Math.random().toString(),
      //labelRight: true,
      name: "checkBoxName"
    };
  },

  handleChange: function handleChange(event) {
    this.setState({
      checked: !this.state.checked
    });
    if (this.props.onChange) {
      this.props.onChange(!this.state.checked);
    }
  },

  hoverCB: function hoverCB(event) {
    this.setState({
      hovered: true
    });
  },

  noHoverCB: function noHoverCB(event) {
    this.setState({
      hovered: false
    });
  },

  render: function render() {
    var outerStyle = Object.assign({}, this.props.style);
    var inactiveCB = Object.assign({}, styles.inactiveCB);
    if (this.state.hovered) {
      inactiveCB = Object.assign({}, styles.inactiveCB, styles.hoverCB);
    };
    var checkBoxChecked = React.createElement(
      "div",
      { onClick: this.handleChange, style: styles.circle },
      React.createElement(
        "span",
        { style: styles.checkmark },
        React.createElement("span", { style: styles.checkmarkBack }),
        React.createElement("span", { style: styles.checkmarkSeat })
      )
    );
    var checkBoxInactive = React.createElement("div", { onClick: this.handleChange, style: inactiveCB, onMouseOver: this.hoverCB, onMouseOut: this.noHoverCB });
    var output = this.state.checked ? React.createElement(
      "div",
      null,
      checkBoxChecked
    ) : React.createElement(
      "div",
      null,
      checkBoxInactive
    );
    return React.createElement(
      "div",
      { style: outerStyle },
      output
    );
  }
});

module.exports = CheckBox;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],72:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
  container: {
    marginBottom: "15px",
    boxSizing: "border-box"
  },
  colorTile: {
    margin: "5px",
    width: "24px",
    height: "24px",
    display: "inline-block",
    verticalAlign: "middle",
    fontSize: "20px",
    textAlign: "center"
  },
  tiles: {
    display: "block",
    width: "100%",
    float: "left"
  },
  after: {
    clear: "both"
  }
};

var ColorSelection = React.createClass({
  displayName: "ColorSelection",

  propTypes: {
    onChange: RPT.func,
    initialSelection: RPT.number,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialSelection: 0
    };
  },

  getInitialState: function getInitialState() {
    return {
      selection: this.props.initialSelection
    };
  },

  // componentWillReceiveProps: function(nextProps) {
  // 	if (nextProps.initialSelection !== undefined) {
  // 		this.setState({
  // 			selection: nextProps.initialSelection
  // 		})
  // 	}

  // },

  onSelect: function onSelect(id) {
    this.setState({
      selection: id
    });
    if (this.props.onChange) {
      this.props.onChange(id);
    }
  },

  render: function render() {
    var self = this;
    var schemes = this.props.theme.schemes;
    var tiles = schemes.map(function (scheme) {
      var style = Object.assign({}, styles.colorTile, {
        backgroundColor: scheme.normal,
        //borderTop: "4px solid " + scheme.dark,
        color: scheme.text
      });
      if (self.state.selection == scheme.name) {
        style.outline = "5px solid " + scheme.dark;
      }

      return React.createElement("div", { style: style, key: scheme.name, onClick: function onClick() {
          self.onSelect(scheme.name);
        } });
    });

    return React.createElement(
      "div",
      { style: styles.container },
      React.createElement(
        "div",
        { name: "tiles", style: styles.tiles },
        tiles.map(function (result) {
          return result;
        })
      ),
      React.createElement("div", { style: styles.after })
    );
  }
});

module.exports = ColorSelection;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],73:[function(require,module,exports){
(function (global){
'use strict';

/*global require, module*/
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var RPT = React.PropTypes;
var InputField = require('./InputField.jsx');
var Option = require('./Option.jsx');

var styles = {
	container: {
		display: "block",
		width: "100%"
	},
	inputField: {
		width: "100%",
		boxSizing: "border-box"
	},
	optionsContainer: {
		position: "relative",
		WebkitTransition: "all .2s ease-in-out",
		transition: "all .2s ease-in-out",
		overflowX: "auto",
		maxHeight: "200px",
		overflow: "auto",
		zIndex: "1000"
	},
	emptyOption: {
		padding: "6px"
	}
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Combobox-component
//

var ComboBox = React.createClass({
	displayName: 'ComboBox',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		onChange: RPT.func,
		initialValue: RPT.string,
		placeholderNoItems: RPT.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			placeholderNoItems: ""
		};
	},

	getInitialState: function getInitialState() {
		return {
			input: this.props.initialValue || "",
			hasInput: this.props.initialValue !== "",
			filteredChildren: [],
			isOpen: false
		};
	},

	componentWillMount: function componentWillMount() {
		this.chidrenAttachSelect();
	},

	componentDidMount: function componentDidMount() {
		this.filterChildren(this.state.input);
		this.updateOptionsSize();
	},

	componentDidReceiveProps: function componentDidReceiveProps() {
		this.chidrenAttachSelect();
		this.filterChildren(this.state.input);
	},

	updateOptionsSize: function updateOptionsSize() {
		var newWidth = ReactDOM.findDOMNode(this.refs.comboBox).offsetWidth;
		styles.optionsContainer.width = newWidth;
	},

	componentWillUpdate: function componentWillUpdate() {
		this.updateOptionsSize();
	},

	chidrenAttachSelect: function chidrenAttachSelect() {
		var self = this;
		var childrenWithSelect = [];
		React.Children.forEach(this.props.children, function (child) {
			var childWithSelect = React.cloneElement(child, { onSelect: self.onSelect });
			childrenWithSelect.push(childWithSelect);
		});
		this.state.children = childrenWithSelect;
	},

	filterChildren: function filterChildren(comp) {
		var filteredChildren = [];
		React.Children.forEach(this.state.children, function (child) {
			if (child._store.props.children.startsWith(comp) || child._store.props.value.startsWith(comp)) {
				filteredChildren.push(child);
			}
		});
		this.setState({ filteredChildren: filteredChildren });
		return filteredChildren;
	},

	handleInput: function handleInput(value) {
		if (value === "") {
			this.setState({ hasInput: false, input: value, isOpen: true });
		} else {
			this.setState({ hasInput: true, input: value, isOpen: true });
		}
		this.filterChildren(value);
		this.onChange(value);
	},

	onSelect: function onSelect(value, label, event) {
		this.setState({ input: label, hasInput: true, isOpen: false });
		this.onChange(label);
	},

	onFocus: function onFocus() {
		this.setState({ isOpen: true });
		this.filterChildren(this.state.input);
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	},

	onBlur: function onBlur() {
		this.setState({ isOpen: false });
		this.onChange(this.state.input);
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	},

	onChange: function onChange(value) {
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	},

	renderInputField: function renderInputField() {
		return React.createElement(InputField, { style: styles.inputField, containerStyle: { width: "100%" }, theme: this.props.theme, initialValue: this.props.initialValue, value: this.state.input, onChange: this.handleInput, onFocus: this.onFocus, onBlur: this.onBlur });
	},

	renderChildren: function renderChildren() {
		var children = "";

		var optionsContainer = Object.assign({}, styles.optionsContainer, this.props.optionsContainerStyle);

		if (this.state.hasInput) {
			if (this.state.filteredChildren.length !== 0) {
				console.log(this.state.filteredChildren);
				children = this.state.filteredChildren;
			} else {
				children = this.props.placeholderNoItems !== '' ? React.createElement(
					Option,
					{ value: null, theme: this.props.theme, style: styles.emptyOption, onSelect: function onSelect() {}, disabled: true },
					this.props.placeholderNoItems
				) : '';
			}
		} else {
			children = this.state.children;
		}
		var lastIndex = Array.isArray(children) ? children.length - 1 : null;
		var childrenElement = children !== '' ? React.createElement(
			'div',
			{ style: optionsContainer },
			React.Children.map(children, function (child, idx) {
				var currProps = {};
				if (lastIndex && lastIndex == idx) {
					currProps = { lastChild: true, firstChild: false };
				} else if (idx === 0) {
					currProps = { lastChild: false, firstChild: true };
				} else {
					currProps = { lastChild: false, firstChild: false };
				}
				var newChild = React.cloneElement(child, currProps);
				return newChild;
			})
		) : '';

		return childrenElement;
	},

	render: function render() {

		var containerStyle = Object.assign({}, styles.container, this.props.style);
		return React.createElement(
			'div',
			{ ref: 'comboBox', style: containerStyle },
			this.renderInputField(),
			this.state.isOpen ? this.renderChildren() : ""
		);
	}
});

module.exports = ComboBox;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./InputField.jsx":79,"./Option.jsx":84}],74:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var DashboardUtils = require('../../Dashboard/dashboard/DashboardUtils');
var Utils = require('../../Dashboard/util/Utils.js');
var Icon = require('./Icon.jsx');
var Section = require('./Section.jsx');
var ButtonText = require('./ButtonText.jsx');
var Portal = require('./Portal.jsx');

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
},{"../../Dashboard/dashboard/Actions.jsx":41,"../../Dashboard/dashboard/DashboardUtils":48,"../../Dashboard/util/Utils.js":56,"./ButtonText.jsx":61,"./Icon.jsx":76,"./Portal.jsx":85,"./Section.jsx":87}],75:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var DonutChart = React.createClass({
  displayName: 'DonutChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    names: RPT.object,
    title: RPT.string,
    width: RPT.number,
    height: RPT.number,
    focus: RPT.string,
    revert: RPT.bool,
    click: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      names: {}
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        data: {
          onclick: function onclick(d, i) {
            console.log("onclick", d, i);
          },
          onmouseover: function onmouseover(d, i) {
            console.log("onmouseover", d, i);
          },
          onmouseout: function onmouseout(d, i) {
            console.log("onmouseout", d, i);
          },
          type: "donut",
          columns: this.props.data
        },
        donut: {
          title: this.props.title,
          label: {
            format: function format(value, ratio) {
              return value;
            }
          },
          expand: true
        },
        legend: {
          show: false
        },
        color: {
          pattern: colors
        }
      };

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);

      this.setTitle();
    }
  },

  setTitle: function setTitle() {
    if (this.props.data) {
      var count = 0;
      for (var i in this.props.data) {
        var item = this.props.data[i];
        count += item[1];
      }

      if (count != Math.round(count)) {
        count = count.toFixed(2);
      }

      var label = d3.select('#' + this.id + ' text.c3-chart-arcs-title');

      label.html(''); // remove existant text
      label.insert('tspan').text(count).attr('dy', -10).attr('x', 0).attr('class', "donutMain").attr('fill', '#2E3636');
      label.insert('tspan').text(this.props.title).attr('dy', 30).attr('x', 0).attr('class', "donutMinor").attr('fill', '#899399');
    }
  },

  focus: function focus(id) {
    if (this.graph) {
      this.graph.focus(id);
    }
  },

  click: function click(id) {
    if (this.graph) {
      this.graph.click(id);
    }
  },

  revert: function revert(id) {
    if (this.graph) {
      this.graph.revert();
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      this.graph.load({
        columns: this.props.data
      });

      this.graph.data.names(this.props.names);

      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      this.setTitle();
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    // do not repaint for user interaction, otherwise the animation won't work
    if (nextProps.focus || nextProps.click || nextProps.revert) {
      if (nextProps.focus) {
        this.focus(nextProps.focus);
      }
      if (nextProps.click) {
        this.click(nextProps.click);
      }
      if (nextProps.revert) {
        this.revert(nextProps.revert);
      }
      return false;
    } else {
      return true;
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.updateGraph();
  },

  render: function render() {
    if (!this.id) {
      this.id = "X" + Math.round(Math.random() * 1000000);
    }
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement('div', { id: this.id, style: style });
  }
});

module.exports = DonutChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":48,"./Icon.jsx":76}],76:[function(require,module,exports){
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
},{}],77:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

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
},{"./Icon.jsx":76}],78:[function(require,module,exports){
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
},{}],79:[function(require,module,exports){
(function (global){
'use strict';

/*global require, module */
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var re_weburl = require('../../Dashboard/util/regex-weburl');

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
},{"../../Dashboard/util/regex-weburl":57}],80:[function(require,module,exports){
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
},{}],81:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var LineChart = React.createClass({
  displayName: 'LineChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.object,
    initialData: RPT.object,
    plots: RPT.array,
    title: RPT.string,
    range: RPT.number,
    autoscroll: RPT.bool,
    stacked: RPT.bool,
    steps: RPT.bool,
    overview: RPT.bool,
    legend: RPT.bool,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: {},
      plots: [],
      range: 60,
      autoscroll: true,
      overview: true,
      stacked: false,
      steps: false,
      legend: true

    };
  },

  getInitialState: function getInitialState() {
    return {
      data: this.props.initialData ? this.props.initialData : []
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  startScrolling: function startScrolling() {
    this.stopScrolling();
    var self = this;
    this.scrollInterval = setInterval(function () {
      self.adjustWindow();
    }, 1000);
  },

  stopScrolling: function stopScrolling() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  },

  adjustWindow: function adjustWindow() {
    if (this.graph) {
      this.graph.axis.max({
        x: new Date()
      });
      this.graph.zoom([new Date(new Date().getTime() - this.props.range * 1000), new Date()]);
    }
  },

  createGraph: function createGraph() {
    if (this.props.autoscroll) {
      this.startScrolling();
    } else {
      this.stopScrolling();
    }

    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var now = new Date();
      var before = new Date(now.getTime() - 1000 * this.props.range);
      var zoomStart = now;
      var zoomEnd = before;

      var keys = [];
      var colorMap = {};
      var names = {};
      for (var i in this.props.plots) {
        var plot = this.props.plots[i];
        keys.push(plot.id);
        colorMap[plot.id] = colors[i % colors.length];
        names[plot.id] = plot.label;
      }

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        data: {
          type: this.props.steps ? "step" : "area",
          json: [this.state.data],
          x: 'timestamp',
          keys: {
            x: 'timestamp',
            value: keys
          },
          groups: this.props.stacked ? [keys] : undefined,
          colors: colorMap,
          names: names
        },
        //            xFormat: '%Y-%m-%d %H:%M:%S'
        line: {
          connectNull: true,
          step: {
            type: 'step-after'
          }
        },
        axis: {
          x: {
            type: "timeseries",
            extent: [zoomEnd, zoomStart],
            tick: {
              format: '%H:%M:%S',
              culling: {
                max: 3
              },
              fit: true
            },
            min: before
          }
        },
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        point: {
          r: 4,
          focus: {
            expand: {
              enabled: true,
              r: 6
            }
          },
          show: !this.props.stacked // seems not to work with stacked
        },
        transition: {
          duration: 0
        },
        legend: {
          hide: !this.props.legend
        }
      };

      if (this.props.overview) {
        config.subchart = {
          show: true,
          size: {
            height: 30
          }
        };
      }

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    var self = this;
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      var keys = [];
      for (var i in this.props.plots) {
        keys.push(this.props.plots[i].id);
      }

      this.state.data.push(this.props.data);

      self.graph.load({
        json: this.state.data,
        keys: {
          x: "timestamp",
          value: keys
        }
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var oldProps = Object.assign({}, this.props);
    var newProps = Object.assign({}, prevProps);
    oldProps.data = null;
    newProps.data = null;
    if (JSON.stringify(oldProps) != JSON.stringify(newProps)) {
      this.createGraph();
      this.updateGraph();
    } else {
      this.updateGraph();
    }
  },

  onEnter: function onEnter() {
    this.stopScrolling();
  },

  onLeave: function onLeave() {
    if (this.props.autoscroll) {
      this.startScrolling();
    }
  },

  render: function render() {
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement('div', { style: style, onMouseOver: this.onEnter, onMouseOut: this.onLeave });
  }
});

module.exports = LineChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":48,"./Icon.jsx":76}],82:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var RPT = React.PropTypes;
var ol = (typeof window !== "undefined" ? window['openlayers'] : typeof global !== "undefined" ? global['openlayers'] : null);

/**
* Generic map to show pins
*/
var styles = {
	container: {
		height: "100%",
		width: "100%"
	}
};

var Map = React.createClass({
	displayName: 'Map',

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		showMyLocation: RPT.bool,
		lat: RPT.number,
		lng: RPT.number,
		zoom: RPT.number,
		minZoom: RPT.number,
		maxZoom: RPT.number,
		homeIcon: RPT.string,
		width: RPT.number,
		height: RPT.number
	},

	getDefaultProps: function getDefaultProps() {
		return {
			showMyLocation: true,
			lng: 11.575642,
			lat: 48.137294,
			zoom: 18,
			minZoom: 0,
			maxZoom: 20,
			homeIcon: "../../images/Location-Red_30px.png"
		};
	},

	componentDidMount: function componentDidMount() {
		this.createMap();
	},

	createMap: function createMap() {
		this.destroyMap();

		var dom = ReactDOM.findDOMNode(this);
		this.width = dom.offsetWidth;
		this.height = dom.offsetHeight;

		var source = new ol.source.OSM();
		var layer = new ol.layer.Tile({
			source: source
		});
		this.map = new ol.Map({
			layers: [layer],
			target: dom,
			view: new ol.View({
				zoom: this.props.zoom,
				minZoom: this.props.minZoom,
				maxZoom: this.props.maxZoom
			})
		});

		this.map.getView().setCenter(ol.proj.transform([this.props.lng, this.props.lat], 'EPSG:4326', 'EPSG:3857'));

		this.markers = [];

		if (this.props.showMyLocation) {
			this.getMyLocation();
		} else {
			if (this.props.lat !== undefined && this.props.lng != undefined) {
				this.myPosition = {
					lng: this.props.lng,
					lat: this.props.lat
				};
			}
		}
		this.updateMap();
	},

	destroyMap: function destroyMap() {
		if (this.map) {
			this.map.setTarget(null);
			this.map = null;
		}
	},

	getMyLocation: function getMyLocation() {
		var self = this;
		navigator.geolocation.getCurrentPosition(function (position) {
			self.myPosition = {
				lng: position.coords.longitude,
				lat: position.coords.latitude
			};
			self.updateMap();
		}, function () {
			console.log("Cannot determine location");
		});
	},

	updateMap: function updateMap() {
		this.cleanupMarkers();

		if (this.map && this.myPosition) {
			if (!this.myMarker) {
				this.myMarker = new ol.Overlay({
					position: ol.proj.transform([this.myPosition.lng, this.myPosition.lat], 'EPSG:4326', 'EPSG:3857'),
					offset: [-15, -30],
					element: $('<img src="' + this.props.homeIcon + '">')
				});
				this.map.addOverlay(this.myMarker);
			}

			//this.myMarker.setPosition([this.myPosition.lng, this.myPosition.lat]);
		}

		if (this.props.children) {
			this.showPins();
		} else {
			var self = this;
			setTimeout(function () {
				self.map.getView().setCenter(ol.proj.transform([self.myPosition.lng, self.myPosition.lat], 'EPSG:4326', 'EPSG:3857'));
			}, 1000);
		}
	},

	showPins: function showPins() {

		var pins = this.props.children;
		for (var i = 0; i < pins.length; i++) {
			var pin = pins[i];
			var icon = pin.props.icon;
			var lng = pin.props.lng;
			var lat = pin.props.lat;
			if (lng && lat) {
				var marker = new ol.Overlay({
					position: ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857'),
					offset: [-15, -30],
					element: $('<img src="' + icon + '">')
				});
				this.map.addOverlay(marker);

				this.assignMarker(marker, pin);
				this.markers.push(marker);
			}
		}

		this.focusMarker();
	},

	assignMarker: function assignMarker(marker, item) {
		marker.userObject = item;
	},

	cleanupMarkers: function cleanupMarkers() {
		for (var i in this.markers) {
			var marker = this.markers[i];
			if (marker) {
				this.map.removeOverlay(marker);
			}
		}
		this.markers = [];
	},

	focusMarker: function focusMarker() {
		var coordinates = [];
		if (this.myPosition && this.markers) {
			for (var i = 0; i < this.markers.length; i++) {
				var position = ol.proj.transform(this.markers[i].getPosition(), 'EPSG:3857', 'EPSG:4326');
				coordinates.push(position);
			}
			coordinates.push(ol.proj.transform(this.myMarker.getPosition(), 'EPSG:3857', 'EPSG:4326'));

			var extent = ol.extent.boundingExtent(coordinates);
			//extent = [8.018633106257766, 48.01862738258205, 8.96175012551248, 48.99163315445185];
			var size = this.map.getSize();
			this.map.getView().fit(ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857'), size);
		}
	},

	selectMarker: function selectMarker(marker, type, item) {
		// TODO
	},

	componentWillUnmount: function componentWillUnmount() {
		this.destroyMap();
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.width != this.props.width || nextProps.height != this.props.height) {
			this.createMap();
		} else {
			this.updateMap();
		}

		return false;
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
		return React.createElement('div', { style: style });
	}
});

module.exports = Map;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],83:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
//var ol = require('openlayers');

/**
* Pin in a map
*/
var styles = {
	container: {
		height: "100%",
		width: "100%"
	}
};

var MapPin = React.createClass({
	displayName: "MapPin",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		icon: RPT.string,
		id: RPT.string,
		lng: RPT.number,
		lat: RPT.number,
		payload: RPT.object
	},

	getDefaultProps: function getDefaultProps() {
		return {
			icon: "../../images/LocationGrey-30px.png"
		};
	},

	render: function render() {
		var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
		return React.createElement("div", { style: style });
	}
});

module.exports = MapPin;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],84:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

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
},{"./Icon.jsx":76}],85:[function(require,module,exports){
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
},{}],86:[function(require,module,exports){
(function (global){
'use strict';

/*global require, module */
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var re_weburl = require('../../Dashboard/util/regex-weburl');
var Icon = require('./Icon.jsx');

var styles = {
  field: {
    border: 'none',
    borderBottom: '3px solid #9EAAA9',
    boxShadow: 'none!important',
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '35px',
    padding: '8px 0px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#555',
    outline: 'none',
    lineHeight: '1.42857143',
    boxSizing: 'border-box',
    WebkitTransition: 'all .2s ease-in-out',
    transition: 'all .2s ease-in-out',
    backgroundColor: '#EFEFEF',
    borderColor: 'transparent',
    paddingLeft: "10px"

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
  },
  formElement: {
    paddingLeft: "40px",
    position: "relative"
  },
  icon: {
    position: "absolute",
    top: "8px",
    left: "8px"
  }

};

var SearchField = React.createClass({
  displayName: 'SearchField',

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    onChange: RPT.func,
    onSubmit: RPT.func,
    initialValue: RPT.string,
    placeholder: RPT.string,
    readOnly: RPT.bool,
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

  handleClick: function handleClick(event) {
    this.setState({
      hasFocus: true
    });
    if (this.props.onClick) {
      this.props.onClick(event.target.value);
    }
  },

  render: function render() {
    var warning = this.state.isValid ? '' : React.createElement(
      'div',
      { style: styles.validationWarning },
      '!'
    );

    var inputStyle = Object.assign({}, styles.field, this.props.style);

    var containerStyle = Object.assign({}, styles.fieldContainer, this.props.containerStyle);

    var inputField = React.createElement('input', { type: this.props.type, style: inputStyle, name: 'field', value: this.state.value, readOnly: this.props.readOnly, onKeyDown: this.handleSubmit, onChange: this.handleChange, onFocus: this.handleOnFocus, onClick: this.handleClick, onBlur: this.handleOnBlur, placeholder: this.props.placeholder });

    return React.createElement(
      'div',
      { style: styles.formElement },
      React.createElement(Icon, { theme: this.props.theme, color: this.props.theme.accent, icon: 'search', size: '24', style: styles.icon }),
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

module.exports = SearchField;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/regex-weburl":57,"./Icon.jsx":76}],87:[function(require,module,exports){
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
},{}],88:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;
var InputField = require('./InputField.jsx');
var Icon = require('./Icon.jsx');

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
},{"./Icon.jsx":76,"./InputField.jsx":79}],89:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
	content: {
		textOverflow: "ellipsis"
	}
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/Text-component
//

var SimpleText = React.createClass({
	displayName: "SimpleText",

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
		fontSize: RPT.number,
		alignment: RPT.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			initialValue: ""
		};
	},

	getInitialState: function getInitialState() {
		return {
			value: this.props.initialValue
		};
	},

	render: function render() {
		this.props.alignment !== null && this.props.alignment !== "null" ? "" : this.props.alignment !== "left";
		styles.content.fontSize = this.props.fontSize;
		styles.content.textAlign = this.props.alignment;
		styles.content.color = this.props.theme ? this.props.theme.text : "";

		var styleContainer = Object.assign({}, styles.content, this.props.style);

		return React.createElement(
			"div",
			{ style: styleContainer },
			this.props.children
		);
	}
});

module.exports = SimpleText;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],90:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var c3 = (typeof window !== "undefined" ? window['c3'] : typeof global !== "undefined" ? global['c3'] : null);
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');

var styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

var StaticChart = React.createClass({
  displayName: 'StaticChart',

  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    data: RPT.array,
    names: RPT.object,
    type: RPT.string,
    title: RPT.string,
    horizontal: RPT.bool,
    width: RPT.number,
    height: RPT.number,
    focus: RPT.string,
    revert: RPT.string,
    click: RPT.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      names: {},
      type: "bar",
      horizontal: false
    };
  },

  componentDidMount: function componentDidMount() {
    this.createGraph();
  },

  createGraph: function createGraph() {
    var self = this;
    this.destroyGraph();

    var container = ReactDOM.findDOMNode(this);

    var dom = document.createElement("div");
    container.appendChild(dom);

    this.width = this.props.width ? this.props.width : container.offsetWidth;
    this.height = this.props.height ? this.props.height : container.offsetHeight;

    var colors = this.props.theme.palette;

    if (this.width > 0 && this.height > 0) {

      dom.style.width = this.width + "px";
      dom.style.height = this.height + "px";

      var config = {
        size: {
          width: this.width,
          height: this.height
        },
        data: {
          onclick: function onclick(d, i) {
            console.log("onclick", d, i);
          },
          onmouseover: function onmouseover(d, i) {
            console.log("onmouseover", d, i);
          },
          onmouseout: function onmouseout(d, i) {
            console.log("onmouseout", d, i);
          },
          type: this.props.type
        },
        donut: {
          title: this.props.title,
          label: {
            format: function format(value, ratio) {
              return value;
            }
          },
          expand: true
        },
        bar: {
          width: {
            ratio: 0.9,
            zerobased: false
          }
        }
      };

      if (!this.props.horizontal) {
        config.data.columns = this.props.data;
        config.color = {
          pattern: colors
        };
        if (this.props.type == "donut") {
          config.legend = {
            show: false
          };
        }
      } else {
        var names = ['x'];
        var data = ['value'];
        for (var i in this.props.data) {
          var item = this.props.data[i];
          names.push(this.props.names[item[0]]);
          data.push(item[1]);
        }

        config.padding = {
          left: 100,
          bottom: 30
        };
        config.data = {
          x: 'x',
          columns: [names, data],
          type: this.props.type,
          color: function color(inColor, data) {
            if (data.index !== undefined) {
              return colors[data.index % colors.length];
            }
            return inColor;
          }
        };
        config.axis = {
          rotated: true,
          x: {
            type: 'category'
          },
          y: {
            show: false
          }
        };
        config.tooltip = {
          grouped: false
        };
        config.legend = {
          show: false
        };
        config.data.labels = true;
      }

      this.graph = c3.generate(config);

      dom.appendChild(this.graph.element);

      this.setTitle();
    }
  },

  setTitle: function setTitle() {
    if (this.props.data) {
      var count = 0;
      for (var i in this.props.data) {
        var item = this.props.data[i];
        count += item[1];
      }

      if (count != Math.round(count)) {
        count = count.toFixed(2);
      }
      if (this.props.type == "donut") {
        var label = d3.select('#' + this.id + ' text.c3-chart-arcs-title');

        label.html(''); // remove existant text
        label.insert('tspan').text(count).attr('dy', -10).attr('x', 0).attr('class', "donutMain").attr('fill', '#2E3636');
        label.insert('tspan').text(this.props.title).attr('dy', 30).attr('x', 0).attr('class', "donutMinor").attr('fill', '#899399');
      }
    }
  },

  focus: function focus(id) {
    if (this.graph) {
      this.graph.focus(id);
    }
  },

  click: function click(id) {
    if (this.graph) {
      this.graph.click(id);
    }
  },

  revert: function revert(id) {
    if (this.graph) {
      this.graph.revert();
    }
  },

  destroyGraph: function destroyGraph() {
    var dom = ReactDOM.findDOMNode(this);
    while (dom.firstChild) {
      dom.removeChild(dom.firstChild);
    }
    this.graph = null;
  },

  updateGraph: function updateGraph() {
    if (!this.graph) {
      this.createGraph();
    }
    if (this.graph) {
      if (this.props.horizontal) {
        var names = ['x'];
        var data = ['value'];
        for (var i in this.props.data) {
          var item = this.props.data[i];
          names.push(this.props.names[item[0]]);
          data.push(item[1]);
        }
        this.graph.load({
          columns: [names, data]
        });
      } else {
        this.graph.load({
          columns: this.props.data
        });

        this.graph.data.names(this.props.names);
      }

      var container = ReactDOM.findDOMNode(this);
      var width = this.props.width ? this.props.width : container.offsetWidth;
      var height = this.props.height ? this.props.height : container.offsetHeight;
      if (this.width != width || this.height != height) {
        this.width = width;
        this.height = height;
        this.graph.resize({ height: this.height, width: this.width });
      }

      this.setTitle();
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    // do not repaint for user interaction, otherwise the animation won't work
    if (nextProps.focus || nextProps.click || nextProps.revert) {
      if (nextProps.focus) {
        this.focus(nextProps.focus);
      }
      if (nextProps.click) {
        this.click(nextProps.click);
      }
      if (nextProps.revert) {
        this.revert(nextProps.revert);
      }
      return false;
    } else {
      return true;
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.destroyGraph();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.updateGraph();
  },

  render: function render() {
    if (!this.id) {
      this.id = "X" + Math.round(Math.random() * 1000000);
    }
    var style = Object.assign({}, styles.container, this.props.style ? this.props.style : {});
    return React.createElement('div', { id: this.id, style: style });
  }
});

module.exports = StaticChart;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/DashboardUtils":48,"./Icon.jsx":76}],91:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var RPT = React.PropTypes;

var styles = {
    container: {
        paddingTop: "5px"
    },
    switch: {
        position: "relative",
        border: "3px solid",
        borderColor: " #4581E0",
        width: "48px",
        float: "left",
        backgroundColor: "#4581E0",
        borderRadius: "13px",
        webkitTransition: "all .15s ease-out",
        mozTransition: "all .15s ease-out",
        msTransition: "all .15s ease-out",
        oTransition: "all .15s ease-out",
        transition: "all .15s ease-out"
    },
    label: {},
    toggleElement: {
        display: "block",
        webkitTransition: "left .15s ease-out",
        mozTransition: "left .15s ease-out",
        msTransition: "left .15s ease-out",
        oTransition: "left .15s ease-out",
        transition: "left .15s ease-out",
        width: "20px",
        height: "20px",
        backgroundColor: "white",
        position: "relative",
        borderRadius: "10px"
    },
    falseState: {
        left: "28px"
    },
    trueState: {
        left: "0px"
    },
    stateText: {
        lineHeight: "24px",
        marginLeft: "15px"
    }
};

var Switch = React.createClass({
    displayName: "Switch",

    propTypes: {
        theme: RPT.object.isRequired,
        style: RPT.object,
        initialValue: RPT.bool,
        value: RPT.bool,
        trueText: RPT.string,
        falseText: RPT.string,
        label: RPT.string
    },

    getInitialState: function getInitialState() {
        return {
            value: this.props.initialValue
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            initialValue: true,
            onChange: function onChange() {},
            trueText: "On",
            falseText: "Off"
        };
    },

    toggleState: function toggleState() {
        var toggleState = this.state.value;
        this.setState({ value: !toggleState });
        this.props.onChange(!toggleState);
    },

    componentWillMount: function componentWillMount() {
        // Apply theme colors here
        var theme = this.props.theme;
        styles.stateText.color = theme ? theme.major : "#323232";
    },

    render: function render() {
        var toggleStateStyle = this.state.value ? styles.trueState : styles.falseState;
        var toggleElementStyle = Object.assign({}, styles.toggleElement, toggleStateStyle);
        var toggleSwitchStyle = Object.assign({}, styles.switch, this.state.value ? {} : { backgroundColor: this.props.theme.minor, borderColor: this.props.theme.minor });
        var text = "";
        if (this.props.trueText !== "" && this.props.falseText !== "") {
            text = this.state.value ? this.props.trueText : this.props.falseText;
        } else {
            text = "";
        }

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { style: styles.container },
                React.createElement(
                    "div",
                    { style: toggleSwitchStyle, onClick: this.toggleState },
                    React.createElement("div", { style: toggleElementStyle })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "span",
                        { style: styles.stateText },
                        text
                    )
                )
            )
        );
    }
});

module.exports = Switch;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],92:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Griddle = (typeof window !== "undefined" ? window['Griddle'] : typeof global !== "undefined" ? global['Griddle'] : null); // component based on http://griddlegriddle.github.io/Griddle/index.html
var Icon = require('./IconLink.jsx');

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
},{"./IconLink.jsx":77}],93:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Table = require('./Table.jsx');
var Icon = require('./IconLink.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    textAlign: "center",
    width: "40px"
  }
};

var TableDetailBtn = React.createClass({
  displayName: 'TableDetailBtn',

  clickbtn: function clickbtn(event) {
    var data = Object.assign({}, this.props.rowData.__proto__);
    Actions.notify({ user: data });
  },

  render: function render() {
    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'a',
        { onClick: this.clickbtn },
        React.createElement(Icon, { theme: this.props.theme, size: '20', color: '#5a5a5a', icon: 'info' })
      )
    );
  }
});

module.exports = TableDetailBtn;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/dashboard/Actions.jsx":41,"./IconLink.jsx":77,"./Table.jsx":92}],94:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Griddle = (typeof window !== "undefined" ? window['Griddle'] : typeof global !== "undefined" ? global['Griddle'] : null);

var RPT = React.PropTypes;

var TableImage = React.createClass({
      displayName: 'TableImage',

      render: function render() {
            return React.createElement(
                  'div',
                  null,
                  React.createElement('img', { src: this.props.rowData.avatar, width: '40', height: '40', alt: 'Avatar' })
            );
      }
});

module.exports = TableImage;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],95:[function(require,module,exports){
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
},{}],96:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var Const = require('../../Dashboard/util/Const');
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var Actions = Reflux.createActions(['connect', 'disconnect', 'pause', 'resume']);

var AAAStore = Reflux.createStore({

  Actions: Actions,

  state: Const.DISCONNECTED,

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
      this.poll();
    }
  },

  changeState: function changeState() {
    this.trigger({ state: this.state });
  },

  poll: function poll() {
    var url = "http://localhost:6004/sso";
    var self = this;
    $.getJSON(url, function (ssoData) {
      console.log(ssoData);
      self.trigger(ssoData);
      setTimeout(function () {
        self.poll();
      }, 5000);
    });
  },

  init: function init() {
    this.listenTo(Actions.connect, this.onConnect);
    this.listenTo(Actions.disconnect, this.onDisconnect);
    this.listenTo(Actions.pause, this.onPause);
    this.listenTo(Actions.resume, this.onResume);

    this.trigger({ state: Const.DISCONNECTED });
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

module.exports = AAAStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":55}],97:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Const = require('../../Dashboard/util/Const');

var Actions = Reflux.createActions(['connect', 'disconnect', 'pause', 'resume']);

var DeviceStore = Reflux.createStore({

  Actions: Actions,

  state: Const.DISCONNECTED,

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
      this.poll();
    }
  },

  changeState: function changeState() {
    this.trigger({ state: this.state });
  },

  poll: function poll() {
    var url = "http://iotfcommondashboarddev.mybluemix.net/devices";
    //var url = "http://flm.mybluemix.net/devices";
    //var url = "http://localhost:6005/devices";
    //var url="https://mymielkeips.mybluemix.net/deviceSDP.php?id=" + this.device + "&raw=true";
    var self = this;
    $.getJSON(url, function (result) {
      self.transformData(result);
      var map = self.createMap(result);
      for (var key in map) {
        var entry = map[key];
        if (entry) {
          self.trigger({ device: key, model: entry });
        }
      }
      setTimeout(function () {
        self.poll();
      }, 5000);
    });
  },

  transformData: function transformData(data) {
    if (data["26877-POWER"] < 0) {
      data["26877-POWER"] = Math.abs(data["26877-POWER"]);
    }
  },

  createMap: function createMap(result) {
    var map = {};
    var keys = Object.keys(result);
    for (var i in keys) {
      var key = keys[i];
      var value = result[key];
      var tokens = key.split("-");
      if (tokens.length > 1) {
        var device = tokens[0];
        if (!map[device]) {
          map[device] = {};
        }
        map[device][key] = value;
      }
    }
    return map;
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

module.exports = DeviceStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":55}],98:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var Actions = Reflux.createActions(['setAuth', 'getAuth']);

var IoTFAuthStore = Reflux.createStore({

	Actions: Actions,

	auth: {
		ltpa: null,
		org: null,
		apiKey: null,
		apiToken: null
	},

	init: function init() {
		var self = this;
		this.listenTo(Actions.setAuth, function (a, b, c, d) {
			self.onSetAuth(a, b, c, d);
		});
	},

	getAuth: function getAuth() {
		return this.auth;
	},

	onSetAuth: function onSetAuth(org, ltpa, apiKey, apiToken) {
		if (org) {
			this.auth.org = org;
		};
		if (ltpa) {
			this.auth.ltpa = ltpa;
		};
		if (apiKey) {
			this.auth.apiKey = apiKey;
		};
		if (apiToken) {
			this.auth.apiToken = apiToken;
		};
		this.trigger(this.auth);
	}
});

module.exports = IoTFAuthStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],99:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
//var ibmiotf = require('ibmiotf');
var mqtt = (typeof window !== "undefined" ? window['Messaging'] : typeof global !== "undefined" ? global['Messaging'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Const = require('../../Dashboard/util/Const');
var IoTFAuthStore = require('./IoTFAuthStore.js');

var Actions = Reflux.createActions(['fetchDevice', 'fetchDevices', 'startDeviceWatch', 'stopDeviceWatch', 'loadDeviceHistory', 'startPropertyWatch', 'stopPropertyWatch']);

var State = {
	CONNECTED: "CONNECTED",
	DISCONNECTED: "DISCONNECTED"
};

var IoTFDeviceStore = Reflux.createStore({

	client: null,

	// keep track of watched objects
	watches: {
		devices: [],
		//events: [],
		properties: []
	},

	lastValueInterval: 60 * 24 * 60 * 1000, // look up last value in previous 24 hours

	Actions: Actions,

	init: function init() {
		IoTFAuthStore.listen(this.onAuth);
		this.listenTo(Actions.fetchDevice, this.onFetchDevice);
		this.listenTo(Actions.fetchDevices, this.onFetchDevices);
		this.listenTo(Actions.startDeviceWatch, this.onStartDeviceWatch);
		this.listenTo(Actions.stopDeviceWatch, this.onStopDeviceWatch);
		this.listenTo(Actions.startPropertyWatch, this.onStartPropertyWatch);
		this.listenTo(Actions.stopPropertyWatch, this.onStopPropertyWatch);
	},

	state: State.DISCONNECTED,

	onAuth: function onAuth() {
		// auth was updated
		this.initClient();
		this.connectClient();
	},

	initClient: function initClient() {
		var auth = IoTFAuthStore.getAuth();
		var randomNumber = Math.floor(Math.random() * 90000) + 10000;
		var clientId = 'a:' + auth.org + ':ptl' + randomNumber;

		var DOMAIN = window.location.hostname.split(auth.org + ".")[1];
		if (DOMAIN === undefined) {
			// if running as localhost
			DOMAIN = "internetofthings.ibmcloud.com";
		}
		var host = auth.org + ".messaging." + DOMAIN;

		var port = 443;

		this.client = new window.Messaging.Client(host, port, clientId);

		var self = this;

		this.client.onMessageArrived = function (message) {
			if (message && message.payloadString !== "") {
				console.log("MQTT Client: Message Arrived on topic " + message.destinationName);

				var topic = message.destinationName;
				var typeId = topic.split("/")[2];
				var deviceId = topic.split("/")[4];
				var evtType = topic.split("/")[6];

				// TODO: send trigger based on watches
				self.trigger({
					deviceEvent: {
						typeId: typeId,
						deviceId: deviceId,
						eventType: evtType,
						data: JSON.parse(message.payloadString),
						timestamp: new Date().toISOString()
					}
				});
			}
		};

		this.client.onConnectionLost = function (responseObj) {
			console.log("MQTT Client: Connection lost", responseObj);
			self.state = State.DISCONNECTED;
			setTimeout(function () {
				console.log("MQTT Client: Reconnecting...");
				self.connectClient();
			}, 100);
		};
	},

	connectClient: function connectClient() {
		var auth = IoTFAuthStore.getAuth();
		var self = this;
		var options = {
			onSuccess: function onSuccess() {
				self.state = State.CONNECTED;
				console.log("MQTT Client: Successfully opened a connection to the MQTT broker");
				self.handlePendingSubscribes();
			},
			onFailure: function onFailure(error) {
				console.log("MQTT Client: An error occured whilst trying to open a connection to the MQTT broker");
				self.state = State.DISCONNECTED;
			},
			useSSL: true,
			cleanSession: true
		};

		if (auth.ltpa) {
			options.userName = "use-ltpa-token";
			options.password = auth.ltpa;
		} else if (auth.apiKey) {
			options.userName = auth.apiKey;
			options.password = auth.apiToken;
		} else {
			throw new Error("No LTPA token or API key defined for connection");
		}

		this.client.connect(options);
	},

	onFetchDevice: function onFetchDevice() {
		// fetch device data
	},

	onFetchDevices: function onFetchDevices() {
		var deviceUrl = "/api/v0002/bulk/devices";
		var opts = {
			url: deviceUrl,
			contentType: "application/json"
		};
		//console.log(opts);
		var self = this;
		$.ajax(opts).done(function (response) {
			//console.log(response);
			try {
				if (response.meta && response.meta.total_rows) {
					self.trigger({
						devices: response.results
					});
				} else {
					// handle bad result?
				}
			} catch (e) {
				console.error(e);
			}
		}).fail(function (response) {
			console.error(response);
		});
	},

	handlePendingSubscribes: function handlePendingSubscribes() {
		// handle subscribes that happened before connect
		for (var i in this.watches.devices) {
			var topic = "iot-2/type/+/id/" + this.watches.devices[i] + "/evt/+/fmt/json";
			console.debug("subscribing to " + topic);
			this.client.subscribe(topic);
		}

		for (var i in this.watches.properties) {
			var deviceId = this.watches.properties[i].split("_|_")[0];
			var event = this.watches.properties[i].split("_|_")[1];
			var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
			console.debug("subscribing to " + topic);
			this.client.subscribe(topic);
		}
	},

	//////////////////////
	// Device Watch will trigger when any message is received from the device.
	onStartDeviceWatch: function onStartDeviceWatch(deviceId) {
		console.debug("onStartDeviceWatch -- ", deviceId);
		var topic = "iot-2/type/+/id/" + deviceId + "/evt/+/fmt/json";
		if (this.watches.devices.indexOf(deviceId) == -1) {
			this.watches.devices.push(deviceId);

			// is there already a connection? -> subscribe right away
			if (this.state == State.CONNECTED) {
				console.debug("subscribing to " + topic);
				this.client.subscribe(topic);
			}
		}
	},

	onStopDeviceWatch: function onStopDeviceWatch(deviceId) {
		console.debug("onStopDeviceWatch -- ", deviceId);
		var topic = "iot-2/type/+/id/" + deviceId + "/evt/+/fmt/json";
		console.debug("unsubscribing from " + topic);
		this.client.unsubscribe(topic);
		delete this.watches.devices[this.watches.devices.indexOf(deviceId)];
	},

	//////////////////////
	// Event Watch will trigger when a specific event is received from the device.
	/*
 onStartEventWatch: function(deviceId, event) {
 	var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
 	if (this.watches.events.indexOf(deviceId + "_|_" + event) == -1) {
 		this.watches.events.push(deviceId + "_|_" + event);
 			// is there already a connection? -> subscribe right away
 		if (this.state == State.CONNECTED) {
 			console.debug("subscribing to " + topic);
 			this.client.subscribe(topic);
 		}
 	}
 },
 	onStopEventWatch: function(deviceId, event) {
 	var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
 	console.debug("unsubscribing from " + topic);
 	this.client.unsubscribe(topic);
 	delete this.watches.events[this.watches.events.indexOf(deviceId + "_|_" + event)];
 }
 */

	//////////////////////
	// Property Watch will trigger when a specific property (JSON) on an event is
	// received from the device.
	onStartPropertyWatch: function onStartPropertyWatch(deviceId, event, property) {
		// TODO: add option to load from historian, send trigger when this data is returned
		console.debug("onStartPropertyWatch -- ", deviceId, event, property);
		var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
		if (this.watches.properties.indexOf(deviceId + "_|_" + event + "_|_" + property) == -1) {
			this.watches.properties.push(deviceId + "_|_" + event + "_|_" + property);

			// only subscribe if we are the first property watch to match this event
			var count = 0;
			for (var i in this.watches.properties) {
				if (this.watches.properties[i].split("_|_")[0] === deviceId && this.watches.properties[i].split("_|_")[1] === event) {
					count++;
				}
			}

			if (count === 1) {
				// is there already a connection? -> subscribe right away
				if (this.state == State.CONNECTED) {
					console.debug("subscribing to " + topic);
					this.client.subscribe(topic);
				}
			}
		}

		var auth = IoTFAuthStore.getAuth();

		auth = {
			ltpa: encodeURIComponent(auth.ltpa),
			org: encodeURIComponent(auth.org),
			apiKey: encodeURIComponent(auth.apiKey),
			apiToken: encodeURIComponent(auth.apiToken)
		};

		// call historian API to fetch last value for this event
		//
		// first lookup device type for this device (TODO: cache these values)
		var deviceUrl = "/api/v0002/bulk/devices?deviceId=" + deviceId;
		var opts = {
			url: deviceUrl,
			contentType: "application/json"
		};
		if (auth.apiKey != null) {
			// if running as localhost
			opts.url += "&org=" + auth.org + "&apiKey=" + auth.apiKey + "&apiToken=" + auth.apiToken;
		}
		console.debug("load historic data -- ", deviceId, deviceUrl);
		//console.log(opts);
		var self = this;

		$.ajax(opts).done(function (response) {
			try {
				if (response.results && response.results[0] && response.results[0].typeId) {
					var typeId = response.results[0].typeId;

					// TODO: move this to helper class and add bookmarking for paging...
					// right now a max of 100 events in the most recent 10 minutes will
					// be searched for the property
					//
					// and we only support d.<prop-field> and <prop-field> in this initial
					// implementation
					var now = new Date().getTime();
					var historianUrl = "/api/v0002/historian/types/" + typeId + "/devices/" + deviceId + "?evt_type=" + event + "&start=" + (now - self.lastValueInterval) + "&end=" + now;
					var opts = {
						url: historianUrl,
						contentType: "application/json"
					};
					if (auth.apiKey != null) {
						// if running as localhost
						opts.url += "&org=" + auth.org + "&apiKey=" + auth.apiKey + "&apiToken=" + auth.apiToken;
					}
					$.ajax(opts).done(function (response2) {
						try {
							if (response2.events) {
								var bHasD = property.indexOf("d.") === 0;
								var propToMatch = property;
								if (bHasD) {
									propToMatch = property.substring(2);
								}
								for (var i in response2.events) {
									if (response2.events[i].evt[propToMatch]) {
										var payload = response2.events[i].evt;
										if (bHasD) {
											payload = {
												d: payload
											};
										}
										setTimeout(function () {
											self.trigger({
												deviceEvent: {
													typeId: typeId,
													deviceId: deviceId,
													eventType: event,
													data: payload,
													timestamp: new Date(response2.events[i].timestamp["$date"]).toISOString()
												}
											});
										}, 1);
										return;
									}
								}
							} else {
								// handle bad result?
							}
						} catch (e) {
							console.error(e);
						}
					}).fail(function (response) {
						console.error(response);
					});
				} else {
					// handle bad result?
				}
			} catch (e) {
				console.error(e);
			}
		}).fail(function (response) {
			console.error(response);
		});
	},

	onStopPropertyWatch: function onStopPropertyWatch(deviceId, event, property) {
		console.debug("onStopPropertyWatch -- ", deviceId, event, property);
		delete this.watches.properties[this.watches.properties.indexOf(deviceId + "_|_" + event + "_|_" + property)];

		// only unsubscribe if there are no other properties watched on this event,
		// or if the event is being watched separately
		for (var i in this.watches.properties) {
			if (this.watches.properties[i].split("_|_")[0] === deviceId && this.watches.properties[i].split("_|_")[1] === event) {
				return;
			}
		}

		var topic = "iot-2/type/+/id/" + deviceId + "/evt/" + event + "/fmt/json";
		console.debug("unsubscribing from " + topic);
		this.client.unsubscribe(topic);
	}
});

module.exports = IoTFDeviceStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":55,"./IoTFAuthStore.js":98}],100:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
var Const = require('../../Dashboard/util/Const');
var IoTFAuthStore = require('./IoTFAuthStore.js');

var Actions = Reflux.createActions(['fetchDeviceCount', 'fetchDataTrafficUsage', 'fetchActiveDeviceUsage', 'fetchHistoricalDataUsage', 'fetchDeviceTypes']);

var IoTFUsageStore = Reflux.createStore({

	Actions: Actions,

	state: Const.DISCONNECTED,

	auth: {},

	auth: {

		// TODO This is a hack
		// It seems that we have multiple instances of the Stores, therefore we cannot pass the auth information in this.auth.
		// An other problem is, that apiToken is transferred as URL which requires encodeURI
		// org: encodeURIComponent("6qkzjf"),
		// apiKey: encodeURIComponent("a-6qkzjf-3egnjdo5qy"),
		// apiToken: encodeURIComponent("CW-aWx_sGeFGc&F?ls")

		// org: "jgccc5",
		// apiKey: "a-jgccc5-tkutlvvnem",
		// apiToken: "YfqMJVD18qcH@ispr0"

	},

	init: function init() {
		var self = this;
		this.listenTo(Actions.fetchDeviceTypes, this.onFetchDeviceTypes);
		this.listenTo(Actions.fetchDeviceCount, this.onFetchDeviceCount);
		this.listenTo(Actions.fetchDataTrafficUsage, this.onFetchDataTrafficUsage);
		this.listenTo(Actions.fetchActiveDeviceUsage, this.onFetchActiveDeviceUsage);
		this.listenTo(Actions.fetchHistoricalDataUsage, this.onFetchHistoricalDataUsage);

		IoTFAuthStore.listen(function (payload) {
			console.log("Retrieving auth:");
			self.auth = {
				ltpa: encodeURIComponent(payload.ltpa),
				org: encodeURIComponent(payload.org),
				apiKey: encodeURIComponent(payload.apiKey),
				apiToken: encodeURIComponent(payload.apiToken)
			};
			console.log(self.auth);
		});
	},

	onFetchDeviceCount: function onFetchDeviceCount() {
		//var deviceUrl = "https://" + IoTFCredentials.org + ".internetofthings.ibmcloud.com/";
		var opts = {
			url: "/api/v0002/bulk/devices",
			contentType: "application/json"
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			opts.url += "?org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}
		console.log(opts);
		var self = this;
		$.ajax(opts).done(function (response) {
			console.log(response);
			try {
				if (response.meta && response.meta.total_rows) {
					self.trigger({
						deviceCount: response.meta.total_rows
					});
				} else {
					// handle bad result?
				}
			} catch (e) {
				console.error(e);
			}
		}).fail(function (response) {
			console.error(response);
		});
	},

	onFetchDeviceTypes: function onFetchDeviceTypes() {
		//var deviceUrl = "https://" + IoTFCredentials.org + ".internetofthings.ibmcloud.com/";
		var opts = {
			url: "/api/v0001/device-types",
			contentType: "application/json"
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			opts.url += "?org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}
		console.log(opts);
		var self = this;

		var sortDeviceTypes = function sortDeviceTypes(a, b) {
			if (!a || !b) return 0;
			if (a.count < b.count) return 1;
			if (a.count > b.count) return -1;
		};

		$.ajax(opts).done(function (response) {
			console.log(response);
			try {
				response.sort(sortDeviceTypes);
				self.trigger({
					deviceTypes: response
				});
			} catch (e) {
				console.error(e);
			}
		}).fail(function (response) {
			console.error(response);
		});
	},

	onFetchDataTrafficUsage: function onFetchDataTrafficUsage() {
		console.debug("IoTFUsageStore::onFetchDataTrafficUsage");

		var today = new Date();
		var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split("T")[0];
		var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
		var thisMonthEnd = today.toISOString().split("T")[0];
		var rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		var lastMonthOpts = {
			url: "/api/v0002/usage/data-traffic?start=" + lastMonthStart + "&end=" + lastMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						var bytes = response.average;
						self.trigger({ dataTrafficUsageLastMonth: Math.round(bytes / 1000000) + " MB" });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			lastMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var thisMonthOpts = {
			url: "/api/v0002/usage/data-traffic?start=" + thisMonthStart + "&end=" + thisMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						var bytes = response.average;
						self.trigger({ dataTrafficUsageThisMonth: Math.round(bytes / 1000000) + " MB" });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			thisMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var rangeOpts = {
			url: "/api/v0002/usage/data-traffic?start=" + rangeStart + "&end=" + rangeEnd + "&detail=true",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						var days = response.days;
						for (var i in days) {
							days[i].total = days[i].total / 1000;
						}
						self.trigger({ dataTrafficUsageDetails: days });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			rangeOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		console.log(lastMonthOpts, thisMonthOpts);

		$.ajax(lastMonthOpts);
		$.ajax(thisMonthOpts);
		$.ajax(rangeOpts);
	},

	onFetchActiveDeviceUsage: function onFetchActiveDeviceUsage() {
		console.debug("IoTFUsageStore::onFetchActiveDeviceUsage");

		var today = new Date();
		var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split("T")[0];
		var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
		var thisMonthEnd = today.toISOString().split("T")[0];
		var rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		var lastMonthOpts = {
			url: "/api/v0002/usage/active-devices?start=" + lastMonthStart + "&end=" + lastMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						self.trigger({ activeDeviceUsageLastMonth: response.average.toFixed(1) });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {

			// if running as localhost
			lastMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var thisMonthOpts = {
			url: "/api/v0002/usage/active-devices?start=" + thisMonthStart + "&end=" + thisMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						self.trigger({ activeDeviceUsageThisMonth: response.average.toFixed(1) });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			thisMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var rangeOpts = {
			url: "/api/v0002/usage/active-devices?start=" + rangeStart + "&end=" + rangeEnd + "&detail=true",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						self.trigger({ activeDeviceUsageDetails: response.days });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			rangeOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		console.log(lastMonthOpts, thisMonthOpts);

		$.ajax(lastMonthOpts);
		$.ajax(thisMonthOpts);
		$.ajax(rangeOpts);
	},

	onFetchHistoricalDataUsage: function onFetchHistoricalDataUsage() {
		console.debug("IoTFUsageStore::onFetchActiveDeviceUsage");

		var today = new Date();
		var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split("T")[0];
		var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
		var thisMonthEnd = today.toISOString().split("T")[0];
		var rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		var lastMonthOpts = {
			url: "/api/v0002/usage/historical-data?start=" + lastMonthStart + "&end=" + lastMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						var bytes = response.average;
						self.trigger({ historicalDataUsageLastMonth: Math.round(bytes / 1000) + " MB" });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			lastMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var thisMonthOpts = {
			url: "/api/v0002/usage/historical-data?start=" + thisMonthStart + "&end=" + thisMonthEnd + "&detail=false",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						var bytes = response.average;
						self.trigger({ historicalDataUsageThisMonth: Math.round(bytes / 1000) + " MB" });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			thisMonthOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		var rangeOpts = {
			url: "/api/v0002/usage/historical-data?start=" + rangeStart + "&end=" + rangeEnd + "&detail=true",
			contentType: "application/json",
			success: function success(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						var days = response.days;
						for (var i in days) {
							days[i].total = days[i].total / 1000;
						}
						self.trigger({ historicalDataUsageDetails: response.days });
					}
				} catch (e) {
					console.error("parse error: " + response);
				}
			}
		};
		if (this.auth.apiKey != null) {
			// if running as localhost
			rangeOpts.url += "&org=" + this.auth.org + "&apiKey=" + this.auth.apiKey + "&apiToken=" + this.auth.apiToken;
		}

		console.log(lastMonthOpts, thisMonthOpts);

		$.ajax(lastMonthOpts);
		$.ajax(thisMonthOpts);
		$.ajax(rangeOpts);
	}
});

module.exports = IoTFUsageStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":55,"./IoTFAuthStore.js":98}],101:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var Const = require('../../Dashboard/util/Const');
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var Actions = Reflux.createActions(['connect', 'disconnect', 'pause', 'resume']);

var SSOSignInStore = Reflux.createStore({

  Actions: Actions,

  state: Const.DISCONNECTED,

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
      this.poll();
    }
  },

  changeState: function changeState() {
    this.trigger({ state: this.state });
  },

  poll: function poll() {
    var url = "http://localhost:6004/ssoSignIn";
    var self = this;
    $.getJSON(url, function (ssoSignInData) {
      console.log(ssoSignInData);
      self.trigger(ssoSignInData);
      setTimeout(function () {
        self.poll();
      }, 5000);
    });
  },

  init: function init() {
    this.listenTo(Actions.connect, this.onConnect);
    this.listenTo(Actions.disconnect, this.onDisconnect);
    this.listenTo(Actions.pause, this.onPause);
    this.listenTo(Actions.resume, this.onResume);

    this.trigger({ state: Const.DISCONNECTED });
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

module.exports = SSOSignInStore;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../Dashboard/util/Const":55}],102:[function(require,module,exports){
(function (global){
'use strict';

var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var Const = require('../../Dashboard/util/Const');

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
},{"../../Dashboard/util/Const":55}]},{},[54])
(54)
});