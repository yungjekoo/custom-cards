/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Frank Leo Mielke - Initial Contribution
*****************************************************************************/
var React = require('react');

var RPT = React.PropTypes;

var styles = {
  container: {

  },
  table: {
    width: "100%"
  },
  td: {
    padding: "5px"
  },
  input: {
    padding: "7px",
    width: "300px"
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

	onFrequencyChanged: function(event) {
		this.setState({
		  frequency: event.currentTarget.value
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
            <table>
              <tbody>
                <tr>
                  <td style={styles.td}>
                    Webcam URL
                  </td>
                  <td style={styles.td}>
                    <input style={styles.input} type="text" onChange={this.onUrlChanged} value={this.state.url}/>
                  </td>
                </tr>
                <tr>
                  <td style={styles.td}>
                    Refresh rate
                  </td>
                  <td style={styles.td}>
                    <select onChange={this.onFrequencyChanged} value={""+frequency}>
                      <option value="1" selected={frequency == 1}>1 second</option>
                      <option value="5" selected={frequency == 5}>5 seconds</option>
                      <option value="10" selected={frequency == 10}>10 seconds</option>
                      <option value="15" selected={frequency == 15}>15 seconds</option>
                      <option value="30" selected={frequency == 30}>30 seconds</option>
                      <option value="60" selected={frequency == 60}>60 seconds</option>
                    </select>
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
