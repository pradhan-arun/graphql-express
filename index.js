const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connectDB } = require("./db");
const { typeDefs } = require("./schema");
const { Query } = require("./graphql/resolvers/Query");
const { Mutation } = require("./graphql/resolvers/Mutation");
const { v4 } = require("uuid");
const { GraphQLError } = require("graphql");
require("dotenv").config();

connectDB();
const startServer = async (req, res, next) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
    context: async ({ req, res }) => {
      return { req, res };
    },
  });
  const app = express();
  // app.use(logging/Middleware)
  await server.start();
  server.applyMiddleware({ app }, { path: "/test" });

  app.get("/", (req, res) => {
    console.log("Inside the get routes");
    res.send("<b> Graphql is running </b>");
  });

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console, log("server not running");
    }
    console.log("server running at ----- ", process.env.PORT);
  });
};

startServer();
