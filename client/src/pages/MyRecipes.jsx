import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getUsersRecipes, deleteRecipe } from '../actions/recipeActions';
import { AiOutlineSearch } from 'react-icons/ai'; // Importing icons from React Icons
import { RxCross2 } from "react-icons/rx";
import { Loader } from '../components/Loader';

export const MyRecipes = () => {
  const { loading, userRecipes } = useSelector(state => state.recipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [baseRecipes, setBaseRecipes] = useState([]);


  useEffect(() => {
    dispatch(getUsersRecipes());
  }, [dispatch]);

  useEffect(() => {
    setBaseRecipes(userRecipes);
  }, [userRecipes]);

  const filteredRecipes = baseRecipes.filter(recipe => {
    return (
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };


  const handleDeleteRecipe = (id) => {
    dispatch(deleteRecipe(id))
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-20 pb-20 md:px-14 px-10">

{loading ? <div className='mt-10'><Loader/></div> : <>
      <h1 className="md:text-5xl text-4xl font-bold text-orange-500 text-center mb-10">My Recipes</h1>

      <div className="relative w-full md:max-w-lg mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <AiOutlineSearch size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
          placeholder="Search recipes by title or ingredients"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
            onClick={handleClearSearch}
          >
            <RxCross2 size={19} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-600 font-semibold">Loading...</div>
      ) : filteredRecipes.length > 0 ? (
        <div className="max-w-4xl flex flex-col  w-full space-y-6">
          {filteredRecipes.map(recipe => (
            <Link key={recipe._id}  >


              <div className="bg-gray-100 rounded-lg p-4 flex md:flex-row flex-col  gap-5 shadow-md">
                <div className='md:w-1/4 w-full'>
                  <img src={recipe.recipeImage.url} className="w-96 rounded-md h-32" alt={recipe.title} />
                </div>
                <div className='md:w-3/4 w-full'>
                  <div className="font-semibold text-lg">{recipe.title}</div>
                  <div className="text-gray-600 text-sm mt-2 md:flex hidden">{recipe.description.substring(0, 200)}...</div>
                  <div className="text-gray-600 text-sm mt-2 md:hidden flex">{recipe.description.substring(0, 80)}...</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-500 text-sm">{new Date(recipe.createdAt).toLocaleString()}</div>
                    <div className=" flex gap-3">
                      <Link to={`/edit-recipe/${recipe._id}`} className='text-white px-4 py-1 rounded-md bg-blue-500' >Edit</Link>
                      <button onClick={() => handleDeleteRecipe(recipe._id)} className='text-white px-4 py-1 rounded-md bg-red-500' >Delete</button>
                    </div>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 font-semibold">No recipes found</div>
      )}

</>}
    </div>
  );
};
