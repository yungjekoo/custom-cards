var React = require('react');
var Actions = require('../Dashboard/dashboard/Actions.jsx');
var DashboardUtils = require('../Dashboard/dashboard/DashboardUtils');
var Utils = require('../Dashboard/util/Utils.js');
var Icon = require('../common/components/Icon.jsx');
var Section = require('../common/components/Section.jsx');
var Button = require('../common/components/Button.jsx');
var Portal = require('../common/components/Portal.jsx');

var RPT = React.PropTypes;

var styles = {
  backdrop: {
    backgroundColor: 'rgba(21,41,53,0.3)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '2000',
    overflowY: 'auto',
    overflowX: 'auto'
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
    marginRight: '35px',
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
  tabContainer:{
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
  tabCancel: {
  },
  activeTab: {
    borderLeft: "8px solid #4581e0",
    color: "#4581e0"
  },
  closeBtnContainer: {
    position: 'absolute',
    top: '15px',
    right: '-15px'

  },
  wizTabContainer: {
  },
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
    cursor:'no-drop'
  },
  wizControlContainer:{
    boxSizing: 'border-box',
    bottom: '0',
    width: '15%',
    padding: '40px 0 40px 0',
    position: 'fixed'
  },
  horizontalLine:{
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
    cursor:'no-drop'
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
  },
  disabledTab: {
    color: 'silver',
    cursor: 'default'
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
  tabContainer:{
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
  tabCancel: {
  },
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
    cursor:'no-drop'
  },
  wizControlContainer:{
    boxSizing: 'border-box',
    bottom: '0',
    width: '15%',
    padding: '40px 0 40px 0',
    position: 'fixed'
  },
  horizontalLine:{
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
    cursor:'no-drop'
  }
};

var useOldDialog = DashboardUtils.getCapability('useOldDialogs');

var Dialog = {};

var Tab = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    id: RPT.string,
    active: RPT.bool,
    onClick: RPT.func,
    status: RPT.string
  },

  getDefaultProps: function () {
    return {
      active: false,
      id: Utils.createUUID()
    };
  },

  getInitialState: function () {
    return {
      hover: false,
      status: this.props.status
    };
  },

  componentWillReceiveProps: function (props) {
      this.setState({status: props.status});
  },

   onClick: function () {
    if (this.props.onClick && this.state.status !=="disabled") {
      this.props.onClick(this.props.id);
    }
  },

  onRemove: function () {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.id);
    }
  },

  onMouseOver: function () {
    this.setState({
      hover: true
    });
  },

  onMouseOut: function () {
    this.setState({
      hover: false
    });
  },

  render: function () {
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
        statusIcon = <Icon icon={"check"} size={15} theme={this.props.theme} style={statusIconStyle}/>;
      }
      if (this.state.status === 'disabled') {
        wizTabStatusStyle = styles.disabledWizTab;
        wizTabStatusStyleOld = stylesOld.disabledWizTab;
        var disableStyle = useOldDialog ? stylesOld.wizTabDisabled : styles.disabledTab;
        statusIconStyle = Object.assign({}, statusIconStyle, disableStyle);
        style = Object.assign({}, style, disableStyle);
      }
      if (useOldDialog) {
        if (this.state.status !== 'disabled' && (this.props.active || this.state.hover) ) {
          style = Object.assign({}, style, wizTabStatusStyleOld, {color: '#0D1111'} ); // Cool Grey 90
        }
      }
      else {
        if (this.props.active) {
          style = Object.assign({}, style, wizTabStatusStyle, styles.activeTab); // Cool Grey 90
        }
      }
    }
    else {
      style = useOldDialog ? stylesOld.tab : styles.tab;
      if (useOldDialog) {
        if (this.props.active || this.state.hover) {
          style = Object.assign({}, style, stylesOld.activeTab);
        }
      }
      else {
        if (this.props.active || this.state.hover) {
          style = Object.assign({}, style, styles.activeTab);
        }
      }
    }

    var textStyle = {};
    var remove = '';
    // Check if it is a wizard tab
    if(this.state.status){
      if(useOldDialog) {
        return (
        <div style={stylesOld.wizTabContainer}>
          <div style={style} key={this.props.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick}><span style={textStyle}>{this.props.children}</span>{statusIcon}{remove}</div>
        </div>);
      } else {
        var tabStyle = styles.wizTabContainer;
        if(this.props.subtab){
          tabStyle = Object.assign({}, tabStyle, {marginTop: "-20px"});
          style = Object.assign({}, style, styles.subTab, {
            padding: '5px 0px 5px ' + (20 + 20*this.props.subtab) + 'px'
          });
        }
        return(
        <div style={tabStyle}>
          <div style={style} key={this.props.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick}><span style={textStyle}>{this.props.children}</span>{statusIcon}{remove}</div>
        </div>);      }
    }
    else{
      if (this.props.onRemove) {
        var iconStyle = styles.tabCancel;
        if (this.state.hover) {
          iconStyle = Object.assign({},iconStyle, {opacity: 1});
        }
        textStyle = styles.tabText;
        remove = <Icon icon='delete' style={iconStyle} onClick={this.onRemove} color='#333333' size='18' theme={this.props.theme}/>;
      }
      if(useOldDialog) {
        return (
        <div style={stylesOld.tabContainer}>
          <div style={style} key={this.props.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick}><span style={textStyle}>{this.props.children}</span>{remove}</div>
        </div>);
      } else {
        return(
        <div style={styles.tabContainer}>
          <div style={style} key={this.props.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick}><span style={textStyle}>{this.props.children}</span>{remove}</div>
        </div>);      }
    }
  }
});

var ButtonsOld = React.createClass({
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

  getInitialState: function () {
    return {hover: false};
  },

  mouseOver: function () {
    this.setState({hover: true});
  },

  mouseOut: function () {
    this.setState({hover: false});
  },

  mouseDown: function () {
    this.setState({press: true});
  },

  mouseUp: function () {
      this.setState({press: false});
  },


  componentWillReceiveProps: function(nextProps) {
    if (nextProps.disabled !== undefined){
      this.setState({disabled: true});
    }
    else {
      this.setState({disabled: false});
    }
  },

  componentWillMount: function () {
    if (this.props.disabled){
      this.setState({disabled: true});
    }
    else {
      this.setState({disabled: false});
    }
  },

  getDefaultProps: function () {
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

  onClick: function () {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function () {
    var stateStyle = {};

    stateStyle.width = this.props.width;

    if (this.state.disabled){
      stateStyle.cursor = 'no-drop';
      stateStyle.backgroundColor = '';
      stateStyle.color = '#AEB8B8';
      stateStyle.borderColor = '#f4f4f4';
    }

    styleBtn = Object.assign({}, this.props.oldStyle, stateStyle, this.props.style);
    return (
            <a> <div style={styleBtn} onClick={this.onClick} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{this.props.text} {this.props.disabled} </div> </a>
  );
  }
});

var ButtonTab = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    onClick: RPT.func,
    id: RPT.string
  },

  getDefaultProps: function () {
    return {
        label: 'Label',
        id: Utils.createUUID()
    };
  },

  render: function () {
    return (
      <div style={styles.tab} onClick={this.props.onClick}>{this.props.children}</div>
    );
  }
});

var DialogTab = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    label: RPT.string,
    description: RPT.string,
    onClick: RPT.func,
    selected: RPT.bool,
    id: RPT.string
  },

  getDefaultProps: function () {
    return {
        label: 'Label',
        id: Utils.createUUID()
    };
  },

  render: function () {
    var header = "";

    if (this.props.label) {
    var description = "";
      if (this.props.description) {
        description = <div style={Object.assign(styles.tabDescription, {color: this.props.theme.minor})}>{this.props.description}</div>;
      }
      header = <div style={Object.assign(styles.tabTitle, {color: this.props.theme.major, borderColor: this.props.theme.minor})}>{this.props.label}{description}</div>;
    }
    return (
      <div>
        {header}
        {this.props.children}
      </div>
    );
  }
});

var DialogButtons = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function () {
    return {
    };
  },

  render: function () {
    return (<div>{this.props.children}</div>);
  }
});

var Dialog = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    nls: RPT.object,
    onSubmit: RPT.func,
    onCancel: RPT.func
  },

  getDefaultProps: function () {
    return {
    };
  },

  componentWillMount: function () {
    var mql = window.matchMedia("(min-width: 800px)");
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql});
  },

  componentWillUnmount: function() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged: function(payload){
    console.log('MediaQueryChanged',payload);
  },

  getInitialState: function () {
    var tabs = this.getTabs();
    return {
      activeTab: (tabs.length > 0) ? tabs[0].props.id:null,
      useOldDialog: DashboardUtils.getCapability('useOldDialogs')
    };
  },

  onCancel: function () {
    if(this.props.onCancel){
      this.props.onCancel();
    }
    Actions.closeDialog();
  },

  onTabClicked: function(id) {
    this.setActiveTab(id);
  },

  setActiveTab: function(id) {
    this.setState({
      activeTab: id
    });
  },

  activateNextTab: function () {
    var self = this;
    var setActive = false;
    var nextID = null;
    React.Children.forEach(this.props.children, function(child) {
      if(child !== null){
        if (setActive && child.type.displayName === 'DialogTab') {
          nextID = child.props.id;
          setActive = false;
        }
        else{
          if (child.props.id === self.state.activeTab) {
            setActive = true;
          }
        }
      }
    });
    if (nextID !== null) {
      self.setActiveTab(nextID);
    }
  },

  activatePreviousTab: function () {
    var self = this;
    var foundID = false;
    var previousID = null;
    React.Children.forEach(this.props.children, function(child) {
      if(child !== null){
        if(child.props.id === self.state.activeTab){
          foundID =true;
        }
        if(!foundID && child.type.displayName === 'DialogTab'){
          previousID = child.props.id;
        }
      }
    });
    if (previousID !== null) {
      self.setActiveTab(previousID);
    }
  },

  getTabs: function () {
    var dialogTabs = [];
    var children = [];
    React.Children.forEach(this.props.children, function(child) {children.push(child);});
    for (var i in children) {
      var tab = children[i];
      if (tab !== null && (tab.type.displayName == 'DialogTab' || tab.type.displayName == 'WizardTab')) {
        dialogTabs.push(tab);
      }
    }
    return dialogTabs;
  },

  getButtonTabs: function () {
    var buttonTabs = [];
    var children = [];
    React.Children.forEach(this.props.children, function(child) {children.push(child);});
    for (var i in children) {
      var tab = children[i];
      if (tab !== null && tab.type.displayName == 'ButtonTab') {
        buttonTabs.push(tab);
      }
    }
    return buttonTabs;
  },

  getButtons: function () {
    var dialogButtons = null;
    var children = [];
    var newBtns = [];
    var fnct = function(){
      var currBtn = <ButtonsOld {...btn.props}></ButtonsOld>;
      newBtns.push(currBtn);
    };
    React.Children.forEach(this.props.children, function(child) {children.push(child);});
    for (var i in children) {
      var buttons = children[i];
      if (buttons !== null && buttons.type.displayName == 'DialogButtons') {
        if(useOldDialog){
          newBtns = [];
          React.Children.forEach(buttons.props.children, fnct);
          return newBtns;
        } else{
          return buttons;
        }

      }
    }
  },

  onSubmit: function(){
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    //  find selected tab
    var active = null;

    React.Children.forEach(nextProps.children, function(child) {
      if (child !== null && child.props.selected) {
        active = child.props.id;
      }
    });

    if (active) {
      this.setState({
        activeTab: active
      });
    }
  },

  render: function () {
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
    for (var j in dialogTabs) {
      tab = dialogTabs[j];
      if (tab.props.id == activeTab) {
        break;
      }
    }

    var isSubmitTab = tab.props.isSubmitTab===true?true:false;
    var isFirstTab = tab.props.isFirstTab==true?true:false;

    var dialogButtons = this.getButtons();
    var buttonTabs = this.getButtonTabs();
    var wizController = '';
  var dialogTabHandles;

    if (this.state.useOldDialog) {
      var btnRightStyle = Object.assign({}, stylesOld.wizBtn, stylesOld.wizBtnRight);
      var nextBtn = <div style={btnRightStyle}>Next</div>;
      var backBtn = <div style={stylesOld.wizBtn}>Back</div>;
      var styleBackdrop = Object.assign({}, stylesOld.backdrop, stylesOld.dialogFade);
      var tabSections = '';

      dialogTabHandles = dialogTabs.map(function(tab) {
        if (tab.props.status) {
          isWizard=true;
        }
          return <Tab key={tab.props.id} onRemove={tab.props.onRemove} subtab={tab.props.subtab} onClick={self.onTabClicked} active={tab.props.id == activeTab} theme={self.props.theme} id={tab.props.id} status={tab.props.status}>{tab.props.label}</Tab>;
        });
      if(isWizard){
        tab = <Section headingSection={tab.props.label}>{tab}</Section>;
        wizController = <div style={stylesOld.wizControlContainer}>
          <div style={stylesOld.horizontalLine}></div>
          {backBtn}
          {nextBtn}
        </div>;
      }
      else{
        tab = '';
        tabSections = dialogTabs.map(function (currtab) {
          return(
            <Section headingSection={currtab.props.label}>
              {currtab}
            </Section>
          );
      });
      }

      return (
        <div style={stylesOld.backdrop}>
          <div style={stylesOld.outerContainer}>
            <div style={stylesOld.innerContainer}>
              <div style={stylesOld.columnContainer}>
                <div style={stylesOld.navigationContainer}>
                  <div style={stylesOld.navigationTabContainer}>
                    {dialogTabHandles}
                    {buttonTabs.map(function(currTab) {
                      return currTab;
                    })}
                  </div>
                </div>
                <div style={stylesOld.mainContentContainer}>
                  <div style={stylesOld.mainContent}>
                    <div style={styles.header}>
                    <div style={styles.title}>{this.props.title}</div>
                    <div style={styles.description}>{this.props.description}</div>
                  </div>
                  <div style={styles.canvas}>
                    {tab}
                    {tabSections}
                  </div>
                  <div style={stylesOld.buttons}>
                    {dialogButtons}
                  </div>
                  </div>
                </div>
                <div style={stylesOld.navigationContainer}>
                  <div style={stylesOld.closeBtnContainer}>
                    <Icon icon='highlight-remove' style={stylesOld.cancel} onClick={this.onCancel} color='#FFF' size='32' theme={this.props.theme}/>
                  </div>
                  {wizController}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      wizController = '';
      dialogTabHandles = dialogTabs.map(function(tab) {
          if (tab.props.status) {
              isWizard = true;
          }
          return <Tab key={tab.props.id} onRemove={tab.props.onRemove} subtab={tab.props.subtab} onClick={self.onTabClicked} active={tab.props.id == activeTab} theme={self.props.theme} id={tab.props.id} status={tab.props.status}>{tab.props.label}</Tab>;
        });
      if(isWizard){
        wizController = <div>
                  <DialogButtons theme={this.props.theme}>
          {isFirstTab?
          <span/>
            :
          <Button onClick={self.activatePreviousTab} text={self.props.nls.resolve('Back')}></Button>
          }
          {isSubmitTab?
            <Button isPrimary={true} onClick={self.onSubmit} text={self.props.nls.resolve('Submit')}></Button>
          :
            <Button isPrimary={true} onClick={self.activateNextTab} text={self.props.nls.resolve('Next')}></Button>
          }
        </DialogButtons>
        </div>;
      }
      return (
          <div style={styles.backdrop}>
            <div >
              <div >
                <div style={styles.container}>
                  <div style={styles.navigationContainer}>
                    <div style={styles.navigationTabContainer}>
                      {dialogTabHandles}
                      {buttonTabs.map(function(currTab) {
                        return currTab;
                      })}
                    </div>
                  </div>
                  <div style={styles.content}>
                    <div style={styles.closeBtnContainer}>
                      <Icon icon='highlight-remove' style={stylesOld.cancel} onClick={this.onCancel} color='#000' size={25} theme={this.props.theme}/>
                    </div>
                    <div style={styles.header}>
                      <div style={styles.title}>{this.props.title}</div>
                      <div style={styles.description}>{this.props.description}</div>
                    </div>
                    <div style={styles.canvas}>
                      {tab}
                    </div>
                    <div style={styles.buttons}>
                      {wizController}
                      {dialogButtons}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>);
    }
    }
});

Dialog.Dialog = Dialog;
Dialog.DialogTab = DialogTab;
Dialog.DialogButtons = DialogButtons;
Dialog.ButtonTab = ButtonTab;

module.exports = Dialog;
