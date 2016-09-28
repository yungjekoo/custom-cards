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

var styles = {
  empty: {
    padding: "20px"
  }
}

var iFrame = React.createClass({
  render: function() {
    var height = this.props.wrapper.realHeight;
    var width = this.props.wrapper.realWidth;

    if (width > 0 && height > 0 && this.props.url) {
      return(
          <div>
            <iframe frameBorder={0} style={{height: height + "px", width: width + "px"}} src={this.props.url} height={height} width={width}></iframe>
          </div>
      )
    } else {
      return(
        <div style={styles.empty}>
          Loading...
        </div>
      )
    }
  }
});

module.exports = iFrame;
