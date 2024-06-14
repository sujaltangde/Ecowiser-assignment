import {
    getAllRecipesRequest, getAllRecipesSuccess, getAllRecipesFail, getUserRecipesRequest, getUserRecipesSuccess, getUserRecipesFail, getRecipeRequest, getRecipeSuccess, getRecipeFail, addRecipeRequest, addRecipeSuccess, addRecipeFail,
    updateRecipeRequest, updateRecipeSuccess, updateRecipeFail,
    deleteRecipeRequest, deleteRecipeSuccess, deleteRecipeFail
} from '../slices/recipeSlice';

import axios from 'axios'
import {toast} from 'react-toastify';




export const getAllRecipes = () => async (dispatch) => {
    try {
        dispatch(getAllRecipesRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.get("https://meal-matrix-backend.onrender.com/api/recipe/get-all-recipes/", config);

        // console.log("data",data)

        dispatch(getAllRecipesSuccess(data.recipes))

    } catch (err) {
        dispatch(getAllRecipesFail())
    }
}

export const getUsersRecipes = () => async (dispatch) => {
    try {
        dispatch(getUserRecipesRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.get("https://meal-matrix-backend.onrender.com/api/recipe/get-recipes-of-user/", config);

        dispatch(getUserRecipesSuccess(data.recipes))

    } catch (err) {
        dispatch(getUserRecipesFail())
    }
}

export const getRecipe = (id) => async (dispatch) => {
    try {
        dispatch(getRecipeRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.get("https://meal-matrix-backend.onrender.com/api/recipe/get-recipe/" + id, config);

        dispatch(getRecipeSuccess(data.recipe))

    } catch (err) {
        dispatch(getRecipeFail())
    }
}

export const addRecipe = (resetData,recipeData) => async (dispatch) => {
    try {
        dispatch(addRecipeRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.post("https://meal-matrix-backend.onrender.com/api/recipe/add-recipe/", recipeData, config);

        dispatch(addRecipeSuccess())

        if(data.success){
            resetData();
        }

        toast.success("Recipe added successfully!");

    } catch (err) {
        dispatch(addRecipeFail())
    }
}

export const updateRecipe = (id,recipeData) => async (dispatch) => {
    try {
        dispatch(updateRecipeRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.put("https://meal-matrix-backend.onrender.com/api/recipe/update-recipe/"+id, recipeData, config);

        dispatch(updateRecipeSuccess())

        toast.success("Recipe updated successfully!");


    } catch (err) {
        dispatch(updateRecipeFail())
    }
}

export const deleteRecipe = (id) => async (dispatch) => {
    try {
        dispatch(deleteRecipeRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.delete("https://meal-matrix-backend.onrender.com/api/recipe/delete-recipe/"+id, config);

        dispatch(deleteRecipeSuccess())

        toast.success("Recipe deleted successfully!");
        dispatch(getUsersRecipes())

    } catch (err) {
        dispatch(deleteRecipeFail())
    }
}




