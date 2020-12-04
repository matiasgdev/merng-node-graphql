import React from 'react'
import App from './App'
import { ApolloClient,  InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
})

const authLink = setContext((_, { headers }) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  if (user) {
    let { token = null } = user
    return { 
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }
  
  
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}