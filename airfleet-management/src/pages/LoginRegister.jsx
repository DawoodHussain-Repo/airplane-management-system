import React, { useState } from 'react';
import './LoginRegister.css';
import airplane from '../assets/images/plane.jpg';
import axios from 'axios';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
  
        // Store token, role, and email in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
  
        // If role is 'Crew', store email in localStorage
        if (response.data.role === 'Crew') {
          localStorage.setItem('crewEmail', formData.email);
        }
  
        setMessage('Login successful! Redirecting...');
  
        // Redirect based on user role
        if (response.data.role === 'Admin') {
          window.location.href = '/admin/dashboard';
        } else if (response.data.role === 'Passenger') {
          window.location.href = '/passenger/dashboard';
        } else if (response.data.role === 'Crew') {
          window.location.href = '/crew/dashboard';
        } else {
          setMessage('Access denied. Unauthorized role.');
        }
      } else {
        setMessage('Registration is handled via Postman. Please use the Login option.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };
  

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${airplane})` }}
    >
      <div className="auth-overlay"></div>
      <div className="auth-box">
        <h2>{isLogin ? 'Welcome Back!' : 'Register via Postman'}</h2>
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

        {message && <p className="auth-message">{message}</p>}

        {isLogin ? (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="form-container">
            <p className="auth-message">
              Register new users using the Postman API. Use Login to proceed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
