import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Orders from '../component/Ordermanagement';
import Users from '../component/User';
import Menus from '../component/Menus';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/overview" element={<div>Overview Content</div>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Menus" element={<Menus />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
