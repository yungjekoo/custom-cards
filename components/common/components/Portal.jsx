var React = require('react');
var ReactDOM = require('react-dom');

var RPT = React.PropTypes;

var styles = {

};


var Portal = React.createClass({

  componentDidMount: function() {
    this.popup = document.createElement("div");
    this.popup.style.position = 'relative';
    this.popup.style.zIndex = '9999';
    document.body.style.overflow = 'hidden';
    document.body.appendChild(this.popup);
    this._child = ReactDOM.render(this.props.children, this.popup);
  },


  componentDidUpdate: function() {
    if (!this._child) {
      return;
    }
    this._child.setState({});
  },


  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.popup);
    document.body.style.overflow = 'auto';
    document.body.removeChild(this.popup);
  },


  render: function() {
    return null;
  }

});

module.exports = Portal;


