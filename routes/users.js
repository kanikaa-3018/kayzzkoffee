var express = require('express');
var router = express.Router();
const multer = require('multer');
const userModel = require("../models/user-model");
const path = require('path');
const isLoggedIn = require("../middlewares/isLoggedIn");
const {registerUser, loginUser , logout} = require("../controllers/auth-controller");


// Profile Picture Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to include timestamp
  }
});

const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

// Upload Profile Picture
router.post('/uploadProfilePic', isLoggedIn, upload.single('profilePic'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newProfilePicPath = '/uploads/' + req.file.filename;
    user.profilePic = newProfilePicPath;
    await user.save();

    res.json({ success: true, newProfilePic: newProfilePicPath });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ success: false, message: 'Error saving profile picture' });
  }
});

// Update User Info
router.post('/updateProfile', isLoggedIn, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    await user.save();
    req.flash('success_msg', 'Profile updated successfully!');
    res.redirect('/users/profile');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});

// Update Account
router.post('/updateAccount', isLoggedIn, async (req, res) => {
  try {
    const { password, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.password = password;
    user.phone = phone;
    await user.save();
    req.flash('success_msg', 'Account updated successfully!');
    res.redirect('/users/settings');
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ success: false, message: 'Error updating account' });
  }
}); 

// Delete Account
router.post('/deleteAccount', isLoggedIn, async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.user._id);
    req.flash('success_msg', 'Account deleted successfully!');
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ success: false, message: 'Error deleting account' });
  }
});



// Profile Page
router.get('/profile', (req, res) => {
  if (!req.user) {
    
    return res.redirect('/login');
  }

  const userId = req.user._id;

  userModel.findById(userId)
    .populate('reviews')
    .populate('recipes')
    .then(user => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('profile', { user });
    })
    .catch(err => {
      console.error('Error fetching user data:', err);
      res.status(500).send('Error fetching user data');
    });
});

//settings page
router.get('/settings', isLoggedIn, (req, res) => {
  res.render('settings', { user: req.user });
});

//orders page
router.get('/orders', isLoggedIn, (req, res) => {
  res.render('orders', { user: req.user });
});



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;
