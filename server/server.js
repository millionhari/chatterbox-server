var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var fsUtils = require('fs-utils');


var messages = require('./messages.json');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client'))

app.get('/messages', function(req, res){
  res.set('Content-Type', 'application/json');
  res.send(messages);
});

app.listen(5000);

app.post('/messages', function(req, res){
  var date = new Date;
  req.body.createdAt = date.toISOString();
  req.body.updatedAt = date.toISOString();
  req.body.objectId = Date.parse(date);
  messages.results.push(req.body);
  fsUtils.writeJSON('./messages.json', messages);
  res.send(req.body);
});

// var data = require('./messages.js');

// var responseFunc = {
//   POST: function(request, response, headers){
//     request.on('data', function(a){
//       a = JSON.parse(a);
//       var date = new Date;
//       a.createdAt = date.toISOString();
//       a.updatedAt = date.toISOString();
//       a.objectId = Date.parse(date);
//       data.results.push(a);
//     });
//     response.writeHead(201, headers);
//   },
//   OPTIONS: function(request, response, headers){
//     response.writeHead(200, headers);
//   },
//   GET: function(request, response, headers){
//     if (request.url.slice(0, 17) === "/classes/messages" || request.url.slice(0, 17) === "/classes/room1"){
//       response.writeHead(200, headers);
//     }else{
//       response.writeHead(404, headers);
//     }
//   }
// }

// var requestHandler = function(request, response) {
//   // console.log("Serving request type " + request.method + " for url " + request.url);
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = "application/json";
//   responseFunc[request.method](request, response, headers);
//   response.end(JSON.stringify(data))
// };

// var defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };

// module.exports = requestHandler;

