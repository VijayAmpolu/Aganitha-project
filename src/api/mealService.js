// src/api/mealService.js
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    if (!response.ok) throw new Error('Network error: Could not fetch recipes');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('[API:Ingredient] Failed to fetch:', error.message);
    throw error;
  }
};

export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Network error: Could not fetch by category');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('[API:Category] Failed to fetch:', error.message);
    throw error;
  }
};

// 🔽 New: Fetch full recipe by ID
export const fetchRecipeDetail = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error('Failed to fetch recipe');
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error(`[API:Detail] Failed to fetch recipe ${id}:`, error.message);
    throw error;
  }
};