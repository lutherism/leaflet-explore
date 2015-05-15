var React = require('react');
var Leaflet = require('./Leaflet.jsx');
var PopOver = require('./PopOver.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      toggle: false,
      popOvers: [{
        Component: PopOver,
        latLng: [51.5, -0.09],
        props: {
          message: "Popup!",
          key: 0,
          onToggle: this.popupToggle.bind(this)
        }
      }]
    };
  },
  render: function() {
    return (
      <div>
        <h1>
          {this.state.toggle ?
            "Hello World" : null}
        </h1>
        <button
          onClick={this.addPopOver}>
          Add PopOver
        </button>
        <Leaflet
          tileSource="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ref="map"
          popOvers={this.state.popOvers}/>
      </div>
    );
  },
  popupToggle: function() {
    this.setState({
      toggle: !this.state.toggle
    });
  },
  addPopOver: function(e) {
    this.setState({
      popOvers: this.state.popOvers.concat({
        Component: PopOver,
        latLng: [51.5 + ((Math.random() *.06) - .03), -0.09 + ((Math.random() *.06) - .03)],
        props: {
          message: "Popup!",
          key: this.state.popOvers.length,
          onToggle: this.popupToggle.bind(this)
        }
      })
    });
  }
});
