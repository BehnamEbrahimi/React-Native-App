const mongoose = require('mongoose');
const Joi = require('joi');

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  placeName: {
    type: String,
    required: true
  },
  placeImage: {
    data: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  },
  coords: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  email: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Place = mongoose.model('Place', placeSchema);

// validate place input
function validatePlace(place) {
  const schema = {
    placeName: Joi.string().required(),
    placeImage: Joi.object()
      .keys({
        data: Joi.string()
          .base64()
          .required(),
        contentType: Joi.string().required()
      })
      .required(),
    coords: Joi.object()
      .keys({
        latitude: Joi.number()
          .min(-85)
          .max(85)
          .required(),
        longitude: Joi.number()
          .min(-180)
          .max(180)
          .required()
      })
      .required()
  };

  return Joi.validate(place, schema);
}

exports.Place = Place;
exports.validatePlace = validatePlace;
