import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GlobalStyle } from './globalStyle'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import PostDetailScreen from './screens/PostDetailScreen'
import Navbar from './components/Navbar';
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Layout>
          <Navbar />
            <Switch>
              <Route exact path='/' component={HomeScreen}/>
              <AuthRoute exact path='/register' component={RegisterScreen} />
              <AuthRoute exact path='/login' component={LoginScreen} />
              <Route exact path ='/post/:id' component={PostDetailScreen} />
            </Switch>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
