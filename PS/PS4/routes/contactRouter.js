const express = require('express');
const path = require('path')
const rootDir = require('../utils/path')

const contactRoute = express.Router();

contactRoute.get("/contact",(req, res, next)=> {
    console.log("contact",req.url, req.method);
    res.sendFile(path.join(rootDir, "views","contact.html"));
});

contactRoute.post("/contact",(req, res, next)=> {
    console.log("contact post ",req.url, req.method, req.body);
    res.sendFile(path.join(rootDir, "views","thank.html"));
     
})

module.exports =contactRoute;