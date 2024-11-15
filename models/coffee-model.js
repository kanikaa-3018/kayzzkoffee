const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  origin: { type: String },
  flavorProfile: { type: [String] },
  brewMethods: [{ type: String }], 
  imageUrl: { type: String },
  recommendedPairings: [{ type: String }], 
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('Coffee', coffeeSchema);
