import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import CrewManagement from './pages/Admin/CrewManagement';  // Import CrewManagement
import AdminLayout from './layouts/AdminLayout';  // Admin Layout for the admin pages

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        
        {/* Admin Routes with Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/crew-management" element={<CrewManagement />} />
          {/* Other admin routes */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
