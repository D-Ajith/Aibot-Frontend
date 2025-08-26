import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('faq');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleFAQSubmit = async () => {
    if (!question || !answer) {
      setMessage('Question and answer are required.');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/faq`, {
        question, answer, category
      });
      if (res.data.success) {
        setMessage('FAQ added successfully!');
        setQuestion('');
        setAnswer('');
      }
    } catch (error) {
      setMessage('Failed to add FAQ.');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'Documents');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/uploadDocs/docs/file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const result = res.data;
      setMessage(`Processed ${result.count} Q&A entries successfully.`);
      setFile(null);
      document.querySelector('.file-input').value = '';
    } catch (error) {
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button 
          className="back-btn"
          onClick={() => window.location.href = '/'}
        >
          ← Back to Home
        </button>
      </header>

      <div className="admin-content">
        <div className="status-section">
          <h2>System Status</h2>
          <div className="status-cards">
            <div className="status-card">
              <h3>DATABASE</h3>
              <div className="status-value">connected</div>
            </div>
            <div className="status-card">
              <h3>SERVER</h3>
              <div className="status-value">Running</div>
            </div>
          </div>
        </div>

        <div className="tabs-section">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              📋 FAQ Management
            </button>
            <button 
              className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              👤 Document Upload
            </button>
          </div>

          {activeTab === 'faq' && (
            <div className="tab-content">
              <h2>Create New FAQ</h2>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-textarea"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="General"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  Active
                </label>
              </div>
              <button onClick={handleFAQSubmit} className="submit-btn">
                Add FAQ
              </button>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="tab-content">
              <div className="upload-section">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-input"
                />
                <button onClick={handleFileUpload} className="upload-btn">
                  Upload Document
                </button>
              </div>
              <div className="supported-formats">
                <h3>Supported Formats:</h3>
                <ul>
                  <li>PDF documents (.pdf)</li>
                  <li>Text files (.txt)</li>
                </ul>
                <p>Documents will be processed and added to the knowledge base for contextual responses.</p>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') || message.includes('Processed') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
