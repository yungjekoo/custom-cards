var React = require('react');
var RPT = React.PropTypes;
var PushButtonCard = require('./PushButtonCard.jsx');
var Actions = require('../dashboard/Actions.jsx');



// Documentation link: 
// https://github.ibm.com/IoT/dashboard-component/wiki/Router-link
//


/**
* Show an icon and a text on the card. Links to another route of the application outside of the dashboard.
*/
var RouterLink = React.createClass({

	propTypes: {
        theme: RPT.object.isRequired,
		style: RPT.object,
        nls: RPT.object,
        subtext:RPT.string,
        target:RPT.string,
        icon:RPT.string,
        wrapper:RPT.object
	},

	getDefaultProps: function() {
		return {
            text:"",
            icon:"dashboard",
            subtext:"",
            target: null
		};
	},

    onClick: function() {
		if (this.props.target) {
            Actions.navigateRoute(this.props.target);
   		}
	},

	render: function() {
        
		return (
           <PushButtonCard 
                icon={this.props.icon} 
                subtext={this.props.subtext} 
                action={this.onClick}
                wrapper={this.props.wrapper}
                theme={this.props.theme}
            >
           </PushButtonCard>
        );
	}
});

module.exports = RouterLink;
