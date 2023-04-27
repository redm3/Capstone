const mongoose = require('mongoose')
const schema = mongoose.Schema
const Product = require('./product')
const User = require('./user')

const orderSchema = new schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderTotal: {type: Number},

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
})

module.exports = mongoose.model('order', orderSchema)
