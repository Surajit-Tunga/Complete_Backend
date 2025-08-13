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

### CConnecting with MongoDB Driver:
- Install mongodb in your projects.
```bash
npm install mongodb
```
-  Add your connection string into your application code:
```js
// in your databse utils

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "...........";

const mongoConnect = (Callback)=>{
   MongoClient.connect(url).then(client => {
      Callback(client);
   }).catch(error=>{
        console.log(error);
   });
}

module.exports = mongoConnect;
```
```js
// to use this import mongoConnect in App.js
const mongoConnect = require('./utils/databaseUtils');
//----------
const PORT = 3000;
mongoConnect( client =>{
    console.log(client);
    app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
  });
})
```


