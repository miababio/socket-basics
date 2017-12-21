var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); // Format socket.io expects
var moment = require("moment");

app.use(express.static(__dirname + "/public"));

var clientInfo = {};

// Sends current users to provided socket
function sendCurrentUsers(socket) {
    // Get the ID of the room from socket
    // Once you have that, look through clientInfo and see who else has same ID
    // If they match, get username from it and add it to string
    var info = clientInfo[socket.id];
    var users = [];

    if(typeof info === 'undefined') {
        return; // stops us from searching for rooms that dont exist
    }

    Object.keys(clientInfo).forEach(function(socketId) {
        var userInfo = clientInfo[socketId]; 
        if(info.room === userInfo.room)
            users.push(userInfo.name);
    });

    socket.emit("message", {
       name: "System",
       text: "Current Users: " + users.join(", "),
       timestamp: moment().valueOf() 
    });
}

io.on("connection", function(socket) { // on -> lets you listen for events (name of event, function)
    console.log("User connected via socket.io!"); // prints when we get a connection
    
    socket.on("disconnect", function() {
        var userData = clientInfo[socket.id];
        // First check if user is part of a chat room
        if(typeof userData !== "undefined")
        {
            socket.leave(userData.room); // Disconnects user from chat room
            io.to(userData.room).emit("message", {
                name: "System",
                text: userData.name + " has left!", // Tell everyone user left
                timestamp: moment().valueOf()
            });
            // Delete data from clientInfo
            delete clientInfo[socket.id]; // delete -> removes a property from an object
        }
    });
    
    socket.on("joinRoom", function(req) { // req -> contains name, room object we made in app.js
        clientInfo[socket.id] = req;
        socket.join(req.room); // join = built-in Socket method that tells the incoming socket to join a specific room
        // broadcast.to(<rm_name>) -> send something to everyone in a specified room
        socket.broadcast.to(req.room).emit("message", { 
            name: "System",
            text: req.name + " has joined!",
            timestamp: moment().valueOf()
        });
    });
    
    socket.on("message", function(message) { // Listens for a message event
        console.log("Message received: " + message.text);

        if(message.text === "@currentUsers") 
        {
            sendCurrentUsers(socket);
        }
        else 
        {
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit("message", message); // Sends message to every other browser connected including us that are in the same room as us
        }

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