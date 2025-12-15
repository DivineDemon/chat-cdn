// Chat Bot CDN Widget
// Configuration - Update this with your n8n webhook URL

// CORS CONFIGURATION REQUIRED:
// To avoid CORS errors, configure your n8n webhook to send CORS headers.
// In your n8n workflow, add a "Set" node after the webhook trigger:
// 1. Add response headers:
//    - Access-Control-Allow-Origin: * (or specific domain)
//    - Access-Control-Allow-Methods: POST, OPTIONS
//    - Access-Control-Allow-Headers: Content-Type
// 2. For OPTIONS requests (preflight), return early with 200 status

const WEBHOOK_URL = "https://n8n.scintia.ai/webhook/1306a6cb-608a-471a-a84b-f07f981c67da";

// Create and inject Google Fonts for handwritten aesthetic
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Create chat widget container
const chatWidget = document.createElement('div');
chatWidget.id = 'chat-widget';
document.body.appendChild(chatWidget);

// Chat toggle button (floating button to open chat)
const chatToggleButton = document.createElement('button');
chatToggleButton.id = 'chat-toggle-btn';
chatToggleButton.innerHTML = '💬';
chatToggleButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1e3a8a;
  border: 2px solid #ffffff;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
chatWidget.appendChild(chatToggleButton);

// Chat window container
const chatWindow = document.createElement('div');
chatWindow.id = 'chat-window';
chatWindow.style.cssText = `
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 400px;
  height: 600px;
  background-color: #000000;
  border: 2px solid #ffffff;
  border-radius: 12px;
  display: none;
  flex-direction: column;
  font-family: 'Kalam', cursive;
  z-index: 10001;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;
chatWidget.appendChild(chatWindow);

// Header bar
const chatHeader = document.createElement('div');
chatHeader.id = 'chat-header';
chatHeader.textContent = 'Chat with Bot';
chatHeader.style.cssText = `
  background-color: #1e3a8a;
  border-bottom: 2px solid #ffffff;
  color: #87ceeb;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  flex-shrink: 0;
`;
chatWindow.appendChild(chatHeader);

// Close button (X button - positioned relative to chat window, but not overlapping input)
const closeButton = document.createElement('button');
closeButton.id = 'chat-close-btn';
closeButton.innerHTML = '✕';
closeButton.style.cssText = `
  position: absolute;
  top: 13px;
  right: 15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #1e3a8a;
  border: 2px solid #ffffff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10002;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: bold;
`;
chatWindow.appendChild(closeButton);

// Message container (scrollable area)
const messageContainer = document.createElement('div');
messageContainer.id = 'chat-messages';
messageContainer.style.cssText = `
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #000000;
`;

// Custom scrollbar styling
const style = document.createElement('style');
style.textContent = `
  #chat-messages::-webkit-scrollbar {
    width: 8px;
  }
  #chat-messages::-webkit-scrollbar-track {
    background: #000000;
  }
  #chat-messages::-webkit-scrollbar-thumb {
    background: #1e3a8a;
    border-radius: 4px;
    border: 1px solid #ffffff;
  }
  #chat-messages::-webkit-scrollbar-thumb:hover {
    background: #3b82f6;
  }
`;
document.head.appendChild(style);

chatWindow.appendChild(messageContainer);

// Input form container
const inputForm = document.createElement('form');
inputForm.id = 'chat-input-form';
inputForm.style.cssText = `
  display: flex;
  gap: 10px;
  padding: 15px;
  background-color: #000000;
  border-top: 2px solid #ffffff;
  flex-shrink: 0;
`;
chatWindow.appendChild(inputForm);

// Input field
const messageInput = document.createElement('input');
messageInput.type = 'text';
messageInput.id = 'chat-message-input';
messageInput.placeholder = 'Type your message...';
messageInput.style.cssText = `
  flex: 1;
  padding: 12px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  font-family: 'Kalam', cursive;
  font-size: 14px;
  outline: none;
`;
inputForm.appendChild(messageInput);

// Send button
const sendButton = document.createElement('button');
sendButton.type = 'submit';
sendButton.id = 'chat-send-btn';
sendButton.innerHTML = '↑';
sendButton.style.cssText = `
  width: 45px;
  height: 45px;
  background-color: #1e3a8a;
  border: 2px solid #ffffff;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
inputForm.appendChild(sendButton);

// Function to create message bubble
function createMessageBubble(text, isUser) {
  const messageBubble = document.createElement('div');
  messageBubble.className = isUser ? 'message-user' : 'message-bot';
  messageBubble.style.cssText = `
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 2px solid #ffffff;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 1.4;
    align-self: ${isUser ? 'flex-end' : 'flex-start'};
    ${isUser 
      ? 'background-color: #1e3a8a; color: #ffffff;' 
      : 'background-color: rgba(255, 255, 255, 0.1); color: #ffffff;'
    }
  `;
  messageBubble.textContent = text;
  return messageBubble;
}

// Function to add message to chat
function addMessage(text, isUser) {
  const messageBubble = createMessageBubble(text, isUser);
  messageContainer.appendChild(messageBubble);
  // Auto-scroll to bottom
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Function to show loading indicator
function showLoadingIndicator() {
  const loadingBubble = document.createElement('div');
  loadingBubble.id = 'loading-indicator';
  loadingBubble.className = 'message-bot';
  loadingBubble.style.cssText = `
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 2px solid #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 14px;
    align-self: flex-start;
  `;
  loadingBubble.textContent = '...';
  messageContainer.appendChild(loadingBubble);
  messageContainer.scrollTop = messageContainer.scrollHeight;
  
  // Animate dots
  let dotCount = 0;
  const dotInterval = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    loadingBubble.textContent = '.'.repeat(dotCount);
  }, 500);
  loadingBubble.dataset.intervalId = dotInterval;
  
  return loadingBubble;
}

// Function to remove loading indicator
function removeLoadingIndicator() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    if (loadingIndicator.dataset.intervalId) {
      clearInterval(parseInt(loadingIndicator.dataset.intervalId));
    }
    loadingIndicator.remove();
  }
}

// Function to send message to n8n webhook
async function sendMessageToBot(userMessage) {
  try {
    const loadingIndicator = showLoadingIndicator();
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    removeLoadingIndicator();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle different response formats from n8n
    // Common formats: { response: "text" }, { message: "text" }, or just a string
    let botResponse = '';
    if (typeof data === 'string') {
      botResponse = data;
    } else if (data.response) {
      botResponse = data.response;
    } else if (data.message) {
      botResponse = data.message;
    } else if (data.text) {
      botResponse = data.text;
    } else {
      botResponse = JSON.stringify(data);
    }

    addMessage(botResponse, false);
  } catch (error) {
    removeLoadingIndicator();
    console.error('Error sending message to bot:', error);
    
    // Check if it's a CORS error
    let errorMessage = 'Sorry, I encountered an error. Please try again.';
    if (error.message && error.message.includes('CORS')) {
      errorMessage = 'CORS Error: Your n8n webhook needs to allow cross-origin requests. Please configure CORS headers in your n8n workflow (add a Set Headers node with Access-Control-Allow-Origin: *).';
    } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      errorMessage = 'Connection Error: Unable to reach the webhook. This may be a CORS issue. Please ensure your n8n webhook allows cross-origin requests.';
    }
    
    addMessage(errorMessage, false);
  }
}

// Track if chat has been opened to show initial message
let chatOpened = false;

// Toggle chat window
function toggleChatWindow() {
  const isVisible = chatWindow.style.display === 'flex';
  chatWindow.style.display = isVisible ? 'none' : 'flex';
  chatToggleButton.style.display = isVisible ? 'flex' : 'none';
  if (!isVisible) {
    messageInput.focus();
    // Show initial bot message on first open
    if (!chatOpened) {
      chatOpened = true;
      setTimeout(() => {
        addMessage('How Can i Help ?', false);
      }, 100);
    }
  }
}

// Close chat window
function closeChatWindow() {
  chatWindow.style.display = 'none';
  chatToggleButton.style.display = 'flex';
}

// Event listeners
chatToggleButton.addEventListener('click', toggleChatWindow);
closeButton.addEventListener('click', closeChatWindow);

// Form submission
inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    addMessage(message, true);
    messageInput.value = '';
    await sendMessageToBot(message);
  }
});

// Enter key support (already handled by form submit, but ensure it works)
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    inputForm.dispatchEvent(new Event('submit'));
  }
});

