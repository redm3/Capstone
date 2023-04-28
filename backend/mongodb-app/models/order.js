const mongoose = require('mongoose')
const schema = mongoose.Schema
const Product = require('./product')
const User = require('./user')

const orderSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            productId: {
                type: Number,
                ref: 'Product',
                required: true
            },
            title: String,
            image: String,
            price: Number,
            gender: String,
            category: String,
            description: String
        }
    ],
    orderTotal: { type: Number },

    shippingAddress: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
});


module.exports = mongoose.model('order', orderSchema)
