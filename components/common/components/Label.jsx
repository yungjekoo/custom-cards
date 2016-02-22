var React = require('react');
var RPT = React.PropTypes;

var styles = {

    container:{
        marginBottom: "15px",
        boxSizing: "border-box",
        clear: "both"
    },
    childContainer:{

    },
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

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    label:RPT.string,
    labelFor:RPT.string,
    customContainerStyle: RPT.object
  },

  getDefaultProps: function() {
    return {
      label: ""
    };
  },

  getInitialState:function(){
    return{
      hasFocus:false
    };
  },

  componentWillMount:function(){
    this.updateTheme();
  },

  onFocus:function(e){
    this.setState({hasFocus:true});
  },

  onBlur:function(e){
    this.setState({hasFocus:false});
  },

  updateTheme :function(){
     styles.label.color=this.state.hasFocus? "#4581E0":"#9EAAA9";
    styles.label.color=styles.label.color?styles.label.color:this.props.theme&&this.props.theme.title||"#323232";
  },

  render: function() {
    var self = this;
    this.updateTheme();
    var styleLabel = Object.assign({}, styles.label, this.props.style);
    var styleContainer = Object.assign({},styles.container,this.props.customContainerStyle);
    return (
      <div style={styleContainer}>
          <label style={styleLabel} htmlFor={this.props.labelFor}>
              {this.props.label}
          </label>
          <div style={styles.childContainer}>
            {React.Children.map(this.props.children,function(child,idx){
              // TODO: can't modify props
              //child.props.onFocus=self.onFocus;
              //child.props.onBlur=self.onBlur;
              return child;
            })}
          </div>
      </div>
    );
  }
});

module.exports = Label;
