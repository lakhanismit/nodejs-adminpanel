const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    image:{
        type: String,
        default: 'uploads/default.png'
    }
})

module.exports = mongoose.model ('login_user', loginSchema)