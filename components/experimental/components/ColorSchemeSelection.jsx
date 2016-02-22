var React = require('react');
var RPT = React.PropTypes;

var styles = {
  container: {
        marginBottom:"15px",
        boxSizing:"border-box"
  },
  colorTile: {
    margin: "5px",
    width: "32px",
    height: "32px",
    display: "inline-block",
    verticalAlign: "middle",
    fontSize: "20px",
    textAlign: "center"
  },
  tiles: {
    display: "block",
        width: "100%",
        float: "left"
  },
    after:{
        clear:"both"
    }
};

var ColorSchemeSelection = React.createClass({
  propTypes: {
    onChange: RPT.func,
    initialSelection: RPT.string,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      initialSelection: 0
    };
  },

  getInitialState: function() {
    return {
      selection: this.props.initialSelection
    };
  },

  onSelect: function(id) {
    this.setState({
      selection: id
    });
    if (this.props.onChange) {
      this.props.onChange(id);
    }
  },

  render: function() {
    var self = this;
    var schemes = this.props.theme.schemes;
    var tiles = schemes.map(function(scheme) {
      var style = Object.assign({},styles.colorTile, {
        backgroundColor: scheme.normal,
        borderTop: "8px solid " + scheme.dark,
        color: scheme.text
      });
      if (self.state.selection == scheme.name) {
        style.outline = "5px solid " + scheme.dark;
      }

      return <div style={style} key={scheme.name} onClick={function() {self.onSelect(scheme.name);}}>a</div>;
    });


    return (
      <div style={styles.container}>
        <div name='tiles' style={styles.tiles}>
          {tiles.map(function(result) {
            return result;
          })}
        </div>
                <div style={styles.after}></div>
      </div>
    );
  }
});

module.exports = ColorSchemeSelection;
