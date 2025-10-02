const express=require('express');
const cors=require('cors');
const route = require("./routes/useRoute.js");
const route1 = require("./routes/pestRoute.js");
const route2 = require("./routes/schemaRouter.js");
const route3 = require("./routes/megRouter.js");
const route4 = require("./routes/countRouter.js");
const route5=require("./routes/leaveRouter.js");
const route6=require("./routes/scrapRouter.js");
const route7=require("./routes/loginRouter.js");
const app=express();
const mongoose = require('mongoose');
app.use(cors()); 
app.use(express.json()); 
mongoose.connect("mongodb+srv://farmer_db:abc%40123@cluster0.swouert.mongodb.net/farmer?retryWrites=true&w=majority")
.then(()=>{
    console.log("sucess");
})
.catch((error)=>{
    console.log("error",error);
})
app.use("/api",route);
app.use("/app",route1);
app.use("/apip",route2);
app.use("/mess",route3);
app.use("/count",route4);
app.use("/leave",route5);
app.use("/scr",route6);
app.use("/visit",route7);
const port=process.env.PORT||3307;
 app.listen(port,() => {
    console.log(`Server is running on port `);
 });