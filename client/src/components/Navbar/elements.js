import styled from 'styled-components'

export const NavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .8em 0;
  border-bottom: 1px solid lightgray;
`

export const NavItem = styled.div`
  float: right;
  margin-left: 1.5em;
  opacity: .666;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
`

export const Title = styled.h1`
  color: var(--black-400);

`