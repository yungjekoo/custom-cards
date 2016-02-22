var React = require('react');
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

  componentWillMount: function() {
    if (this.props.disabled){
      this.setState({disabled: true});
    }
    else {
      this.setState({disabled: false});
    }
  },

  getDefaultProps: function() {
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

      text:"BUTTON",
      minWidth:"140px",
      minHeight:"50px",
      btnCursor: "pointer",
      onClick:function(){},
      isPrimary: false
    };
  },

  onClick: function() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function() {
    var stateStyle = {};

    stateStyle.width = this.props.width;

    if (this.props.isPrimary) {
      if (this.state.hover || this.state.press){
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgPrimaryHoverColor;
        stateStyle.color = this.props.textPrimaryHoverColor;
        stateStyle.borderColor = this.props.borderPrimaryHoverColor;
      }
      else{
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgPrimaryColor;
        stateStyle.color = this.props.textPrimaryColor;
        stateStyle.borderColor = this.props.borderPrimaryColor;
      }
    }
    else{
      if (this.state.hover || this.state.press){
          stateStyle.cursor = this.props.btnCursor;
          stateStyle.backgroundColor = this.props.bgHoverColor;
          stateStyle.color = this.props.textHoverColor;
          stateStyle.borderColor = this.props.borderHoverColor;
        }
      else{
        stateStyle.cursor = this.props.btnCursor;
        stateStyle.backgroundColor = this.props.bgColor;
        stateStyle.color = this.props.textColor;
        stateStyle.borderColor = this.props.borderColor;
        stateStyle.width = this.props.width;
      }
    }

    if (this.state.disabled){
      stateStyle.cursor = 'no-drop';
      stateStyle.backgroundColor = '';
      stateStyle.color = '#AEB8B8';
      stateStyle.borderColor = '#f4f4f4';
    }

    var styleBtn = Object.assign({}, styles.componentButtonText, stateStyle, this.props.style);
    var linkStyle = {textDecoration: 'none !important'};

    return (
            <a  style={linkStyle}> <div style={styleBtn} onClick={this.onClick} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{this.props.text} {this.props.disabled} </div> </a>
  );
  }
});

module.exports = ButtonText;
