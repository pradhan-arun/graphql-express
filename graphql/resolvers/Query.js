
const { GraphQLError } = require("graphql");
const Category = require("../../models/Category");
const User = require("../../models/User");
const bcrypt = require("bcrypt")
const Post = require("../../models/Post");
const {createToken} = require("../../util/auth");
const Comment = require("../../models/Comment");
const {testingResolver} = require('./testingResolver');
exports.Query = {
  users: async (parent, args, context, info) => {
    const allUser = await User.find();
    return allUser;
  },
  user: async (parent, args) => {
    const { id } = args;
    const user = await User.findById(id);
    return user;
  },
  posts: async (parent, args, context, info) => {
    const posts = await Post.find();
    return posts;
  },
  post: async (parent, args, { verifiedUser }) => {
    const { id } = args;
    const post = await Post.findById(id).populate("authorId").populate("type");
    return post;
  },
  categories: async (parent, args, context, info) => {
    const category = await Category.find();
    console.log(category);
    return category;
  },
  category: async (parent, args) => {
    const { id } = args;
    if(!id){ throw new GraphQLError('category id is missing'); }
    const category = await Category.findById(id);
    category.allPost = await Post.find({type:category.id});
    return category;
  },
  login: async (parent,args) =>{
    const {email, password} = args;
    if(!email || !password){
      throw new GraphQLError('email/password is required')
    }
    let userDetails = await User.findOne({email:email});
    if(!userDetails){
      throw new GraphQLError('Email is not exists in the db');
    }
    let userData = {
      id:userDetails._id,
      username:userDetails.username,
      password:userDetails.password,
      email:userDetails.email,
      userType:userDetails.userType
    }

    var checkPassword = await bcrypt.compare(args.password, userDetails.password);
    if(!checkPassword){
      throw new GraphQLError("password is not matched");
    }
    // console.log("userdetails = ", userDetails)
    var token = await createToken(userData);
    console.log("create yyyyyy    ==   ",token);
    userDetails.token = token;
    return userDetails;
  },
  comments:async ()=>{
    try{
      let findComments = await Comment.find();
      return findComments;
    }catch(error){
      throw new GraphQLError('Error comming from comment side')
    }
  },
  comment:async (parent , args , context)=>{
    try{
      let {id} = args;
      console.log("id ===  ", id)
      if(!id){
        throw new GraphQLError('comment id is required ');
      }
      let findCommet =  await Comment.findById(args.id).populate('userId').populate('postId');
      console.log("find comment == ", findCommet);
      return findCommet;
    }
    catch(error){
      throw new GraphQLError('Error comming from single comment found');
    }
  },
  testing:async(parent,args)=>{
    let name={"name":"arun"};
    console.log("parent = ", parent)
    console.log("==============================  ",await testingResolver.userTesting(parent,args));
    return name
  }
};
