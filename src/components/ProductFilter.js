// ProductFilter.js
import React, { useState } from 'react';

const ProductFilter = ({ categories, onFilter }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleFilter = () => {
    onFilter(category, priceRange);
  };

  return (
    <div className="mb-4">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="border p-2 rounded ml-4">
        <option value="">Price Range</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
      <button onClick={handleFilter} className="bg-blue-500 text-white py-2 px-4 rounded ml-4">Filter</button>
    </div>
  );
};

export default ProductFilter;
