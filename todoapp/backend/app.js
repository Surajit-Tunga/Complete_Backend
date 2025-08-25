//core modules
const path = require('path');

// External Module
const express= require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const DB_PATH ="mongodb+srv://Surajit:root@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import Routes
const { notFound } = require('./controllers/error');
const todoItemsRouter = require("./routes/todoItemsRouter");


const app = express();

app.use(express.urlencoded());
app.use(express.urlencoded());
// Middleware to parse incoming JSON requests 
// (so req.body can be accessed as a JavaScript object)
app.use(express.json());  

// Middleware to enable CORS (Cross-Origin Resource Sharing)
// This allows requests from different domains (e.g., frontend on localhost:3000 calling backend on localhost:5000)
app.use(cors());


app.use("/api/todo", todoItemsRouter);
app.use(notFound);


const PORT = 3000;
mongoose.connect(DB_PATH).then(()=>{  
    app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
  });
}).catch(err=>{
  console.log(err);
});