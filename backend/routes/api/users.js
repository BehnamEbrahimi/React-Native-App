const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, validateUser } = require('../../models/User');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');

// @route   GET api/users/me
// @desc    get one user
// @access  Private
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password'); // password and sensitive data should not be sent to the user
  res.send(user);
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', validate(validateUser), async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send('User already registered.');
  }

  user = new User({ email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
