const Post = require("../../model/Post")
const checkAuth = require("../../util/checkAuth")
const { AuthenticationError, UserInputError } = require("apollo-server")

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({createdAt: -1})
        return posts
      } catch (e) {
        throw new Error(e)
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId)
        if (post) { 
          return post
        } else {
          throw new Error("Post not found")
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }, 
  Mutation: {
    createPost: async (_, {body}, context) => {
      const user = checkAuth(context)
      const newPost = new Post({
        body,
        user: user._id,
        username: user.username,
      })
      const res = await newPost.save()
      return res
    },
    deletePost: async (_, {postId}, context) => {
      const user = checkAuth(context)
      try {
        const post = await Post.findById(postId)  
        if (!post) {
          throw new Error("Post not found")
        }
        if (user.username === post.username) {
          await post.delete()
          return "Post deleted successfully"
        } else {
          throw new AuthenticationError("Action now allowed")
        }
      } catch(e) {
        throw new Error(e)
      }
    },
    likePost: async (_, { postId }, ctx) =>  {
      const { username } = checkAuth(ctx)

      const post = await Post.findById(postId)
      if (post) {
        // toggle like
        const isLiked = post.likes.find(like => like.username === username)
        if (isLiked) {
          // Post already is liked by the user, then remove like
          post.likes = post.likes.filter(like => like.username !== username)
        } else {
          // Post does not have like by the user, then add like
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post

      } else throw new UserInputError("Post not found")
    }
  }
}