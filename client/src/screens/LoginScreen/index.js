import { gql } from '@apollo/client'
import useInput from '../../hooks/useInput'
import useForm from '../../hooks/useForm'

import { Title, Button } from '../../elements'

const LOGIN_MUTATION = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      loginInput: {
        email: $email
        password: $password
      }
    ) {
      id email username token createdAt
    }
  }
`

const LoginScreen = () => {
  const emailInput = useInput('')
  const passwordInput = useInput('')

  const { errors, setErrors, loading, request: login } = useForm(LOGIN_MUTATION, {
    email: emailInput.input.value,
    password: passwordInput.input.value,
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login()
      .catch(err => {
        setErrors(err.graphQLErrors[0].extensions.errors)
      })
  }

  return (
    <div>
      <Title>Login</Title>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...emailInput.input}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input autoComplete="new-password" type="password" id="password" {...passwordInput.input}/>
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

export default LoginScreen