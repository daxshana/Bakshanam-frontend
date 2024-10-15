import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="overview">Overview</Link></li>
        <li><Link to="orders">Orders</Link></li>
        <li><Link to="users">Users</Link></li>
        <li><Link to="Menus">Menus</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
