const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('host/edit-home',{ pageTitle: "Add Home",isLoggedIn: req.isLoggedIn, editing: false})
}

exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
        Home.findById(homeId).then(home =>{
        if(!home) {
            res.redirect('/host/host-home-list');
        } else {
            res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId, home: home, isLoggedIn: req.isLoggedIn});
        }
    })    
}

exports.getHostHome = (req, res, next)=>{
      Home.find().then(registeredHomes => {
          res.render('host/host-home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Host", isLoggedIn: req.isLoggedIn});
    });
}
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, description} = req.body;
    const home = new Home({houseName,price,location, rating, description});
    home.save().then(()=>{
        console.log('Home saved.');
    });
    res.redirect('/host/host-home-list');
}

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, description} = req.body;
    Home.findById(id).then((home)=>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;
        home.save().then(result =>{
        console.log('Home Updated', result);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect('/host/host-home-list');   
  }).catch(err=>{
        console.log(err);
    })    
}

exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    Home.findByIdAndDelete(homeId).then(
        ()=> {
            res.redirect('/host/host-home-list');
        }
    ).catch(error => {
        console.log(error)
    })   
} 
