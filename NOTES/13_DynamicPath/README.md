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

## add to fav:
- Step1: Make a partial with a from & button that submits to /favourites path with ahidden input haiving home id value.
