var React = require('react');
var RPT = React.PropTypes;
var PushButtonCard = require('./PushButtonCard.jsx');
var Actions = require('../dashboard/Actions.jsx');


//Link to documentation:
//https://github.ibm.com/IoT/dashboard-component/wiki/Dashboard-link-card
//

/**
* Show an icon and a text on the card. Links to another dashboard on click.
*/
var DashboardLink = React.createClass({

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
            icon:"apps",
            subtext:"",
            target: null
		};
	},

    onClick: function() {
		if (this.props.target) {
            Actions.loadDashboard(this.props.target);
            Actions.getComponents();
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

module.exports = DashboardLink;
