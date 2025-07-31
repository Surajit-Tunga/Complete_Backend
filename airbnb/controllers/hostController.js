const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('host/add-home',{ pageTitle: "Add Home"})
}

exports.getHostHome = (req, res, next)=>{
    const registeredHouse = Home.fetchAll((registeredHouse) => {
          res.render('host/host-home-list', {registeredHouse: registeredHouse, pageTitle: "Airbnb Home"});
    });
}
exports.postAddHome = (req, res, next)=>{

    const {houseName,price,location, rating} = req.body;

    const home = new Home(houseName,price,location, rating);
    home.save();

    res.render('host/homeadded', { pageTitle: "Home added"})
}