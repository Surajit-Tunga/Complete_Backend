//core modules
const path = require('path');

// External Module
const express= require('express');
const { default: mongoose } = require('mongoose');
const DB_PATH ="mongodb+srv://Surajit:root@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import Routes
const { notFound } = require('./controllers/error');


const app = express();









app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));

app.use(notFound);


const PORT = 3000;
mongoose.connect(DB_PATH).then(()=>{  
    app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
  });
}).catch(err=>{
  console.log(err);
})