var React = require('react');
var Table = require('./Table.jsx');
var Icon = require('./IconLink.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');

var RPT = React.PropTypes;

var styles = {
  container: {
    textAlign: "center",
    width: "40px"
  }
};

var TableDetailBtn = React.createClass({

  clickbtn: function (event) {
    var data = Object.assign({}, this.props.rowData.__proto__);
    Actions.notify({ user: data });
  },

  render: function(){
    return (
      <div style={styles.container}>
            <a onClick={this.clickbtn}>
            <Icon theme={this.props.theme} size="20" color="#5a5a5a" icon="info"/>
            </a>
        </div>
    );
  }
});

module.exports = TableDetailBtn;
