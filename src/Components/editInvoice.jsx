import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthHeader } from '../Services/AuthServices';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([{ product: '', quantity: 1 }]);
  const [products, setProducts] = useState([]); // Assuming you have a products list to populate

  useEffect(() => {
    // Fetch the invoice data
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/invoices/edit/${id}`, getAuthHeader());
        const invoiceData = response.data;
        console.log('Invoice data by id : ', invoiceData);
        setInvoice(invoiceData);
        setCustomerName(invoiceData.customerName || '');
        setDate(invoiceData.date || '');
        setItems(invoiceData.items || []);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoice();
   // Fetch products (assuming you need this for the dropdown)
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', getAuthHeader()); // Adjust the endpoint as needed
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { product: '', quantity: 1 }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/invoices/${id}`, {
        customerName,
        date,
        items
      }, getAuthHeader());
      navigate('/home');
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Invoice</h2>
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
          Update Invoice
        </button>
      </form>
    </div>
  );
};

export default EditInvoice;
