# Introduction to Mongoose

## What is Mongoose:
![](../Note-Img/mongoose.png)

- Mongoose is an Object Data Modeling library for MongoDB & Node.js.
- Provides a schema-based solution to model application data.
- Simplifies data validation & type casting.
- Enables easy interaction to mongoDB.
- Supports middleware for pre & post processing data.

### Setting up with mongoose:
1. Install mongoose packages:

```bash
npm install mongoose
```
2. Update app.js to connect with mongoose:
```js
const { default: mongoose } = require('mongoose');
// keep other same

const PORT = 3000;
const DB_PATH ="mongodb+srv://............@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_PATH).then(()=>{  
    app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
  });
}).catch(err=>{
  console.log(err);
});
```
3. Now you can delet databaseutils & its usages.

---

## Update the project with mongoose

1. Delete the esisting airbnb database.
2. Update esisting data model with new home Schema.

```js
// home.js model
const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
  houseName: {type: String, required: true},
  price: {type: Number, required: true},
  location: {type: String, required: true},
  rating: {type: Number, required: true},
  description: String,
});

module.exports = mongoose.model('Home', homeSchema);

```
3. Update esisting fav data model
```js
const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
 houseId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Home',
  required: true,
  unique: true
 }
});

module.exports = mongoose.model('Fav', favSchema);
```

4. Now update the Controllers:
```js 
// hostController
const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('host/edit-home',{ pageTitle: "Add Home", editing: false})
}

exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
        Home.findById(homeId).then(home =>{
        if(!home) {
            res.redirect('/host/host-home-list');
        } else {
            res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId, home: home});
        }
    })    
}

exports.getHostHome = (req, res, next)=>{
      Home.find().then(registeredHomes => {
          res.render('host/host-home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Host"});
    });
}
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, description} = req.body;
    const home = new Home({houseName,price,location, rating, description});
    home.save().then(()=>{
        console.log('Home saved.');
    });
    res.redirect('/host/host-home-list');
}

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, description} = req.body;
    Home.findById(id).then((home)=>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;
        home.save().then(result =>{
        console.log('Home Updated', result);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect('/host/host-home-list');   
  }).catch(err=>{
        console.log(err);
    })    
}

exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    Home.findByIdAndDelete(homeId).then(
        ()=> {
            res.redirect('/host/host-home-list');
        }
    ).catch(error => {
        console.log(error)
    })   
} 
```

```js
// storeController
const fav = require("../models/fav");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.find().then(registeredHomes => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home"});
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};

exports.getFavouritesList = (req, res, next) => {
    fav.find().then(favourites =>{
        favourites = favourites.map(fav => fav.houseId.toString())
        Home.find().then(registeredHomes => {
        const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id.toString()));
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, });
    });
  }) 
};

exports.addToFavourites = (req, res, next) => {
    const homeId = req.body.id;
    fav.findOne({houseId: homeId}).then((Favourite)=>{
        if (Favourite) {
        console.log("Already in fav list.");
        res.redirect('/favourites');
        } else {
            Favourite = new fav({houseId: homeId});
            Favourite.save().then(result => {
        console.log('added to fav');
    })
      res.redirect('/favourites');
        }
    }).catch(err =>{
     console.log(err);
    });   
};

exports.deleteFromFavourites = (req, res, next) => {
    const homeId = req.params.homeId;
    fav.findOneAndDelete({houseId: homeId}).then(result => {
        console.log('removed');
    }).catch(err => {
        console.log(err);
    }).finally(()=>{
        res.redirect('/favourites');
    }); 
}

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home =>{
        if(!home) {
            res.redirect('/');
        } else {
            res.render('store/home-detail', { pageTitle: "Home Details", home: home });
        }
        
    });
};
```
- **Note:**
- save(), find(),.... this are the built in function of mongoose

## Deletee from fav list when host delete home:
```js 
// in your home model
const fav = require('./fav');

//----
homeSchema.pre('findOneAndDelete', async function(next){
  const homeId = this.getQuery()["_id"];
  await fav.deleteMany({homeId: homeId});
  next();
});
```
---

## Fetching Relations:
- Currently our getfavlist is filtering all the homes for one id for learg db its not good.

```js
exports.getFavouritesList = (req, res, next) => {
    fav.find().populate("houseId").then((favourites) =>{
        const favouriteHomes = favourites.map((favourite)=> favourite.houseId);
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, });
  }); 
};
```
