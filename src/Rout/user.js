const { register, login, logout } = require("../Controllers/user");
const express = require("express");
const userRout = express.Router()

userRout.route('/register').post(register);
userRout.route('/login').post(login)
userRout.route('/logout').post(logout)




module.exports = userRout;