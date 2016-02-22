var Reflux = require('reflux');
var $ = require('jquery');
var Const = require('../../Dashboard/util/Const');
var IoTFAuthStore = require('./IoTFAuthStore.js');

var Actions = Reflux.createActions([
	'fetchDeviceCount',
	'fetchDataTrafficUsage',
	'fetchActiveDeviceUsage',
	'fetchHistoricalDataUsage',
	'fetchDeviceTypes'
]);

var IoTFUsageStore = Reflux.createStore({

	Actions: Actions,

	state: Const.DISCONNECTED,

	auth: {

		  // org: encodeURIComponent("6qkzjf"),
		  // apiKey: encodeURIComponent("a-6qkzjf-3egnjdo5qy"),
		  // apiToken: encodeURIComponent("CW-aWx_sGeFGc&F?ls")

			// org: "jgccc5",
			// apiKey: "a-jgccc5-tkutlvvnem",
			// apiToken: "YfqMJVD18qcH@ispr0"

	},

	init: function() {
		var self = this;
		this.listenTo(Actions.fetchDeviceTypes, this.onFetchDeviceTypes);
		this.listenTo(Actions.fetchDeviceCount, this.onFetchDeviceCount);
		this.listenTo(Actions.fetchDataTrafficUsage, this.onFetchDataTrafficUsage);
		this.listenTo(Actions.fetchActiveDeviceUsage, this.onFetchActiveDeviceUsage);
		this.listenTo(Actions.fetchHistoricalDataUsage, this.onFetchHistoricalDataUsage);

	    IoTFAuthStore.listen(function(payload) {
	    	console.log("Retrieving auth:");
	    	self.auth = {
				ltpa: (payload.ltpa !== null) ? encodeURIComponent(payload.ltpa) : null,
	    		domain: encodeURIComponent(payload.domain),
	    		org: encodeURIComponent(payload.org),
	    		apiKey: (payload.apiKey !== null) ? encodeURIComponent(payload.apiKey) : null,
	    		apiToken: (payload.apiToken !== null) ? encodeURIComponent(payload.apiToken) : null
	    	};
	    	console.log(self.auth);
	    });

	},

	onFetchDeviceCount: function() {
		//var deviceUrl = "https://" + IoTFCredentials.org + ".internetofthings.ibmcloud.com/";
		var opts = {
			url: "/api/v0002/bulk/devices",
			contentType: "application/json"
		};
		if (this.auth.apiKey !== null && this.auth.domain && this.auth.domain.match("internetofthings") === null) {
			// if running as localhost
			opts.url += "?org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		} else if (this.auth.ltpa === null && this.auth.apiKey !== null && this.auth.apiToken !== null) {
			opts.headers = {
				"Authorization": "Basic " + btoa(this.auth.apiKey + ":" + this.auth.apiToken)
			};
		}
		console.log(opts);
		var self = this;
		$.ajax(opts)
		.done(function(response) {
			console.log(response);
			try {
				if (response.meta && response.meta.total_rows) {
					self.trigger({
						deviceCount: response.meta.total_rows
					});
				} else {
					// handle bad result?
				}
			} catch (e) { console.error(e); }
		})
		.fail(function(response) {
			console.error(response);
		});
	},

	onFetchDeviceTypes: function() {
		//var deviceUrl = "https://" + IoTFCredentials.org + ".internetofthings.ibmcloud.com/";
		var opts = {
			url: "/api/v0001/device-types",
			contentType: "application/json"
		};
		console.log("DOMAIN", this.auth.domain);
		console.log("AUTH", this.auth);
//		if (this.auth.apiKey !== null && this.auth.domain && this.auth.domain.match("internetofthings") === null) {
    if (this.auth.apiKey !== null && location.hostname.match("internetofthings") === null) {
			// if running as localhost
			opts.url += "?org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		} else if (this.auth.ltpa === null && this.auth.apiKey !== null && this.auth.apiToken !== null) {
			opts.headers = {
				"Authorization": "Basic " + btoa(this.auth.apiKey + ":" + this.auth.apiToken)
			};
		}
		console.log(opts);
		var self = this;

		var sortDeviceTypes = function(a,b) {
			if (!a || !b) {return 0;}
			if (a.count < b.count) {return 1;}
			if (a.count > b.count) {return -1;}
		};

		$.ajax(opts)
		.done(function(response) {
			console.log(response);
			try {
				response.sort(sortDeviceTypes);
				self.trigger({
					deviceTypes: response
				});
			} catch (e) { console.error(e); }
		})
		.fail(function(response) {
			console.error(response);
		});
	},

	onFetchDataTrafficUsage: function() {
		console.debug("IoTFUsageStore::onFetchDataTrafficUsage");

		var today = new Date();
		var offset = -today.getTimezoneOffset(); // convert to UTC
		today = (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1,0,0+offset,-1));
		var lastMonthStart = (new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0+offset, ));
		var thisMonthStart = (new Date(today.getFullYear(), today.getMonth(), 1, 0, 0+offset, 0));
		var rangeStart = lastMonthStart.toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		// FLM: This API does not show sensible values
		// var lastMonthOpts = {
		// 	url: "/api/v0002/usage/data-traffic?start="+lastMonthStart+"&end="+lastMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ dataTrafficUsageLastMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	lastMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		// var thisMonthOpts = {
		// 	url: "/api/v0002/usage/data-traffic?start="+thisMonthStart+"&end="+thisMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ dataTrafficUsageThisMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	thisMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		//$.ajax(lastMonthOpts);
		//$.ajax(thisMonthOpts);

		var rangeOpts = {
			url: "/api/v0002/usage/data-traffic?start="+rangeStart+"&end="+rangeEnd+"&detail=true",
			contentType: "application/json",
			success: function(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						var days = response.days;
						var sumThisMonth = 0;
						var sumLastMonth = 0;
						var todaysConsumption = 0;
						for (var i in days) {
							var date = new Date(days[i].date);
							var offset = -date.getTimezoneOffset(); // convert to UTC
							date = (new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0+offset,0));

							var day = days[i];
							if (lastMonthStart <= date && thisMonthStart > date) {
								sumLastMonth += day.total;
							} else if (thisMonthStart <= date && today >= date) {
								sumThisMonth += day.total;
							}
							// handle todays entry
							if (i == days.length -1) {
								todaysConsumption = day.total;
							}

							days[i].total = parseFloat((day.total/1048576).toFixed(3));
						}
						// consumption this month
						sumThisMonth = sumThisMonth/1048576;
						sumLastMonth = sumLastMonth/1048576;
						todaysConsumption = todaysConsumption/1048576;
						self.trigger({
							dataTrafficUsageDetails: days,
							dataTrafficUsageThisMonth: sumThisMonth.toFixed(1) + " MB",
							dataTrafficUsageLastMonth: sumLastMonth.toFixed(1) + " MB",
							dataTrafficUsageToday: todaysConsumption.toFixed(1) + " MB"
						});
					}
				} catch (e) { console.error("parse error: " + response); }
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			rangeOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		}

		$.ajax(rangeOpts);
	},

	onFetchActiveDeviceUsage: function() {
		console.debug("IoTFUsageStore::onFetchActiveDeviceUsage");

		var today = new Date();
		var lastMonthStart = (new Date(today.getFullYear(), today.getMonth() - 1, 1)).toISOString().split("T")[0];
		var lastMonthEnd = (new Date(today.getFullYear(), today.getMonth(), 0)).toISOString().split("T")[0];
		var thisMonthStart = (new Date(today.getFullYear(), today.getMonth(), 1)).toISOString().split("T")[0];
		var thisMonthEnd = today.toISOString().split("T")[0];
		var rangeStart = (new Date(today.getFullYear(), today.getMonth() - 1, 1)).toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		var lastMonthOpts = {
			url: "/api/v0002/usage/active-devices?start="+lastMonthStart+"&end="+lastMonthEnd+"&detail=false",
			contentType: "application/json",
			success: function(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						self.trigger({ activeDeviceUsageLastMonth: response.average.toFixed(1) });
					}
				} catch (e) { console.error("parse error: " + response); }
			}
		};
		if (this.auth.apiKey !== null) {

			// if running as localhost
			lastMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		}

		var thisMonthOpts = {
			url: "/api/v0002/usage/active-devices?start="+thisMonthStart+"&end="+thisMonthEnd+"&detail=false",
			contentType: "application/json",
			success: function(response) {
				console.debug(response);
				try {
					if (response.average !== undefined) {
						self.trigger({ activeDeviceUsageThisMonth: response.average.toFixed(1) });
					}
				} catch (e) { console.error("parse error: " + response); }
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			thisMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		}

		var rangeOpts = {
			url: "/api/v0002/usage/active-devices?start="+rangeStart+"&end="+rangeEnd+"&detail=true",
			contentType: "application/json",
			success: function(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						self.trigger({ activeDeviceUsageDetails: response.days });
					}
				} catch (e) { console.error("parse error: " + response); }
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			rangeOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		}

		console.log(lastMonthOpts, thisMonthOpts);

		$.ajax(lastMonthOpts);
		$.ajax(thisMonthOpts);
		$.ajax(rangeOpts);
	},

	onFetchHistoricalDataUsage: function() {
		console.debug("IoTFUsageStore::onFetchActiveDeviceUsage");

		var today = new Date();
		var offset = -today.getTimezoneOffset(); // convert to UTC
		today = (new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1,0,0+offset,-1));
		var lastMonthStart = (new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0+offset, ));
		var thisMonthStart = (new Date(today.getFullYear(), today.getMonth(), 1, 0, 0+offset, 0));
		var rangeStart = lastMonthStart.toISOString().split("T")[0];
		var rangeEnd = today.toISOString().split("T")[0];

		var self = this;

		// var lastMonthOpts = {
		// 	url: "/api/v0002/usage/historical-data?start="+lastMonthStart+"&end="+lastMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ historicalDataUsageLastMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	lastMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		// var thisMonthOpts = {
		// 	url: "/api/v0002/usage/historical-data?start="+thisMonthStart+"&end="+thisMonthEnd+"&detail=false",
		// 	contentType: "application/json",
		// 	success: function(response) {
		// 		console.debug(response);
		// 		try {
		// 			if (response.average !== undefined) {
		// 				var bytes = response.average;
		// 				self.trigger({ historicalDataUsageThisMonth: (bytes / 1000000).toFixed(1) + " MB" });
		// 			}
		// 		} catch (e) { console.error("parse error: " + response); }
		// 	}
		// };
		// if (this.auth.apiKey !== null) {
		// 	// if running as localhost
		// 	thisMonthOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		// }

		// $.ajax(lastMonthOpts);
		// $.ajax(thisMonthOpts);

		var rangeOpts = {
			url: "/api/v0002/usage/historical-data?start="+rangeStart+"&end="+rangeEnd+"&detail=true",
			contentType: "application/json",
			success: function(response) {
				console.debug(response);
				try {
					if (response.days !== undefined) {
						var days = response.days;
						var valueThisMonth = 0;
						var valueLastMonth = 0;
						var todaysConsumption = 0;
						var lastValue = 0;
						for (var i in days) {
							var date = new Date(days[i].date);
							var offset = -date.getTimezoneOffset(); // convert to UTC
							date = (new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0+offset,0));

							var day = days[i];
							if (lastMonthStart <= date && thisMonthStart > date) {
								if (day.total > valueLastMonth) {
									valueLastMonth = day.total;
								}
							} else if (thisMonthStart <= date && today >= date) {
								if (day.total > valueThisMonth) {
									valueThisMonth = day.total;
								}
							}
							// handle todays entry
							if (i == days.length -1) {
								todaysConsumption = day.total - lastValue;
								if (todaysConsumption < 0) {
									todaysConsumption = 0;
								}
								if (date.getDate() == 1) {
									todaysConsumption = day.total;
								}
							}
							lastValue = day.total;
							days[i].total = parseFloat((day.total/1024).toFixed(3));
						}
						// consumption this month
						valueThisMonth = valueThisMonth/1024;
						valueLastMonth = valueLastMonth/1024;
						todaysConsumption = todaysConsumption/1024;

						self.trigger({
							historicalDataUsageDetails: days,
							historicalDataUsageThisMonth: valueThisMonth.toFixed(1) + " MB",
							historicalDataUsageLastMonth: valueLastMonth.toFixed(1) + " MB",
							dataUsageToday: todaysConsumption.toFixed(1) + " MB"
						});
					}
				} catch (e) { console.error("parse error: " + response); }
			}
		};
		if (this.auth.apiKey !== null) {
			// if running as localhost
			rangeOpts.url += "&org="+this.auth.org+"&apiKey="+this.auth.apiKey+"&apiToken="+this.auth.apiToken;
		}

		$.ajax(rangeOpts);
	}
});

module.exports = IoTFUsageStore;
