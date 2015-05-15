var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      toggle: false
    };
  },
  render: function() {
    return (
      <div className="popover">
        <label>
          {this.state.toggle ?
            this.props.message : null}
        </label>
        <button
          onClick={function(e) {
            this.setState({toggle: !this.state.toggle});
            this.props.onToggle && this.props.onToggle(e);
          }.bind(this)}>
          Toggle
        </button>
      </div>
    );
  },
  componentDidMount: function() {
    console.log("POPOVER MOUNTED");
  },
  componentWillUnmount: function() {
    console.log("POPOVER UNMOUNTED");
  }
});
