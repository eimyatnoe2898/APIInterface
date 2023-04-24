//import required libraries and modules
const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//set engines
app.set("view engine", "ejs")

//middleware and static files
const indexRoutes = require('./routes/indexRoutes');

//routes
app.use('/', indexRoutes );

//start server
app.listen(8080, () => {
    console.log('Running this application at port 8080');
  });