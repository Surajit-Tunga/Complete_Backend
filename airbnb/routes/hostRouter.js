const express = require('express');
const hostRouter = express.Router();

const { getAddHome, postAddHome } = require('../controllers/hostController');

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home",postAddHome);

exports.hostRouter =hostRouter;
