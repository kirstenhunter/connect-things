var fs = require('fs');
var arDrone = require('ar-drone');


var client = arDrone.createClient();
console.log("Flying drone?");
client.takeoff();

client
  .after(3000, function() {
    this.up(0.25);
  })

  .after(3000, function() {
    this.animate('flipRight', 15);
  })

  .after(1000, function() {
    this.stop();
    this.land();
  });

