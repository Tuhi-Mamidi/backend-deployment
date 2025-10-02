const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    classs: {
        type: String,
        required: true
    },
    names:{
        type:String,
        required:true
    },
    landholder: {
        type:String,
        required:true
    },
    Identity:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    sdate:{
        type:String,
        required:true
    },
    edate:{
        type:String,
        required:true
    },
    class_te: { type: String },
    names_te:{type:String},
    Identity_te:{type:String}

});

module.exports = mongoose.model("Schema", userSchema);
