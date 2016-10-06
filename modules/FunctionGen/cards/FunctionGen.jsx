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
var update = React.addons.update;
var LoadIndicator = IoTFCommon.LoadIndicator;
var Label = IoTFCommon.Label;
var Select = IoTFCommon.Select;
var Option = IoTFCommon.Option;
var InputField = IoTFCommon.InputField;
var SwitchBtn = IoTFCommon.SwitchBtn;
var Accordion = IoTFCommon.Accordion;
var FunctionGenStore = require('../stores/FunctionGenStore.js');
var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "7px"
  },
  scrollableContainer: {
    height: "100%",
    overflowY: "auto",
    padding: "20px"
  },
  accordion: {
    height: "100px"
  },
  counter: {
  	fontSize: "60px",
  	textAlign: "center",
  	width: "100%",
  	paddingTop: "20px"
  }
}
/*
* function generator card
* this card is used to control simulated devices
* for selected devices this card creates device events
* based on different mathematical functions
* the card then can be used to change the frequency (event per sec),
* and toggle the sending of data for each function
*/
var FunctionGen = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string,
    plots: RPT.array
  },

  getDefaultProps: function() {
    return {
      plots: []
    };
  },

  getInitialState: function() {
    var initialFrequencies = {};
    var initialSwitches = {};
    var functionConfig = {
      "sin" : false,
      "cos" : false,
      "sawTooth" : false,
      "sawToothBack" : false,
      "triangle" : false,
      "boolean" : false,
      "string" : false,
      "random" : false
    };
    for(var i in this.props.plots){
      initialSwitches[i] = functionConfig;
      initialFrequencies[i] = 1;
    }
    return {
      selectedPlotIndex : 0,
      frequencies : initialFrequencies,
      switches : initialSwitches
    }
  },

  componentDidMount: function() {
    FunctionGenStore.listen(this.onUpdate);
    FunctionGenStore.Actions.setCredentials(this.props.plots);
  },
  componentWillUnmount: function() {
    FunctionGenStore.Actions.stopDevices();
  },

  onExpand: function(id) {
    this.setState({
      selectedPlotIndex: id
    });
  },
  onFrequencyUpdate: function(devicePlotIndex, newFrequency) {
    var newFreq = {};
    newFreq[devicePlotIndex] = {$set:newFrequency};
    var newState = update(this.state.frequencies, newFreq);
    this.setState({frequencies: newState})
    FunctionGenStore.Actions.changeFrequency(devicePlotIndex, newFrequency);
  },
  onFunctionToggle: function(devicePlotIndex, functionName, toggleState) {
    // alternate variant:
    // var newSwitch = {};
    // newSwitch[devicePlotIndex] = {};
    // newSwitch[devicePlotIndex][functionName] ={$set:toggleState};
    //var newState = update(this.state.switches, newSwitch);
    var newState = update(this.state.switches,
      {
        [devicePlotIndex] : {
          [functionName] : {$set:toggleState}
        }
      });
    this.setState({switches: newState});
    FunctionGenStore.Actions.functionToggle(devicePlotIndex, functionName,toggleState);
  },

  render: function() {
  	var self = this;
    var descriptionArray = [];
    for(var i in this.props.plots){
      var descriptionEntry = {};
      descriptionEntry.devicePlotIndex = i;
      descriptionEntry.device = this.props.plots[i].device;
      descriptionEntry.frequency = {};
      descriptionEntry.frequency.label = "Frequency of Data (Hz) for " + this.props.plots[i].device;
      descriptionEntry.frequency.value = this.state.frequencies[i];
      descriptionEntry.frequency.onSubmit = this.onFrequencyUpdate.bind(this,i);
      descriptionEntry.functions = [];
      descriptionEntry.functions.push(
        { line:0,
          left: {index:0, label : "Sin (x)",
            onChange : this.onFunctionToggle.bind(this,i,"sin"),
            value : this.state.switches[i].sin
          },
          right:{index:1, label : "Cos (x)",
            onChange : this.onFunctionToggle.bind(this,i,"cos"),
            value : this.state.switches[i].cos
          }
        }
      );
      descriptionEntry.functions.push(
        { line:1,
          left: {index:2, label : "Saw Tooth ( /| )",
            onChange : this.onFunctionToggle.bind(this,i,"sawTooth"),
            value : this.state.switches[i].sawTooth
            },
          right:{index:3, label : "Saw Tooth ( |\\ )",
            onChange : this.onFunctionToggle.bind(this,i,"sawToothBack"),
            value : this.state.switches[i].sawToothBack
          }
        }
      );
      descriptionEntry.functions.push(
        { line:2,
          left: {index:4, label : "Triangle",
            onChange : this.onFunctionToggle.bind(this,i,"triangle"),
            value : this.state.switches[i].triangle
          },
          right:{index:5, label : "Boolean",
            onChange : this.onFunctionToggle.bind(this,i,"boolean"),
            value : this.state.switches[i].boolean
          }
        }
      );
      descriptionEntry.functions.push(
        { line:3,
          left: {index:6, label : "String",
            onChange : this.onFunctionToggle.bind(this,i,"string"),
            value : this.state.switches[i].string
          },
          right:{index:7, label : "Random",
            onChange : this.onFunctionToggle.bind(this,i,"random"),
            value : this.state.switches[i].random
          }
        }
      );
      descriptionArray.push(descriptionEntry);
    }
    // if (this.state.message && this.state.count > -1) {

      var styleContainer = Object.assign({}, styles.container, this.props.style?this.props.style:{});
      return (
        <div style={styleContainer}>
          <div style={styles.scrollableContainer}>
            {descriptionArray.map(function(deviceEntry){
              return (
                <Accordion theme={self.props.theme}
                  label={deviceEntry.device} noDelete={true} key={deviceEntry.devicePlotIndex}
                  id={deviceEntry.devicePlotIndex}
                  onExpand={self.onExpand} expanded={self.state.selectedPlotIndex == deviceEntry.devicePlotIndex}>
                  <table>
                    <thead><tr><th colSpan="2">
                      <Label label={deviceEntry.frequency.label} theme={self.props.theme}>
                        <InputField type={"number"} min={0} initialValue={deviceEntry.frequency.value} warning={"false"}
                          onSubmit={deviceEntry.frequency.onSubmit}
                          onBlur={deviceEntry.frequency.onSubmit}
                          onChange={deviceEntry.frequency.onSubmit}
                          theme={self.props.theme} />
                      </Label>
                    </th></tr></thead>
                    <tbody>
                      {deviceEntry.functions.map(function(functionEntry){

                      return (
                        <tr key={functionEntry.line}>
                          <td>
                            <Label  label={functionEntry.left.label} theme={self.props.theme}>
                            <SwitchBtn onChange={functionEntry.left.onChange}
                              initialValue={functionEntry.left.value}
                              theme={self.props.theme} />
                          </Label>
                          </td>
                          <td>
                            <Label  label={functionEntry.right.label} theme={self.props.theme}>
                            <SwitchBtn onChange={functionEntry.right.onChange}
                              initialValue={functionEntry.right.value}
                              theme={self.props.theme} />
                          </Label>
                          </td>
                        </tr>

                      );
                      })}
                      </tbody>
                  </table>
                </Accordion>);
            })}
          </div>
        </div>
      );
  }
});

module.exports = FunctionGen;
