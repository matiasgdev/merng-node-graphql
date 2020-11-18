const { AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = (context) => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, config.SECRET)
        return user
      } catch(e) {
        throw new AuthenticationError('Invalid or expired token')
      }
    } else {
      throw new Error("Token in Authorization header must be \'Bearer [token]\'")
    }
  } else {
    throw new Error("Authorization header must be provided")
  }
}