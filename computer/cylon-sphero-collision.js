var Cylon = require('cylon');

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
      			console.log("Collision:");
	      	});
    });
  }
}).start();
