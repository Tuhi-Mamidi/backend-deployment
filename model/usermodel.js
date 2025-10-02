const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    seedName: {
        type: String,
        required: true
    },
    seedName_te: { type: String },
    type:{
        type:String,
        required:true
    },
    type_te: { type: String }, 
    quantity: {
        type: Number
    },
    price:{
        type:Number
    }
});

module.exports = mongoose.model("User", userSchema);

