const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('host/edit-home',{ pageTitle: "Add Home", editing: false})
}

exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    Home.findById(homeId, home=>{
        if(!home) {
            res.redirect('/host/host-home-list');
        } else {
            res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId, home: home});
        }
    })    
}

exports.getHostHome = (req, res, next)=>{
    const registeredHouse = Home.fetchAll((registeredHouse) => {
          res.render('host/host-home-list', {registeredHouse: registeredHouse, pageTitle: "Airbnb Host"});
    });
}
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating} = req.body;
    const home = new Home(houseName,price,location, rating);
    home.save();
    res.redirect('/host/host-home-list');
}

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating} = req.body;
    const home = new Home(houseName,price,location, rating);
    home.id = id;
    home.save();
    res.redirect('/host/host-home-list');
}

exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    Home.deleteById(homeId , error =>{
        if(error) {
            console.log(error);
        }
     res.redirect('/host/host-home-list');
    });
}
