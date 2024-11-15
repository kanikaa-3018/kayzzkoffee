const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  description:[{type:String, required:true}],
  steps: [{ type: String, required: true }],
  extraTouch: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  likes: { type: Number, default: 0 },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
