const express = require('express');
const { create1,getall,get1 ,update1,deletes} = require("../controller/pestcontroller.js");
const route = express.Router(); 

route.post("/create1", create1);
route.get("/getall", getall);
route.get("/get1/:id",get1);
route.put("/update1/:id",update1);
route.delete("/deletes/:id",deletes);
module.exports = route;