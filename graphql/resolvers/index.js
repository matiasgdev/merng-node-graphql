const postResolver = require("./post.resolver")
const userResolver = require("./user.resolver")
const commentResolver = require("./comment.resolver")

module.exports = {
  // Modify the fields likeCount and commentCount when some mutation/query returns Post 
  Post: {
    likeCount: (post) => post.likes.length,
    commentCount: (post) => post.comments.length
  },
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation
  }

}