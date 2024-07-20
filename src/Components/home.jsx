import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceList from './InvoiceList';

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
      <a className='btn btn-primary float-end' href='/addInvoice'>Add Invoice</a>
      <InvoiceList />
    </div>
  );
};

export default Home;
