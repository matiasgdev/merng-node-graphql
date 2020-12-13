import useInput from '../../hooks/useInput';
import useForm from '../../hooks/useForm';
import { LOGIN_MUTATION } from '../../util/graphql.querys';

import { Button, Title, Container } from '../../elements'
import * as Form from '../../elements/form';


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
    <Container>
      <Title>Login with your account</Title>
      <Form.Container 
        onSubmit={handleSubmit}
      >
        {/* Error messages */}
        {Object.keys(errors).length > 0 && Object.values(errors).map(error => (
            <div className="error" key={error}>* {error}</div>
        ))}
        
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
            placeholder="Enter your email"
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

export default LoginScreen