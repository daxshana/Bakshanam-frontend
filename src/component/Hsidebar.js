import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>HomemakerDashboard </h2>
      <ul>
         <li><Link to="Menus">Menus</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
