connect-things
==============

Connect all the things code from demo at defrag

In order to get all this to work, you need to have the following:
* Sphero
* Raspberry Pi
* Wifi shield for the Raspberry pi - I used the Edimax one, most should work
* Philips Hue light and bridge (at least one)
* Drone (Parrot AR 2.0 is what I have)

To get everything up and running, follow these steps:
* Setup an SD card with raspbian and install npm/node (there are lots of instructions for this on the google)
* Install node on your computer
* Find your raspberry pi on the network
** If you are using a mac, you can share your network connection out to ethernet, connect the pi, run arp -a to find all devices, then look for something tagged [bridge] rather than [ethernet]
* Install RPi.GPIO python module
* Turn on your drone and find the SSID (use your main computer)
* Set up your /etc/network/interfaces to find the wifi network (see below)
* Connect all your devices using an ethernet port that can see the internet (your hue needs this)
* Get your philips hue setup using the web
* Verify that your hue lightbulb is responding to the web commands (on/off)
* Update cylon-sphero-* with your local information:
** Connect the sphero to your computer using bluetooth, and find its address by ls /dev/tty.Sphero*
** Find your hue's bridge address using www.meethue.com/api/nupnp (only needs updating in cylon-sphero-hue)
* Set up your RPi as indicated here: http://www.raspberrypi-spy.co.uk/2012/08/reading-analogue-sensors-with-one-gpio-pin/
* Test the drone using testdrone.js on your pi
* Test the sphero with node cylon-sphero-random.js - you may need to pull in some libraries, just grab the ones it wants with npm
* Test the sphero/hue interface with cylon-sphero-hue (you may have to abuse your sphero a bit before it will notice a collision)
* Test the light detector by running the python script light.py on the raspberry pi.  Turn the light on and off using the web and see if it responds correctly (numbers should be <200 if the light is on, >200 if not).

Once everything is tested and set up:
* Start light.py on the pi
* In another window, start drone.js on the pi
* On your computer start cylon-sphero-hue.js
* Sit back and pray :-)

/etc/network/interfaces on the pi
auto lo

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0
auto wlan0

#iface wlan0 inet dhcp
#    wpa-ssid "Synedra_2.4"
#    wpa-psk "Dr.Pepper"

iface wlan0 inet dhcp
     wireless-essid ardrone2_048714
