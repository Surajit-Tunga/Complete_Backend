# Model View Controller

## Separation of Concerns
- **MVC stands for Model-View-Controller:** A software architectural pattern for developing user interfaces.
- **Model:** Manages the data and business logic of the application.
- **View:** Handles the display and presentation of data to the user.
- **Controller:** Processes user input, interacts with the Model, and updates the View accordingly.
- Routes are a part of Controllers.
- **Purpose:** MVC separates concerns within an application, making it easier to.
![MVC](../Note-Img/mvc.png)

---

## How to add Controllers?
- Make a folder called controller and make your controllers there.
- eg.
- controllers/homes.js
```js
exports.getAddHome =(req, res, next)=>{
    res.render('add-home',{ pageTitle: "Add Home"})
}
const registeredHouse =[];
exports.postAddHome = (req, res, next)=>{
    registeredHouse.push(req.body);
    res.render('homeadded', { pageTitle: "Home added"})
}
```
- Update Routes:
- hostRouter.js
```js
const express = require('express');
const hostRouter = express.Router();

const { getAddHome, postAddHome } = require('../controllers/homes');

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home",postAddHome);

exports.hostRouter =hostRouter;
```
---

## How to Add Models?
10.37