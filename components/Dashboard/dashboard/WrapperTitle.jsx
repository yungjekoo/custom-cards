var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
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
    paddingLeft: "70px",
    height: "50px",
    lineHeight: "50px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    fontWeight: "500",
    overflow: "hidden",
    transition: "background-color 0.3s ease, height 0.3s ease",
    cursor: "move"
  },
  fullSize: {
    height: '80px',
    lineHeight: '80px',
    fontSize: '40px',
    fontWeight: '200',
    color: '#ededed',
    backgroundColor: '#FFFFFF',
    borderBottom: '5px solid white',
    marginBottom: '35px'
  },
  actions: {
    float: 'right',
    marginLeft: '20px',
    fontSize: '14px'
  },
  actionBox: {
    whiteSpace: 'nowrap',
    position: 'relative',
    float: 'right',
    marginRight: '30px',
    marginTop: '13px',
    lineHeight: '0px'
  },
  icon: {
    marginLeft: '3px',
    opacity: '1',
    MozTransition: 'all 0.25s ease',
    WebkitTransition: 'all 0.25s ease',
    OTransition: 'all 0.25s ease',
    transition: 'all 0.25s ease'
  },
  actionIcon: {
    marginLeft: '3px'
  },
  anchor: {
    outline: 'none'
  },
  input: {
  position: 'absolute',
    backgroundColor: 'silver',
    fontWeight: '200',
    color: '#ededed',
    top: 0,
    height: "80px",
    lineHeight: "80px",
    fontSize: "40px"
  },
  categoryIcon: {
    position: "relative",
    top: "9px",
    left: "9px"

  },
  categoryContainer: {
    width: "50px",
    position: "absolute",
    height: "50px",
    top: "0px",
    left: "0px",
    transition: "height 0.3s ease",
    overflow: "hidden",
    lineHeight: '0px'

  },
  expandIcon: {
    position: "absolute",
    right: "5px",
    top: "10px",
    cursor: "pointer",
    zIndex: 1,
    overflow: "hidden"
  }
};

var WrapperTitle = React.createClass({
  propTypes: {
    title: RPT.string,
    id: RPT.string,
    style: RPT.object,
    theme: RPT.object.isRequired,
    fullSize: RPT.bool,
    container: RPT.bool,
    category: RPT.string,
    sticky: RPT.bool,
    showRefresh: RPT.bool,
    minimize: RPT.bool
  },

    applyTheme: function() {
      var t = this.props.theme;
      if (t) {
        styles.title.backgroundColor = t.normal;
        styles.title.color = t.titleText;
        styles.fullSize.color = t.textOnCanvas;
        styles.fullSize.borderBottom = "5px solid " + t.textOnCanvas;
        styles.fullSize.backgroundColor = t.canvas;
        styles.categoryContainer.backgroundColor = t.light;
        styles.input.color = t.textOnCanvas;
      }
    },

  getDefaultProps: function() {
    return {
      fullSize: false
    };
  },

  getInitialState: function() {
    return {
      showAction: false,
      maximized: false
    };
  },

  onAdd: function() {
    Actions.addComponent(this.props.id);
  },

  toggleActions: function() {
  this.closeActionsLater();
    this.setState({
      showActions: !this.state.showActions,
      maximized: !this.state.showActions
    });
  },

  hideActions: function() {
      this.setState({
        showActions: false,
        maximized: false

      });
  },

  closeActionsLater: function() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    var self = this;
    this.closeTimer = setTimeout(function() {
      self.hideActions();
      self.closeTimer = null;
    }, 3000);
  },

  handleSettings: function() {
    this.hideActions();
    if (this.props.fullSize) {
      // edit a horizontal separator directly
      this.setState({
        editFullSize: true
      });
    } else {
      Actions.showDialog({
        id: this.props.id,
        type: this.props.type=='EmptyComponent'?undefined:this.props.type,
        action: 'modifyCard'
      });
    }
  },

  handleRemove: function() {
    this.hideActions();
      Actions.removeComponent({
        id: this.props.id
      });
  },

  handleToggleSize: function() {
  this.closeActionsLater();
    Actions.expandCard(this.props.id, true);
  },

  handleMoveUp: function() {
    this.closeActionsLater();
    Actions.moveComponent({direction:'up', id: this.props.id})
  },

  handleMoveDown: function() {
    this.closeActionsLater();
    Actions.moveComponent({direction:'down', id: this.props.id})
  },

  onTitleChanged: function(value) {
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

  onExpand: function() {
  this.closeActionsLater();
    this.setState({
      maximized: true
    })
  },

   getDelayForButtonStyle: function() {
     // TODO This does not work since the animation is done with React means.
     // We want the action pop in one after the other
     // var delay = {
     //    MozTransitionDelay: this.buttonDelayCounter + 's',
     //    WebkitTransitionDelay: this.buttonDelayCounter + 's',
     //    OTransitionDelay: this.buttonDelayCounter + 's',
     //    transitionDelay: this.buttonDelayCounter + 's'
     // }
     // this.buttonDelayCounter += 1;
     // return Object.assign({}, styles.icon, delay);
     return styles.actionButton;
   },

  render: function() {
    this.buttonDelayCounter = 0;
    this.applyTheme();

    var title = styles.title;

    var add = '';
    var element = '';

    if (this.props.title === undefined) {
      element = 'Loading...';
    } else {
      if (this.props.fullSize) {
        title = styles.fullSize;
      }
        if (this.props.container) {
            add = <IconLink theme={this.props.theme} color={this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='add-circle-outline' size='24' style={styles.actions} action={this.onAdd}>Add card</IconLink>;
        }
      if (this.state.editFullSize) {
            element = <InputField style={styles.input} theme={this.props.theme} onSubmit={this.onTitleChanged} initialValue={this.props.title}></InputField>;
      } else {
        element = this.props.title;
      }
    }

    var maximizeIcon = this.state.maximized?'fullscreen-exit':'fullscreen';

    var actionIconClosed = Object.assign({},styles.actionIcon,{
        display: 'none'
    });

    var actionsAnchorOpen = Object.assign({},styles.icon,{
        opacity: '0.3',
        MozTransform: 'rotate(-90deg)',
        WebkitTransform: 'rotate(-90deg)',
        OTransform: 'rotate(-90deg)',
        transform: 'rotate(-90deg)'
    });

    var classNames = '';
    var settings = '';
    var remove = '';
    var actionsAnchor = '';
    var sizeAnchor = '';
    var refreshAnchor = '';
    var moveUpAnchor = '';
    var moveDownAnchor = '';
    var actionBtns = [];
    var titleContainer = [];



    if(!this.props.mobile){
      classNames = 'wrapper-title react-draggable-active';
    }

    console.log("WRAPPER EXPERIMENTAL",DashboardStore.isExperimentalMode())

    if(!this.props.mobile){
      if ((!this.props.sticky || this.props.fullSize) && DashboardStore.isExperimentalMode() ) {
          settings = <Icon key='settings' theme={this.props.theme} style={this.getDelayForButtonStyle()} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='settings' onClick={this.handleSettings}/>;
          if(this.state.showActions){
            actionBtns.push(settings);
          }
      }
      if (!this.props.sticky && DashboardStore.isExperimentalMode()) {
        remove = <Icon key='delete' theme={this.props.theme} style={this.getDelayForButtonStyle()} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='delete' onClick={this.handleRemove}/>;
        if(this.state.showActions){
          actionBtns.push(remove);
        }
      }
    }

    if(this.props.mobile && this.state.showActions){
      moveUpAnchor =  <Icon key='moveUp' theme={this.props.theme} style={this.getDelayForButtonStyle()} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='arrow-up' onClick={this.handleMoveUp} />
      moveDownAnchor = <Icon key='moveDown' theme={this.props.theme} style={this.getDelayForButtonStyle()} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='arrow-down' onClick={this.handleMoveDown} />
      actionBtns.push(moveUpAnchor);
      actionBtns.push(moveDownAnchor);
    }

      actionsAnchor = <a key='dots' style={styles.anchor} tabIndex='1' onBlur={this.closeActionLater} href='javascript:void(0)'>
              <Icon theme={this.props.theme} style={this.state.showActions?actionsAnchorOpen:styles.icon} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='dots' onClick={this.toggleActions}/>
            </a>;
      sizeAnchor = <Icon key='sizeAnchor' theme={this.props.theme} style={this.getDelayForButtonStyle()} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon={maximizeIcon} onClick={this.handleToggleSize}/>;
      if(this.state.showActions){
        actionBtns.push(sizeAnchor);
      }

    if(this.state.showActions && this.props.showRefresh ){
      refreshAnchor = <Icon key='refresh' theme={this.props.theme} style={this.getDelayForButtonStyle()} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon='refresh' />;
      actionBtns.push(refreshAnchor);
    }

    if(!this.state.showActions){
      titleContainer.push(<span key="titlecontainer" style={styles.text} className={classNames}>{!this.state.showActions?element:''}</span>);
    }

    // assign an icon for the category
  var validCategories = ["Basic", "Alert","Devices", "Test", "Custom", "Usage", "Sample"];
  var iconName = this.props.category;

  if (!iconName || validCategories.indexOf(iconName) == -1) {
    iconName = "Test";
  }

  var expandIcon = "";
  var categoryContainer = styles.categoryContainer;
  if (this.props.minimize && !this.state.maximized) {
    title = Object.assign({}, title, {height: "5px"});
    categoryContainer = Object.assign({}, styles.categoryContainer, {height: "5px"});
    expandIcon = <a style={styles.expandIcon} tabIndex='1' href='javascript:void(0)'>
                <Icon theme={this.props.theme} style={styles.expand} color= {this.props.theme.major} icon='dots' onClick={this.onExpand}/>
                </a>;
  }

  var category = "";
  if (!this.props.fullSize) {
    category = <div
      key='category'
      style={categoryContainer}
      theme={this.props.theme}
    >
          <Icon theme={this.props.theme} style={styles.categoryIcon} size={32} color= {this.props.fullSize?this.props.theme.textOnCanvas:this.props.theme.content} icon={iconName}/>
    </div>;
  }

  return (
    <div
      style={title}
          //onMouseOut={this.hideActions}
          className={classNames}
        >
      {category}
        <div style={styles.actionBox}>
            <ReactCSSTransitionGroup transitionName="actionIcons" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {actionBtns}
            </ReactCSSTransitionGroup>
          {actionsAnchor}
        </div>
        {add}
        <ReactCSSTransitionGroup transitionName="wrapperTitle" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {titleContainer}
        </ReactCSSTransitionGroup>
        {expandIcon}
      </div>
    );
  }
});

module.exports = WrapperTitle;
