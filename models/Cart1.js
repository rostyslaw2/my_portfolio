const { Schema, model } = require('mongoose');

const CartSchema1 = new Schema({
    name: {
        type: String, // зробили тип
        required: true
    },
      age: {
        type: String, // зробили тип
        required: true
    }
   
})

module.exports = model('Cart1', CartSchema1)