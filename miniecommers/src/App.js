import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <div className="App">
      <Route path="/add-product" element={<AddProduct />} />

      <h1>Littel Tenter Store</h1>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
