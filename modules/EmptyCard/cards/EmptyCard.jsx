var React = require('react');
var IoTFCommon = require('IoTFCommon');

var RPT = React.PropTypes;

var styles = {
  container: {
    width: "100%",
    height: "100%",
    fontSize: "20px",
    padding: "20px"
  }
}

var EmptyCard = React.createClass({
  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    nls: RPT.object,
    wrapper: RPT.object,
    height: RPT.string,
    weight: RPT.string
  },

  render: function() {
    return (
			<div style={styles.container}>
				Hello World!
			</div>
		)
  }
});

module.exports = EmptyCard;
