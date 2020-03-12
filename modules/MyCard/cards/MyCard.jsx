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
var MyCardStore = require('../stores/MyCardStore.js');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat"
  },
  counter: {
  	fontSize: "60px",
  	textAlign: "center",
  	width: "100%",
  	paddingTop: "20px"
  }
}

var MyCard = React.createClass({
  propTypes: {
    // Global color scheme. Use the color values in this object to have a common look and feel.
    theme: RPT.object.isRequired,
    // Optional style object to overwrite the local style
    style: RPT.object,
    // The global object for national language support
    nls: RPT.object,
    // The wrapper object contains information about the card configuration and layout
    wrapper: RPT.object,
    // This is the card specific setting from the properties dialog
    helloColor: RPT.number
  },

  getDefaultProps: function() {
    return {
    	helloColor: 0
    };
  },

  getInitialState: function() {
    return {
    	message: "n/a",
    	count: -1
    }
  },

  componentDidMount: function() {
    MyCardStore.listen(this.onUpdate);
    // Trigger the store with a dummy command.
    MyCardStore.Actions.sayHello("Hi there!");
  },

  onUpdate: function(payload) {
    if (this.isMounted()) {
      if (payload.helloMessage || payload.helloCount !== undefined) {
        var model = {};
        if (payload.helloMessage) {
          model.message = payload.helloMessage;
        }
        if (payload.helloCount) {
          model.count = payload.helloCount;
        }
        this.setState(model);
      }
    }
  },

  render: function() {
  	var self = this;
    if (this.state.message && this.state.count > -1) {

      var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
      // Get the selected color from the global color scheme
      style = Object.assign(style, {color: this.props.theme.schemes[this.props.helloColor].normal});

      if (this.props.wrapper.width > 2) {
      	style = Object.assign(style, {backgroundImage: 'url("http://t.wallpaperweb.org/wallpaper/animals/1600x1200/Curious_Tabby_Kitten.jpg")'});
      }

      return (
        <div style={style}>
        	The store says:
        	<div className="MyCard">
	        	{this.state.message}
        	</div>
        	<div style={styles.counter}>
        	 	{this.state.count}
        	</div>
        </div>
      )
    } else {
      return (
  			<div style={styles.style}>
  				Loading...
  			</div>
  		)
    }
  }
});

module.exports = MyCard;
