const path = require('path');
const express = require('express');
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtils")

hostRouter.get("/add-home",(req, res, next)=>{
    res.render('add-home',{ pageTitle: "Add Home"})
})

const registeredHouse =[];

hostRouter.post("/add-home",(req, res, next)=>{
    registeredHouse.push(req.body);
    res.render('homeadded', { pageTitle: "Home added"})
})

exports.hostRouter =hostRouter;
exports.registeredHouse= registeredHouse;