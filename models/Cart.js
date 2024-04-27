const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    name: {
        type: String, // зробили тип
        required: true
    },
      email: {
        type: String, // зробили тип
        required: true
    }
   
})

module.exports = model('Cart', CartSchema)