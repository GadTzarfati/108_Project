import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductSelect from './components/ProductSelect';
import OneProduct from './components/OneProduct';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedProduct(null);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/products" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <ProductSelect onLogout={handleLogout} onProductSelect={handleProductSelect} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/product-details"
          element={
            isLoggedIn && selectedProduct ? (
              <OneProduct product={selectedProduct} onBack={() => setSelectedProduct(null)} />
            ) : (
              <Navigate to="/products" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
