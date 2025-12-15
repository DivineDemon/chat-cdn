# chat-cdn

A Vanilla Chat CDN powered by n8n. This project provides a straightforward way to integrate chat functionality into your web applications using a Content Delivery Network (CDN) approach.


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://www.javascript.com/)


## Features
- **Vanilla JavaScript:** No heavy frameworks required, ensuring a small footprint.
- **CDN Ready:** Easily integrate into any web project by including a script tag.
- **n8n Integration:** Leverages n8n workflows for backend logic and data management.
- **Customizable:** Designed for flexibility to adapt to various chat needs.


## Tech Stack
- **JavaScript:** The primary language for frontend logic.
- **n8n:** For backend automation, data handling, and webhook management.


## Installation

To use `chat-cdn`, you simply need to include the `script.js` file in your HTML.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Chat App</title>
    <!-- Include the chat-cdn script -->
    <script src="path/to/your/cdn/script.js"></script>
</head>
<body>
    <!-- Your website content -->
</body>
</html>
```

**Note:** Replace `"path/to/your/cdn/script.js"` with the actual URL where `script.js` is hosted.


## Usage

The `script.js` file will likely expose global functions or objects that you can use to initialize and manage the chat. Detailed usage will depend on how the script is designed to interact with your webpage.

**Example (Hypothetical):**

```javascript
// Assuming chatCDN has an initialization function
if (window.chatCDN && typeof window.chatCDN.init === 'function') {
    window.chatCDN.init({
        apiKey: 'YOUR_API_KEY',
        userId: 'user123',
        // other configuration options
    });
} else {
    console.error('chatCDN is not loaded or initialized properly.');
}
```


## Configuration

Configuration options will be passed to the initialization function of `chat-cdn`. These might include API keys, user identifiers, or specific UI settings. Refer to the `script.js` file for specific configuration parameters.


## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](#contributing.md) file for details on our code of conduct, and the process for submitting pull requests.


## License

This project is licensed under the MIT License - see the [LICENSE](#license) file for details.
