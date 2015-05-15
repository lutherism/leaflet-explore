var React = require('react');
var Leaflet = window.L;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      popups: {}
    };
  },
  render: function() {
    return (
      <div id="leaflet-map" key="LEAFLET_MAP"/>
    );
  },

  componentDidMount: function() {
    var popups = {};
    this.map = Leaflet.map(this.getDOMNode()).setView([51.505, -0.09], 13);
    Leaflet.tileLayer(this.props.tileSource, {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.props.popOvers.map(function(popOver) {
      var node = document.createElement("div");
      var popup = Leaflet.popup()
        .setLatLng(popOver.latLng)
        .setContent(node);

      this.map.openPopup(popup);

      var childEl = (
        <popOver.Component
          map={this.map}
          popup={popup}
          {...popOver.props} />
      );

      childEl = React.render(childEl, node);

      popups[popOver.props.key] = childEl;
    }.bind(this));

    this.setState({
      popups: popups
    });
  },

  componentWillReceiveProps: function(nextProps) {
    var newObj = {};
    Object.keys(this.state.popups).forEach(function(key) {
      newObj[key] = this.state.popups[key];}.bind(this));

    nextProps.popOvers.map(function(popOver) {
      if (!this.state.popups.hasOwnProperty(popOver.props.key)) {
        var node = document.createElement("div");
        var popup = Leaflet.popup()
          .setLatLng(popOver.latLng)
          .setContent(node);

        this.map.addLayer(popup);

        var childEl = (
          <popOver.Component
            map={this.map}
            popup={popup}
            {...popOver.props} />
        );

        childEl = React.render(childEl, node);
        newObj[popOver.props.key] = childEl;
      } else {
        this.state.popups[popOver.props.key].setProps(popOver.props);
      }
    }.bind(this));

    this.setState({
      popups: newObj
    });
  },
});
