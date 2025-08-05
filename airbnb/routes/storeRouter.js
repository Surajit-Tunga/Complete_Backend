const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/storeController');

storeRouter.get("/", storeController.getHome);
storeRouter.get("/Bookings", storeController.getBookings);
storeRouter.get("/Favourites", storeController.getFavouritesList);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/Favourites", storeController.addToFavourites);
storeRouter.post("/favourites/delete/:homeId", storeController.deleteFromFavourites);


module.exports = storeRouter;