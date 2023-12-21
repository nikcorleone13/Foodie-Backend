const express = require('express')
const router = express.Router();
const controlller = require('../controllers/restoControllers');

// GET routes
router.get("/restaurants/:restoname",controlller.getAResto);
router.get("/restaurants",controlller.getAllResto);
router.get("/restaurants/cuisine/:cuisineType",controlller.getRestoByCuisine);
router.get("/restaurants/search/resto",controlller.getRestoByLocation);
router.get("/restaurants/rating/:minRating",controlller.filterRestoByRating);
router.get("/restaurants/:restaurantId/reviews",controlller.getAllRestoReviews)

// POST Routes
router.post("/restaurants",controlller.addNewResto);
router.post("/restaurants/:restaurantId",controlller.updateResto);
router.post("/restaurants/:restaurantId/menu",controlller.addingDishToMenu)
router.post("/restaurants/:restaurantId/reviews",controlller.addRestoReviews)

// DELETE Routes
router.delete("/restaurants/:restaurantId",controlller.deleteResto);
router.delete("/restaurants/:restaurantId/menu/:dishName",controlller.deleteADishFromMenu);
module.exports = router;