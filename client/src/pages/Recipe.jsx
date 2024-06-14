import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { getRecipe } from '../actions/recipeActions';
import { Loader } from '../components/Loader';

export const Recipe = () => {
  const { loading, recipe } = useSelector(state => state.recipe);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecipe(params.recipeId));
  }, [dispatch, params.recipeId]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-20 pb-20 md:px-14 px-3">
      {loading ? (
        <div className="mt-10"><Loader/></div>
      ) : (
        <div className="max-w-2xl w-full space-y-6">
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <img src={recipe.recipeImage && recipe.recipeImage.url} alt={recipe.title} className="w-full h-64 object-cover rounded-md" />
            <h1 className="text-4xl font-bold text-orange-500 mt-4">{recipe.title}</h1>
            <p className="text-gray-700 text-lg mt-2">{recipe.description}</p>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
              <ul className="list-disc list-inside mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">Steps</h2>
              <ol className="list-decimal list-inside mt-2">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="text-gray-600">{step}</li>
                ))}
              </ol>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-gray-500 md:text-sm text-xs">{new Date(recipe.createdAt).toLocaleString()}</div>
              <div className="text-gray-500 md:text-sm text-xs">Posted by {recipe.createdBy && recipe.createdBy.username}</div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
