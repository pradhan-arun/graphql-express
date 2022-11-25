const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"category"
    }
}, { timestamps: true });

module.exports = mongoose.model("post", postSchema);