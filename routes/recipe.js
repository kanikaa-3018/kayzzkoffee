var express = require('express');
var router = express.Router();
const recipeModel = require('../models/recipe-model');
const isLoggedIn= require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');
const reviewModel = require('../models/review-model');
const multer = require('multer');
const path=require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to include timestamp
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  }
});

router.get('/', function (req, res, next) {
  res.render('recipes');
});


router.post('/add', isLoggedIn, upload.single('imageUrl'), async (req, res) => {
  try {
    const { title, ingredients, description, steps, extraTouch } = req.body;

    const recipe = new recipeModel({
      title,
      ingredients,
      description,
      steps,
      extraTouch: extraTouch ? extraTouch : [],
      imageUrl: `/uploads/${req.file.filename}`,
      author: req.user._id
    });

    await recipe.save();

    const user = await userModel.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    }
    await userModel.findByIdAndUpdate(user._id, { $push: { recipes: recipe._id } });

    req.flash('success_msg', 'Recipe added successfully!');
    res.redirect('/recipes/allRecipes');
  } catch (error) {
    console.error('Error adding recipe:', error);
    req.flash('error_msg', 'Failed to add recipe. Please try again.');
    res.status(500).redirect('/recipes');
  }
});



router.post('/review/:id', isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;

    const user = req.user;

    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const review = new reviewModel({
      recipe: id,
      text: text,
      rating: rating,
      user: user._id, 
    });
    await review.save();

    recipe.ratings.push(review);
    await recipe.save();


    const userofmodel = await userModel.findById(req.user._id);
    if (!userofmodel) {
      throw new Error('User not found');
    }
    await userModel.findByIdAndUpdate(userofmodel._id, { $push: { reviews: review._id } });

    res.status(200).json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/allRecipes', async (req, res) => {
  try {
    const recipes = await recipeModel.find().populate('ratings');
    res.render('allRecipes', { recipes });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id).populate('author').exec();
    const reviews = await reviewModel.find({ recipe: recipe._id }).populate('user').exec(); 
    res.render('recipeDetails', { recipe, reviews, user: req.user }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});


  router.post('/like/:id', isLoggedIn, async (req, res) => {
    try {
      const recipe = await recipeModel.findById(req.params.id);
      if (!recipe) return res.status(404).send('Recipe not found');
      
      recipe.likes += 1;
      await recipe.save();
      
      res.redirect('back'); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  
  
  
  module.exports = router;