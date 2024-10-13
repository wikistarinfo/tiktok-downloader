import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/about" className="text-white">About</Link></li>
          <li><Link to="/privacy-policy" className="text-white">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service" className="text-white">Terms of Service</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;