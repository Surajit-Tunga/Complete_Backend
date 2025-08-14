# Introduction to SQL

### What is DataBase?
1. Store Data
2. Enable Data Management
3. Falicitate Quick Access
4. Ensure Data Integrity
5. Multi User Support
6. Secure Data

---

### What is SQL?
- SQL stands for Structured Query Language.
- Here Data is stores in structure.
- Data is organized into table with row & Columns.
- Predefiend structure.
- **vertical Scalability**
- Tables can have multiple Relations.
- **ACID:** Atomic, Consistantm Isolated & Durable. 

---

### What is NoSQL DB? (Not Only SQL)

- **Flexible Schema:** Allow for dynamic schemas,accommodating unstructured or semi-structured data without predefined structures.

- **Duplicacy over Relations:** Duplicates data across records (denormalization) to enhance performance and scalability, rather than relying on complex relationships and joins as in relational databases.

- **Horizontal Scalability:** Designed to scale out by adding more servers, handling large volumes of data efficiently.

- **Performance:** Optimized for high throughput and low latency, suitable for real-time applications.

- eg. MongoDB

---

### Sql vs NoSQL

![](../Note-Img/SQL.png)

### Installation: 
Go to this link and setup: [Install MySQL for Windows](https://dev.mysql.com/downloads/installer/)
- Do all the set up and make a schema named airbnb. 

---

#### Next: Connect this to our airbnb project:

- Step 1: Download mysql2
```bash
npm install mysql2
```
- Step2: In your utils make a folder called databaseUtil.js
```js 
const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'airbnb'
    }
);

module.exports = pool.promise();
```
- Step 3: Make SQL table in your database schema.

- Step 4: Querying homes data in App:
```js 
// in your app.js

//...test code
const db = require('./utils/databaseUtils');

db.execute('SELECT * FROM homes').then(([rows, fields]) =>{
    console.log(rows);
    console.log(fields);
})
.catch(error =>{
    console.log('Error While Running:', error)
}) // to test the database is conected or not.
```
- So, congrats!! your db is connected successfully.
- Then remove the test code & Continue.

---

### Adding DB in models
- Step 1: Remove all the file operations from models & Update controllers.
```js
// home.js
const db = require('../utils/databaseUtils');

module.exports = class Home {
    constructor(houseName, price, location, rating){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
    }
    static fetchAll() {
       return db.execute('SELECT * FROM homes');    
    }  
}
```
```js
// Store controller
exports.getHome = (req, res, next)=>{
        Home.fetchAll().then(([registeredHomes]) => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home"});
     })
}; // update the fetchall()

// do same for other where fetchall() is used.
```
Step 2: Do the same for all other file operation & Update the controllers

- Updated home.js model:
```js

const db = require('../utils/databaseUtils');

module.exports = class Home {
    constructor(houseName, price, location, rating, description, id){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
        this.description =description;
        this.id =id;
    }

    save() {
      if (this.id) { // for update
          return db.execute(
          'UPDATE homes SET houseName=?, location=?, price=?, rating=?, description=? WHERE id=?',
          [this.houseName, this.location, this.price, this.rating, this.description, this.id]
       );

      } else { // add new
          return db.execute(
          'INSERT INTO homes (houseName, location, price, rating, description) VALUES (?, ?, ?, ?, ?)',
          [this.houseName, this.location, this.price, this.rating, this.description]
       );
     }
   }

    static fetchAll() {
       return db.execute('SELECT * FROM homes');    
    } 

    static findById(homeId) {
      return db.execute('SELECT * FROM homes WHERE id=?', [homeId]); 

      }

    static deleteById(homeId) {
      return db.execute('DELETE FROM homes WHERE id=?', [homeId]); 
      }  
    }
```
- Updated storeController:
```js
const fav = require("../models/fav");
const Home = require("../models/home");

exports.getHome = (req, res, next)=>{
        Home.fetchAll().then(([registeredHomes]) => {
            res.render('store/home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Home"});
     })
};

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', { pageTitle: "Your Bookings" });
};

exports.getFavouritesList = (req, res, next) => {
    fav.getFavourites((favourites) =>{
        Home.fetchAll().then(([registeredHomes]) => {
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
    Home.findById(homeId).then(([homes]) =>{
        const home = homes[0];
        if(!home) {
            res.redirect('/');
        } else {
            res.render('store/home-detail', { pageTitle: "Home Details", home: home });
        }
        
    });
};
```
- Updated hostController:
```js
const Home = require("../models/home");

exports.getAddHome =(req, res, next)=>{
    res.render('host/edit-home',{ pageTitle: "Add Home", editing: false})
}

exports.getEditHome =(req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
        Home.findById(homeId).then(([homes]) =>{
        const home = homes[0];
        if(!home) {
            res.redirect('/host/host-home-list');
        } else {
            res.render('host/edit-home',{ pageTitle: "Edit Home", editing: editing, homeId: homeId, home: home});
        }
    })    
}

exports.getHostHome = (req, res, next)=>{
      Home.fetchAll().then(([registeredHomes]) => {
          res.render('host/host-home-list', {registeredHouse: registeredHomes, pageTitle: "Airbnb Host"});
    });
}
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, description} = req.body;
    const home = new Home(houseName,price,location, rating, description);
    home.save();
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
- Fav Sec is not implemented here.

