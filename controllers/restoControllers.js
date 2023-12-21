const restoMethods = require('../services/restoServices')
// middleware for string capitalization
const stringMiddleware = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//Exercise 1: Creating a Restaurant API
const addNewResto = async (req, res) => {
  const newResto = req.body;
  try {
    const newRestaurant = await restoMethods.createRestaurant(newResto);
    return res.status(201).json({ restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ error: "Error in adding" });
  }
};

//Exercise 2: Reading a Restaurant API
const getAResto = async (req, res) => {
  const restoName = stringMiddleware(req.params.restoname);
  console.log("res", restoName);

  try {
    const restoResult = await restoMethods.readRestaurant(restoName);
    res.status(200).json({ restaurant: restoResult });
  } catch (error) {
    res.status(400).json({ error: "Restaurant not found" });
  }
};

// Exercise 3: Reading All Restaurants API
const getAllResto = async (req, res) => {
  try {
    const allRestaurants = await restoMethods.readAllRestaurants();
    res.status(200).json({ all_Restaurants: allRestaurants });
  } catch (e) {
    res.status(500).json({ error: "Restaurant not Fetched" });
  }
};

// Exercise 4: Reading Restaurants by Cuisine
const getRestoByCuisine = async (req, res) => {
  const cuisineName = stringMiddleware(req.params.cuisineType);
  try {
    const cuisineResto = await restoMethods.readRestaurantsByCuisine(cuisineName);
    res.status(200).json({ restaurants: cuisineResto });
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
};

// Exercise 5: Updating a Restaurant API 650be65cfb562d28775a6abf
const updateResto = async (req, res) => {
  const restoId = req.params.restaurantId;
  const updateData = req.body;
  try {
    const updatedInfo = await restoMethods.updateRestaurant(restoId, updateData);
    res.status(200).json({ updated: 'Updated' });
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
};

// Exercise 6: Deleting a Restaurant API
const deleteResto = async (req, res) => {
  const deleteId = req.params.restaurantId;
  try {
    const deletedRestaurant = await restoMethods.deleteRestaurant(deleteId);
    res.status(200).json({ deleted: 'Deleted Restaurant from Database' });
  } catch (error) {
    res.status(500).json({ error: "Not Found" });
  }
};

// Exercise 7: Searching for Restaurants by Location
const getRestoByLocation = async (req, res) => {
  const restoLocation = req.query.location;
  console.log(restoLocation);
  try {
    const locationRestaurant = await restoMethods.searchRestaurantsByLocation(restoLocation);
    res.status(201).json({ Restaurants: locationRestaurant });
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
};

// Exercise 8: Filtering Restaurants by Rating
const filterRestoByRating = async (req, res) => {
  const ratingValue = parseInt(req.params.minRating);
  try {
    const filteredResto = await restoMethods.filterRestaurantsByRating(ratingValue);
    res.status(200).json({ restaurants: filteredResto });
  } catch (error) {
    res.status(500).json({ error: "Could not find" });
  }
};

// Exercise 9: Adding a Dish to a Restaurant's Menu
const addingDishToMenu = async (req, res) => {
  const restoId = req.params.restaurantId;
  const menuItem = req.body;
  try {
    const newDish = await restoMethods.addDishToMenu(restoId, menuItem);
    res.status(201).json({ updated: newDish });
  } catch (error) {
    res.status(500).json({ error: "No added" });
  }
};

// Exercise 10: Removing a Dish from a Restaurant's Menu
const deleteADishFromMenu = async (req, res) => {
  const restoId = req.params.restaurantId;
  const dishName = req.params.dishName;
  try {
    const deletedDish = await restoMethods.removeDishFromMenu(restoId, dishName);
    res.status(201).json({ deleted: deletedDish });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Exercise 11: Allowing Users to Add Reviews and Ratings for a Restaurant
const addRestoReviews = async (req, res) => {
  const restoId = req.params.restaurantId;
  const reviewObj = req.body;
  try {
    const reviewResult = await restoMethods.addRestaurantReviewAndRating(restoId, reviewObj);
    if (reviewResult === true) {
      res.status(200).json({ restaurant: reviewResult });
    } else {
      res.status(500).json({ error: "Could not be added" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Exercise 12: Retrieving User Reviews for a Specific Restaurant

const getAllRestoReviews = async (req, res) => {
  const restoId = req.params.restaurantId;
  try {
    const reviewsResult = await restoMethods.getUserReviewsForRestaurant(restoId);
    res.status(200).json({ reviews: reviewsResult });
  } catch (e) {
    res.status(404).json({ error: e });
  }
};
module.exports = {
  addNewResto,
  getAResto,
  getAllResto,
  getRestoByCuisine,
  updateResto,
  deleteResto,
  getRestoByLocation,
  filterRestoByRating,
  addingDishToMenu,
  deleteADishFromMenu,
  addRestoReviews,
  getAllRestoReviews,
};
