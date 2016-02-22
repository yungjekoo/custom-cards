var React = require('react');
var RPT = React.PropTypes;

var styles = {
	container: {
		height: "100%",
		width: "100%",
		padding: "20px"
	},
	section: {
		borderLeft: "5px solid silver",
	    display: "inline-block",
	    marginLeft: "10px",
	    paddingLeft: "10px",
	    verticalAlign: "top"
   	},
	id: {
		fontSize: "40px",
	    backgroundColor: "silver",
	    lineHeight: "50px",
	    height: "50px",
	    width: "50px",
	    textAlign: "center",
	    borderRadius: "50%",
	    display: "inline-block",
    	verticalAlign: "top"
	},
	name: {
		fontSize: "40px"
	},
	description: {
		fontSize: "15px"
	},
	mail: {
		fontSize: "15px"
	},
	avatar: {
		width: "120px",
		height: "120px",
		borderRadius: "50%",
		verticalAlign: "top",
		marginLeft: "20px",
		marginTop: "20px"
	}
};

// Documentation link: 
// https://github.ibm.com/IoT/dashboard-component/wiki/User-details-card
//

var UserDetails = React.createClass({

	propTypes: {
		theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
		wrapper: RPT.object
	},

	getDefaultProps: function() {
		return {
		};
	},

	getInitialState: function() {
		return {
		};
	},

	componentDidMount: function() {
		// TODO Any way to properly handle circular requires?
		var self = this;
		var DashboardStore = require('../dashboard/DashboardStore');
	    DashboardStore.listen(self.onNotify);
	},

	onNotify: function(payload) {
		if (payload.notification && payload.notification.user) {
			this.setState({model: payload.notification.user});
		}
	},

	render: function() {
		if (this.state.model) {
			return (
				<div style={styles.container}>
					<div style={styles.id}>{this.state.model.id}</div>
					<div style={styles.section}>
						<div style={styles.name}>{this.state.model.name}</div>
						<div style={styles.description}>{this.state.model.descrip}</div>
						<div style={styles.mail}>{this.state.model.mail}</div>
					</div>
					<img style={styles.avatar} src={this.state.model.avatar}/>
				</div>
			);
		} else {
			var message = this.props.nls.resolve("CARD_USERDETAIL_placeholder");
			return (
				<div style={styles.container}>
					{message}
				</div>
			);
		}
	}
});

module.exports = UserDetails;
