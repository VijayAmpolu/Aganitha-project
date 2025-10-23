// src/components/RecipeCard.jsx
import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(recipe.idMeal)}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          {recipe.strMeal}
        </h3>
      </div>
    </div>
  );
};

export default RecipeCard;