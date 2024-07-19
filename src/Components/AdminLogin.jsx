// AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/AuthServices';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminToken');
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const loggedIn = await login(username, password);
      if (loggedIn) {
        alert('Login success!');
        navigate('/home');
      } else {
        setError('Invalid credentials'); // Set error state
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.'); // Set error state
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Admin Login</h2>
              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
