// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductFilter from './ProductFilter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  const handleFilter = (category, priceRange) => {
    let filtered = [...products];
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (priceRange === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceRange === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    storedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="p-4">
      <ProductFilter categories={categories} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>{product.price} USD</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
