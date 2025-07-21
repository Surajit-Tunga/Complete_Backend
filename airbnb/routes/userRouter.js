const path = require('path');

const express = require('express');
const userRouter = express.Router();

const rootDir = require("../utils/pathUtils");
const { registeredHouse } = require('./hostRouter');

userRouter.get("/",(req, res, next)=>{
    res.render('home', {registeredHouse: registeredHouse});
})

module.exports =userRouter;