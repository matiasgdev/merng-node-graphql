const { ApolloServer } = require("apollo-server")
const gql = require("graphql-tag")
const mongoose = require("mongoose")

const config = require("./config")
const Post = require('./model/Post')
const User = require('./model/User')

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`
const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find()
        return posts
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
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