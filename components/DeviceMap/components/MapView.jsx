var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var RPT = React.PropTypes;
var ol = window.ol; //require('openlayers');

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
    type: RPT.string,
    homeIcon: RPT.string,
    onClick: RPT.func,
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
      type: "osm",
      homeIcon: "../resources/images/Location-Red_30px.png"
    };
  },

  componentDidMount: function() {
    this.createMap();
  },

  createMap: function() {
    this.destroyMap();

      var dom = ReactDOM.findDOMNode(this);

    var layer = null;
    if (this.props.type == "road") {
      layer = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'})
      });
    } else if (this.props.type == "sat") {
      layer = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      });
    } else if (this.props.type == "hyb") {
      layer = new ol.layer.Group({
          layers: [
            new ol.layer.Tile({
              source: new ol.source.MapQuest({layer: 'sat'})
            }),
            new ol.layer.Tile({
              source: new ol.source.MapQuest({layer: 'hyb'})
            })
          ]
        })
    } else if (this.props.type == "osm") {
      layer = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'osm'})
      });
    } else {
      layer = new ol.layer.Tile({
          source: new ol.source.OSM()
      });
    }

    var zoom = this.props.zoom;
    if (zoom < this.props.minZoom) {
      zoom = this.props.minZoom;
    }
    if (zoom> this.props.maxZoom) {
      zoom = this.props.maxZoom;
    }
    this.map = new ol.Map({
        layers: [layer],
        target: dom,
        view: new ol.View({
          zoom: zoom,
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

  initEvents: function() {
    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false
    });
    this.map.addOverlay(popup);

    this.map.on('click', function(evt) {
      var feature = this.map.forEachFeatureAtPixel(evt.pixel,
          function(feature, layer) {
            return feature;
          });
      if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        popup.setPosition(coord);
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': feature.get('name')
        });
        $(element).popover('show');
      } else {
        $(element).popover('destroy');
      }
    });

    // change mouse cursor when over marker
    this.map.on('pointermove', function(e) {
      if (e.dragging) {
        $(element).popover('destroy');
        return;
      }
      var pixel = this.map.getEventPixel(e.originalEvent);
      var hit = this.map.hasFeatureAtPixel(pixel);
      this.map.getTarget().style.cursor = hit ? 'pointer' : '';
    });

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
      	var icon = $('<img src="' + this.props.homeIcon + '">')[0];
        this.myMarker = new ol.Overlay({
          position: ol.proj.transform(
            [this.myPosition.lng, this.myPosition.lat],
            'EPSG:4326',
            'EPSG:3857'
          ),
          offset: [-15,-30],
          element: icon
        });
        this.map.addOverlay(this.myMarker);
      }


      //this.myMarker.setPosition([this.myPosition.lng, this.myPosition.lat]);
    }

    if (this.props.children && this.props.children.length > 0) {
      this.showPins();
    } else {
      var self = this;
        if (this.myPosition) {
          self.map.getView().setCenter(ol.proj.transform([self.myPosition.lng, self.myPosition.lat], 'EPSG:4326', 'EPSG:3857'));
        }
    }
  },

  showPins: function() {
    var self = this;

    var pins = this.props.children;
    var trigger = function(pin) {
      return function() {
        if (self.props.onClick) {
          self.props.onClick(pin.props.payload);
        }
      }
    }
    for (var i = 0; i < pins.length; i++) {
      var pin = pins[i];
      var icon = pin.props.icon?pin.props.icon:this.props.icon;
      var lng = pin.props.lng;
      var lat = pin.props.lat;
      if (lng && lat) {
      	var iconNode = $('<img src="' + icon + '">')[0]
        var marker = new ol.Overlay({
          position: ol.proj.transform(
            [lng, lat],
            'EPSG:4326',
            'EPSG:3857'
          ),
          offset: [-15,-30],
          element: iconNode
        });
        iconNode.addEventListener('click', trigger(pin));
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
      var view = this.map.getView();
      view.fitExtent(ol.proj.transformExtent(
                     extent,
                    'EPSG:4326',
                    'EPSG:3857'
                  ), size);
      var zoomLevel = this.map.getView().getZoom();
      this.map.getView().setZoom(zoomLevel - 0.5);

    }
  },

  selectMarker: function(marker, type, item) {
    // TODO
  },

  componentWillUnmount: function() {
    this.destroyMap();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var self = this;
    if (nextProps.width != this.props.width ||
        nextProps.height != this.props.height ||
        nextProps.showMyLocation != this.props.showMyLocation ||
        nextProps.maxZoom != this.props.maxZoom ||
        nextProps.type != this.props.type
        ) {
      setTimeout(function() {
        self.createMap();
      }, 1);
    } else {
      setTimeout(function() {
        self.updateMap();
      }, 1)
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
