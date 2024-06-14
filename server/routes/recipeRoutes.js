const express = require('express')
const {getAllRecipes, getRecipe, addNewRecipe, getAllRecipesOfUser, updateRecipe, deleteRecipe } = require('../controllers/recipeControllers')
const { isAuthenticated } = require('../middlewares/auth')
const router = express.Router()


router.route("/get-all-recipes/").get(isAuthenticated, getAllRecipes);

router.route("/get-recipe/:recipeId").get(isAuthenticated, getRecipe);

router.route("/get-recipes-of-user/").get(isAuthenticated, getAllRecipesOfUser);

router.route("/add-recipe/").post(isAuthenticated, addNewRecipe);

router.route("/update-recipe/:recipeId").put(isAuthenticated, updateRecipe);

router.route("/delete-recipe/:recipeId").delete(isAuthenticated, deleteRecipe);



module.exports = router