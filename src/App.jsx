import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your pages/components
import ChatPage from './pages/ChatPage';
import FAQUpload from './pages/FAQUpload';
// import DocUpload from './pages/DocUpload';
import FileDocUpload from './pages/FileDocUpload';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/faq-upload" element={<FAQUpload />} />
        {/* <Route path="/admin/doc-upload" element={<DocUpload />} /> */}
        <Route path="/admin/file-upload" element={<FileDocUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;