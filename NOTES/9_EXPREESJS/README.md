# ExpressJS

## What is Express.js
- It is minimal and flexible web application framework for Node.js.
- Ii provides a robust set of features for building single page, multi-page, and hybrid web application.
- It simplifies server side coading by providing a layer of fundamental web application feature.

---

## Need of Express.js
- It Simplifes Server Creation.
- Routing Management.
- Middleware Support.
- API Development.
- Community & Plugins.

---

## Insatlling Express.js:

```bash
npm install express
```
### Creating Server:
- app.js
```js
const express = require('express');

const app = express();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on Localhost:${PORT}`);
});
```
---

## Adding Middleware

![](../Note-Img/middleware.png) 

- we need to give perfect order of the middlewares.

```js 
const express = require('express');

const app = express();

app.use((req, res, next)=>{
    console.log("Came in First middleware", req.url, req.method);
    next();
})

app.use((req, res, next)=>{
    console.log("Came in second middleware", req.url, req.method);
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on Localhost:${PORT}`);
});
```
---

![](../Note-Img/md.png) 

## Sending Response

```js

app.use((req, res, next)=>{
    console.log("Came in second middleware", req.url, req.method);
    res.send('<p>Welcome to middleware</p>');
})
```
- It will send response to the user in browser.

---

## Handling Routes

```js
app.use("/",(req, res, next)=>{
    console.log("Came in First middleware", req.url, req.method);
    next() // here no next is present because the next middleware is for /submit-details.
})

app.use("/submit-details",(req, res, next)=>{
    console.log("Came in second middleware", req.url, req.method);
     res.send('<p>Welcome to middleware</p>');
})
```
- Order Matters.
- can not call next() after send()
- "/ " matches everything 
- calling res.send() imlicitly calls res.end().

## Practice Set
- Create a new project.

1. Install nodemon and express.

2. Add two dummy middleware that logs request path and request method respectively.

3. Add a third middleware that returns a response.

4. Now add handling using two more middleware that handle path /, a request to /contact-us page.

5. Contact us should return a form with name and email as input fields that submits to /contact-us page als

6. Also handle POST incoming request to /contact-u path using a separate middleware.

<details>
   <summary>See Solution (click to expand)</summary>

   ```js
    const express = require('express');

const app = express();

// middleware 1 
app.use((req, res, next)=> {
    console.log("First Middleware",req.url, req.method);
    next();
})

// middleware 2
app.use((req, res, next)=> {
    console.log("Second Middleware",req.url, req.method);
    next();
})

// middleware 3
// app.use((req, res, next)=> {
//     console.log("Third Middleware",req.url, req.method);
//     res.send("<p>Welcome to 3rd Middleware</p>")
// })

app.get("/",(req, res, next)=> {
    console.log("/ Middleware",req.url, req.method);
   res.send("<p>Welcome to / Middleware</p>")
})

app.get("/contact",(req, res, next)=> {
    console.log("contact Middleware",req.url, req.method);
   res.send(`
    <p>contact us</p>
    <form action="/contact" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <input type="submit"/>
    </form>
    
    
    `)
})

app.post("/contact",(req, res, next)=> {
    console.log("contact post Middleware",req.url, req.method);
     res.send("<p>Thank you for contact us.</p>")
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`The Server is running on http://localhost:${PORT}`);
});
   ```
</details>   

## Parsing Request

```bash
npm install body-parser
```
```js
const bodyParser = require('body-parser');

//----
app.get("/contact",(req, res, next)=> {
    console.log("contact Middleware",req.url, req.method);
   res.send(`
    <p>contact us</p>
    <form action="/contact" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <input type="submit"/>
    </form>
    `)
})

app.use(bodyParser.urlencoded());

app.post("/contact",(req, res, next)=> {
    console.log("contact post Middleware",req.url, req.method, req.body);
     res.send("<p>Thank you for contact us.</p>")
})

//---
```

## Express Router

- Make a folder called routes and make your routes there 
- eg. 
- Routes/userRouter.js
```js
const express = require('express');
const userRouter = express.Router();

userRouter.get("/",(req, res, next)=>{
    res.send(`
        <p>Welcome to airbnb</p>
        <a href="/host/add-home">Add Home</a>
        `)
})

module.exports =userRouter;
```
- Routes/hostRouter.js
```js
const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/host/add-home",(req, res, next)=>{
    res.send(`
        <P>Plese add your home.</p>
        <form action="/host/add-home" method="POST">
          <input type="text" name="houseName" placeholder="Enter your House Name" />
          <input type="submit"/>
       </form>
        `)
})

hostRouter.post("/host/add-home",(req, res, next)=>{
    console.log(req.body);
    res.send(`
        <P>Home added succesfully.</p>
        <a href="/">Home</a>
        `)
})

module.exports =hostRouter;
```
- app.js
```js
// External Module
const express= require('express');

// Import Routes
const userRouter =require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');


const app = express();

app.use(express.urlencoded());

// It is a middleware in Express.js used to parse incoming requests with URL-encoded payloads, typically from HTML form submissions.
// The parsed data is available on req.body.

app.use(userRouter);
app.use(hostRouter);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
}) 
```
## Adding  404

```js
//after  Middleware
 app.use((req, res, next)=>{
    res.status(404).send("<p>404 Page not found</p>")
})
```
## Common Paths
```js

app.use("/user",userRouter);
app.use("/host",hostRouter);

```

## Adding HTML Files
- Make views folder & create your html files there.
```js
const path = require('path');


const express = require('express');


const userRouter = express.Router();

userRouter.get("/",(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'))
})

module.exports =userRouter;
```
## Using Path Helper
- Create a folder called utils.
- utils/path.js
```js
const path = require('path');

module.exports = path.dirname(require.main.filename);
```
- in your routes
```js
const path = require('path');

const express = require('express');
const userRouter = express.Router();

const rootDir = require("../utils/pathUtils")

userRouter.get("/",(req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
})

module.exports =userRouter;
```
---
## Practise Set
- Reuse the app from the last assignment

1. Parse the body of the contact-us request and log it to console.

2. Move the code to separate local modules and use the Express router to import and use them in app.js

3. Move all the html code to html files and serve them using the file helper.

4. Also add a 404 page for this app.

-- [9. EXPREES JS ](PS/PS4)