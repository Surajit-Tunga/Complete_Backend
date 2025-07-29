const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/storeController');

storeRouter.get("/", storeController.getHome);
storeRouter.get("/Bookings", storeController.getBookings);


module.exports = storeRouter;