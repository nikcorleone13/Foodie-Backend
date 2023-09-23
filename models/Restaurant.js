const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  address: String,
  city: String,
  rating: Number,
  menu: [{
    name: String,
    price: Number,
    description: String,
    isVeg: Boolean
  }],
  averageRating: Number,
  review:[
    {
      reviewText:String,
      rating:Number,
      userId: String
    }
  ]
})



const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;

