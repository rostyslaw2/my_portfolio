const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of email
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('newCart', CartSchema);
