var React = require('react');
var Icon = require('./Icon.jsx');

var RPT = React.PropTypes;

var styles = {
  cardContainer:{
    width: '145px',
    height: '115px',
    float: 'left',
    marginRight: '5px',
    marginTop: '10px',
    backgroundColor: '#F5F5F5',
    padding: '5px',
    position: 'relative',
    overflow: 'hidden'
  },
  selectedCard: {
    borderTop: '2px solid',
    borderBottom: '2px solid',
  },
  clickingLayer: {
    width: '100%',
    display: 'block',
    height: '100%',
    position: 'absolute',
    zIndex: '10'
  },
  cardDescriptionToggle: {
    marginRight: '5px',
    position: 'absolute',
    right: '0px',
    width: '25px',
    height: '25px',
    textAlign: 'center',
    display: 'block',
    top: '3px'
  },
  cardTitle: {
    position: 'absolute',
    bottom: '0px',
    marginBottom: '5px'
  },
  cardThumb: {
    alignSelf: 'center'
  },
  thumbContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    opacity: '1',
    MozTransition: 'all 0.5s ease',
    WebkitTransition: 'all 0.5s ease',
    OTransition: 'all 0.5s ease',
    transition: 'all 0.5s ease'
  },
  cardDescription: {
    height: '100%',
    overflow: 'hidden',
    fontSize: '12px',
    paddingTop: '20px',
    position: 'absolute',
    bottom: '-75px',
    MozTransition: 'all 0.5s ease',
    WebkitTransition: 'all 0.5s ease',
    OTransition: 'all 0.5s ease',
    transition: 'all 0.5s ease'
  }
};


var CardGalleryItem = React.createClass({
  propTypes: {
    style:RPT.object,
    theme:RPT.object.isRequired,
    item: RPT.object.isRequired,
    nls: RPT.object,
    onClick: RPT.func,
    selected: RPT.bool
  },

  getDefaultProps: function() {
    return {
      item: {}
    };
  },

  componentWillReceiveProps : function(props){
    this.setState({
      selected:props.selected
    });
  },

  getInitialState: function() {
    return {
      hoverInfo: false,
      selected: this.props.selected
    };
  },

  onMouseOver: function () {
    this.setState({
      hoverInfo: true
    });
  },

  onMouseOut: function (e) {
      this.setState({
        hoverInfo: false
      });
  },

  onTouch: function (e) {
    //this.closeInfoLater(); // auto close after 10s
      this.setState({
        hoverInfo: !this.state.hoverInfo
      });
  },

  onClick: function (e) {
    if(e.target.className !== 'infoTrigger'){
      if(this.props.onClick){
        this.props.onClick(this.props.item)
      }
      this.setState({
        selected:true
      });
    }
  },

  closeInfoLater: function() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    var self = this;
    this.closeTimer = setTimeout(function() {
      self.onMouseOut();
      self.closeTimer = null;
    }, 10000);
  },

  componentDidMount: function(){

    if(this.props.selected){
      var newPos = ($(this.refs.galleryItem).position().top-160)>0?$(this.refs.galleryItem).position().top-160:0;
      $($(this.refs.galleryItem).scrollParent())
    .scrollTop(newPos);
    }
  },

  componentDidUpdate: function(prevProps,PrevState){
    if(this.state.hoverInfo){
      //$(this.refs.descriptionText).ellipsis();
    }
    else{

    }
  },

  render: function() {
      var description = '';
      var cardTitle = this.props.item.displayName;
      var containerStyle = styles.cardContainer;
      var thumbContainerStyle = '';
      var infoColor= this.props.theme.light;

      if(this.state.selected){
        containerStyle = Object.assign({},containerStyle,styles.selectedCard,{borderColor:this.props.theme.accent});
      }
      else{
        containerStyle = styles.cardContainer;
      }

      var descriptionText = this.props.nls.resolve(this.props.item.description);
      if (!description) {
        descriptionText = this.props.item.description;
      }

      if(this.state.hoverInfo){
        description = <div style={Object.assign({},styles.cardDescription,{bottom:'0'})}>{this.props.nls.resolve(cardTitle)}<br/>{this.props.nls.resolve(this.props.item.description)}</div>;
        thumbContainerStyle = Object.assign({},styles.thumbContainer,{opacity:'0.01',height:'0%'});
        infoColor = "#3C3C3B";
      }
      else{
        description = <div style={Object.assign({},styles.cardDescription,{bottom:'-75px'})}>{this.props.nls.resolve(cardTitle)}<br/>{this.props.nls.resolve(this.props.item.description)}</div>;
        thumbContainerStyle = styles.thumbContainer;
      }

      return (
          <div id={this.props.item.name} style={containerStyle} onClick={this.onClick} ref='galleryItem'>
            <div style={styles.cardDescriptionToggle} >
              <a className='infoTrigger' tabIndex='1' href='javascript:void(0)'><div className='infoTrigger' style={styles.clickingLayer} onClick={this.onTouch} onMouseEnter={this.onMouseOver} onBlur={this.onMouseOut} onMouseLeave={this.onMouseOut}/></a>
              <Icon theme={this.props.theme} color={infoColor} icon='info'/>
            </div>
            <div style={thumbContainerStyle}>
              <div style={styles.cardThumb}><Icon theme={this.props.theme} color='#3C3C3B' icon={this.props.item.thumbnail} size={50}/></div>
            </div>
            <div ref='descriptionText'>
              {description}
            </div>
          </div>
    );
  }
});

module.exports = CardGalleryItem;
