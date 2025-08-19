
exports.getLogin = (req, res, next) => {
    res.render('auth/login', { 
        pageTitle: "login",
        isLoggedIn: false
    });
};
exports.getSignup = (req, res, next) => {
    res.render('auth/signup', { 
        pageTitle: "Sign Up",
        isLoggedIn: false
    });
};
exports.postSignup= (req, res, next) => {
    res.redirect('/');
}; 

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}; 

exports.postLogout = (req, res, next)=>{
    req.session.destroy(()=>{
       res.redirect('/');
    })
};

