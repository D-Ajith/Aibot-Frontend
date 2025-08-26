import React, { useState, useEffect } from "react";

function TypingIndicator() {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ 
      fontStyle: "italic", 
      color: "#888", 
      padding: "10px 0",
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'inline-block',
        marginRight: 8
      }}>
        <div style={{
          display: 'inline-block',
          width: 8,
          height: 8,
          backgroundColor: '#888',
          borderRadius: '50%',
          marginRight: 4,
          animation: 'typing 1.4s infinite both'
        }}></div>
        <div style={{
          display: 'inline-block',
          width: 8,
          height: 8,
          backgroundColor: '#888',
          borderRadius: '50%',
          marginRight: 4,
          animation: 'typing 1.4s infinite both',
          animationDelay: '0.2s'
        }}></div>
        <div style={{
          display: 'inline-block',
          width: 8,
          height: 8,
          backgroundColor: '#888',
          borderRadius: '50%',
          animation: 'typing 1.4s infinite both',
          animationDelay: '0.4s'
        }}></div>
      </div>
      Agent is typing{dots}
      
      <style>
        {`
          @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
}

export default TypingIndicator;