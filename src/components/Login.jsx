import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const hardcodedUsername = 'Gad';
    const hardcodedPassword = 'Y12345'; 

    if (username === hardcodedUsername && password === hardcodedPassword) {
      onLogin();
    } else {
      setError('שם משתמש או סיסמה לא נכונים');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black via-purple-900 to-black">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
           <div className="flex justify-between items-center mt-4">
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot Password
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
