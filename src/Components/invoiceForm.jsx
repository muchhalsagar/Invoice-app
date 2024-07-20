import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([{ product: '', quantity: 1 }]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
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
      await axios.post('http://localhost:5000/api/invoices', { customerName, date, items });
      alert('Invoice created successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
       <a className='btn btn-primary float-end' href='/home' style={{marginTop: '10px'}}>View Invoice List</a>
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
  );
};

export default InvoiceForm;
