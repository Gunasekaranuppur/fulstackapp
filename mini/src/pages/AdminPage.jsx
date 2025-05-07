// pages/AdminPage.jsx
import { useEffect, useState } from 'react';
import axios from '../services/api';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [editId, setEditId] = useState(null);

  const fetchProducts = () => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`/products/${editId}`, form);
        alert("Product updated");
      } else {
        await axios.post('/products', form);
        alert("Product added");
      }
      setForm({ name: '', description: '', price: '' });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      alert("Failed to submit product");
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, description: product.description, price: product.price });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      } catch {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin - Manage Products</h2>

      <div className="card p-4 shadow-lg">
        <h3 className="mb-4">{editId ? "Edit Product" : "Add Product"}</h3>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            placeholder="Product name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            placeholder="Product description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <h3 className="mt-5">All Products</h3>
      <div className="row">
        {products.map(p => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <h5>{p.name}</h5>
              <p>₹{p.price}</p>
              <p>{p.description}</p>
              <button className="btn btn-warning me-2" onClick={() => handleEdit(p)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;