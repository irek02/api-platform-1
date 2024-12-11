import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white p-4 relative">
      <div className="relative z-10 container px-4 mx-auto">
        <h1 className="text-4xl font-extrabold drop-shadow-lg">🍲 Recipe App 🍲</h1>
        <p className="mt-2 text-lg"><span className="italic">Discover and share your favorite recipes!</span> 🥗🍰🍝</p>
      </div>
    </header>
  );
};

export default Header;
