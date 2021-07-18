if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv').config();
}
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/db')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URI,
      ttl: 14*24*60*60,
      autoRemove: 'native'
    })
  }));
  
app.use('/', require('./app/routes/routes'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
