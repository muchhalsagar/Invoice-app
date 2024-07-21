import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import Home from './Components/home';
import NotFound from './Components/NotFound';
import AddProduct from './Components/addProduct';
import InvoiceForm from './Components/invoiceForm';
import EditInvoice from './Components/editInvoice';

function App() {
  const isLoggedIn = localStorage.getItem('adminToken');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {isLoggedIn ? (
          <>
          <Route path="/home" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addInvoice" element={<InvoiceForm />} />
          <Route path="/editInvoice/:id" element={<EditInvoice />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
