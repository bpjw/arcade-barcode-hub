# Arcade Barcode Hub

This project provides a solution for emulating a HID (Human Interface Device) barcode scanner using an ESP32 microcontroller. The primary goal is to enhance the gameplay experience in Flycast for games that utilize barcode functionality, offering a more seamless and fluent interaction.

## Features

- **ESP32 as a Barcode Scanner:** The ESP32 is programmed to act as a HID device, sending barcode data to a connected computer as if it were a physical scanner.
- **Web-Based Interface:** A user-friendly web application allows you to send barcodes to the ESP32, which then forwards them to the host system.
- **Flycast Integration:** By emulating a barcode scanner, this project enables a more authentic and responsive experience when playing arcade games on Flycast that rely on barcode inputs.
- **Customizable Barcode Data:** The web interface allows you to input and send any desired barcode, providing flexibility for various in-game scenarios.

## Hardware

The core of this project is the **ESP32**, a versatile and low-cost microcontroller with built-in Wi-Fi and Bluetooth capabilities. The ESP32 is responsible for:

- **Receiving Barcode Data:** It connects to the web application to receive barcode information.
- **Emulating a HID Device:** It presents itself to the host computer as a standard USB keyboard, ensuring broad compatibility without the need for custom drivers.
- **Sending Keystrokes:** When a barcode is received, the ESP32 translates it into a series of keystrokes, mimicking the output of a real barcode scanner.

## Software

The project consists of two main software components:

### 1. ESP32 Firmware (`hid-barcode-reader-emulator.ino`)

The Arduino sketch running on the ESP32 handles the device's core logic. It uses libraries to manage web connectivity and HID emulation, ensuring that the device behaves as expected.

### 2. Web Application

The web application provides a simple interface for sending barcodes to the ESP32. It is built with modern web technologies and includes the following key files:

- **`index.html`**: The main entry point for the web application.
- **`app.js`**: Contains the application's logic, including communication with the ESP32.
- **`style.css`**: Defines the visual styling of the web interface.

## Usage

To get started with the Arcade Barcode Hub, follow these steps:

1. **Set Up the ESP32:**
   - Flash the `hid-barcode-reader-emulator.ino` sketch to your ESP32 using the Arduino IDE.
   - Ensure the necessary libraries for web connectivity and HID emulation are installed.

2. **Deploy the Web Application:**
   - Host the web application on a server or run it locally.
   - The application can be configured to communicate with your ESP32's IP address.

3. **Connect to Flycast:**
   - Connect the ESP32 to the computer running Flycast via USB.
   - The computer will recognize the ESP32 as a keyboard.

4. **Start Scanning:**
   - Open the web interface and enter the barcode you wish to send.
   - The ESP32 will receive the barcode and type it out, which Flycast will interpret as input from a barcode scanner.

## Flycast Integration

Arcade games, especially those emulated in Flycast, use barcode scanners for gameplay mechanics. This project replaces the need for a physical scanner with a more convenient and adaptable solution. By sending barcodes through the web interface, you can enjoy a smoother and more immersive gaming experience.

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

## Planned Features

- UI Improvements
- Create user-specific collections to quickly access favorite setups
- Filtering options
- User feedback in case of errors

## Out of Scope

- **Adding or replacing images or metadata:** Since the game was never released in my country, it is difficult to maintain the appropriate information. This can be taken over by someone else. For me, it was important to provide an easy way to access the barcodes.
- **iOS App:** Since I do not have an iOS device, this cannot be supported.
- **Official Releases:** Currently, no official releases are planned in the app stores. Therefore, it will remain with Android for now.

## License

This project is licensed under the [MIT License](LICENSE).
