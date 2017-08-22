var socket = io();

socket.on("connect", function() {
   console.log("Connected to socket.io server!"); 
});

socket.on("message", function(message) {
    console.log("New message:");
    console.log(message.text);
    
    jQuery(".messages").append("<p>" + message.text + "</p>");
});

// Handles submitting a new message
var $form = jQuery("#message-form");

$form.on("submit", function(event) { 
    event.preventDefault(); 
    var $message = $("input[name=message]"); 
    socket.emit("message", {
       text: $message.val() 
    });
    $message.val(""); 
});