const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const error = require('./middleware/error');

const app = express();

process.on('uncaughtException', ex => {
  console.error(ex.message, ex);
  process.exit(1);
});

process.on('unhandledRejection', ex => {
  console.error(ex.message, ex);
  process.exit(1);
});

// Connect DB
connectDB();

// Init Middlewares
app.use(cors());
app.use(express.json()); // Access req.body

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/places', require('./routes/api/places'));
app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`));
