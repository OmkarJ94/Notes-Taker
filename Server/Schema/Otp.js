const mongoose = require('mongoose');;
const validator = require('validator');
const { validate } = require('./userSchema');
const OtpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    Otp: {
        type: Number,
        required: true,
        maxLength: 4
    },
    expireIn: {
        type: Number,
    }
},
    {
        timestamps: true,
    })


const Otp = mongoose.model("code", OtpSchema);
module.exports = Otp;