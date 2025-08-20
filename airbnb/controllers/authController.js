const {check, validationResult} = require("express-validator");

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { 
        pageTitle: "login",
        isLoggedIn: false
    });
};
exports.getSignup = (req, res, next) => {
    res.render('auth/signup', { 
        pageTitle: "Sign Up",
        isLoggedIn: false,
        errors: [],
        oldInput: {firstName:"", lastName:"", email:"", password:"", userType: ""},

    });
};
exports.postSignup=[ 
    //FirstName Validation. Here First Name is mendetory to give by the user.
    check("firstName")
    .trim()
    .isLength({min:2})
    .withMessage("First Name Should be atleast 2 letters.")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name Should contain only letters."),

    //LastName Validation. Here Last Name is mendetory to give by the user.
    check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last Name Should contain only letters."),
    
    //For email
    check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

    // For Password
    check("password")
    .isLength({min: 8})
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

    //Confirm Password with castom validation 
    check("confirmPassword")
    .trim()
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

    check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(['guest', 'host'])
    .withMessage("Invalid user type"),

    check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, {req}) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
    return true;
    }),
    
    (req, res, next) => {
    const {firstName, lastName, email, password, userType} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {firstName, lastName, email, password, userType},
      });
    }
    res.redirect("/login");
  } 
]; 

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}; 

exports.postLogout = (req, res, next)=>{
    req.session.destroy(()=>{
       res.redirect('/');
    })
};

