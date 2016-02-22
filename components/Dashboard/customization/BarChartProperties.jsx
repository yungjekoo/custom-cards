var React = require('react');
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var SwitchBtn = require('../../common/components/SwitchBtn.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }

};

var BarChartProperties = React.createClass({

  propTypes: {
    horizontal: RPT.bool,
    nls: RPT.object,
    style: RPT.object,
        theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      horizontal: false
    };
  },

  getInitialState: function() {
    return {
      horizontal: this.props.horizontal
    };
  },

  onHorizontalChanged: function(value) {
    this.setState({
      horizontal: value
    });
  },

  onUpdate: function(state) {
    var updatedState = Object.assign({},this.state, state);
    this.setState(updatedState);
  },

  render: function() {
    var self = this;
    var newProps = Object.assign({}, this.props, this.state);

    return (
      <div style={Object.assign({}, styles.container, this.props.style)}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td>
                      <Label label={this.props.nls['Horizontal']} theme={this.props.theme}>
                          <SwitchBtn theme={this.props.theme} onChange={this.onHorizontalChanged} initialValue={!!this.state.horizontal} trueText={this.props.nls["Yes"]} falseText={this.props.nls["No"]} ></SwitchBtn>
                      </Label>
                    </td>
                  </tr>
                </tbody>
              </table>
      </div>
    );
  }
});



module.exports = BarChartProperties;
