// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">My Store</h1>
        <div>
          <Link
            to="/"
            className="text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-200"
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/cart"
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-200"
              >
                Cart
              </Link>
              <Link
                to="/order-history"
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-200"
              >
                Order History
              </Link>
              <button 
                onClick={logout} 
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
