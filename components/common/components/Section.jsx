var React = require('react');
var Reflux = require('reflux');

var RPT = React.PropTypes;

var styles = {
  sectionWrapper:{
      clear: "both",
    marginBottom: '40px'
  },

  headingSection: {
    color: "#5c91cc",
    fontWeight: "700",
    display: "inline-block",
    textTransform: "none",
    fontSize: "14px",
    marginTop: "20px",
    marginBottom: '10px'
  },

  hr: {
    borderTop: '1px solid #eee',
    boxSizing: 'content-box',
    height: '3px',
    backgroundColor: '#4983c6',
    marginTop: '10px',
    borderStyle: 'solid',
    marginBottom: '25px',
    border: '0px'
  }

};


var Section = React.createClass({

    propTypes: {
    },

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
    };
  },

    componentDidUpdate:function(){

    },

    render: function() {

        var headingSection="";

        headingSection = <div>{this.props.headingSection}</div>;

      return (<div style={styles.sectionWrapper}>
              <div style={styles.headingSection}>{headingSection}</div>
              <hr style={styles.hr}></hr>
              <div>{this.props.children}</div>
             </div>
             );

  }
});
module.exports = Section;


