
const User = require('../../model/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")
const { validateRegisterInput, validateLoginInput } = require("../../util/validators")
const generateToken = require("../../util/generateToken")

const config = require("../../config")

module.exports = {
  Mutation: {
    async register(
      _, 
      {registerInput:  { username, email, password, confirmPassword }},
    ){
      // Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Error ocurred when create user', { errors })
      }
      // Make user doesn't already exist
      const user = await User.findOne({email})
      if (user) {
        throw new UserInputError("Email already exists", {
          errors: {
            email: "This email is already taken"
          }
        })
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 10)

      const newUser = new User({
        email,
        username,
        password
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    },
    async login(_, { loginInput: { email, password }}) {
      const { errors, valid } = validateLoginInput(email, password)

      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }

      const user = await User.findOne({ email })
      if (!user) {
        errors.general = "User not found"
        throw new UserInputError("User not Found", {
          errors
        })
      }

      const matchPassword = await bcrypt.compare(password, user.password)
      if (!matchPassword) {
        errors.general = "Wrong credentials"
        throw new UserInputError("Wrong credentials: Password incorrect", {
          errors
        })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    }
  }
}