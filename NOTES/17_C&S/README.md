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

2. Create Auth Router to handle login routes , controllers & Register the new router in app.js

```js
//make authRouter.js
const express = require('express');
const authRouter = express.Router();

const { getLogin} = require('../controllers/authController');

authRouter.get("/login", getLogin);

exports.authRouter = authRouter;
```

```js
// Make a authControler
exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: "login" });
};
```
```js
// regiser this router in app.js
app.use(storeRouter);
app.use("/host",hostRouter);
app.use(authRouter);
app.use(notFound);
```


