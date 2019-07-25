const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// creating an instance method
userSchema.methods.generateAuthToken = function() {
  // you cannot use arrow function to create a method as part of an object.
  const token = jwt.sign({ _id: this._id }, config.get('jwtSecret'), {
    expiresIn: 360000
  });
  return token;
};

// creating data model
const User = mongoose.model('User', userSchema);

// validate user input
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(4)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255) // this password is not hashed
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
