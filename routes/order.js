const express = require('express');
const router = express.Router();
const orderModel = require('../models/order-model');

router.get('/', async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.render('orders', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { quantity, size } = req.body;
        const order = new orderModel({
            userId: req.user._id,
            items: [{ quantity, size }],
            totalAmount: quantity * 10, // Assuming price is 10 for simplicity
            paymentMethod: 'credit_card',
            deliveryAddress: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country
            }
        }); 
        await order.save();
        res.redirect('/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});






module.exports = router;
