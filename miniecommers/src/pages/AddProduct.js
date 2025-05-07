import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    category_id: '',
    image: null
  });

  useEffect(() => {
    axios.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Category fetch error', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in form) {
        data.append(key, form[key]);
      }

      await axios.post('/products', data);
      alert('Product added successfully!');
      navigate('/products');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Add Product (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required /><br />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required /><br />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br />
        <select name="category_id" onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select><br />
        <input type="file" name="image" onChange={handleChange} accept="image/*" /><br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
