var React = require('react');
var RPT = React.PropTypes;
var Actions = require('../../Dashboard/dashboard/Actions.jsx');



var styles = {
  container: {
    cursor: "pointer",
    textAlign: "center",
    color: "#ededed",
    fontSize: "16px",
    paddingLeft: "10px"

  },
  action: {
    verticalAlign: "middle",
    margin: "4px"
  }
};

var CardAction = React.createClass({
  propTypes: {
        theme: RPT.object.isRequired,
    icon: RPT.string,
    color: RPT.string,
    size: RPT.number,
    action: RPT.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
      ]),
    style: RPT.object
  },

  getDefaultProps: function() {
    return {
      size: 24
    };
  },

  renderGraphic: function() {

    return <Icon icon={this.props.icon} theme={this.props.theme} />;

  },

  onClick: function() {
    if (this.props.action) {
      if (typeof this.props.action === "function") {
        this.props.action();
      } else {
        Actions.customAction(this.props.action);
      }
    }
  },

    render: function() {

        this.props.color=this.props.color?this.props.color:this.props.theme&&this.props.theme.text||"#ededed";

        styles.container.color=this.props.theme?this.props.theme.text:styles.container.color;

      var styleContainer = Object.assign({}, styles.container, this.props.style);
      var styleIcon = Object.assign({}, styles.action, {
        fill: this.props.color,
      width: this.props.size,
      height: this.props.size
    });

      return (
        <div onClick={this.onClick} style={styleContainer}>
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit style={styleIcon}>
              {this.renderGraphic()}
          </svg>
          <span>{this.props.children}</span>
        </div>
      );
  }
});

module.exports = CardAction;
