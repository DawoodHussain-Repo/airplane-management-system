import React from 'react';
import Navbar from '../components/Navbar';
import LoginRegister from '../pages/LoginRegister';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
      }}
    >
      <Navbar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoginRegister />
      </div>
    </div>
  );
};

export default Home;
