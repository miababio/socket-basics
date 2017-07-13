var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); // Format socket.io expects

app.use(express.static(__dirname + "/public"));

io.on("connection", function() { // on -> lets you listen for events (name of event, function)
    console.log("User connected via socket.io!"); // prints when we get a connection
}); 

http.listen(PORT, function() {
   console.log("Server started!"); 
});