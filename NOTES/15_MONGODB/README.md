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

const url = "mongodb+srv://Surajit:root@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
- **step3:** Update models with mongodb
3.58

