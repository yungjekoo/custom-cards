var React = require('react');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {
  optionContainer: {
        borderStyle:"solid",
        padding:"10px",
        fontSize: "14px",
        borderRightWidth: "2px",
        borderLeftWidth: "2px",
        borderColor : "#E7E7E7",
        backgroundColor:"",
        color:"",
        cursor:"pointer",
         boxSizing: "border-box",
         MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box"
  },
    selectionTickContainer:{
        display: "inline",
        float: "right"
    },
    selectionTick:{

    }
};

var Option = React.createClass({
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

    getInitialState:function(){
        return {
            hover:false,
            disabled: this.props.disabled||false
        };
    },

  getDefaultProps: function() {
    return {
            selected: false,
            theme: {
              "light": "#c7c7c7",
              "title": "#323232",
              "dark": "#5a5a5a"
            }
    };
  },

    componentWillMount:function(){
        styles.optionContainer.borderColor = "#E7E7E7";
    },

    mouseOver: function () {
        this.setState({hover: true});
    },

    mouseOut: function () {
        this.setState({hover: false});
    },

    handleMouseDown: function (event) {
    event.preventDefault();
    event.stopPropagation();
        if(!this.state.disabled)
            {
            if(typeof this.props.children=="string" &&this.props.children!==""){

                this.props.onSelect(this.props.value,this.props.children, event);
                if (this.props.onClick) {
                  this.props.onClick();
                }
            }
            else{
                this.props.onSelect(this.props.value, event);
            }
        }
  },

  render: function() {

        if(this.props.lastChild===true){
            styles.optionContainer.borderBottomWidth = "2px";
            styles.optionContainer.borderTopWidth = "0px";
        }
        else if(this.props.firstChild===true){
            styles.optionContainer.borderTopWidth = "1px";
            styles.optionContainer.borderBottomWidth = "0px";
        }
        else{
            styles.optionContainer.borderTopWidth = "0px";
            styles.optionContainer.borderBottomWidth = "0px";
        }

        var option = "";

        if(!this.state.disabled){
            styles.optionContainer.cursor = "pointer";
            if(this.state.hover||this.props.selected){
                styles.optionContainer.backgroundColor = "#4581E0";
                styles.optionContainer.color = "#FFFFFF";
                styles.selectionTick.color = "#FFFFFF";
                styles.optionContainer.borderColor = "#4581E0";
            }
            else{
                styles.optionContainer.backgroundColor = "#F7F7F7";
                styles.optionContainer.color = this.props.theme.major;
                styles.selectionTick.color = this.props.theme.title;
                styles.optionContainer.borderColor = "#E7E7E7";
            }
        }
        else{
            styles.optionContainer.backgroundColor = "#F9F9F9";
            styles.optionContainer.color = this.props.theme.minor;
            styles.optionContainer.cursor = "default";
        }

        var selectionTick = this.props.selected?<div style={styles.selectionTickContainer}><Icon theme={this.props.theme} icon="check" color={styles.selectionTick.color} size={12} ></Icon> </div>:"";

        var containerStyle = Object.assign({},styles.optionContainer,this.props.style);
        if(this.props.onSelect!==undefined){
            option = <div onMouseDown={this.handleMouseDown} style={containerStyle}
                        onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}
                >{this.props.children}{selectionTick}</div>;
        }
        else{
            option = <option value={this.props.value} selected={this.props.selected}>
                        {this.props.children}
                    </option>;
        }

    return (
            option
    );
  }
});

module.exports = Option;
