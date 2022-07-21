const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(console.log('database connected'))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = new mongoose.model('Person', personSchema)


