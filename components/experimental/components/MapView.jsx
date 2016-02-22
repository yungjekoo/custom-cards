var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var RPT = React.PropTypes;
var ol = require('openlayers');

/**
* Generic map to show pins
*/
var styles = {
  container: {
    height: "100%",
    width: "100%"
  }
}

var MapView = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    showMyLocation: RPT.bool,
    lat: RPT.number,
    lng: RPT.number,
    zoom: RPT.number,
    minZoom: RPT.number,
    maxZoom: RPT.number,
    homeIcon: RPT.string,
    width: RPT.number,
    height: RPT.number
  },

  getDefaultProps: function() {
    return {
      showMyLocation: true,
      lng: 11.575642,
      lat: 48.137294,
      zoom: 18,
      minZoom: 0,
      maxZoom: 20,
      homeIcon: "../../images/Location-Red_30px.png"
    };
  },

  componentDidMount: function() {
    this.createMap();
  },

  createMap: function() {
    this.destroyMap();

      var dom = ReactDOM.findDOMNode(this);
      this.width = dom.offsetWidth;
      this.height = dom.offsetHeight;

    var source = new ol.source.OSM();
    var layer = new ol.layer.Tile({
        source: source
    });
    this.map = new ol.Map({
        layers: [layer],
        target: dom,
        view: new ol.View({
          zoom: this.props.zoom,
          minZoom: this.props.minZoom,
          maxZoom: this.props.maxZoom
        })
    });

    this.map.getView().setCenter(ol.proj.transform([this.props.lng, this.props.lat], 'EPSG:4326', 'EPSG:3857'));

    this.markers = [];

    if (this.props.showMyLocation) {
      this.getMyLocation();
    } else {
      if (this.props.lat !== undefined && this.props.lng != undefined) {
        this.myPosition = {
          lng: this.props.lng,
          lat: this.props.lat
        };
      }
    }
    this.updateMap();
  },

  destroyMap: function() {
    if (this.map) {
      this.map.setTarget(null)
      this.map = null;
    }
  },

  getMyLocation: function() {
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position){
      self.myPosition = {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      };
      self.updateMap();
    }, function () {
      console.log("Cannot determine location");
    });
  },

  updateMap: function() {
    this.cleanupMarkers();

    if (this.map && this.myPosition) {
      if (!this.myMarker) {
        this.myMarker = new ol.Overlay({
          position: ol.proj.transform(
            [this.myPosition.lng, this.myPosition.lat],
            'EPSG:4326',
            'EPSG:3857'
          ),
          offset: [-15,-30],
          element: $('<img src="' + this.props.homeIcon + '">')
        });
        this.map.addOverlay(this.myMarker);
      }


      //this.myMarker.setPosition([this.myPosition.lng, this.myPosition.lat]);
    }

    if (this.props.children) {
      this.showPins();
    } else {
      var self = this;
      setTimeout(function() {
        self.map.getView().setCenter(ol.proj.transform([self.myPosition.lng, self.myPosition.lat], 'EPSG:4326', 'EPSG:3857'));
      }, 1000);
    }
  },

  showPins: function() {

    var pins = this.props.children;
    for (var i = 0; i < pins.length; i++) {
      var pin = pins[i];
      var icon = pin.props.icon;
      var lng = pin.props.lng;
      var lat = pin.props.lat;
      if (lng && lat) {
        var marker = new ol.Overlay({
          position: ol.proj.transform(
            [lng, lat],
            'EPSG:4326',
            'EPSG:3857'
          ),
          offset: [-15,-30],
          element: $('<img src="' + icon + '">')
        });
        this.map.addOverlay(marker);

        this.assignMarker(marker, pin);
        this.markers.push(marker);
      }
    }

    this.focusMarker();
  },

  assignMarker: function(marker, item) {
    marker.userObject = item;
  },

  cleanupMarkers: function() {
    for (var i in this.markers) {
      var marker = this.markers[i];
      if (marker) {
        this.map.removeOverlay(marker);
      }
    }
    this.markers = [];
  },

  focusMarker: function() {
    var coordinates = [];
    if (this.myPosition && this.markers) {
      for (var i = 0; i < this.markers.length; i++) {
        var position = ol.proj.transform(
                    this.markers[i].getPosition(),
                    'EPSG:3857',
                    'EPSG:4326'
                  )
        coordinates.push(position);
      }
      coordinates.push(ol.proj.transform(
                    this.myMarker.getPosition(),
                    'EPSG:3857',
                    'EPSG:4326'
                  ));

      var extent = ol.extent.boundingExtent(coordinates);
      //extent = [8.018633106257766, 48.01862738258205, 8.96175012551248, 48.99163315445185];
      var size = this.map.getSize();
      this.map.getView().fit(ol.proj.transformExtent(
                     extent,
                    'EPSG:4326',
                    'EPSG:3857'
                  ), size);

    }
  },

  selectMarker: function(marker, type, item) {
    // TODO
  },

  componentWillUnmount: function() {
    this.destroyMap();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.width != this.props.width || nextProps.height != this.props.height) {
      this.createMap();
    } else {
      this.updateMap();
    }

    return false;
  },

  render: function() {
    var style = Object.assign({}, styles.container, this.props.style?this.props.style:{});
    return (
      <div style={style}/>
    );
  }
});

module.exports = MapView;
