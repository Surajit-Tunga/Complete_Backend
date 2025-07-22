const registeredHouse =[];

exports.getAddHome =(req, res, next)=>{
    res.render('add-home',{ pageTitle: "Add Home"})
}

exports.postAddHome = (req, res, next)=>{
    registeredHouse.push(req.body);
    res.render('homeadded', { pageTitle: "Home added"})
}
exports.getHome = (req, res, next)=>{
    res.render('home', {registeredHouse: registeredHouse, pageTitle: "Airbnb Home"});
}
