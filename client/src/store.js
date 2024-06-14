import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import recipeReducer from './slices/recipeSlice'


export const store = configureStore({
	reducer:{
		user: userReducer,
		recipe: recipeReducer,
	}
})