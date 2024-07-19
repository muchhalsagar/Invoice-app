import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  }
  return (
    <div>
      <h2>Welcome to Invoice App</h2>
      <p>Choose an action from the navigation.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
