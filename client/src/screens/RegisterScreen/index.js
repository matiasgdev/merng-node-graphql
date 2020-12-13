import useInput from '../../hooks/useInput'
import useForm from '../../hooks/useForm'
import { REGISTER_MUTATION } from '../../util/graphql.querys'

import { Button, Title, Container } from '../../elements'
import * as Form from '../../elements/form';


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
    <Container>
      <Title>Register</Title>
      <Form.Container 
        onSubmit={handleSubmit}
      >
        {/* Error messages */}
        {Object.keys(errors).length > 0 && Object.values(errors).map(error => (
            <div className="error" key={error}>* {error}</div>
        ))}
        <Form.Group>
          <Form.Label 
            htmlFor="username"
          >
            Username *
          </Form.Label>
          <Form.Input 
            type="text" 
            id="username"
            autoComplete="off"
            {...usernameInput.input}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label 
            htmlFor="email"
            >
              Email *
          </Form.Label>
          <Form.Input 
            type="text" 
            id="email"
            autoComplete="off"
            placeholder="Enter a valid e-mail"
            {...emailInput.input}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label 
          htmlFor="password"
          >
            Password *
          </Form.Label>
          <Form.Input 
            autoComplete="new-password" 
            type="password" 
            id="password" 
            {...passwordInput.input}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label 
            htmlFor="confirm_password"
          >
            Confirm password *
          </Form.Label>
          <Form.Input 
            type="password" 
            id="confirm_password"
            autoComplete="new-password"
            placeholder="Password must be match"
            {...confirmPasswordInput.input}
          /> 
        </Form.Group>
        <Form.Group>
          <Button
            disabled={loading}
          >
            {loading ? "Sending data..." : "Send"}
          </Button>
        </Form.Group>
      </Form.Container>
    </Container>
  )
}

export default RegisterScreen