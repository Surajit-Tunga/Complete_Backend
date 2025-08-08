# Dynamic UI Using EJS

- **Dynamic UI:** Changes in run time or as per user. (eg. diff feed of different in instagram).
- **EJS:** Embaded JavaScript

## Why we need Dynamic UI?
- Personalized Content.
- Dynamic Data Delivery: Provides real time info.
- Security & Access control.
- Localization: Adjust response as per language, culture..
- API Versatility: Support Multi client types (web, mobile,iot).

---

## Sharing useing Global Variable

- HostRoter:
```js
const path = require('path');
const express = require('express');
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtils")

hostRouter.get("/add-home",(req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'add-home.html'))
})

const registeredHouse =[];

hostRouter.post("/add-home",(req, res, next)=>{
    registeredHouse.push({houseName: req.body.houseName});
    res.sendFile(path.join(rootDir, 'views', 'homeadded.html'))
})

exports.hostRouter =hostRouter;
exports.registeredHouse= registeredHouse;
```
- userRouter:
```js
const path = require('path');

const express = require('express');
const userRouter = express.Router();

const rootDir = require("../utils/pathUtils");
const { registeredHouse } = require('./hostRouter');

userRouter.get("/",(req, res, next)=>{
    console.log(registeredHouse);
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
})

module.exports =userRouter;
```
---

## EJS
- EJS let's you embad JS within html.
- USe <% %> for control flow & <%= %> for output.
- Easy to Learn.
- Flexible logic

### Installation
```bash
npm install --save ejs
```
- in your app.js
```js
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // if you give other name isteed of view replace it.
```
### Hou to Use:
- Rename Home.htm to home.ejs and add
```html
<main class="flex items-center justify-center h-[80vh]">
  <div class="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Here are the Homes</h2>
    <ul class="space-y-2 text-left">
      <% registeredHouse.forEach(home => { %>
        <li class=" p-3 rounded-lg shadow hover:bg-gray-200 transition">
          🏠 <%= home.houseName %>
        </li>
      <% }) %>
    </ul>
  </div>
</main>
```
- In your userRouter:
```js
const path = require('path');

const express = require('express');
const userRouter = express.Router();

const rootDir = require("../utils/pathUtils");
const { registeredHouse } = require('./hostRouter');

userRouter.get("/",(req, res, next)=>{
    res.render('home', {registeredHouse: registeredHouse});
})

module.exports =userRouter;
```
- Change the tailwind.config.js
```js
content: ["./views/**/*.ejs", "./views/**/*.html"],
```
---

## Working with Partials
- If you want to re-use any part of your code then:
- make a folder called partials under views & create your partials there.
- eg. head.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><%= pageTitle %></title>
  <link rel="stylesheet" href="/output.css" />
```
- Now the head is reuseable:  like this:
- home.ejs
```html
<%- include('partials/head') %>
</head>
<body class="min-h-screen bg-gray-100">
  <!-- Rest of your code -->
```
---