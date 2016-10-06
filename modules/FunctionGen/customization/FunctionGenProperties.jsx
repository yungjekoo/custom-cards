/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Marcus Kamieth - Initial Contribution
*****************************************************************************/
var React = require('react');
var IoTFCommon = require('IoTFCommon');
var RPT = React.PropTypes;
var InputField = IoTFCommon.InputField;
var Label = IoTFCommon.Label;
var ColorSelection = IoTFCommon.ColorSelection;

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }
}

var FunctionGenProperties = React.createClass({

  propTypes: {
    helloColor: RPT.number,
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
        <div></div>
    )
  }
}
});



module.exports = FunctionGenProperties;
