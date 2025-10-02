const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
     product_te: { type: String },
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

module.exports = mongoose.model("Pest", userSchema);
