var React = require('react');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {

    container:{
        marginBottom: "15px",
        boxSizing: "border-box",
        clear: "both",
        cursor: "pointer"
    },
    canvas:{
        paddingLeft: "20px"
    },
    title: {
        height: "24px",
        padding: "5px 0px",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px"
    },
    icon: {
        float: "right"
    }

};

var Accordion = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
        id: RPT.string,
        label:RPT.string,
        onRemove: RPT.func,
        onExpand: RPT.func,
        expanded: RPT.bool
  },

  getDefaultProps: function() {
    return {
      label: "",
          expanded: false
    };
  },

    componentWillMount:function(){
    },

    componentDidMount:function(payload){
    },

    onRemove: function() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.id);
        }
        return false;
    },

    onToggle: function() {
        if (this.props.onExpand) {
            this.props.onExpand(!this.props.expanded?this.props.id:null);
        }
    },

  render: function() {
        var canvas = "";
        if (this.props.expanded) {
            canvas = <div style={styles.canvas}>
                        {this.props.children}
                    </div>;
        }

    return (
                <div style={styles.container}>
                    <div style={styles.title} onClick={this.onToggle}>
                        {this.props.label}
                        <Icon style={styles.icon} theme={this.props.theme} size={20} color={this.props.theme.major} icon='delete' onClick={this.onRemove}/>
                    </div>
                    {canvas}
                </div>
    );
  }
});

module.exports = Accordion;
