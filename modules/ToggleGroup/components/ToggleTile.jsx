var React = require('react');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "95px",
    height: "95px",
    margin: "5px",
    float: "left"
  },
  icon: {
    width: "55px",
    height: "55px",
    margin: "5px 20px",
    fontSize: "12px",
    textAlign: "center",
    verticalAlign: "middle"
  },
  label: {
    fontSize: "12px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: "5px 10px",
    textAlign: "center"
  }
}

var ToggleTile = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    icon: RPT.string,
    state: RPT.bool
  },

  getDefaultProps: function() {
    return {
    	icon: null
    };
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style);
    var label = Object.assign({}, styles.label);
    var icon = Object.assign({}, styles.icon);

    if (!this.props.state) {
      label.color = this.props.theme.minor;
      label.backgroundColor = this.props.theme.content;
      icon.color = this.props.theme.minor;
    } else {
      label.color = this.props.theme.titleText;
      label.backgroundColor = this.props.theme.light;
    }

    if (this.props.icon) {
      return (
        <div style={style}>
          <img src={this.props.icon} style={styles.icon}/>
          <div style={label}>
            {this.props.children}
          </div>
        </div>
      )
    } else {
      return (
        <div style={style}>
          <div style={icon}>
            Unknown state
          </div>
          <div style={label}>
            {this.props.children}
          </div>
        </div>
      )
    }
  }
});

module.exports = ToggleTile;
