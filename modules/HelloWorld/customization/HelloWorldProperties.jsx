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
  preview: {
    width: "300px",
    height: "100px",
    marginTop: "20px"
  },
  button: {
    marginRight: "10px"
  }
}

var HelloWorldProperties = React.createClass({

  propTypes: {
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired,
    // This is the card specific parameter. We receive the current value as prop.
    helloColor: RPT.string
  },

  getDefaultProps: function() {
    return {
      // The default value
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

  render: function() {
    var self = this;

    if (this.state) {
      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
          <h2>
            {this.props.nls.resolve('ColorScheme')}
          </h2>
          <button style={styles.button} onClick={function() {self.onColorChanged(0)}}>Purple</button>
          <button style={styles.button} onClick={function() {self.onColorChanged(1)}}>Red</button>
          <button style={styles.button} onClick={function() {self.onColorChanged(2)}}>Green</button>
          <button style={styles.button} onClick={function() {self.onColorChanged(3)}}>Blue</button>
          <button style={styles.button} onClick={function() {self.onColorChanged(4)}}>Teal</button>
          <div style={Object.assign({}, styles.preview, {backgroundColor: this.props.theme.schemes[this.state.helloColor].normal})}/>
        </div>
      );
  } else {
    return (
        <div>
          Loading...
        </div>
    )
  }
}
});

module.exports = HelloWorldProperties;
