const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        enum:["technical","education","sports"]
    }
}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema);