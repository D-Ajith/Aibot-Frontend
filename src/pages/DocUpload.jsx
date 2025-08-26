import React, { useState } from 'react';
import axios from 'axios';

function DocUpload() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Documents');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!content.trim()) {
      setMessage('Please enter document content.');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/uploadDocs/docs`, { content, category });
      setMessage(`Uploaded and processed ${res.data.count} entries.`);
      setContent('');
    } catch (e) {
      setMessage('Upload failed, please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Upload Document Content</h2>
      <textarea
        rows="15"
        placeholder="Paste your document text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', fontFamily: 'monospace', fontSize: 14, marginBottom: 10 }}
      />
      <input
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: '100%', marginBottom: 16, padding: 8 }}
      />
      <button onClick={handleUpload}>Upload and Process</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DocUpload;
