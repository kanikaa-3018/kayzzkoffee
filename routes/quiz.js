var express = require('express');
var router = express.Router();
const userModel = require('../models/user-model');

const questions = [
    {
      text: 'What is the main ingredient in coffee?',
      options: [
        { text: 'Water', value: '0' },
        { text: 'Coffee Beans', value: '1' },
        { text: 'Milk', value: '0' },
        { text: 'Sugar', value: '0' }
      ]
    },
    {
      text: 'Which country is known as the birthplace of coffee?',
      options: [
        { text: 'Colombia', value: '0' },
        { text: 'Brazil', value: '0' },
        { text: 'Ethiopia', value: '1' },
        { text: 'Vietnam', value: '0' }
      ]
    },
    {
      text: 'What is the term for a coffee brewed by forcing hot water through finely-ground coffee beans?',
      options: [
        { text: 'Espresso', value: '1' },
        { text: 'French Press', value: '0' },
        { text: 'Cold Brew', value: '0' },
        { text: 'Drip Coffee', value: '0' }
      ]
    },
    {
      text: 'Which of these is NOT a type of coffee bean?',
      options: [
        { text: 'Arabica', value: '0' },
        { text: 'Robusta', value: '0' },
        { text: 'Liberica', value: '0' },
        { text: 'Sumatra', value: '1' }
      ]
    },
    {
      text: 'What is the name of the creamy layer on top of an espresso?',
      options: [
        { text: 'Crema', value: '1' },
        { text: 'Froth', value: '0' },
        { text: 'Foam', value: '0' },
        { text: 'Mousse', value: '0' }
      ]
    },
    {
      text: 'Which coffee brewing method involves steeping coffee grounds in cold water for an extended period?',
      options: [
        { text: 'Cold Brew', value: '1' },
        { text: 'Pour Over', value: '0' },
        { text: 'Moka Pot', value: '0' },
        { text: 'Turkish Coffee', value: '0' }
      ]
    },
    {
      text: 'What is the process of roasting coffee beans called?',
      options: [
        { text: 'Curing', value: '0' },
        { text: 'Roasting', value: '1' },
        { text: 'Grinding', value: '0' },
        { text: 'Brewing', value: '0' }
      ]
    },
    {
      text: 'Which type of coffee is made by adding hot water to espresso?',
      options: [
        { text: 'Americano', value: '1' },
        { text: 'Latte', value: '0' },
        { text: 'Cappuccino', value: '0' },
        { text: 'Macchiato', value: '0' }
      ]
    },
    {
      text: 'What is the main difference between a latte and a cappuccino?',
      options: [
        { text: 'Amount of milk foam', value: '1' },
        { text: 'Type of coffee beans', value: '0' },
        { text: 'Roast level', value: '0' },
        { text: 'Brewing time', value: '0' }
      ]
    },
    {
      text: 'What is the name of the coffee preparation method that uses a special pot to brew coffee over a flame?',
      options: [
        { text: 'Moka Pot', value: '1' },
        { text: 'Aeropress', value: '0' },
        { text: 'French Press', value: '0' },
        { text: 'Siphon', value: '0' }
      ]
    },
    {
      text: 'Which of these coffee drinks is typically served with whipped cream on top?',
      options: [
        { text: 'Mocha', value: '1' },
        { text: 'Espresso', value: '0' },
        { text: 'Flat White', value: '0' },
        { text: 'Macchiato', value: '0' }
      ]
    }
];

router.get('/', (req, res) => {
    res.render('quiz', { questions });
});

router.post('/submit', async (req, res) => {
    const userResponses = req.body;
    let score = 0;

    questions.forEach((question, index) => {
        const userAnswer = userResponses[`q${index}`];
        if (userAnswer === '1') {
            score++;
        }
    });

    const user = await userModel.findById(req.user._id);
    user.quizScores.push(score);
    await user.save();

    res.json({
        score: score,
        message: `You scored ${score} out of ${questions.length}`
    });
});

module.exports = router;
