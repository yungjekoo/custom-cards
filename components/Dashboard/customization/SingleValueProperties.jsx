var React = require('react');
var Utils = require('../dashboard/DashboardUtils.js');
var RPT = React.PropTypes;
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var Select = require('../../common/components/Select.jsx');
var Option = require('../../common/components/Option.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%"
  }

};

var SingleValueProperties = React.createClass({

  propTypes: {
    major: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      major: null
    };
  },

  getInitialState: function() {
    return {
      major: this.props.major
    };
  },

  onMajorChanged: function(value) {
    this.setState({
      major: value
    });
  },

  onUpdate: function(state) {
    var updateState = Object.assign({},this.state, state);
    this.setState(updateState);
  },

  render: function() {
    var self = this;
    var newProps = Object.assign({}, this.props, this.state);
    var range = parseInt(this.state.range, 10);

    return (
      <div style={Object.assign({}, styles.container, this.props.style)}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td>
                      <Label label={this.props.nls['DataPoint']} theme={this.props.theme}>
                          <Select onChange={this.onMajorChanged} value={self.props.major}>
                            {this.props.plots.map(function(item) {
                              return <Option value={item.id} selected={self.props.major == item.id}>{item.label}</Option>;
                            })}
                          </Select>
                      </Label>
                    </td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>
      </div>
    );
  }
});



module.exports = SingleValueProperties;
