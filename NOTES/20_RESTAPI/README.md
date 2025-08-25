# REST API

## What are Async Requests?
1. Async network requests enable web pages to communicate with server without reloading.
2. The client sends JSON request to the server asynchronously in single page apps.
3. The server process the request & return JSON response.
4. The Page update dynamically with the reciving data.

---
## What is REST API?
1. REST APIs enable communication between clients and servers using HTTP.
2. They are mainly identified by a URI.
3. They use standard HTTP methods like GET, POST, PUT(Update), and DELETE.
4. Data is exchanged in formats like JSON or XML.
5. REST APIs are stateless.
6. REST APIs allow clients to access and manipulate web resources.

---
## Decoupling Frontend & Backend:
1. Separating front-end and back-end allows independent development and scaling.
2. REST APIs serve as a communication layer between them.
3. Front-end interacts with back-end through standardized RESTful calls.
4. Decoupling enhances flexibility and simplifies maintenance.
5. REST APIs enable front-end updates without altering back-end code.

---
## Routes & HTTP Methods
1. REST API routes define the endpoints (URLs) where resources can be accessed by clients.
2. GET: Retrieves data from the server at the specified route.
3. POST: Sends new data to the server to create a resource.
4. PUT: Updates or replaces an existing resource at a given route.
5. DELETE: Removes a resource from the server at the specified route.
6. PATCH: Partially updates an existing resource with new data.

---
## REST Core Concepts:
1. Statelessness: Each request contains all necessary information; the server maintains no client session.
2. Uniform Interface: Standardized communication using HTTP methods like GET, POST, PUT, DELETE.
3. Client-Server Separation: Independent development of front-end and back-end components.
4. Cacheability: Responses indicate if they can be cached to improve performance.
5. Layered System: Architecture allows for multiple layers between client and server.
6. Code on Demand (Optional): Servers can extend client functionality by sending executable. 
---

# Creating A TODO APP

## Initial Setup

- Make two separate folder for frontend & backend then clone the above repo in frontend.
- **Clone The Repo:** [todoapp](https://github.com/Complete-Coding/React_Complete_YouTube/tree/main/Projects/6-todo-app-version-three)
- From the airbnb project cpoy the backend required structure.

## Implementaion

### Add 404 Handling
- In backend/controller/error.js
```js
exports.notFound = (req, res, next)=>{
  res.status(404).json({message: "Page Not Found"});
}
```
### Creating Mongoose model for todoitem
- In backend/models/Todoitem.js
```js
const mongoose = require("mongoose");

const todoItemSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", todoItemSchema);
```
### Make Routes & Controller 
- In backend/routes/todoItemsRouter.js
```js
// External Module
const express = require("express");
const todoItemsRouter = express.Router();

// Local Module
const todoItemsController = require("../controllers/todoItemsController");

todoItemsRouter.get("/", todoItemsController.getTodoItems);
todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id/completed", todoItemsController.markCompleted);

module.exports = todoItemsRouter;
```
- In backend/controllers/todoItemsControllers.js
```js
const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  console.log(req.body);
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
}

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.json(todoItems);
}

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(204).json({_id: id});
}

exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.json(todoItem);
}
```
**Install cros**
```bash
npm install cors
```
### Update App.js
```js
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
```
