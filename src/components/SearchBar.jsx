// src/components/SearchBar.jsx
import React from 'react';

const CATEGORIES = [
  { label: 'Chicken', value: 'chicken' },
  { label: 'Beef', value: 'beef' },
  { label: 'Pork', value: 'pork' },
  { label: 'Seafood', value: 'seafood' },
  { label: 'Pasta', value: 'pasta' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Dessert', value: 'dessert' },
];

const SearchBar = ({ onSearch, onCategoryChange, selectedCategory, searchValue }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 space-y-5 transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">What’s for dinner, Taylor?</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search by ingredient</label>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="e.g., chicken, tomato, rice"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Or pick a category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="">-- Select a category --</option>
          {CATEGORIES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;