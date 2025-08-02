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
    console.log(homeId);
    res.render('store/home-detail', { pageTitle: "Home Details", homeId: homeId});
};
```
```js
// routes
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
```

---