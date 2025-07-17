const express = require('express');
const path = require('path');
const rootDir = require('../utils/path')

const homeRoute = express.Router();

homeRoute.get("/",(req, res, next)=> {
    console.log("Welocme",req.url, req.method);
    res.sendFile(path.join(rootDir, "views","welcome.html"))
})

module.exports =homeRoute;