const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const res = require('express/lib/response');
const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength:3
    },
    cpassword: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],


    messages:
        [
            {

                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true
                }
            }
        ]

})
userschema.methods.generateAuthToken = async function () {

    try {

        let userToken = jwt.sign(
            { _id: this._id }
            , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: userToken });
        await this.save()
        return userToken;
    } catch (error) {
  
    }
};
userschema.methods.addMessage = async function (title, description) {
    try {
        this.messages = this.messages.concat({ title, description })
        await this.save()
        return this.messages
    } catch (error) {
    
    }
}

userschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

const User = mongoose.model('user', userschema)
module.exports = User