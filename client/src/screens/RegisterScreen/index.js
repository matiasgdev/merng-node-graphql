import { gql } from '@apollo/client'
import useInput from '../../hooks/useInput'
import useForm from '../../hooks/useForm'

import {Button, Title} from '../../elements'

const REGISTER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username token createdAt
    }
  }
`

const RegisterScreen = () => {
  const usernameInput = useInput('')
  const emailInput = useInput('')
  const passwordInput = useInput('')
  const confirmPasswordInput = useInput('')

  const { setErrors, errors, loading, request: register } = useForm(REGISTER_MUTATION, {
    username: usernameInput.input.value,
    email: emailInput.input.value,
    password: passwordInput.input.value,
    confirmPassword: confirmPasswordInput.input.value
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    register()
      .catch(err => {
        setErrors(err.graphQLErrors[0].extensions.errors)
      })
  }

  return (
    <div>
      <Title>Register</Title>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...usernameInput.input}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...emailInput.input}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input autoComplete="new-password" type="password" id="password" {...passwordInput.input}/>
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm password</label>
            <input type="password" id="confirm_password" {...confirmPasswordInput.input}/> 
          </div>
          <div>
            <Button
              disabled={loading}
            >
             {loading ? "Sending data..." : "Send"}
            </Button>
          </div>
          {Object.keys(errors).length > 0 && Object.values(errors).map(error => (
              <div key={error}>{error}</div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default RegisterScreen