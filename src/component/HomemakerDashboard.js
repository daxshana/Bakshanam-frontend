import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../component/Hsidebar';
import Menus from '../component/Menus'; // Corrected import

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Routes>
           <Route path="/menus" element={<Menus />} /> {/* Changed path to /menu */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
