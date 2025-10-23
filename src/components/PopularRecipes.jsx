// src/components/PopularRecipes.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { fetchRecipesByCategory } from '../api/mealService';

// Inlined categories (was in utils/constants.js)
const POPULAR_CATEGORIES = ['Chicken', 'Pasta', 'Dessert'];

const PopularRecipes = ({ onRecipeClick }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        const promises = POPULAR_CATEGORIES.map(cat => fetchRecipesByCategory(cat));
        const results = await Promise.all(promises);

        const combined = results.flat().slice(0, 10); // Take top 10
        const unique = Array.from(new Map(combined.map(meal => [meal.idMeal, meal])).values());
        setRecipes(unique);
      } catch (err) {
        console.error('Failed to load popular recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPopular();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">✨ Popular Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={onRecipeClick} />
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;