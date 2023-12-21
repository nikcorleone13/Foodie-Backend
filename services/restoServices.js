const Restaurant = require("../models/Restaurant")

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
  
  
module.exports = {
    createRestaurant
    ,readRestaurant
    ,readAllRestaurants
    ,readRestaurantsByCuisine
    ,updateRestaurant
    ,deleteRestaurant
    ,searchRestaurantsByLocation
    ,filterRestaurantsByRating
    ,addDishToMenu
    ,removeDishFromMenu
    ,addRestaurantReviewAndRating
,getUserReviewsForRestaurant
}
  
  