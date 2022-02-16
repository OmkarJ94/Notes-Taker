const mongoose = require('mongoose');

const note = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, time: {
        type: String,
    
    },
   
})


const notes = mongoose.model('note', note);

module.exports = notes