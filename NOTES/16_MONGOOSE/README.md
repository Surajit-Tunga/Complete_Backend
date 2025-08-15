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
2. Update esisting data modele with new home Schema.

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
3. Update the controllers