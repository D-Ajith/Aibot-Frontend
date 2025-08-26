import React from "react";

function ChatBubble({ message, sender }) {
  const isUser = sender === "user";
  return (
    <div style={{ textAlign: isUser ? "right" : "left", margin: "8px 0" }}>
      <span
        style={{
          padding: "10px 16px",
          borderRadius: 16,
          background: isUser ? "#7fa6ee" : "#ededed",
          color: isUser ? "white" : "black",
          display: "inline-block",
          maxWidth: "80%",
          wordWrap: "break-word"
        }}
      >
        {message}
      </span>
    </div>
  );
}

export default ChatBubble;