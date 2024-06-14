const mongoose = require('mongoose')
const validator = require('validator')

const recipeSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    recipeImage: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe