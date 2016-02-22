/*eslint-env node*/
var express = require('express');
var https = require('https')
var app = express();

var Config = require('./config');

// serve the files out of ./public as our main files
app.use(express.static(Config.buildPath)); // __dirname + '/iotcloud.ui.dashboard/build/'));

// start server on the specified port and binding host
var port = 8000;
app.listen(port, function() {
  console.log("server starting on localhost:" + port);
  console.log("server using directory: " + Config.buildPath);
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

app.all('/api/v000*', function(req, res) {

	// Capture requests for organizations and send back our hard-coded config
	var path = req.originalUrl;
	if (req.originalUrl === '/api/v0001/auth/organizations') {
		path = '/api/v0001';
	}
	if (req.originalUrl === '/api/v0001/auth/') {
		res.send(Config.auth);
		return;
	}

	// Proxy the API request to the test stand
	try {
	var options = {
		host: Config.org + Config.env + ".internetofthings.ibmcloud.com",
		path: path,
		port: 443,
		method: req.method,
		withCredentials: true,
		rejectUnauthorized: false,
		headers: {
				"content-type" : "application/json",
				"Cookie": Config.auth.cookie
		}
		//"auth": Config.apiKey+':'+Config.apiToken
	};

	console.log(options);

	var iot_req = https.request(options, function(iot_res) {
		var str = '';
		iot_res.on('data', function(chunk) {
			console.log(chunk);
			str += chunk;
		});
		iot_res.on('end', function() {
			if (req.originalUrl === '/api/v0001/auth/organizations' || str === "") {
				str = "[" + str + "]";
			}
			console.log("----------\n" + str + "\n----------");
			try {
				res.send(JSON.parse(str));
			} catch (e) {
				res.send(str);
			}
		});
	}).on('error', function(e) {
		console.log(e);
		res.send(e);
	});
	iot_req.end();
	} catch (err) { console.log(err); }
});
