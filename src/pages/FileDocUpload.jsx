import React, { useState } from 'react';
import axios from 'axios';

function FileDocUpload() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Documents');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/uploadDocs/docs/file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Processed ${res.data.count} Q&A entries successfully.`);
      setFile(null);
      // Reset the file input
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Upload failed.');
    }
  };

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '50px auto', 
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Upload Document File
      </h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Select File:
        </label>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.txt" 
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            width: '100%',
            padding: '10px',
            border: '2px dashed #ddd',
            borderRadius: '5px',
            backgroundColor: '#fafafa'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Category:
        </label>
        <input 
          type="text"
          placeholder="Category (optional)" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>
      
      <button 
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#6b8dd6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5a7bc4'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6b8dd6'}
      >
        Upload File
      </button>
      
      {message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: message.includes('successfully') || message.includes('Processed') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${message.includes('successfully') || message.includes('Processed') ? '#c3e6cb' : '#f5c6cb'}`,
          color: message.includes('successfully') || message.includes('Processed') ? '#155724' : '#721c24',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {message}
        </div>
      )}
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9ff',
        borderRadius: '5px',
        borderLeft: '4px solid #6b8dd6'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Supported Formats:</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '5px', color: '#666' }}>PDF documents (.pdf)</li>
          <li style={{ marginBottom: '5px', color: '#666' }}>Word documents (.doc, .docx)</li>
          <li style={{ marginBottom: '5px', color: '#666' }}>Text files (.txt)</li>
        </ul>
        <p style={{ margin: '10px 0 0 0', color: '#666', fontStyle: 'italic' }}>
          Documents will be processed using AI to generate Q&A pairs and added to the knowledge base for contextual responses.
        </p>
      </div>
    </div>
  );
}

export default FileDocUpload;
