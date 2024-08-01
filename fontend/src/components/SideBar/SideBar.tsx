// Sidebar.js
import React from 'react';
import './SideBar.css'; // We'll define the styles in this file

const SideBar = () => {
  const cells = ['Survey 1', 'Survey 2', 'Survey 3', 'Survey 4', 'Survey 5', 'Survey 6'];

  return (
    <div className="sidebar">
      {cells.map((cell, index) => (
        <div key={index} className="sidebar-cell">
          {cell}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
