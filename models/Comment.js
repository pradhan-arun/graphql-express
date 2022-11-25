const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"user"
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"post"
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("comment", commentSchema)