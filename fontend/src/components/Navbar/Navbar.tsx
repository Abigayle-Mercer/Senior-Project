import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Assuming your styles are in App.css

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <button className="nav-button" onClick={navigateToHome}>Logout</button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={navigateToDashboard}>Dashboard</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
