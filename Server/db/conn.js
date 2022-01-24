const mongoose = require('mongoose');

mongoose.connect(process.env.URI).then(() => {
    console.log('connect')
})
    .catch((err) => {
        console.error(err.message)
    })