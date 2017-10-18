var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); // Format socket.io expects
var moment = require("moment");

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket) { // on -> lets you listen for events (name of event, function)
    console.log("User connected via socket.io!"); // prints when we get a connection
    
    socket.on("message", function(message) { // Listens for a message event
        console.log("Message received: " + message.text);
        message.timestamp = moment().valueOf();
        io.emit("message", message); // Sends message to every other browser connected including us
    });
    
    socket.emit("message", { // Emits an event; (event_name, data to send)
        name: "System",
        text: "Welcome to the chat application!",
        timestamp: moment().valueOf()
    });
}); 

http.listen(PORT, function() {
   console.log("Server started!"); 
});