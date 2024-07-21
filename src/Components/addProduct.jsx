import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../Services/AuthServices';

const AddProduct = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://invoice-backend-s163.onrender.com/api/products/upload', formData, {
        ...getAuthHeader(),
        headers: {
          ...getAuthHeader().headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Products added successfully');
      setFile(null);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <a className='btn btn-primary float-end' href='/home' style={{ marginTop: '10px' }}>View Invoice List</a>
      <h2 className="mb-4">Add Products by CSV</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="file">Upload CSV</label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload CSV</button>
      </form>
    </div>
  );
};

export default AddProduct;
