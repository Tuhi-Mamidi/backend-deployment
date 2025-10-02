const express = require('express');
const {scrap} = require("../controller/scrapcontroller.js");
const route = express.Router(); 


route.get("/scrap", scrap);

module.exports = route;