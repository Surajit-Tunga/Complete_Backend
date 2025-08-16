const express = require('express');
const authRouter = express.Router();

const { getLogin} = require('../controllers/authController');

authRouter.get("/login", getLogin);

exports.authRouter = authRouter;
