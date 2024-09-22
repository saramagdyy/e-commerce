import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Order Submitted Successfully!</h2>
      {orderDetails && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Order Details:</h3>
          <p>Name: {orderDetails.fullName}</p>
          <p>Address: {orderDetails.address}</p>
          <p>City: {orderDetails.city}</p>
          <p>ZIP Code: {orderDetails.zipCode}</p>
          <p>Email: {orderDetails.email}</p>
          <p>Phone Number: {orderDetails.phoneNumber}</p>
        </div>
      )}
      <p className="mt-4 text-gray-600">Thank you for your order!</p>
      <a href="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
        Back to Home
      </a>
    </div>
  );
};

export default OrderConfirmation;
