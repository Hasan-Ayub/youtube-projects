#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10);   // CE, CSN

void setup() {
  Serial.begin(115200);

  while (!Serial);

  Serial.println("Checking NRF24L01...");

  if (!radio.begin()) {
    Serial.println("❌ NRF24L01 NOT detected!");
    while (1);
  }

  Serial.println("✅ NRF24L01 detected!");

  radio.setPALevel(RF24_PA_LOW);
  radio.setDataRate(RF24_1MBPS);
  radio.setChannel(76);

  Serial.println("\n===== Radio Details =====");
  radio.printDetails();
}

void loop() {
}