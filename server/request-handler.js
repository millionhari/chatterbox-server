var data = require('./messages.js');
var responseFunc = {
  POST: function(request){
    request.on('data', function(a){
      a = JSON.parse(a);
      var date = new Date;
      a.createdAt = date.toISOString();
      a.updatedAt = date.toISOString();
      a.objectId = Date.parse(date);
      console.log(a)
      data.results.push(a);
    });
  },
  OPTIONS: function(){},
  GET: function(request){}
}


var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);
  responseFunc[request.method](request, response);
  response.end(JSON.stringify(data))
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;

