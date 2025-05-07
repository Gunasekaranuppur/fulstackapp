// pages/CartPage.jsx
import { useEffect, useState } from 'react';
import axios from '../services/api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = () => {
    axios.get('/cart')
      .then(res => setCartItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (itemId, newQty) => {
    if (newQty < 1) return;
    axios.put(`/cart/${itemId}`, { quantity: newQty })
      .then(fetchCart)
      .catch(err => alert("Failed to update quantity"));
  };

  const removeItem = (itemId) => {
    axios.delete(`/cart/${itemId}`)
      .then(fetchCart)
      .catch(err => alert("Failed to remove item"));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">No items in cart.</p>
      ) : (
        <div className="row">
          {cartItems.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <h5>{item.product.name}</h5>
                <p>Price: ₹{item.product.price}</p>
                <p>Total: ₹{item.product.price * item.quantity}</p>
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-secondary me-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="me-2">{item.quantity}</span>
                  <button 
                    className="btn btn-secondary me-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
