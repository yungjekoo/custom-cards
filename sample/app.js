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
Nikhil C - Custom Cards
*****************************************************************************/

var express = require('express');
var fs = require('fs');
var cfenv = require('cfenv');
var https = require('https');
var bodyParser = require('body-parser');
var Cloudant = require('cloudant');
// var Client = require("ibmiotf");
//require('dotenv').load();
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

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

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


var IBMIoTF = require('ibmiotf');


var appClient;

//support for multiple orgs
var appEnv = cfenv.getAppEnv();
var port = appEnv.port || 3000;
var wiot_services  = appEnv.services['iotf-service'];
var wiotp_creds = {};


  if (wiot_services) {
    // TODO: remove this when we need to support multiple orgs
    var serviceCreds = wiot_services[0];

    wiotp_creds = {
      org: serviceCreds.credentials.org,
      id: Date.now().toString(),
      "auth-key": serviceCreds.credentials.apiKey,
      "auth-token": serviceCreds.credentials.apiToken
      };
      appClient = new IBMIoTF.IotfApplication(wiotp_creds);

  }else {
    console.log("no iot Platform found in binding");
  }

// appClient = new IBMIoTF.IotfApplication(wiotp_creds);
appClient.connect();

appClient.on("connect", function () {
    console.log("connected");


});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {

    console.log('received: %s', message);
    var obj=JSON.parse(message);

    var property = "";
    appClient.subscribeToDeviceEvents(obj.deviceType,obj.deviceId,obj.deviceEvent);
    property=obj.payload;
    appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
        try {
        console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
        payload = JSON.parse(payload);
        console.log("sending :"+payload.d[property]);

        ws.send(payload.d[property]);
        } catch (e) {
          console.log("sending payload Failed");
        }

    });
  });


});


server.listen(port);
