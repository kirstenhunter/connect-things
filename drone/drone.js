var fs = require('fs');
var arDrone = require('ar-drone');
var client = arDrone.createClient();


function flyDrone() {
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
}

fs.watchFile("lightstat", {persistent: false, interval:1000}, function () {
	var lightvalue = fs.readFileSync('lightstat');
	if (lightvalue == "True")
	{
		fs.unwatchFile("lightstat");
		console.log ("Watch me go!!!");
		flyDrone();
	}
});
