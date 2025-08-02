const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
    const registeredHouse = Home.fetchAll((registeredHouse) => {
          res.render('store/home-list', {registeredHouse: registeredHouse, pageTitle: "Airbnb Home"});
    });
}

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};

exports.getFavourites = (req, res, next) => {
    res.render('store/fav-list', { pageTitle: "Your Favourites" });
};

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    res.render('store/home-detail', { pageTitle: "Home Details", homeId: homeId});
};
