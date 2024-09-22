// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    storedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert(`${product.title} added to cart!`);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-bold">{product.price} USD</p>
      <button
        onClick={addToCart}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
