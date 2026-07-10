#include <SPI.h>
#include <nRF24L01.h>
int speed;
const byte address[6] = "00001";
RF24 radio(9, 10);

void setup(){
  radio.begin();
  radio.openreadingpipe(1, address);
  radio.startlistening();
}
void loop(){
  radio.available(){
    radio.read(&speed, sizeof(speed));
    serial.println("throttle is =  ", speed)
  }
  
}