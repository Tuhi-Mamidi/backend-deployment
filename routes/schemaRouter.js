const express = require('express');
const { create2,get2,getone2 ,update2,del2} = require("../controller/schemacontroller.js");
const route = express.Router(); 

route.post("/create2", create2);
route.get("/get2", get2);
route.get("/getone2/:id",getone2);
route.put("/update2/:id",update2);
route.delete("/del2/:id",del2);
module.exports = route;