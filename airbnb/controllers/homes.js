const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('add-home',{ pageTitle: "Add Home"})
}

exports.postAddHome = (req, res, next)=>{

    const {houseName,price,location, rating} = req.body;

    const home = new Home(houseName,price,location, rating);
    home.save();

    res.render('homeadded', { pageTitle: "Home added"})
}
exports.getHome = (req, res, next)=>{
    const registeredHouse = Home.fetchAll();
    res.render('home', {registeredHouse: registeredHouse, pageTitle: "Airbnb Home"});
}
