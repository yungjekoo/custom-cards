var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }

}

var WeatherServiceProperties = React.createClass({

  propTypes: {
    location: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      location: "Rottenburg"
    };
  },

  getInitialState: function() {
    return {
      location: this.props.location
    }
  },

  onLocationChanged: function(value) {
    this.setState({
      location: value
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
                        <Label label='Location' theme={this.props.theme}>
			                <InputField theme={this.props.theme} onChange={this.onLocationChanged} initialValue={this.state.location}></InputField>
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



module.exports = WeatherServiceProperties;
