const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
   status:{
    type:String,
    required:true,
   } ,
   status_te:{
    type:String,
    required:true
   }
});

module.exports = mongoose.model("Leave", userSchema);