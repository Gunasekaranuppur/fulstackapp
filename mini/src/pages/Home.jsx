// pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <h5>{product.name}</h5>
              <p>Price: ₹{product.price}</p>
              <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
