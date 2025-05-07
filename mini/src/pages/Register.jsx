// pages/Register.jsx
import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('/register', form);
      alert("Registration successful. Please login.");
      navigate('/login');
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4 text-center">Register</h2>
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Enter your name"
            onChange={e => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={e => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={e => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
