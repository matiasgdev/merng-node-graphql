const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
const typeDefs = require("./graphql/TypesDefs")
const resolvers = require("./graphql/resolvers")
const config = require("./config")
  
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 })
  })
  .then(res => {
    console.log(`Server running on ${res.url}`)
  })