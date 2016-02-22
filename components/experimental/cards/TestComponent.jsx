var React = require('react');
var RPT = React.PropTypes;
var Label = require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');
var ReactGridLayout = require('react-grid-layout');

/**
* Blank component to test lower level content.
*/
var styles = {
	container: {
		paddingTop: "30px"
	},
	component: {
		backgroundColor: "silver",
		color: "black"
	}
};

var TestComponent = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		type: RPT.string.isRequired,
		wrapper: RPT.object
	},

	onChange: function(value) {
		alert(value);
	},

	render: function() {
		var self = this;
		return (
			<div style={styles.container}>
		      <ReactGridLayout 
		        cols={3}
		        className='layout' 
		        rowHeight={100} 
		        verticalCompact={true}
		        autoSize={true}
		        isDraggable={true}
		        isResizable={true}
		        >
			      <div style={styles.component} key={1} _grid={{x: 0, y: 0, w: 1, h: 2}}>1</div>
			      <div style={styles.component} key={2} _grid={{x: 1, y: 0, w: 1, h: 2}}>2</div>
			      <div style={styles.component} key={3} _grid={{x: 2, y: 0, w: 1, h: 2}}>3</div>
		      </ReactGridLayout> 
			</div>
		);
	}
});

module.exports = TestComponent;
