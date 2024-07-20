import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      alert('Invoice deleted successfully');
      setInvoices(invoices.filter(invoice => invoice._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Invoice List</h2>
      <ul className="list-group">
        {invoices.map(invoice => (
          <li key={invoice._id} className="list-group-item mb-3">
            <h3 className="h5">Customer: {invoice.customerName}</h3>
            <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
            <ul className="list-group">
              {invoice.items.map((item, index) => (
                <li key={index} className="list-group-item">
                  Product: {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>Total Amount:</strong> {invoice.totalAmount}</p>
            <button 
              className="btn btn-danger float-end"
              style={{marginTop:'-40px', padding:'4px'}}
              onClick={() => handleDelete(invoice._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
