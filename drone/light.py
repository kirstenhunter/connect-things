# Reading an analogue sensor with
# a single GPIO pin

# Author : Matt Hawkins
# Distribution : Raspbian
# Python : 2.7
# GPIO   : RPi.GPIO v3.1.0a

import RPi.GPIO as GPIO, time

# Tell the GPIO library to use
# Broadcom GPIO references
GPIO.setmode(GPIO.BCM)

# Define function to measure charge time
def RCtime (PiPin):
  measurement = 0
  # Discharge capacitor
  GPIO.setup(PiPin, GPIO.OUT)
  GPIO.output(PiPin, GPIO.LOW)
  time.sleep(0.1)

  GPIO.setup(PiPin, GPIO.IN)
  # Count loops until voltage across
  # capacitor reads high on GPIO
  while (GPIO.input(PiPin) == GPIO.LOW):
    measurement += 1

  return measurement

# Main program loop
while (True):
	f = open('lightstat','w')
	lightstat = RCtime(4)
	if lightstat == 0:
		continue
	if lightstat < 200:
		print lightstat
		f.write("True")
	else:
		print lightstat
		f.write("False")
	f.close()
	time.sleep(1)