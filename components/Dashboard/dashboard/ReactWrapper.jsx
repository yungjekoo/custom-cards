var React = require('react');
var ReactDOM = require('react-dom');
var WrapperTitle = require('./WrapperTitle.jsx');
var RPT = React.PropTypes;

var styles = {
  container: {
  fontSize: "14px",
  fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderWidth: "2px",
    borderStyle: "solid",
    position: "relative"
  }
};

// Documentation link:
// https://github.ibm.com/IoT/dashboard-component/wiki/React-card-wrapper
//

var ReactWrapper = React.createClass({
  propTypes: {
    id: RPT.string,
    inbound: RPT.array,
    outbound: RPT.array,
    module: RPT.string,
    sticky: RPT.bool,
    type: RPT.string,
    category: RPT.string,
    parameters: RPT.object.isRequired,
    layout: RPT.string,
    width: RPT.number,
    height: RPT.number,
    style: RPT.object,
    theme: RPT.object.isRequired,
        nls: RPT.object
    },

    applyTheme: function() {
      var t = this.props.theme;
      if (t) {
        styles.container.fontFamily = t.font;
        styles.container.color = t.major;
        styles.container.backgroundColor = t.content;
        styles.container.borderColor = t.border;
      }
    },

    applySchema: function() {
      if (this.props.parameters.color !== undefined) {
        var scheme = this.props.theme.schemes[this.props.parameters.color%this.props.theme.schemes.length];
        return Object.assign({}, this.props.theme, scheme);
      }
      return this.props.theme;
    },

  getInitialState: function() {
    return {
      width: 0,
      height: 0
    };
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.determineDimensions);
    this.determineDimensions();
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this.determineDimensions);
  },

  componentDidUpdate: function() {
    this.determineDimensions();
  },

  determineDimensions: function() {
    var self = this;
    setTimeout(function() {
      try {
        var node = ReactDOM.findDOMNode(self);
        var width = node.offsetWidth;
        var height = node.offsetHeight;
        if (self.state.width != width || self.state.height != height) {
          self.setState({
            width: width,
            height: height
          });
        }
      } catch (e) {
        // can happen if component is already removed
      }
    },2);
  },

  render: function() {


    this.applyTheme();
    var theme = this.applySchema();

    var element = null;
    var style = styles.container;


    var component = null;
    if (this.props.module) {
      // new way to get the cards by searching in the module
      component = IoTFComponents[this.props.module];
    }
    if (!component) {
      // old way to load cards from global IoTCards object
      component = IoTCards;
    }

    var componentTokens = this.props.parameters.component.split(".");
    for (var i in componentTokens) {
      component = component[componentTokens[i]];
    }


    var title = this.props.parameters.title?this.props.parameters.title:"";
    if (!this.props.type || !component) {
      element = React.DOM.div(null, "Loading");
    } else {
      if (this.props.theme) {
        style = {};
        Object.assign(style,styles.container);
      }
      var props = {};
      var height = 52;
      if (this.props.parameters.component == "HorizontalLine") {
        height = 120;
        Object.assign(style,styles.container,{"backgroundColor": this.props.theme.background, "borderStyle": "none"});
      }
      if (this.props.parameters.component == "Container") {
        height = 120;
        Object.assign(style,styles.container,{"backgroundColor": this.props.theme.background, "borderStyle": "none"});
      }
      Object.assign(	props,
              this.props.parameters,
              {
                wrapper: {
                  id: this.props.id,
                  width: this.props.width,
                  height: this.props.height,
                  layout: this.props.layout,
                  realHeight: (this.state.height - height),
                  realWidth: this.state.width
                },
                theme: theme,
                nls: this.props.nls,
                style: {
                  height: (this.state.height - height) + "px",
                  width: this.state.width + "px"
                }
              }
            );

      element = React.createElement(component, props);

      var dragClass = '';

      if(this.props.layout == 'sm'){
        dragClass = '';
        $('#'+this.props.id).css('touch-action','auto');
      }
      else{
        dragClass = 'react-draggable-active';
        $('#'+this.props.id).css('touch-action','none');
      }
    }


    return (
      <div 	style={style}
          className={dragClass}>
        <WrapperTitle
          id={this.props.id}
          type={this.props.type}
          theme={theme}
          nls={this.props.nls}
          sticky={this.props.sticky}
          fullSize={this.props.parameters.component == "HorizontalLine" || this.props.parameters.component == "Container"}
          mobile = {this.props.layout == 'sm'}
          container={this.props.parameters.component == "Container"}
          category={this.props.category}
          showRefresh={this.props.showRefresh}
          title={title}
          minimize={this.props.height == 1 && this.props.parameters.component != "HorizontalLine"}
        >
        </WrapperTitle>
        {element}
      </div>
    );
  }
});


module.exports = ReactWrapper;
