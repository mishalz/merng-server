const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const resolvers = require("./graphQL/resolvers");
const typeDefs = require("./graphQL/typeDefs");
const { db_url } = require("./config.js");

const PORT = process.env.port || 5000;
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(db_url)
  .then(() => {
    return server.listen({
      port: PORT,
    });
  })
  .then((res) => console.log(`server running at ${res.url}`))
  .catch((err) => console.log(err));
