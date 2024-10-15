import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import HeroSection from './component/HeroSection';
import Menu from '../src/component/Menu'; // Updated import for default export
import Contactus from './component/Contactus';
import Login from './component/Login';
import Register from './component/Register';
import Footer from './component/Footer';
import CartPage from '../src/component/cart';
import Order from '../src/component/order';
import Payment from '../src/component/Payment';
import { CartProvider } from '../src/component/CartContexrprovider';
import Dashboard from '../src/component/Dashboard';
import { FoodProvider } from '../src/Context/Foodcontet';
import Homemakerdashoard from "../src/component/HomemakerDashboard";
import './App.css';

function App() {
  return (
   
      <FoodProvider>
      <CartProvider>
        <Router>
          <Home />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/homemakerdashboard/*" element={<Homemakerdashoard />} />
          </Routes>
          <Footer />
        </Router>
        </CartProvider>
      </FoodProvider>
   
  );
}

export default App;
