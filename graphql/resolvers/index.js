const postResolver = require("./post.resolver")
const userResolver = require("./user.resolver")

module.exports = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation
  }

}