const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType:{
        type:String,
        required:true,
        enum:["admin","user"]
    },
    token:{
        type:String,
        required:true
    }
}, {
    timestamp:true
});

module.exports = mongoose.model("user", userSchema);