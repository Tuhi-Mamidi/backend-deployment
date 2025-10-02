const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    meg: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Message", userSchema);
