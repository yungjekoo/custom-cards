var React = require('react');
var RPT = React.PropTypes;
var Label =require('../../common/components/Label.jsx');
var ComboBox = require('../../common/components/ComboBox.jsx');
var Option = require('../../common/components/Option.jsx');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var Select = require('../../common/components/Select.jsx');
var SwitchBtn = require('../../common/components/SwitchBtn.jsx');

var styles = {
  container: {

  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "10px 0px"
  }

}

var DeviceMapProperties = React.createClass({

  propTypes: {
    longitude: RPT.string,
    latitude: RPT.string,
    showMyLocation: RPT.bool,
    maxZoom: RPT.number,
    type: RPT.string,
    nls: RPT.object,
    style: RPT.object,
    theme: RPT.object.isRequired
  },

  getDefaultProps: function() {
    return {
      longitude: "",
      latitude: "",
      showMyLocation: true,
      maxZoom: 18,
      type: "osm"
    };
  },

  getInitialState: function() {
    return {
      longitude: this.props.longitude,
      latitude: this.props.latitude,
      showMyLocation: this.props.showMyLocation,
      maxZoom: this.props.maxZoom,
      type: this.props.type
    }
  },

  onLongitudeChanged: function(value) {
    this.setState({
      longitude: value
    })
  },

	onLatitudeChanged: function(value) {
		this.setState({
		  latitude: value
		});
	},

  onMaxZoomChanged: function(value) {
    this.setState({
      maxZoom: parseInt(value)
    });
  },

  onShowMyLocationChanged: function(value) {
    this.setState({
      showMyLocation: value
    });
  },

  onTypeChanged: function(value) {
    this.setState({
      type: value
    });
  },

  onUpdate: function(state) {
    var state = Object.assign({},this.state, state);
    this.setState(state);
  },

  render: function() {
    var self = this;

    if (this.state && this.props.plots &&  this.props.plots.length > 0) {
		var cache = IoTFDeviceStore.getCache();
		var propertySuggestions = [];

		for (var i in this.props.plots) {
			var plot = this.props.plots[i];
			var device = cache[plot.device];
			if (device) {
				var props = device[plot.event];
				if (props) {
					var propKeys = Object.keys(props);
					propertySuggestions = propertySuggestions.concat(propKeys);
				}
			}
		}

    propertySuggestions.sort();

    var maxZoom = this.state.maxZoom;
    var type = this.state.type;

      return (
        <div style={Object.assign({}, styles.container, this.props.style)}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td>
                        <Label label='Longitude property name' theme={this.props.theme}>
            							<ComboBox theme={self.props.theme} onChange={this.onLongitudeChanged} initialValue={self.state.longitude}>
            								{propertySuggestions.map(function(item) {
            								return <Option key={item} value={item} theme={self.props.theme}>{item}</Option>
            								})}
            							</ComboBox>
                        </Label>
                      </td>
                      <td>
                        <Label label='Latitude property name' theme={this.props.theme}>
            							<ComboBox theme={self.props.theme} onChange={this.onLatitudeChanged} initialValue={self.state.latitude}>
            								{propertySuggestions.map(function(item) {
            								return <Option key={item} value={item} theme={self.props.theme}>{item}</Option>
            								})}
            							</ComboBox>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Label label='Max zoom level' theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onMaxZoomChanged} value={""+maxZoom}>
                                <Option  theme={this.props.theme} value="20" selected={maxZoom == 20}>House</Option>
                                <Option  theme={this.props.theme} value="16" selected={maxZoom == 16}>Street</Option>
                                <Option  theme={this.props.theme} value="14" selected={maxZoom == 14}>City</Option>
                                <Option  theme={this.props.theme} value="10" selected={maxZoom == 10}>Area</Option>
                                <Option  theme={this.props.theme} value="6" selected={maxZoom == 6}>Country</Option>
                                <Option  theme={this.props.theme} value="4" selected={maxZoom == 4}>Continent</Option>
                                <Option  theme={this.props.theme} value="2" selected={maxZoom == 2}>World</Option>
                            </Select>
                        </Label>
                      </td>
                      <td>
                        <Label label='Card type' theme={this.props.theme}>
                            <Select theme={this.props.theme} onChange={this.onTypeChanged} value={""+type}>
                                <Option  theme={this.props.theme} value="osm" selected={type == "osm"}>Open Street Map</Option>
                                <Option  theme={this.props.theme} value="road" selected={type == "road"}>Road</Option>
                                <Option  theme={this.props.theme} value="sat" selected={type == "sat"}>Aearial</Option>
                                <Option  theme={this.props.theme} value="hyb" selected={type == "hyb"}>Hybrid</Option>
                            </Select>
                        </Label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Label label='Show my location' theme={this.props.theme}>
                            <SwitchBtn theme={this.props.theme} onChange={this.onShowMyLocationChanged} initialValue={!!this.state.showMyLocation} trueText="Yes" falseText="No" ></SwitchBtn>
                        </Label>
                      </td>
                    </tr>

                  </tbody>
                </table>
        </div>
      );
  } else {
    return (
        <div>
        	No datapoints defined
        </div>
    )
  }
}
});



module.exports = DeviceMapProperties;
