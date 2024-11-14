import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductSelect from './components/ProductSelect';
import OneProduct from './components/OneProduct';
import Stremer from './components/Stremer';
import Profile from './components/Profile';

function App() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handler function for successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handler function for logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/products" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <ProductSelect onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
