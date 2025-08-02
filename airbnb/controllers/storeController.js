const fav = require("../models/fav");
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

exports.addToFavourites = (req, res, next) => {
    console.log(req.body);
    fav.addFavourites(req.body.id, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/favourites');
}

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home=>{
        if(!home) {
            res.redirect('/');
        } else {
            res.render('store/home-detail', { pageTitle: "Home Details", home: home });
        }
        
    });
};
