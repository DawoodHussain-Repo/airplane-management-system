import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
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
      <HeroSection />
    </div>
  );
};

export default Home;
