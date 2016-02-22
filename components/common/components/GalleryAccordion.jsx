var React = require('react');
var ReactDOM = require('react-dom');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');

var styles = {

    container:{
        marginBottom: '15px',
        boxSizing: 'border-box',
        clear: 'both',
        cursor: 'pointer'
    },
    canvas:{
      MozTransition: 'all 0.25s ease',
      WebkitTransition: 'all 0.25s ease',
      OTransition: 'all 0.25s ease',
      transition: 'all 0.25s ease',
      height: '131px',
      overflow: 'hidden'
    },
    title: {
        height: '24px',
        padding: '5px 0px',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '24px'
    },
    icon: {
      float: 'right'
    },
    toggleCtrlContainer: {
      clear : 'both',
      float: 'right',
      marginRight: '20px'
    }

};

var ITEMS_PER_ROW = 3;

var GalleryAccordion = React.createClass({

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
      label: ''
    };
  },

  getInitialState: function(){
    var expandedStatus = false;
    for(var i=0; i < this.props.children.length; i++){
      if(this.props.selected === this.props.children[i].props.item.name && i >= ITEMS_PER_ROW){
        expandedStatus=true;
      }
    }
    return{
      expanded: this.props.expanded || expandedStatus?true:false
    }
  },

  componentWillMount(){
    for(var i=0; i < this.props.children.length; i++){
      if(this.props.selected === this.props.children[i].props.item.name && i >= ITEMS_PER_ROW){
        this.setState({expanded:true});
      }
    }
  },

  componentDidMount(){
    this.componentDidUpdate();
  },

  componentDidUpdate(){
    if(this.state.expanded){
      $(this.refs.cardCanvas).css('height',$(this.refs.cardCanvas)[0].scrollHeight)
    }
    else{
      $(this.refs.cardCanvas).css('height','130px')
    }
  },

  componentDidReceiveProps(){
    this.setState({
      selected: this.props.selected
    })
  },

  onRemove: function() {
      if (this.props.onRemove) {
          this.props.onRemove(this.props.id);
      }
      return false;
  },

  onToggle: function() {
    this.setState({
      expanded: !this.state.expanded
    })
  },

  render: function() {
        var self = this;
        var canvas = '';
        var toggleCtrl = '';
        var childCount = ITEMS_PER_ROW;
        if (this.state.expanded) {
          canvas = this.props.children
          toggleCtrl = <div style={styles.toggleCtrlContainer}><a onClick={self.onToggle} href='javascript:void(0)'>Show less</a></div>;
        }
        else{
          var i = 0;
          canvas = this.props.children.filter(function(child){
                    if(i<childCount){
                      i++;
                      return true;
                    }
                    else{
                      i++;
                      toggleCtrl = <div style={styles.toggleCtrlContainer}><a onClick={self.onToggle} href='javascript:void(0)'>Show more</a></div>;
                      return false;
                    }
                   });

        }

    return (
                <div style={styles.container}>
                    <div style={styles.title}>
                        {this.props.label}
                    </div>
                    <div style={styles.canvas} ref="cardCanvas">
                      {canvas}
                    </div>
                {toggleCtrl}
                </div>
    );
  }
});

module.exports = GalleryAccordion;
