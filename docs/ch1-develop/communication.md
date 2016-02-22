#Card to card communication#

Cards can send direct messages containing a payload to other cards. An example are the `UserCardTable`and the `UserDetails`cards. If you click an entry in one card, the other card shows detailed information on the entry.

The framework provides an easy mechanism to send messages to all visible cards. The receiving card decides if it reacts on the payload.

To send a payload use

    Actions.notify({user: data})

where `Actions` is the Actions object of the `DashboardStore`.

The receiving card just listens to `DashboardStore` messages and reacts on payload with the key *notification*.

	componentDidMount: function() {
	    DashboardStore.listen(this.onNotify);
	},

	onNotify: function(payload) {
		if (payload.notification && payload.notification.user) {
			this.setState({model: payload.notification.user});
		}
	}
