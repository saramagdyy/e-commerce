import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartProvider';

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    email: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    // Prepare order details
    const orderDetails = {
      id: Date.now(), // Unique order ID
      total: totalPrice,
      items: cart,
      ...formData // Include form data
    };

    // Save order to localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    storedOrders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    // Clear cart from localStorage
    localStorage.removeItem('cart');

    // Reset form data
    setFormData({
      fullName: '',
      address: '',
      city: '',
      zipCode: '',
      email: '',
      phoneNumber: ''
    });

    // Navigate to confirmation page and pass order details
    navigate('/order-confirmation', { state: { orderDetails } });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Items:</h3>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span className="font-medium">{item.title}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-lg">
            Total: ${totalPrice}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Form Fields */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-sm font-medium mb-2">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
