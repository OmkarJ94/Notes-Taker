const mongoose = require('mongoose');

mongoose.connect(process.env.URI).catch((err) => {
    console.error(err.message)
})