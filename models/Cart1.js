const { Schema, model } = require('mongoose');

const CartSchema1 = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    avatar: String // Поле для шляху до аватару
});

module.exports = model('Cart1', CartSchema1);
