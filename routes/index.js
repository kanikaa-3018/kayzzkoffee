var express = require('express');
var router = express.Router();
const {logout}= require('../controllers/auth-controller');
const stickers= require('../utils/stickers');

const coffees = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Espresso is a quintessential coffee drink known for its strong, concentrated flavor. Created by forcing hot water through finely-ground coffee beans at high pressure, it results in a rich, bold brew with a thick crema on top. This method not only extracts intense flavors but also a full range of aromatic compounds, making it a foundational element for many other coffee drinks, including lattes, cappuccinos, and Americanos. Perfect for a quick energy boost or as a base for creative coffee beverages.',
    origin: 'Italy',
    flavorProfile: ['Bold', 'Rich'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/236x/6a/86/c3/6a86c387495a30851e5843a582c7b6f2.jpg',
    recommendedPairings: ['Chocolate', 'Pastries'],
    type: 'Espresso-based',
    preparationTime: '5 minutes'
  },
  {
    id: 2,
    name: 'Latte',
    description: 'The Latte is a beloved coffee drink that combines the strong, robust flavor of espresso with the smooth, creamy texture of steamed milk. Topped with a thin layer of milk foam, it offers a balanced, milder coffee experience. This Italian classic is often enjoyed as a comforting morning beverage or a soothing afternoon pick-me-up. Its versatility allows for various flavor additions, such as vanilla, caramel, or hazelnut syrups, making it a popular choice for those who prefer a less intense coffee flavor.',
    origin: 'Italy',
    flavorProfile: ['Creamy', 'Mild'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/236x/dc/b7/cb/dcb7cb1890d9a828859cb0f753b1517a.jpg',
    recommendedPairings: ['Scones', 'Cinnamon Rolls'],
    type: 'Espresso-based',
    preparationTime: '10 minutes'
  },
  {
    id: 3,
    name: 'Cappuccino',
    description: 'Cappuccino is a classic Italian coffee drink characterized by its equal layers of espresso, steamed milk, and frothy milk foam. This combination creates a rich and creamy texture with a strong coffee flavor that is slightly softened by the milk. Often dusted with cocoa powder or cinnamon on top, cappuccino offers a well-balanced taste and is ideal for those who appreciate a full-bodied coffee experience with a creamy finish. It’s a staple in coffee culture around the world, enjoyed at any time of day.',
    origin: 'Italy',
    flavorProfile: ['Bold', 'Creamy'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/236x/55/f8/7b/55f87b082c2e6f655957e29725e8a0d8.jpg',
    recommendedPairings: ['Biscotti', 'Muffins'],
    type: 'Espresso-based',
    preparationTime: '10 minutes'
  },
  {
    id: 4,
    name: 'French Press',
    description: 'French Press coffee is celebrated for its rich, full-bodied flavor and robust texture. Made by steeping coarsely ground coffee beans in hot water for several minutes before pressing them with a plunger, this method allows for the full extraction of coffee oils and solids. The result is a brew with a strong, bold flavor and a thicker consistency compared to drip coffee. This traditional method is cherished for its simplicity and the ability to control the brewing time and strength, making it a favorite among coffee aficionados.',
    origin: 'France',
    flavorProfile: ['Rich', 'Full-bodied'],
    brewMethods: ['French Press'],
    imageUrl: 'https://i.pinimg.com/236x/ae/36/95/ae3695f39c91093e61e81105684f3021.jpg',
    recommendedPairings: ['Croissants', 'Cheese'],
    type: 'Brewed',
    preparationTime: '15 minutes'
  },
  {
    id: 5,
    name: 'Cold Brew',
    description: 'Cold Brew is a unique coffee preparation method that involves steeping coarsely ground coffee beans in cold water for an extended period, typically 12 to 24 hours. This slow brewing process results in a coffee that is smooth, less acidic, and highly flavorful. The cold brew technique highlights the coffee’s natural sweetness and subtle notes, making it an ideal choice for refreshing iced coffee drinks. It can be enjoyed on its own or diluted with water or milk, offering a versatile and mellow coffee experience.',
    origin: 'United States',
    flavorProfile: ['Smooth', 'Less Acidic'],
    brewMethods: ['Cold Brew'],
    imageUrl: 'https://i.pinimg.com/236x/7a/d2/12/7ad212e6fb32b282a8bff6a475d65757.jpg',
    recommendedPairings: ['Fruit', 'Salads'],
    type: 'Brewed',
    preparationTime: '12-24 hours'
  },
  {
    id: 6,
    name: 'Americano',
    description: 'Americano is a simple yet flavorful coffee drink created by diluting a shot of espresso with hot water. This method produces a coffee similar in strength to drip coffee but with the rich, bold flavor of espresso. The result is a smooth, well-balanced coffee that maintains the complexity of espresso while being lighter and less intense. It’s a versatile coffee choice, perfect for those who enjoy a strong, but not overwhelming, coffee experience.',
    origin: 'United States',
    flavorProfile: ['Strong', 'Bold'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/236x/d1/a4/78/d1a4782feedaa389e50021897a8a77cd.jpg',
    recommendedPairings: ['Bagels', 'Donuts'],
    type: 'Espresso-based',
    preparationTime: '5 minutes'
  },
  {
    id: 7,
    name: 'Mocha',
    description: 'Mocha is a delightful coffee drink that combines the rich, intense flavor of espresso with the creamy sweetness of chocolate. Blended with steamed milk and chocolate syrup or cocoa powder, it creates a sweet, indulgent coffee experience. Often topped with whipped cream and chocolate shavings, mocha offers a decadent treat that appeals to both coffee and chocolate lovers alike. It’s a popular choice for those seeking a dessert-like coffee beverage.',
    origin: 'Yemen',
    flavorProfile: ['Chocolatey', 'Sweet'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/236x/23/39/b0/2339b0e4bc1c48d152945529d0b168fa.jpg',
    recommendedPairings: ['Brownies', 'Cake'],
    type: 'Espresso-based',
    preparationTime: '10 minutes'
  },
  {
    id: 8,
    name: 'Macchiato',
    description: 'Macchiato, meaning “stained” in Italian, is a straightforward coffee drink consisting of a shot of espresso with a small amount of steamed milk or foam on top. This minimalist approach allows the strong, bold flavors of the espresso to shine through while adding a subtle touch of milk. It’s a perfect choice for those who appreciate a robust coffee flavor with just a hint of creaminess.',
    origin: 'Italy',
    flavorProfile: ['Strong', 'Rich'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/236x/22/8b/72/228b72a03cb98c19063193cf0188a6a3.jpg',
    recommendedPairings: ['Shortbread', 'Tarts'],
    type: 'Espresso-based',
    preparationTime: '5 minutes'
  },
  {
    id: 9,
    name: 'Café au Lait',
    description: 'Café au Lait is a traditional French coffee drink made with equal parts brewed coffee and steamed milk. This simple yet satisfying drink offers a creamy texture with a bold coffee flavor, making it a popular choice for those who enjoy a balanced coffee experience. It’s often served in a bowl rather than a cup, reflecting its French origins and making it ideal for leisurely sipping during breakfast or brunch.',
    origin: 'France',
    flavorProfile: ['Creamy', 'Bold'],
    brewMethods: ['Drip Coffee'],
    imageUrl: 'https://i.pinimg.com/236x/1d/81/8c/1d818c3881c14dd330f65aa585c533cd.jpg',
    recommendedPairings: ['Crêpes', 'Quiche'],
    type: 'Brewed',
    preparationTime: '10 minutes'
  },
  {
    id: 10,
    name: 'Affogato',
    description: 'Affogato is a delightful Italian dessert that combines a shot of hot espresso with a scoop of vanilla ice cream. The contrast between the hot, bitter espresso and the cold, creamy ice cream creates a unique and indulgent treat. As the espresso melts into the ice cream, it forms a deliciously sweet and strong coffee flavor that makes for a perfect end to a meal or a special treat any time of day.',
    origin: 'Italy',
    flavorProfile: ['Sweet', 'Strong'],
    brewMethods: ['Espresso'],
    imageUrl: 'https://i.pinimg.com/474x/df/5c/00/df5c00702516fef983dfdc30da74ff96.jpg',
    recommendedPairings: ['Ice Cream', 'Cookies'],
    type: 'Espresso-based',
    preparationTime: '5 minutes'
  }
];



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/users/login');
}

// Middleware to check if user is authenticated and set req.user
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    req.user = req.user;
  } else {
    req.user = null;
  }
  res.locals.user = req.user;
  next();
});






router.get('/', (req, res) => {
  if (req.user) {
    return res.render('index', { user: req.user });  // Pass user to your template
  }
  return res.render('index', { user: null });  // Render without user if not logged in
});


router.get('/dashboard', function(req, res) {
  res.render('dashboard', { coffees, user: req.user });
});

router.get('/contact', function(req, res) {
  res.render('contactus', { user: req.user });
});

router.get('/bitmoji', function(req, res) {
  res.render('bitmoji', { stickers, user: req.user });
});

router.get('/buycoffee', function(req, res) {
  res.render('buycoffee', { user: req.user });
});
router.get('/cart', function(req, res) {
  res.render('cart', { user: req.user});
});

router.post('/submit', (req, res) => {
  req.flash( 'success_msg','Your response was submitted successfully!');
  req.flash( 'error_msg','Something Went wrong, please try again!');
  res.redirect('/contact'); // Redirect back to the form page or another page
});

router.get('/logout', isLoggedIn, logout);




module.exports = router;
