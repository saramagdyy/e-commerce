// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import CartProvider from './components/CartProvider'; // Default import

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/e-commerce/" element={<Home />} />
            <Route path="/e-commerce/login" element={<Login />} />
            <Route path="/e-commerce/register" element={<Register />} />
            <Route path="/e-commerce/order-history" element={<OrderHistory />} />
            <Route path="/e-commerce/cart" element={<Cart />} />
            <Route path="/e-commerce/products/:id" element={<ProductDetail />} />
            <Route path="/e-commerce/checkout" element={<CheckoutPage />} />
            <Route path="/e-commerce/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
