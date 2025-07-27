

#include "USB.h"
#include "USBHIDKeyboard.h"
#include <Adafruit_NeoPixel.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>


#define LED_PIN 21     // GP21 laut Datenblatt
#define NUM_PIXELS 1   // 1 LED auf dem Board
#define BRIGHTNESS 50  // Helligkeit (0–255)


const char* ssid = "xxxxxx";
const char* password = "xxxxx";

Adafruit_NeoPixel pixels(NUM_PIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);
USBHIDKeyboard Keyboard;

WebServer server(80);

void setup() {
  Serial.begin(115200);
  setupNeoPixel();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Warte auf WLAN-Verbindung...");
  }
  setLed(255, 0, 255, 1000);

  if (!MDNS.begin("flycast-codes-api")) {
    Serial.println("Error setting up mDNS.");
  }
  setLed(255, 144, 255, 1000);


  MDNS.addService("http", "tcp", 80);
  USB.begin();
  setupUSBDescriptors();
  Keyboard.begin();


  server.on("/api/barcode", HTTP_POST, handleBarcode);
  server.on("/", HTTP_GET, handleRoot);
  Serial.println("Webserver started!");

  server.begin();
  clearLed();
}
void handleRoot() {
  server.send(200, "text/plain", "Server is running");
}
void setupUSBDescriptors() {
  USB.productName("SEGA Barcode Scanner");
  USB.manufacturerName("GHOST");
  USB.serialNumber("12345678");
}

void setupNeoPixel() {
  pixels.begin();
  pixels.setBrightness(BRIGHTNESS);


  clearLed();

  setLed(255, 0, 0, 100);

  setLed(0, 255, 0, 1000);

  setLed(0, 0, 255, 1000);


  clearLed();
}
void handleBarcode() {
  if (!server.hasArg("barcode")) {
    server.send(400, "application/json", "{\"error\":\"Barcode missing\"}");
    return;
  }

  String barcode = server.arg("barcode");

  if (barcode.charAt(0) == '*' || barcode.charAt(barcode.length() - 1) == '*') {
    server.send(400, "application/json", "{\"error\":\"Barcode must not start and end with '*'\"}");
    setLed(0, 0, 255, 1000);
    return;
  }
  barcode = "*" + barcode + "*";
  Serial.println("Barcode is: "+ barcode);
  Keyboard.print(barcode);

  setLed(0,255,0,1000);
  clearLed();

  server.send(200, "application/json", "{\"message\":\"Barcode sent successfully\"}");
}

void setLed(int red, int green, int blue, int delay_ms) {
  pixels.setPixelColor(0, pixels.Color(red, green, blue));
  pixels.show();
  delay(delay_ms);
}

void clearLed() {
  pixels.clear();
  pixels.show();
}

void loop() {
  server.handleClient();
}
