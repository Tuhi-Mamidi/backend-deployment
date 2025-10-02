const express = require('express');
const { create10,get10,del10} = require("../controller/leavecontoller.js");
const route = express.Router(); 

route.post("/create10", create10);
route.get("/get10", get10);
route.delete("/del10/:id",del10);
module.exports = route;
