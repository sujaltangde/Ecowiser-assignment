import React, { useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addRecipe } from '../actions/recipeActions';
import { TbLoader2 } from 'react-icons/tb';

export const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [recipeImage, setRecipeImage] = useState("");

  const { loading } = useSelector(state => state.recipe)
  const dispatch = useDispatch()

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
    if (e.target.name === "recipe") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
            setRecipeImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const formRef = useRef() ;

  const resetData = () => {
    formRef.current.reset()
    setTitle('');
    setDescription('');
    setIngredients(['']);
    setSteps(['']);
    setRecipeImage("");
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const data = {
        title,
        description,
        ingredients,
        steps,
        recipeImage
    }

    dispatch(addRecipe(resetData,data))

  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-20 pb-20 md:px-14 px-10">
      <div className='md:mt-10 mt-10 max-w-4xl w-full'>
        <h1 className='md:text-5xl text-4xl font-bold text-orange-500 text-center'>Add Recipe</h1>
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                  type='text'
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
              <div className="mt-2">
                <img
                  src={recipeImage}
                  alt="Selected Recipe"
                  className="mt-4 w-full h-64 object-cover rounded-md"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
            
          </div>
          {loading ? <button disabled={true} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md w-full flex justify-center items-center ">
           <TbLoader2 className='animate-spin ' size={23}/>
          </button>
           : 

           <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md w-full">
           Submit Recipe 
          </button>
        
        
        }
        </form>
      </div>
    </div>
  );
};
