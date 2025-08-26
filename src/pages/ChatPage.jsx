import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConversations, setShowConversations] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: "hi", date: "8/25/2025" }
  ]);
  const chatEndRef = useRef();
  const userId = "dummyUser123";

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_API_URL}/chat/history/${userId}`)
  //     .then((res) => setMessages(res.data))
  //     .catch(err => console.error('Failed to load chat history:', err));
  // }, []);
  
useEffect(() => {
  setMessages([]);   // clears messages on load
}, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!value.trim()) return;
    const newMessage = { sender: "user", message: value, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setLoading(true);
    const currentMessage = value;
    setValue("");
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat/message`, {
        userId,
        message: currentMessage,
      });
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", message: res.data.reply, timestamp: new Date() }
      ]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", message: "An error occurred. Please try again later.", timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const downloadChat = (format) => {
    const token = localStorage.getItem('token');
    window.open(
      `${import.meta.env.VITE_API_URL}/download/chat/${userId}/${format}` + 
      (token ? `?token=${token}` : ''),
      '_blank'
    );
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-left">
          <h1>AI Customer Support</h1>
        </div>
        <div className="header-right">
          <button 
            className="header-btn"
            onClick={() => setShowConversations(!showConversations)}
          >
            {showConversations ? 'Hide Conversations' : 'Show Conversations'}
          </button>
          <button 
            className="header-btn admin-btn"
            onClick={() => window.location.href = '/admin'}
          >
            Admin Panel
          </button>
        </div>
      </header>

      <div className="main-content">
        {showConversations && (
          <div className="sidebar">
            <div className="conversations-header">
              <h3>Your Conversations</h3>
              <button className="new-chat-btn">+ New Chat</button>
            </div>
            <div className="conversations-list">
              {conversations.map(conv => (
                <div key={conv.id} className="conversation-item">
                  <div className="conv-title">{conv.title}</div>
                  <div className="conv-date">{conv.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="chat-area">
          {messages.length === 0 && !loading && (
            <div className="welcome-section">
              <h2>Welcome to Customer Support!</h2>
              <p>How can I help you today?</p>
              <p className="powered-by">Powered by AI Assistant</p>
            </div>
          )}
          
          <div className="messages-container">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.message}
                </div>
              </div>
            ))}
            {loading && <div className="typing-indicator">Agent is typing...</div>}
            <div ref={chatEndRef}></div>
          </div>
          
          <div className="input-area">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message here..."
              className="message-input"
            />
            <button 
              onClick={sendMessage} 
              disabled={loading || !value.trim()}
              className="send-btn"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
