const fav = require("../models/fav");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.find().then(registeredHomes => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home",isLoggedIn: req.isLoggedIn});
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings",isLoggedIn: req.isLoggedIn });
};

exports.getFavouritesList = (req, res, next) => {
    fav.find().populate("houseId").then((favourites) =>{
        const favouriteHomes = favourites.map((fav)=> fav.houseId);
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, isLoggedIn: req.isLoggedIn});
  }); 
};

exports.addToFavourites = (req, res, next) => {
    const homeId = req.body.id;
    fav.findOne({houseId: homeId}).then((Favourite)=>{
        if (Favourite) {
        console.log("Already in fav list.");
        res.redirect('/favourites');
        } else {
            Favourite = new fav({houseId: homeId});
            Favourite.save().then(result => {
        console.log('added to fav');
    })
      res.redirect('/favourites');
        }
    }).catch(err =>{
     console.log(err);
    });   
};

exports.deleteFromFavourites = (req, res, next) => {
    const homeId = req.params.homeId;
    fav.findOneAndDelete({houseId: homeId}).then(result => {
        console.log('removed');
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
            res.render('store/home-detail', { pageTitle: "Home Details", home: home, isLoggedIn: req.isLoggedIn });
        }
        
    });
};