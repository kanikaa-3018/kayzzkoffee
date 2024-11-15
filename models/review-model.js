
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  text: { type: String, required: true },
  rating: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
