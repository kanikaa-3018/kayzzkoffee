const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number },
  profilePic: { type: String },
  favoriteCoffees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coffee' }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  reviews:[{type:mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  achievements: [{ type: String }],
  quizScores: [{ type: Number }],
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
