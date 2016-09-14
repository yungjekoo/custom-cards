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
    width: "100%",
    height: "100%",
    fontSize: "20px",
    padding: "20px"
  }
}

var EmptyCard = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string
  },

  render: function() {
    return (
			<div style={styles.container}>
				This is an empty card!
			</div>
		)
  }
});

module.exports = EmptyCard;
