var React = require('react');
var RPT = React.PropTypes;
var ReactGridLayout = require('react-grid-layout');
var Actions = require('../dashboard/Actions.jsx');

/**
* Container to organize cards
*/

var styles = {
	container: {
		backgroundColor: "gray",
		height: "100%"
	},
	component: {
		fontSize: "14px",
		fontFamily: '"Helvetica Neue",HelveticaNeue,Helvetica,"Segoe UI",Segoe,Calibri,Roboto,"Droid Sans","Arial Unicode MS",Arial,sans-serif',
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		overflow: "visible"
	},
	inner: {
		position: "relative",
		top: "-30px",
		left: "-30px"
	}
};

var Container = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},

	componentDidMount: function() {
	},

	onGridMounted: function(grid) {
		this.grid = grid;
	},

	onLayoutChange: function(components, pack) {
		// find max height
		var maxHeight = 0;
		var maxWidth = 0;

		for (var i in components) {
			var item = components[i];
			maxHeight = Math.max(maxHeight, item.y + item.h);
			maxWidth = Math.max(maxWidth, item.x + item.w);
		}
		console.log("MaxHeight: " + maxHeight);

		if (pack) {
			this.requestCardResize(maxHeight + 1);
		} else {
			// only enlarge to avoid flickering
			if (this.props.wrapper.height - 1 < maxHeight) {
				this.requestCardResize(maxHeight + 1);
			}
		}
	},

	requestCardResize: function(height) {
		if (this.resizeDelay) {
			clearTimeout(this.resizeDelay);
		}
		var self = this;
		this.resizeDelay = setTimeout(function() {
			Actions.changeCardSize(self.props.wrapper.id, {
				height: height
			});
		}, 1);

	},

	onLayoutChangeDynamically: function(layout, oldL, l, placeholder, e) {
		// var allCards = [];
		// allCards.concat(layout);
		// allCards.push(placeholder);

		// this.onLayoutChange(allCards);
	},

	onEnlargeCard: function() {
		Actions.changeCardSize(this.props.wrapper.id, {
			height: this.props.wrapper.height + 2
		});
	},

	onPackCard: function(layout) {
		this.onLayoutChange(layout, true);
	},

	handleMouseOver: function(e) {
		console.log("over");
	},

	handleMouseOut: function(e) {
		console.log("out");
	},

	getLayoutForElement: function(id) {
		var layout = this.props.layouts[this.props.wrapper.layout];
		for (var i in layout) {
		  var item = layout[i];
		  if (item.i == id) {
		    return item;
		  }
		}
	},

	render: function() {
		var self = this;
		var inner = Object.assign({},styles.inner,{height: (this.props.wrapper.realHeight + 30) + "px", width: (this.props.wrapper.realWidth + 60) + "px"});
		var container = Object.assign({}, styles.container, {height: (this.props.wrapper.realHeight) + "px", width: (this.props.wrapper.realWidth) + "px"});

		return (
			<div style={container}>
				<div style={inner}
			        onMouseOver={this.handleMouseOver}
        			onMouseOut={this.handleMouseOut}
				>
			      <ReactGridLayout 
			      	ref={this.onGridMounted}
			      	height={this.props.wrapper.realHeight + 30}
			      	width={this.props.wrapper.realWidth + 60}
			        cols={this.props.wrapper.width}
			        className='layout' 
			        rowHeight={120} 
			        margin={[30,30]}
			        layout={this.props.layouts.lg}
			        verticalCompact={false}
			        autoSize={true}
			        isDraggable={true}
			        isResizable={true}
			        onDrag={this.onLayoutChangeDynamically}
			        onResize = {this.onLayoutChangeDynamically}
			        onDragStart={this.onEnlargeCard}
			        onResizeStart={this.onEnlargeCard}
			        onDragStop={this.onPackCard}
			        onResizeStop={this.onPackCard}
			        >
				        {this.props.components.map(function(result) {
				          var layout = self.getLayoutForElement(result.id);
				          //var theme = self.mergeSchemeIntoTheme(self.props.theme, result.parameters.scheme);
				          return <div key={result.id} style={styles.item}><ReactWrapper theme={self.props.theme} nls={self.props.nls} id={result.id} inbound={result.inbound} outbound={result.outbound} parameters={result.parameters} type={result.name} layout={self.props.wrapper.layout} width={layout.w} height={layout.h}/></div>;
				        })}
			      </ReactGridLayout> 
				</div>
			</div>
		);
	}
});

module.exports = Container;
