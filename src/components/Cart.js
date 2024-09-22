import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!user) {
    return <p className="p-4">Please log in to view your cart.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="border-b py-4 flex justify-between items-center">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
