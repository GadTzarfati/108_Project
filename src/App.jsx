<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductSelect from './components/ProductSelect';
import OneProduct from './components/OneProduct';
import Stremer from './components/Stremer';
import MachinB from './components/MachinB'; // ייבוא הקומפוננטה MachinB
=======
import React from 'react';
import AppRoutes from './AppRouttes';
>>>>>>> 144191a4caa3895e38862a397a2e5ae56e84935a

function App() {
  return (
<<<<<<< HEAD
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
        <Route
          path="/machin-b"
          element={
            isLoggedIn ? (
              <MachinB />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/stremer" element={<Stremer />} />
      </Routes>
    </Router>
=======
    <AppRoutes />
>>>>>>> 144191a4caa3895e38862a397a2e5ae56e84935a
   );
}

export default App;
