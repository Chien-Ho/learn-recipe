const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    status: {
        type: String,
        enum: ['TO COOK', 'COOKING', 'COOKED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})
module.exports = mongoose.model('recipes', RecipeSchema)