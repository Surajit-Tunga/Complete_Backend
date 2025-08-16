exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: "login" });
};

exports.postLogin = (req, res, next) => {
    res.redirect('/');
};