// pages/Login.jsx
import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      alert("Login failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4 text-center">Login</h2>
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
        <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
