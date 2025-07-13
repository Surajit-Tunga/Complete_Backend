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
