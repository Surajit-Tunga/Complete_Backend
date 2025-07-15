const express = require('express');
const userRouter = express.Router();

userRouter.get("/",(req, res, next)=>{
    res.send(`
        <p>Welcome to airbnb</p>
        <a href="/host/add-home">Add Home</a>
        `)
})

module.exports =userRouter;