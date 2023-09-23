const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const PORT = process.env.PORT || 9000;
const dbURL = "mongodb+srv://swdnikhil:Nikhil%402000@neog-self.4hpwf56.mongodb.net/zomato-restaurant?retryWrites=true&w=majority";

//Connect to MongoDB
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

