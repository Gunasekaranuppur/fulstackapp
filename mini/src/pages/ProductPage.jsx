// pages/ProductPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../services/api';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        const found = res.data.find(p => p.id === parseInt(id));
        setProduct(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = () => {
    axios.post('/cart', { product_id: product.id, quantity: 1 })
      .then(() => {
        alert("Added to cart");
        navigate('/cart');
      })
      .catch(() => alert("Failed to add to cart"));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{product.name}</h2>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h4>Price: ₹{product.price}</h4>
          <p>{product.description}</p>
          <button onClick={addToCart} className="btn btn-success mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
