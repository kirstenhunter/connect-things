var Cylon = require('cylon');
var request = require('request');
var huehost = 'http://10.1.88.132';
var huestate = huehost + '/api/newdeveloper/lights/1/state';

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-YRY-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
     console.log("Setting up Collision Detection...");
     my.sphero.detectCollisions();
     var color = 0x00FF00,
        bitFilter = 0xFFFF00;   
     every((3).second(), function() {
      		color = color ^ bitFilter;
      		my.sphero.setRGB(color);
      
      		my.sphero.roll(100, Math.floor(Math.random() * 360));
      
      		my.sphero.on('collision', function(data) {
      			console.log("Collision");
      			request.put(
    				huestate,
    				{ json: { "on": true } },
    					function (error, response, body) {
        					if (!error && response.statusCode == 200) {
            					console.log(body)
        					}
    				}
				);
	      	});
    });
  }
}).start();
