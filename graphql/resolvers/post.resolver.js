const Post = require("../../model/Post")
const checkAuth = require("../../util/checkAuth")
const { AuthenticationError } = require("apollo-server")

module.exports = {
  Query: {
    // GET ALL POSTS
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({createdAt: -1})
        return posts
      } catch (e) {
        throw new Error(e)
      }
    },
    // GET SINGLE POST
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
    // CREATE POST
    createPost: async (_, {body}, context) => {
      const user = checkAuth(context)
      console.log(user)

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
      }catch(e) {
        throw new Error(e)
      }
    }
  }
}