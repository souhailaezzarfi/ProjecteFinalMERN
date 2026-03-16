require('dotenv').config()
const mongoose = require('mongoose')
console.log("MONGO_URI:", process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.error(err);

    })