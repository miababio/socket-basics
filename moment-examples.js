var moment = require("moment");
var now = moment(); 

/*console.log(now.format()); // Default timestamp
console.log(now.format('X')); // Display seconds since that moment (unix timestamp)
console.log(now.valueOf()); // Milliseconds since Jan 1, 1970*/

var timestamp = 1506831425613;
var timestampMoment = moment.utc(timestamp); // Accessing Moment's UTC property
console.log(timestampMoment.local().format("h:mm a")); // 11:06 am

//now.subtract(1, "year");
//console.log(now.format());

//console.log(now.format("h:mma")); // 6:45 pm

// Print Sep 28 2017, 1:11 am
//console.log(now.format("MMM Do YYYY, h:mm a"));