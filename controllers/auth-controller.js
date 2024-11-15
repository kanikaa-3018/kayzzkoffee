const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const {generateToken}= require("../utils/generateToken");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports.registerUser = async function (req, res, next) {
  try {
    let { email, password, name } = req.body;
    let user = await userModel.findOne({ email: email });
    
    if (user) {
      req.flash("error", "You already have an account, please login.");
      return res.redirect("/users/login");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      email,
      password: hash,
      name,
    });


    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      let token = generateToken(user);
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      req.flash("success", "Registration successful. Welcome!");
      return res.redirect("/");
    });

  } catch (err) {
    console.error("Registration error:", err);
    req.flash("error", "Something went wrong during registration.");
    return res.redirect("/users/register");
  }
};

module.exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', info.message || 'Email or Password incorrect');
      return res.redirect('/users/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      let token = generateToken(user);
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      req.flash('success', 'You have successfully logged in');
      return res.redirect('/dashboard');
    });
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
    }
    res.clearCookie('token');
    req.flash('success', 'You have been successfully logged out');
    res.redirect('/');
  });
};


// module.exports.registerUser = async function (req, res) {
//   try {
//     let { email, password, name } = req.body;
//     let user = await userModel.findOne({ email: email });
//     console.log(user);
//     if (user) {
//       req.flash("error", "You already have an account, please login.");
//       return res.redirect("/users/login");
//     }

//     bcrypt.genSalt(10, function (err, salt) {
//       bcrypt.hash(password, salt, async function (err, hash) {
//         if (err) return res.send(err.message);
//         else {
//           let user = await userModel.create({
//             email,
//             password: hash,
//             name,
//           });

//           let token = generateToken(user);
//           res.cookie("token", token, { httpOnly: true , secure: process.env.NODE_ENV === 'production'});

//           res.redirect("/dashboard");
//         }
//       });
//     });
//   } catch (err) {
//     res.send(err.message);
//     req.flash("error", "Something went wrong during registration.");
//     return res.redirect("/users/register");
//   }
// };


// module.exports.loginUser = async function (req, res) {
//     let { email, password } = req.body;
  
//     let user = await userModel.findOne({ email: email });
//     if (!user) {
//       req.flash("error", "Email or Password incorrect");
//       return res.redirect("/users/login");
//     }
  
//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result) {
//         let token = generateToken(user);
//         res.cookie("token", token, { httpOnly: true });
//         res.redirect("/");
//       } else {
//         req.flash("error", "Email or Password incorrect");
//         return res.redirect("/users/login");
//       }
//     });
//   };
  
//   module.exports.logout = function (req, res) {
//     res.cookie("token", "");
//     res.redirect("/users/login");
//   };