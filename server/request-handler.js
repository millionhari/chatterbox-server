var data = require('./messages.js');

var responseFunc = {
  POST: function(request, response, headers){
    request.on('data', function(a){
      a = JSON.parse(a);
      var date = new Date;
      a.createdAt = date.toISOString();
      a.updatedAt = date.toISOString();
      a.objectId = Date.parse(date);
      data.results.push(a);
    });
    response.writeHead(201, headers);
  },
  OPTIONS: function(request, response, headers){
    response.writeHead(200, headers);
  },
  GET: function(request, response, headers){
    if (request.url.slice(0, 17) === "/classes/messages" || request.url.slice(0, 17) === "/classes/room1"){
      response.writeHead(200, headers);
    }else{
      response.writeHead(404, headers);
    }
  }
}

var requestHandler = function(request, response) {
  // console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  responseFunc[request.method](request, response, headers);
  response.end(JSON.stringify(data))
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;

