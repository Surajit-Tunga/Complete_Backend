const fav = require("../models/fav");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.fetchAll().then(([registeredHomes]) => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home"});
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};

exports.getFavouritesList = (req, res, next) => {
    fav.getFavourites((favourites) =>{
        Home.fetchAll().then(([registeredHomes]) => {
        const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, });
    });
}) 
};

exports.addToFavourites = (req, res, next) => {
    fav.addFavourites(req.body.id, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/favourites');
};

exports.deleteFromFavourites = (req, res, next) => {
    const homeId = req.params.homeId;
    fav.deleteById(homeId, err => {
        if (err) {
            console.log(err);
        } 
        res.redirect('/favourites');
    })
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