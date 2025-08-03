# Dynamic Path

## What are The dynamic Paths:
**Path Parameters:**
- https://example.com/students/john/grades?order=asc
- here john is user id , which is dynamic.

**Query Parameters:**
- https://www.domain.com/page?key1=value1&key2=value2  

---

## Adding Home Details Page Using dynamic Path:
- Add Dynamic URL to the details button:
```html
<a 
href="/homes/<%= home.id %>"
class="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-md transition duration-300"
>
  Details
</a>
```
- Then give id to the homes:
- in your models:
```js
 this.id = Math.random().toString(); // add this in your save function.
```
- Now add controller and routes:
```js
// controller
exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    res.render('store/home-detail', { pageTitle: "Home Details", homeId: homeId});
};
```
```js
// routes
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
```

---

## Showing Real Home Data:
- Step1: In Home Model add a static findById Method that takes a callback.
```js
// in your models after fetchAll()
 static findById(homeId, callback) {
        this.fetchAll(homes =>{
            const home = homes.find(home => home.id === homeId);
            callback(home);
        })
    } 
```
- Step2: Use this findById method in the controller to load homr details & log them.
```js
// Update uor getHomeDetail Controller

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home=>{
        console.log(home);
        res.render('store/home-detail', { pageTitle: "Home Details", home: home });
    });
};
```
- Step3: if home not found the redirect to /home else render the home detail page with the data.
```js
// Update uor getHomeDetail Controller
exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home=>{
        if(!home) {
            res.redirect('/');
        } else {
            res.render('store/home-detail', { pageTitle: "Home Details", home: home });
        }
        
    });
};
```
```html 
<!-- to test in your home-details.ejs -->
 <main class="flex justify-center items-start min-h-screen bg-gray-100 px-4 pt-8">
   <p>Your Home Details for Home </p>
    <div class="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4"><%= home.houseName %></h1>
      <p class="text-gray-700 mb-2">Price: $<%= home.price %></p>
      <p class="text-gray-700 mb-2">Location: <%= home.location %></p>
      <p class="text-gray-700 mb-4">Rating: <%= home.rating %> stars</p>
  </main>
  <!-- Improve styling  -->
```
---

## Add to fav:
- Step1: Make a partial with a from & button that submits to /favourites path with ahidden input haiving home id value.
```html
<form action="/favourites">
    <button type="submit" class="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold py-1.5 px-1 rounded-lg transition duration-300">Add to favourites </button>
    <input type="text" name="id" value="<%= home.id %>"  hidden>
</form>
```
```html
<!-- add this partial to the home & details page -->
 <%- include('../partials/fav') %>
```
- add Router for handling POST request to /favourites path.
```js
storeRouter.post("/Favourites", storeController.addToFavourites);
```
- Make Controller for addToFavourites and log the body.
```js
exports.addToFavourites = (req, res, next) => {
    console.log(req.body);
    res.redirect('/favourites');
}
```
---

## Show the Fav Homes:
- Create a new Model to handel Favourites, with 2 static method getFevourites to read and return to the UI & addFavourites to add home to database.
```js
// fav model
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils')

const favDataPath= path.join(rootDir, 'data', 'fav.json');

module.exports = class fav {
     static addFavourites(id, callback) {
         fav.getFavourites((favourites) => {
                    if (favourites.includes(id)) {
                        console.log("Home already in favourites");
                    } else {
                        favourites.push(id);
                        const favDataPath= path.join(rootDir, 'data', 'fav.json');
                        fs.writeFile(favDataPath, JSON.stringify(favourites), callback);
                    }
                });  
     }
     static getFavourites(callback){
        fs.readFile(favDataPath, (err, data) => {
          callback(!err ? JSON.parse(data) : []);
        });
     }
    }
```
- update Controlller:
```js
exports.addToFavourites = (req, res, next) => {
    console.log(req.body);
    fav.addFavourites(req.body.id, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/favourites');
}
```
- Fetch the data in ui:
```js 
// update the controller
exports.getFavouritesList = (req, res, next) => {
    fav.getFavourites((favourites) =>{
        Home.fetchAll( (registeredHouse) => {
        const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, });
    });
}) 
};
```
```html
<!-- update the ui -->
```
---

## Edit Home:
- Step 1: Rename add-home.ejs to edit-home.ejs and fix the controller 
- Step 2: Now make url for the editing page:
```html
<a 
  href="/host/edit-home/<%= home.id %>?editing=true" 
  class="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
>
  Edit Home
</a>
```
- Step 3: Make Router & Controller:
```js
// HostRouter
hostRouter.get("/edit-home/:homeId", getEditHome);
```

```js
//hostController
exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId})
}
```
- Step 4: Update the controller to fetch the home detials & if not found then  redirect to /host/host-home-list otherwsie passing the data to view.
```js
exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId, home=>{
        if(!home) {
            console.log("Home not found");
            res.redirect('/host/host-home-list');
        } else {
            console.log("Home found", home);
            res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId, home: home});
        }
    })    
}
```
- Step5: Change The edit-home.ejs to show dynamic content:
-     a. Different submit path
-     b. Different button Text (Submit / Update)
-     c. Pre-filled values to edit.

```html
<!-- Make the title dynamic for editing and add home -->
  <p class="text-lg font-medium text-gray-700 mb-6"> <%= editing ? "Edit your home." : "Add your home." %></p>
```
- **Note** Update the getAddHome controller:
```js
exports.getAddHome =(req, res, next)=>{
    res.render('host/edit-home',{ pageTitle: "Add Home", editing: false})
}
```
```html
<!-- Change from Action -->
  <form action="/host/<%= editing ? 'edit-home/': 'add-home' %>" method="POST" class="space-y-4">

<!-- Update the Button -->
 <input 
    type="submit" 
    value="<%= editing ? 'Update' : 'Submit' %>" 
    class="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition"
  />
 ```html
 <!-- Show saved value to edit -->
  <input 
    type="text" 
    name="houseName" 
    value="<%= editing ? home.houseName : '' %>"
    placeholder="Enter your House Name" 
    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
    required
  />
  <!-- Update other inputs -->
  ```
  - Step 6: add a POST router & Controller for edit-home, which creates a home model object and save it before redirecting to /host/host-home-list. 

```js
// Router
hostRouter.post("/edit-home", postEditHome); 

// Controller
exports.postEditHome = (req, res, next)=>{

    const {id, houseName, price, location, rating} = req.body;

    const home = new Home(houseName,price,location, rating);
    home.id = id;
    home.save();

    res.redirect('host/host-home-list', { pageTitle: "Home List"})
}
```
- Step 7: Now update your save() at model to edti the data:
```js
save() {
        Home.fetchAll((registeredHouse) => {
            if(this.id) { // edit home
                registeredHouse = registeredHouse.map(home => {
                    if(home.id === this.id) {
                        return this; 
                    }
                    return home;

                });
            } else { // add home
                this.id = Math.random().toString();  
                registeredHouse.push(this); 
            }
              
            fs.writeFile(homeDataPath, JSON.stringify(registeredHouse), (err)=>{
            console.log(err)
        });
     });      
 }
 ``` 

---

## Delete Home:
1.29