var Reflux = require('reflux');

var Actions = Reflux.createActions([
	'setAuth',
	'getAuth'
]);

var IoTFAuthStore = Reflux.createStore({

	Actions: Actions,

	auth: {
		ltpa: null,
		org: null,
		domain: null,
		apiKey: null,
		apiToken: null
	},

	init: function() {
		var self = this;
		this.listenTo(Actions.setAuth, function(a,b,c,d,e) {
			self.onSetAuth(a,b,c,d,e);
		});
	},

	getAuth: function() {
		return this.auth;
	},

	onSetAuth: function(org, ltpa, domain, apiKey, apiToken) {
		if (org) { this.auth.org = org; };
		if (ltpa) { this.auth.ltpa = ltpa; };
		if (domain) { this.auth.domain = domain; };
		if (apiKey) { this.auth.apiKey = apiKey; };
		if (apiToken) { this.auth.apiToken = apiToken; };
		this.trigger(this.auth);
	}
});

module.exports = IoTFAuthStore;
