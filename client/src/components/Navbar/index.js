import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

import { NavbarContainer, NavItem } from './elements' 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) 

  let links = !user 
    ? <>
        <NavItem>
          <NavLink
            to="/register"
            activeStyle={{
              color: "red"
            }}
          >
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/login"
            activeStyle={{
              color: "red"
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
        <h1>MERNG</h1>
      </NavLink>
      <nav>
        {links}
      </nav>
    </NavbarContainer>
  )
}

export default Navbar
