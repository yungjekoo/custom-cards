var React = require('react');
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

var DashboardStore = require('./DashboardStore');
var Utils = require('./DashboardUtils');
var ReactWrapper = require('./ReactWrapper.jsx');
var Actions = require('./Actions.jsx');
var Reflux = require('reflux');

var RPT = React.PropTypes;

/*
 *  Dashboard component
 *
 */
var styles = {
  canvas: {
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    color: "#EDEDED"
  },
  container: {
    backgroundColor: "#0d1111",
    width: "100%",
    height: "100%"
  },
  loading: {
    fontSize: "28px",
    fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
    padding: "20px"
  }
};

var DashboardCanvas = React.createClass({
  propTypes: {
    style: RPT.object,
    theme: RPT.object.isRequired,
    nls: RPT.object
  },

  applyTheme: function() {
    var t = this.props.theme;
    if (t) {
      styles.canvas.fontFamily = t.font;
      styles.canvas.color = t.major;
      styles.canvas.backgroundColor = t.canvas;
      styles.container.backgroundColor = t.canvas;
      styles.loading.fontFamily = t.font;
    }
  },

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
      config: null,
      dashboard: null,
      components: null,
      layout: "lg"
    };
  },

  componentDidMount: function() {
    var self = this;

    this.breakpoints = Utils.getCapability("breakpoints");
    this.cols = Utils.getCapability("cols");
    this.rowHeight = Utils.getCapability("rowHeight");
    this.margin = Utils.getCapability("margin");

    DashboardStore.listen(this.onModelUpdate),

    Actions.loadConfig();
    Actions.loadDashboard();
  },

  onModelUpdate: function(payload) {
    var model = {};

    if (payload.dashboard) {model.dashboard = payload.dashboard;}
    if (payload.components) {model.components = payload.components;}

    if (Object.keys(model).length > 0) {
      this.setState(model);
    }
  },

  onBreakpointChange: function(breakpoint) {
    console.log("Breakpoint changed: " + breakpoint);
    Actions.setBreakpoint(breakpoint);
    this.setState({
      layout: breakpoint
    });
  },

  onLayoutChange: function(currentLayout, allLayouts) {
    console.log("Layout changed");
    Actions.storeLayouts(allLayouts);
  },

  onResizeStop: function(payload) {
    console.log("Size changed");
    console.log(payload);
  },

  onGridMounted: function(grid) {
    //Actions.setBreakpoint(grid.state.breakpoint);
  },

  mergeSchemeIntoTheme: function(theme, schemeName) {
      var scheme = {};
      schemeName = schemeName?schemeName:0;
      if (theme.schemes.length > schemeName) {
          scheme = theme.schemes[schemeName];
      }

      return Object.assign({}, theme, scheme);
  },

  onDrag: function(layout, oldL, l, placeholder, e) {
    // console.log(layout, oldL, l, placeholder, e);
    // var x = e.layerX;
    // var y = e.layerY;
    //console.log(l);
  },

  onDragStart: function(layout, oldL, l, placeholder, e) {
    console.log("DRAG PAYLOAD",layout,oldL, l, placeholder, e);
    // console.log(layout, oldL, l, placeholder, e);
    // var x = e.layerX;
    // var y = e.layerY;
    //console.log(l);
    if(e.nativeEvent.type !== "mousedown"){
      e.preventDefault();
      $(document).bind('touchmove', this.mouseMoveScrolling);
    }

  },

  mouseMoveScrolling: function(e){
        var h = $(window).height();
        var pos = e.originalEvent.touches[0].clientY;
        if(pos>h*0.9 || pos < h*0.1){
          var y = pos - h / 2;
          $('html, body').scrollTop($(window).scrollTop() + y * 0.070);
        }
  },

  onDragStop: function(layout, oldL, l, placeholder, e){
    if(e.nativeEvent !== "MouseEvent"){
      $(document).unbind('touchmove', this.mouseMoveScrolling);
    }
  },

  render: function() {
    this.applyTheme();

    var node = null;
    var self = this;
    if (this.state.components) {
      var layouts = this.state.dashboard.layouts;

      node = <ResponsiveReactGridLayout
        renderTrigger= {Math.random()}
        useCSSTransforms = {true}
        style={styles.canvas}
        ref={this.onGridMounted}
        breakpoints={this.breakpoints}
        cols={this.cols}
        className='layout'
        layouts={layouts}
        rowHeight={this.rowHeight}
        margin={this.margin}
        verticalCompact={true}
        autoSize={true}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        onResizeStop={this.onResizeStop}
        isDraggable={true}
        isResizable={false}
        onDrag={this.onDrag}
        onDragStart={this.onDragStart}
        onDragStop={this.onDragStop}
        draggableHandle='.wrapper-title'
        >
        {this.state.components.map(function(result) {
          var layout = DashboardStore.getLayoutForElement(self.state.dashboard, self.state.layout, result.id);
          // adapt the theme to reflect the color scheme of the card
          var theme = self.mergeSchemeIntoTheme(self.props.theme, result.parameters.scheme);
          return <div
                    id={result.id}
                    key={result.id}
                    style={styles.container}>
                      <ReactWrapper
                        theme={theme}
                        nls={self.props.nls}
                        id={result.id}
                        inbound={result.inbound}
                        outbound={result.outbound}
                        module={result.module}
                        parameters={result.parameters}
                        sticky={result.sticky}
                        showRefresh={result.showRefresh}
                        category={result.category}
                        type={result.name}
                        layout={self.state.layout}
                        width={layout.w}
                        height={layout.h}/>
                  </div>
        })}
      </ResponsiveReactGridLayout>;
    } else {
      node = <div style={styles.loading}>Loading...</div>;
    }
    return node;
  }
});

module.exports = DashboardCanvas;
