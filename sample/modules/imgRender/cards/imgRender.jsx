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

var styles = {
  empty: {
    padding: "20px"
  }
}

var imgRender = React.createClass({
  getInitialState: function () {
        return {url: ""};
    },

    componentDidMount: function () {
      console .log("did mount")
      var self=this;
      var ws = new WebSocket(self.props.wsurl,"echo-protocol");

              ws.onopen = function()
             {
                // Web Socket is connected, send data using send()
                console.log("web socket connected")
                var obj={};
                obj.deviceId=self.props.plots[0].device;
                obj.deviceType=self.props.plots[0].deviceType;
                obj.deviceEvent=self.props.plots[0].event;
                obj.payload=self.props.plots[0].property;

                ws.send(JSON.stringify(obj));
                console.log("Message is sent...");
             };

             ws.onmessage = function (evt)
             {
                var filename = evt.data;
                self.setState({url: self.props.url+filename});
                console.log("Message is received..."+filename);
                self.render();
             };

             ws.onclose = function()
             {
                // websocket is closed.
                console.log("Connection is closed...");
             };
    },

  render: function() {
    var height = this.props.wrapper.realHeight;
    var width = this.props.wrapper.realWidth;
    var img = React.createElement('img', {src:  this.state.url})
    if (width > 0 && height > 0 && this.props.url) {
      return(
          <div>
             {img}
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

module.exports = imgRender;
