import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductSelect from './components/ProductSelect';
import OneProduct from './components/OneProduct';
import Stremer from './components/Stremer';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedProduct(null);
  };
  const handleProductSelect = (product) => setSelectedProduct(product);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={isLoggedIn?(<Navigate to="/products" />):( <Login onLogin={handleLogin} />)}/>
        <Route path="/products"element={isLoggedIn?(<ProductSelect onLogout={handleLogout} onProductSelect={handleProductSelect} />):(<Navigate to="/ProductSeiect" />)}/>
        <Route path="/product-details"element={isLoggedIn && selectedProduct ? (<OneProduct product={selectedProduct} onBack={() => setSelectedProduct(null)} />):(<Navigate to="/products" />)}/>
        <Route path="/stremer" element={<Stremer />} />
        <Route path="*"element={<h2 style={{ textAlign: 'center', color: 'red' }}>404 - Page Not Found</h2>}/>
        <Route path="/machin-b" element={isLoggedIn ? (<MachinB />):(<Navigate to="/" />)}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
