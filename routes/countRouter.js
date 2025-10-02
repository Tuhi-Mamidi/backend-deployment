const express = require('express');
const { allData} = require("../controller/countcontroller.js");
const route = express.Router(); 

route.get("/allData",allData)
module.exports = route;
