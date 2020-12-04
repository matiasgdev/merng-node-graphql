const Post = require("../../model/Post")
const checkAuth = require("../../util/checkAuth")
const { UserInputError, AuthenticationError } = require("apollo-server")

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, ctx) => {
      const {username} = checkAuth(ctx)
      if (body.trim() === '') {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty"
          }
        })
      }
      const post = await Post.findById(postId)
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post
      } else
        throw new UserInputError("Post not found")
    },
    deleteComment: async (_, { postId, commentId }, ctx) => {
      const {username} = checkAuth(ctx)

      const post  = await Post.findById(postId)
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId)
        if (commentIndex === -1) {
          throw new UserInputError("Comment not found")
        }
        // check owner
        const commentOwner = post.comments[commentIndex].username === username
        const postOwner = post.username === username
        
        if (commentOwner || postOwner) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError("Action now allowed")
        }
      } else
        throw new UserInputError("Post not found")
    },

  }
}