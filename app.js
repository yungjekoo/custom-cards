/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Frank Leo Mielke - Initial Contribution
*****************************************************************************/
var express = require('express');
var fs = require('fs');
var cfenv = require('cfenv');
var https = require('https');
var bodyParser = require('body-parser')

// create a new express server
var app = express();

// allow CORS
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
app.use(bodyParser());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var port = appEnv.port || 3000;
// start server on the specified port and binding host

// Note: IoT Platform accepts only secure connections for card servers.
// Create a self-signed certificate during development and specify the files here.
var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};
https.createServer(options,app).listen(port, function() {
    // print a message when the server starts listening
  console.log("server starting on port " + port);
});
