var React = require('react');
var RPT = React.PropTypes;


var styles = {
    container: {
        paddingTop: "5px"
    },
    switchBtn: {
        position: "relative",
        border: "3px solid",
        borderColor: " #4581E0",
        width: "48px",
        float:"left",
        backgroundColor: "#4581E0",
        borderRadius: "13px",
        webkitTransition: "all .15s ease-out",
        mozTransition: "all .15s ease-out",
        msTransition: "all .15s ease-out",
        oTransition: "all .15s ease-out",
        transition: "all .15s ease-out"
    },
    label:{
    },
    toggleElement:{
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
    falseState:{
        left: "23px"
    },
    trueState:{
        left: "0px"
    },
    stateText:{
        lineHeight: "24px",
        marginLeft:"15px"
    }
};

var SwitchBtn = React.createClass({
    propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
        initialValue :RPT.bool,
        value: RPT.bool,
        trueText: RPT.string,
        falseText: RPT.string,
        label: RPT.string
  },

    getInitialState:function(){
        return {
            value: this.props.initialValue
        };
    },

    getDefaultProps:function(){
        return {
            initialValue: true,
            onChange: function(){},
            trueText: "On",
            falseText: "Off"
        };
    },

    toggleState: function(){
        var toggleState = this.state.value;
        this.setState({value:!(toggleState)}) ;
        this.props.onChange(!(toggleState));
    },

    componentWillMount:function(){
        // Apply theme colors here
        var theme = this.props.theme;
        styles.stateText.color = theme?theme.major:"#323232";
    },

  render: function() {
        var toggleStateStyle = this.state.value?styles.trueState:styles.falseState;
        var toggleElementStyle = Object.assign({},styles.toggleElement,toggleStateStyle);
        var toggleSwitchStyle = Object.assign({},styles.switchBtn,this.state.value?{}:{backgroundColor: this.props.theme.minor, borderColor: this.props.theme.minor});
        var text = "";
        if(this.props.trueText!==""&&this.props.falseText!==""){
            text = this.state.value?this.props.trueText:this.props.falseText;
        }
        else{
            text="";
        }

    return (
            <div>
                <div style={styles.container}>
                    <div style={toggleSwitchStyle} onClick={this.toggleState}>
                        <div style={toggleElementStyle}></div>
                    </div>
                    <div><span style={styles.stateText}>{text}</span></div>
                </div>
            </div>
    );
  }
});

module.exports = SwitchBtn;
