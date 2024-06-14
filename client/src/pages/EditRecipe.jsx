import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRecipe, getRecipe } from '../actions/recipeActions';
import { TbLoader2 } from 'react-icons/tb'
import {Loader} from '../components/Loader'

export const EditRecipe = () => {
  const { loading, recipe } = useSelector(state => state.recipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [recipeImage, setRecipeImage] = useState('');

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    dispatch(getRecipe(params.recipeId));
  }, [dispatch, params.recipeId]);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setRecipeImage(recipe.recipeImage?.url);
    }
  }, [recipe]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = ingredients.map((ingredient, i) => (i === index ? value : ingredient));
    setIngredients(newIngredients);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index, value) => {
    const newSteps = steps.map((step, i) => (i === index ? value : step));
    setSteps(newSteps);
  };

  const imageChange = (e) => {
    if (e.target.name === 'recipe') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setRecipeImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      description,
      ingredients,
      steps,
      recipeImage,
    };

    // console.log(updatedData)
    dispatch(updateRecipe(params.recipeId, updatedData));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-20 pb-20 md:px-14 px-10">
    {loading ? <div className='mt-10'><Loader/></div>  : <div className="md:mt-10 mt-10 max-w-4xl w-full">
        <h1 className="md:text-5xl text-4xl font-bold text-orange-500 text-center">Edit Recipe</h1>
        {loading ? (
          <div className="text-center text-gray-600 font-semibold">Loading...</div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-4 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Description</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    required
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddIngredient}
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
              >
                Add Ingredient
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Steps</label>
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    required
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddStep}
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
              >
                Add Step
              </button>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Food Image</label>
              <input
                type="file"
                name="recipe"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                onChange={imageChange}
                required
              />
              {recipeImage && (
                <img src={recipeImage} alt="Recipe" className="mt-4 w-full h-64 object-cover rounded-md" />
              )}
            </div>
            {loading ? <button disabled={true} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md w-full flex justify-center items-center ">
           <TbLoader2 className='animate-spin ' size={23}/>
          </button>
           : 

           <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md w-full">
           Update Recipe 
          </button>
        
        
        }
          </form>
        )}
      </div> 
}
    </div> 
  );
};
