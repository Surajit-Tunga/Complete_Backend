
exports.getLogin = (req, res, next) => {
    res.render('auth/login', { 
        pageTitle: "login",
        isLoggedIn: false
    });

};

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    req.session.isLoggedIn = true;
    res.redirect('/');
}; 

exports.postLogout = (req, res, next)=>{
    res.clearCookie("isLoggedIn");
    res.redirect('/');
};

