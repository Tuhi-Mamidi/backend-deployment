const express = require('express');
const { register, login,changePassword} = require("../controller/logincontroller.js");
const route = express.Router(); 

route.post("/register", register);
route.post("/login", login);
route.post("/changePassword",changePassword);
module.exports = route;
