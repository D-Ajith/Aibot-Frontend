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



// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Link, Outlet, useNavigate } from 'react-router-dom';
// import ChatPage from './pages/ChatPage';
// import LoginPage from './pages/LoginPage';
// import FAQUpload from './pages/FAQUpload';
// import DocUpload from './pages/DocUpload';
// import FileDocUpload from './pages/FileDocUpload';
// import AdminDashboard from './pages/AdminDashboard';
// import './App.css';

// // Layout for authenticated pages with nav
// function AppLayout() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <nav className="main-nav">
//         <Link to="/chat">Chat</Link>
//         <Link to="/admin">Admin Dashboard</Link>
//         <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>
//           Logout
//         </button>
//       </nav>
//       <Outlet/>
//     </div>
//   );
// }

// function App() {
//   const token = localStorage.getItem('token');

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Redirect root to login or chat */}
//         <Route
//           path="/"
//           element={<Navigate to={token ? "/chat" : "/login"} replace />}
//         />

//         {/* Protected area */}
//         <Route element={token ? <AppLayout /> : <Navigate to="/login" replace />}>
//           <Route path="/chat" element={<ChatPage />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/faq-upload" element={<FAQUpload />} />
//           <Route path="/admin/doc-upload" element={<DocUpload />} />
//           <Route path="/admin/file-upload" element={<FileDocUpload />} />
//         </Route>

//         {/* Fallback for unknown routes */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
