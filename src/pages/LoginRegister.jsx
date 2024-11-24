import React, { useState } from 'react';
import './LoginRegister.css';
import airplane from '../assets/images/plane.jpg';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${airplane})` }}
    >
      <div className="auth-overlay"></div>
      <div className="auth-box">
        <h2>{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <div className="form-container">
            <form>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="form-container">
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
