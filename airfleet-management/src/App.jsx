import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import adminRoutes from './routes/adminRoutes';
import passengerRoutes from './routes/passengerRoutes';
import crewRoutes from './routes/crewRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        
        {/* Admin Routes */}
        {adminRoutes}

        {/* Passenger Routes */}
        {passengerRoutes}

        {/* Crew Routes */}
        {crewRoutes}
      </Routes>
    </Router>
  );
};

export default App;
