/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var request = require('request');
var https = require('https');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.all('/api/v000[1-2]/*', function(req, res) {
	try {
		var org = req.query.org;
		var apiKey = req.query.apiKey;
		var apiToken = req.query.apiToken;

		var url = req.originalUrl;
		// remove credentials from URL
		var index = url.indexOf("&org=");
		if (index == -1) {
			index = url.indexOf("?org=");
		}
		if (index > -1) {
			url = url.substring(0,index);
		}

		var options = {
			host: org + ".internetofthings.ibmcloud.com",
			path: url,
			port: 443,
			method: req.method,
			headers: {
					"content-type" : "application/json"
					//"Cookie": "LtpaToken2=AamPMx9ixqhHNLorVeSaiN1QgcqhjT4bD+Q9mZhcPa5na/78kAxssrUW/NzgGAEWYHYQw3QbJ7+R0OA5cE34/sWpPQvKJHVbBK8IeslsjBKbRadDseyLsskpe29Dpez1epWeV67NTykfJvy28FeBqSI2thVnVOKE9lDUoXPh2GOqT5irQG6oxzoW1T/qE4EgOzCbZxsLsRQXeZdr0DhDLjCr7rQeQLKnlE3Ja9XdD0OBbioVmPbUmpg1+Mhw54QCjBlAEeP0ep88mJCe2L9PKNFsJHUw/dQFo51Lwlio/RZysGflvP1goq9jHvKSE8D58Hxdy2E5Ov5R581U9dYvqS3lNVzzSrrnNj4fjeCGrUc="
			},
			auth: apiKey+':'+apiToken
		};
		console.log(org, apiKey, apiToken);
	} catch (e) {
		res.send(e);
	}

	console.log(options);

	var iot_req = https.request(options, function(iot_res) {
		var str = '';
		iot_res.on('data', function(chunk) {
			str += chunk;
		});
		iot_res.on('end', function() {
			res.send(JSON.parse(str));
		});
	}).on('error', function(e) {
		res.send(e);
	});
	//iot_req.write(JSON.stringify(deviceDetails));
	iot_req.end();
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
//appEnv.port = 3000;

// start server on the specified port and binding host
app.listen(appEnv.port || 3000, function() {

	// print a message when the server starts listening
  console.log("server starting on port " + appEnv.port);
});
