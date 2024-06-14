const User = require('../models/userModel.js')
const Recipe = require('../models/recipeModel.js')
const cloudinary = require('cloudinary')


// get all recipes 
exports.getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find().populate({
            path: 'createdBy',
            select: '-password'
        });

        res.status(200).json({
            recipes
        });
    } catch (err) {
        return next(err);
    }
};

// get one recipe 
exports.getRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId).populate({
            path: 'createdBy',
            select: '-password'
        });;

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            recipe
        });
    } catch (err) {
        return next(err);
    }
};

// Get all recipes of a particular user
exports.getAllRecipesOfUser = async (req, res) => {
    try {
        const recipes = await Recipe.find({ createdBy: req.user._id });
        res.status(200).json({
            success: true,
            recipes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// add new recipe (for logged-in users)
exports.addNewRecipe = async (req, res, next) => {
    try {

        const { title, description, ingredients, steps, recipeImage } = req.body;

        if (!title || !description || !ingredients || !steps) {
            return res.status(400).json({
                success: false,
                message: 'Missing required recipe fields'
            })
        }

        const result = await cloudinary.v2.uploader.upload(recipeImage, {
            folder: "recipes",
        });


        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            steps,
            recipeImage: {
                public_id: result.public_id,
                url: result.secure_url
            },
            createdBy: req.user._id
        });



        res.status(201).json({
            success: true,
            recipe
        });

    } catch (err) {
        return next(err);
    }
};

// update recipe
exports.updateRecipe = async (req, res) => {
    try {

        const recipe = await Recipe.findById(req.params.recipeId);


        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(404).json({
                success: false,
                message: 'Not access to change'
            });
        }


        await cloudinary.v2.uploader.destroy(recipe.recipeImage.public_id) ;


        const result = await cloudinary.v2.uploader.upload(req.body.recipeImage, {
            folder: "recipes",
        });
        
        recipe.title = req.body.title
        recipe.description = req.body.description
        recipe.ingredients = req.body.ingredients
        recipe.steps = req.body.steps
        
        recipe.recipeImage = {
            public_id: result.public_id,
            url: result.secure_url
        },
       

        await recipe.save()
       


        res.status(200).json({
            success: true,
            recipe
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// delete recipe 
exports.deleteRecipe = async (req, res) => {
    try {

        const recipe = await Recipe.findById(req.params.recipeId);

        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(404).json({
                success: false,
                message: 'Not access to delete'
            });
        }

        await cloudinary.v2.uploader.destroy(recipe.recipeImage.public_id) ;

        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
        
        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully',
            deletedRecipe
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
