# Introduction to MONGODB

## What is MongoDB?
1. **MongoDB** is the product and the company that builds it.

2. The name comes from the work Humongous.

3. **NoSQL Document Database:** Stores data in flexible, JSON-Like documents.

4. **Dynamic Schema:** Allows fields to vary across documents without predefined schemas.

5. **High Performance:** Optimized for fast read and write operations.

6. **Scalability:** Supports horizontal scaling through sharding.

7. **High Availability:** Provides replication with automatic failover.

8. **Rich Query Capabilities:** Offers powerful querying, indexing, and aggregation.

9. **Geospatial and Text Search:** Includes support for location-based and full-text queries.

10. **Cross-Platform Compatibility:** Works with various operating systems and programming languages.

11. **Easy Integration:** Integrates smoothly with modern development stacks.

---

## Connections:
- Create a free cluster in mongodb.
- Then connect with the database.

### Connecting with MongoDB Driver:
- **Step1:** Install mongodb in your projects.
```bash
npm install mongodb
```
- **step2:**  Add your connection string into your application code:
```js
// in your databse utils

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "...."; // give the connection url

let _db;

const mongoConnect = (Callback)=>{
   MongoClient.connect(url).then(client => {
      Callback();
      _db= client.db('airbnb');
   }).catch(error=>{
        console.log(error);
   });
}

const getDB = ()=>{
    if(!_db){
        throw new Error('Mongo not found');
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
```
```js
// to use this import mongoConnect in App.js
const {mongoConnect} = require('./utils/databaseUtils');
//----------
const PORT = 3000;
mongoConnect( () =>{
    app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
  });
})
```
### Connectting with Mongo Compass & MongoDB for VS Code:
- Download mongodb compass in your pc.
- Go to your Cluster click on connect.
- In **Access your data tools** sec select compass & Follow the steps to setup.
- In your vs code extention download mongodb of vs code extention & In **Access your data tools** sec select MongoDB for  vs code & Follow the steps to setup.
- Here you can see your data & many other things you can explore.

---

## Update models with mongodb & fix controllers
```js 
const { ObjectId } = require('mongodb');
const {getDB} = require('../utils/databaseUtils');

module.exports = class Home {
    constructor(houseName, price, location, rating, description, _id){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
        this.description =description;
        if (_id){
        this._id =_id;
        }
    }

    save() {
      const db = getDB();
      return db.collection('homes').insertOne(this);
    }

    static fetchAll() {
      const db = getDB();
      return db.collection('homes').find().toArray();
    } 

    static findById(homeId) {
      const db = getDB();
      return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();
    }

    static deleteById(homeId) {
      const db = getDB();
      return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});      
    }  
}
```
```js
//HostController
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
      Home.fetchAll().then(registeredHomes => {
          res.render('host/host-home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Host"});
    });
}
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, description} = req.body;
    const home = new Home(houseName,price,location, rating, description);
    home.save().then(()=>{
        console.log('Home saved.');
    });
    res.redirect('/host/host-home-list');
}

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, description} = req.body;
    const home = new Home(houseName,price,location, rating, description, id);
    home.save();
    res.redirect('/host/host-home-list');
}

exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    Home.deleteById(homeId).then(
        ()=> {
            res.redirect('/host/host-home-list');
        }
    ).catch(error => {
        console.log(error)
    })   
}
```

```js
//storeController
const fav = require("../models/fav");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.fetchAll().then(registeredHomes => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home"});
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};

exports.getFavouritesList = (req, res, next) => {
    fav.getFavourites((favourites) =>{
        Home.fetchAll().then(registeredHomes => {
        const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id));
        res.render('store/fav-list', { pageTitle: "Your Favourites", favouriteHomes: favouriteHomes, });
    });
  }) 
};

exports.addToFavourites = (req, res, next) => {
    fav.addFavourites(req.body.id, (err) => 
        {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/favourites');
};

exports.deleteFromFavourites = (req, res, next) => {
    const homeId = req.params.homeId;
    fav.deleteById(homeId, err => {
        if (err) {
            console.log(err);
        } 
        res.redirect('/favourites');
    })
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
- **note** Replace home.id with home._id for mongoDB.

---

