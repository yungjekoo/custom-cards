var React = require('react');

var RPT = React.PropTypes;

var styles = {
    circle : {
      width: "16px",
      height: "16px",
      background: "#5596E6",
      MozBorderRadius: "50px",
      WebkitBorderRadius: "50px",
      borderRadius: "50px",
      float: "left",
      cursor: "pointer"
    },
    checkmark : {
      display: "inline-block",
      width: "22px",
      height: "22px",
      MsTransform: "rotate(45deg)",
      WebkitTransform: "rotate(45deg)",
      transform: "rotate(45deg)"
    },
    checkmarkBack : {
      position: "absolute",
      width: "2px",
      height: "9px",
      backgroundColor: "#ffffff",
      left: "7px",
      top: "6px"
    },
    checkmarkSeat : {
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
      border: "2px solid",
      borderColor: "#AEB8B8",
      MozBorderRadius: "50px",
      WebkitBorderRadius: "50px",
      borderRadius: "50px",
      float: "left",
      cursor: "pointer",
      boxSizing:'border-box'
  },
    hoverCB: {
      borderColor: "#5596E6"
  }
};

var CheckBox = React.createClass({
  propTypes: {
    checked: RPT.bool,
        id: RPT.string,
        name: RPT.string,
        onChange: RPT.func,
    style: RPT.object,
        theme: RPT.object.isRequired,
        value: RPT.string
  },

    getInitialState: function() {
    return {
      checked: this.props.checked
    };
  },

    getDefaultProps: function() {
    return {
      checked: false,
          id: Math.random().toString(),
          //labelRight: true,
          name: "checkBoxName"
    };
  },

    handleChange: function(event) {
    this.setState({
      checked: !this.state.checked
    });
    if (this.props.onChange) {
      this.props.onChange(!this.state.checked);
    }
  },

    hoverCB: function(event) {
    this.setState({
      hovered: true
    });
  },

    noHoverCB: function(event) {
    this.setState({
      hovered: false
    });
  },

  render: function() {
        var outerStyle = Object.assign({}, this.props.style);
        var inactiveCB = {};
        console.log(inactiveCB);
        if (this.state.hovered){
            inactiveCB = Object.assign({}, styles.inactiveCB, styles.hoverCB);
        }
        else{
            inactiveCB = styles.inactiveCB;
        }
        var checkBoxChecked = <div onClick={this.handleChange} style={styles.circle}>
                                <span style={styles.checkmark}>
                                  <span style={styles.checkmarkBack}></span>
                                  <span style={styles.checkmarkSeat}></span>
                                </span>
                              </div>;
        var checkBoxInactive = <div onClick={this.handleChange} style={inactiveCB}></div>;
        var output = this.state.checked?<div>{checkBoxChecked}</div>:<div>{checkBoxInactive}</div>;
    return (
            <div onMouseOver={this.hoverCB} onMouseOut={this.noHoverCB} style={outerStyle}>{output}</div>
    );
  }
});

module.exports = CheckBox;
