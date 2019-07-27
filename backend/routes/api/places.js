const express = require('express');
const router = express.Router();
const config = require('config');
const { Place, validatePlace } = require('../../models/Place');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const validateObjectId = require('../../middleware/validateObjectId');

const serverURL = config.get('serverURL');

// @route   POST api/places
// @desc    Create a place
// @access  Private
router.post('/', [auth, validate(validatePlace)], async (req, res) => {
  const newPlace = new Place({
    owner: req.user._id,
    placeName: req.body.placeName,
    placeImage: {
      data: Buffer.from(req.body.placeImage.data, 'base64'),
      contentType: 'image/jpeg'
    },
    coords: {
      latitude: req.body.coords.latitude,
      longitude: req.body.coords.longitude
    }
  });

  await newPlace.save();

  const place = {
    key: newPlace._id,
    owner: newPlace.owner,
    placeName: newPlace.placeName,
    coords: newPlace.coords,
    placeImage: {
      uri: `${serverURL}/api/places/image/${newPlace._id}`,
      headers: {}
    }
  };
  place.placeImage.headers['x-auth-token'] = req.header('x-auth-token');

  res.send(place);
});

// @route   GET api/places/image/:id
// @desc    Get place's image by id
// @access  Private
router.get('/image/:id', [auth, validateObjectId], async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return res.status(404).send('Place not found.');
  }

  res.contentType('image/jpeg');
  res.end(place.placeImage.data, 'binary');
});

// @route   GET api/places
// @desc    Get all places
// @access  Private
router.get('/', auth, async (req, res) => {
  const places = await Place.find().sort({ date: -1 });

  toBeSent = places.map(place => ({
    key: place._id,
    owner: place.owner,
    placeName: place.placeName,
    coords: place.coords,
    placeImage: {
      uri: `${serverURL}/api/places/image/${place._id}`,
      headers: {}
    }
  }));
  toBeSent.forEach(place => {
    place.placeImage.headers['x-auth-token'] = req.header('x-auth-token');
  });

  res.send(toBeSent);
});

// @route   DELETE api/places/:id
// @desc    Delete one place
// @access  Private
router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return res.status(404).send('Place not found.');
  }

  // Check place
  if (place.owner.toString() !== req.user._id) {
    return res.status(403).send('Forbidden action.');
  }

  await place.remove();

  res.send('Place deleted.');
});

module.exports = router;
