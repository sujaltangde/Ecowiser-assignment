import { createSlice } from '@reduxjs/toolkit'

const recipeSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        recipe: {
            title: "",
            description: "",
            ingredients: [],
            steps: [],
            image_url: "",
            created_by: ""
        },
        allRecipes: [],
        userRecipes: [],
        error: null
    },
    reducers: {
        getAllRecipesRequest: (state) => {
            state.loading = true
        },
        getAllRecipesSuccess: (state, action) => {
            state.loading = false;
            state.allRecipes = action.payload;
        },
        getAllRecipesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        getUserRecipesRequest: (state) => {
            state.loading = true
        },
        getUserRecipesSuccess: (state, action) => {
            state.loading = false;
            state.userRecipes = action.payload;
        },
        getUserRecipesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },


        getRecipeRequest: (state) => {
            state.loading = true
        },
        getRecipeSuccess: (state, action) => {
            state.loading = false;
            state.recipe = action.payload
        },
        getRecipeFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        addRecipeRequest: (state) => {
            state.loading = true
        },
        addRecipeSuccess: (state) => {
            state.loading = false;
        },
        addRecipeFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },


        updateRecipeRequest: (state) => {
            state.loading = true
        },
        updateRecipeSuccess: (state) => {
            state.loading = false
        },
        updateRecipeFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        deleteRecipeRequest: (state) => {
            state.loading = true
        },
        deleteRecipeSuccess: (state) => {
            state.loading = false
        },
        deleteRecipeFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

    }
})

export const { 
    getAllRecipesRequest, getAllRecipesSuccess, getAllRecipesFail, 
    getRecipeRequest, getRecipeSuccess, getRecipeFail, 
    addRecipeRequest, addRecipeSuccess, addRecipeFail,
    updateRecipeRequest, updateRecipeSuccess, updateRecipeFail,
    deleteRecipeRequest, deleteRecipeSuccess, deleteRecipeFail, 
    getUserRecipesRequest, getUserRecipesSuccess, getUserRecipesFail
} = recipeSlice.actions

export default recipeSlice.reducer