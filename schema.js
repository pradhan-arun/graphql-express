const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query{
        hello:String,
        getNumber:Int

        # get user details
        users:[userType],
        user(id:ID, username:String):userType,
        posts:[postType],
        post(id:ID):postType,
        categories:[categoryType],
        category(id:ID):categoryType,
        comment(id:ID):commentPopulateType,
        comments:[commentType],
        login(email:String,password:String):userType,

        testing(id:String):testType
    }

    type Mutation{
        createUser(username:String,email:String,password:String,userType:String):userType,
        createPost(authorId:ID,title:String,body:String,type:ID):postType,
        createCategory(name:String):categoryType,
        createComment(comment:String,userId:ID,postId:ID):commentType
    }

    type testType{
        name:String,
        userTesting:[userType]
    }

    type errorMessage{
        message:String,
        success:Boolean
    }

    type userType{
        id:ID,
        username:String,
        password:String,
        email:String,
        userType:String,
        token:String
    }

    type postType{
        id:ID,
        authorId:userType,
        title:String,
        body:String,
        type:categoryType,
        
    }

    type postOutputType{
        id:ID,
        authorId:ID,
        title:String,
        body:String,
        type:ID,
        
    }

    type commentType{
        id:ID,
        comment:String,
        userId:ID,
        postId:ID
    }

    type commentPopulateType{
        id:ID,
        comment:String,
        userId:userType,
        postId:postType
    }

    type categoryType{
        id:ID,
        name:String,
        allPost:[postType]
    }
`
module.exports = {typeDefs};