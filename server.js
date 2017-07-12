var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
// Tells Node to start a new server and use the Express app as a boilerplate
// Anything the Express app listens to, the server should listen as well
var http = require("http").Server(app);

app.use(express.static(__dirname + "/public"));

http.listen(PORT, function() {
   console.log("Server started!"); 
});