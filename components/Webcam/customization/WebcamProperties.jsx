var React = require('react');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }

}

var WebcamProperties = React.createClass({

  propTypes: {
    url: RPT.string,
    frequency: RPT.number,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      url: "http://kaufhaus.ludwigbeck.de/manual/webcam/1sec.jpg",
      frequency: 5
    };
  },

  getInitialState: function() {
    return {
      url: this.props.url,
      frequency: this.props.frequency
    }
  },

  onURLChanged: function(value) {
    this.setState({
      url: value
    })
  },

	onFrequencyChanged: function(value) {
		this.setState({
		  frequency: value
		});
	},

  onUpdate: function(state) {
    var state = Object.assign({},this.state, state);
    this.setState(state);
  },

  render: function() {
    var self = this;

    var frequency = parseInt(this.state.frequency, 10);

    if (this.state) {
      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <Label label='Webcam URL' theme={this.props.theme}>
			                <InputField theme={this.props.theme} onChange={this.onURLChanged} initialValue={this.state.url}></InputField>
                        </Label>
                      </td>
                    </tr>
                  <tr>
                    <td>
                      <Label label='Refresh rate' theme={this.props.theme}>
                          <Select onChange={this.onFrequencyChanged} value={""+frequency}>
                              <Option value="1" selected={frequency == 1}>1 second</Option>
                              <Option value="5" selected={frequency == 5}>5 seconds</Option>
                              <Option value="10" selected={frequency == 10}>10 seconds</Option>
                              <Option value="15" selected={frequency == 15}>15 seconds</Option>
                              <Option value="30" selected={frequency == 30}>30 seconds</Option>
                              <Option value="60" selected={frequency == 60}>60 seconds</Option>
                          </Select>
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



module.exports = WebcamProperties;
