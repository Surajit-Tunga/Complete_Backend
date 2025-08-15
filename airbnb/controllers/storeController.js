const fav = require("../models/fav");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.find().then(registeredHomes => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home"});
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};

exports.getFavouritesList = (req, res, next) => {
    fav.getFavourites().then(favourites =>{
        favourites = favourites.map(fav => fav.houseId)
        Home.find().then(registeredHomes => {
        const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id.toString()));
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, });
    });
  }) 
};

exports.addToFavourites = (req, res, next) => {
    const homeId = req.body.id;
    const favourite = new fav(homeId);
    favourite.save().then(result => {
        console.log('added to fav');
    }).catch(err => {
        console.log(err);
    }).finally(()=>{
        res.redirect('/favourites');
    });    
};

exports.deleteFromFavourites = (req, res, next) => {
    const homeId = req.params.homeId;
    fav.deleteById(homeId).then(result => {
        console.log('added to fav');
    }).catch(err => {
        console.log(err);
    }).finally(()=>{
        res.redirect('/favourites');
    }); 
}

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home =>{
        if(!home) {
            res.redirect('/');
        } else {
            res.render('store/home-detail', { pageTitle: "Home Details", home: home });
        }
        
    });
};