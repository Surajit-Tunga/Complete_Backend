const User = require("../models/user");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.find().then(registeredHomes => {
            res.render('store/home-list', {
                registeredHouse: registeredHomes,
                pageTitle: "Airbnb Home",
                isLoggedIn: req.isLoggedIn,
               user: req.session.user,
         });
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings",isLoggedIn: req.isLoggedIn,user: req.session.user, });
};

exports.getFavouritesList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/fav-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};
exports.addToFavourites = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.deleteFromFavourites = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home =>{
        if(!home) {
            res.redirect('/');
        } else {
            res.render('store/home-detail', { pageTitle: "Home Details", home: home, isLoggedIn: req.isLoggedIn,user: req.session.user, });
        }
        
    });
};