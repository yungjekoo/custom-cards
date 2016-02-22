/*global require, module */
var React = require('react');
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

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    onChange: RPT.func,
    onSubmit: RPT.func,
    initialValue: RPT.string,
    placeholder: RPT.string,
    readOnly: RPT.bool,
    type:RPT.string
  },

  getDefaultProps: function () {
    return {
      initialValue: '',
      type: 'text',
      style: { label:{} },
      readOnly : false
    };
  },

  getInitialState: function () {
    return {
      value: this.props.initialValue||'',
      isValid: true
    };
  },

  validateType: function (value) {
    var currType = this.props.type||'text';
    var isValid = true;

    switch(currType) {
      case 'url':
      isValid = value.match(re_weburl) !== null;
    }

    return isValid;
  },

  componentWillReceiveProps: function (props) {
    if (props.value) {
      this.setState({value:props.value});
    }
  },

  handleChange: function (event) {
    this.setState({
        value: event.target.value
    });
    if (this.props.onChange) {
        this.props.onChange(event.target.value);
    }
    this.setState({isValid: this.validateType(event.target.value)});
  },

  handleSubmit: function (event) {
    if (event.key == "Enter") {
      if (this.props.onSubmit) {
          this.props.onSubmit(event.target.value);
      }
    }
  },

  handleClick: function (event) {
    this.setState({
        hasFocus: true
    });
    if (this.props.onClick) {
        this.props.onClick(event.target.value);
    }
  },

  render: function() {
    var warning = this.state.isValid?'':<div style={styles.validationWarning}>!</div>;

    var inputStyle = Object.assign({}, styles.field, this.props.style);

    var containerStyle = Object.assign({}, styles.fieldContainer, this.props.containerStyle);

    var inputField = <input type={this.props.type} style={inputStyle} name='field' value={this.state.value} readOnly={this.props.readOnly} onKeyDown={this.handleSubmit} onChange={this.handleChange} onFocus={this.handleOnFocus} onClick={this.handleClick} onBlur={this.handleOnBlur} placeholder={this.props.placeholder}/>;

    return (
      <div style={styles.formElement}>
          <Icon theme={this.props.theme} color={this.props.theme.accent} icon='search' size={24} style={styles.icon}/>
          <div style={containerStyle}>
            {inputField}
            {warning}
          </div>
          <div style={styles.after}></div>
      </div>
    );
  }
});

module.exports = SearchField;
