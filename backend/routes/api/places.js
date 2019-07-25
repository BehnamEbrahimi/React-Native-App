const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
const { Place, validatePlace } = require('../../models/Place');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const validateObjectId = require('../../middleware/validateObjectId');

// @route   POST api/places
// @desc    Create a place
// @access  Private
router.post('/', [auth, validate(validatePlace)], async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  const newPlace = new Place({
    user: req.user._id,
    placeName: req.body.placeName,
    placeImage: {
      data: Buffer.from(req.body.placeImage.data, 'base64'),
      contentType: 'image/jpeg'
    },
    coords: {
      latitude: req.body.latitude,
      longtitude: req.body.longtitude
    },
    email: user.email
  });

  await newPlace.save();

  // to respond with image
  //res.contentType('image/jpeg');
  //res.end(newPlace.placeImage.data, 'binary');

  res.send('Place saved to the DB.');
});

// @route   GET api/places
// @desc    Get all places
// @access  Private
router.get('/', auth, async (req, res) => {
  const places = await Place.find().sort({ date: -1 });
  res.send(places);
});

// @route   GET api/places/:id
// @desc    Get one place by Id
// @access  Private
router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return res.status(404).send('Place not found.');
  }

  res.send(place);
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
  if (place.user.toString() !== req.user._id) {
    return res.status(403).send('Forbidden action.');
  }

  await place.remove();

  res.send('Place deleted.');
});

module.exports = router;
