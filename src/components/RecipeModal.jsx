// src/components/RecipeModal.jsx
import React from 'react';

const RecipeModal = ({ recipe, onClose, loading }) => {
  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) {
      ingredients.push(`${measure || 'to taste'} ${ing}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{recipe.strMeal}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading recipe...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Image */}
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-74 object-fit-cover rounded-md"
            />

            {/* Category & Area */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {recipe.strCategory}
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                {recipe.strArea}
              </span>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Instructions</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>
     {/* YouTube Button */}
              {recipe.strYoutube && (
                <div className="text-center">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  >
                    ▶️ Watch on YouTube
                  </a>
                </div>
              )}

            {/* Source */}
            {recipe.strSource && (
              <div>
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View original recipe
                </a>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;