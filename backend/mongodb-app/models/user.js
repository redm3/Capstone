const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    id:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    name:{
        firstname:{
            type:String,
            required:false
        },
        lastname:{
            type:String,
            required:false
        }
    },
    address:{
        city:String,
        street:String,
        number:Number,
        zipcode:String,
        geolocation:{
            lat:String,
            long:String
        }
    },
    phone:String
})

module.exports = mongoose.model('user',userSchema)