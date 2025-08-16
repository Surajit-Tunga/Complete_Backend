exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: "login" });
};