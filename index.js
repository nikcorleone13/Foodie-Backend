require("./db");
const bodyParser = require("body-parser");
const Restaurant = require("./models/Restaurant");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// repl link
// https://replit.com/@nikcorleone13/Restaurant-Backend?v=1
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server is running for Zomato-Backend on port ${PORT}`);
});
bodyParser.json();

// ********Ex 1:-Adding new restaurants ********
async function createRestaurant(newResto) {
  try {
    const newRestaurant = new Restaurant({
      name: newResto.name,
      cuisine: newResto.cuisine,
      address: newResto.address,
      city: newResto.city,
      rating: newResto.rating,
      menu: newResto.menu,
      averageRating: newResto.averageRating,
    });
    const savedRestaurant = await newRestaurant.save();
    return savedRestaurant;
  } catch (error) {
    console.error("Error saving Restaurant data:", error);
    throw error;
  }
}

// ********Ex 2:-Read a Restaurant ********
const readRestaurant = async (restoName) => {
  try {
    const restoFind = await Restaurant.findOne({ name: restoName });
    return restoFind;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// readRestaurant('Atithi');

// ********Ex 3:-Read all Restaurants ********
const readAllRestaurants = async () => {
  try {
    const allRestaurants = await Restaurant.find({});
    console.log("All Restaurant:", allRestaurants);
    return allRestaurants;
  } catch (error) {
    console.error("Error getting Restaurant:", error);
    throw error;
  }
};
// readAllRestaurants()

// ********Ex 4:-Read by Cuisine********
const readRestaurantsByCuisine = async (findCuisine) => {
  try {
    const cuisineResult = await Restaurant.find({ cuisine: findCuisine });
    console.log(`Restaurants with ${findCuisine} cuisine:`, cuisineResult);
    return cuisineResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// readRestaurantsByCuisine('Continental')

// ********Ex 5:-Update by Id********
const updateRestaurant = async (restoId, updateData) => {
  try {
    const updateResto = await Restaurant.findByIdAndUpdate(
      restoId,
      updateData,
      {
        new: true,
      }
    );

    console.log("Updated Restaurant:", updateResto);
    return updateResto;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// updateRestaurant("650be677805585b7b8b0490a",{cuisine:'Italian'})

// ********Ex 6:-Dellete by Id********
const deleteRestaurant = async (deleteId) => {
  console.log("del id", deleteId);
  try {
    const deletingRestaurant = await Restaurant.findByIdAndDelete(deleteId);
    console.log("Deleted Restaurant", deletingRestaurant);
    return deletingRestaurant;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// deleteRestaurant("650be65cfb562d28775a6abb");

// ********Ex 7:-Search Restaurants by Location ********
const searchRestaurantsByLocation = async (restoLocation) => {
  try {
    const locationResult = await Restaurant.find({ city: restoLocation });
    console.log(`All restaurants in ${restoLocation} are: `, locationResult);
    return locationResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// searchRestaurantsByLocation("Pune");

// ********Ex 8:-Filter Restaurants by Rating ********
const filterRestaurantsByRating = async (ratingValue) => {
  try {
    const ratingResult = await Restaurant.find({
      rating: { $gte: ratingValue },
    });
    console.log(
      `All Restaurants with ratings ${ratingValue} and above are: `,
      ratingResult
    );
    return ratingResult;
  } catch (e) {
    console.error(e);
  }
};
// filterRestaurantsByRating(4.2);

// ********Ex 9:- Add a Dish to a Restaurant's Menu ********
const addDishToMenu = async (restoId, newDish) => {
  try {
    const newDishToAdd = await Restaurant.findById(restoId);
    console.log("Resto Found", newDishToAdd);
    newDishToAdd.menu.push(newDish);
    await newDishToAdd.save();
    console.log("Resto Updated", newDishToAdd);
    return newDishToAdd;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
menuAddition = {
  name: "Alfredo Pasta",
  price: 350,
  description:
    "Indulge in a creamy and comforting classic with our Alfredo Pasta. Tender fettuccine noodles are generously coated in a rich and velvety Alfredo sauce that's made from scratch. Our secret blend of Parmesan cheese, butter, and fresh cream creates a luxurious sauce that clings to every strand of pasta, delivering a burst of flavor with every bite.",
  isVeg: true,
};
// addDishToMenu("650bd750d2e1f6e27815572e",menuAddition)

// ********Ex 10:- Remove a Dish from a Restaurant's Menu ********
const removeDishFromMenu = async (restoId, deleteDishName) => {
  try {
    const deleteRestoDish = await Restaurant.updateOne(
      { _id: restoId },
      { $pull: { menu: { name: deleteDishName } } }
    );
    const updatedRestaurant = await Restaurant.findById(restoId);
    console.log("Resto Updated", updatedRestaurant);
    return updatedRestaurant;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// removeDishFromMenu("650bd750d2e1f6e27815572e", "Butter Chicken")

// ********Ex 11:- Add a User Review and Rating for a Restaurant ********
const addRestaurantReviewAndRating = async (restoId,reviewObj) => {

  try {
    const restoFind = await Restaurant.updateOne({_id:restoId},{$push:{review:reviewObj}});
    console.log("rest found", restoFind);
    return true;
  } catch (e) {
    console.error(e);
  }
};

// Ex 12:- Retrieve User Reviews for a Restaurant
const getUserReviewsForRestaurant = async(restoId) =>{
  try{
    const resto = await Restaurant.findById(restoId)
    const allReviews = resto.review
    return allReviews;
  }
  catch(e){
    throw e;
  }
}








// ************EXPRESS APIs************

// middleware for string capitalization
const stringMiddleware = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//Exercise 1: Creating a Restaurant API
app.post("/restaurants", async (req, res) => {
  const newResto = req.body;
  try {
    const newRestaurant = await createRestaurant(newResto);
    return res.status(201).json({ restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ error: "Error in adding" });
  }
});

//Exercise 2: Reading a Restaurant API
app.get("/restaurants/:restoname", async (req, res) => {
  const restoName = stringMiddleware(req.params.restoname);
  console.log("res", restoName);

  try {
    const restoResult = await readRestaurant(restoName);
    res.status(200).json({ restaurant: restoResult });
  } catch (error) {
    res.status(400).json({ error: "Restaurant not found" });
  }
});

// Exercise 3: Reading All Restaurants API
app.get("/restaurants", async (req, res) => {
  try {
    const allRestaurants = await readAllRestaurants();
    res.status(200).json({ all_Restaurants: allRestaurants });
  } catch (e) {
    res.status(500).json({ error: "Restaurant not Fetched" });
  }
});

// Exercise 4: Reading Restaurants by Cuisine
app.get("/restaurants/cuisine/:cuisineType", async (req, res) => {
  const cuisineName = stringMiddleware(req.params.cuisineType);
  try {
    const cuisineResto = await readRestaurantsByCuisine(cuisineName);
    res.status(200).json({ restaurants: cuisineResto });
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
});

// Exercise 5: Updating a Restaurant API 650be65cfb562d28775a6abf
app.post("/restaurants/:restaurantId", async (req, res) => {
  const restoId = req.params.restaurantId;
  const updateData = req.body;
  try {
    const updatedInfo = await updateRestaurant(restoId, updateData);
    res.status(200).json({ updated: updatedInfo });
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
});

// Exercise 6: Deleting a Restaurant API
app.delete("/restaurants/:restaurantId", async (req, res) => {
  const deleteId = req.params.restaurantId;
  try {
    const deletedRestaurant = await deleteRestaurant(deleteId);
    res.status(200).json({ deleted: deletedRestaurant });
  } catch (error) {
    res.status(500).json({ error: "Not Found" });
  }
});

// Exercise 7: Searching for Restaurants by Location
app.get("/restaurants/search/resto", async (req, res) => {
  const restoLocation = req.query.location;
  console.log(restoLocation);
  try {
    const locationRestaurant = await searchRestaurantsByLocation(restoLocation);
    res.status(201).json({ Restaurants: locationRestaurant });
  } catch (error) {
    res.status(404).json({ error: "Not Found" });
  }
});

// Exercise 8: Filtering Restaurants by Rating
app.get("/restaurants/rating/:minRating", async (req, res) => {
  const ratingValue = parseInt(req.params.minRating);
  try {
    const filteredResto = await filterRestaurantsByRating(ratingValue);
    res.status(200).json({ restaurants: filteredResto });
  } catch (error) {
    res.status(500).json({ error: "Could not find" });
  }
});

// Exercise 9: Adding a Dish to a Restaurant's Menu
app.post("/restaurants/:restaurantId/menu", async (req, res) => {
  const restoId = req.params.restaurantId;
  const menuItem = req.body;
  try {
    const newDish = await addDishToMenu(restoId, menuItem);
    res.status(201).json({ updated: newDish });
  } catch (error) {
    res.status(500).json({ error: "No added" });
  }
});

// Exercise 10: Removing a Dish from a Restaurant's Menu
app.delete("/restaurants/:restaurantId/menu/:dishName", async (req, res) => {
  const restoId = req.params.restaurantId;
  const dishName = req.params.dishName;
  try {
    const deletedDish = await removeDishFromMenu(restoId, dishName);
    res.status(201).json({ deleted: deletedDish });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Exercise 11: Allowing Users to Add Reviews and Ratings for a Restaurant
app.post("/restaurants/:restaurantId/reviews",async(req,res) =>{
  const restoId = req.params.restaurantId;
  const reviewObj = req.body;
  try{
      const reviewResult = await addRestaurantReviewAndRating(restoId,reviewObj);
      if (reviewResult === true) {
          res.status(200).json({restaurant:reviewResult})
      } else {
       res.status(500).json({error:"Could not be added"}) 
      }
    }
  catch(e){
    res.status(500).json({error:e})
  }
})

// Exercise 12: Retrieving User Reviews for a Specific Restaurant
app.get("/restaurants/:restaurantId/reviews", async (req,res) =>{
  const restoId = req.params.restaurantId;
  try{
      const reviewsResult = await getUserReviewsForRestaurant(restoId);
      res.status(200).json({reviews: reviewsResult})
  }
  catch(e){
    res.status(404).json({error:e})
  }

})