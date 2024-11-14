import React, { useState, useEffect } from 'react';

const ProductSelect = ({ onLogout }) => {
  const cards = [
    {
      id: 1,
      image: 'https://img.freepik.com/free-photo/low-angle-shot-b-17-bomber-plane-from-wwii-captured-airbase-sunny-day_181624-26344.jpg?t=st=1731487649~exp=1731491249~hmac=2bf7e2b065f9fb745d3268cb89ae96abda2c5d8471b217ed8ce7aa6609e62f50&w=1480',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 2,
      image: 'https://img.freepik.com/free-photo/reflection-helicopter-couple-love-blue-sky-romantic-unforgotten-date_8353-11023.jpg?t=st=1731487701~exp=1731491301~hmac=9eb3a7dfd3ae2040e21ea97a5cde973743987d599009aeeb598891729abbe672&w=1380',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 3,
      image: 'https://img.freepik.com/free-photo/armenian-army-units-trainings_181624-45370.jpg?t=st=1731487744~exp=1731491344~hmac=8da7f33cac5e573423250e2988c57083f37f8d35c97156e3b2b283572153d32f&w=1480',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 4,
      image: 'https://img.freepik.com/free-photo/row-jets-flying-sky-celebration_181624-58471.jpg?t=st=1731487780~exp=1731491380~hmac=cabc56ec645f1f08a1ed430db73821bda0f1d09566d72178fad896248e46a6a7&w=1480',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
    {
      id: 5,
      image: 'https://img.freepik.com/free-photo/plane-is-runway-with-words-private-jet-front_188544-8032.jpg?t=st=1731487915~exp=1731491515~hmac=0e4f50cc357b6752c84ce4458e4aa1d811197971cb3ba5584dbcb90b13e694ef&w=1480',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, repellendus?',
    },
  ];

  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    // בדיקת מועדף מה-localStorage אם קיים
    const storedFavorite = localStorage.getItem('favorite');
    if (storedFavorite) {
      setFavorite(JSON.parse(storedFavorite));
    }
  }, []);

  const handleFavorite = (product) => {
    if (favorite && favorite.id === product.id) {
      // הסרת המועדף
      setFavorite(null);
      localStorage.removeItem('favorite');
    } else {
      // סימון כמועדף ושמירה ב-localStorage
      setFavorite(product);
      localStorage.setItem('favorite', JSON.stringify(product));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-6 relative">
      <button
        onClick={onLogout}
        className="absolute bottom-4 left-4 bg-indigo-600 text-white py-2 px-4 rounded-full flex items-center shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <span className="mr-2">&larr;</span> Logout
      </button>
      <div className="flex gap-6 justify-center flex-wrap">
        {/* תצוגת כל המוצרים */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex flex-col items-center bg-gradient-to-br from-gray-800 via-indigo-800 to-black rounded-lg p-4 shadow-lg w-72 h-96 transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
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
