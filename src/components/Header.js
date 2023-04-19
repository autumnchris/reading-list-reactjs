import React from 'react';
import bgImage from '../assets/images/background-image.jpg';

const Header = () => {
  return (
    <header>
      <div className="bg-image" style={{backgroundImage: `url(${bgImage})`}}></div>
      <h1>Build Your Reading List</h1>
    </header>
  );
}

export default Header;