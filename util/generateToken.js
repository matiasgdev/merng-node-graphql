const jwt = require("jsonwebtoken")
const config = require("../config")

module.exports = (user) => {
  return jwt.sign({
    id: user._id,
    email: user.email,
    username: user.username
  },
  config.SECRET,
  { expiresIn: '1h' }
  )
}