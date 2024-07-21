import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from './invoiceForm';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  }

  return (
    <div className='container'>
      <button className='btn btn-danger float-end' style={{marginTop: '20px'}} onClick={handleLogout}>Logout</button>
      <h2>Welcome to Invoice App</h2>
      <p>Choose an action from the navigation.</p>
      <a className='btn btn-primary float-end' style={{marginLeft: '20px'}} href='/addProduct'>Add Product</a>
      <InvoiceForm />
    </div>
  );
};

export default Home;
