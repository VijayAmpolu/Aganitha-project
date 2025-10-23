// src/App.jsx
import React, { useState, useEffect } from 'react';

// Components
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import ErrorMessage from './components/ErrorMessage';
import PopularRecipes from './components/PopularRecipes';

import RecipeModal from './components/RecipeModal'; // ← New

// API
import { fetchRecipesByIngredient, fetchRecipesByCategory } from './api/mealService';
import { fetchRecipeDetail } from './api/mealService'; // ← New API function

// Hooks
import { useDebounce } from './hooks/useDebounce';

// Theme
const containerClasses = 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300';
const textPrimary = 'text-gray-800 dark:text-gray-100';

const API_ERROR = 'Failed to load recipes. Please check your connection and try again.';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // 🔽 Modal State
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 500);

  const loadRecipes = async (query, isCategory = false) => {
    if (!query.trim()) {
      setRecipes([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = isCategory
        ? await fetchRecipesByCategory(query)
        : await fetchRecipesByIngredient(query);

      setRecipes(data);
      if (data.length === 0) {
        setError('No recipes found for this input.');
      }
    } catch (err) {
      setError(API_ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearch && !selectedCategory) {
      loadRecipes(debouncedSearch, false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (selectedCategory) {
      loadRecipes(selectedCategory, true);
    } else if (!debouncedSearch) {
      setRecipes([]);
      setError('');
    }
  }, [selectedCategory]);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    if (selectedCategory) setSelectedCategory('');
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (searchInput) setSearchInput('');
  };

  const retryLastAction = () => {
    if (selectedCategory) {
      loadRecipes(selectedCategory, true);
    } else if (debouncedSearch) {
      loadRecipes(debouncedSearch, false);
    }
  };

  // 🔽 Open Modal
  const openRecipeModal = async (id) => {
    setModalLoading(true);
    try {
      const recipe = await fetchRecipeDetail(id);
      if (recipe) {
        setSelectedRecipe(recipe);
      } else {
        setError('Recipe not found.');
      }
    } catch (err) {
      setError('Failed to load recipe details.');
    } finally {
      setModalLoading(false);
    }
  };

  // 🔽 Close Modal
  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    setError('');
  };

  const showPopular = !searchInput && !selectedCategory && !loading && !error && !selectedRecipe;

  return (
    <div className={containerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold ${textPrimary}`}>🍳 Recipe Finder</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Quick meals for busy Taylor</p>
          </div>
      
        </header>

        <SearchBar
          onSearch={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          searchValue={searchInput}
        />

        {error ? (
          <ErrorMessage message={error} onRetry={retryLastAction} />
        ) : (
          <>
            {showPopular ? (
              <PopularRecipes onRecipeClick={openRecipeModal} />
            ) : (
              <RecipeList recipes={recipes} loading={loading} onRecipeClick={openRecipeModal} />
            )}
          </>
        )}

        {/* 🔽 Modal */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={closeRecipeModal}
            loading={modalLoading}
          />
        )}

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          Data from{' '}
          <a
            href="https://themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            TheMealDB
          </a>
          . Click any recipe to see full details.
        </footer>
      </div>
    </div>
  );
};

export default App;