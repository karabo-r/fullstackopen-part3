const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(console.log('database connected'))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

module.exports = new mongoose.model('Person', personSchema)


