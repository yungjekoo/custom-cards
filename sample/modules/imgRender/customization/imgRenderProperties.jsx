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
Nikhil C - Custom Cards
*****************************************************************************/
var React = require('react');
var RPT = React.PropTypes;

var styles = {
  td: {
    padding: "5px"
  },
  input: {
    padding: "7px"
  }
}

var imgRenderProperties = React.createClass({
  getDefaultProps: function() {
      return {
        url: "https://www.ibm.com/internet-of-things/"
      };
  },

  getInitialState: function() {
      return {
          url: this.props.url
      }
  },

  onUrlChanged: function(event) {
      this.setState({
        url: event.currentTarget.value
      })
  },

  onUpdate: function(state) {
      var state = Object.assign({},this.state, state);
      this.setState(state);
  },

  render: function() {
      var self = this;

      return (
          <div >
            <table>
              <tbody>
                <tr>
                  <td style={styles.td}>
                    URL to be shown in the imgRender (only https)
                  </td>
                  <td style={styles.td}>
                    <input style={styles.input} type="text" onChange={this.onUrlChanged} value={this.state.url}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      );
  }
});

module.exports = imgRenderProperties;
