const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/db')
const session = require('express-session');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'pruebaDePassword',
    resave: false,
    saveUninitialized: true,
    unset: 'destroy'
  }));
  
app.use('/', require('./app/routes/routes'));

app.listen(5000, () => {
  console.log(`Listening on port ${port}`);
});
