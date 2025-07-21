const path = require('path');
const express = require('express');
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtils")

hostRouter.get("/add-home",(req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'add-home.html'))
})

const registeredHouse =[];

hostRouter.post("/add-home",(req, res, next)=>{
    registeredHouse.push({houseName: req.body.houseName});
    res.sendFile(path.join(rootDir, 'views', 'homeadded.html'))
})

exports.hostRouter =hostRouter;
exports.registeredHouse= registeredHouse;