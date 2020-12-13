import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import { NavbarContainer, NavItem, Title } from './elements' 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) 

  let links = !user 
    ? <>
        <NavItem>
          <NavLink
            to="/register"
            activeStyle={{
              color: 'var(--red)'
            }}
          >
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/login"
            activeStyle={{
              color: 'var(--red)'
            }}
            >
            Login
          </NavLink>
        </NavItem>
      </>
    : <>
        <NavItem onClick={logout}>
          Logout
        </NavItem>
      </>

  return (
    <NavbarContainer>
      <NavLink to="/">
        <Title>MERNG</Title>
      </NavLink>
      <nav>
        {links}
      </nav>
    </NavbarContainer>
  )
}

export default Navbar
