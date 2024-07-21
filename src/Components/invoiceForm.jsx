import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../Services/AuthServices';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([{ product: '', quantity: 1 }]);
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices', getAuthHeader());
        setInvoices(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    const searchInvoices = async () => {
      if (searchTerm.trim() === '') {
        const res = await axios.get('http://localhost:5000/api/invoices', getAuthHeader());
        setInvoices(res.data);
      } else {
        try {
          const res = await axios.get(`http://localhost:5000/api/invoices/search?term=${searchTerm}`, getAuthHeader());
          setInvoices(res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      }
    };
    searchInvoices();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`, getAuthHeader());
      alert('Invoice deleted successfully');
      setInvoices(invoices.filter(invoice => invoice._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products', getAuthHeader());
        setProducts(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { product: '', quantity: 1 }]);
  };

  const handleChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', { customerName, date, items }, getAuthHeader());
      setInvoices(prevInvoices => [...prevInvoices, response.data]);
      alert('Invoice created successfully');
      setCustomerName('');
      setDate('');
      setItems([{ product: '', quantity: 1 }]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editInvoice/${id}`);
  }

  return (
    <div>
    <div className="container mt-5">
      <h2 className="mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            placeholder="Customer Name"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className="form-group mb-3">
            <label htmlFor={`product-${index}`}>Product</label>
            <select
              className="form-control"
              id={`product-${index}`}
              name="product"
              value={item.product}
              onChange={e => handleChange(index, e)}
              required
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <label htmlFor={`quantity-${index}`}>Quantity</label>
            <input
              type="number"
              className="form-control"
              id={`quantity-${index}`}
              name="quantity"
              value={item.quantity}
              onChange={e => handleChange(index, e)}
              min="1"
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddItem}
        >
          Add Item
        </button>
        <button type="submit" className="btn btn-primary float-end">
          Create Invoice
        </button>
      </form>
    </div>
    <br />
    <hr />  
    <div className="container mt-5">
    <h2 className="mb-4">Invoice List</h2>
      <form className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Invoices"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
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
            className="btn btn-info float-end"
            style={{marginTop:'-40px', padding:'4px', }}
            onClick={() => handleEdit(invoice._id)}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger float-end"
            style={{marginTop:'-40px', padding:'4px', marginRight:'50px'}}
            onClick={() => handleDelete(invoice._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
  </div>
  );
};

export default InvoiceForm;
