import { useState, useEffect, useRef } from 'react';
import { getSentiment } from './api'; // Call to Gemini API for sentiment analysis

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const chatEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Function to generate a custom response based on sentiment
  const generateResponse = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return "I'm glad you're feeling happy!";
      case 'negative':
        return "I'm sorry to hear that. Would you like to talk more?";
      case 'neutral':
        return "It seems like you have mixed feelings. Can I assist you with something else?";
      default:
        return "I'm here to listen if you want to share more.";
    }
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }

    setError('');
    setLoading(true); // Show loading state

    try {
      const sentiment = await getSentiment(message); // Get sentiment from the API
      setEmotion(sentiment); // Set detected emotion

      const empatheticResponse = generateResponse(sentiment); // Generate a response based on sentiment
      const newMessage = { text: message, sender: 'user' };
      const botResponse = { text: empatheticResponse, sender: 'bot', emotion: sentiment };

      setChatHistory([...chatHistory, newMessage, botResponse]); // Update chat history with new messages
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Hide loading state
      setMessage(''); // Clear message input
    }
  };

  // Function to handle pressing Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={styles.container}>
      {/* Chat header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Gemini - Your Mental Health Assistant</h1>
      </header>

      {/* Chat history */}
      <main style={styles.chatWindow}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            {chat.sender === 'bot' && (
              <p style={{ ...styles.emotionText, ...emotionStyles(chat.emotion).color }}>
                Detected Emotion: {chat.emotion}
              </p>
            )}
            <p style={styles.messageText}>{chat.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      {/* Message input area */}
      <footer style={styles.inputArea}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          style={styles.textArea}
          rows="3" // Initial height increased
        />
        <button onClick={handleSendMessage} style={styles.sendButton} disabled={loading}>
          {loading ? <span style={styles.spinner}></span> : 'Send'}
        </button>
      </footer>

      {/* Error message */}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

// Emotion-based styling to represent detected sentiment visually
const emotionStyles = (emotion) => {
  switch (emotion) {
    case 'positive':
      return { color: '#2ECC71' };
    case 'negative':
      return { color: '#E74C3C' };
    case 'neutral':
      return { color: '#95A5A6' };
    default:
      return { color: '#34495E' };
  }
};

// Full-screen chatbot styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#F7F9FC',
    fontFamily: 'Helvetica, Arial, sans-serif',
    overflow: 'hidden',
  },
  header: {
    padding: '20px',
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
  },
  headerTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  chatWindow: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#FFFFFF',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxSizing: 'border-box',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: '20px 20px 0 20px',
    padding: '10px 15px',
    maxWidth: '80%',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
    borderRadius: '20px 20px 20px 0',
    padding: '10px 15px',
    maxWidth: '80%',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  emotionText: {
    margin: '0 0 5px 0',
    fontSize: '12px',
    fontStyle: 'italic',
  },
  messageText: {
    margin: 0,
    fontSize: '16px',
    lineHeight: '1.4',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '15px 20px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E0E0E0',
    flexShrink: 0,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
    gap: '10px',
  },
  textArea: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '20px',
    border: '1px solid #CCCCCC',
    resize: 'vertical', // Allow vertical resizing
    minHeight: '60px', // Larger initial height
    maxHeight: '150px', // Limit the maximum height for scrolling
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '60px',
    height: '42px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #FFFFFF',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: '#E74C3C',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  },
};

// Adding keyframes for spinner animation
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Chat;
