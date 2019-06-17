require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const { checkJwt } = require('./middleware');
const routes = require('./routes');

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useCreateIndex: true});

// NPM Libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Global Middleware
app.use(checkJwt);

// Routes import
app.use('/api/V1/', routes);


app.listen("3001" || process.env.PORT, () => {
  console.log('Server running')
})
