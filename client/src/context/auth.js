import { createContext, useReducer } from 'react'
import decodeToken from 'jwt-decode'

const AuthContext = createContext()

function authReducer(state, action) {
  switch(action.type) {
    case 'login': {
      let user = action.payload
      localStorage.setItem("user", JSON.stringify(user))
      return {
        ...state,
        user
      }
    }
    case 'logout': {
      if (localStorage.getItem("user"))
        localStorage.removeItem("user")
      return {
        ...state,
        user: null
      }
    }
    default: return state
  }
}

function verifyExpirationOfToken(user) {
  if (user) {
    const decodedToken = decodeToken(user.token)
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("user")
      return null
    } else {
      return user
    }
  } else 
    return null
}


function AuthProvider({children}) {
  let userCache = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null
  
  const userData = verifyExpirationOfToken(userCache)
  const [state, dispatch] = useReducer(authReducer, { user: userData })

  function login(userData) {
    dispatch({ type: 'login', payload: userData})
  }

  function logout() {
    dispatch({ type: 'logout'})
  }

  return (
    <AuthContext.Provider value={{
      user: state.user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider,AuthContext}