var React = require('react');
var Griddle = require('griddle-react');

var RPT = React.PropTypes;

var TableImage = React.createClass({
render: function(){
      	return (
		<div>
            <img src={this.props.rowData.avatar} width="40" height="40" alt="Avatar"/>
        </div>
		);
  }
});

module.exports = TableImage;
