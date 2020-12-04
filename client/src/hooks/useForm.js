import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function useForm(MUTATION, values) {
  let history = useHistory()
  const [errors, setErrors] = useState({})
  const {login} = useContext(AuthContext)

  const [request, { loading }] = useMutation(MUTATION, {
    update: (_, result) => {
      if (result.data.login) {
        login(result.data.login)
      } else if(result.data.register) {
        login(result.data.register)
      }
      history.push('/')
    },
    variables: values
  })

  return {
    errors,
    setErrors,
    loading,
    request
  }
}

