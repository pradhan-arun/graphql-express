const User = require("../../models/User");
const Category = require("../../models/Category");
const bcrypt = require("bcrypt");
const { createToken, verifyToken } = require("../../util/auth");
const { GraphQLError } = require("graphql");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

exports.Mutation = {
  createUser: async (parent, args, context) => {
    try {
      const { email, password, username } = args;
      var emailfind = await User.findOne({ email: email });
      console.log("email find from db = ", emailfind);
      if (emailfind) {
        throw new GraphQLError("Email is already exists...");
      }
      const token = await createToken(args);
      args.password = await bcrypt.hash(password, 12);
      args.token = token;
      const user = await User.create(args);
      console.log("user = ", user);
      return user;
    } catch (error) {
      console.log("error = ", error);
      throw new GraphQLError("Email is already exists...", {
        extensions: {
          code: "NOT ACCESS",
          http: { status: 400 },
        },
      });
    }
  },
  createCategory: async (parent, args, context) => {
    console.log("args   ====    ", args);
    const { req } = context;
    const { success, data } = await verifyToken(req);
    if (success && data) {
      if (data.userType === "admin") {
        const save = await Category.create(args);
        console.log("user = ", save);
        return save;
      }
    }
    throw new GraphQLError("User have not access to create the category");
  },
  createPost: async (parent, args, context) => {
    console.log("args = ", args);
    const { authorId, type } = args;
    const { req } = context;
    const { success, data } = await verifyToken(req);
    console.log("success ==  ", success);
    console.log("data ===  ", data)
    if (success && data) {
      if (data.userType === "admin") {
        if (!authorId || !type) {
          throw new GraphQLError("authorId or type is not present in the body");
        }

        let findAuthorId = await User.findById(authorId);
        console.log("find user id = ", findAuthorId);
        if (!findAuthorId) {
          throw new GraphQLError("User is not found in db");
        }
        let findCategory = await Category.findById(type);
        console.log("find category type = ", findCategory);
        if (!findCategory) {
          throw new GraphQLError("category is not found in the db");
        }
        const post = await Post.create(args);
        const postDetails = await Post.findById(post._id)
          .populate("authorId")
          .populate("type");
        console.log("post ==== ", postDetails);
        return postDetails;
      }
    }
    throw new GraphQLError("Cannot access to create a post. Only admin can modify the data");
  },

  createComment:async(parent,args,context)=>{
    let {comment,userId,postId} = args;
    if(!comment || !userId || !postId){
      throw new GraphQLError('Comment or userId or postId is required ');
    }
    let findUser = await User.findById(userId);
    if(!findUser){ throw new GraphQLError('user is not found from db'); }
    let findPost = await Post.findById(postId);
    if(!findPost){ throw new GraphQLError('post is not found')}
    
    let commentCreate = await Comment.create(args);
    console.log("comment craeted - ", commentCreate);
    return commentCreate;

  }
}