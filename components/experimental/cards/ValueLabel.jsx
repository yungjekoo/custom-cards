var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var DeviceStore = require('../../common/stores/DeviceStore');
var CardTitle = require('../../common/components/CardTitle.jsx');

/*
 *  Value label component
 *
 */

var styles = {
  container:{
    cardContainer:{
       fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
      margin: "0 20px 20px",
    paddingTop: "20px"
    },
    labelContainer:{
      width:"100%",
      height:"100%",
      display:"table",
      textAlign:"center"
    },
    cardLabel:{
      verticalAlign: "middle",
      display: "table-cell"
    },
    cardValue: {
      whiteSpace: "pre",
      fontSize:"160px",
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

var wrapperOld ={};
var fontFitSize = null;

var ValueLabel = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
  style: RPT.object,
    nls: RPT.object,
  device: RPT.string,
  property: RPT.string,
    unit: RPT.string,
    wrapper: RPT.object
  },

  getDefaultProps: function() {
  return {

  };
  },

  getInitialState: function() {
  return {
      value:"",
      cardFontSize: styles.container.cardValue.fontSize
  };
  },

  componentDidMount: function() {
    DeviceStore.listen(this.onUpdate);
    DeviceStore.Actions.connect();

  },

  onUpdate: function(payload) {
    if(this.props.device == payload.device && payload.model){
      this.setState({value: payload.model[this.props.property]});
    }

  },

  componentDidUpdate:function(payload){
    this.scaleFont();
    var wrapper = this.props.wrapper;

    if(wrapper.height == 1){
       styles.container.cardContainer.paddingTop = "3px";
      styles.container.cardUnit.fontSize="14px";
    }
    else{
      styles.container.cardContainer.paddingTop = "20px";
      styles.container.cardUnit.fontSize="19px";
    }
  },

  scaleFont:function(ref){
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
    var offsetHeight = container.offsetHeight*0.5;
    var numbString = styles.container.cardValue.fontSize;
    numbString = numbString.slice(0,numbString.length-2);
    var sizeFont = parseInt(numbString, 10);

    var containerMinHeight = container.offsetHeight<=57?57:container.offsetHeight;

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

  render: function() {
  var data = "";
  var unit = "";
    var name = "";
    var label = this.props.nls.resolve("COMP_INIT_LABEL_ValueLabel");


  if (this.state.value!=="") {
      if(this.props.property===null||this.props.device===null||this.state.value===undefined){
        label = this.props.nls.resolve("COMP_CHECK_CONFIG_LABEL_ValueLabel");
        unit = "";
      }
      else{
         label = this.state.value;
         unit = this.props.unit;
         name = this.props.nls.resolve(this.props.property);
      }
  }

    styles.container.labelContainer.color=this.props.theme?this.props.theme.text:styles.container.labelContainer.color;

  return (
    <div style={styles.container.cardContainer} ref={this.scaleFont}>
        <CardTitle theme={this.props.theme}>{name}</CardTitle>
        <div style={styles.container.labelContainer} >
          <span style={styles.container.cardLabel} ><span style={styles.container.cardValue}>{label}</span><span style={styles.container.cardUnit}>{unit}</span></span>
        </div>
      </div>
    );
  }
});

module.exports = ValueLabel;
