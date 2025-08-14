const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('host/edit-home',{ pageTitle: "Add Home", editing: false})
}

exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
        Home.findById(homeId).then(home =>{
        if(!home) {
            res.redirect('/host/host-home-list');
        } else {
            res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId, home: home});
        }
    })    
}

exports.getHostHome = (req, res, next)=>{
      Home.fetchAll().then(registeredHomes => {
          res.render('host/host-home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Host"});
    });
}
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, description} = req.body;
    const home = new Home(houseName,price,location, rating, description);
    home.save().then(()=>{
        console.log('Home saved.');
    });
    res.redirect('/host/host-home-list');
}

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, description} = req.body;
    const home = new Home(houseName,price,location, rating, description, id);
    home.save().then(result =>{
        console.log('Home Updated', result);
    });
    res.redirect('/host/host-home-list');
}

exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    Home.deleteById(homeId).then(
        ()=> {
            res.redirect('/host/host-home-list');
        }
    ).catch(error => {
        console.log(error)
    })   
}
