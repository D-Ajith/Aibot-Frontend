import React, { useState } from 'react';
import axios from 'axios';

function FAQUpload() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');
  const [msg, setMsg] = useState('');

  const handleUpload = async () => {
    if (!question || !answer) {
      setMsg('Question and answer cannot be empty.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/upload/faq`, { question, answer, category });
      setMsg('FAQ uploaded!');
      setQuestion('');
      setAnswer('');
    } catch {
      setMsg('Failed to upload FAQ.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Upload FAQ</h2>
      <input placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} /><br /><br />
      <textarea placeholder="Answer" value={answer} rows={4} onChange={e => setAnswer(e.target.value)} /><br /><br />
      <input placeholder="Category (optional)" value={category} onChange={e => setCategory(e.target.value)} /><br /><br />
      <button onClick={handleUpload}>Upload</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default FAQUpload;
