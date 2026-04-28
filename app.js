require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const usersRouter = require('./routes/usersRouter');
app.use('/', usersRouter);

// Start server
app.listen(port, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on port ${port}`);
});