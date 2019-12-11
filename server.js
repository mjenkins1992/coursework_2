var http = require('http');
var requests=0;
var podname= process.env.HOSTNAME;
var startTime;
var host;

var handleRequest = function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("Hello devops world! | I have been deployed to kubernetes by a jenkins pipleline | Running on: ");
  response.write(host);
  response.write(" | v=3 :D\n");
  response.end("Running On:" ,host, "| Total Requests:", ++requests,"| App Uptime:", (new Date() - startTime)/1000 , "seconds", "| Log Time:",new Date());
}

var www = http.createServer(handleRequest);

www.listen(8080,function () {
    startTime = new Date();;
    host = process.env.HOSTNAME;
    console.log ("Hello updated devops World Started At:",startTime, "| Running On: " ,host, "\n" );
});
