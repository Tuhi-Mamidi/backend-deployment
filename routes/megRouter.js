const express = require('express');
const { createm,getm,delm} = require("../controller/megcontroller.js");
const route = express.Router(); 

route.post("/createm", createm);
route.get("/getm", getm);
route.delete("/delm/:id",delm);
module.exports = route;
