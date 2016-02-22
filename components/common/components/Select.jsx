
var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var RPT = React.PropTypes;
var InputField = require('./InputField.jsx');
var Icon = require('./Icon.jsx');

var styles = {
  selectBox: {
    cursor: 'pointer',
    position: 'relative'
  },
  optionsContainer: {
    position: 'absolute',
    minWidth: '100%',
    zIndex: '99999999'
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
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    onChange: RPT.func,
    label: RPT.string,
    initialValue: RPT.string,
    value: RPT.string
  },

  getDefaultProps: function () {
    return {
      initialValue: ''
    };
  },

  getInitialState: function () {
    return {
      isOpen: false,
      value: this.props.value || null
    };
  },

  componentDidMount: function () {
    this.updateInput(this.props.value);
  },

  componentWillReceiveProps: function (props) {
    this.updateInput(props.value);
  },

  onSelect: function (value, label, event) {
    this.setState({ input: label, isOpen: false, value: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  toggleOptionsContainer: function(){
    this.setState({ isOpen: !this.state.isOpen });
  },

  onFocus: function () {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  },

  onBlur: function () {
    //this.setState({ isOpen: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },

  updateInput: function (newVal) {
    var self = this;
    React.Children.forEach(this.props.children, function (child) {
      if (newVal === child.props.value) {
          self.setState({ input: child.props.children, value: newVal });
      }
    });
  },

  handleChange: function(event) {

  },

  renderInputField: function () {
    return <InputField readOnly={true} style={styles.inputField} containerStyle={{ width: '100%', cursor: 'pointer' }} theme={this.props.theme} initialValue={this.props.initialValue} value={this.state.input} onFocus={this.onFocus} onClick={this.toggleOptionsContainer} onBlur={this.onBlur}/>;
  },

  renderChildren: function () {
    var self = this;
    var children = this.props.children;
    var lastIndex = Array.isArray(children) ? children.length - 1 : null;
    var childrenElement = React.Children.map(children, function (child, idx) {
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
    });

    return <div style={styles.optionsContainer}><ReactCSSTransitionGroup transitionName="actionIcons" transitionEnterTimeout={500} transitionLeaveTimeout={500}>{childrenElement}</ReactCSSTransitionGroup></div>;
  },

  render: function () {
    var selectBox = Object.assign({}, styles.selectBox, this.props.style);
    return (
      <div style={selectBox}>
            {this.renderInputField()}
            <a style={styles.iconContainer} tabIndex='1' onBlur={this.onBlur} href='javascript:void(0)'>
              <Icon icon={"arrow-drop-down"} size={15} theme={this.props.theme} onClick={this.toggleOptionsContainer}/>
            </a>
            {this.state.isOpen ? this.renderChildren() : ''}
        <div style={styles.after}></div>
      </div>
    );
  }
});

module.exports = SelectBox;
