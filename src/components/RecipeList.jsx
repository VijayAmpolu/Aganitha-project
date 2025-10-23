// RecipeList.jsx
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, loading, onRecipeClick }) => {
  //                                 ↑↑↑ Must be received here

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-8">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Searching recipes...</p>
      </div>
    );
  }

  if (!recipes.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Found Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.idMeal} 
            recipe={recipe} 
            onClick={onRecipeClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;