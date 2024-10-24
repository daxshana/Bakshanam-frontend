import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>HomemakerDashboard </h2>
      <ul>
        <li><Link to="Foodmanagement">Foodmanagement</Link></li>
         <li><Link to="orders">Orders</Link></li>
         </ul>
    </div>
  );
};

export default Sidebar;
