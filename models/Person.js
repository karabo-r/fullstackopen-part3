const mongoose = require('mongoose');
const { isMobilePhone } = require('validator');

mongoose.connect(process.env.MONGO_URI);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be longer than 3 letters'],
  },
  number: {
    type: String,
    minLength: 8,
    validate: [isMobilePhone, 'Please enter a valid phone number'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = new mongoose.model('Person', personSchema);
