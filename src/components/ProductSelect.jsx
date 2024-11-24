import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductSelect = ({ onLogout, onProductSelect }) => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      image: 'https://img.freepik.com/free-photo/low-angle-shot-b-17-bomber-plane-from-wwii-captured-airbase-sunny-day_181624-26344.jpg',
      text: 'Control Machine B - SSH, Telnet, CLI',
    },
    {
      id: 2,
      image: 'https://img.freepik.com/free-photo/reflection-helicopter-couple-love-blue-sky-romantic-unforgotten-date_8353-11023.jpg',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 3,
      image: 'https://img.freepik.com/free-photo/armenian-army-units-trainings_181624-45370.jpg',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 4,
      image: 'https://img.freepik.com/free-photo/row-jets-flying-sky-celebration_181624-58471.jpg',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 5,
      image: 'https://img.freepik.com/free-photo/plane-is-runway-with-words-private-jet-front_188544-8032.jpg',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
  ];

  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    const storedFavorite = localStorage.getItem('favorite');
    if (storedFavorite) {
      setFavorite(JSON.parse(storedFavorite));
    }
  }, []);

  const handleFavorite = (product) => {
    if (favorite && favorite.id === product.id) {
      setFavorite(null);
      localStorage.removeItem('favorite');
    } else {
      setFavorite(product);
      localStorage.setItem('favorite', JSON.stringify(product));
    }
  };

  const handleCardClick = (product) => {
    if (product.id === 1) {
      navigate('/machin-b'); // מפנה ל-MachinB אם המוצר הראשון נבחר
    } else {
      onProductSelect(product);
      navigate('/product-details');
    }
  };

  const handleLogout = () => {
    onLogout(); // קריאה לפונקציית onLogout כדי לשנות את מצב ההתחברות
    navigate('/'); // ניווט לדף הראשי (לוגין)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black flex flex-col items-center justify-center p-6 relative">
      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 bg-indigo-600 text-white py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <span className="mr-2">&larr;</span> Logout
      </button>
      <div className="flex gap-6 justify-center flex-wrap">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex flex-col items-center bg-gradient-to-br from-gray-800 via-indigo-800 to-black rounded-lg p-4 shadow-lg w-72 h-96 transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => handleCardClick(card)}
          >
            <div className="relative w-full h-full">
              <img
                src={card.image}
                alt={`Card ${card.id}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(card);
                }}
                className={`absolute top-2 right-2 text-3xl ${
                  favorite && favorite.id === card.id ? 'text-yellow-400' : 'text-gray-400'
                } hover:text-yellow-300 focus:outline-none`}
              >
                &#9733;
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-2 text-center w-48">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelect;
