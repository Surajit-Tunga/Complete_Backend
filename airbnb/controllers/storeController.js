const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
    const registeredHouse = Home.fetchAll((registeredHouse) => {
          res.render('store/home-list', {registeredHouse: registeredHouse, pageTitle: "Airbnb Home"});
    });
}

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};
