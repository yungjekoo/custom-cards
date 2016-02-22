var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var ColorSelection = require('../../common/components/ColorSelection.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }
}

var HelloWorldProperties = React.createClass({

  propTypes: {
    helloColor: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      helloColor: 0
    };
  },

  getInitialState: function() {
    return {
      helloColor: this.props.helloColor
    }
  },

  onColorChanged: function(value) {
    this.setState({
      helloColor: value
    })
  },

  onUpdate: function(state) {
    var state = Object.assign({},this.state, state);
    this.setState(state);
  },

  render: function() {
    var self = this;

    if (this.state) {
      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td colSpan="2">
			            <Label label={this.props.nls.resolve('ColorScheme')} theme={this.props.theme}>
			                <ColorSelection theme={this.props.theme} onChange={this.onColorChanged} initialSelection={this.state.helloColor}></ColorSelection>
			            </Label>
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>
      );
  } else {
    return (
        <div>
        </div>
    )
  }
}
});



module.exports = HelloWorldProperties;
