# Cookies & Sessions

## Cookies
- Cookies are the small pieces of data stored in user's browser by Server.
- They help website to remember user information & preferences between page loads & visits.
- Cookies can manage user sessions & store data for personalized experiences. 

---

## Adding Login Functionality
1. Add a login Button in nav bar pointing to /login  & login page
```html
<!-- In your nav -->
    <a href="/login" class="text-white text-lg hover:underline">Log in</a>
```

```html
<!-- in your views make a auth folder & make login.ejs -->
 <%- include('../partials/head') %>
  </head>
  <body>
    <%- include('../partials/header') %>
    <main class="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Login with your info</h1>
      <form action="/login" method="POST" class="max-w-md mx-auto">
        <input
          type="text"
          name="username"
          placeholder="Email/Username"
          class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required/>
        <input type="submit" value="Sign In" class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300" />
      </form>
    </main>
  </body>
</html>
```

2. Create Auth Router , controllers to handle login  & Register the new router in app.js.& Assume the person is logged in and redirect to home page.

```js
//make authRouter.js
const express = require('express');
const authRouter = express.Router();

const { getLogin} = require('../controllers/authController');

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

exports.authRouter = authRouter;
```

```js
// Make a authControler
exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: "login" });
};
exports.postLogin = (req, res, next) => {
    res.redirect('/');
};
```
```js
// regiser this router in app.js
app.use(storeRouter);
app.use("/host",hostRouter);
app.use(authRouter);
app.use(notFound);
```
---

## Checking Login State

1. Add a isLoggedIn field in the req object in autho controller:
```js
exports.postLogin = (req, res, next) => {
    console.log(req.body);
    req.isLoggedIn = true;
    res.redirect('/');
};
```
2. Update Nav such that without login only home & login page is visible
```html
 <div class="bg-red-600 shadow-md py-4 px-8 flex justify-between items-center">
  <h1 class="text-3xl font-bold text-white">Airbnb</h1>
  <nav class="space-x-4">
    <a href="/" class="text-white text-lg hover:underline">Home</a>
  <% if(isLoggedIn) { %>  
    <a href="/bookings" class="text-white text-lg hover:underline">Bookings</a>
    <a href="/favourites" class="text-white text-lg hover:underline">Favourites</a>
    <a href="/host/host-home-list" class="text-white text-lg hover:underline">Host Homes</a>
    <a href="/host/add-home" class="text-white text-lg hover:underline">Add Home</a>
  <% } %>  
    <a href="/login" class="text-white text-lg hover:underline">Log in</a>
  </nav>
</div>
```
3. Fix the render calls to send flag (isLoggedIn):
```js 
// add isLoggedIn: req.isLoggedIn in all your render calls
exports.getHome = (req, res, next)=>{
        Home.find().then(registeredHomes => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home",isLoggedIn: req.isLoggedIn});
     })
};
```

4. Add a middleware for host req that if the user is not logged in they should be redirected to the login page:
```js
// update app.js
app.use(authRouter);
app.use(storeRouter);


app.use("/host", (req, res, next)=>{
  if(req.isLoggedIn){
    next();
  } else {
    res.redirect("/login");
  }
});


app.use("/host",hostRouter);
app.use(notFound);
```
---

**Note** But this will not work. Because every req is different. in postLogin req the isLoggedIn is true but when browser render the page it is a other req that does not know about the isLoggedIn. In this Case we use Cookies.

---

## Uses of Cookies

1. Set the cookie on successfull loggedin
```js
// in your authcontroller 
exports.postLogin = (req, res, next) => {
    console.log(req.body);
    res.cookie("isLoggedIn", true);
    res.redirect('/');
};
```
2. Read the cookie

```js
app.use(express.static(path.join(rootDir, 'public')));

//update this in your app
app.use((req, res, next)=>{
  req.isLoggedIn = req.get('cookie')?.split('=')[1] || false;
  next();
});


app.use(authRouter);
```
---

## LogOut Feature

1. After login replace the login with logout button:
```html
<% if(!isLoggedIn) { %> 
    <a href="/login" class="text-white text-lg hover:underline">Log in</a>
   <% } else {%> 
     <form action="/logout" method="POST">
        <button
          type="submit"
          class="text-white text-lg hover:underline">
            Logout
        </button>
      </form>
   <% } %> 
```
2. Define Routes & Controllers:
```js
authRouter.post("/logout", postLogout);
```
```js
exports.postLogout = (req, res, next)=>{
    res.clearCookie("isLoggedIn");
    res.redirect('/');
};
```
---

## Problem with Cookies
1. Cookies can be intercepted or stolen, posing security risks.
2. They have limited storage capacity (about 4KB).
3. Users can delete or modify cookies, leading to data loss or tampering.
4. Data in cookies is not encrypted, making sensitive information vulnerable.
5. Storing important info in cookies exposes it to client-side attacks.

---

## What is Sessions
1. Sessions are server-side storage mechanisms that track user interactions with a website.
2. They maintain user state & data across multiple requests in a web application.
3. Sessions enable persistant user experiences by maintaining state between the client & server over stateless HTTP.

---

## Using Sessions

1. Installing express-session
```bash
npm install express-session
```
2. Add it to app.js
```js
const session = require('express-session');
//-----

app.use(express.urlencoded());

app.use(session({
  secret: "Complete Backend",
  resave: false,
  saveUninitialized: true
}));
//---
```
---
## Creating Sessions
1. Set the session replacing the cookie
```js
exports.postLogin = (req, res, next) => {
    console.log(req.body);
    req.session.isLoggedIn = true;
    res.redirect('/');
};
```
2. Update your app.js
```js
app.use((req, res, next)=>{
  req.isLoggedIn = req.get('cookie')?.split('=')[1] || false;
  next();
});

// Replace by this --

app.use((req, res, next)=>{
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
```
---

## Saving Session in DB 7.10

