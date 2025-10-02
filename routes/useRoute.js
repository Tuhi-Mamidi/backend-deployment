const express = require('express');
const { create,get,getone ,update,del} = require("../controller/usercontroller.js");
const route = express.Router(); 

route.post("/create", create);
route.get("/get", get);
route.get("/getone/:id",getone);
route.put("/update/:id",update);
route.delete("/del/:id",del);
module.exports = route;
