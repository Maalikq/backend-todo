const express = require('express');
const { createUser, loginUser } = require('../controller/user.controller');


const userRouter = express.Router();

userRouter.post("/register",createUser)
userRouter.post("/login", loginUser)

module.exports={userRouter}