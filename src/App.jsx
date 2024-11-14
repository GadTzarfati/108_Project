import React, { useState } from 'react';
import Login from './components/Login';
import ProductSelect from './components/ProductSelect';

function App() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handler function for successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        // Show ProductSelect component if logged in
        <ProductSelect />
      ) : (
        // Show Login component if not logged in
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
